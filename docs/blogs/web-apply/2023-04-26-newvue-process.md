# New Vue之后到底发生了什么

## 一、初始化和挂载
new Vue()后，会调用init函数进行初始化，初始化生命周期、事件、props、methods、data、computed、watch等等，比较重要的是通过Object.defineProperty设置getter和setter函数来实现**响应式**以及**依赖收集**。

初始化后调用$mount挂载节点，如果是运行时编译，即不存在render fuction的而存在template的情况，则需要进行下一步，编译。

## 二、编译
![newvue1](https://github.com/HanochMa/PictureBed/raw/main/blogs/newvue1.png)
主要做的事情是将template编译成render function，如果本身就是写的render function，则可以跳过这步，原则上可以提升一些性能。

编译过程大体上有三个步骤：
1. **将模版解析成AST**
2. **遍历AST标记静态节点**
3. **使用AST生成render function**

对应这三个步骤，在Vue中抽象出了三个模块来实现对应的功能：
1. **解析器**

文本解析器、html解析器、过滤解析器，通过一条主线把这些解析器组装在一起

2. **优化器**

检测出所有的静态子树，为其打上标记，再次渲染时就不需要为这些静态节点生成新的vnode，直接克隆已有的。这是 Vue 在编译过程中的一处优化，后面当 update 更新界面时，会有一个 patch 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能。

3. **代码生成器**

生成代码字符串

## 三、依赖收集
在init的时候通过object.defineProperty对data进行getter的绑定，使得被设置的对象的值被读取的时候会执行getter函数，在render function被渲染的时候会读取对象的值，触发依赖收集。

## 四、Virtual DOM
render function执行会生成vnode节点，vnode对应真实dom中的每个节点，每次渲染视图时都是先创建vnode，然后使用vnode创建真实的dom插入到页面中，所以可以将上一次渲染的vonde缓存起来，之后每次需要重新渲染视图的时候，将这一次与上一次的vnode做对比（涉及到diff算法），看看他们有哪些不一样的地方，基于这些不一样的地方再去修改真实的dom。

<git-talk />