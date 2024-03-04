# this

## call、apply、bind的作用和区别

作用：

都可以改变函数内部的this指向

区别：

1. call和apply会调用函数，并且改变函数内部this指向
2. call和apply传递的传输不一样，call传递参数arg1，arg2...形式，apply必须数组形式[arg]
3. bind不会调用函数，可以改变函数内部this指向

call的主要作用也可以实现继承

```javascript
  function Person(uname, age) {
    this.uname = uname;
    this.age = age;
  }
  function Son(uname, age) {
    Person.call(this, uname, age);
  }
  var son = new Son("zhang", 12);
  console.log(son);
```

主要应用场景：

1. call经常做继承
2. apply经常跟数组有关系，比如借助数学对象实现数组最大值最小值
3. bind不调用函数，但是还想改变this指向，比如改变定时器内部的this指向

## this指向

1. 普通函数中的this，谁调用了函数或者方法，那么这个函数或者对象中的this就指向谁

   ```javascript
           let getThis = function () {
               console.log(this);
           }
   
           let obj={
               name:"Jack",
               getThis:function(){
                   console.log(this);
               }
           }
           //getThis()方法是由window在全局作用域中调用的，所以this指向调用该方法的对象，即window
           getThis();//window
           //此处的getThis()方法是obj这个对象调用的，所以this指向obj
           obj.getThis();//obj
   ```

2. 匿名函数中的this：匿名函数的指向具有全局性，则匿名函数中的this指向是window

   ```javascript
           let obj = {
               getThis: function () {
                   return function () {
                       console.log(this);
                   }
               }
           }
           obj.getThis()(); //window
   ```

3. 箭头函数中的this

   1. 箭头函数中的this是在函数定义的时候就确定下来的，而不是在函数调用的时候确定的
   2. 箭头函数中的this指向父级作用域的执行上下文
   3. 箭头函数无法使用apply、call和bind方法改变this指向，因为其this值在函数定义的时候就被确定下来了

## 手写bind

```javascript
Function.prototype.myBind = function() {
    let outContext = arguments[0] // 取上下文
    let outArgs = Array.from(arguments).slice(1) // 取外部入参
    const outThis = this // 存外部this
    let cb = function() {
        const isNew = typeof new.target !== 'undefined' // 判断函数是否被new过
        const inArgs = Array.from(arguments)// 取内部入参
        return outThis.apply(isNew ? this : outContext, outArgs.concat(inArgs)) // 改变指向，合并函数入参
    }
    cb.prototype = outThis.prototype // 继承构造函数原型
    return cb // 返回创建函数
}
```

## js继承方法

1. 原型链继承

   实现方式：将子类的原型链指向父类的对象实例

   ```javascript
   function Parent(){
     this.name = "parent";
     this.list = ['a'];
   }
   Parent.prototype.sayHi = function(){
     console.log('hi');
   }
   function Child(){
   
   }
   Child.prototype = new Parent();
   var child = new Child();
   console.log(child.name);
   child.sayHi();
   ```

   优点：可继承构造函数的属性，父类构造函数的属性，父类原型的属性

   缺点：无法向父类构造函数传参，切所有实例共享父类实例的属性，若父类共有属性为引用类型，一个子类实例更改父类构造函数中的共有属性时会导致继承的共有属性发生变化

2. 构造函数继承

   实现方式：在子类构造函数中使用call或者apply劫持父类构造函数方法，并传入传输

   ```javascript
   function Parent(name, id){
     this.id = id;
     this.name = name;
     this.printName = function(){
       console.log(this.name);
     }
   }
   Parent.prototype.sayName = function(){
     console.log(this.name);
   };
   function Child(name, id){
     Parent.call(this, name, id);
     // Parent.apply(this, arguments);
   }
   var child = new Child("jin", "1");
   child.printName(); // jin
   child.sayName() // Error
   ```

   原理：使用call或者apply更改子类函数的作用域，使this执行父类构造函数，子类因此可以继承父类共有属性

   优点：可解决原型链继承的缺点

   缺点：不可继承父类的原型链方法，构造函数不可复用

3. 组合继承

   原理：综合使用构造函数继承和原型链继承

   ```javascript
   function Parent(name, id){
     this.id = id;
     this.name = name;
     this.list = ['a'];
     this.printName = function(){
       console.log(this.name);
     }
   }
   Parent.prototype.sayName = function(){
     console.log(this.name);
   };
   function Child(name, id){
     Parent.call(this, name, id);
     // Parent.apply(this, arguments);
   }
   Child.prototype = new Parent();
   var child = new Child("jin", "1");
   child.printName(); // jin
   child.sayName() // jin
   
   var a = new Child();
   var b = new Child();
   a.list.push('b');
   console.log(b.list); // ['a']
   ```

   优点：可继承父类原型上的属性，切克传承；每个实例引入的构造函数是私有的

   缺点：会执行两次父类的构造函数，消耗较大内存，子类的构造函数会代替原型上的那个父类构造函数

4. 原型式继承

   原理：类似Object.create，用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象，结果是将子对象的____proto____指向父对象

   ```javascript
   var parent = {
     names: ['a']
   }
   function copy(object) {
     function F() {}
     F.prototype = object;    
     return new F();
   }
   var child = copy(parent);
   ```

   缺点：共享引用类型

5. 寄生式继承

   原理：二次封装原型式继承，并扩展

   ```javascript
   function createObject(obj) {
     var o = copy(obj);
     o.getNames = function() {
       console.log(this.names);
       return this.names;
     }
     return o;
   }
   ```

   优点：可添加新的属性和方法

6. 寄生组合式继承

   原理：改进组合继承，利用寄生式继承的思想继承原型

   ```javascript
   function inheritPrototype(subClass, superClass) {
     // 复制一份父类的原型
     var p = copy(superClass.prototype);
     // 修正构造函数
     p.constructor = subClass;
     // 设置子类原型
     subClass.prototype = p;
   }
   
   function Parent(name, id){
     this.id = id;
     this.name = name;
     this.list = ['a'];
     this.printName = function(){
       console.log(this.name);
     }
   }
   Parent.prototype.sayName = function(){
     console.log(this.name);
   };
   function Child(name, id){
     Parent.call(this, name, id);
     // Parent.apply(this, arguments);
   }
   inheritPrototype(Child, Parent);
   ```

## new会发生什么

1. 创建空对象
2. 设置新对象的constructor属性为构造函数的名称，设置新对象的proto属性指向构造函数的prototype对象
3. 使用新对象调用函数，函数中的this被指向新实例对象
4. 返回this 指针

```javascript
function myNew(Con, ...args) {
  // 创建一个新的空对象
  let obj = {};
  // 将这个空对象的__proto__指向构造函数的原型
  obj.__proto__ = Con.prototype;
  // 将this指向空对象
  let res = Con.apply(obj, args);
  // 对构造函数返回值做判断，然后返回对应的值
  return res instanceof Object ? res : obj;
}
```
