# Echarts隐藏api之精细化监听click
## 背景
点击echarts表格数据区域触发事件，生成弹窗，可以用echart官方提供的on监听，但是当图表中的折线或者点很小的时候，鼠标可能会点不到从而无法触发这个事件,像这样

![a6a611c6950d6937bf4b0c511dddef1.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc1a4fad57f6488dab3d1668a75ddbc4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?)

这个时候可以用echarts提供的getZr()函数，官方文档上好像也没有这个函数的详细说明

```
myChart.getZr().on("click", (params) => {
    // 获取点击点的像素坐标点
    const pointInPixel = [params.offsetX, params.offsetY]
    
    // 转换为逻辑坐标点
    const pointInGrid = myChart.value.convertFromPixel({ seriesIndex: 0 }, pointInPixel)
    
    // 这里的zIndex就相当于直接使用on监听的dataIndex
    const zIndex = pointInGrid[0]
 })

```

那么怎么能知道点击的区域有没有数据呢，可以通过params参数里的属性target和topTarget来判断

```
//点击的区域没有数据
{
    target => undefined  
    topTarget => object
}

//点击的区域有数据
{
    target => object  
    topTarget => object
}


```

## 注意
因为这是私有 API，官方没开放过，自然文档里就没有介绍。目前可以用，但不保证某个版本后就失效了（比如移除了、改名了、或者改变传参啊返回值啊什么的）

而且这玩意儿因为是私有 API，所以可能甚至不会有 Breaking Changes Release Notes）。而用法也都是开发者们看源码自己总结出来的，毕竟是开源项目。
P.S. Zr 是 zrender 的缩写，zrender 是 echarts 的底层依赖。

**不过咱们项目中一般都会锁定依赖版本，只要不轻易的去变更版本号，就可以放心大胆的用啦~**

<git-talk />