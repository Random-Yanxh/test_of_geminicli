# 项目计划 (V6)：静态网站生成器（健壮性修复）

## 1. 项目目录结构

```
.
├── dist/               # 输出目录
│   └── css/
│       └── style.css   # 复制过来的 CSS
├── public/             # 存放静态资源
│   ├── css/
│   │   ├── style.css       # 基础样式
│   │   └── themes/         # 主题样式目录
│   │       ├── ancient.css
│   │       ├── tech.css
│   │       └── fresh.css
├── src/
│   └── sample-post.md
├── templates/
│   ├── layout.ejs
│   └── index.ejs
├── index.js
└── package.json
```

## 2. 工作流程

```mermaid
graph TD
    A[开始] --> B{1. 初始化 & 清理 'dist' 目录};
    B --> C[2. 复制 'public' 目录内容到 'dist'];
    C --> D[3. 读取 HTML 模板 (layout.ejs)];
    D --> E[4. 读取 'src' 目录下的所有 Markdown 文件];
    E --> F{5. 遍历每个 Markdown 文件};
    F -- 有文件 --> G[a. 解析元数据和内容];
    G --> H[b. 将 Markdown 转为 HTML];
    H --> I[c. 将内容和元数据注入模板];
    I --> J[d. 将生成的 HTML 写入 'dist'];
    J --> F;
    F -- 所有文件处理完毕 --> K[生成索引页];
    K --> L[结束];
```

**健壮性考虑:**
- **日期处理**: 所有日期（无论是来自 Front Matter 还是自动生成）都应转换为统一的、可比较的格式（如 ISO 字符串），以确保排序的准确性。
- **摘要生成**: 摘要提取逻辑应具有回退机制。如果找不到 `<p>` 标签，应尝试从其他元素（如 `<h2>`）或原始文本中提取内容，保证每篇文章都有摘要。

## 3. 文件格式示例

### `src/sample-post.md` (包含 Front Matter)
```markdown
---
title: "我的第一篇文章"
author: "王五"
date: "2025-06-29"
theme: "tech"
---

这里是文章的正文。
```

### `templates/layout.ejs` (链接 CSS)
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title><%= title %></title>
    <link rel="stylesheet" href="css/style.css">
    <% if (theme) { %>
    <link rel="stylesheet" href="css/themes/<%= theme %>.css">
    <% } %>
</head>
<body>
    <header>
        <h1><%= title %></h1>
        <p>作者：<%= author %> | 发布于：<%= new Date(date).toLocaleDateString() %></p>
    </header>
    <main>
        <%- content %>
    </main>
</body>
</html>
```

### `public/css/style.css` (自定义样式)
```css
body {
    font-family: sans-serif;
    max-width: 800px;
    margin: 2rem auto;
}

/* Add responsive styles for images within the main content area */
main img {
    max-width: 100%;
    height: auto;
}
```

## 4. 所需依赖

-   `fs-extra`: 用于递归复制目录。
-   `front-matter`: 用于解析元数据。
-   `marked`: 用于解析 Markdown。
-   `ejs`: 用于渲染模板。