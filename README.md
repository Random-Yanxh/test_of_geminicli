# 静态网站生成器

这是一个简单的静态网站生成器，它可以读取 `src` 目录下的 Markdown 文件，将它们渲染到 HTML 模板中，并最终在 `dist` 目录生成一个完整的静态网站。

## 功能特性

-   **Markdown 支持**: 使用 [marked](https://github.com/markedjs/marked) 解析 Markdown 文件。
-   **Front Matter**: 支持在 Markdown 文件顶部使用 YAML Front Matter 来定义元数据。如果缺少，构建时会自动生成（标题来自文件名，作者为'User'，日期为当前时间）。
-   **HTML 模板**: 使用 [EJS](https://ejs.co/) 作为模板引擎，方便地将内容和元数据注入到布局中。
-   **静态资源**: 支持将 `public` 目录下的所有静态资源（如 CSS, 图片）直接复制到输出目录。
-   **响应式图片**: 自动通过 CSS 将文章中的图片宽度调整为 100%，以适应不同屏幕尺寸。
-   **多主题支持**: 通过在 Front Matter 中指定 `theme` 字段，可以为每篇文章应用不同的视觉主题（可选主题：`ancient`, `tech`, `fresh`）。
-   **自动索引页**: 自动生成 `index.html` 页面，按日期降序排列所有文章，并包含标题、摘要和链接。
-   **健壮性优化**: 增强了日期处理和摘要生成的逻辑，确保在各种边缘情况下也能稳定运行。

## 项目结构

```
.
├── dist/               # 存放生成的静态 HTML 文件
├── public/             # 存放静态资源 (CSS, images, etc.)
├── src/                # 存放源 Markdown 文件
├── templates/          # 存放 HTML 模板
├── index.js            # 项目主执行脚本
├── package.json        # 项目依赖和信息配置文件
└── README.md           # 项目说明文档
```

## 如何使用

### 1. 安装依赖

首先，确保你已经安装了 [Node.js](https://nodejs.org/)。然后，在项目根目录下运行以下命令来安装所需的依赖：

```bash
npm install
```

### 2. 添加内容

在 `src` 目录下创建或修改 `.md` 文件。推荐在文件顶部添加 Front Matter 来自定义元数据，如果省略，系统将自动生成默认值。

**示例: `src/new-post.md`**
```markdown
---
title: "我的新文章"
author: "你的名字"
date: "2025-07-01"
theme: "tech" # 可选: ancient, tech, fresh
---

这是你的新文章内容。
```

### 3. 自定义样式

你可以在 `public/css/style.css` 文件中修改网站的基础 CSS 样式。我们还提供了多套预设主题，你可以在 `public/css/themes/` 目录下查看、修改或添加新的主题。通过在文章的 Front Matter 中设置 `theme` 字段来选用不同的主题。

### 4. 生成网站

完成内容添加和样式修改后，运行以下命令来生成或更新你的静态网站：

```bash
npm run build
```

### 5. 查看结果

生成的文件位于 `dist` 目录。你可以直接在浏览器中打开 `dist/index.html` 文件来查看网站首页和文章列表。