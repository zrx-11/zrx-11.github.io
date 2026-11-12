import type { Config } from './types';

const LOVE_DATE = '2024-05-20';

/**
 * 默认配置：只包含可以公开的示例数据，不含任何真实个人信息。
 * 实际使用时请通过项目根目录的 config.json 覆盖（见 README）。
 */
export const DEFAULT_CONFIG: Config = {
  boy: '阿辰',
  girl: '小满',
  loveDate: LOVE_DATE,
  marriageDate: '',
  milestones: [
    {
      date: LOVE_DATE,
      label: '初次见面',
      icon: '✦',
      story: '那天人群很吵，只有你说话的时候，世界安静了一下。',
    },
    {
      date: '2024-08-16',
      label: '第一次远行',
      icon: '✈',
      story: '错过了末班车，就在站台上把行李箱当桌子，吃了一顿很咸的晚饭。',
    },
    {
      date: '2024-12-31',
      label: '跨年',
      icon: '☾',
      story: '倒数到零的时候，你在耳边说了一句新年快乐，比烟花响。',
    },
    {
      date: '2025-05-20',
      label: '一周年',
      icon: '❦',
      story: '把这一年的照片摊在床上，才发现我们笑得越来越像。',
    },
  ],
  quotes: [
    '日子很普通，只是你在',
    '把漫长的以后，分给你一半',
    '写信是慢的，喜欢也是',
    '我们不赶时间，慢慢走',
    '所有远方，都想和你去一次',
    '愿你夜里好眠，白天有光',
  ],
  music: {
    enabled: false,
    autoPlay: false,
    playMode: 'sequence',
    allowModeSwitch: true,
    startPolicy: 'first',
    volume: 0.7,
    rememberState: true,
    smartShuffleWindow: 3,
    tracks: [],
  },
  secretMessage: '有些话不必说出口，写在纸上就好。',
  photos: [
    { url: '/photos/demo-01.jpg', caption: '傍晚的窗' },
    { url: '/photos/demo-02.jpg', caption: '一起走过的那条街' },
    { url: '/photos/demo-03.jpg', caption: '桌上的两只杯子' },
    { url: '/photos/demo-04.jpg', caption: '黄昏时的车站' },
  ],
  googleAnalyticsId: '',
  siteUrl: 'https://shiguang.example.com',
  siteName: '拾光',
  siteLocale: 'zh-CN',
  siteImage: '/og.png',
  siteLogo: '/favicon.svg',
  seoDescription: '',
  shareTemplates: ['classic', 'minimal', 'romantic'],
  statsMode: 'auto',
  stats: [],
  statsShowVisitCount: false,
  wishes: [
    { text: '一起看一次海', done: false },
    { text: '学会做对方爱吃的那道菜', done: true },
    { text: '把今年的照片做成一本相册', done: false },
    { text: '在同一个城市看一次雪', done: false },
  ],
  timers: [
    { label: '在一起', icon: '❦', date: LOVE_DATE },
    { label: '认识', icon: '✦', date: '2024-04-12' },
  ],
  includeDefaultAnniversaries: false,
  anniversaries: [
    {
      label: '在一起纪念日',
      icon: '❦',
      date: LOVE_DATE,
      easterEggTemplates: {
        soon: '还有 {gap} 天就是{displayLabel}，想好怎么过了吗？',
        today: '今天是{displayLabel}，把这一天记下来吧。',
        celebrate: '{displayLabel}快乐。愿我们一直是这样。',
      },
    },
    {
      label: '初见纪念日',
      icon: '✦',
      date: '2024-04-12',
      easterEggTemplates: {
        soon: '再过 {gap} 天，就是第一次见面的日子。',
        today: '今天，是我们第一次见到彼此的日子。',
        celebrate: '{displayLabel}快乐，谢谢你那天出现。',
      },
    },
  ],
  anniversaryCountdownThreshold: 15,
  anniversarySortOrder: 'asc',
  loadingLabel: '正在展开信纸…',
  defaultTheme: 'light',
  sections: {
    todaySummary: true,
    stats: true,
    timeline: true,
    timers: true,
    anniversary: true,
    wishes: true,
    photoWall: true,
    themeToggle: true,
    share: true,
  },
  sectionOrder: ['todaySummary', 'timers', 'timeline', 'letter', 'anniversary', 'stats', 'wishes'],
  privacy: {
    privateMode: true,
    noIndex: true,
  },
  welcomeMessage: '欢迎回来，今天也留一句吧。',
  enableWelcomeMessage: true,
  passwordConfig: {
    enabled: false,
    password: '',
    bruteForceProtection: {
      enabled: true,
      freeAttempts: 5,
      baseLockSeconds: 3,
      maxLockSeconds: 120,
      failureResetMinutes: 30,
    },
  },
  letter: {
    enabled: true,
    title: '一封没有寄出的信',
    salutation: '写给 小满：',
    paragraphs: [
      '写信这件事，比发消息慢很多。',
      '所以我把它留在这里，等你哪天翻到。',
      '我不太会说漂亮的话，只想告诉你：饭我做，灯我留，路我们一起走。',
      '如果你今天不太开心，就往下翻，看看我们走过的地方。',
    ],
    signature: '—— 阿辰',
    dateLabel: '二〇二五年 春',
    typeSpeed: 42,
  },
  easterEgg: {
    enabled: true,
    keywords: ['love', '永远'],
    title: '被你找到了',
    message: '这句话只留给愿意慢慢翻页的人：谢谢你，一直在这里。',
    onDoubleClickNames: true,
  },
};
