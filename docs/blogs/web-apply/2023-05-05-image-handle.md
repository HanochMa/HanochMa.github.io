# 现代图片性能优化及体验优化方案

## 前言

图片资源，在我们的业务中可谓是占据了非常大头的一环，尤其是其对带宽的消耗是十分巨大的。

对图片的性能优化及体验优化在今天就显得尤为重要。本文，就将从各个方面阐述，在各种新特性满头飞的今天，我们可以如何尽可能的对我们的图片资源，进行性能优化及体验优化。

## 图片类型的选取及 Picture 标签的使用

首先，从图片的类型上而言，除了常见的 PNG-8/PNG-24，JPEG，GIF 之外，我们更多的关注另外几个较新的图片格式：

- WebP
- JPEG XL
- AVIF

首先，通过一张表格，快速过一下这几个图片，我们将从图片类型、透明通道、动画、编解码性能、压缩算法、颜色支持、内存占用、兼容性方面，对比它们：

| 图片类型     | Alpha 通道 | 动画   | 编解码性能                        | 压缩算法          | 颜色支持           | 内存占用 | 兼容性                               |
| ------------ | ---------- | ------ | --------------------------------- | ----------------- | ------------------ | -------- | ------------------------------------ |
| GIF          | 支持       | 支持   | 较高                              | 无损压缩          | 索引色(256)        | 基本一致 | ALL                                  |
| PNG-8/PNG-24 | 支持       | 不支持 | 较高                              | 无损压缩          | 索引色(256)\直接色 | 基本一致 | ALL                                  |
| JPEG         | 不支持     | 不支持 | 较高                              | 有损压缩          | 直接色             | 基本一致 | ALL                                  |
| WebP         | 支持       | 支持   | 编解码性能差（低配设备更为显著）  | 有损压缩\无损压缩 | 直接色             | 基本一致 | 高版本 Chrome\Opera\Android          |
| JPEG XL      | 支持       | 支持   | 编解码性能优于 WebP               | 有损压缩\无损压缩 | 直接色             | 基本一致 | 部分高版本 Chrome\Opera\Firefox\Edge |
| AVIF         | 支持       | 支持   | 编解码性能优于 WebP，低于 JPEG XL | 有损压缩\无损压缩 | 直接色             | 基本一致 | 高版本 Chrome\Opera\Android\Edge     |

首先，了解了解上述的一些参数含义：

- Alpha 通道：图片是否支持透明的特性

当然，需要指出的是，Alpha 没有透明度的意思，不代表透明度。opacity 和 transparency 才和透明度有关，前者是不透明度，后者是透明度。比如 css 中的「opacity: 0.5」就是设定元素有 50% 的不透明度。后来 Alvy Ray Smith 提出每个像素再增加一个 Alpha 通道，取值为0到1，用来储存这个像素是否对图片有「贡献」，0代表透明、1代表不透明。也就是说，「Alpha 通道」储存一个值，其外在表现是「透明度」，Alpha 和透明度没啥关系

- 动画：很好理解，图片是否支持多帧率动态图片，类似于 GIF
- 编解码性能：图像的解码与编码。这个很关键，很多人对待图片容易忽视图片的编解码性能，解码图像主要从图像文件中读出图像数据，而编码则是将图像数据写入图像文件。解码与编码的过程正好相反。而这两者的性能耗时会影响我们页面的的展示性能。
- 压缩算法：该图片格式是否支持压缩，支持的话，图片的压缩又会分为无损压缩与有损压缩

**有损压缩算法**是一种数据压缩方法，经过此方法压缩、解压的数据会与原始数据不同但是非常接近。原理是借由将次要的信息数据舍弃，牺牲一些质量来减少数据量、提高压缩比**无损压缩**指数据经过压缩后，信息不受损失，还能完全恢复到压缩前的原样。无损压缩通常用于严格要求“经过压缩、解压缩的数据必须与原始数据一致”的场合。

- 颜色支持：会分为索引色与直接色，在过去，为了节省存储空间，并非所有图片都能支持所有颜色值，因此存在索引色这种优化方式。

**索引颜色**是一种以有限的方式管理数字图像颜色的技术，以节省计算机内存和文件存储，同时加速显示刷新和文件传输。即用一个数字来代表（索引）一种颜色，在存储图片的时候，存储一个数字的组合，同时存储数字到图片颜色的映射。这种方式只能存储有限种颜色。索引色常见有1位（即黑白），8位（即灰阶/256色），16位（即高彩），24位（即真彩），30/36/48位（即全彩）。**直接色**使用四个数字来代表一种颜色，这四个数字分别代表这个颜色中红色、绿色、蓝色以及透明度（即 RGBA）。现在流行的显示设备可以在这四个维度分别支持256种变化，所以直接色可以表示2的32次方种颜色。

- 内存占用：图片对内存资源的占用
- 兼容性：影响图片格式能否大规模推广的核心要素之一

### WebP vs JPEG XL vs AVIF: JPEG 替代之战

因为传统的 PNG-8/PNG-24，JPEG，GIF 各自或多或少都存在一些问题，近些年来它们的替代方案之争也愈演愈烈，核心领跑者可能是 **WebP**、**JPEG XL**、**AVIF**。

再简单了解了解它们：

#### WebP

WebP 最初由 Google 在 2010 年 9 月发布，其特性总结如下：

1. 可以同时提供无损/有损压缩（像 JPEG 一样）和支持透明度（像 PNG 一样）的图片文件格式
2. 支持动画效果（像 GIF 一样）
3. WebP 主要优势在于有损编码，其无损编码的性能和压缩比表现一般
4. WebP 的缺点在于其编解码性能不是特别理想
5. 在兼容性方面，除了 IE，基本已经得到了全系列浏览器支持

对于复杂的图像（比如照片）来说，WebP 无损编码表现并不好，但有损编码表现却非常棒。相近质量的图片解码速度 WebP 相距 JPEG 也已经相差不大了，而文件压缩比却能提升不少。

下图是我之前做的一个测试对比：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle1.png)

加载同样张数的 JPEG 与 WebP 的耗时对比：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle2.png)

对于 WebP 图片格式，简单做个总结：

1. 目前 WebP 与 JPEG 相比较，据资料考证，编码速度慢 10 倍，解码速度慢 1.5 倍
2. WebP 虽然会增加额外的解码时间，但由于大幅减少了文件体积，缩短了加载的时间，大页面图片量较多的场景下，页面的渲染速度是有较大加快的
3. 目前而言，是 WebP、JPEG XL、AVIF 三者中兼容性最好的

截止至（2023-02-05）的兼容性图：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle3.png)

#### JPEG XL

JPEG XL 由联合图像专家组（开发原始 JPEG 标准的同一组织）于 2021 年发布，旨在成为传统 JPEG 的长期替代品。作为一种免版税的开源标准，JPEG XL 的创建者希望其格式的开放性能够吸引网络开发人员采用该标准，该格式的扩展名为 .jxl，JXL 核心比特流于 2021 年 1 月冻结，文件格式于 2021 年 4 月定稿。：

JPEG XL 中的 X 指 2000 年以来的多个 JPEG 标准的名称：**JPEG XT**、**JPEG XR**、**JPEG XS**，而 L 表示 'long-term'，表示“长期”。创建这种格式是为替换**旧的JPEG文件格式**，并使用足够长的时间。

其主要特点有：

- 与传统图像格式（例如JPEG、GIF和PNG）相比，有着更佳的效率与更丰富的功能
- 全面支持广色域和 HDR，支持 Alpha 通道，支持多帧（也就是动画支持）
- 有损压缩时：相同的视觉质量，比 JPEG 小约 60％。
- 无损压缩时：比 PNG 减小约 35％（对于 HDR，减小 50％）。
- 支持无损 JPEG 转码，减小约 20％ 文件大小。
- 渐进式解码，专为支持不同显示分辨率的响应式加载
- 开源免费：具有使用三条款版**BSD许可证**的**开源**参考实现的免版税格式

看看同一张图片，相同质量下的大小表现：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle4.png)

数据来源：**技术周刊 2021-04-15：2021最值得期待的新技术 JPEG XL**

JPEG XL 是目前而言，最有可能全面替代传统图片格式（Gif、PNG、JPEG）的下一代标准，当然，在今天，需要看看其兼容性：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle5.png)

好吧，目前的兼容有点离谱。Chrome 从 91 版本开始已经实验室性质支持了 .jxl 格式的图片，需要通过 --enable-features=JXL 配置开启。遗憾的是，从 Chrome 110 开始，Chrome 又不再支持 JPEG XL 。 

有趣的是，Chrome 从 110 版本开始中弃用了对 JPEG-XL 的支持，谷歌的回答是，人们对 JPEG-XL 没有足够的兴趣，并且与现有格式相比也没有足够的优势。谷歌之前一直对 JPEG 的支持都是实验性的性质的，他们认为 JPEG XL 缺乏生态系统支持，并且该格式没有足够多的好处（相对 WebP 和 AVIF）。也就是说，目前而言，Chrome 对 WebP 和 AVIF 等替代格式更感兴趣。

#### AVIF

最后，我们再来看看 AVIF 格式图片。

AVIF 是由开放媒体联盟 (AOM) 开发并于 2019 年发布的另一种最新图像格式。该格式基于 AV1 视频编解码器，源自视频帧。其特点如下：

- 同样的，与传统图像格式（例如JPEG、GIF和PNG）相比，有着更佳的效率与更丰富的功能
- 支持 Alpha 通道，支持**动态图像**和**动画**
- 支持有损、无损压缩。AVIF 文件在低保真有损图像压缩方面表现出色（比 JPEG XL 更优）。压缩的 AVIF 图像保留了很高的图片质量，避免了恼人的压缩伪影等问题
- 相对而言，AVIF 的解码和编码速度不如 JPEG XL，它不支持渐进式渲染
- 最后，再看看兼容性，目前（2023-02-05）它的兼容性介于 WebP 与 JPEG XL 之间

下图是 WebP vs JPEG XL vs AVIF 三者在图片解码上的性能表现：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle6.png)

图片来源于：**Encode.su -- JPEG XL vs. AVIF**

从图中可以看到，对于解码性能的对比，结果居然是 **WebP > AVIF > JPEG XL** 。JPEG XL 的编解码性能并没有其描述的那么强大。

### 图片格式总结

总结一下，WebP、AVIF 和 JPEG XL 都是浏览器不广泛支持的新型图像格式。虽然 WebP、AVIF 已经存在很长时间，但到今天，影响它们大规模使用的依旧是兼容问题。

JPEG XL、AVIF、Web 各自有各自的特点与优势，并且都未完全得到任何浏览器的支持。

虽然 AVIF、JPEG XL 等新型图片格式未得到任何浏览器的完全支持，但是在新版本的 Chrome、Firefox 和 Edge Chromium，可以使用配置标志启用对应图像格式，配合 HTML 的 Picture 标签，我们还是可以一定程度上对我们的图片进行格式选择上的优化的。

这，就可以引出我们要说的第二部分 -- **HTML Picture** 标签的使用。

### Picture 元素的使用

HTML5 规范新增了 Picture Element。那么 `picture` 元素的作用是什么呢？

`picture` 元素通过包含零或多个 `source` 元素和一个 `img` 元素来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子 `source` 元素，如果没有匹配的，就选择 `img` 元素的 src 属性中的 URL。然后，所选图像呈现在 `img` 元素占据的空间中。

什么意思呢？怎么使用 `picture` 元素呢？

假设，没有 `picture` ，只有 `img` 元素，我们想尽可能在支持一些现代图片格式的浏览器上使用类似于上述我们提到的 WebP、AVIF 和 JPEG XL  等图片格式，而不支持的浏览器回退使用常规的 JPEG、PNG 等。没错，**就是一种渐进增强的思想**，该怎么办呢？

只能是 JavaScript 去写对应的逻辑，通过 JS 脚本进行特性查询，动态赋值给 `img` 的 src。

我们来看看对应的语法：

```html
`picture`
  <!-- 可能是一些对兼容性有要求的，但是性能表现更好的现代图片格式-->
  <source src="image.avif" type="image/avif">
  <source src="image.jxl" type="image/jxl">
  <source src="image.webp" type="image/webp">

   <!-- 最终的兜底方案-->
  <img src="image.jpg" type="image/jpeg">
</picture>
```

而有了 `picture` 后，浏览器将原生支持上述的一些列操作，简而言之，`picture` 元素的作用：

1. 通过 `source` 给出一系列对兼容性有所要求的现代图片格式选项
2. 通过 `img` 给出兜底的高兼容性图片格式选项
3. 浏览器通过对给出的图片格式做特性检测，要决定加载哪个 URL，user agent 检查每个` source`的 `srcset`、`media` 和 `type` 属性，来选择最匹配页面当前布局、显示设备特征等的兼容图像。
4. 最终，所选图像呈现在 `img` 元素占据的空间中   

## 本章总结
总结一下，本文对常见的图片格式以及最新的几种未被大规模兼容的图片格式进行的对比，它们分别是：

- PNG-8/PNG-24
- JPEG
- GIF
- WebP
- JPEG XL
- AVIF

其后，着重介绍了 3 种现代图片格式：WebP、JPEG XL、AVIF。相对于 JPEG 等传统格式，它们在色彩表现、动画支持、是否支持无损有损压缩、压损比率、编解码性能上有着更进一步的提升，正在成为下一阶段 Web 图像的标准。

最后，介绍了 ``picture`` 元素，借助它，我们能更好的实现图片的渐进增强。

## 适配不同的屏幕尺寸及 DPR

第二个模块，我们来看看图片资源如何更好的适配不同的屏幕尺寸。

这里首先会涉及一个预备知识，屏幕的 DPR 值，那么，什么是 DPR 呢？要了解 DPR，又需要知道什么是**设备独立像素** 以及 **物理像素**。

### 设备独立像素

以 iPhone6/7/8为例，这里我们打开 Chrome 开发者工具：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle7.png)

这里的 375 * 667 表示的是什么呢，表示的是设备独立像素（DIP），也可以理解为 CSS 像素，也称为逻辑像素：

**设备独立像素 = CSS 像素 = 逻辑像素**

如何记忆呢？这里使用 CSS 像素来记忆，也就是说。我们设定一个宽度为 375px 的 div，刚好可以充满这个设备的一行，配合高度 667px ，则 div 的大小**刚好**可以充满整个屏幕。

### 物理像素

OK，那么，什么又是物理像素呢。我们到电商网站购买手机，都会看一看手机的参数，以 JD 上的 iPhone7 为例：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle8.png)

可以看到，iPhone7 的分辨率是 1334 x 750，这里描述的就是屏幕实际的物理像素。

物理像素，又称为设备像素。显示屏是由一个个物理像素点组成的，1334 x 750 表示手机分别在垂直和水平上所具有的像素点数。通过控制每个像素点的颜色，就可以使屏幕显示出不同的图像，屏幕从工厂出来那天起，它上面的物理像素点就固定不变了，单位为pt。

**设备像素 = 物理像素**

### DPR（Device Pixel Ratio） 设备像素比

OK，有了上面两个概念，就可以顺理成章引出下一个概念。DPR（Device Pixel Ratio） 设备像素比，这个与我们通常说的视网膜屏（多倍屏，Retina屏）有关。

设备像素比描述的是**未缩放状态下**，物理像素和设备独立像素的初始比例关系。

简单的计算公式：

**DPR = 物理像素 / 设备独立像素**

我们套用一下上面 iPhone7 的数据（取设备的物理像素宽度与设备独立像素宽度进行计算）：

iPhone7’s DPR = iPhone7’s 物理像素宽度 / iPhone7's 设备独立像素宽度 = 2

750 / 375 = 2 或者是 1334 / 667 = 2

可以得到 iPhone7 的 dpr 为 2。也就是我们常说的视网膜屏幕。

视网膜（Retina）屏幕是苹果公司"发明"的一个营销术语。苹果公司将 dpr > 1 的屏幕称为视网膜屏幕。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle9.png)

在视网膜屏幕中，以 dpr = 2 为例，把 4(2x2) 个像素当 1 个像素使用，这样让屏幕看起来更精致，但是元素的大小本身却不会改变：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle10.png)

OK，我们再来看看 iPhone XS Max：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle11.png)

它的物理像素如上图是 2688 x 1242，

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle12.png)

它的 CSS 像素是 896 x 414，很容易得出 iPhone XS Max 的 dpr 为 3。

### 为不同 DPR 屏幕，提供恰当的图片

那么，DPR 和图片适配有什么关系呢？

举个例子，同样的 CSS 像素大小下，屏幕如果有不同 DPR，同样大小的图片渲染出来的效果不尽相同。

我们以 dpr = 3 的手机为例子，在 300 x 389 CSS 像素大小的范围内，渲染 **1倍/2倍/3倍** 图的效果如下：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle13.png)

实际图片所占的物理像素为 900 x 1167。

可以看到，在高 DPR 设备下提供只有 CSS 像素大小的图片，是非常模糊的。

因此，**为了在不同的 DPR 屏幕下，让图片看起来都不失真**，我们需要为不同 DPR 的图片，提供不同大小的图片。

那么，有哪些可行的解决方案呢？

#### 方案一：无脑多倍图

假设，在移动端假设我们需要一张 CSS 像素为 300 x 200 的图像，考虑到现在已经有了 dpr = 3 的设备，那么要保证图片在 dpr = 3 的设备下也正常高清展示，我们最大可能需要一张 900 x 600 的原图。

这样，不管设备的 dpr 是否为 3，我们统一都使用 3 倍图。这样即使在 dpr = 1，dpr = 2 的设备上，也能非常好的展示图片。

当然这样并不可取，会造成大量带宽的浪费。

现代浏览器，提供了更好的方式，让我们能够根据设备 dpr 的不同，提供不同尺寸的图片。

#### 方案二：媒体查询

方案二，我们可以考虑使用媒体查询。到今天，我们可以通过相应的媒体查询，得知当前的设备的 DPR 值，这样，我们就可以在对应的媒体查询中，使用对应的图片。

像是这样：

```css
#id { 
    background: url(xxx@2x.png) 
}
@media (device-pixel-ratio: 2) {
    #id { 
        background: url(xxx@2x.png) 
    }
}
@media (device-pixel-ratio: 3) {
    #id { 
        background: url(xxx@3x.png) 
    }
}
```

这个方案的缺点在于：

1. 要写的代码可能太多了，而且，可能存在一些介于 1~2，2~3 之间的 DPR 值，不好穷举出所有场景
2. 需要注意语法需要的兼容性，需要添加前缀，譬如 -webkit-min-device-pixel-ratio，当然这个可以由 autoprefixer 辅助解决

#### 方案三：CSS 配合 image-set 语法

image-set 属于 CSS background 中的一种语法，image-set() 函数为设备提供最合适的图像分辨率，它提供一组图像选项，每个选项都有一个相关的 DPR 声明，浏览器将从中选择最适合设备的图像进行设置。

什么意思呢，来看看代码：

```css
.img {
    /* 不支持 image-set 的浏览器*/
    background-image: url('../photo@2x.png');

    /* 支持 image-set 的浏览器*/
    background-image: image-set(
        url('./photo@2x.png') 2x,
        url('./photo@3x.png') 3x
    );
}
```

这样一看，作用应该很清晰了。对于支持 image-set 语法的浏览器：

1. 如果其设备对应的 DPR 为 2，会选取这条 url('./photo@2x.png') 2x 记录，也就是最终生效的 URL 是 './photo@2x.png'；
2. 如果其设备对应的 DPR 为 3，会选取这条 url('./photo@3x.png') 3x 记录，也就是最终生效的 URL 是 './photo@3x.png'；

其中的 2x，3x 就是用于匹配 DRP的。

使用 image-set 的一些痛点与媒体查询方案类似。代码量与兼容性语法，而且难以匹配所有情况。

#### 方案四：srcset 配合 1x 2x 像素密度描述符

简单来说，srcset 可以根据不同的 dpr 拉取对应尺寸的图片：

```html
<div class='illustration'>
   <img src='illustration-small.png'
       srcset='images/illustration-small.png 1x,
               images/illustration-big.png 2x'
   >
</div>
```

上面 srcset 里的 1x，2x 表示 **像素密度描述符**，表示

- 当屏幕的 dpr = 1 时，使用 images/illustration-small.png 这张图
- 当屏幕的 dpr = 2 时，使用 images/illustration-big.png 这张图
- 如果不支持 srcset 语法，src='illustration-small.png' 将会是最终的兜底方案

#### 方案五：srcset 属性配合 sizes 属性 w 宽度描述符

上面 1x，2x 的写法比较容易接受易于理解。

但是，上述 3 种方案都存在统一的问题，**只考虑了 DPR，但是忽略了响应性布局的复杂性与屏幕的多样性**。

因此，规范还推出了一种方案 -- **srcset 属性配合 sizes 属性 w 宽度描述符**。

srcset 属性还有一个 w 宽度描述符，配合 sizes 属性一起使用，可以覆盖更多的面。

sizes 属性怎么理解呢？它定义图像元素在不同的视口宽度时，可能的大小值。

以下面这段代码为例子：

```html
<img 
        sizes = “(min-width: 600px) 600px, 300px" 
        src = "photo.png" 
        srcset = “photo@1x.png 300w,
                       photo@2x.png 600w,
                       photo@3x.png 1200w,
>
```

解析一下：

sizes = “(min-width: 600px) 600px, 300px" 的意思是：

1. 如果屏幕当前的 CSS 像素宽度大于或者等于 600px，则图片的 CSS 宽度为 600px
2. 反之，则图片的 CSS 宽度为 300px

也就是 sizes 属性声明了在不同宽度下图片的 CSS 宽度表现。这里可以理解为，大屏幕下图片宽度为 600px，小屏幕下图片宽度为 300px。

需要注意的是，这里大屏、小屏下图片具体的宽度表现，还是需要借助媒体查询代码，经由 CSS 实现的

srcset = “photo@1x.png 300w, photo@2x.png 600w, photo@3x.png 1200w 里面的 300w，600w，900w 叫宽度描述符。

那么，怎么确定当前场景会选取哪张图片呢？

##### **当前屏幕 dpr = 2 ，CSS 宽度为 375px**。

当前屏幕 CSS 宽度为 375px，则图片 CSS 宽度为 300px。分别用上述 3 个宽度描述符的数值除以 300。

1. 300 / 300 = 1
2. 600 / 300 = 2
3. 1200 / 300 = 4

上面计算得到的 1、 2、 4 即是算出的有效的像素密度，换算成和 x 描述符等价的值 。这里 600w 算出的 2 即满足 dpr = 2 的情况，选择此张图。

##### **当前屏幕 dpr = 3 ，CSS 宽度为 414px**。

当前屏幕 CSS 宽度为 414px，则图片 CSS 宽度仍为 300px。再计算一次：

1. 300 / 300 = 1
2. 600 / 300 = 2
3. 1200 / 300 = 4

因为 dpr = 3，2 已经不满足了，则此时会选择 1200w 这张图。

##### **当前屏幕 dpr = 1 ，CSS 宽度为 1920px**。

当前屏幕 CSS 宽度为 1920px，则图片 CSS 宽度变为了 600px。再计算一次：

1. 300 / 600 = .5
2. 600 / 600 = 1
3. 1200 / 600 = 2

因为 dpr = 1，所以此时会选择 600w 对应的图片。

具体的可以试下这个 Demo：**CodePen Demo -- srcset属性配合w宽度描述符配合sizes属性**

此方案的意义在于考虑到了响应性布局的复杂性与屏幕的多样性，利用上述规则，可以一次适配 PC 端大屏幕和移动端高清屏，一箭多雕。

嗯，总结一下，在实现响应式图像时，我们同时使用 srcset 和 sizes 属性。它们的作用是：

- srcset：定义多个不同宽度的图像源，让浏览器在 HTML 解析期间选择最合适的图像源
- sizes：定义图像元素在不同的视口宽度时，可能的大小值

有了这些属性后，浏览器就会根据 srcset/size 来创建一个分辨率切换器的响应式图片，可以在不同的分辨率的情况下，提供相同尺寸的图像，或者在不同的视图大小的情况下，提供不同尺寸大小的图像。

### 本章总结

本章节一共列举了 5 种实现响应式图片，适配不同屏幕大小，不同 DPR 的方式，它们分别是：

1. 无脑多倍图的方式
2. DRP 媒体查询
3. CSS Background 中的使用 image-set
4. srcset 配合 1x 2x 像素密度描述符
5. srcset 属性配合 sizes 属性 w 宽度描述符

合理使用它们，可以有效的为不同屏幕，提供最为恰当的图片资源，在保证用户体验的同时，尽可能节省带宽。

它们各有优缺点，可以根据自己实际的业务场景，选取合适相对成本最低的方案，并且适当的配合 Autoprefixer 以及一些 PostCSS 等工具，简化代码量。

## 图片的宽高比、裁剪与缩放

OK，下面进入到我们的第三个模块，图片的宽高比、裁剪与缩放。我们会介绍 4 个新的特性：

- aspect-ratio
- object-fit
- object-position
- image-rendering

### 使用 aspect-ratio 避免布局偏移

很多时候，只能使用固定尺寸大小的图片，我们的布局可能是这样：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle14.png)

对应的布局：

```html
<ul class="g-container">
    <li>
        <img src="http://placehold.it/150x100">
        <p>图片描述</p>
    </li>
</ul>
ul li img {
    width: 150px;
}
```

当然，万一假设后端接口出现一张非正常大小的图片，上述不加保护的布局就会出问题：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle15.png)

所以对于图片，我们总是建议同时写上高和宽，避免因为图片尺寸错误带来的布局问题：

```css
ul li img {
    width: 150px;
    height: 100px;
}
```

同时，给 `img` 标签同时写上高宽，可以在图片未加载之前提前占住位置，避免图片从未加载状态到渲染完成状态高宽变化引起的重排问题。

当然，到今天，我们还可以使用 aspect-ratio 设定图片的高宽比。

aspect-ratio CSS 属性为容器规定了一个期待的宽高比，这个宽高比可以用来计算自动尺寸以及为其他布局函数服务。

像是上面的代码，我们就可以替换成：

```css
ul li img {
    width: 150px;
    aspect-ratio: 3 / 2;
}
```

当然，有的时候，我们的布局是响应式动态在变化的，容器的宽度也是不确定的，因此，有了 aspect-ratio 之后，我们的写法就可以更佳的舒服。

```css
ul li img {
    width: 100%;
    aspect-ratio: 3 / 2;
}
```

这里，容器基于 Flex 弹性布局或者响应式布局，其宽度是不固定的，但是图片的宽高比是固定的，使用 aspect-ratio: 3 / 2 就能非常好的适配这种情况。

我们借助了 aspect-ratio 这个 CSS 中较新的属性来始终自动获得正确的宽高比，无论其父元素的宽度如何变化。

> 当然，aspect-ratio 不仅仅只是能运用在这里，在 aspect-ratio 出现之前，我们只能通过一些其它的 Hack 方式，譬如设置 padding-top 等方式模拟固定的宽高比。在 aspect-ratio 之后，我们终于有了设定容器固定宽高比的能力。

### object-fit 避免图片拉伸

当然，限制高宽也会出现问题，譬如图片被拉伸了，非常的难看：

![imgfjdkfj](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle16.png)

这个时候，我们可以借助 object-fit，它能够指定可替换元素的内容（也就是图片）该如何适应它的父容器的高宽。

```css
ul li img {
    width: 150px;
    aspect-ratio: 3 / 2;
    object-fit: cover;
}
```

利用 object-fit: cover，使图片内容在保持其宽高比的同时填充元素的整个内容框。

![image123](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle17.png)

object-fit 的取值有 fill、none、contain、cover，与 background-size 类似，可以类比记忆。

也可以看看这张图，很易于理解：

![image123](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle18.png)

object-fit 还有一个配套属性 object-position，它可以控制图片在其内容框中的位置。（类似于 background-position），默认是 object-position: 50% 50%，如果你不希望图片居中展示，可以使用它去改变图片实际展示的 position。

```css
ul li img {
    width: 150px;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: 50% 100%;
}
```

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle19.png)

像是这样，object-position: 100% 50% 指明从底部开始展示图片。这里有一个很好的 Demo 可以帮助你理解 object-position。

**CodePen Demo -- Object position**

### 使用 image-rendering 设置图片缩放算法

相对于上面几个新特性，image-rendering 会更为冷门。

很多时候，我们设置一个图片在页面上的展示大小为 200px x 200px，但是图片的原始尺寸可能是 800px x 800px，也可能是 50px x 50px。

这个时候，我们就可以利用 image-rendering，设置图片在缩放状态下的展示算法。

image-rendering 在特定的场景下，能够起到奇效。

来看这样一个有意思的 DEMO，假设我们有这样一个原图效果，它是一个二维码，大小为 100px x 100px：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle20.png)

如果我们将它放大，放到很大，明显，这个二维码会失真，像是这样：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle21.png)

OK，在这种放大失真的情况想，可以使用 image-rendering 改变图片缩放算法，这里我们试一下 image-rendering: pixelated：

```css
.img {
  image-rendering: pixelated;
}
```

效果变化，如下图所示：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle22.png)

可以看到，image-rendering: pixelated 处理过的图像，竟然变得如此清晰！



来看看 image-rendering 的几个取值：

- image-rendering: auto：自 Gecko 1.9（Firefox 3.0）起，Gecko 使用双线性（bilinear）算法进行重新采样（高质量）。
- image-rendering: smooth：使用能最大化图像客观观感的算法来缩放图像
- image-rendering: high-quality：与 smooth 相同，但更倾向于高质量的缩放。
- image-rendering: crisp-edges：必须使用可有效保留对比度和图像中的边缘的算法来对图像进行缩放，并且，该算法既不会平滑颜色，又不会在处理过程中为图像引入模糊。合适的算法包括最近邻居（nearest-neighbor）算法和其他非平滑缩放算法，比如 2×SaI 和 hqx-* 系列算法。此属性值适用于像素艺术作品，例如一些网页游戏中的图像。
- image-rendering: pixelated：放大图像时，使用最近邻居算法，因此，图像看着像是由大块像素组成的。缩小图像时，算法与 auto 相同。

虽然规范定义了挺多值，但是实际上，现代浏览器基本暂时只支持：auto、pixelated、以及 -webkit-optimize-contrast（Chrome 下的 smooth）。

看描述都会挺懵逼的，实际使用的时候，最好每个都试一下验证一下效果。总结而言，image-rendering 的作用是**在图像缩放时，提供不一样的渲染方式，让图片的展示形态更为多样化，或者说是尽可能的去减少图片的失真带来的信息损耗**。

我们再看一个 DEMO，原图如下（例子来源于 W3C 规范文档）：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle23.png)

实际效果：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle24.png)

当然，看上去 pixelated 的效果挺好，这是由于这是一张偏向于矢量的图片，细节不多，对于高精度的人物图，就不太适用于 pixelated，容易把图片马赛克化。

真正规范希望的在放大后让图片尽可能不失真的 crisp-edges 效果，目前暂时没有得到浏览器的实现。后面可以期待一下。

### 本章总结

这一章，我们介绍了 4 个较新的 CSS 特性：

- aspect-ratio：控制容器的宽高比，避免产生布局偏移及抖动
- object-fit：设定内容应该如何适应到其使用高度和宽度确定的框，避免图片拉伸
- object-position：基于 object-fit，设置图片实际展示的 position 范围
- image-rendering：控制图片在缩放状态下的展示算法

合理利用它们，可以给用户在图片上以更好的体验。

## 懒加载/异步图像解码方案

继续第四章。本章节，我们来讨论下图片的懒加载与异步图像解码方案。

### 图片的懒加载

**懒加载是一种网页性能优化的常见方式**，它能极大的提升用户体验。到今天，现在一张图片超过几 M 已经是常见事了。如果每次进入页面都需要请求页面上的所有的图片资源，会较大的影响用户体验，对用户的带宽也是一种极大的损耗。

所以，图片懒加载的意义即是，当页面未滚动到相应区域，该区域内的图片资源（网络请求）不会被加载。反之，当页面滚动到相应区域，相关图片资源的请求才会被发起。

在过去，我们通常都是使用 JavaScript 方案进行图片的懒加载。而今天，我们在图片的懒加载实现上，有了更多不一样的选择。

### JavaScript 方案实现图片的懒加载

首先，回顾一下过往最常见的，使用 JavaScript 方案实现图片的懒加载。

通过 JavaScript 实现的懒加载，主要是两种方式：

1. 监听 onscroll 事件，通过 getBoundingClientRect API 获取元素图片距离视口顶部的距离，配合当前可视区域的位置实现图片的懒加载
2. 通过 HTML5 的 IntersectionObserver API，**Intersection Observer（交叉观察器）**配合监听元素的 isIntersecting 属性，判断元素是否在可视区内，能够实现比监听 onscroll 性能更佳的图片懒加载方案

但是，JavaScript 方案的一个劣势在于，不管如何，需要引入一定量的 JavaScript 代码，进行一定量的运算。

到今天，其实我们有更多的其他便捷的方式去实现图片的懒加载。

### 使用 content-visibility: auto 实现图片内容的延迟渲染

首先，介绍一个非常有用，但是相对较为冷门的属性 -- content-visibility。

content-visibility：属性控制一个元素是否渲染其内容，它允许用户代理（浏览器）潜在地省略大量布局和渲染工作，直到需要它为止。

利用 content-visibility 的特性，我们可以实现**如果该元素当前不在屏幕上，则不会渲染其后代元素**。

假设我们有这样一个 DEMO：

```html
<div class="g-wrap">
    // 模块 1
    <div class="paragraph">
        <p>Lorem Start!</p>   
        <img src="https://s1.ax1x.com/2023/02/20/pSX1xMV.png" alt="" />
        <p>Lorem End!</p>  
    </div>
    // 模块 2
    <div class="paragraph">
        <p>Lorem Start!</p>   
        <img src="https://s1.ax1x.com/2023/02/20/pSX1xMV.png" alt="" />
        <p>Lorem End!</p>  
    </div>
    // ... 连续几十个上述类似的结构
</div>
```

只需要给需要延迟（实时）渲染的元素，设置简单的 CSS 样式：

```css
.paragraph {
    content-visibility: auto;
}
```

我们来看一下，设置了 content-visibility: auto 与没设置的区别。

如果，不添加上述的 content-visibility: auto 代码，页面的滚动条及滚动效果如下：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle25.gif)

那么，在添加了 content-visibility: auto 之后，注意观察页面的滚动条及滚动效果：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle26.gif)

可以看到滚动条在向下滚动在**不断的抽搐**，这是由于下面不在可视区域内的内容，一开始是没有被渲染的，在每次滚动的过程中，才逐渐渲染，以此来提升性能。



### content-visibility: auto VS 图片懒加载

当然，其实使用 content-visibility: auto 并不能真正意义上实现图片的懒加载。

这是因为，即便当前页面可视区域外的内容未被渲染，但是图片资源的 HTTP/HTTPS 请求，依然会在页面一开始被触发！

因此，这也得到了一个非常重要的结论：

content-visibility: auto **无法直接替代图片懒加载，设置了** **content-visibility: auto** **的元素在可视区外只是未被渲染，但是其中的静态资源仍旧会在页面初始化的时候被全部加载**。因此，它更像是一个虚拟列表的替代方案。

关于 content-visibility 本文限于篇幅，没有完全展开，但是它是一个非常有意思且对渲染性能有帮助的属性。

### 使用 loading=lazy HTML 属性实现图片懒加载

OK，content-visibility 很不错，但是略有瑕疵。但是，我们还有其他方式。

HTML5 新增了一个 loading 属性。

到今天，除了 IE 系列浏览器，目前都支持通过 loading 属性实现延迟加载。此属性可以添加到 `img` 元素中，也可以添加到 `iframe` 元素中。

属性的值为 loading=lazy 会告诉浏览器，如果图像位于可视区时，则立即加载图像，并在用户滚动到它们附近时获取其他图像。

我们可以像是这样使用它：

```html
<img src="xxx.png" loading="lazy">
```

**这样，便可以非常便捷的实现图片的懒加载，省去了添加繁琐的 JavaScript 代码的过程**。

看看 loading=lazy 到今天（2023-02-26）的兼容性，还是非常不错的：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle27.png)

### 使用 decoding=async 实现图片的异步解码

除了 loading=lazy，HTML5 还新增了一个非常有意思的属性增强图片的用户体验。那就是 decoding 属性。

**HTMLImageElement**接口的 decoding 属性用于告诉浏览器使用何种方式解析图像数据。

它的可选取值如下：

- sync: 同步解码图像，保证与其他内容一起显示。
- async: 异步解码图像，加快显示其他内容。
- auto: 默认模式，表示不偏好解码模式。由浏览器决定哪种方式更适合用户。

上文其实也提及了，浏览器在进行图片渲染展示的过程中，是需要对图片文件进行解码的，这一个过程快慢与图片格式有关。

而如果我们不希望图片的渲染解码影响页面的其他内容的展示，可以使用 decoding=async 选项，像是这样：

```html
<img src="xxx.png" decoding="async">
```

这样，浏览器便会异步解码图像，加快显示其他内容。这是图片优化方案中可选的一环。

同样的，我们来看看到今天（2023-02-26），decoding="async" 的兼容性，整体还是非常不错的，作为渐进增强方案使用，是非常好的选择。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle28.png)

#### 实际检验 loading=lazy 与 decoding=async 效果

OK，下面我们制作一个简单的 DEMO，试一下 loading=lazy 与 decoding=async 的效果。

我们准备一个拥有 339 个图片的 HTML 页面，每个图片文件的 src 大小不一。

```html
<div class="g-container">
    <img src="image1.jpeg">
    <img src="image2.jpeg">
    // ... 339 个
</div>
```

CSS 的设置也很重要，由于是纯图片页面，如果不给图片设置默认高宽，最页面刷新的一瞬间，`img` 元素的高宽都是 0，会导致所有 `img` 元素都在可视区内，所以，我们需要给 `img` 设置一个默认的高宽：

```css
img {
    margin: 8px;
    width: 300px;
    height: 200px;
    object-fit: cover;
}
```

这样，再不添加 loading=lazy 与 decoding=async 的状态下，看看 Network 的表现：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle29.png)

我这里没有模拟弱网环境，网速非常快，可以看到，发送了 339 个图片资源请求，也就是全部的图片资源在页面加载的过程中都请求了，页面 Load 事件完成的时间为 1.28s。

好，我们给所有的图片元素，添加上 loading=lazy 与 decoding=async：

```html
<div class="g-container">
    <img src="image1.jpeg" loading="lazy" decoding="async">
    <img src="image2.jpeg" loading="lazy" decoding="async">
    // ... 339 个
</div>
```

看看效果：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle30.png)

可以看到，这一次只发送了 17 个图片资源请求，页面 Load 事件完成的时间为 26ms。

| 优化前 | 优化后 |
| ------ | ------ |
| 1.28s  | 26 ms  |

**1.28s 到 26ms，效果是非常明显的，如果是弱网环境，对首屏加载性能的提升，会更为明显**！

当然，实际我测试的过程也，也单独试过 decoding="async" 的作用，只是由于是纯图片页面，效果不那么明显。感兴趣的同学，可以自行尝试。

### 本章总结

在本章节中，我们介绍了不同的方式实现图片的懒加载、延迟渲染、异步解码，它们分别是：

1. 通过 onscroll 事件与 getBoundingClientRect API 实现图片的懒加载方案
2. 通过 Intersection Observer（交叉观察器）实现比监听 onscroll 性能更佳的图片懒加载方案
3. 通过 content-visibility: auto 实现图片资源的延迟渲染
4. 通过 loading=lazy HTML 属性实现图片懒加载
5. 通过 decoding=async HTML 属性实现图片的异步解码

## 图片资源的容错及可访问性处理

OK，最后一个章节，我们简单聊一聊图片资源的容错及可访问性处理。

### 图片的可访问性处理

可访问性（A11Y），在我们的网站中，属于非常重要的一环，但是大部分同学都容易忽视它。

在一些重交互、重逻辑的网站中，我们需要考虑用户的使用习惯、使用场景，从高可访问性的角度考虑，譬如假设用户没有鼠标，仅仅使用键盘，能否顺畅的使用我们的网站？

非常重要的一点是，**提高可访问性也能让普通用户更容易理解 Web 内容**。

基于 **Usability & Web Accessibility - image**

对于图像信息，我们需要大致遵循如下可访问性原则：

- 所有有意义的 img 元素必须有 alt 属性
- 提供替代 alt 属性的其他方式
- 使用辅助技术隐藏装饰图像

第一点非常好理解，所有的有意义的图片元素都必须要提供 alt 属性。

第二点比较有意思，在 A11Y 中，其实有一套 **WAI-ARIA 标准**。WAI-ARIA 是一个为残疾人士等提供无障碍访问动态、可交互Web内容的技术规范。

简单来说，它提供了一些属性，增强标签的语义及行为：

- 可以使用 tabindex 属性控制元素是否可以聚焦，以及它是否/在何处参与顺序键盘导航
- 可以使用 role 属性，来标识元素的语义及作用，譬如使用 `<div id="saveChanges" tabindex="0" role="button">Save</div>`来模拟一个按钮
- 还有大量的 aria-* 属性，表示元素的属性或状态，帮助我们进一步地识别以及实现元素的语义化，优化无障碍体验

上述第二点，**提供替代 alt 属性的其他方式** 的含义就是使用 WAR-ARIA 规范提供的诸如 aria-label 和 aria-labelledby 属性为图像提供可访问的名称。

当存在这些属性时，辅助技术（屏幕阅读器）将忽略图像的 alt 属性并读取 ARIA 标签。

而第三点，**使用辅助技术隐藏装饰图像**，又是什么意思呢？

上面第一点 **所有有意义的 img 元素必须有 alt 属性**，反过来说，页面上也会存在无意义的装饰性的图片，这些图片内容对辅助技术（屏幕阅读器）而言，其实是可以忽略的。

对于没有任何功能或信息内容的装饰图像，可以通过多种方式对屏幕阅读器隐藏：

- 使用空的 alt 属性
- 使用 ARIA 属性 role="presentation" 标明图片元素是装饰可忽略图片
- 使用 CSS background 的方式呈现这些图片

### alt 不要与 title 混淆

OK，下面来讲一些有意思的细节内容。

有一个非常基础的知识，简单过一下，也就是图片元素中，alt 与 title 的差异：

- 图片中的 alt 属性是在图片不能正常显示时出现的文本提示。
- 图片中的 title 属性是在鼠标在移动到元素上的文本提示。

### 正确使用 alt 属性

对于使用屏幕阅读器的用户而言，图片是无法正常展示或者被的浏览的，基于此，我们需要利用好 alt 属性，或者是上述的aria-label 和 aria-labelledby 属性。

那么，这些属性内的内容应该填充什么呢？我们需要基于图片的功能加以区分：

- **信息性图像**：以图形方式表示概念和信息的图像，通常是图片、照片和插图。alt 替代文本应该至少是一个简短的描述，传达图像所呈现的基本信息。
- **装饰性图像**：当图像的唯一目的是为页面添加视觉装饰，而不是传达对理解页面很重要的信息时，如上述所言，使用空的 alt，譬如 alt=""
- **功能图像**：用作**链接或按钮**的图像的替代文本应该描述链接或按钮的功能，而不是视觉图像。此类图像的示例是表示打印功能的打印机图标或提交表单的按钮。
- **文本图像**：可读文本有时会出现在图像中。如果图片不是徽标，请避免图片中出现文字。但是，如果使用文本图像，替代文本应包含与图像中相同的词。
- 图形和图表等**复杂图像：为了传达数据或详细信息，提供与图像中提供的数据或信息等效的完整文本作为替代文本。**
- **图像组**：如果多张图像传达一条信息，则一张图像的替代文本应传达整组信息。
- **图像映射**：包含多个可点击区域的图像的替代文本应该为链接集提供整体上下文。此外，每个可单独点击的区域都应该有替代文本来描述链接的目的或目的地。

其实 alt 的学问是非常之多的，如果我们的页面能做到这一点，那真的算是从根上开始思考，开始优化用户体验。

### img 元素与 background 元素的取舍

OK，那么，讲到这里，还有一个有意思的点就很自然的应该被提及。

那就是我们应该什么时候使用 `img` 元素，什么时候使用 background 内嵌图片？

我们可以从**性能**及**功能**两个方面进行考虑：

| 类型               | img                                        | backgroud-image          |
| ------------------ | ------------------------------------------ | ------------------------ |
| 图层位置           | 前景                                       | 背景                     |
| 默认初始尺寸       | 不定                                       | 固定                     |
| 是否会产生回流重绘 | 会                                         | 不会                     |
| 图片加载失败       | 可以触发元素的 onerror 事件，展示 alt 属性 | 无法有效设置异常处理场景 |
| 使用场景           | Logo、产品图片、广告图片                   | 装饰性无语义内容等       |

其实性能上并不是核心考虑的点，因为上文我们也讲到了在今天可以大规模使用是 loading="lazy" 属性，图片可以进行原生支持的懒加载。

我们在考虑选取 `img` 还是 backgroud-image 的时候，更多的还是从图片功能上进行考虑。一般来说，作为修饰的且无语义的装饰性图片选择使用 background-image，而比较重要的与网页内容相关的就使用 `img` 标签。

由于有语义的图片使用 `img` 展示，它的一个好处在于，当图片加载失败的时候，可以触发元素的 onerror 事件，我们可以有效的利用这一点，对图片进行异常处理。

### 图片的异常处理

当图片链接挂了，加载失败了，我们比较好的处理方式应该是怎么样呢？

处理的方式有很多种。在张鑫旭老师的这篇文章中 -- [**图片加载失败后CSS样式处理最佳实践**](https://www.zhangxinxu.com/wordpress/2020/10/css-style-image-load-fail/)有一个不错的实践。

核心思路为：

1. 利用图片加载失败，触发 `img` 元素的 onerror 事件，给加载失败的 `img` 元素新增一个样式类
2. 利用新增的样式类，配合 `img` 元素的伪元素，在展示默认兜底图的同时，还能一起展示 `img` 元素的 alt 信息

```html
<img src="test.png" alt="Alt Info" onerror="this.classList.add('error');">
img.error {
    position: relative;
    display: inline-block;
}

img.error::before {
    content: "";
    /** 定位代码 **/
    background: url(error-default.png);
}

img.error::after {
    content: attr(alt);
    /** 定位代码 **/
}
```

我们利用伪元素 before ，加载默认错误兜底图，利用伪元素 after，展示图片的 alt 信息：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle31.png)

OK，到此，完整的对图片的处理就算完成了，这也比较好的阐述了为什么，对有语义，有 alt 信息的图片，我们应该使用 `img` 元素来实现。这是因为，我们可以在错误发生的时候，比较好的对图片进行兜底展示，让用户直观的能够看到 alt 内容。



当然，上述方案存在两个小问题：

1. 对于每一个 `img` 元素，我们都需要写一段 onerror="this.classList.add('error');" 代码，有点重复。因此，这个工作也可以交给 JavaScript 全局性的完成，并且，我们可能需要判断 alt 的值是否为空，在为空时，使用默认图片 alt 兜底文案。
2. 早年间，`img` 等替换元素是没有伪元素的，后面 Chrome/Firefox 浏览器逐渐支持了当，`img` 的 src 拉取失败时，支持 `img` 元素的伪元素展示，这才有了上述的方案，但是，目前 Safari 仍不支持这个特性，所以，在 Safari 下，我们可能得到如下的结果：

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/img-handle32.png)

效果仍然还是 OK 的，只是没有了兜底图的展示，在实际使用过程中，需要知道这一点。

### 最后总结

本章节，对**图片资源的容错及可访问性处理**进行了阐述。核心内容在于：

1. 对于图像信息，我们需要大致遵循如下可访问性原则：

- - 所有有意义的 img 元素必须有 alt 属性
  - 提供替代 alt 属性的其他方式
  - 使用辅助技术隐藏装饰图像

1. 正确使用 alt 属性，了解不同场景下 alt 应该填充什么内容
2. img 元素与 background 元素的取舍
3. 图片异常处理的最佳实践

至此，整个**现代图片性能优化及体验优化指南**到此就圆满结束，整个系列的文章囊括了非常多的新的规范及特性，需要大家在实践中根据实际情况灵活选取使用。

同时，我们也应该能看到，前端技术仅仅在这一小个领域，都在不断的迭代创新。虽然很难，还是需要不断充实自己跟上新的潮流。共勉。

<git-talk />