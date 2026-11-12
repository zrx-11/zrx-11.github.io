# 来源说明 / NOTICE

本项目（拾光 · Shiguang）是以下开源项目的衍生作品：

- **上游项目**：love-page
- **仓库**：https://github.com/funnyzak/love-page
- **原作者**：funnyzak
- **许可**：GNU Affero General Public License v3.0（AGPL-3.0）

## 本版改动

1. 移除原仓库中作者的署名、个人主页/仓库链接、演示站地址，以及示例配置中的示范人名与日期；页脚改为由配置驱动的站点标识。
2. 重做默认内容：时间线、愿望、文案、照片均为本版新写的示例数据，配图重新生成。
3. 重做视觉体系：以「信笺纸」为主题的配色（朱砂 / 香槟金 / 纸白 / 墨色）、字体栈与卡片样式；新增 `src/styles/theme.css` 作为主题覆盖层。
4. 新增模块：`Letter.astro`（逐字打字的情书）、`EasterEgg.astro`（关键词/双击触发的隐藏彩蛋）。
5. 新增根目录 `config.json` 外置配置读取（`src/config/merge.ts` 的 `loadLocalConfigPatch`），并让 `astro.config.mjs` 的 `site` 自动跟随 `config.json` 的 `siteUrl`。
6. 未结婚时自动隐藏婚姻相关计时与统计（`marriageDate` 可为空）。
7. 构建工具链与组件架构保持上游实现。

## 许可义务

依据 AGPL-3.0，本衍生作品同样以 AGPL-3.0 发布，完整许可文本见 [LICENSE](./LICENSE)。分发时必须保留本文件与 `LICENSE`。
