
# 十七、VUE

## v-model作用

v-model本质上不过是语法糖，可以用 v-model 指令在**表单**及**元素**上创建双向数据绑定。

1. 它会根据控件类型自动选取正确的方法来更新元素
2. 它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理
3. v-model会忽略所有表单元素的value、checked、selected特性的初始值,而总是将 Vue 实例的数据作为数据来源，因此我们应该通过 JavaScript 在组件的data选项中声明初始值

**扩展：**

v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件：

1. text 和 textarea 元素使用value属性和input事件；
2. checkbox 和 radio 使用checked属性和change事件；
3. select 字段将value作为 prop 并将change作为事件。

## Vue3.0 实现数据双向绑定的方法

vue3.0 实现数据双向绑定是通过**Proxy**

**Proxy**是 ES6 中新增的一个特性，翻译过来意思是"代理"，用在这里表示由它来“代理”某些操作。 Proxy 让我们能够以简洁易懂的方式控制外部对对象的访问。其功能非常类似于设计模式中的代理模式。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

使用 Proxy 的核心优点是可以交由它来处理一些非核心逻辑（如：读取或设置对象的某些属性前记录日志；设置对象的某些属性值前，需要验证；某些属性的访问控制等）。 从而可以让对象只需关注于核心逻辑，达到关注点分离，降低对象复杂度等目的。

**扩展：**

使用proxy实现，双向数据绑定，相比2.0的Object.defineProperty ()优势：

1. 可以劫持整个对象，并返回一个新对象
2. 有13种劫持操作

## 导航守卫

导航守卫主要用来**通过跳转或取消的方式守卫导航**。

简单的说，导航守卫就是路由跳转过程中的一些钩子函数。路由跳转是一个大的过程，这个大的过程分为跳转前中后等等细小的过程，在每一个过程中都有一函数，这个函数能让你操作一些其他的事儿的时机，这就是导航守卫。

路由守卫的具体方法：

1. 全局前置守卫

   你可以使用 router.beforeEach 注册一个全局前置守卫：

   ```javascript
   const router = new VueRouter({ ... })
   router.beforeEach((to, from, next) => {
     // ...
   })
   ```

   每个守卫方法接收三个参数（往后的守卫都大同小异）：

   1. to: Route: 即将要进入的目标 路由对象

   2. from: Route: 当前导航正要离开的路由

   3. next: Function: 一定要调用该方法将控制权交给下一个守卫，执行效果依赖 next 方法的参数。

## MVC和MVVM的区别

MVC: MVC是应用最广泛的软件架构之一,一般MVC分为:Model(模型),View(视图),Controller(控制器)。 这主要是基于分层的目的,让彼此的职责分开.View一般用过Controller来和Model进行联系。Controller是Model和View的协调者,View和Model不直接联系。基本都是单向联系。

MVVM:MVVM是把MVC中的Controller改变成了ViewModel。View的变化会自动更新到ViewModel,ViewModel的变化也会自动同步到View上显示,通过数据来显示视图层。

MVVM和MVC的区别:

- MVC中Controller演变成MVVM中的ViewModel
- MVVM通过数据来显示视图层而不是节点操作
- MVVM主要解决了MVC中大量的dom操作使页面渲染性能降低,加载速度变慢,影响用户体验
