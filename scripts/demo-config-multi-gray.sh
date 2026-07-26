#!/usr/bin/env bash
# Publish 1 normal + 2 gray releases via Console OpenAPI, then prove client
# GetConfigFile pulls hit different bodies by tags.
# Requires: curl, jq
set -euo pipefail

BASE_URL="${POLE_BASE_URL:-http://pole.localhost}"
CLIENT_URL="${POLE_CLIENT_URL:-http://127.0.0.1:8090}"
USER="${POLE_USER:-admin}"
PASSWORD="${POLE_PASSWORD:-admin123}"
NAMESPACE="${POLE_NAMESPACE:-default}"
GROUP="${POLE_GROUP:-docs-multi-gray}"
FILE_NAME="${POLE_FILE:-app.yaml}"
OUT_DIR="${1:-/tmp/config-multi-gray-demo}"

mkdir -p "$OUT_DIR"
STAMP="$(date +%Y%m%d%H%M%S)"
NORMAL="baseline-${STAMP}"
GRAY_A="gray-env-a-${STAMP}"
GRAY_B="gray-env-b-${STAMP}"

json_req() {
  local method="$1" path="$2" body="${3-}"
  if [[ -n "$body" ]]; then
    curl -sS -X "$method" "${BASE_URL}${path}" \
      -H "Content-Type: application/json" \
      -H "Authorization: ${TOKEN}" \
      -H "X-Pole-User: ${USER_ID}" \
      -d "$body"
  else
    curl -sS -X "$method" "${BASE_URL}${path}" \
      -H "Authorization: ${TOKEN}" \
      -H "X-Pole-User: ${USER_ID}"
  fi
}

client_get() {
  local tags="${1-}"
  local url="${CLIENT_URL}/v1/GetConfigFile?namespace=${NAMESPACE}&group=${GROUP}&fileName=${FILE_NAME}&version=0"
  if [[ -n "$tags" ]]; then
    url="${url}&tags=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$tags")"
  fi
  curl -sS "$url"
}

echo "==> login ${BASE_URL}"
LOGIN="$(curl -sS -X POST "${BASE_URL}/auth/v1/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"${USER}\",\"password\":\"${PASSWORD}\"}")"
echo "$LOGIN" | tee "${OUT_DIR}/01-login.json" >/dev/null
CODE="$(echo "$LOGIN" | jq -r '.code')"
[[ "$CODE" == "200000" ]] || { echo "login failed: $LOGIN"; exit 1; }
TOKEN="$(echo "$LOGIN" | jq -r '.data.token')"
USER_ID="$(echo "$LOGIN" | jq -r '.data.user_id')"

echo "==> ensure group ${NAMESPACE}/${GROUP}"
json_req POST /config/v1/groups "[{\"namespace\":\"${NAMESPACE}\",\"name\":\"${GROUP}\",\"comment\":\"docs multi-gray demo\",\"metadata\":{}}]" \
  | tee "${OUT_DIR}/02-create-group.json" >/dev/null || true

echo "==> upsert file ${FILE_NAME}"
json_req POST /config/v1/files "[{\"namespace\":\"${NAMESPACE}\",\"group\":\"${GROUP}\",\"name\":\"${FILE_NAME}\",\"content\":\"mode: baseline\\nversion: 1\\n\",\"format\":\"yaml\",\"comment\":\"docs demo\",\"labels\":{\"demo\":\"multi-gray\"},\"encrypted\":false,\"encryptAlgo\":\"\"}]" \
  | tee "${OUT_DIR}/03-create-file.json" >/dev/null || true

json_req PUT /config/v1/files "[{\"namespace\":\"${NAMESPACE}\",\"group\":\"${GROUP}\",\"name\":\"${FILE_NAME}\",\"content\":\"mode: baseline\\nversion: 1\\n\",\"format\":\"yaml\",\"comment\":\"docs demo baseline\",\"labels\":{\"demo\":\"multi-gray\"},\"encrypted\":false,\"encryptAlgo\":\"\"}]" \
  | tee "${OUT_DIR}/04-update-baseline.json" >/dev/null

echo "==> publish normal ${NORMAL}"
json_req POST /config/v1/files/release "{\"namespace\":\"${NAMESPACE}\",\"group\":\"${GROUP}\",\"file_name\":\"${FILE_NAME}\",\"name\":\"${NORMAL}\",\"release_description\":\"full baseline\",\"release_type\":\"normal\"}" \
  | tee "${OUT_DIR}/05-publish-normal.json" >/dev/null

echo "==> publish gray A ${GRAY_A}"
json_req PUT /config/v1/files "[{\"namespace\":\"${NAMESPACE}\",\"group\":\"${GROUP}\",\"name\":\"${FILE_NAME}\",\"content\":\"mode: gray-a\\ncohort: env=gray-a\\n\",\"format\":\"yaml\",\"comment\":\"gray a body\",\"labels\":{\"demo\":\"multi-gray\"},\"encrypted\":false,\"encryptAlgo\":\"\"}]" \
  | tee "${OUT_DIR}/06-update-gray-a.json" >/dev/null

json_req POST /config/v1/files/release "{\"namespace\":\"${NAMESPACE}\",\"group\":\"${GROUP}\",\"file_name\":\"${FILE_NAME}\",\"name\":\"${GRAY_A}\",\"release_description\":\"gray for env=gray-a\",\"release_type\":\"gray\",\"beta_labels\":[{\"key\":\"env\",\"value\":{\"type\":0,\"value\":\"gray-a\",\"value_type\":0}}]}" \
  | tee "${OUT_DIR}/07-publish-gray-a.json" >/dev/null

echo "==> publish gray B ${GRAY_B}"
json_req PUT /config/v1/files "[{\"namespace\":\"${NAMESPACE}\",\"group\":\"${GROUP}\",\"name\":\"${FILE_NAME}\",\"content\":\"mode: gray-b\\ncohort: env=gray-b\\n\",\"format\":\"yaml\",\"comment\":\"gray b body\",\"labels\":{\"demo\":\"multi-gray\"},\"encrypted\":false,\"encryptAlgo\":\"\"}]" \
  | tee "${OUT_DIR}/08-update-gray-b.json" >/dev/null

json_req POST /config/v1/files/release "{\"namespace\":\"${NAMESPACE}\",\"group\":\"${GROUP}\",\"file_name\":\"${FILE_NAME}\",\"name\":\"${GRAY_B}\",\"release_description\":\"gray for env=gray-b\",\"release_type\":\"gray\",\"beta_labels\":[{\"key\":\"env\",\"value\":{\"type\":0,\"value\":\"gray-b\",\"value_type\":0}}]}" \
  | tee "${OUT_DIR}/09-publish-gray-b.json" >/dev/null

echo "==> list releases (best-effort; client pulls are the source of truth)"
RELEASES="$(json_req GET "/config/v1/files/releases?namespace=${NAMESPACE}&group=${GROUP}&file_name=${FILE_NAME}&offset=0&limit=20" || true)"
echo "$RELEASES" | tee "${OUT_DIR}/10-list-releases.json" >/dev/null || true
if [[ "$(echo "$RELEASES" | jq -r '.code // empty')" == "200000" ]]; then
  ACTIVE_GRAY="$(echo "$RELEASES" | jq '[((.data // .configFileReleases // [])[]) | select(.release_type=="gray" and (.active==true or .active==1))] | length')"
  ACTIVE_NORMAL="$(echo "$RELEASES" | jq '[((.data // .configFileReleases // [])[]) | select(.release_type=="normal" and (.active==true or .active==1))] | length')"
  echo "active normal count: ${ACTIVE_NORMAL}"
  echo "active gray count: ${ACTIVE_GRAY}"
else
  echo "list releases skipped/failed: $(echo "$RELEASES" | jq -c '{code,info}' 2>/dev/null || echo "$RELEASES")"
fi

echo "==> client pull via ${CLIENT_URL}/v1/GetConfigFile"
PULL_NONE="$(client_get)"
PULL_A="$(client_get "env=gray-a")"
PULL_B="$(client_get "env=gray-b")"
PULL_OTHER="$(client_get "env=other")"
echo "$PULL_NONE" | tee "${OUT_DIR}/11-client-no-tags.json" >/dev/null
echo "$PULL_A" | tee "${OUT_DIR}/12-client-gray-a.json" >/dev/null
echo "$PULL_B" | tee "${OUT_DIR}/13-client-gray-b.json" >/dev/null
echo "$PULL_OTHER" | tee "${OUT_DIR}/14-client-other.json" >/dev/null

assert_pull() {
  local label="$1" resp="$2" expect_type="$3" expect_content_substr="$4"
  local got_type got_name got_content
  got_type="$(echo "$resp" | jq -r '.file.release_type // empty')"
  got_name="$(echo "$resp" | jq -r '.file.name // empty')"
  got_content="$(echo "$resp" | jq -r '.file.content // empty')"
  echo "client[${label}] -> type=${got_type} name=${got_name}"
  echo "$got_content" | sed 's/^/  | /'
  [[ "$(echo "$resp" | jq -r '.code')" == "200000" ]] || { echo "pull failed: $resp"; exit 1; }
  [[ "$got_type" == "$expect_type" ]] || { echo "expected release_type=${expect_type}, got ${got_type}"; exit 1; }
  [[ "$got_content" == *"$expect_content_substr"* ]] || { echo "content missing ${expect_content_substr}"; exit 1; }
}

assert_pull "no-tags" "$PULL_NONE" "normal" "mode: baseline"
assert_pull "env=gray-a" "$PULL_A" "gray" "mode: gray-a"
assert_pull "env=gray-b" "$PULL_B" "gray" "mode: gray-b"
assert_pull "env=other" "$PULL_OTHER" "normal" "mode: baseline"

CONSOLE_URL="${BASE_URL}/configuration/group/files?namespace=${NAMESPACE}&group=${GROUP}&file=${FILE_NAME}"
cat > "${OUT_DIR}/demo.env" <<EOF
BASE_URL=${BASE_URL}
CLIENT_URL=${CLIENT_URL}
NAMESPACE=${NAMESPACE}
GROUP=${GROUP}
FILE_NAME=${FILE_NAME}
NORMAL=${NORMAL}
GRAY_A=${GRAY_A}
GRAY_B=${GRAY_B}
CONSOLE_URL=${CONSOLE_URL}
TOKEN=${TOKEN}
USER_ID=${USER_ID}
EOF

echo "==> done"
echo "CONSOLE_URL=${CONSOLE_URL}"
echo "CLIENT_GET=${CLIENT_URL}/v1/GetConfigFile?namespace=${NAMESPACE}&group=${GROUP}&fileName=${FILE_NAME}&version=0"
echo "OUT_DIR=${OUT_DIR}"
