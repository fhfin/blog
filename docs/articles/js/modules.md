# 模块化

## CommonJS规范

CommonJS规范加载模块是同步的，只有加载完成，才能执行后面的操作。

CommonJS规范中的module、exports和require

- 每个文件就是一个模块，有自己的作用域。每个模块内部，module变量代表当前模块，是一个对象，它的exports属性（即module.exports）是对外的接口。
- module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。
- 为了方便，Node为每个模块提供一个exports变量，指向module.exports。

- require命令用于加载模块文件。