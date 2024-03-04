# 十三、性能

## 前段性能优化手段

前端性能优化手段从以下几个方面入手：**加载优化**、**执行优化**、**渲染优化**、**样式优化**、**脚本优化**

**加载优化**:减少HTTP请求、缓存资源、压缩代码、无阻塞、首屏加载、按需加载、预加载、压缩图像、减少Cookie、避免重定向、异步加载第三方资源
**执行优化**：CSS写在头部，JS写在尾部并异步、避免img、iframe等的src为空、尽量避免重置图像大小、图像尽量避免使用DataURL
**渲染优化**：设置viewport、减少DOM节点、优化动画、优化高频事件、GPU加速
**样式优化**：避免在HTML中书写style、避免CSS表达式、移除CSS空规则、正确使用display：display、不滥用float等
**脚本优化**：减少重绘和回流、缓存DOM选择与计算、缓存.length的值、尽量使用事件代理、尽量使用id选择器、touch事件优化
**加载优化**

- 减少HTTP请求：尽量减少页面的请求数(首次加载同时请求数不能超过4个)，移动设备浏览器同时响应请求为4个请求(Android支持4个，iOS5+支持6个)

  - 合并CSS和JS
  - 使用CSS精灵图

- 缓存资源：使用缓存可减少向服务器的请求数，节省加载时间，所有静态资源都要在服务器端设置缓存，并且尽量使用长缓存(使用时间戳更新缓存)

  - 缓存一切可缓存的资源
  - 使用长缓存
  - 使用外联的样式和脚本

- 压缩代码：减少资源大小可加快网页显示速度，对代码进行压缩，并在服务器端设置GZip

  - 压缩代码(多余的缩进、空格和换行符)
  - 启用Gzip

- 无阻塞：头部内联的样式和脚本会阻塞页面的渲染，样式放在头部并使用link方式引入，脚本放在尾部并使用异步方式加载

- 首屏加载：首屏快速显示可大大提升用户对页面速度的感知，应尽量针对首屏的快速显示做优化

- 按需加载：将不影响首屏的资源和当前屏幕不用的资源放到用户需要时才加载，可大大提升显示速度和降低总体流量(按需加载会导致大量重绘，影响渲染性能)

  - 懒加载
  - 滚屏加载
  - Media Query加载

- 预加载：大型资源页面可使用Loading，资源加载完成后再显示页面，但加载时间过长，会造成用户流失

  - 可感知Loading：进入页面时Loading
  - 不可感知Loading：提前加载下一页

- 压缩图像：使用图像时选择最合适的格式和大小，然后使用工具压缩，同时在代码中用srcset来按需显示(

  过度压缩图像大小影响图像显示效果)

  - 使用[TinyJpg](https://tinyjpg.com/)和[TinyPng](https://tinypng.com/)压缩图像
  - 使用CSS3、SVG、IconFont代替图像
  - 使用img的srcset按需加载图像
  - 选择合适的图像：webp优于jpg，png8优于gif
  - 选择合适的大小：首次加载不大于1014kb、不宽于640px
  - PS切图时D端图像保存质量为80，M端图像保存质量为60

- 减少Cookie：Cookie会影响加载速度，静态资源域名不使用Cookie

- 避免重定向：重定向会影响加载速度，在服务器正确设置避免重定向

- 异步加载第三方资源：第三方资源不可控会影响页面的加载和显示，要异步加载第三方资源
**执行优化**

- **CSS写在头部，JS写在尾部并异步**
- **避免img、iframe等的src为空**：空src会重新加载当前页面，影响速度和效率
- **尽量避免重置图像大小**：多次重置图像大小会引发图像的多次重绘，影响性能
- **图像尽量避免使用DataURL**：DataURL图像没有使用图像的压缩算法，文件会变大，并且要解码后再渲染，加载慢耗时长
**渲染优化**

- **设置viewport**：HTML的viewport可加速页面的渲染

```js
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1">
```

- **减少DOM节点**：DOM节点太多影响页面的渲染，尽量减少DOM节点

- **优化动画**

  - 尽量使用CSS3动画
  - 合理使用requestAnimationFrame动画代替setTimeout
  - 适当使用Canvas动画：5个元素以内使用CSS动画，5个元素以上使用Canvas动画，iOS8+可使用WebGL动画

- **优化高频事件**：scroll、touchmove等事件可导致多次渲染

  - 函数节流
  - 函数防抖
  - 使用requestAnimationFrame监听帧变化：使得在正确的时间进行渲染
  - 增加响应变化的时间间隔：减少重绘次数

- **GPU加速**：使用某些HTML5标签和CSS3属性会触发GPU渲染，请合理使用(**过渡使用会引发手机耗电量增加**)

  - HTML标签：video、canvas、webgl
  - CSS属性：opacity、transform、transition
**样式优化**

- **避免在HTML中书写style**
- **避免CSS表达式**：CSS表达式的执行需跳出CSS树的渲染
- **移除CSS空规则**：CSS空规则增加了css文件的大小，影响CSS树的执行
- 正确使用display：display会影响页面的渲染
  - display:inline后不应该再使用float、margin、padding、width和height
  - display:inline-block后不应该再使用float
  - display:block后不应该再使用vertical-align
  - display:table-*后不应该再使用float和margin
- **不滥用float**：float在渲染时计算量比较大，尽量减少使用
- **不滥用Web字体**：Web字体需要下载、解析、重绘当前页面，尽量减少使用
- **不声明过多的font-size**：过多的font-size影响CSS树的效率
- **值为0时不需要任何单位**：为了浏览器的兼容性和性能，值为0时不要带单位
- 标准化各种浏览器前缀
  - 无前缀属性应放在最后
  - CSS动画属性只用-webkit-、无前缀两种
  - 其它前缀为-webkit-、-moz-、-ms-、无前缀四种：Opera改用blink内核，-o-已淘汰
- **避免让选择符看起来像正则表达式**：高级选择符执行耗时长且不易读懂，避免使用
**脚本优化**

- 减少重绘和回流
  - 避免不必要的DOM操作
  - 避免使用document.write
  - 减少drawImage
  - 尽量改变class而不是style，使用classList代替className
- **缓存DOM选择与计算**：每次DOM选择都要计算和缓存
- **缓存.length的值**：每次.length计算用一个变量保存值
- **尽量使用事件代理**：避免批量绑定事件
- **尽量使用id选择器**：id选择器选择元素是最快的
- **touch事件优化**：使用tap(touchstart和touchend)代替click(**注意touch响应过快，易引发误操作**)
