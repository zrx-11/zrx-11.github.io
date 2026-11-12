import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';

/** 构建站点地址时优先读取 config.json 里的 siteUrl，避免两处手工同步 */
function resolveSiteUrl() {
  try {
    const configPath = path.resolve(process.cwd(), 'config.json');
    if (fs.existsSync(configPath)) {
      const parsed = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (typeof parsed.siteUrl === 'string' && parsed.siteUrl.trim()) {
        return parsed.siteUrl.trim().replace(/\/$/, '');
      }
    }
  } catch (error) {
    console.warn('[拾光] 读取 config.json 失败，使用默认站点地址', error);
  }
  return 'https://shiguang.example.com';
}

export default defineConfig({
  site: resolveSiteUrl(),
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  integrations: [sitemap(), playformCompress()],
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn', 'en-us'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
