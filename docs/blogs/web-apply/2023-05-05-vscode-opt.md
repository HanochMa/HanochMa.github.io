# VSCode是如何优化性能的？

## 前言

本文主要是对 CovalenceConf 2019: Visual Studio Code – The First Second 这次分享的介绍，CovalenceConf 是一个以 Electron 构建桌面软件为主题的技术会议，这也是 VS Code 团队为数不多的对外分享之一(质量较高)，主要分享了 VS Code 是如何优化启动性能的。

## TL;DR

开头的一些内容

- VS Code 的指导原则之一是尽可能快的让用户可以进入编辑状态
- 启动速度优化并不复杂，但它是许许多多小改进的总和，没有银弹
- Monaco Editor 最早是 2011 年底开始的一个实验项目，目的是构建一款在浏览器中运行的开发人员工具

关于启动性能优化

- 性能优化基本的法则

- - 测量，测量，还是测量，并基于此建立一个基准线 (VS Code 使用 Performance API，并对整个启动过程中的关键节点打点)
  - 建立监控，针对每个版本的性能变化快速做出优化措施
  - 用一台7年前(现在来说是9年前)的 ThinkPad 做测试，确保它能在1.8秒内启动 VS Code
  - 不要过多的专注于 Electron、V8 这些底层依赖，因为有一群聪明的人在不断的优化它们，专注于加载代码以及运行程序。

- 确保代码尽可能快的加载

- - 使用 Rollup、Webpack 等构建工具将代码打包成单文件，这可以节省约 400ms
  - 压缩代码，可以节省约 100ms
  - 使用 V8 Cached Data 将一些模块代码编译成字节码文件(一种中间态)，这可以节省约 400ms, VS Code 自己使用 AMD Loader 实现了这个缓存，也可以直接用 v8-compile-cache 这个包。

- 生命周期阶段(Lifecycle Phases)，分先后顺序来做应该做的事？不要一股脑全部执行

- - 梳理清楚所有关于启动阶段事情的优先级
  - 保证资源管理器和编辑器初始化，然后再做其他不是非常重要的事

- requestIdleCallback, 将不那么重要的工作放在浏览器空闲时间执行

- - 参考 Idle Until Urgent 这篇文章

- 通过一些小技巧使得界面「体感上」较快

- - 切换编辑器时，使用 MouseDown 来替代 MouseUp / Click 事件，先确保 Tab 很快的切换
  - 打开耗时较大的文件时，首先将面包屑、状态栏等其他 UI 部分渲染出来，使得用户感觉 UI 反应很快

- 重复以上步骤

## 没有银弹

VS Code 是少有的核心功能完全使用 Web 技术构建的桌面编辑器，在这之前是 Atom，但师出同门(Electron) 的 Atom 最为人诟病的就是其性能问题。VS Code 自诞生那天起，保证性能优先就是最重要的一条准则，诚然相比老牌的 Sublime Text，VS Code 性能表现并不能称得上优秀，但相比之下已经完全是可以接受的水平了。

社区也有很多开源编辑器采用了前后端分离技术，也就是使用 Web 技术构建编辑器 UI 部分，而核心的 TextBuffer 都使用 Native 实现，这类编辑器甚至可以替换 UI 层的技术实现，例如使用我们常见的 Electron，又或是 QT 等桌面端技术，因为编辑器涉及面太广，这里暂时不再赘述。

最开始我是抱着来找黑魔法的想法来看这次分享的，然而当我结合代码看了三遍分享后满屏都是四个字

总结下来就是几个点

- 按照优先级划分启动顺序，永远确保文件树和编辑器最快渲染出来，并且光标第一时间在编辑器内跳动(这意味着用户可以开始编辑文件了)
- 测量监控性能数据，每个版本都收集尽可能多的数据来直观的表现性能
- 对于出现的性能瓶颈快速做出改进

性能优化是一个长期的过程，并不是某个时间段集中精力优化一波就高枕无忧了，你可以在 VS Code 的 issue 列表里找到一系列标签为 perf 和 startup-perf 相关的 issue，并且这些 issue 都有人长期跟踪解决的。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt1.png)

## 从哪开始？

在这之前我们需要明确几个首屏启动性能相关的概念，这里列举的并不是全部，有兴趣的可以自行在 Web.Dev 查找其他指标。

我们不一定关注以上所有的指标，但有几个对用户体感差异较为明显的指标可以重点关注一下，例如 LCP 、 FID 以及 TTI。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt2.png)

还有另一项指标 FMP (First Meaningful Paint 首次有效渲染时间) 不是很推荐，因为它无法直观的识别页面的主体内容是否加载完成，例如某些网站会在有意义的内容渲染前展示一个全屏的 Loading 动画，这对用户来讲显然是没有任何意义的，而相比之下 LCP 更为纯粹，它只看页面主体内容、图像是否加载完成。

这与 VS Code 的原则不谋而合，对于文本编辑器来说，性能好坏最直接的问题就是从点开图标到我可以输入文本需要多久？ VS Code 的答案是 1 秒 (热启动在 500 毫秒左右)。

所以第一步永远是测量，不管是 console.time 还是新的 Performance API，在关键的节点添加这些性能标记，通过大量的数据收集可以得到一个真实的性能指标。VS Code 选择了 Performance API ，这样更方便汇总上报数据。运行 Startup Performance 命令可以看到这些性能指标的耗时 (总耗时2s+, 实际上 TTI 是 977ms)。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt3.png)

数据收集除了能看到当前真实的性能指标，更能帮助我们发现耗时花在了哪些地方。要做到这一点，需要找到这些关键节点。VS Code 是基于 Electron ，除了常规的页面渲染之外，还有一包括等待 Electron App Ready、创建窗口、LoadURL 等耗时，这部分的性能有专业的团队来保障(Electron、V8)，不需要关心太多。所以重点需要关心的是 UI 部分的呈现及可交互时间。

## 尽可能快的加载并执行 JavaScript

回到我们擅长的前端领域，当我们谈到性能优化时，总是逃不开几条金科玉律

- 减小包体积，包括对 HTML、CSS、JavaScript 代码的压缩等
- 减小 HTTP 请求，使用服务端 gzip 压缩
- 使用 Webpack、Rollup 等现代构建工具来抽离公共代码，Code Splitting 代码拆分等

所有这些优化的目的，都是为了尽可能快的加载并执行 JavaScript 代码。在 SPA 大行其道的今天，JavaScript 加载越慢，就意味着用户看到的白屏时间更久(于是又催生出了 SSR 这种方案)。

### V8 Code Cache

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt4.png)

V8 Code Cache 的目的是减少对 JavaScript 代码的解析与编译开销，我们知道 V8 使用 JIT (Just in time compilation) 来执行 JavaScript 代码，也就是说在 JS 脚本执行之前，必须对其进行解析和编译，这一步的开销是较大的。而 Code Cache 技术是在首次编译时将结果缓存下来，下一次加载相同的脚本时直接读取磁盘上的缓存来执行，省去了解析、编译的过程，从而使脚本执行更快。V8 提供了开放的 API，因此，任何使用 V8 的软件都可以调用该 API，同时 Node.js 5.7.0 版本起 vm 模块也提供了对该 API 的包装。由于 VS Code 使用 AMD Loader 作为模块加载器，所以内置实现了 V8 Code Cache。

不过对于大多数应用来说，没必要自己实现一遍缓存逻辑，直接使用 v8-compile-cache ，在入口处引入 v8-compile-cache 即可。

```js
import 'v8-compile-cache';
```

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt5.png)

经过一系列的优化，VS Code 的 JS Bundle 加载速度从一开始的接近 1.5 秒优化到了 0.5 秒。

## 生命周期，更聪明的排序

编辑器的启动包含许多逻辑，例如快捷键、编辑器、文件浏览器、调试器等功能的初始化与事件绑定等等，每个看起来都是非常重要的核心功能，而当软件体积不断增大时，这些逻辑可能会像高速公路上的车辆一样，如果毫无秩序，每一辆车都想以最快的速度通过，反而会导致所有车辆停滞不前，造成拥堵。

拆分生命周期的一个重要目的就是将这些核心功能的优先级进行排序，黄金原则就是尽可能快的让用户最关心的界面先渲染出来。对于 VS Code 来说，就是文件资源管理器和编辑器。VS Code 的核心功能都是通过 Contribution 来注册的。在早期的版本中，这些贡献点会在启动时就全部一起进行注册，这直接导致编辑器的加载被阻塞，最直观的表现就是界面所有 UI 都已经渲染出来并且可操作时，编辑器内的文本还没有加载出来(它们可能很大)。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt6.png)

拆分生命周期阶段本质上就是将这些贡献点分阶段来实例化，具体来说，VS Code 将整个启动的生命周期分为了四个阶段

1. Starting 应用开始启动阶段，非常底层的依赖需要在该阶段实例化
2. Ready 核心服务已经实例化完成
3. Restored 编辑器、UI 状态已经恢复完成(前一次关闭时缓存的状态)
4. Eventually 准备就绪，意味着编辑器完全可用

生命周期执行的核心代码

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt7.png)

正如分享的作者 Johannes Rieken 所说，这并不是非常复杂的技术问题，而是以一种更聪明的方式来对启动过程重新排序。这样一来，整体的启动过程会更加的有序，对于一些不是那么重要的任务，将它们的优先级靠后一些，从而确保能在第一时间将编辑器呈现出来，使用户进入可以编辑的状态。

## requestIdleCallback

requestIdleCallback 是一个浏览器提供的 API，用于在 CPU 空闲时间执行一些任务。相比 setTimeout，requestIdleCallback 的执行时机由浏览器来控制，因为浏览器知道何时才是空闲时间。利用 requestIdleCallback，可以将一些必要但不紧急的工作延后处理，例如常见的一些埋点上报逻辑，可能会在触发某些高频率的交互操作时执行，而如果将这些逻辑与事件处理放在一起，很容易影响操作体验。

requestIdleCallback 可以传入第二个参数，表示超时时间。表示最晚多久以后来执行回调函数。

一般来说应该将执行时机交还给浏览器，让浏览器自行决定何时调用回调，如果设置了超时时间，则可能因为执行顺序被打乱。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt8.png)

## Perceived Performance，让体感更快的小技巧

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt9.png)

对于一些耗时的确会很长的操作，例如打开一个巨大的文件，显然即便是性能最好的的优化手段，也无法将这种耗时降到毫秒级。但我们可以通过一些小的手段让这种交互 感觉更快。例如在这个 Case 中，点击打开一个大文件(2.5m)时，先将编辑器 Tab 以及面包屑渲染出来。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt10.gif)

除此之外，对于切换编辑器 Tab 时，使用 MouseDown 而非 MouseUp 事件，一次点击事件从触发 MouseDown 到 MouseUp 中间的耗时平均是50ms，这意味着在切换编辑器时，鼠标点击至少 50ms 后包括 Tab 以及面包屑才会有反应。我们可以写一个很简单的 Demo 来观察这两者的区别。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt11.gif)

例如这张截图中，点击 package.json 时，文件内容还是另一个文件，而面包屑已经变成了 package.json。使用这种小技巧，在 VS Code 中切换编辑器时，会令用户觉得「反应好快」。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-opt12.png)

不建议在所有点击事件触发的地方都使用 MouseDown 来代替 MouseUp，因为复杂的 UI 可能还需要处理如拖动等事件，这会让事件处理更加复杂。

## 最后，以及预告

实际上这篇分享的内容没有太多看起来非常硬核的技术手段，更多的是对当前性能瓶颈的测量，以及更聪明的「重新排列组合」，或者说采用了一系列使体验更好的策略，这对用户体验的提升是巨大的。这也给了 KAITIAN 很大的启发，基于这些，我们也重新审视并优化了 KAITIAN 的启动速度，使 KAITIAN 的启动由之前的接近3秒达到了500ms以内的速度。

References

- CovalenceConf 2019: Visual Studio Code – The First Second

- - https://www.youtube.com/watch?v=r0OeHRUCCb4&ab_channel=ElectronUserland

- Web Dev : https://web.dev/
- Idle Until Urgent

- - https://developers.google.com/web/updates/2015/08/using--requestidlecallback#guaranteeing_your_function_is_called

- Using requestIdleCallback

- - https://developers.google.com/web/updates/2015/08/using-requestidlecallback#guaranteeing_your_function_is_called

- V8 Code Cache

- - https://v8.dev/blog/code-caching

- New JavaScript techniques for rapid page loads

- - https://blog.chromium.org/2015/03/new-javascript-techniques-for-rapid.html