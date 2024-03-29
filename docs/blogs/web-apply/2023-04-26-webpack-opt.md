# Webpack优化思路
总结一些webpack打包的优化思路，大致可以从以下几个方面入手
## 一、缩小文件搜索范围
Webpack 启动后会从配置的 Entry 出发，解析出文件中的导入语句，再递归的解析。 在遇到导入语句时 Webpack 会做两件事情：
1. 根据导入语句去寻找对应的要导入的文件。例如 `require('react')` 导入语句对应的文件是 `./node_modules/react/react.js`，`require('./util')` 对应的文件是 `./util.js`。
2. 根据找到的要导入文件的后缀，使用配置中的 Loader 去处理文件。例如使用 ES6 开发的 JavaScript 文件需要使用 babel-loader 去处理。

以上两件事情虽然对于处理一个文件非常快，但是当项目大了以后文件量会变的非常多，这时候构建速度慢的问题就会暴露出来。 虽然以上两件事情无法避免，但需要尽量减少以上两件事情的发生，以提高速度。

### 优化 loader 配置
由于 Loader 对文件的转换操作很耗时，需要让尽可能少的文件被 Loader 处理。

在使用 Loader 时可以通过 `test` 、 `include` 、 `exclude` 三个配置项来命中 Loader 要应用规则的文件。 为了尽可能少的让文件被 Loader 处理，可以通过 `include` 去命中只有哪些文件需要被处理。

以采用 ES6 的项目为例，在配置 babel-loader 时，可以这样：
```js
module.exports = {
  module: {
    rules: [
      {
        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
        test: /\.js$/,
        // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
        use: ['babel-loader?cacheDirectory'],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, 'src'),
      },
    ]
  },
};
```
> 可以适当的调整项目的目录结构，以方便在配置 Loader 时通过 include 去缩小命中范围。

### 优化 resolve.modules 配置
resolve.modules 是用于配置 Webpack 去哪些目录下寻找第三方模块。

resolve.modules 的默认值是 `['node_modules']`，含义是先去当前目录下的 ./node_modules 目录下去找想找的模块，如果没找到就去上一级目录 `../node_modules` 中找，再没有就去 `../../node_modules` 中找，以此类推，这和 Node.js 的模块寻找机制很相似。

当安装的第三方模块都放在项目根目录下的 `./node_modules` 目录下时，没有必要按照默认的方式去一层层的寻找，可以指明存放第三方模块的绝对路径，以减少寻找，配置如下：
```js
module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, 'node_modules')]
  },
};
```

### 优化 resolve.mainFields 配置
resolve.mainFields 用于配置第三方模块使用哪个入口文件。

安装的第三方模块中都会有一个 `package.json` 文件用于描述这个模块的属性，其中有些字段用于描述入口文件在哪里，`resolve.mainFields` 用于配置采用哪个字段作为入口文件的描述。

可以存在多个字段描述入口文件的原因是因为有些模块可以同时用在多个环境中，针对不同的运行环境需要使用不同的代码。 以 isomorphic-fetch 为例，它是 fetch API 的一个实现，但可同时用于浏览器和 Node.js 环境。 它的 package.json 中就有2个入口文件描述字段：
```js
{
  "browser": "fetch-npm-browserify.js",
  "main": "fetch-npm-node.js"
}
```
> isomorphic-fetch 在不同的运行环境下使用不同的代码是因为 fetch API 的实现机制不一样，在浏览器中通过原生的 fetch 或者 XMLHttpRequest 实现，在 Node.js 中通过 http 模块实现。

- 当 `target` 为 `web` 或者 `webworker` 时，值是 `["browser", "module", "main"]`
- 当 `target` 为其它情况时，值是 `["module", "main"]`

为了减少搜索步骤，在你明确第三方模块的入口文件描述字段时，你可以把它设置的尽量少。 由于大多数第三方模块都采用 main 字段去描述入口文件的位置，可以这样配置 Webpack：

```js
module.exports = {
  resolve: {
    // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
    mainFields: ['main'],
  },
};
```
> 使用本方法优化时，你需要考虑到所有运行时依赖的第三方模块的入口文件描述字段，就算有一个模块搞错了都可能会造成构建出的代码无法正常运行。

### 优化 resolve.alias 配置
resolve.alias 配置项通过别名来把原导入路径映射成一个新的导入路径。

在实战项目中经常会依赖一些庞大的第三方模块，以 React 库为例，安装到 `node_modules` 目录下的 React 库的目录结构如下：

```js
├── dist
│   ├── react.js
│   └── react.min.js
├── lib
│   ... 还有几十个文件被忽略
│   ├── LinkedStateMixin.js
│   ├── createClass.js
│   └── React.js
├── package.json
└── react.js
```
可以看到发布出去的 React 库中包含两套代码：
- 一套是采用 `CommonJS` 规范的模块化代码，这些文件都放在 `lib` 目录下，以 `package.json` 中指定的入口文件 `react.js` 为模块的入口。
- 一套是把 React 所有相关的代码打包好的完整代码放到一个单独的文件中，这些代码没有采用模块化可以直接执行。其中 `dist/react.js` 是用于开发环境，里面包含检查和警告的代码。`dist/react.min.js` 是用于线上环境，被最小化了。

默认情况下 Webpack 会从入口文件 `./node_modules/react/react.js` 开始递归的解析和处理依赖的几十个文件，这会时一个耗时的操作。 通过配置 `resolve.alias` 可以让 Webpack 在处理 React 库时，直接使用单独完整的 `react.min.js` 文件，从而跳过耗时的递归解析操作。

相关 Webpack 配置如下：
```js
module.exports = {
  resolve: {
    // 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件，
    // 减少耗时的递归解析操作
    alias: {
      'react': path.resolve(__dirname, './node_modules/react/dist/react.min.js'), // react15
      // 'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'), // react16
    }
  },
};
```
> 除了 React 库外，大多数库发布到 Npm 仓库中时都会包含打包好的完整文件，对于这些库你也可以对它们配置 `alias`。  
> 但是对于有些库使用本优化方法后会影响到后面要讲的使用 Tree-Shaking 去除无效代码的优化，因为打包好的完整文件中有部分代码你的项目可能永远用不上。   
> 一般对整体性比较强的库采用本方法优化，因为完整文件中的代码是一个整体，每一行都是不可或缺的。 但是对于一些工具类的库，例如 `lodash`，你的项目可能只用到了其中几个工具函数，你就不能使用本方法去优化，因为这会导致你的输出代码中包含很多永远不会执行的代码。


### 优化 resolve.extensions 配置
在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试询问文件是否存在。 `resolve.extensions` 用于配置在尝试过程中用到的后缀列表，默认是：
```js
extensions: ['.js', '.json']
```
也就是说当遇到 `require('./data')` 这样的导入语句时，Webpack 会先去寻找 `./data.js` 文件，如果该文件不存在就去寻找 `./data.json` 文件，如果还是找不到就报错。

如果这个列表越长，或者正确的后缀在越后面，就会造成尝试的次数越多，所以 `resolve.extensions` 的配置也会影响到构建的性能。 在配置 `resolve.extensions` 时你需要遵守以下几点，以做到尽可能的优化构建性能：
- 后缀尝试列表要尽可能的小，不要把项目中不可能存在的情况写到后缀尝试列表中。
- 频率出现最高的文件后缀要优先放在最前面，以做到尽快的退出寻找过程。
- 在源码中写导入语句时，要尽可能的带上后缀，从而可以避免寻找过程。例如在你确定的情况下把 `require('./data')` 写成 `require('./data.json')`。

相关 Webpack 配置如下：
```js
module.exports = {
  resolve: {
    // 尽可能的减少后缀尝试的可能性
    extensions: ['js'],
  },
};
```

### 优化 module.noParse 配置
`module.noParse` 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析处理，这样做的好处是能提高构建性能。 原因是一些库，例如 jQuery 、ChartJS， 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

在上面的 优化 resolve.alias 配置 中讲到单独完整的 `react.min.js` 文件就没有采用模块化，让我们来通过配置 `module.noParse` 忽略对 `react.min.js` 文件的递归解析处理， 相关 Webpack 配置如下：
```js
const path = require('path');

module.exports = {
  module: {
    // 独完整的 `react.min.js` 文件就没有采用模块化，忽略对 `react.min.js` 文件的递归解析处理
    noParse: [/react\.min\.js$/],
  },
};
```
>注意被忽略掉的文件里不应该包含 import 、 require 、 define 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。

## 二、多进程打包
webpack最耗时的就是loader转换文件的过程，利用多进程对loader转换进行加速，happypack 貌似在几年前已经停止维护了

## 三、提取公共代码
大型网站通常会由多个页面组成，每个页面都是一个独立的单页应用。 但由于所有页面都采用同样的技术栈，以及使用同一套样式代码，这导致这些页面之间有很多相同的代码。

如果每个页面的代码都把这些公共的部分包含进去，会造成以下问题：
- 相同的资源被重复的加载，浪费用户的流量和服务器的成本
- 每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验

如果把多个页面公共的代码抽离成单独的文件，就能优化以上问题。 原因是假如用户访问了网站的其中一个网页，那么访问这个网站下的其它网页的概率将非常大。 在用户第一次访问后，这些页面公共代码的文件已经被浏览器缓存起来，在用户切换到其它页面时，存放公共代码的文件就不会再重新加载，而是直接从缓存中获取。 这样做后有如下好处：
- 减少网络传输流量，降低服务器成本
- 虽然用户第一次打开网站的速度得不到优化，但之后访问其它页面的速度将大大提升

### 如何提取公共代码
你已经知道了提取公共代码会有什么好处，但是在实战中具体要怎么做，以达到效果最优呢？ 通常你可以采用以下原则去为你的网站提取公共代码：
- 根据你网站所使用的技术栈，找出网站所有页面都需要用到的基础库，以采用 React 技术栈的网站为例，所有页面都会依赖 `react`、`react-dom` 等库，把它们提取到一个单独的文件。 一般把这个文件叫做 `base.js`，因为它包含所有网页的基础运行环境；
- 在剔除了各个页面中被 `base.js` 包含的部分代码外，再找出所有页面都依赖的公共部分的代码提取出来放到 `common.js` 中去。
- 再为每个网页都生成一个单独的文件，这个文件中不再包含 `base.js` 和 `common.js` 中包含的部分，而只包含各个页面单独需要的部分代码。

![webpack1](https://github.com/HanochMa/PictureBed/raw/main/blogs/webpack1.png)

读到这里你可以会有疑问：既然能找出所有页面都依赖的公共代码，并提取出来放到 `common.js` 中去，为什么还需要再把网站所有页面都需要用到的基础库提取到 `base.js` 去呢？ 原因是为了长期的缓存 base.js 这个文件

发布到线上的文件都会采用CDN加速的方法，对静态文件的文件名都附加根据文件内容计算出 Hash 值，也就是最终 `base.js` 的文件名会变成 `base_3b1682ac.js`，以长期缓存文件。 网站通常会不断的更新发布，每次发布都会导致 `common.js` 和各个网页的 JavaScript 文件都会因为文件内容发生变化而导致其 Hash 值被更新，也就是缓存被更新。

把所有页面都需要用到的基础库提取到 `base.js` 的好处在于只要不升级基础库的版本，`base.js` 的文件内容就不会变化，Hash 值不会被更新，缓存就不会被更新。 每次发布浏览器都会使用被缓存的 `base.js` 文件，而不用去重新下载 `base.js` 文件。 由于 `base.js` 通常会很大，这对提升网页加速速度能起到很大的效果。

### 如何通过 Webpack 提取公共代码
你已经知道如何提取公共代码，接下来教你如何用 Webpack 实现。

Webpack 内置了专门用于提取多个 Chunk 中公共部分的插件 CommonsChunkPlugin，CommonsChunkPlugin 大致使用方法如下：
```js
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

new CommonsChunkPlugin({
  // 从哪些 Chunk 中提取
  chunks: ['a', 'b'],
  // 提取出的公共部分形成一个新的 Chunk，这个新 Chunk 的名称
  name: 'common'
})
```
以上配置就能从网页 A 和网页 B 中抽离出公共部分，放到 common 中。
每个 CommonsChunkPlugin 实例都会生成一个新的 Chunk，这个新 Chunk 中包含了被提取出的代码，在使用过程中必须指定 `name` 属性，以告诉插件新生成的 Chunk 的名称。 其中 `chunks` 属性指明从哪些已有的 Chunk 中提取，如果不填该属性，则默认会从所有已知的 Chunk 中提取。

>Chunk 是一系列文件的集合，一个 Chunk 中会包含这个 Chunk 的入口文件和入口文件依赖的文件。

通过以上配置输出的 common Chunk 中会包含所有页面都依赖的基础运行库 react、react-dom，为了把基础运行库从 common 中抽离到 base 中去，还需要做一些处理。

首先需要先配置一个 Chunk，这个 Chunk 中只依赖所有页面都依赖的基础库以及所有页面都使用的样式，为此需要在项目中写一个文件 `base.js` 来描述 base Chunk 所依赖的模块，文件内容如下：
```js
// 所有页面都依赖的基础库
import 'react';
import 'react-dom';
// 所有页面都使用的样式
import './base.css';
```
接着再修改 Webpack 配置，在 entry 中加入 base，相关修改如下：
```js
module.exports = {
  entry: {
    base: './base.js'
  },
};
```
以上就完成了对新 Chunk base 的配置。

为了从 common 中提取出 base 也包含的部分，还需要配置一个 CommonsChunkPlugin，相关代码如下：

```js
new CommonsChunkPlugin({
  // 从 common 和 base 两个现成的 Chunk 中提取公共的部分
  chunks: ['common', 'base'],
  // 把公共的部分放到 base 中
  name: 'base'
})
```
由于 common 和 base 公共的部分就是 base 目前已经包含的部分，所以这样配置后 common 将会变小，而 base 将保持不变。

以上都配置好后重新执行构建，你将会得到四个文件，它们分别是：
- `base.js`：所有网页都依赖的基础库组成的代码；
- `common.js`：网页A、B都需要的，但又不在 base.js 文件中出现过的代码；
- `a.js`：网页 A 单独需要的代码；
- `b.js`：网页 B 单独需要的代码。
为了让网页正常运行，以网页 A 为例，你需要在其 HTML 中按照以下顺序引入以下文件才能让网页正常运行：
```html
<script src="base.js"></script>
<script src="common.js"></script>
<script src="a.js"></script>
```
以上就完成了提取公共代码需要的所有步骤。

针对 CSS 资源，以上理论和方法同样有效，也就是说你也可以对 CSS 文件做同样的优化。

以上方法可能会出现 `common.js` 中没有代码的情况，原因是去掉基础运行库外很难再找到所有页面都会用上的模块。 在出现这种情况时，你可以采取以下做法之一：
- CommonsChunkPlugin 提供一个选项 minChunks，表示文件要被提取出来时需要在指定的 Chunks 中最小出现最小次数。 假如 `minChunks=2`、`chunks=['a','b','c','d']`，任何一个文件只要在 `['a','b','c','d']` 中任意两个以上的 Chunk 中都出现过，这个文件就会被提取出来。 你可以根据自己的需求去调整 `minChunks` 的值，`minChunks` 越小越多的文件会被提取到 `common.js` 中去，但这也会导致部分页面加载的不相关的资源越多； `minChunks` 越大越少的文件会被提取到 `common.js` 中去，但这会导致 `common.js` 变小、效果变弱。
- 根据各个页面之间的相关性选取其中的部分页面用 `CommonsChunkPlugin` 去提取这部分被选出的页面的公共部分，而不是提取所有页面的公共部分，而且这样的操作可以叠加多次。 这样做的效果会很好，但缺点是配置复杂，你需要根据页面之间的关系去思考如何配置，该方法不通用。

## 四、CDN加速
### 什么是 CDN
虽然前面通过了压缩代码的手段来减小网络传输大小，但实际上最影响用户体验的还是网页首次打开时的加载等待。 导致这个问题的根本是网络传输过程耗时大，CDN 的作用就是加速网络传输。

CDN 又叫内容分发网络，通过把资源部署到世界各地，用户在访问时按照就近原则从离用户最近的服务器获取资源，从而加速资源的获取速度。 CDN 其实是通过优化物理链路层传输过程中的网速有限、丢包等问题来提升网速的，其大致原理可以如下：
![webpack2](https://github.com/HanochMa/PictureBed/raw/main/blogs/webpack2.png)

### 接入 CDN
要给网站接入 CDN，需要把网页的静态资源上传到 CDN 服务上去，在服务这些静态资源的时候需要通过 CDN 服务提供的 URL 地址去访问。

举个详细的例子，有一个单页应用，构建出的代码结构如下：
```
dist
|-- app_9d89c964.js
|-- app_a6976b6d.css
|-- arch_ae805d49.png
`-- index.html
```
其中 `index.html` 内容如下：
```html
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="app_a6976b6d.css">
</head>
<body>
<div id="app"></div>
<script src="app_9d89c964.js"></script>
</body>
</html>
```
`app_a6976b6d.css`内容如下：
```css
body{background:url(arch_ae805d49.png) repeat}h1{color:red}
```
可以看出到导入资源时都是通过相对路径去访问的，当把这些资源都放到同一个 CDN 服务上去时，网页是能正常使用的。 但需要注意的是由于 CDN 服务一般都会给资源开启很长时间的缓存，例如用户从 CDN 上获取到了 `index.html` 这个文件后， 即使之后的发布操作把 `index.html` 文件给重新覆盖了，但是用户在很长一段时间内还是运行的之前的版本，这会新的导致发布不能立即生效。
要避免以上问题，业界比较成熟的做法是这样的：
- 针对 HTML 文件：不开启缓存，把 HTML 放到自己的服务器上，而不是 CDN 服务上，同时关闭自己服务器上的缓存。自己的服务器只提供 HTML 文件和数据接口。
- 针对静态的 JavaScript、CSS、图片等文件：开启 CDN 和缓存，上传到 CDN 服务上去，同时给每个文件名带上由文件内容算出的 Hash 值， 例如上面的 `app_a6976b6d.css` 文件。 带上 Hash 值的原因是文件名会随着文件内容而变化，只要文件发生变化其对应的 URL 就会变化，它就会被重新下载，无论缓存时间有多长。

采用以上方案后，在 HTML 文件中的资源引入地址也需要换成 CDN 服务提供的地址，例如以上的 `index.html` 变为如下：
```html
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="//cdn.com/id/app_a6976b6d.css">
</head>
<body>
<div id="app"></div>
<script src="//cdn.com/id/app_9d89c964.js"></script>
</body>
</html>
```
并且 `app_a6976b6d.css` 的内容也应该变为如下：

```css
body{background:url(//cdn.com/id/arch_ae805d49.png) repeat}h1{color:red}
```
也就是说，之前的相对路径，都变成了绝对的指向 CDN 服务的 URL 地址。
>如果你对形如 `//cdn.com/id/app_a6976b6d.css` 这样的 URL 感到陌生，你需要知道这种 URL 省掉了前面的 `http:` 或者 `https:` 前缀， 这样做的好处时在访问这些资源的时候会自动的根据当前 HTML 的 URL 是采用什么模式去决定是采用 HTTP 还是 HTTPS 模式。  

除此之外，如果你还知道浏览器有一个规则是同一时刻针对同一个域名的资源并行请求是有限制的话（具体数字大概4个左右，不同浏览器可能不同）， 你会发现上面的做法有个很大的问题。由于所有静态资源都放到了同一个 CDN 服务的域名下，也就是上面的 `cdn.com`。 如果网页的资源很多，例如有很多图片，就会导致资源的加载被阻塞，因为同时只能加载几个，必须等其它资源加载完才能继续加载。 要解决这个问题，可以把这些静态资源分散到不同的 CDN 服务上去， 例如把 JavaScript 文件放到 `js.cdn.com` 域名下、把 CSS 文件放到 `css.cdn.com` 域名下、图片文件放到 `img.cdn.com` 域名下， 这样做之后 index.html 需要变成这样：
```html
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="//css.cdn.com/id/app_a6976b6d.css">
</head>
<body>
<div id="app"></div>
<script src="//js.cdn.com/id/app_9d89c964.js"></script>
</body>
</html>
```
>使用了多个域名后又会带来一个新问题：增加域名解析时间。是否采用多域名分散资源需要根据自己的需求去衡量得失。 当然你可以通过在 HTML HEAD 标签中 加入 `<link rel="dns-prefetch" href="//js.cdn.com">` 去预解析域名，以降低域名解析带来的延迟。

### 用 Webpack 实现 CDN 的接入
总结上面所说的，构建需要实现以下几点：
- 静态资源的导入 URL 需要变成指向 CDN 服务的绝对路径的 URL 而不是相对于 HTML 文件的 URL。
- 静态资源的文件名称需要带上有文件内容算出来的 Hash 值，以防止被缓存。
- 不同类型的资源放到不同域名的 CDN 服务上去，以防止资源的并行加载被阻塞。
先来看下要实现以上要求的最终 Webpack 配置：
```js
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {WebPlugin} = require('web-webpack-plugin');

module.exports = {
  // 省略 entry 配置...
  output: {
    // 给输出的 JavaScript 文件名称加上 Hash 值
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, './dist'),
    // 指定存放 JavaScript 文件的 CDN 目录 URL
    publicPath: '//js.cdn.com/id/',
  },
  module: {
    rules: [
      {
        // 增加对 CSS 文件的支持
        test: /\.css$/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          // 压缩 CSS 代码
          use: ['css-loader?minimize'],
          // 指定存放 CSS 中导入的资源（例如图片）的 CDN 目录 URL
          publicPath: '//img.cdn.com/id/'
        }),
      },
      {
        // 增加对 PNG 文件的支持
        test: /\.png$/,
        // 给输出的 PNG 文件名称加上 Hash 值
        use: ['file-loader?name=[name]_[hash:8].[ext]'],
      },
      // 省略其它 Loader 配置...
    ]
  },
  plugins: [
    // 使用 WebPlugin 自动生成 HTML
    new WebPlugin({
      // HTML 模版文件所在的文件路径
      template: './template.html',
      // 输出的 HTML 的文件名称
      filename: 'index.html',
      // 指定存放 CSS 文件的 CDN 目录 URL
      stylePublicPath: '//css.cdn.com/id/',
    }),
    new ExtractTextPlugin({
      // 给输出的 CSS 文件名称加上 Hash 值
      filename: `[name]_[contenthash:8].css`,
    }),
    // 省略代码压缩插件配置...
  ],
};
```
以上代码中最核心的部分是通过 `publicPath` 参数设置存放静态资源的 CDN 目录 URL， 为了让不同类型的资源输出到不同的 CDN，需要分别在：
- `output.publicPath` 中设置 JavaScript 的地址。
- `css-loader.publicPath` 中设置被 CSS 导入的资源的的地址。
- `WebPlugin.stylePublicPath` 中设置 CSS 文件的地址。

设置好 `publicPath` 后，`WebPlugin` 在生成 HTML 文件和 `css-loader` 转换 CSS 代码时，会考虑到配置中的 `publicPath`，用对应的线上地址替换原来的相对地址。

## 五、按需加载
### 为什么需要按需加载
随着互联网的发展，一个网页需要承载的功能越来越多。 对于采用单页应用作为前端架构的网站来说，会面临着一个网页需要加载的代码量很大的问题，因为许多功能都集中的做到了一个 HTML 里。 这会导致网页加载缓慢、交互卡顿，用户体验将非常糟糕。

导致这个问题的根本原因在于一次性的加载所有功能对应的代码，但其实用户每一阶段只可能使用其中一部分功能。 所以解决以上问题的方法就是用户当前需要用什么功能就只加载这个功能对应的代码，也就是所谓的按需加载。

### 如何使用按需加载
- 在给单页应用做按需加载优化时，一般采用以下原则：
- 把整个网站划分成一个个小功能，再按照每个功能的相关程度把它们分成几类。
- 把每一类合并为一个 Chunk，按需加载对应的 Chunk。
- 对于用户首次打开你的网站时需要看到的画面所对应的功能，不要对它们做按需加载，而是放到执行入口所在的 Chunk 中，以降低用户能感知的网页加载时间。
对于个别依赖大量代码的功能点，例如依赖 Chart.js 去画图表、依赖 flv.js 去播放视频的功能点，可再对其进行按需加载。

<git-talk />