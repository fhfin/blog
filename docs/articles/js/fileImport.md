# 文件引入方式

## link和@import

作用：样式的导入方式

link的使用

```javascript
<link href="index.css" rel="stylesheet">
```

@import的使用

```javascript
<style type="text/css">
@import url(index.css);
</style>
```

区别：

1. 引入的内容不同

   link除了引用样式文件，还可以引用图片等资源文件，而@import只引用样式文件

2. 加载顺序不同

   link引用css时，在页面载入时同时加载；@import需要页面网页完全载入以后加载

3. 兼容性不同

   link是XHTML标签，无兼容性问题；@import是在css2.1提出的，低版本的浏览器不支持

4. 对js的支持不同

   link支持使用JavaScript控制DOM去改变样式；而@import不支持

## 为什么link用href获取资源，script和img用src?

### src用于替换当前元素，href用于在当前文档和引用资源之间确立联系

src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素

```javascript
<script src ="js.js"></script> 
```

当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，这也是为什么将js脚本放在底部而不是头部

### href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接

在文档中添加link标签，浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用link方式来加载css，而不是@import方式

```javascript
<link href="common.css" rel="stylesheet"/>
```
