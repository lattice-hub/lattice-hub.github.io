import type { SiteLocale } from './types';

export type AgentCopy = {
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
  workbench: {
    heading: { index: string; title: string; intro: string };
    imageAlt: string;
    captionLabel: string;
    captionNote: string;
  };
  changeFlow: {
    heading: { index: string; title: string; intro: string };
    steps: Array<{ index: string; title: string; detail: string }>;
  };
  safetyLayers: {
    heading: { index: string; title: string; intro: string };
    layers: Array<{ index: string; title: string; detail: string }>;
  };
  roles: {
    heading: { index: string; title: string; intro: string };
    items: Array<{ index: string; title: string; detail: string }>;
  };
  boundary: {
    heading: { index: string; title: string; intro: string };
    available: { label: string; title: string; items: string[] };
    notCovered: { label: string; title: string; items: string[] };
  };
  releaseChain: {
    heading: { index: string; title: string; intro: string };
    ariaLabel: string;
    steps: string[];
  };
  cta: {
    kicker: string;
    title: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
};

const agentCopy = {
  'zh-CN': {
    metadata: {
      title: { absolute: 'Pole Agent｜由人把关的控制面变更助手' },
      description:
        '了解 Pole Agent 如何在登录用户权限内读取控制面上下文、生成已有配置更新提案，并在人工确认后仅保存草稿。',
    },
    hero: {
      eyebrow: 'POLE AGENT / HUMAN-GATED CONTROL PLANE',
      title: '让 Agent 理解变更，',
      accent: '但不替你发布。',
      lede: 'Pole Agent 在登录用户权限内通过 Pole MCP 读取 Namespace、MCP Registry 与已有配置。LLM 结合这些上下文，由内部 proposal 工具与确认内核形成更新提案；人检查并确认后，它只保存编辑态草稿，真正的发布仍由人把关。',
      primary: { href: '/docs/principles/ai-registry', label: '阅读 AI Registry 原理' },
      secondary: { href: '/docs/practices/agent-discovery', label: '了解能力目录发现' },
      items: [
        { index: '01', title: 'READ', detail: 'Namespace、配置与 MCP Registry' },
        { index: '02', title: 'PROPOSE', detail: '已有配置的更新提案' },
        { index: '03', title: 'WRITE', detail: '人工确认后的编辑态草稿' },
        { index: '04', title: 'RELEASE', detail: '始终回到确定性的人工流程' },
      ],
    },
    workbench: {
      heading: {
        index: '01 / REAL WORKBENCH',
        title: '安全边界，应该在工作台里真实可见。',
        intro:
          'Pole Agent 会展示当前资源范围、连接状态、记忆窗口与操作权限。运行配置不完整时，工作台保持不可执行状态，而不是让模型带着未知上下文继续尝试。',
      },
      imageAlt: 'Pole Agent 工作台真实界面，展示连接状态、操作权限与运行配置检查',
      captionLabel: 'Console · Pole Agent Readiness',
      captionNote: '真实就绪检查状态：配置不完整时 fail closed；资源查询允许，生成变更需确认，直接发布禁止。',
    },
    changeFlow: {
      heading: {
        index: '02 / CONTROLLED CHANGE',
        title: '一次可审阅的变化，而不是一句不可追溯的指令。',
        intro:
          'Pole Agent 的价值不在于跳过控制面，而在于把自然语言意图翻译为可检查的差异，再把明确的人类确认交还给既有产品流程。',
      },
      steps: [
        { index: '01', title: '描述意图', detail: '用户用自然语言说明要修改的已有配置与期望结果。' },
        { index: '02', title: '读取上下文', detail: '在登录用户权限内读取 Namespace、MCP Registry 与配置文件。' },
        { index: '03', title: '形成提案', detail: 'LLM 结合 Pole MCP 读取的上下文，由内部 proposal 工具与确认内核形成不可变提案。' },
        { index: '04', title: '检查差异', detail: '把原始内容与提议内容并列呈现，让人判断变化是否正确。' },
        { index: '05', title: '确认草稿', detail: '人工确认后，Agent 只把内容写入编辑态草稿。' },
        { index: '06', title: '进入发布', detail: '后续发布、回滚与删除继续由确定性的产品流程承担。' },
      ],
    },
    safetyLayers: {
      heading: {
        index: '03 / SAFETY LAYERS',
        title: '提示词负责表达，边界必须由系统执行。',
        intro: '从工具白名单到确认内核，再到独立发布链，每一层都缩小 Agent 可做的事情，并让变化保留可审计的产品语义。',
      },
      layers: [
        { index: '01 / INTERACTION', title: 'Pole Agent', detail: '组织对话、上下文与提案预览，让意图和差异可被人理解。' },
        { index: '02 / TOOL BOUNDARY', title: 'Pole MCP', detail: '只暴露白名单工具与明确参数，不把任意内部能力直接交给模型。' },
        { index: '03 / CONFIRMATION', title: '确认内核', detail: '校验登录身份、资源权限、提案内容与确认动作；提示词不是安全边界。' },
        { index: '04 / RELEASE', title: '产品发布链', detail: '草稿之外的生效、灰度、回滚与删除仍进入确定性的人工流程。' },
      ],
    },
    roles: {
      heading: {
        index: '04 / THREE ROLES',
        title: '助手、工具目录与 Agent 目录，各自负责一件事。',
        intro: '三个概念共同服务于 AI Native 控制面，但不能互相替代。把角色分清，才能避免把“可发现”误解为“可自动执行”。',
      },
      items: [
        { index: '01 / ASSISTANT', title: 'Pole Agent', detail: '理解控制面上下文、准备变化、解释差异；不替操作者执行最终发布。' },
        { index: '02 / TOOL CATALOG', title: 'MCP Registry', detail: '登记可被发现的 MCP Server、工具与能力元数据，不承担任意工具执行。' },
        { index: '03 / AGENT CATALOG', title: 'A2A Registry', detail: '登记 Agent Card、技能与能力元数据，不承担 Agent 任务和运行时托管。' },
      ],
    },
    boundary: {
      heading: {
        index: '05 / CURRENT BOUNDARY',
        title: '今天能做什么，同样要说清还不能做什么。',
        intro: '官网只描述当前已经形成的最小闭环。以下边界会随着产品演进更新，但不会用未来方向替代当前事实。',
      },
      available: {
        label: 'AVAILABLE TODAY',
        title: '已形成闭环',
        items: [
          '读取 Namespace、MCP Registry 与已有配置文件',
          'LLM 结合 Pole MCP 只读上下文，由内部 proposal 工具形成已有配置更新提案',
          '展示不可变提案与差异预览',
          '人工确认后保存编辑态草稿',
        ],
      },
      notCovered: {
        label: 'NOT COVERED',
        title: '当前不在范围内',
        items: [
          '自动发布、自动回滚或自动删除',
          '治理规则写入与新建配置文件',
          '任意控制面资源的通用写入',
          '流式输出与服务端会话持久化',
        ],
      },
    },
    releaseChain: {
      heading: {
        index: '06 / HUMAN RELEASE CHAIN',
        title: 'Agent 准备变更，人拥有发布决定。',
        intro: '这不是对自动化能力的削弱，而是让 AI 进入生产控制面时仍然服从权限、版本、发布与回滚语义。',
      },
      ariaLabel: 'Pole Agent 人工发布链',
      steps: ['自然语言意图', '不可变提案', '差异预览', '人工确认', '编辑态草稿', '确定性发布'],
    },
    cta: {
      kicker: 'HUMAN-GATED BY DESIGN',
      title: '让 Agent 看懂控制面，让发布继续可控。',
      primary: { href: '/docs/principles/ai-registry', label: '阅读设计原理' },
      secondary: { href: 'https://github.com/lattice-hub/pole-control-plane', label: '查看源码' },
    },
  },
  en: {
    metadata: {
      title: { absolute: 'Pole Agent | Human-Gated Control Plane Change Assistant' },
      description:
        'Learn how Pole Agent reads control-plane context within signed-in user permissions, generates update proposals for existing configuration, and saves drafts only after human confirmation.',
    },
    hero: {
      eyebrow: 'POLE AGENT / HUMAN-GATED CONTROL PLANE',
      title: 'Help Agents understand change—',
      accent: 'without releasing for you.',
      lede: 'Within signed-in user permissions, Pole Agent reads Namespaces, the MCP Registry, and existing configuration through Pole MCP. The LLM uses that context; internal proposal tooling and a confirmation kernel form update proposals. After human review and confirmation, it saves edit-state drafts only—release stays human-gated.',
      primary: { href: '/docs/principles/ai-registry', label: 'Read AI Registry principles' },
      secondary: { href: '/docs/practices/agent-discovery', label: 'Learn capability catalog discovery' },
      items: [
        { index: '01', title: 'READ', detail: 'Namespace, configuration, and MCP Registry' },
        { index: '02', title: 'PROPOSE', detail: 'Update proposals for existing configuration' },
        { index: '03', title: 'WRITE', detail: 'Edit-state drafts after human confirmation' },
        { index: '04', title: 'RELEASE', detail: 'Always returns to deterministic human flows' },
      ],
    },
    workbench: {
      heading: {
        index: '01 / REAL WORKBENCH',
        title: 'Safety boundaries should be visible in the workbench.',
        intro:
          'Pole Agent shows current resource scope, connection state, memory window, and operation permissions. When runtime configuration is incomplete, the workbench stays non-executable instead of letting the model proceed with unknown context.',
      },
      imageAlt: 'Pole Agent workbench showing connection state, operation permissions, and runtime configuration checks',
      captionLabel: 'Console · Pole Agent Readiness',
      captionNote: 'Real readiness checks: fail closed when configuration is incomplete; resource queries allowed, change generation requires confirmation, direct release forbidden.',
    },
    changeFlow: {
      heading: {
        index: '02 / CONTROLLED CHANGE',
        title: 'One reviewable change—not one untraceable command.',
        intro:
          'Pole Agent’s value is not bypassing the control plane—it translates natural-language intent into inspectable diffs and returns explicit human confirmation to existing product flows.',
      },
      steps: [
        { index: '01', title: 'Describe intent', detail: 'The user explains in natural language which existing configuration to change and the desired outcome.' },
        { index: '02', title: 'Read context', detail: 'Read Namespace, MCP Registry, and configuration files within signed-in user permissions.' },
        { index: '03', title: 'Form proposal', detail: 'The LLM uses Pole MCP context; internal proposal tooling and the confirmation kernel produce an immutable proposal.' },
        { index: '04', title: 'Inspect diff', detail: 'Original and proposed content appear side by side for human judgment.' },
        { index: '05', title: 'Confirm draft', detail: 'After human confirmation, Agent writes content to edit-state draft only.' },
        { index: '06', title: 'Enter release', detail: 'Subsequent release, rollback, and delete remain in deterministic product flows.' },
      ],
    },
    safetyLayers: {
      heading: {
        index: '03 / SAFETY LAYERS',
        title: 'Prompts express intent; boundaries must be enforced by the system.',
        intro: 'From tool allowlists to the confirmation kernel to an independent release chain, each layer narrows what Agent may do and preserves auditable product semantics.',
      },
      layers: [
        { index: '01 / INTERACTION', title: 'Pole Agent', detail: 'Organizes conversation, context, and proposal preview so intent and diffs stay understandable.' },
        { index: '02 / TOOL BOUNDARY', title: 'Pole MCP', detail: 'Exposes allowlisted tools with explicit parameters—does not hand arbitrary internal capability to the model.' },
        { index: '03 / CONFIRMATION', title: 'Confirmation kernel', detail: 'Validates signed-in identity, resource permissions, proposal content, and confirmation action—prompts are not the security boundary.' },
        { index: '04 / RELEASE', title: 'Product release chain', detail: 'Activation, canary, rollback, and delete beyond drafts still enter deterministic human flows.' },
      ],
    },
    roles: {
      heading: {
        index: '04 / THREE ROLES',
        title: 'Assistant, tool catalog, and Agent catalog—each owns one job.',
        intro: 'Three concepts serve an AI-native control plane but do not replace one another. Separating roles prevents mistaking “discoverable” for “automatically executable.”',
      },
      items: [
        { index: '01 / ASSISTANT', title: 'Pole Agent', detail: 'Understands control-plane context, prepares change, explains diffs—does not perform final release for the operator.' },
        { index: '02 / TOOL CATALOG', title: 'MCP Registry', detail: 'Registers discoverable MCP Servers, tools, and capability metadata—does not execute arbitrary tools.' },
        { index: '03 / AGENT CATALOG', title: 'A2A Registry', detail: 'Registers Agent Cards, skills, and capability metadata—does not run Agent tasks or host runtimes.' },
      ],
    },
    boundary: {
      heading: {
        index: '05 / CURRENT BOUNDARY',
        title: 'State clearly what works today—and what does not yet.',
        intro: 'The site describes only the minimal closed loop that exists now. Boundaries will evolve with the product—we will not substitute roadmap for current fact.',
      },
      available: {
        label: 'AVAILABLE TODAY',
        title: 'Closed loop in place',
        items: [
          'Read Namespace, MCP Registry, and existing configuration files',
          'LLM with Pole MCP read-only context; internal proposal tooling forms update proposals for existing configuration',
          'Show immutable proposals and diff previews',
          'Save edit-state drafts after human confirmation',
        ],
      },
      notCovered: {
        label: 'NOT COVERED',
        title: 'Out of scope today',
        items: [
          'Automatic release, rollback, or delete',
          'Governance rule writes and new configuration files',
          'Generic writes to arbitrary control-plane resources',
          'Streaming output and server-side session persistence',
        ],
      },
    },
    releaseChain: {
      heading: {
        index: '06 / HUMAN RELEASE CHAIN',
        title: 'Agent prepares change; humans own release decisions.',
        intro: 'This is not weakening automation—it keeps AI in production control planes subject to permissions, versions, release, and rollback semantics.',
      },
      ariaLabel: 'Pole Agent human release chain',
      steps: ['Natural-language intent', 'Immutable proposal', 'Diff preview', 'Human confirmation', 'Edit-state draft', 'Deterministic release'],
    },
    cta: {
      kicker: 'HUMAN-GATED BY DESIGN',
      title: 'Let Agents read the control plane; keep release under control.',
      primary: { href: '/docs/principles/ai-registry', label: 'Read design principles' },
      secondary: { href: 'https://github.com/lattice-hub/pole-control-plane', label: 'View source' },
    },
  },
} as const satisfies Record<SiteLocale, AgentCopy>;

export function getAgentCopy(locale: SiteLocale): AgentCopy {
  return agentCopy[locale];
}
