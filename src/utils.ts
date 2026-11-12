/**
 * 拾光 — 工具函数
 */

export function escapeHtml(s: string): string {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

export interface DiffResult {
  years: number;
  days: number;
  h: string;
  m: string;
  s: string;
}

export interface DateParts {
  y: number;
  m: number;
  d: number;
  h: number;
  mi: number;
  hasTime: boolean;
}

/** 解析 `YYYY-MM-DD` 或 `YYYY-MM-DDTHH:MM[:SS]`，非法时给出安全默认值。 */
export function parseDateTime(dateStr: string): DateParts {
  const raw = String(dateStr || '').trim();
  const datePart = raw.slice(0, 10);
  const [y, m, d] = datePart.split('-').map(Number);
  const hasTime = raw.length > 10;
  const timePart = hasTime ? raw.slice(11) : '';
  const [h, mi] = timePart.split(':').map(Number);
  return {
    y: Number.isFinite(y) ? y : 1970,
    m: Number.isFinite(m) ? m : 1,
    d: Number.isFinite(d) ? d : 1,
    h: Number.isFinite(h) ? h : 0,
    mi: Number.isFinite(mi) ? mi : 0,
    hasTime,
  };
}

/** 只取日期部分，供按天计算使用。 */
export function dateOnly(dateStr: string): string {
  return String(dateStr || '').slice(0, 10);
}

/** 展示用：`2023.07.14`，带时间时补 ` 22:00`。 */
export function formatDateText(dateStr: string): string {
  const p = parseDateTime(dateStr);
  const date = `${p.y}.${String(p.m).padStart(2, '0')}.${String(p.d).padStart(2, '0')}`;
  if (!p.hasTime) return date;
  return `${date} ${String(p.h).padStart(2, '0')}:${String(p.mi).padStart(2, '0')}`;
}

export function diffFrom(dateStr: string): DiffResult {
  const p = parseDateTime(dateStr);
  const start = new Date(p.y, p.m - 1, p.d, p.h, p.mi, 0);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let lastAnniv = new Date(
    start.getFullYear() + years,
    start.getMonth(),
    start.getDate(),
    start.getHours(),
    start.getMinutes()
  );
  if (lastAnniv > now) {
    years--;
    lastAnniv = new Date(
      start.getFullYear() + years,
      start.getMonth(),
      start.getDate(),
      start.getHours(),
      start.getMinutes()
    );
  }

  const ms = now.getTime() - lastAnniv.getTime();
  return {
    years,
    days: Math.floor(ms / 864e5),
    h: String(Math.floor((ms % 864e5) / 36e5)).padStart(2, '0'),
    m: String(Math.floor((ms % 36e5) / 6e4)).padStart(2, '0'),
    s: String(Math.floor((ms % 6e4) / 1e3)).padStart(2, '0'),
  };
}

/**
 * 读取组件在服务端输出的 JSON payload，缺失或解析失败时返回 fallback。
 * payload 由服务端完整生成，这里只做浅合并，不再逐字段校验。
 */
export function readJsonPayload<T extends object>(id: string, fallback: T): T {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLScriptElement)) return fallback;
  try {
    const data = JSON.parse(el.textContent || '{}');
    return data && typeof data === 'object' ? { ...fallback, ...data } : fallback;
  } catch {
    return fallback;
  }
}
