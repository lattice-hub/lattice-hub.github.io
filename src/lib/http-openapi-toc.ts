import type { TOCItemType } from 'fumadocs-core/toc';
import {
  getHttpOpenApiSection,
  type ApiLocale,
} from '@/lib/http-openapi-reference';

/** Docs slug path (after `api/http-openapi/`) → OpenAPI section id. */
const slugToSection: Record<string, string> = {
  auth: 'auth',
  'auth/users': 'auth-users',
  'auth/groups': 'auth-groups',
  'auth/roles': 'auth-roles',
  'auth/policies': 'auth-policies',
  admin: 'admin',
  namespaces: 'namespaces',
  services: 'services',
  'services/contracts': 'services-contracts',
  'services/topology': 'services-topology',
  'services/instances': 'instances',
  'config/groups': 'config-groups',
  'config/files': 'config-files',
  'config/gray': 'config-gray',
  'config/templates': 'config-templates',
  'governance/routing': 'routing',
  'governance/rate-limit': 'rate-limit',
  'governance/circuit-breaker': 'circuit-breaker',
  'governance/fault-detect': 'fault-detect',
  'governance/lane': 'lane',
  'governance/lossless': 'lossless',
  'governance/traffic-security': 'traffic-security',
  'governance/traffic-mirror': 'traffic-mirror',
  'governance/traffic-mock': 'traffic-mock',
  'ai/mcp': 'mcp',
  'ai/a2a': 'a2a',
  client: 'client',
};

export function resolveHttpOpenApiSectionId(slug?: string[]): string | undefined {
  if (!slug || slug[0] !== 'api' || slug[1] !== 'http-openapi') {
    return undefined;
  }
  const rest = slug.slice(2).join('/');
  if (!rest) {
    return undefined;
  }
  return slugToSection[rest];
}

export function getHttpOpenApiToc(
  sectionId: string,
  locale: ApiLocale,
): TOCItemType[] {
  const section = getHttpOpenApiSection(sectionId);
  if (!section) {
    return [];
  }

  return section.endpoints.map((endpoint) => ({
    title: `${endpoint.method} ${endpoint.title[locale]}`,
    url: `#${endpoint.id}`,
    depth: 2,
  }));
}
