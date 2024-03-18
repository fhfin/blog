export default {
  title: '博客', // 博客的标题
  description: '博客', // 博客的介绍
  base: '/blog/', // 如果想用 https://xxx.github.io/blog/ 访问，那么这句话必填
  lastUpdated: true,
  themeConfig: {
      nav: [ // 页面右上角的导航
          { text: "文章", link: "/articles/js/jsbase",activeMatch:'/articles/' },
      ],
      sidebar: { // 侧边栏，可以分组
          "/articles/": [
              { 
                text: "js相关",link:'/articles/js/jsbase',items:[
                  {text:'浏览器',link:'/articles/js/navigate'},
                  {text:'异步相关',link:'/articles/js/asynchronism'},
                  {text:'this相关',link:'/articles/js/this'},
                  {text:'文件引入方式',link:'/articles/js/fileImport'},
                  {text:'es6',link:'/articles/js/es6'},
                  {text:'application',link:'/articles/js/application'},
                  {text:'模块化',link:'/articles/js/modules'},
                  {text:'浏览器',link:'/articles/js/navigate'},
                  {text:'性能',link:'/articles/js/performance'},
                  {text:'设计模式',link:'/articles/js/designPatterns'},
                  {text:'算法',link:'/articles/js/arithmetic'},
                ] 
              },
              {
                text:'CSS',link:'/articles/css/index',items:[
                  {text:'布局',link:'/articles/css/layout'}
                ]
              },
              {
                text:'网络传输',link:'/articles/network/index',items:[
                  {text:'网络传输',link:'/articles/network/index'}
                ]
              },
              {
                text:'框架',link:'/articles/frame/vue',items:[
                  {text:'Vue',link:'/articles/frame/vue'}
                ]
              },
              {
                text:'其他',link:'/articles/other/start-vitepress',items:[
                  { text: "vitepress搭建",link:'/articles/other/start-vitepress' },
                  { text: "markDown语法",link:'/articles/other/markdown-syntax' },
                  { text: "面试题",link:'/articles/other/question' }
                ]
              },
          ],
          "/problem/":[
            {
              text:'',link:'',items:[
                {text:'',link:''}
              ]
            }
          ]
      }
  },
}   