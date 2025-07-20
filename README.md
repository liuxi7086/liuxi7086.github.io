# 一键复制文案工具

一个现代化的文案复制工具网站，支持产品分类、多语言文案展示和一键复制功能。

## 功能特点

- 🎯 **产品分类管理** - 支持多种产品分类（电子产品、服装服饰、美妆护肤、食品饮料、家居用品）
- 🌍 **多语言支持** - 支持中文、英文、日文三种语言
- 📋 **一键复制** - 点击复制按钮即可复制文案到剪贴板
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎨 **现代化UI** - 美观的渐变背景和卡片式设计
- ⚡ **实时切换** - 分类和语言切换无需刷新页面

## 使用方法

1. 打开 `index.html` 文件
2. 在左侧选择产品分类
3. 在右上角选择显示语言
4. 点击右侧的"复制文案"按钮即可复制

## 项目结构

```
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript功能
└── README.md           # 项目说明
```

## 自定义文案

您可以在 `script.js` 文件中的 `copyData` 对象中添加或修改文案：

```javascript
const copyData = {
    your_category: {
        title: "您的分类名称",
        items: [
            {
                title: "文案标题",
                zh: "中文文案内容",
                en: "English content",
                ja: "日本語コンテンツ"
            }
        ]
    }
};
```

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid, 渐变, 动画)
- JavaScript (ES6+)
- Font Awesome 图标

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 部署

这是一个纯静态网站，可以直接部署到任何静态网站托管服务：

- GitHub Pages
- Netlify
- Vercel
- 任何支持静态文件的Web服务器

## 许可证

MIT License 