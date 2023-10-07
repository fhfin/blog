# vitePress 搭建

## 1.环境搭建

### github创建一个仓库，clone到本地

### 初始化vitepress

1. 进入仓库执行

```bash
pnpm init    #或者npm init yarn init等
```
2. 安装需要的依赖

```bash
pnpm install --dev vitepress vue
```

3. 写入第一个文档
```bash
mkdir docs && echo '# Hello VitePress' > docs/index.md
# 或者在根目录新建docs文件夹，文件夹新建index.md，文件内写入 # Hello Vitepress
```

4. 在package.json里写入执行脚本
```json
{
    ...
    "scripts": {
        "docs:dev": "vitepress dev docs",
        "docs:build": "vitepress build docs",
        "docs:serve": "vitepress serve docs"
    },
    ...
}
```

5. 启动项目
```bash
pnpm docs:dev
# 或者 npm run docs:dev
```


## 2.配置vitepress

1. 文件结构
```arduino
.
├─ .github // 部署相关，后面会说
│  ├─ workflows
│  │  ├─ deploy.yml
├─ docs
│  ├─ .vitepress
│  │  ├─ config.js // 打包配置的文件
│  ├─ articles // 文章的文件夹
│  │  ├─ javascript-core // JavaScript核心文章
│  │  └─ ...
│  ├─ public // 这里可以放入全局文件内容，打包后原样复制到dist
│  │  ├─ images // 文章中的图片
└─ package.json
```

2. config.js配置
```js
export default {
    title: 'xxx', // 博客的标题
    description: 'xxxx', // 博客的介绍
    base: '/blog/', // 如果想用 https://xxx.github.io/blog/ 访问，那么这句话必填
    themeConfig: {
        logo: "/images/logo.png", // 页面上显示的logo
        nav: [ // 页面右上角的导航
            { text: "vue", link: "https://cn.vuejs.org/" },
            { text: "vitepress", link: "https://vitejs.cn/vitepress/" },
        ]
    },
}
```


## 3.上传到github自动部署

新建.github/workflows/deploy.yml文件

```yaml
name: Deploy

on:
  push:
    branches:
      - main #如果分支是master则改为master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm i pnpm -g
      - run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm docs:build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

1. 上传到github后会自动执行actions
![action图片](/actions.jpg "图片title")

2. 完成之后会在分支中新增一个gh-pages分支

3. 在 settings/pages 中更换源为 gh-pages