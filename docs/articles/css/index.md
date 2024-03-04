# CSS

## 盒模型

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：外边距（margin）、边框（border）、内边距（padding）、实际内容（content）四个属性。
CSS盒模型：**标准模型 + IE模型**

### 标准盒模型和IE盒模型的区别

计算宽度和高度的不同
标准盒模型：盒子总宽度/高度 =width/height + padding + border + margin。（ 即 width/height 只是 内容高度，不包含 padding 和 border 值 ）
IE盒子模型：盒子总宽度/高度 =width/height + margin = (内容区宽度/高度 + padding + border) + margin。（ 即 width/height 包含了 padding 和 border 值 ）

### css如何设置这两种模型

标准：box-sizing: content-box;( 浏览器默认设置 )
IE：box-sizing: border-box;

### BFC

概念：块级格式化上下文

BFC基本概念：BFC是CSS布局的一个概念，是一块独立的渲染区域，是一个环境，里面的元素不会影响到外部的元素 。
父子元素和兄弟元素边距重叠，重叠原则取最大值。空元素的边距重叠是取margin与 padding 的最大值。

**BFC原理（渲染规则|布局规则）：**

（1）内部的Box会在垂直方向，从顶部开始一个接着一个地放置；
（2）Box垂直方向的距离由margin(外边距)决定，属于同一个BFC的两个相邻Box的margin会发生重叠；
（3）每个元素的margin Box的左边， 与包含块border Box的左边相接触，（对于从左到右的格式化，否则相反）。即使存在浮动也是如此；
（4）BFC 在页面上是一个隔离的独立容器，外面的元素不会影响里面的元素，反之亦然。文字环绕效果，设置float；
（5）BFC 的区域不会与float Box重叠（清浮动）;
（6）计算BFC的高度时，浮动元素也参与计算。

**CSS在什么情况下会创建出BFC（即脱离文档流）**
0、根元素，即 HTML 元素（最大的一个BFC）
1、浮动（float 的值不为 none）
2、绝对定位元素（position 的值为 absolute 或 fixed）
3、行内块（display 为 inline-block）
4、表格单元（display 为 table、table-cell、table-caption、inline-block 等 HTML 表格相关的属性)
5、弹性盒（display 为 flex 或 inline-flex）
6、默认值。内容不会被修剪，会呈现在元素框之外（overflow 不为 visible）

**BFC作用**
1、自适应两（三）栏布局（避免多列布局由于宽度计算四舍五入而自动换行）
2、避免元素被浮动元素覆盖
3、可以让父元素的高度包含子浮动元素，清除内部浮动（原理：触发父div的BFC属性，使下面的子div都处在父div的同一个BFC区域之内）
4、去除边距重叠现象，分属于不同的BFC时，可以阻止margin重叠

## 样式优先级

### 选择器类型

- ID　　#id
- class　　.class
- 标签　　p
- 通用　　*
- 属性　　[type="text"]
- 伪类　　:hover
- 伪元素　　::first-line
- 子选择器、相邻选择器

### 权重计算规则

第一等：代表内联样式，如: style=””，权值为1000。
第二等：代表ID选择器，如：#content，权值为0100。
第三等：代表类，伪类和属性选择器，如.content，权值为0010。
第四等：代表类型选择器和伪元素选择器，如div p，权值为0001。
通配符、子选择器、相邻选择器等的。如*、>、+,权值为0000。
继承的样式没有权值。

## 盒子塌陷

**盒子塌陷**
本应该在父盒子内部的元素跑到了外部。

（1）最简单，直接，粗暴的方法就是盒子大小写死，给每个盒子设**定固定的width和height**，直到合适为止，这样的好处是简单方便，兼容性好，适合只改动少量内容不涉及盒子排布的版面。缺点是非自适应，浏览器的窗口大小直接影响用户体验。

（2）给外部的父盒子也添加浮动，让其也脱离标准文档流，这种方法方便，但是对页面的布局不是很友好，不易维护。

（3）给父盒子添加overflow属性。

overflow:auto; 有可能出现滚动条，影响美观。

overflow:hidden; 可能会带来内容不可见的问题。

（4）父盒子里最下方引入清除浮动块。最简单的有：

```html
    <br style="clear:both;"/>
```

有很多人是这么解决的，但是我们并不推荐，因为其引入了不必要的冗余元素 。

(5)用after伪元素清除浮动

给外部盒子的after伪元素设置clear属性，再隐藏它

这其实是对空盒子方案的改进，一种纯CSS的解决方案，不用引入冗余元素。

```css
.clearfix {*zoom: 1;}

.clearfix:before,.clearfix:after {

display: table;

line-height: 0;

content: "";

}

.clearfix:after {clear: both;}
```

这也是bootstrap框架采用的清除浮动的方法。

这是一种纯CSS的解决浮动造成盒子塌陷方法，没有引入任何冗余元素，推荐使用此方法来解决CSS盒子塌陷。

备注：第五种方法虽好，但是低版本IE不兼容，具体选择哪种解决方法，可根据实际情况决定。

(6) 给父盒子添加border

(7) 给父盒子设置padding-top
