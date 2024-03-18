# 面试题

## Virtual DOM的优势在哪里？

首先我们需要知道:DOM引擎、JS引擎相互独立，但又工作在同一线程(主线程)。JS代码调用DOM API必须挂起JS引擎、转换传入参数数据、激活DOM引擎，DOM重绘后再转换可能有的返回值，最后激活JS引擎并继续执行若有频繁的DOM APl调用，且浏览器厂商不做"批量处理"优化，引擎间切换的单位代价将迅速积累若其中有强制重绘的DOM API调用，重新计算布局、重新绘制图像会引起更大的性能消耗。

其次是VDOM和真实DOM的区别和优化:

- 虚拟DOM不会立马进行排版与重绘操作
- 虚拟DOM进行频繁修改，然后一次性比较并修改真实DOM中需要改的部分，最后在真实DOM中进行排版与重绘，减少过多DOM节点排版与重绘损耗
- 虚拟DOM有效降低大面积真实DOM的重绘与排版，因为最终与真实DOM比较差异，可以只渲染局部

## 隐式转换

```javascript
if(a == 1 && a == 2 && a == 3){
    console.log("我走进来了");
}

<!--答案1:-->
var a = {num:0};
a.valueOf = function(){
    return ++a.num
}

<!--答案2：-->
var num = 1;
function a(){
    return num++;
}
if(a() == 1 && a() == 2 && a() == 3){
    console.log("我走进来了");
}

<!--答案3:-->

var num = 0;
Function.prototype.toString = function(){
  return ++num;
}
function a(){}

<!--答案4:-->
var  a = {[Symbol.toPrimitive]: ((i) => () => ++i) (0)};
```

## this指向

```javascript

// 题一
var names = "宋伟老师";
var obj = {
    names:"张健老师",
    showName:function(){
        console.log(this.names);
    },
    returnName:function(){
        return this.names;
    },
    returnFunctionName:function(){
        return function(){
            console.log(this.names);
        }
    }
    
}
obj.showName();                                     //   "张健老师"
obj.returnName();                                   //   "张健老师"
obj.returnFunctionName()();                         //   "宋伟老师"
obj.showName.call(names);                           //   undefined
obj.returnName.call(names);                         //   undefined
obj.returnFunctionName().call(names)                //   undefined
var newObj = obj.returnFunctionName().bind(window);
newObj.call(obj)                                    //   "宋伟老师"
//为什么最后一个输出"宋伟老师"？因为bind指向this对象后  再一次调用的话  this指向不会被改变


// 题二
var big = "万达老师";

var obj = {
    big:"宋伟老师",
    showBig:function(){
        return this.big;
    }
}
obj.showBig.call(big);          //ƒ big() { [native code] } String.prototype.big函数

// 题三
function a(a,b,c){
    console.log(this.length);                 //4
    console.log(this.callee.length);          //1
}

function fn(d){
    arguments[0](10,20,30,40,50);
}

fn(a,10,20,30);

//第一个输出结果:因为this当前指向的是arguments 。 arguments是一个伪数组具备length属性。arguments又是保存函数的实参。
//fn调用的时候传入4个实参。所以arguments长度为4。这个时候arguments[0] 等同于 arguments.a调用这个函数。所以this指向的是arguments这个伪数组也是(对象)
//第二个输出结果：callee是arguments的一个属性,主要返回当前arguments直属的函数体。所以this.callees是返回fn 。每一个函数有一个length属性主要用来返回函数的形参的所以就是1。

```

## 变量

```javascript
// 题一
if(!"abc"  in window){
  var abc = 10;
}
console.log(abc);        //undefined  
//因为先变量声明提升 所以提升之后abc的值系统默认会赋值为undefined。 !"abc"为false ,in是检查对象中是否存在某个属性。很显然 false属于是一个布尔类型。不存在对象中。所以没有走if里面的变量赋值。
//if(!abc){var abc=10} console.log(abc);看看结果是否一样

// 题二
console.log(a);                 //undefined
if(!(a in window)){
    var a = 10;
}
console.log(a);                 //undefined
//因为先变量声明提升 所以提升之后a的值系统默认会赋值为undefined。 变量提升会存在GO中也就是window。所以(a in window)肯定为true。!去反一下就为false。所以不走赋值。

// 题三
var x = 1;
if (function f(){}) {
x += typeof f;  
}
console.log(x);                 //1undefined   
//因为函数题在()中会以表达式去运行。最后转换为true,不会存在函数整体声明提升。所以typeof为undefined

```

## 函数

```javascript
// 题一
function fun(n,o) {
     console.log(o)
         return {
          fun:function(m){
            return fun(m,n);
          }
     };
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3);   //输出什么 undefined 0 0 0 
var b = fun(0).fun(1).fun(2).fun(3);            //输出什么 undefined 0 1 2
var c = fun(0).fun(1); c.fun(2); c.fun(3);      //输出什么 undefined 0 1 1
// 答案解析：
function fun(n,o) {
     console.log(o)
         return {
          fun:function(m){
            return fun(m,n);
          }
     };
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3);   //输出什么 undefined 0 0 0 

//fun(0)调用时候等同于
function fun(n,o) {
    var n=0;
    var o;
     console.log(o)  //undefined
         return {
          fun:function(m){
            return fun(m,n);  ---> n 就获取到fun里面的n为0的值。然后调用一次fun就会出现下面函数显示。
          }
     };
}
//a.fun(1)调用时候等同于fun(1,0)
function fun(n,o) {
    var n=1;
    var o=0;
     console.log(o)  //1
         return {
          fun:function(m){
            return fun(m,n);  ---> n 就获取到fun里面的n为0的值。
          }
     };
}
// 以此类推



// 题二
function Foo(){
    Foo.a = function(){
        console.log(1);
    }
    this.a = function(){
        console.log(2)
    }
}
Foo.prototype.a = function(){
    console.log(3);
}
Foo.a = function(){
    console.log(4);
}
 
Foo.a();                 // 4
let obj = new Foo();
obj.a();                 //2
Foo.a();                 //1

// 答案解析：Foo.a() 这个是调用 Foo 函数的静态方法 a，虽然 Foo 中有优先级更高的属性方法 a，但 Foo 此时没有被调用，所以此时输出 Foo 的静态方法 a 的结果：4
// let obj = new Foo(); 使用了 new 方法调用了函数，返回了函数实例对象，此时 Foo 函数内部的属性方法初始化，原型链建立。
//  obj.a() ; 调用 obj 实例上的方法 a，该实例上目前有两个 a 方法：一个是内部属性方法，另一个是原型上的方法。当这两者都存在时，首先查找 ownProperty ，如果没有才去原型链上找，所以调用实例上的 a 输出：2
// Foo.a() ; 根据第2步可知 Foo 函数内部的属性方法已初始化，覆盖了同名的静态方法，所以输出：1
```
