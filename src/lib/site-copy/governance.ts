import type { SiteLocale } from './types';

export type GovernanceCopy = {
  metadata: {
    title: { absolute: string };
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    lede: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
    items: Array<{ index: string; title: string; detail: string }>;
  };
  scope: {
    index: string;
    title: string;
    intro: string;
    rows: Array<{ index: string; title: string; detail: string }>;
    imageAlt: string;
    captionLabel: string;
    captionNote: string;
  };
  domains: {
    heading: { index: string; title: string; intro: string };
  };
  views: {
    heading: { index: string; title: string; intro: string };
    rows: Array<{ index: string; title: string; detail: string }>;
  };
  releaseLifecycle: {
    heading: { index: string; title: string; intro: string };
    steps: Array<{ index: string; title: string; detail: string }>;
  };
  runtime: {
    heading: { index: string; title: string; intro: string };
    rows: Array<{ index: string; title: string; detail: string }>;
  };
  cta: {
    kicker: string;
    title: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
};

const governanceCopy = {
  'zh-CN': {
    metadata: {
      title: { absolute: '服务治理｜Lattice.Hub' },
      description:
        '了解 Lattice.Hub 九类服务治理规则如何通过作用域、版本、灰度发布与回滚形成确定的运行时策略。',
    },
    hero: {
      eyebrow: 'SERVICE GOVERNANCE',
      title: '九类规则，',
      accent: '一套确定的发布语义。',
      lede: '路由、泳道、限流、熔断、故障探测、无损上下线、调用鉴权、流量镜像与流量 Mock，共享“规则 → 版本化发布 → 生效视图”的完整链路。',
      primary: { href: '/docs/principles/governance-release', label: '阅读治理发布原理' },
      secondary: { href: 'https://github.com/lattice-hub/pole-control-plane', label: '查看源码' },
      items: [
        { index: '01', title: 'SCOPE', detail: '调用关系先于策略内容' },
        { index: '02', title: 'VERSION', detail: '编辑 Revision 与发布版本分离' },
        { index: '03', title: 'ACTIVE', detail: '只有已发布视图进入运行时' },
      ],
    },
    scope: {
      index: '01 / SCOPE BEFORE POLICY',
      title: '先回答「作用于谁」，再回答「执行什么」。',
      intro:
        '治理详情把服务调用范围、规则内容与历史记录留在同一个工作上下文中。这让策略审阅从抽象参数检查，回到一条真实调用关系。',
      rows: [
        { index: '01', title: '服务调用范围', detail: '先定义调用方与被调方，防止规则脱离实际调用关系。' },
        { index: '02', title: '规则与子规则', detail: '在同一策略上下文中查看匹配条件、动作和具体治理参数。' },
        { index: '03', title: '版本与发布历史', detail: '追踪规则如何从编辑内容变为运行时版本，并保留恢复入口。' },
      ],
      imageAlt: 'Lattice.Hub Console 治理规则详情真实界面',
      captionLabel: 'Console · Governance Rule Detail',
      captionNote: '真实产品界面：调用方、被调方、规则粒度与子规则。',
    },
    domains: {
      heading: {
        index: '02 / NINE DOMAINS',
        title: '治理能力不靠散落的开关表达。',
        intro:
          '九类规则使用一致的页面语言理解作用域、内容、版本与发布状态。下列三组是官网的信息组织方式，不代表底层额外的存储层级。',
      },
    },
    views: {
      heading: {
        index: '03 / TWO VIEWS',
        title: '编辑中的规则，与运行中的版本，不是同一件事。',
        intro:
          'Revision 用于标识管理视图中的内容变化；发布版本用于标识一次确定的运行时交付。两者都重要，但不能被同一个“已保存”状态混淆。',
      },
      rows: [
        { index: '01', title: '管理视图', detail: '面向创建、修改与审阅，展示当前规则内容、Revision 与待发布变化。' },
        { index: '02', title: '发布视图', detail: '面向运行时消费，展示已经形成并处于相应发布状态的不可变版本。' },
      ],
    },
    releaseLifecycle: {
      heading: {
        index: '04 / RELEASE LIFECYCLE',
        title: '保存不是生效，发布才是边界。',
        intro: '发布链把人的判断变成确定的运行时版本，并为灰度、全量与恢复保留清晰记录。',
      },
      steps: [
        { index: '01 / EDIT', title: '编辑', detail: '调整规则内容并保存编辑态；这一步不会改变运行时视图。' },
        { index: '02 / RELEASE', title: '发布', detail: '选择已确认内容形成发布版本，并明确灰度或全量范围。' },
        { index: '03 / ACTIVE', title: '生效', detail: '只有处于生效状态的发布版本会进入运行时消费链路。' },
        { index: '04 / RECOVER', title: '恢复', detail: '通过发布历史回到已知版本，不用重新拼凑过去的规则状态。' },
      ],
    },
    runtime: {
      heading: {
        index: '05 / RUNTIME LANDING',
        title: '一份发布语义，落到多种运行时。',
        intro: '控制面提供确定的治理视图，各运行时按自身支持范围消费并执行；这里不把“协议兼容”夸大为“能力完全等价”。',
      },
      rows: [
        { index: '01', title: 'Rust SDK', detail: 'Proxyless：应用进程内直连控制面，读取可支持的治理视图。' },
        { index: '02', title: 'Thin SDK', detail: '多语言契约核心（Go / Java / Python / Node.js / C++ / C#），经 Sidecar Session 接入本地 Pole Sidecar。' },
        { index: '03', title: 'Pole Sidecar', detail: '按当前组件支持范围消费治理视图，并为更多策略保留执行扩展点。' },
        { index: '04', title: 'Proxy Mesh / Gateway', detail: '在网格或网关数据面消费已发布规则。' },
        { index: '05', title: '协议客户端', detail: '通过兼容协议获得相应能力，但不承诺每种运行时覆盖全部九类规则。' },
      ],
    },
    cta: {
      kicker: 'MAKE RELEASE EXPLICIT',
      title: '让每一条运行中规则，都能回到它的发布记录。',
      primary: { href: '/docs/principles/governance-release', label: '阅读发布原理' },
      secondary: { href: 'https://github.com/lattice-hub/pole-control-plane', label: '查看源码' },
    },
  },
  en: {
    metadata: {
      title: { absolute: 'Service Governance | Lattice.Hub' },
      description:
        'Learn how Lattice.Hub’s nine governance rule types form deterministic runtime policy through scope, versioning, canary release, and rollback.',
    },
    hero: {
      eyebrow: 'SERVICE GOVERNANCE',
      title: 'Nine rule types,',
      accent: 'one deterministic release model.',
      lede: 'Routing, lanes, rate limiting, circuit breaking, fault detection, lossless up/down, call authorization, traffic mirroring, and traffic Mock share one chain: rule → versioned release → active view.',
      primary: { href: '/docs/principles/governance-release', label: 'Read governance release principles' },
      secondary: { href: 'https://github.com/lattice-hub/pole-control-plane', label: 'View source' },
      items: [
        { index: '01', title: 'SCOPE', detail: 'Call relationships before policy content' },
        { index: '02', title: 'VERSION', detail: 'Edit Revision separate from release version' },
        { index: '03', title: 'ACTIVE', detail: 'Only published views enter runtime' },
      ],
    },
    scope: {
      index: '01 / SCOPE BEFORE POLICY',
      title: 'Answer “who it applies to” before “what it does.”',
      intro:
        'Governance detail keeps service call scope, rule content, and history in one workspace—so policy review returns to a real call relationship instead of abstract parameter checks.',
      rows: [
        { index: '01', title: 'Service call scope', detail: 'Define caller and callee first so rules stay tied to actual call paths.' },
        { index: '02', title: 'Rules and sub-rules', detail: 'View match conditions, actions, and governance parameters in one policy context.' },
        { index: '03', title: 'Version and release history', detail: 'Track how rules move from edit content to runtime versions, with recovery entry points.' },
      ],
      imageAlt: 'Lattice.Hub Console governance rule detail screen',
      captionLabel: 'Console · Governance Rule Detail',
      captionNote: 'Real product UI: caller, callee, rule granularity, and sub-rules.',
    },
    domains: {
      heading: {
        index: '02 / NINE DOMAINS',
        title: 'Governance capability is not a scatter of toggles.',
        intro:
          'Nine rule types use consistent page language for scope, content, version, and release state. The three groups below are site information architecture—not extra storage tiers.',
      },
    },
    views: {
      heading: {
        index: '03 / TWO VIEWS',
        title: 'Rules being edited and versions in runtime are not the same thing.',
        intro:
          'Revision marks content change in the management view; release version marks one deterministic runtime delivery. Both matter—they must not collapse into one “saved” state.',
      },
      rows: [
        { index: '01', title: 'Management view', detail: 'For create, modify, and review—shows current rule content, Revision, and pending release changes.' },
        { index: '02', title: 'Release view', detail: 'For runtime consumption—shows immutable versions in their corresponding release states.' },
      ],
    },
    releaseLifecycle: {
      heading: {
        index: '04 / RELEASE LIFECYCLE',
        title: 'Save is not active; release is the boundary.',
        intro: 'The release chain turns human judgment into deterministic runtime versions and keeps clear records for canary, full rollout, and recovery.',
      },
      steps: [
        { index: '01 / EDIT', title: 'Edit', detail: 'Adjust rule content and save edit state—this step does not change the runtime view.' },
        { index: '02 / RELEASE', title: 'Release', detail: 'Promote confirmed content to a release version with explicit canary or full scope.' },
        { index: '03 / ACTIVE', title: 'Active', detail: 'Only release versions in active state enter the runtime consumption path.' },
        { index: '04 / RECOVER', title: 'Recover', detail: 'Return to a known version through release history instead of reconstructing past rule state.' },
      ],
    },
    runtime: {
      heading: {
        index: '05 / RUNTIME LANDING',
        title: 'One release model, many runtime shapes.',
        intro: 'The control plane delivers deterministic governance views; each runtime consumes and enforces within its supported scope—we do not equate protocol compatibility with full capability parity.',
      },
      rows: [
        { index: '01', title: 'Rust SDK', detail: 'Proxyless: consume supported governance views in-process against the control plane.' },
        { index: '02', title: 'Thin SDK', detail: 'Multi-language contract cores (Go / Java / Python / Node.js / C++ / C#) that join the local Pole Sidecar via Sidecar Session.' },
        { index: '03', title: 'Pole Sidecar', detail: 'Consume governance views within current component support, with extension points for more policies.' },
        { index: '04', title: 'Proxy Mesh / Gateway', detail: 'Consume published rules in mesh or gateway data planes.' },
        { index: '05', title: 'Protocol clients', detail: 'Gain corresponding capability through compatible protocols without promising all nine rule types on every runtime.' },
      ],
    },
    cta: {
      kicker: 'MAKE RELEASE EXPLICIT',
      title: 'Every live rule should trace back to its release record.',
      primary: { href: '/docs/principles/governance-release', label: 'Read release principles' },
      secondary: { href: 'https://github.com/lattice-hub/pole-control-plane', label: 'View source' },
    },
  },
} as const satisfies Record<SiteLocale, GovernanceCopy>;

export function getGovernanceCopy(locale: SiteLocale): GovernanceCopy {
  return governanceCopy[locale];
}
