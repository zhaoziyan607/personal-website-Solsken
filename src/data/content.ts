export const GALLERY_IMAGES = [
  '/gallery/hero/hero-01.webp',
  '/gallery/hero/hero-02.webp',
  '/gallery/hero/hero-03.webp',
  '/gallery/hero/hero-04.webp',
  '/gallery/hero/hero-05.webp',
  '/gallery/hero/hero-06.webp',
  '/gallery/hero/hero-07.webp',
  '/gallery/hero/hero-08.webp',
  '/gallery/hero/hero-09.webp',
  '/gallery/hero/hero-10.webp',
  '/gallery/hero/hero-11.webp',
  '/gallery/hero/hero-12.webp',
  '/gallery/hero/hero-13.webp',
];

export const CHAPTERS = [
  { id: 'hero', label: '首页', num: '' },
  { id: 'strengths', label: '能力优势', num: '01' },
  { id: 'education', label: '教育背景', num: '02' },
  { id: 'experience', label: '实习经历', num: '03' },
  { id: 'skills', label: '技能拆解', num: '04' },
  { id: 'lab', label: '学习探索', num: '05' },
  { id: 'lifestyle', label: '生活体验', num: '06' },
  { id: 'contact', label: '联系我', num: '' },
] as const;

export const COVER = {
  name: 'Solsken',
  subtitle: 'AI 产品经理 / AIGC 图创 / 大模型应用',
  valueProp: '5 段 AI 产品实习 / C、B、G 跨场景 / 0-1 落地',
  identity: '武汉大学 2026 届 / 百度 MEG AI 搜索组',
};

export const HERO_STATEMENT = {
  eyebrow: 'AI Product · Humanistic Fire',
  headline: '把 AI 产品做出人的温度',
  signature: 'Solsken',
  intro:
    '我从武汉大学社会科学训练出发，在百度、京东、美团、小红书、墨泽 AI 的真实业务里，把模型能力、用户洞察、数据评估和审美判断拧成可落地的产品方案。',
  badges: ['2026届本科', 'AI搜索', 'AIGC图创', 'AI产品经理', 'C/B/G跨场景', '0-1落地', '5段产品实习'],
};

export const HERO_TYPEWRITER_LINES = [
  'AI PM / AIGC 图创 / 大模型落地',
  '从社科洞察到产品验证',
  '把模型能力翻译成用户价值',
  '在复杂业务里找到清晰入口',
];

export const FIRE_ABILITIES = [
  {
    title: '把抽象 AI 能力翻译成真实场景',
    label: 'C / B / G',
    summary:
      '既做过 C 端图创与搜索入口，也做过 B 端标注平台、商业化策略和 G 端大模型应用，能在不同业务语境里找到 AI 的产品位置。',
    detail:
      '我会先问清楚用户为什么需要 AI、AI 该承担哪一段工作，再把模型能力拆成入口、流程、验收指标和风险边界。',
    evidence: ['面向 C 端用户', '面向 B 端商家', '面向内部员工', '面向政府组织'],
  },
  {
    title: '从 0-1 把想法推到可验证版本',
    label: '0-1 落地',
    summary:
      '从需求分析、方案设计、原型、排期、测试到上线验收，经历过多个从无到有的功能或平台搭建。',
    detail:
      '我更关注“第一版要证明什么”：先跑通核心链路，再用真实反馈决定下一轮迭代。',
    evidence: ['寻址卡 0-1', 'AI Agent 文案', '数据标注平台极速版'],
  },
  {
    title: '用数据和评估标准校准判断',
    label: 'GSB / AB / NPS',
    summary:
      '不把审美、体验和模型效果停留在感觉层面，而是用业务数据、用户反馈、竞品对标和模型评估一起定位问题。',
    detail:
      '在图创优化、广告策略和标注平台项目里，我习惯把“好不好”拆成可观察、可复盘、可继续追踪的指标。',
    evidence: ['模型 GSB 评估', 'AB 实验', '商户 NPS'],
  },
  {
    title: '在复杂协作里保持产品节奏',
    label: '跨团队推进',
    summary:
      '和算法、前后端、架构、测试、设计、风控、数据等角色协作时，能把不确定性前置拆解，让团队知道下一步为什么做、怎么做。',
    detail:
      '我的优势不是只会写 PRD，而是能在多方目标不完全一致时，持续把问题拉回用户价值、上线节奏和风险控制。',
    evidence: ['分阶段上线', '测试验收', '风险分层管控'],
  },
  {
    title: '把人文敏感度变成产品温度',
    label: '人的温度',
    summary:
      '社会科学训练、内容表达和长期自我复盘，让我对人的情绪、动机、关系和语境更敏感。',
    detail:
      '我希望做出的 AI 产品不是冷冰冰地展示能力，而是让用户少一点困惑、多一点被理解。',
    evidence: ['用户访谈', '内容审美', '共情表达'],
  },
];

export const EDUCATION = {
  school: '武汉大学',
  college: '政治与公共管理学院',
  major: '政治学与行政学',
  period: '2022.09 - 2026.06',
  honors: [
    '国家励志奖学金',
    '武汉大学丙等奖学金',
    '校级优秀学生干部',
    '优秀学生',
    '优秀校级共青团员',
    '优秀院级学生干部',
    '入党积极分子优秀学员',
    '中国国际大学生创新大赛武大选拔赛银奖',
    '玩转智能体 AI 学习营三等奖',
  ],
  campus: [
    '武汉大学青年志愿者协会文化宣传组负责人',
    '公众号 2 万+ 关注，参与 50+ 推文、海报、摄影与线下物料设计',
    '主导 8 位部门负责人访谈与人物志内容策划',
  ],
  bridge: [
    {
      title: '社会科学研究',
      detail: '训练我把复杂问题拆成结构、角色、动机和制度约束，适合做 AI 产品需求挖掘。',
    },
    {
      title: '审美与内容表达',
      detail: '长期文宣、摄影和内容策划经历，让我更在意产品的表达方式、信息密度和情绪感。',
    },
    {
      title: '数据分析训练',
      detail: 'SQL、SPSS、Stata 等工具让我能把体验判断和数据证据放在同一张桌上讨论。',
    },
    {
      title: '人的理解',
      detail: '用户思维、人文关怀、共情、逻辑和价值判断，是我理解 AI 产品边界的底色。',
    },
  ],
};

export const CAMPUS_LANDMARKS = [
  {
    title: '荣誉坐标',
    badge: 'Honors',
    detail: EDUCATION.honors.join(' · '),
  },
  {
    title: '青协文宣组',
    badge: 'Campus Lead',
    detail:
      '负责文化宣传组工作，连接内容、视觉、采访与组织协作，把表达力和推进力练成基本功。',
  },
  {
    title: '社科到 AI 产品',
    badge: 'Bridge',
    detail:
      '社会科学给我理解人的方法，AI 产品经历给我把理解落成流程、指标和功能的能力。',
  },
];

export const JOURNEY_NODES = [
  {
    company: '百度',
    motif: '入灯塔驿站',
    period: '2025.04 - 至今',
    role: 'AIGC 图创产品经理 / MEG AI 搜索组',
    summary: '在 C 端图创场景里，把模型、入口和用户心智连接起来。',
    projects: [
      {
        title: '图创模型拓展与垂类优化',
        metrics: ['日均创作 PV +5.6 万', '图片下载率 +3.04%', '模型矩阵 2 -> 4'],
        detail: '通过用户反馈、业务数据、竞品对标和 GSB 评估定位痛点，推动基础模型、人像模型和海报垂类优化。',
      },
      {
        title: '增强图创场景搜索渗透',
        metrics: ['中需卡点击率 +42%', '双端召回 +179 万', '寻址卡 0-1'],
        detail: '拆解全链路漏斗，推动策略分发、缓存逻辑、召回扩展和品牌标题升级。',
      },
      {
        title: '图创产品形态融合',
        metrics: ['进行中'],
        detail: '推动“画一画”产品形态融合升级，强化用户对图创能力的理解。',
      },
    ],
  },
  {
    company: '京东',
    motif: '文案工坊',
    period: '2024.11 - 2025.01',
    role: '商业化 AI 产品经理 / 零售市场部',
    summary: '把 AI Agent 放进社交电商营销语境，让文案更贴近人。',
    projects: [
      {
        title: '社交电商营销文案个性化',
        metrics: ['腰部活跃群点击活跃率 +1pp', '2 个 AI Agent 0-1 设计'],
        detail: '基于 HVA 方法论组织角色、能力、工作流、案例、槽位和约束输出，优化社群机器人文案。',
      },
    ],
  },
  {
    company: '美团',
    motif: '商业小桥',
    period: '2024.08 - 2024.10',
    role: '商业化策略产品经理 / 本地核心生活',
    summary: '从商户 NPS 里找利益点，用策略设计撬动广告收入。',
    projects: [
      {
        title: '上新品效广告',
        metrics: ['广告收入 +3.16%', '广告消耗 +4.64%', 'ROI +0.93%'],
        detail: '设计流量定价策略与轮播样式创新，上线 2 周验证效果。',
      },
    ],
  },
  {
    company: '小红书',
    motif: '风控路牌',
    period: '2024.06 - 2024.08',
    role: '智能标注平台风控产品经理 / 风控团队',
    summary: '在平台效率和风险边界之间，搭建更清晰的工作流。',
    projects: [
      {
        title: '数据标注平台极速版搭建',
        metrics: ['50+ 页功能设计', '200+ 项目迁移管理'],
        detail: '整合 20+ 竞品借鉴点，0-1 设计新标注平台极速版全流程。',
      },
      {
        title: '风控平台策略标签优化',
        metrics: ['配置人效提升'],
        detail: '增加自动通知、标签快捷展示、风险二确等能力。',
      },
    ],
  },
  {
    company: '墨泽 AI',
    motif: '初火营地',
    period: '2024.03 - 2024.05',
    role: 'AIGC 产品助理 / 应用部',
    summary: '第一次在 G 端大模型项目里，从 0 到 1 看见产品如何落地。',
    projects: [
      {
        title: '大语言模型产品研发',
        metrics: ['130+ 优化建议', '百万合同订单'],
        detail: '参与国网 G 端大模型建设，跟进智能体对话和 RAG 知识库管理。',
      },
    ],
  },
];

export const SKILL_FLAME_LAYERS = [
  {
    id: 'cognition',
    title: '懂 AI',
    subtitle: '知道什么场景该用什么能力',
    intensity: 'base',
    accent: '#b98a45',
    skills: [
      '搜索文生图',
      '对话式大模型',
      'Prompt 设计',
      '企业知识库问答',
      '营销 Agent',
      'RAG',
      '模型 AB / GSB 评测',
      '垂类模型迭代',
      'SQL / SPSS 数据分析',
    ],
  },
  {
    id: 'delivery',
    title: '做产品',
    subtitle: '把 AI 从想法推到上线',
    intensity: 'core',
    accent: '#ef8f45',
    skills: [
      'AI 需求拆解',
      '场景方案设计',
      '0-1 功能搭建',
      '老产品 AI 化',
      '多轮对话交互',
      'AI 交互设计',
      '跨团队推实验',
      '分阶段风险管控',
      '效果验收标准定义',
    ],
  },
  {
    id: 'impact',
    title: '拿结果',
    subtitle: '用数据证明 AI 真的有用',
    intensity: 'hot',
    accent: '#f2dba4',
    skills: [
      '创作量增长',
      '入口渗透提升',
      '留存与活跃',
      'G 端项目签单',
      '合同签单',
      '广告 ROI',
      '漏斗实验复盘',
      '体验 + 模型 + 业务三维复盘',
      '用户增长渗透',
    ],
  },
];

export const LAB_PROJECTS = [
  {
    name: 'Prompt Reverse',
    tagline: 'AI 绘画提示词反向生成工具',
    description: '上传任意图片，AI 反向生成结构化绘画 Prompt，支持二次编辑。',
    painPoint: '解决“看到好图却写不出 Prompt”的痛点，降低 AI 绘画入门门槛。',
    progress: 70,
    status: '开发中',
  },
  {
    name: 'Tiny 小步',
    tagline: '拖延场景下的 AI 任务分解助手',
    description: '把大任务拆成 2 分钟能完成的小步，AI 帮你分解与温柔督促。',
    painPoint: '大任务让人无从下手，让“开始”这件事变得不那么难。',
    progress: 65,
    status: '完善中',
  },
];

export type AiToolScenario = {
  id: string;
  scene: string;
  glyph: string;
  desc: string;
  tools: string[];
  hue: string;
  featured?: boolean;
};

export const AI_TOOL_SCENARIOS: AiToolScenario[] = [
  {
    id: 'code',
    scene: 'Code',
    glyph: '码',
    desc: '把想法快速变成可交互原型，也用 AI 做代码审阅与调试陪跑。',
    tools: ['Codex', 'Claude Code', 'Antigravity', 'ChatGPT', 'Gemini', 'DeepSeek'],
    hue: '#ef8f45',
    featured: true,
  },
  {
    id: 'writing',
    scene: '文档撰写',
    glyph: '文',
    desc: 'PRD、访谈提纲、竞品拆解、复盘材料的结构化起草与润色。',
    tools: ['ChatGPT', 'Claude', 'Kimi', '豆包', '秘塔 AI', 'Grok'],
    hue: '#d5b56f',
  },
  {
    id: 'data',
    scene: '数据处理',
    glyph: '数',
    desc: '清洗表格、生成分析口径、辅助 SQL / SPSS 思路和可视化解释。',
    tools: ['ChatGPT', 'DeepSeek', 'Gemini', '千问', '文心', 'Claude'],
    hue: '#c9a96e',
  },
  {
    id: 'eval',
    scene: '自动化评估',
    glyph: '评',
    desc: '构造评测样例、对比模型输出、辅助 GSB / AB 实验复盘。',
    tools: ['AI Studio', 'Coze', '智谱清言', 'Minimax', 'Grok', '千问'],
    hue: '#e4a55a',
  },
  {
    id: 'learning',
    scene: '知识学习科普',
    glyph: '学',
    desc: '把长资料拆成课程、卡片、问答，也做科普内容的结构化整理。',
    tools: ['NotebookLM', 'Obsidian + AI', 'Kimi', '秘塔 AI', 'DeepSeek', 'ChatGPT'],
    hue: '#f2b35d',
    featured: true,
  },
  {
    id: 'companion',
    scene: '情感陪伴',
    glyph: '伴',
    desc: '情绪复盘、日记整理、轻量倾诉和给自己一点被理解的回应。',
    tools: ['Claude', 'Grok', '豆包', 'Minimax', 'ChatGPT'],
    hue: '#c86f4a',
  },
  {
    id: 'assets',
    scene: '素材生产',
    glyph: '材',
    desc: '图片提示词、内容灵感、脚本、海报文案和多版本表达。',
    tools: ['豆包', '千问', '文心', 'ChatGPT', 'Coze', 'Gemini'],
    hue: '#be8d55',
  },
  {
    id: 'thinking',
    scene: '交流思考',
    glyph: '思',
    desc: '模拟面试、观点辩论、CoffeeChat 预热和把模糊想法聊清楚。',
    tools: ['Claude', 'Grok', 'DeepSeek', 'ChatGPT', 'Minimax', 'Kimi'],
    hue: '#a8794a',
  },
  {
    id: 'music',
    scene: '音乐创作',
    glyph: '音',
    desc: '用 AI 辅助歌词、旋律概念、歌单氛围和创作草稿。',
    tools: ['Suno', 'Minimax', '豆包', 'ChatGPT'],
    hue: '#d8b86c',
  },
  {
    id: 'navigation',
    scene: '路线规划',
    glyph: '路',
    desc: '旅行出行前规划路线，AI 整合交通、时间和预算，把「去哪」变成可执行的计划。',
    tools: ['ChatGPT', 'Gemini', '千问', 'Kimi'],
    hue: '#b08850',
  },
  {
    id: 'translation',
    scene: '语言翻译',
    glyph: '译',
    desc: '阅读英文资料、处理外语邮件、双语写作，AI 翻译比工具类更自然、更有语境感。',
    tools: ['Claude', 'DeepSeek', 'ChatGPT', 'Grok'],
    hue: '#c8a060',
  },
];

export const AI_KNOWLEDGE_STACK = {
  title: '个人知识库',
  glyph: '库',
  desc: '把阅读、项目复盘和灵感碎片沉淀成可检索的第二大脑。',
  tools: ['Obsidian + AI', 'NotebookLM'],
  hue: '#f2dba4',
};

export const AI_TOOLS_META = {
  headline: 'AI 工具日常星盘',
  intro:
    '我不只在工作里做 AI 产品，也把各类 AI 工具真正放进日常：写代码、写文档、处理数据、搭评测、整理知识库，也用来生产素材、激发思考、创作音乐和给自己一点陪伴。',
  scenarioCount: AI_TOOL_SCENARIOS.length,
  toolCount: new Set([
    ...AI_TOOL_SCENARIOS.flatMap((item) => item.tools),
    ...AI_KNOWLEDGE_STACK.tools,
  ]).size,
};

/** 按出现频次排序的常用工具，供星盘侧边栏展示 */
export const AI_TOOLS_FREQUENT = [...new Set(AI_TOOL_SCENARIOS.flatMap((item) => item.tools))]
  .map((tool) => ({
    name: tool,
    count: AI_TOOL_SCENARIOS.filter((item) => item.tools.includes(tool)).length,
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 8);

export const LIFESTYLE = {
  quote: '把冰冷的技术做出人的温度。',
};

export const LIFESTYLE_FRAGMENTS = [
  {
    title: '人文小火苗',
    note: '在高效逻辑里保留意义感，相信产品最后仍然要回到人。',
    glyph: '火',
  },
  {
    title: '情绪海绵',
    note: '敏感细腻，能捕捉微小感动，也能在沟通里快速感知温度。',
    glyph: '光',
  },
  {
    title: 'CoffeeChat',
    note: '真诚外向自来熟，期待和有趣的人发生真诚碰撞。',
    glyph: '杯',
  },
  {
    title: '骑行与摄影',
    note: '喜欢在路上，也喜欢记录街头光影和温柔的瞬间。',
    glyph: '路',
  },
  {
    title: '猫雷达',
    note: '路过草丛自动扫描，生活里有一点轻快的可爱偏航。',
    glyph: '爪',
  },
  {
    title: '向内复盘',
    note: '爱写日记和摘抄，常年把经历拆开、揉碎、再长出来。',
    glyph: '记',
  },
];

export const LIFESTYLE_GALLERY_ITEMS = [
  { title: 'E 人社交', note: '喜欢 CoffeeChat，也相信很多机会从真诚聊天开始。', hue: '#f2b35d', image: '/gallery/lifestyle/social.jpg' },
  { title: '抽象', note: '脑内弹幕很多，灵感经常绕路抵达。', hue: '#a8794a', image: '/gallery/lifestyle/abstract.jpg' },
  { title: '共情力', note: '能听见话外音，也愿意为具体的人多想一步。', hue: '#e4c27b', image: '/gallery/lifestyle/empathy.jpg' },
  { title: '理财探索', note: '认真研究钱怎样流动，也研究选择怎样影响人生。', hue: '#be8d55', image: '/gallery/lifestyle/finance.jpg' },
  { title: '玄学视角', note: '左眼跳财，右眼迷信（bushi）', hue: '#b94732', image: '/gallery/lifestyle/mysticism.jpg' },
  { title: '音乐 / 骑行 / 摄影', note: '把生活里的光、风和节奏存进身体。', hue: '#f0a35d', image: '/gallery/lifestyle/photography.jpg' },
  { title: '日料 / 甜品', note: '喜欢精致、清爽、带一点仪式感的味觉小确幸。', hue: '#f2dba4', image: '/gallery/lifestyle/japanese-food.jpg' },
  { title: '喝酒调酒', note: '喜欢研究风味层次，也喜欢微醺时更松弛的聊天。', hue: '#c86f4a', image: '/gallery/lifestyle/drinking.jpg' },
  { title: '猫雷达', note: '看到猫会自动慢下来，像生活里自带柔光的暂停键。', hue: '#d8b86c', image: '/gallery/lifestyle/cat.jpg' },
  { title: '善于内观', note: '习惯向内观察、复盘情绪和动机，再把自己重新整理好。', hue: '#ef8f45', image: '/gallery/lifestyle/introspection.jpg' },
];

export const CONTACT = {
  email: '18634137156@163.com',
  wechat: 'z18634137156',
  tara: '588333',
  closing: '如果你想聊聊 AI 产品、实习或合作，欢迎随时找我。',
};

export const COFFEE_CHAT_MOODS = [
  {
    id: 'happy',
    label: '开心',
    tone: '像火星一样亮一下',
    color: '#f2b35d',
  },
  {
    id: 'curious',
    label: '好奇',
    tone: '像光路一样向前探',
    color: '#d8b86c',
  },
  {
    id: 'chat',
    label: '交流',
    tone: '像咖啡一样慢慢热',
    color: '#c86f4a',
  },
] as const;

export const SKILL_GROUPS = SKILL_FLAME_LAYERS.map((layer) => ({
  title: layer.title,
  skills: layer.skills,
}));
