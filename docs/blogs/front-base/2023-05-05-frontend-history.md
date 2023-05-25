# 前端工程化的演变

## 背景

近年来 Web 应用变得更加复杂与庞大，Web 前端技术的应用范围也更加广泛。 从复杂庞大的管理后台到对性能要求苛刻的移动网页，再到类似 ReactNative 的原生应用开发方案，在面临更多机遇的同时也同时面临着更大的挑战，从前通过直接编写 JavaScript、CSS、HTML 开发 Web 应用的方式已经无法应对当前 Web 应用的发展。

## 各种框架

### 原生js

最初的前端通过html+css+js开发页面，通过html去描述网页上的元素，css去添加一些样式，js用于逻辑上的一些控制，各司其职又互相关联，在频繁的交互过程中，需要手动使用js去修改一些css样式和html元素，而原生js提供的api又会比较繁琐



### jq的出现

2006年，jQuery出现，它的设计宗旨是“write Less，Do More”，即倡导写更少的代码，做更多的事情。它封装了很多工具函数，挂载在window.$下，在加载完 jQuery 后其他模块再通过window.$去调用其中的方法，极大简化了很多对dom的操作，但是这样做也会存在许多问题



### 现代框架

在 Web 应用变得庞大复杂时，采用直接操作 DOM 的方式去开发将会使代码变得复杂和难以维护，频繁的触发浏览器的重绘和重排，在性能方面也很难去优化，许多新的思路也被引入到网页开发中以减少开发难度、提升开发效率。

#### React

React引入 JSX 语法到 JavaScript 语言层面中，以更灵活地控制视图的渲染逻辑。这种语法无法直接在任何现成的 JavaScript 引擎里运行，必须经过编译器转换。

```jsx
function demo(){
  let has = true;
  return (
    has ? <h1>hello,react</h1> : <div>404</div>
  )
}
```



#### Vue

Vue将数据与模型进行双向绑定，采用MVVM的设计模式，开发者只需要关注数据模型这一层，一切视图的更新以数据驱动，视图层会自动响应数据的更新，同时，当视图上的元素发生变化时，也同样会更新模型中对应的数据

```vue
<!--HTML 模版-->
<template>
  <div class="example">{{ msg }}</div>
</template>

<!--JavaScript 组件逻辑--> 
<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<!--CSS 样式-->
<style>
.example {
  font-weight: bold;
}
</style>
```

#### Angular2

Angular2推崇采用 TypeScript 语言去开发应用，并且可以通过注解的语法描述组件的各种属性。

```jsx
@Component({
  selector: 'my-app',
  template: `<h1>{{title}}</h1>`
})
export class AppComponent {
  title = 'Tour of Heroes';
}
```



## 模块化

正如上面提到的，jq把它的api都挂载在window.$下，会带来一些问题：

- 命名空间冲突，两个库可能会使用同一个名称，例如 Zepto 也被放在 window.$ 下；
- 无法合理地管理项目的依赖和版本；
- 无法方便地控制依赖的加载顺序。

当项目变大时这种方式将变得难以维护，于是社区涌现出了一些模块化方案

### CommonJS

CommonJS是一种使用广泛的 JavaScript 模块化规范，核心思想是通过 require 方法来同步地加载依赖的其他模块，通过 module.exports 导出需要暴露的接口。 CommonJS 规范的流行得益于 Node.js 采用了这种方式，后来这种方式被引入到了网页开发中。

```javascript
// 导入 
const moduleA = require('./moduleA'); 
// 导出 
module.exports = moduleA.someFunc;
```

CommonJS 的优点在于：

- 代码可复用于 Node.js 环境下并运行，例如做同构应用；
- 通过 NPM 发布的很多第三方模块都采用了 CommonJS 规范。

CommonJS 的缺点在于这样的代码无法直接运行在浏览器环境下，必须通过工具转换成标准的 ES5。

### AMD

AMD 也是一种 JavaScript 模块化规范，与 CommonJS 最大的不同在于它采用异步的方式去加载依赖的模块。 AMD 规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现是 requirejs。

```javascript
// 定义一个模块 
define('module', ['dep'], function(dep) {   return exports; });
// 导入和使用 
require(['module'], function(module) { }); 
```



AMD 的优点在于：

- 可在不转换代码的情况下直接在浏览器中运行；
- 可异步加载依赖；
- 可并行加载多个依赖；
- 代码可运行在浏览器环境和 Node.js 环境下。

AMD 的缺点在于JavaScript 运行环境没有原生支持 AMD，需要先导入实现了 AMD 的库后才能正常使用。

### ES6 模块化

ES6 模块化是欧洲计算机制造联合会 ECMA 提出的 JavaScript 模块化规范，它在语言的层面上实现了模块化。浏览器厂商和 Node.js 都宣布要原生支持该规范。它将逐渐取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

```javascript
// 导入 
import { readFile } from 'fs'; 
import React from 'react';
// 导出 
export function hello() {}; 
export default {   // ... }; 
```



ES6模块虽然是终极模块化方案，但它的缺点在于目前无法直接运行在部分 JavaScript 运行环境下，必须通过工具转换成标准的 ES5 后才能正常运行。



### 构建工具

各种可以提高开发效率的新思想和框架被发明，但是这些东西都有一个共同点：源代码无法直接运行，必须通过转换后才可以正常运行，也就是构建：

- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。



历史上先后出现一系列构建工具，它们各有其优缺点：

#### Npm Script

Npm 是在安装 Node.js 时附带的包管理器，Npm Script 则是 Npm 内置的一个功能，可以在 package.json 文件里面使用 scripts 字段定义任务：

```json
{   "scripts": {    
      "dev": "node dev.js", 
      "pub": "node build.js"
	} 
}
```



里面的 scripts 字段是一个对象，每个属性对应一段 Shell 脚本，底层实现原理是通过调用 Shell 去运行脚本命令，例如执行 npm run pub 命令等同于执行命令 node build.js。

Npm Script的优点是内置，无须安装其他依赖。其缺点是功能太简单，虽然提供了 pre 和 post 两个钩子，但不能方便地管理多个任务之间的依赖



#### Gulp

Gulp是一个基于流的自动化构建工具。 除了可以管理和执行任务，还支持监听文件、读写文件。Gulp 被设计得非常简单，只通过5个方法就可以胜任几乎所有构建场景：

- 通过 gulp.task 注册一个任务；
- 通过 gulp.run 执行任务；
- 通过 gulp.watch 监听文件变化；
- 通过 gulp.src 读取文件；
- 通过 gulp.dest 写文件。

Gulp 的最大特点是引入了流的概念，同时提供了一系列常用的插件去处理流，流可以在插件之间传递，优点是好用又不失灵活，既可以单独完成构建也可以和其它工具搭配使用。缺点是集成度不高，要写很多配置后才可以用，无法做到开箱即用

#### webpack

在 webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。

![img](https://cdn.nlark.com/yuque/0/2022/png/12550589/1667285931985-69b02629-7cbe-4edd-a3eb-27c513fd5d50.png)

Webpack的优点是：

- 专注于处理模块化的项目，能做到开箱即用一步到位；
- 通过 Plugin 扩展，完整好用又不失灵活；
- 使用场景不仅限于 Web 开发；
- 社区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展

Webpack的缺点是只能用于采用模块化开发的项目（也不算缺点，目前前端项目基本都使用模块化开发）

#### Rollup

Rollup 是一个和 Webpack 很类似但专注于 ES6 的模块打包工具。 Rollup 的亮点在于能针对 ES6 源码进行 Tree Shaking 以去除那些已被定义但没被使用的代码，以及 Scope Hoisting 以减小输出文件大小提升运行性能。 然而 Rollup 的这些亮点随后就被 Webpack 模仿和实现。 由于 Rollup 的使用和 Webpack 差不多，这里就不详细介绍如何使用了，而是详细说明它们的差别：

- Rollup 是在 Webpack 流行后出现的替代品；
- Rollup 生态链还不完善，体验不如 Webpack；
- Rollup 功能不如 Webpack 完善，但其配置和使用更加简单；
- Rollup 不支持 Code Spliting，但好处是打包出来的代码中没有 Webpack 那段模块的加载、执行和缓存的代码。

Rollup 在用于打包 JavaScript 库时比 Webpack 更加有优势，因为其打包出来的代码更小更快。



## 组件化

一个页面的几百行，甚至上千行的代码逻辑写在一个 js 文件中的情况在一些老项目中很常见，通常这种代码都很难读下去，更别说维护起来，添加新功能，移除一些老功能了，因为不知道改动一个地方，会不会出现意想不到的 bug，这个时候，就需要利用组件化开发，拆分功能，封装组件，单独维护。

一个前端组件，包含了 HTML、CSS、JavaScript，包含了组件的模板、样式和交互等内容，基本上涵盖了组件的所有的内容，外部只要按照组件设定的属性、函数及事件处理等进行调用即可，完全不用考虑组件的内部实现逻辑，对外部来说，组件是一个完全的黑盒。

目前一些优秀的组件库包括iview、element、ant design、vant等等，把组件化的开发发挥到了极致，当然有些公司会根据自己产品设计出一套ui以及交互规范，为了统一视觉效果，也会开发一套公司内部的组件库。



## 未来的发展趋势

web component

lowcode&nocode

js全栈

Vite

原生语言在前端工具链中的应用

可视化webgl

...

<git-talk />