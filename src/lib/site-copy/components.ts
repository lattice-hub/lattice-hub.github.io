import type { SiteLocale } from './types';

export type ComponentsCopy = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    overline: string;
    title: string;
    intro: string;
  };
  directory: {
    columns: [string, string, string];
  };
  footer: {
    brand: string;
    tagline: string;
    homeLink: string;
  };
};

const componentsCopy = {
  'zh-CN': {
    metadata: {
      title: '组件生态',
      description: 'Pole.IO 组件矩阵与文档入口。',
    },
    hero: {
      overline: 'Component ecosystem',
      title: '从控制面到运行时，组件围绕同一套资源模型协作。',
      intro:
        'Control Plane 定义治理模型、多协议入口与内嵌 Console；Pole Agent、Controller、Pole Sidecar、SDK、Observability 与 Specification 分别承担智能操作、接入、执行、观测和开放契约。',
    },
    directory: {
      columns: ['COMPONENT', 'RESPONSIBILITY', 'IMPLEMENTATION NOTES'],
    },
    footer: {
      brand: 'Lattice Hub',
      tagline: '面向服务与 Agent 的云原生治理控制面。',
      homeLink: '首页',
    },
  },
  en: {
    metadata: {
      title: 'Component Ecosystem',
      description: 'Pole.IO component matrix and documentation entry points.',
    },
    hero: {
      overline: 'Component ecosystem',
      title: 'From control plane to runtime, components collaborate on one resource model.',
      intro:
        'Control Plane defines the governance model, multi-protocol entry, and embedded Console; Pole Agent, Controller, Pole Sidecar, SDK, Observability, and Specification cover intelligent operations, access, execution, observability, and open contracts.',
    },
    directory: {
      columns: ['COMPONENT', 'RESPONSIBILITY', 'IMPLEMENTATION NOTES'],
    },
    footer: {
      brand: 'Lattice Hub',
      tagline: 'Cloud-native governance control plane for services and Agents.',
      homeLink: 'Home',
    },
  },
} as const satisfies Record<SiteLocale, ComponentsCopy>;

export function getComponentsCopy(locale: SiteLocale): ComponentsCopy {
  return componentsCopy[locale];
}
