import{_ as a,o as s,c as n,V as e}from"./chunks/framework.0433447c.js";const g=JSON.parse('{"title":"Echarts隐藏api之精细化监听click","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/2023-04-25-echartsclick.md","lastUpdated":1683707318000}'),p={name:"blogs/2023-04-25-echartsclick.md"},t=e(`<h1 id="echarts隐藏api之精细化监听click" tabindex="-1">Echarts隐藏api之精细化监听click <a class="header-anchor" href="#echarts隐藏api之精细化监听click" aria-label="Permalink to &quot;Echarts隐藏api之精细化监听click&quot;">​</a></h1><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>点击echarts表格数据区域触发事件，生成弹窗，可以用echart官方提供的on监听，但是当图表中的折线或者点很小的时候，鼠标可能会点不到从而无法触发这个事件,像这样</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc1a4fad57f6488dab3d1668a75ddbc4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="a6a611c6950d6937bf4b0c511dddef1.jpg"></p><p>这个时候可以用echarts提供的getZr()函数，官方文档上好像也没有这个函数的详细说明</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">myChart.getZr().on(&quot;click&quot;, (params) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 获取点击点的像素坐标点</span></span>
<span class="line"><span style="color:#A6ACCD;">    const pointInPixel = [params.offsetX, params.offsetY]</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    // 转换为逻辑坐标点</span></span>
<span class="line"><span style="color:#A6ACCD;">    const pointInGrid = myChart.value.convertFromPixel({ seriesIndex: 0 }, pointInPixel)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    // 这里的zIndex就相当于直接使用on监听的dataIndex</span></span>
<span class="line"><span style="color:#A6ACCD;">    const zIndex = pointInGrid[0]</span></span>
<span class="line"><span style="color:#A6ACCD;"> })</span></span></code></pre></div><p>那么怎么能知道点击的区域有没有数据呢，可以通过params参数里的属性target和topTarget来判断</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//点击的区域没有数据</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    target =&gt; undefined  </span></span>
<span class="line"><span style="color:#A6ACCD;">    topTarget =&gt; object</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//点击的区域有数据</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    target =&gt; object  </span></span>
<span class="line"><span style="color:#A6ACCD;">    topTarget =&gt; object</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="注意" tabindex="-1">注意 <a class="header-anchor" href="#注意" aria-label="Permalink to &quot;注意&quot;">​</a></h2><p>因为这是私有 API，官方没开放过，自然文档里就没有介绍。目前可以用，但不保证某个版本后就失效了（比如移除了、改名了、或者改变传参啊返回值啊什么的）</p><p>而且这玩意儿因为是私有 API，所以可能甚至不会有 Breaking Changes Release Notes）。而用法也都是开发者们看源码自己总结出来的，毕竟是开源项目。 P.S. Zr 是 zrender 的缩写，zrender 是 echarts 的底层依赖。</p><p><strong>不过咱们项目中一般都会锁定依赖版本，只要不轻易的去变更版本号，就可以放心大胆的用啦~</strong></p>`,12),l=[t];function c(o,r,i,d,C,A){return s(),n("div",null,l)}const m=a(p,[["render",c]]);export{g as __pageData,m as default};
