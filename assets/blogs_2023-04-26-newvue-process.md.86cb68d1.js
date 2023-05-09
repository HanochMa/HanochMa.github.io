import{_ as e,o as t,c as o,V as a}from"./chunks/framework.9928bc23.js";const m=JSON.parse('{"title":"New Vue之后到底发生了什么","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/2023-04-26-newvue-process.md","lastUpdated":1683624724000}'),r={name:"blogs/2023-04-26-newvue-process.md"},n=a('<h1 id="new-vue之后到底发生了什么" tabindex="-1">New Vue之后到底发生了什么 <a class="header-anchor" href="#new-vue之后到底发生了什么" aria-label="Permalink to &quot;New Vue之后到底发生了什么&quot;">​</a></h1><h2 id="一、初始化和挂载" tabindex="-1">一、初始化和挂载 <a class="header-anchor" href="#一、初始化和挂载" aria-label="Permalink to &quot;一、初始化和挂载&quot;">​</a></h2><p>new Vue()后，会调用init函数进行初始化，初始化生命周期、事件、props、methods、data、computed、watch等等，比较重要的是通过Object.defineProperty设置getter和setter函数来实现<strong>响应式</strong>以及<strong>依赖收集</strong>。</p><p>初始化后调用$mount挂载节点，如果是运行时编译，即不存在render fuction的而存在template的情况，则需要进行下一步，编译。</p><h2 id="二、编译" tabindex="-1">二、编译 <a class="header-anchor" href="#二、编译" aria-label="Permalink to &quot;二、编译&quot;">​</a></h2><p><img src="https://github.com/HanochMa/PictureBed/raw/main/blogs/newvue1.png" alt="newvue1"> 主要做的事情是将template编译成render function，如果本身就是写的render function，则可以跳过这步，原则上可以提升一些性能。</p><p>编译过程大体上有三个步骤：</p><ol><li><strong>将模版解析成AST</strong></li><li><strong>遍历AST标记静态节点</strong></li><li><strong>使用AST生成render function</strong></li></ol><p>对应这三个步骤，在Vue中抽象出了三个模块来实现对应的功能：</p><ol><li><strong>解析器</strong></li></ol><p>文本解析器、html解析器、过滤解析器，通过一条主线把这些解析器组装在一起</p><ol start="2"><li><strong>优化器</strong></li></ol><p>检测出所有的静态子树，为其打上标记，再次渲染时就不需要为这些静态节点生成新的vnode，直接克隆已有的。这是 Vue 在编译过程中的一处优化，后面当 update 更新界面时，会有一个 patch 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能。</p><ol start="3"><li><strong>代码生成器</strong></li></ol><p>生成代码字符串</p><h2 id="三、依赖收集" tabindex="-1">三、依赖收集 <a class="header-anchor" href="#三、依赖收集" aria-label="Permalink to &quot;三、依赖收集&quot;">​</a></h2><p>在init的时候通过object.defineProperty对data进行getter的绑定，使得被设置的对象的值被读取的时候会执行getter函数，在render function被渲染的时候会读取对象的值，触发依赖收集。</p><h2 id="四、virtual-dom" tabindex="-1">四、Virtual DOM <a class="header-anchor" href="#四、virtual-dom" aria-label="Permalink to &quot;四、Virtual DOM&quot;">​</a></h2><p>render function执行会生成vnode节点，vnode对应真实dom中的每个节点，每次渲染视图时都是先创建vnode，然后使用vnode创建真实的dom插入到页面中，所以可以将上一次渲染的vonde缓存起来，之后每次需要重新渲染视图的时候，将这一次与上一次的vnode做对比（涉及到diff算法），看看他们有哪些不一样的地方，基于这些不一样的地方再去修改真实的dom。</p>',19),i=[n];function s(l,d,c,p,u,h){return t(),o("div",null,i)}const g=e(r,[["render",s]]);export{m as __pageData,g as default};