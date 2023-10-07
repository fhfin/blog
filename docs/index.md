---
layout: home

hero:
  name: VitePress  #显示在 `text` 上方的字符串。带有品牌颜色，内容较短，例如产品名。
  text: Vite & Vue powered static site generator. #Hero 部分的主要文字内容。将会定义为 `h1` 标签。
  tagline: Lorem ipsum... #显示在 `text` 下方的标语。
  # image: /logo.svg 显示在 `text` 和 `tagline` 区域旁边的图像。
  actions: #在 Hero 部分显示的动作按钮。
    - theme: brand #按钮的主题色，默认为 `brand`。
      text: Get Started # 按钮的文本标签。
      link: /articles/start-vitepress #按钮的目的地链接。
    - theme: alt
      text: View on GitHub
      link: https://github.com/vuejs/vitepress

features:
  - icon: 🛠️ #每个 feature 中显示的图标。
    title: Simple and minimal, always #feature 中的标题。
    details: Lorem ipsum... # feature 中的详情。
  - icon: 🛠️
      # src: /logo.svg
    title: Another cool feature
    details: Lorem ipsum...
  - icon: 🛠️
      # dark: /dark-feature-icon.svg
      # light: /light-feature-icon.svg
    title: Another cool feature
    details: Lorem ipsum...
    #单击 feature 时的链接，该链接可以是站内也可以是站外。
    #如 `guid/reference/default-theme-home-page` 或 `htttps://example.com`
    # link: string
    #显示在 feature 组件中的链接文本，最好与 `link` 选项一起使用。
    #如 `Learn more`，`Visit page` 等
    # linkText: string
    #`link` 选项中链接的 rel 属性值。
    #如 `external`
    # rel: string
---


<style>
:root {
  /* --vp-home-hero-name-color: blue; */
  
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>