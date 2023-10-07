export default {
  title: '博客', // 博客的标题
  description: '博客', // 博客的介绍
  base: '/blog/', // 如果想用 https://xxx.github.io/blog/ 访问，那么这句话必填
  lastUpdated: true,
  themeConfig: {
      nav: [ // 页面右上角的导航
          { text: "文章", link: "/articles/",activeMatch:'/articles/' },
          { text: "开始", link: "/start" },
      ],
      sidebar: { // 侧边栏，可以分组
          "/articles/": [
              {test:'index',link:'/articles/'},
              { text: "vitepress搭建",link:'/articles/start-vitepress' },
              { text: "markDown语法",link:'/articles/markdown-syntax' },
          ]
      },
    //   footer: {
    //     message: 'Released under the MIT License.',
    //     copyright: 'Copyright © 2019-present Evan You'
    //   },
      socialLinks: [{ icon: "github", link: "https://github.com/fhfin" }], // 可以连接到 github
  },
}   