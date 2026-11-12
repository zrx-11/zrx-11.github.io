import type { LocaleCode } from '../i18n/locales';

export interface Milestone {
  date: string;
  label: string;
  icon: string;
  story?: string;
}

export interface Photo {
  url: string;
  caption?: string;
}

export interface TimeMark {
  label: string;
  icon: string;
  date: string;
}

export interface AnniversaryEasterEggTemplates {
  normal?: string;
  soon?: string;
  today?: string;
  celebrate?: string;
}

export interface AnniversaryMark {
  label: string;
  icon: string;
  date: string;
  easterEggTemplates?: AnniversaryEasterEggTemplates;
}

export interface StatItem {
  label: string;
  value: string | number;
  icon?: string;
}

export interface WishItem {
  text: string;
  done?: boolean;
}

export interface StartupImage {
  src: string;
  media?: string;
}

export interface MusicTrack {
  id: string;
  src: string;
  title: string;
  artist?: string;
  tags?: string[];
  weight?: number;
}

export type StatsMode = 'auto' | 'manual' | 'hybrid';
export type SectionKey =
  | 'todaySummary'
  | 'stats'
  | 'timers'
  | 'timeline'
  | 'letter'
  | 'anniversary'
  | 'wishes';

/** 情书：逐行打字机显示的信笺 */
export interface LetterConfig {
  enabled?: boolean;
  title?: string;
  /** 信纸抬头的称呼，如「写给阿满」 */
  salutation?: string;
  /** 信纸正文，按段落拆分，逐行浮现 */
  paragraphs?: string[];
  signature?: string;
  /** 落款日期文案，如「二〇二五年五月二十日」 */
  dateLabel?: string;
  /** 打字机速度（毫秒/字），默认 42 */
  typeSpeed?: number;
}

/** 隐藏彩蛋：键入关键词或双击名字触发的一句私语 */
export interface EasterEggConfig {
  enabled?: boolean;
  /** 触发关键词（不区分大小写），默认 ['love'] */
  keywords?: string[];
  title?: string;
  message?: string;
  /** 是否允许双击首页名字触发 */
  onDoubleClickNames?: boolean;
}
export type MusicPlayMode = 'single' | 'sequence' | 'shuffle';
export type MusicStartPolicy = 'first' | 'last' | 'random';

export interface MusicConfig {
  enabled: boolean;
  autoPlay: boolean;
  playMode: MusicPlayMode;
  allowModeSwitch: boolean;
  startPolicy: MusicStartPolicy;
  volume: number;
  rememberState: boolean;
  smartShuffleWindow: number;
  tracks: MusicTrack[];
}

export interface PrivacyConfig {
  privateMode?: boolean;
  noIndex?: boolean;
}

export interface PasswordBruteForceProtectionConfig {
  enabled?: boolean;
  freeAttempts?: number;
  baseLockSeconds?: number;
  maxLockSeconds?: number;
  failureResetMinutes?: number;
}

export interface PasswordConfig {
  enabled: boolean;
  password?: string;
  hint?: string;
  successMessage?: string;
  errorMessage?: string;
  bruteForceProtection?: PasswordBruteForceProtectionConfig;
}

export interface Config {
  boy: string;
  girl: string;
  loveDate: string;
  marriageDate: string;
  milestones: Milestone[];
  motto?: string;
  quotes: string[];
  music: MusicConfig;
  secretMessage: string;
  photos: Photo[];
  googleAnalyticsId: string;
  siteUrl: string;
  siteName?: string;
  siteLocale?: LocaleCode;
  seoDescription?: string;
  siteImage?: string;
  siteLogo?: string;
  iosStartupImages?: StartupImage[];
  shareTemplates?: string[];
  stats?: StatItem[];
  statsMode?: StatsMode;
  /** 是否在数字区显示本机访问次数，默认 false */
  statsShowVisitCount?: boolean;
  wishes?: WishItem[];
  timers?: TimeMark[];
  anniversaries?: AnniversaryMark[];
  includeDefaultAnniversaries?: boolean;
  anniversaryCountdownThreshold?: number;
  anniversarySortOrder?: 'asc' | 'desc' | 'default';
  loadingLabel?: string;
  defaultTheme?: 'light' | 'dark' | 'auto';
  /** 主内容区块的显示顺序；未列出的区块按默认顺序追加，显隐仍由 sections 控制 */
  sectionOrder?: SectionKey[];
  sections?: {
    todaySummary?: boolean;
    stats?: boolean;
    timeline?: boolean;
    timers?: boolean;
    anniversary?: boolean;
    wishes?: boolean;
    photoWall?: boolean;
    themeToggle?: boolean;
    share?: boolean;
  };
  privacy?: PrivacyConfig;
  welcomeMessage?: string;
  enableWelcomeMessage?: boolean;
  passwordConfig?: PasswordConfig;
  letter?: LetterConfig;
  easterEgg?: EasterEggConfig;
}

export type ConfigPatch = Partial<Config>;
