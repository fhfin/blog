# 布局

## 未知高度元素垂直居中、垂直居中的实现方式有哪些？

1. **绝对定位和transform:translate(-50%，-50%)**

   ```javascript
   .wrap{
     position:relative;
   }
   .child{
     position: absolute;
     top:50%;
     left:50%;
     -webkit-transform:translate(-50%,-50%);
   }
   ```

2. **css3 的flex布局**

   ```javascript
   .wrap{
     display:flex;
     justify-content:center;
   }
   .child{
     align-self:center;
   }
   ```

## 三栏布局

1. flex：1 ：设置腹肌弹性盒，子盒子三个各占一份

   ```javascript
    <div class="Grid">
       <div class="Grid-cell">1/3</div>
       <div class="Grid-cell">1/3</div>
       <div class="Grid-cell">1/3</div>
     </div>
   ```

   ```css
   .Grid {
     display: flex;
   }
   
   .Grid-cell {
     flex: 1;
     background: #eee;
     margin: 10px;
   }
   ```

2. flex百分比

   ```javascript
   <div class="Grid">
       <div class="Grid-cell col3"></div>
       <div class="Grid-cell col3"></div>
       <div class="Grid-cell clo3"></div>
   </div>
   ```

   ```css
   .col3 {
     flex: 0 0 33.3%;
   }
   ```

## 清除浮动

```javascript
.clearfix:after{
    content:".";  /*尽量不要为空，一般写一个点*/
    height:0;     /*盒子高度为0，看不见*/
    display:block;    /*插入伪元素是行内元素，要转化为块级元素*/
    visibility:hidden;      /*content有内容，将元素隐藏*/
    clear:both;  
}
```

```javascript
 .clearfix:before, .clearfix:after {
        content: ""; 
        display: table;
    }
    .clearfix:after {
        clear: both;
    }
    .clearfix {
        *zoom: 1;
    }
```
