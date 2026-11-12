# 配置说明

所有内容都通过一个 JSON 对象控制。生效顺序：

```
内置默认值（src/config/defaults.ts） < 根目录 config.json < 环境变量 VITE_LOVE_CONFIG_JSON
```

即：**没写的字段用默认值，写了就覆盖；环境变量优先级最高**（适合把私密配置放进 CI 的 Secret）。

修改后重新 `npm run build`（或让 `npm run dev` 自动热更新）才会生效。

---

## 1. 最小可用配置

```json
{
  "boy": "高咏",
  "girl": "赵瑞轩",
  "loveDate": "2023-07-14T22:00:00"
}
```

`loveDate` 支持写具体时刻：`2023-07-14T22:00:00` 表示「2023 年 7 月 14 日 22:00」，计时器会精确到小时/分钟/秒；只写 `2023-07-14` 则从零点起算。`boy` / `girl` 只决定首屏左右位置，不参与任何性别文案。

## 2. 基础字段

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `boy` | string | `阿辰` | 页面左侧的名字，也用于 SEO、分享卡、manifest |
| `girl` | string | `小满` | 页面右侧的名字 |
| `loveDate` | `YYYY-MM-DD` 或 `YYYY-MM-DDTHH:MM:SS` | `2024-05-20` | 相恋日期，计时器与天数的起点。**带时间就按具体时刻计时**（如 `2023-07-14T22:00:00`），只写日期则从当天零点算 |
| `marriageDate` | `YYYY-MM-DD` | `""`（空） | 结婚日期。**留空则婚姻计时、婚姻天数、结婚纪念日全部自动隐藏** |
| `siteName` | string | `拾光` | 站点名，用于页脚、manifest、应用名 |
| `siteUrl` | string | `https://shiguang.example.com` | 站点正式地址；sitemap、canonical、OG 图片绝对路径都以它为基准 |
| `siteLocale` | `zh-CN` \| `en-US` | `zh-CN` | 主页语言；另一种语言自动生成在 `/en-us` |
| `siteImage` | string | `/og.png` | 分享预览图（相对 `public/` 或绝对 URL），建议 1200×630 |
| `siteLogo` | string | `/favicon.svg` | 图标 |
| `seoDescription` | string | 自动生成 | 留空则由「{boy} 与 {girl} 的专属页面 · 座右铭」自动拼装 |
| `googleAnalyticsId` | string | `""` | 填 `G-XXXXXXX` 才注入统计，留空不加载任何第三方脚本 |
| `loadingLabel` | string | `正在展开信纸…` | 首屏加载文案 |
| `welcomeMessage` | string | `欢迎回来，今天也留一句吧。` | 进入后的提示条 |
| `enableWelcomeMessage` | boolean | `true` | 是否显示提示条 |

## 3. 内容区块

### milestones（时间线）

```json
[
  { "date": "2024-05-20", "label": "初次见面", "icon": "✦", "story": "那天人群很吵……" }
]
```

`story` 会在点击节点时以弹层展示，不填则该节点不可点击。

### quotes（座右铭轮播）

首屏副标题会从这些句子里轮播，第一条同时作为默认座右铭。也可用 `motto` 固定一句。

### timers（计时器）

```json
[{ "label": "在一起", "icon": "❦", "date": "2024-05-20" }]
```

不填则根据 `loveDate` / `marriageDate` 自动生成。

### anniversaries（纪念日倒计时）

```json
[
  {
    "label": "在一起纪念日",
    "icon": "❦",
    "date": "2024-05-20",
    "easterEggTemplates": {
      "soon": "还有 {gap} 天就是{displayLabel}",
      "today": "今天是{displayLabel}",
      "celebrate": "{displayLabel}快乐"
    }
  }
]
```

- `anniversaryCountdownThreshold`：多少天内算「临近」，默认 15。
- `includeDefaultAnniversaries`：`true` 时额外补上根据 `loveDate`/`marriageDate` 推出来的默认纪念日。
- 当天会触发全屏庆祝动画。

### wishes（愿望清单）

```json
[{ "text": "一起看一次海", "done": false }]
```

### photos（照片墙）

```json
[{ "url": "/photos/demo-01.jpg", "caption": "傍晚的窗" }]
```

`url` 既可以是 `public/` 下的相对路径，也可以是外链。建议长边 1200px 左右。

### stats / statsMode

`statsMode` 取 `auto`（自动统计天数、节点数、照片数、愿望完成率）｜`manual`（只用 `stats` 数组）｜`hybrid`（手动项覆盖同名自动项）。`statsShowVisitCount` 为 `true` 时额外显示本机访问次数（只存本地，不上报）。

### sections / sectionOrder

`sections` 控制显隐（`false` 即整块不渲染）：

```json
{ "todaySummary": true, "stats": true, "timers": true, "timeline": true,
  "letter": true, "anniversary": true, "wishes": true, "photoWall": true,
  "themeToggle": true, "share": true }
```

`sectionOrder` 控制排列顺序，可取值同上（不含 `photoWall` / `themeToggle` / `share`）：

```json
["todaySummary", "timers", "timeline", "letter", "anniversary", "stats", "wishes"]
```

## 4. 一封情书 `letter`

```json
{
  "enabled": true,
  "title": "一封没有寄出的信",
  "salutation": "写给 小满：",
  "paragraphs": ["第一段", "第二段"],
  "signature": "—— 阿辰",
  "dateLabel": "二〇二五年 春",
  "typeSpeed": 42
}
```

| 字段 | 说明 |
| --- | --- |
| `paragraphs` | 段落数组，滚动进入可视区后逐字打出；系统开启「减少动态效果」时直接显示全文 |
| `typeSpeed` | 每字间隔毫秒，默认 42；越小越快 |
| `title` | 区块标题，不填用 i18n 的「一封情书」 |

## 5. 隐藏彩蛋 `easterEgg`

```json
{
  "enabled": true,
  "keywords": ["love", "永远"],
  "title": "被你找到了",
  "message": "这句话只给愿意慢慢翻页的人：谢谢你，一直在这里。",
  "onDoubleClickNames": true
}
```

- `keywords`：在页面任意位置连续键入这些词（不区分大小写）即可触发。
- `onDoubleClickNames`：双击首屏名字也能触发。
- 触发后弹出信纸卡片，`Esc` 或点击遮罩关闭。

## 6. 音乐 `music`

```json
{
  "enabled": true,
  "autoPlay": false,
  "playMode": "sequence",
  "volume": 0.7,
  "tracks": [{ "id": "t1", "src": "/music/t1.mp3", "title": "歌名", "artist": "歌手" }]
}
```

`playMode`：`single`｜`sequence`｜`shuffle`；`startPolicy`：`first`｜`last`｜`random`。
浏览器普遍禁止自动播放，建议 `autoPlay: false`，等用户点击播放按钮。音频放 `public/music/` 下。

## 7. 隐私与密码

```json
{
  "privacy": { "privateMode": true, "noIndex": true },
  "passwordConfig": {
    "enabled": true,
    "password": "你们才知道的那串字",
    "hint": "提示语",
    "bruteForceProtection": { "enabled": true, "freeAttempts": 5, "baseLockSeconds": 3, "maxLockSeconds": 120, "failureResetMinutes": 30 }
  }
}
```

- `noIndex` 为 `true` 时输出 `noindex, nofollow`，搜索引擎不收录。
- 密码在构建阶段加密写入页面，不会以明文出现在 HTML 中；错误尝试有递增锁定。

## 8. 主题

`defaultTheme`：`light`｜`dark`｜`auto`。本版默认 `light`（信笺纸）。右上角按钮可三态切换，选择存在浏览器本地。

改配色不必写代码，改 `src/styles/base.css` 顶部变量即可：

```css
--accent: #b04a3c;      /* 朱砂 */
--gilt: #b08554;        /* 香槟金 */
--paper: #f6f1e7;       /* 纸色 */
--night: #191411;       /* 夜色 */
--serif: 'Noto Serif SC', 'Songti SC', ...;
--hand: 'Ma Shan Zheng', ...;
```

## 9. 常见问题

**构建立即报 `Failed to parse VITE_LOVE_CONFIG_JSON`**
环境变量里的 JSON 不合法（常见是多行换行或引号）。用单行 JSON，或直接改用 `config.json`。

**改了 `siteUrl`，分享/OG 图还是旧域名**
`sitemap` 与 canonical 来自构建时的 `siteUrl`，需重新 `npm run build`；`astro.config.mjs` 会自动读取 `config.json` 里的 `siteUrl`。

**照片墙打不开 / 图片 404**
`url` 以 `/` 开头表示 `public/` 根目录，确认文件确实在 `public/photos/` 下且大小写一致。

**音乐点了没声音**
先确认 `src` 可访问（浏览器直接打开该 mp3 链接试试），以及 `music.enabled` 为 `true`。

**想把页面设成私密但又要给朋友看**
`privacy.noIndex` 保持 `true`，`passwordConfig.enabled` 打开并设密码，链接只发给对方。
