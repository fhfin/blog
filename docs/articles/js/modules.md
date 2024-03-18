# 模块化

## CommonJS规范

CommonJS规范加载模块是同步的，只有加载完成，才能执行后面的操作。

CommonJS规范中的module、exports和require

- 每个文件就是一个模块，有自己的作用域。每个模块内部，module变量代表当前模块，是一个对象，它的exports属性（即module.exports）是对外的接口。
- module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。
- 为了方便，Node为每个模块提供一个exports变量，指向module.exports。

- require命令用于加载模块文件。

## common.js和es6中模块引入的区别？

Common.js是一种模块规范，最初被应用于Nodejs，成为Nodejs 的模块规范。运行在浏览器端的JavaScript由于也缺少类似的规范，在ES6出来之前，前端也实现了一套相同的模块规范(例如: AMD)，用来对前端模块进行管理。自ES6起，引入了一套新的ES6 Module规范，在语言标准的层面上实现了模块功能，而且实现得相当简单，有望成为浏览器和服务器通用的模块解决方案。但目前浏览器对ES6 Module兼容还不太好，我们平时在Webpack 中使用的export和import，会经过Babel转换为CommonJs规范。

在使用上的差别主要有:

- CommonJs模块输出的是一个值的拷贝，ES6模块输出的是值的引用CommonJS模块是运行时加载，ES6模块是编译时输出接口。
- CommonJs是单个值导出，ES6 Module可以导出多个
- CommonJs是动态语法可以写在判断里，ES6 Module静态语法只能写在顶层
- CommonJs的this是当前模块，ES6 Module的this是undefined
