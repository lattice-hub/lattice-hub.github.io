#!/usr/bin/env bash
# Create a real multi-gray configuration demo against a running Control Plane Console API.
# Requires: curl, jq
set -euo pipefail

BASE_URL="${POLE_BASE_URL:-http://pole.localhost}"
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
# recreate group if needed (ignore failure if exists)
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

echo "==> list releases"
RELEASES="$(json_req GET "/config/v1/files/releases?namespace=${NAMESPACE}&group=${GROUP}&file_name=${FILE_NAME}&offset=0&limit=20")"
echo "$RELEASES" | tee "${OUT_DIR}/10-list-releases.json" >/dev/null
ACTIVE_GRAY="$(echo "$RELEASES" | jq '[((.data // .configFileReleases // [])[]) | select(.release_type=="gray" and (.active==true or .active==1))] | length')"
ACTIVE_NORMAL="$(echo "$RELEASES" | jq '[((.data // .configFileReleases // [])[]) | select(.release_type=="normal" and (.active==true or .active==1))] | length')"
echo "active normal count: ${ACTIVE_NORMAL}"
echo "active gray count: ${ACTIVE_GRAY}"
[[ "${ACTIVE_NORMAL}" -ge 1 ]] || { echo "expected >=1 active normal"; echo "$RELEASES" | jq .; exit 1; }
[[ "${ACTIVE_GRAY}" -ge 2 ]] || { echo "expected >=2 active grays"; echo "$RELEASES" | jq .; exit 1; }

CONSOLE_URL="${BASE_URL}/configuration/group/files?namespace=${NAMESPACE}&group=${GROUP}&file=${FILE_NAME}"
cat > "${OUT_DIR}/demo.env" <<EOF
BASE_URL=${BASE_URL}
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
echo "OUT_DIR=${OUT_DIR}"
