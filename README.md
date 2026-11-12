# 拾光 · Shiguang

> 两个人的纪念日小站。计时、时间线、一封会自己打字的信、倒计时，还有一个藏起来的彩蛋。
>
> Astro 5 · TypeScript · Tailwind CSS 4 · 纯静态，一个 `config.json` 改完即可上线。

---

## 这版做了什么

- **信笺纸视觉**：米白纸面 + 朱砂 + 香槟金，宋体正文、手写体落款，浅色为默认主题，另带一套夜色主题。
- **一封情书**：滚动到该区块后逐字打出，可重读；文案、称呼、落款、速度都写在配置里。
- **隐藏彩蛋**：在页面上键入关键词（默认 `love` / `永远`），或双击首页名字，弹出一句只给对方看的话。
- **配置外置**：项目根目录 `config.json` 一处改完，构建时自动读取，`siteUrl` 也会同步给 sitemap 与 SEO。
- **可关可空**：未婚把 `marriageDate` 留空，相关计时/统计自动隐藏；不想展示的区块用 `sections` 关掉。

原有能力全部保留：今日摘要、双计时器、里程碑时间线（含故事弹层）、纪念日倒计时与当天全屏庆祝、纪念卡生成下载、照片墙、愿望清单、数字概览、明暗主题、中英双语、可选访问密码、PWA manifest、GitHub Pages 工作流。

## 30 秒开始

```bash
npm install
npm run dev      # http://localhost:4321
```

改内容只需要动一个文件：

```bash
cp config.example.json config.json   # 已经存在就直接编辑
```

```json
{
  "boy": "你的名字",
  "girl": "TA的名字",
  "loveDate": "2024-05-20",
  "siteUrl": "https://love.your-domain.com",
  "siteName": "拾光"
}
```

默认给的是一份演示数据（阿辰 / 小满 / 2024-05-20），照片是 `public/photos/demo-0x.jpg` 占位图，全部换成你自己的即可。

## 构建与部署

```bash
npm run build     # 产物在 dist/
npm run preview   # 本地预览产物
```

**GitHub Pages**

1. 把项目推到仓库，`Settings → Pages → Source` 选 **GitHub Actions**；
2. `Settings → Secrets → Actions` 新增 `SITE_CONFIG_JSON`，值为完整 `config.json` 的 JSON 字符串（这样私密信息不进仓库）；
3. 推送 `main` 即自动构建发布。

**Vercel / Netlify / Cloudflare Pages**

| 配置项 | 值 |
| --- | --- |
| Build command | `npm run build` |
| Output / Publish | `dist` |
| Framework | Astro（Vercel） |
| Node | 22（Cloudflare 需设 `NODE_VERSION=22`） |

不想把配置进仓库、只想在平台侧改文案时，也可以设环境变量 `VITE_LOVE_CONFIG_JSON`，优先级高于 `config.json`。

## 目录结构

```
├── config.json               # 你的内容配置（已加入 .gitignore，不会被提交）
├── config.example.json       # 中文示例
├── config.example.en-US.json # 英文示例
├── public/
│   ├── photos/               # 照片墙图片
│   ├── og.png                # 分享预览图（1200×630）
│   └── favicon.svg
├── src/
│   ├── components/           # Hero / Timers / Timeline / Letter / EasterEgg / Share ...
│   ├── config/               # 默认值、类型、合并与派生逻辑
│   ├── i18n/                 # 中英文案
│   ├── pages/                # 首页与 /en-us
│   └── styles/               # base(变量) / components(组件) / theme(本版主题层)
└── .github/workflows/deploy.yml
```

视觉定制集中在 `src/styles/theme.css` 与 `src/styles/base.css` 顶部的变量（`--accent` 朱砂、`--gilt` 香槟金、`--paper` 纸色、`--serif` 字体栈）。

## 配置文档

字段说明见 [CONFIG.md](./CONFIG.md)。最短可用配置只有 `boy`、`girl`、`loveDate` 三项，其余留空即用默认。

## 隐私

- `config.json` 默认不进版本库；公开部署想彻底隐藏人名，保持 `privacy.noIndex` 为 `true`，必要时再开 `passwordConfig`。
- 分享卡片在浏览器本地生成，图片不上传任何服务器。

## 来源与许可

本项目是在 [funnyzak/love-page](https://github.com/funnyzak/love-page) 基础上的二次开发：保留其组件架构与全部基础能力，重做默认配置、配色与字体体系，并新增「一封情书」「隐藏彩蛋」两个模块与 `config.json` 外置配置。原项目与本项目均遵循 **AGPL-3.0**，详见 [LICENSE](./LICENSE) 与 [NOTICE.md](./NOTICE.md)。

二次分发请同样保留 AGPL-3.0 许可与来源说明。
