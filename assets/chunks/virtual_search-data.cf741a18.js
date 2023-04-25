`,l:"blogs/2021-12-31-html-icon.md",a:"markdown-icon"},"0.1":{t:"People",p:`


:bowtie: :bowtie:
:smile: :smile:
:laughing: :laughing:



 ...`,l:"blogs/2021-12-31-html-icon.md#people",a:"people"},"0.2":{t:"Nature",p:`


:sunny: :sunny:
:umbrella: :umbrella:
:cloud: :cloud:




: ...`,l:"blogs/2021-12-31-html-icon.md#nature",a:"nature"},"0.3":{t:"Objects",p:`


:bamboo: :bamboo:
:gift_heart: :gift_heart:
:dolls: :dolls: ...`,l:"blogs/2021-12-31-html-icon.md#objects",a:"objects"},"0.4":{t:"Places",p:`


:house: :house:
:house_with_garden: :house_with_garden:
:sc ...`,l:"blogs/2021-12-31-html-icon.md#places",a:"places"},"0.5":{t:"Symbols",p:`


:one: :one:
:two: :two:
:three: :three:




:four: :four:
: ...`,l:"blogs/2021-12-31-html-icon.md#symbols",a:"symbols"},"1.0":{t:"# Git常用命令",p:"平常在windows电脑上使用Git Extensions 工具比较多，大部分的常用指令都可以通过点点点就可以完成。在mac ...",l:"blogs/2022-05-07-git.html",a:"git常用命令"},"1.1":{t:"1、基本命令",p:`
1.1、 生成SSH公钥和私钥，公钥要复制配置到git服务器上,可通过Git Bash Here打开终端命令，前提需要安装 ...`,l:"blogs/2022-05-07-git.html#_1、基本命令",a:"_1、基本命令"},"1.2":{t:"2、分支管理",p:`
2.1、 创建分支// 切换到基础分支
git checkout main

// 根据 切换到的main分支，创建dev ...`,l:"blogs/2022-05-07-git.html#_2、分支管理",a:"_2、分支管理"},"1.3":{t:"3、合并代码",p:`
3.1、 将某个提交，任何跟仓库所有分支的commit 合并到当前分支// (正常情况直接合并成功，可能存在重复图需要手动 ...`,l:"blogs/2022-05-07-git.html#_3、合并代码",a:"_3、合并代码"},"1.4":{t:"4、tag标签(根据tag标签创建的分支不要与标签名一致)",p:`
4.1、添加一个tag，并推送到远程仓库git tag -a 3.11.3.001 -m &quot;release 3. ...`,l:"blogs/2022-05-07-git.html#_4、tag标签-根据tag标签创建的分支不要与标签名一致",a:"_4、tag标签-根据tag标签创建的分支不要与标签名一致"},"1.5":{t:"5、小技巧    ",p:`

5.1、vscode中配置git bash 作为命令行

https://zhuanlan.zhihu.com/p/36 ...`,l:"blogs/2022-05-07-git.html#_5、小技巧",a:"_5、小技巧"},"1.6":{t:"6、合并代码",p:`

6.1、将远程分支代码合并到本地
    // 先拉去远程分支代码，确保dev代码师最新的
    git checko ...`,l:"blogs/2022-05-07-git.html#_6、合并代码",a:"_6、合并代码"},"1.7":{t:" ",p:"",l:"blogs/2022-05-07-git.html#",a:""},"1.8":{t:"7、commit message 规范",p:`+ feat: 新特性
+ fix: 修改问题
+ refactor: 代码重构
+ docs: 文档修改
+ css: 布 ...`,l:"blogs/2022-05-07-git.html#_7、commit-message-规范",a:"_7、commit-message-规范"},"2.0":{t:"# 前端开发规范",p:"",l:"blogs/2022-05-15-guifan.html",a:"前端开发规范"},"2.1":{t:"1、驼峰式命名法介绍",p:`
Pascal Case 大驼峰式命名法：首字母大写。eg：RequestScanQrcode、UserInfo、GetQu ...`,l:"blogs/2022-05-15-guifan.html#_1、驼峰式命名法介绍",a:"_1、驼峰式命名法介绍"},"2.2":{t:"2、命名规范",p:`

项目命名
全部采用小写方式,项目包含多个单词时，单词之间建议使用半角的连词线 ( - ) 进行分隔。 例：dvs-sun ...`,l:"blogs/2022-05-15-guifan.html#_2、命名规范",a:"_2、命名规范"},"2.3":{t:"3、CSS、SCSS 规范",p:`

缩进（个人用的 tab，也可以直接使用空格）
使用 tab 缩进（2 个空格）
    .right-chart {
  ...`,l:"blogs/2022-05-15-guifan.html#_3、css、scss-规范",a:"_3、css、scss-规范"},"2.4":{t:"4、JavaScript 规范",p:`

缩进
使用 Tab 缩进（两个空格）


分号
每个声明结束都要加分号


命名

标准变量采用小驼峰式命名
常量全大写 ...`,l:"blogs/2022-05-15-guifan.html#_4、javascript-规范",a:"_4、javascript-规范"},"2.5":{t:"5、git 提交的用户名和邮箱设置",p:"```javascript\n    git config --global user.name &quot;xxx&quot ...",l:"blogs/2022-05-15-guifan.html#_5、git-提交的用户名和邮箱设置",a:"_5、git-提交的用户名和邮箱设置"},"2.6":{t:"6、vetur 开启；eslint、prettier 设置",p:"",l:"blogs/2022-05-15-guifan.html#_6、vetur-开启-eslint、prettier-设置",a:"_6、vetur-开启-eslint、prettier-设置"},"3.0":{t:"# Typescript定义",p:`列举一些日常开发中常用的ts定义写法
`,l:"blogs/2022-05-20-typescript.html",a:"typescript定义"},"3.1":{t:"1、 reactive 定义 ts 数组",p:`    export interface TableModel {
        id?: number
         ...`,l:"blogs/2022-05-20-typescript.html#_1、-reactive-定义-ts-数组",a:"_1、-reactive-定义-ts-数组"},"3.2":{t:"2、 reactive 定义 ts 数组",p:`    export interface TableModel {
        id?: number
         ...`,l:"blogs/2022-05-20-typescript.html#_2、-reactive-定义-ts-数组",a:"_2、-reactive-定义-ts-数组"},"3.3":{t:"3、枚举的使用",p:`    export enum ToolbarTypeEnum {
        ZOOM_IN = 'zoomIn',
 ...`,l:"blogs/2022-05-20-typescript.html#_3、枚举的使用",a:"_3、枚举的使用"},"3.4":{t:"4、继承的使用",p:`
    export declare type Point = {
        x: number;
         ...`,l:"blogs/2022-05-20-typescript.html#_4、继承的使用",a:"_4、继承的使用"},"3.5":{t:"5、创建一个 key,value 对象",p:`    type keys = 'A' | 'B' | 'C'
    const result: Record&lt;ke ...`,l:"blogs/2022-05-20-typescript.html#_5、创建一个-key-value-对象",a:"_5、创建一个-key-value-对象"},"3.6":{t:"6、升级玩法",p:`    interface PageInfo {
        title: string;
    }

    typ ...`,l:"blogs/2022-05-20-typescript.html#_6、升级玩法",a:"_6、升级玩法"},"3.7":{t:"7、typescript中的枚举操作",p:`  //1、声明一个枚举类型   最好定义在ts文件中，不要定义在.d.ts文件中，import引入的时候有问题
  exp ...`,l:"blogs/2022-05-20-typescript.html#_7、typescript中的枚举操作",a:"_7、typescript中的枚举操作"},"3.8":{t:" ",p:"",l:"blogs/2022-05-20-typescript.html#",a:""},"3.9":{t:"8、泛型函数和 箭头泛型函数",p:`  function getUser&lt;T&gt;(id: string) {
    console.log(id,  ...`,l:"blogs/2022-05-20-typescript.html#_8、泛型函数和-箭头泛型函数",a:"_8、泛型函数和-箭头泛型函数"},"3.10":{t:"9、通过type和interface 限制某个字符串变量的具体字符串",p:`  
  type EventType = '工资' | '放假'
  let eventType: EventType = ...`,l:"blogs/2022-05-20-typescript.html#_9、通过type和interface-限制某个字符串变量的具体字符串",a:"_9、通过type和interface-限制某个字符串变量的具体字符串"},"4.0":{t:"# NPM命令",p:"",l:"blogs/2022-05-21-npm.html",a:"npm命令"},"4.1":{t:"1、安装 nodejs 则其中会包含 npm，安装完 nodejs 后",p:`node -v  // 查看nodejs安装是否成功，成功后会出现版本号
npm -v  // 同样会出现npm版本

`,l:"blogs/2022-05-21-npm.html#_1、安装-nodejs-则其中会包含-npm-安装完-nodejs-后",a:"_1、安装-nodejs-则其中会包含-npm-安装完-nodejs-后"},"4.2":{t:"2、通过 npm 安装 yarn",p:`    npm install -g yarn

`,l:"blogs/2022-05-21-npm.html#_2、通过-npm-安装-yarn",a:"_2、通过-npm-安装-yarn"},"4.3":{t:"3、通过 npm 安装 cnpm",p:"    npm install -g cnpm --registry=https://registry.npm.taobao ...",l:"blogs/2022-05-21-npm.html#_3、通过-npm-安装-cnpm",a:"_3、通过-npm-安装-cnpm"},"4.4":{t:"4、若遇到npm 在 vscode 中不能生效，可以尝试将 vscode 右键管理员运行或重启终端",p:"",l:"blogs/2022-05-21-npm.html#_4、若遇到npm-在-vscode-中不能生效-可以尝试将-vscode-右键管理员运行或重启终端",a:"_4、若遇到npm-在-vscode-中不能生效-可以尝试将-vscode-右键管理员运行或重启终端"},"4.5":{t:"5、npm 安装版本号",p:`安装策略，若存在lock文件，则按照lock文件中的版本安装，若不存在则按照以下规则

会匹配最新版本的依赖包，比如1.2. ...`,l:"blogs/2022-05-21-npm.html#_5、npm-安装版本号",a:"_5、npm-安装版本号"},"4.6":{t:"6、npm -D -S",p:`    -D 是在开发环境中协助开发需要使用的

    -S是生产环境打包时需要的

    在package.json中 ...`,l:"blogs/2022-05-21-npm.html#_6、npm-d-s",a:"_6、npm-d-s"},"4.7":{t:"7、npm update 更新包",p:`    npm update package-name

`,l:"blogs/2022-05-21-npm.html#_7、npm-update-更新包",a:"_7、npm-update-更新包"},"4.8":{t:"8、 npmjs.com 发布常用操作",p:`    // 登录 npmjs // 输入用户名  密码和 注册邮箱
    npm login

    //打包文件（参 ...`,l:"blogs/2022-05-21-npm.html#_8、-npmjs-com-发布常用操作",a:"_8、-npmjs-com-发布常用操作"},"4.9":{t:"9、清理 npm 安装包的缓存",p:`    npm cache clean --force

`,l:"blogs/2022-05-21-npm.html#_9、清理-npm-安装包的缓存",a:"_9、清理-npm-安装包的缓存"},"4.10":{t:"10、nvm 管理node版本",p:`- mac下安装 https://juejin.cn/post/7028543262109630495
- window下安 ...`,l:"blogs/2022-05-21-npm.html#_10、nvm-管理node版本",a:"_10、nvm-管理node版本"},"4.11":{t:"11、 node-sass 安装一直失败,直接dart-sass替换吧",p:`- https://www.cnblogs.com/cilye/p/15107661.html
- https://juej ...`,l:"blogs/2022-05-21-npm.html#_11、-node-sass-安装一直失败-直接dart-sass替换吧",a:"_11、-node-sass-安装一直失败-直接dart-sass替换吧"},"4.12":{t:"12、node和npm版本对应关系",p:`- https://nodejs.org/zh-cn/download/releases/

`,l:"blogs/2022-05-21-npm.html#_12、node和npm版本对应关系",a:"_12、node和npm版本对应关系"},"4.13":{t:"13、npm 执行顺序的整理",p:"- https://segmentfault.com/a/1190000008832423?utm_source=tag-n ...",l:"blogs/2022-05-21-npm.html#_13、npm-执行顺序的整理",a:"_13、npm-执行顺序的整理"},"4.14":{t:"14、400 错误",p:`- https://segmentfault.com/a/1190000041167927
- https://segmen ...`,l:"blogs/2022-05-21-npm.html#_14、400-错误",a:"_14、400-错误"},"4.15":{t:"15、npm包源",p:`- https://npmjs.com
- https://npmmirror.com/

`,l:"blogs/2022-05-21-npm.html#_15、npm包源",a:"_15、npm包源"},"5.0":{t:"# MarkDown语法",p:"",l:"blogs/2023-04-23-html-write.md",a:"markdown语法"},"5.1":{t:"一、标题",p:`在想要设置为标题的文字前面加#来表示
注：标准语法一般在#后跟个空格再写文字
示例：

`,l:"blogs/2023-04-23-html-write.md#一、标题",a:"一、标题"},"5.2":{t:"这是二级标题",p:"",l:"blogs/2023-04-23-html-write.md#这是二级标题",a:"这是二级标题"},"5.3":{t:"这是三级标题",p:"",l:"blogs/2023-04-23-html-write.md#这是三级标题",a:"这是三级标题"},"5.4":{t:"这是四级标题",p:"",l:"blogs/2023-04-23-html-write.md#这是四级标题",a:"这是四级标题"},"5.5":{t:"这是五级标题",p:"",l:"blogs/2023-04-23-html-write.md#这是五级标题",a:"这是五级标题"},"5.6":{t:"这是六级标题",p:`
`,l:"blogs/2023-04-23-html-write.md#这是六级标题",a:"这是六级标题"},"5.7":{t:"二、字体",p:`
加粗
要加粗的文字左右分别用两个*号包起来
斜体
要倾斜的文字左右分别用一个*号包起来
斜体加粗
要倾斜和加粗的文字左右分 ...`,l:"blogs/2023-04-23-html-write.md#二、字体",a:"二、字体"},"5.8":{t:"三、引用",p:`在引用的文字前加&gt;即可，引用也可以嵌套。
示例：
&gt;这是引用的内容
&gt;&gt;这是引用的内容
&gt;&g ...`,l:"blogs/2023-04-23-html-write.md#三、引用",a:"三、引用"},"5.9":{t:"四、分割线",p:`三个或者三个以上的 - 或者 * 都可以。
示例：
---
----
***
*****





`,l:"blogs/2023-04-23-html-write.md#四、分割线",a:"四、分割线"},"5.10":{t:"五、图片",p:`语法：
!图片alt

图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到 ...`,l:"blogs/2023-04-23-html-write.md#五、图片",a:"五、图片"},"5.11":{t:"六、超链接",p:`语法：
超链接名

掘金
百度
注：Markdown本身语法不支持链接在新页面中打开，掘金做了处理，是可以的。别的平台可能就 ...`,l:"blogs/2023-04-23-html-write.md#六、超链接",a:"六、超链接"},"5.12":{t:"七、列表",p:"",l:"blogs/2023-04-23-html-write.md#七、列表",a:"七、列表"},"5.13":{t:"无序列表",p:`语法：
无序列表用 - + * 任何一种都可以
- 列表内容
+ 列表内容
* 列表内容

注意：- + * 跟内容之间都要 ...`,l:"blogs/2023-04-23-html-write.md#无序列表",a:"无序列表"},"5.14":{t:"有序列表",p:`语法：
数字+加点+空格
1. 列表内容
2. 列表内容
3. 列表内容

注意：序号跟内容之间要有空格


列表内容
列表 ...`,l:"blogs/2023-04-23-html-write.md#有序列表",a:"有序列表"},"5.15":{t:"列表嵌套",p:`上一级和下一级之间敲三个空格即可
+ 一级无序列表内容
   + 二级无序列表内容
   + 二级无序列表内容
   + 二 ...`,l:"blogs/2023-04-23-html-write.md#列表嵌套",a:"列表嵌套"},"5.16":{t:"八、表格",p:`语法：
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

第二行分割表头和内容。
- 有一 ...`,l:"blogs/2023-04-23-html-write.md#八、表格",a:"八、表格"},"5.17":{t:"九、代码",p:`语法：
单行代码：代码之间分别用一个反引号包起来
\`代码内容\`

代码块：代码之间分别用三个反引号包起来，且两边的反引号单独 ...`,l:"blogs/2023-04-23-html-write.md#九、代码",a:"九、代码"},"6.0":{t:"# VsCode插件和快捷键",p:"",l:"blogs/2023-04-24-vscode.html",a:"vscode插件和快捷键"},"6.1":{t:"插件汇总",p:`
Auto Close Tag
Auto Import
Auto Rename Tag
background  // 在编辑 ...`,l:"blogs/2023-04-24-vscode.html#插件汇总",a:"插件汇总"},"6.2":{t:"快捷键",p:`
快速复制一行


shift+alt+下箭头/上箭头


选定多个相同的单词


ctrl + d  先双击选定一个单词， ...`,l:"blogs/2023-04-24-vscode.html#快捷键",a:"快捷键"},"7.0":{t:"# Echarts隐藏api之精细化监听click",p:"",l:"blogs/2023-04-25-echartsclick.html",a:"echarts隐藏api之精细化监听click"},"7.1":{t:"背景",p:"点击echarts表格数据区域触发事件，生成弹窗，可以用echart官方提供的on监听，但是当图表中的折线或者点很小的时候， ...",l:"blogs/2023-04-25-echartsclick.html#背景",a:"背景"},"7.2":{t:"注意",p:"因为这是私有 API，官方没开放过，自然文档里就没有介绍。目前可以用，但不保证某个版本后就失效了（比如移除了、改名了、或者改 ...",l:"blogs/2023-04-25-echartsclick.html#注意",a:"注意"},"8.0":{t:"# 什么是JSBridge",p:"我们都知道,原生APP开发中有一个webview的组件(Android中是webview,iOS7以下有UIWebview, ...",l:"blogs/2023-04-25-jsbridge.html",a:"什么是jsbridge"},"8.1":{t:"通信原理",p:`JSBridge通信方式的原理可以用一张图和一句话来概括，那就是
H5-&gt;通过某种方式触发一个url-&gt;Nati ...`,l:"blogs/2023-04-25-jsbridge.html#通信原理",a:"通信原理"},"8.2":{t:"url scheme介绍",p:`
url scheme是一种类似于url的链接,是为了方便app直接互相调用设计的

具体为,可以用系统的OpenURI打开 ...`,l:"blogs/2023-04-25-jsbridge.html#url-scheme介绍",a:"url-scheme介绍"},"8.3":{t:"JSBridge设计思路",p:`上面已经介绍了jsbridge的原理，那么要设计出一个jsbrdige对象，需要具备哪些功能呢
关键思路：

设计出一个Na ...`,l:"blogs/2023-04-25-jsbridge.html#jsbridge设计思路",a:"jsbridge设计思路"},"8.4":{t:"1.设计一个native与JS交互的全局桥对象",p:`
该对象名为&quot;JSBridge&quot;,是H5页面中全局对象window的一个属性

var JSBridge ...`,l:"blogs/2023-04-25-jsbridge.html#_1-设计一个native与js交互的全局桥对象",a:"_1-设计一个native与js交互的全局桥对象"},"8.5":{t:"2.JS如何调用Native",p:`在执行callHandler时,内部经历了以下步骤:


判断是否有回调函数,如果有,生成一个回调函数id,并将id和对应回 ...`,l:"blogs/2023-04-25-jsbridge.html#_2-js如何调用native",a:"_2-js如何调用native"},"8.6":{t:"3.Native如何得知api被调用",p:`在上一步中,我们已经成功在H5页面中触发scheme,那么Native如何捕获scheme被触发呢？
根据系统不同,Andr ...`,l:"blogs/2023-04-25-jsbridge.html#_3-native如何得知api被调用",a:"_3-native如何得知api被调用"},"8.7":{t:"Android捕获url scheme",p:"在Android中(WebViewClient里),通过shouldoverrideurlloading可以捕获到url s ...",l:"blogs/2023-04-25-jsbridge.html#android捕获url-scheme",a:"android捕获url-scheme"},"8.8":{t:"iOS捕获url scheme",p:"iOS中,UIWebView有个特性：在UIWebView内发起的所有网络请求，都可以通过delegate函数在Native ...",l:"blogs/2023-04-25-jsbridge.html#ios捕获url-scheme",a:"ios捕获url-scheme"},"8.9":{t:"4.分析url-参数和回调的格式",p:`在前面的步骤中,Native已经接收到了JS调用的方法,那么接下来,原生就应该按照定义好的数据格式来解析数据了
url sc ...`,l:"blogs/2023-04-25-jsbridge.html#_4-分析url-参数和回调的格式",a:"_4-分析url-参数和回调的格式"},"8.10":{t:"5.Native如何调用JS",p:`到了这一步,就该Native通过JSBridge调用H5的JS方法或者通知H5进行回调了
//将回调信息传给H5
JSBri ...`,l:"blogs/2023-04-25-jsbridge.html#_5-native如何调用js",a:"_5-native如何调用js"},"8.11":{t:"Native通知H5页面进行回调",p:`参考第4点 native功能执行完成后通知h5回调
`,l:"blogs/2023-04-25-jsbridge.html#native通知h5页面进行回调",a:"native通知h5页面进行回调"},"8.12":{t:"Native主动调用H5方法",p:"Native主动调用H5方法时,数据格式是:{ handlerName:api名,data:数据,callbackId:回调 ...",l:"blogs/2023-04-25-jsbridge.html#native主动调用h5方法",a:"native主动调用h5方法"},"8.13":{t:"6.H5中api方法的注册以及格式",p:`前面有提到Native主动调用H5中注册的api方法,那么h5中怎么注册供原生调用的api方法呢？格式又是什么呢?如下
`,l:"blogs/2023-04-25-jsbridge.html#_6-h5中api方法的注册以及格式",a:"_6-h5中api方法的注册以及格式"},"8.14":{t:"H5中注册供原生调用的API",p:`//注册一个测试函数
JSBridge.registerHandler('testH5Func',function(data ...`,l:"blogs/2023-04-25-jsbridge.html#h5中注册供原生调用的api",a:"h5中注册供原生调用的api"},"8.15":{t:"进一步JSBridge完善方案......",p:`大致思路就是
h5调用Native的关键步骤进行拆分,由以前的直接传递url scheme变为传递一个统一的url sche ...`,l:"blogs/2023-04-25-jsbridge.html#进一步jsbridge完善方案",a:"进一步jsbridge完善方案"},"9.0":{t:"# 教你用Vue3实现移动端Dialog",p:`背景
公司最近在做组件库，本菜鸡被分配到dialog组件，接到任务，本来想使用cv大法“借鉴”一下市面上的dialog组件， ...`,l:"blogs/2023-04-25-vue3dialog.html",a:"教你用vue3实现移动端dialog"},"10.0":{t:"我为什么要写博客",p:"2020年6月大学毕业入行前端，2021年年初的时候就想着，之前几个月遇到的好多问题，或者看过的挺多很好的文章都找不到了，遇 ...",l:"blogs/index.html",a:"我为什么要写博客"},"11.0":{t:"序言",p:`--
时间过的真快，转眼就快到年底了，作为一个20年的毕业生，经历了疫情的毕业季，走到现在不知不觉也快2年了。
回顾21年， ...`,l:"daily/2021-sum.html",a:"序言"},"12.0":{t:"4 月 24 日",p:`
109 一个非常棒的开源项目 H5-Dooring 目前 star 3.1k

开源地址 https://github.c ...`,l:"daily/2023-04.html",a:"_4-月-24-日"},"12.1":{t:"4 月 23 日",p:`
101 查看 vue3 github 项目 https://zhuanlan.zhihu.com/p/254219538
 ...`,l:"daily/2023-04.html#_4-月-23-日",a:"_4-月-23-日"},"12.2":{t:"4 月 22 日",p:`
97 vue3 中的 setup Composition API

https://segmentfault.com/a/ ...`,l:"daily/2023-04.html#_4-月-22-日",a:"_4-月-22-日"},"12.3":{t:"4 月 21 日",p:`
90 对比一下 vue2 和 vue3 中分别使用 typeScript 的方式

https://jishuin.pro ...`,l:"daily/2023-04.html#_4-月-21-日",a:"_4-月-21-日"},"12.4":{t:"4 月 20 日",p:`
84 vue-class-component 和 vue-property-decorator vue 类组件

http ...`,l:"daily/2023-04.html#_4-月-20-日",a:"_4-月-20-日"},"12.5":{t:"4 月 19 日",p:`
83 webassembly 视频进行转码 https://mp.weixin.qq.com/s/5k5f3UDNhFyc ...`,l:"daily/2023-04.html#_4-月-19-日",a:"_4-月-19-日"},"12.6":{t:"4 月 18 日",p:`
81 echarts 地图

设置 echarts div 的宽度和高度
边距可以设置 gird 属性中的top,left ...`,l:"daily/2023-04.html#_4-月-18-日",a:"_4-月-18-日"},"12.7":{t:"4 月 16 日",p:`
80 transform

https://www.cnblogs.com/yanggeng/p/11286250.htm ...`,l:"daily/2023-04.html#_4-月-16-日",a:"_4-月-16-日"},"12.8":{t:"4 月 15 日",p:`
77 vscode 插件韭菜盒子

https://github.com/LeekHub/leek-fund


78 e ...`,l:"daily/2023-04.html#_4-月-15-日",a:"_4-月-15-日"},"12.9":{t:"4 月 14 日",p:`
76 数字之间的间隔 - letter-spacing:2px;
77 css 小箭头

http://blog.sina ...`,l:"daily/2023-04.html#_4-月-14-日",a:"_4-月-14-日"},"12.10":{t:"4 月 13 日",p:`
72 animate.css 动画库

https://github.com/animate-css/animate.cs ...`,l:"daily/2023-04.html#_4-月-13-日",a:"_4-月-13-日"},"12.11":{t:"4 月 12 日",p:`

68 模块热替换 api

http://www.myjscode.com/page/article109.html

 ...`,l:"daily/2023-04.html#_4-月-12-日",a:"_4-月-12-日"},"12.12":{t:"4 月 11 日",p:`
54 无代码 no-code(NCDP)和低代码的解释

https://mp.weixin.qq.com/s/Zhmh6 ...`,l:"daily/2023-04.html#_4-月-11-日",a:"_4-月-11-日"},"12.13":{t:"4 月 9 日",p:`
49 linux 命令删除文件

https://blog.csdn.net/weixin_43627766/articl ...`,l:"daily/2023-04.html#_4-月-9-日",a:"_4-月-9-日"},"12.14":{t:"4 月 8 日",p:`
46 window.requestAnimationFrame 告诉浏览器要执行动画

https://developer ...`,l:"daily/2023-04.html#_4-月-8-日",a:"_4-月-8-日"},"12.15":{t:"4 月 7 日",p:`

30 通过 adb.exe 连接机顶盒来查看应用的日志记录

查看 adb 版本 adb version
通过 IP 地 ...`,l:"daily/2023-04.html#_4-月-7-日",a:"_4-月-7-日"},"12.16":{t:"4 月 6 日",p:`

21 浏览器视频转码

https://github.com/bgrins/videoconverter.js



h ...`,l:"daily/2023-04.html#_4-月-6-日",a:"_4-月-6-日"},"12.17":{t:"4 月 5 日",p:`

10 vue keepalive 发现一旦设置某个路由为 true,后续通过动态设置就是无效的后来发现 github 官 ...`,l:"daily/2023-04.html#_4-月-5-日",a:"_4-月-5-日"},"12.18":{t:"4 月 4 日",p:`
1 vue 中将 v-for 循环组件（通过 v-if 进行展示），方案修改为 component 组件，简化代码

   ...`,l:"daily/2023-04.html#_4-月-4-日",a:"_4-月-4-日"},"13.0":{t:"# 常用汇总",p:"",l:"daily/index.html",a:"常用汇总"},"13.1":{t:"阅读",p:`

IOC &amp;&amp; NestJS

https://www.yuque.com/hanochma/ph8kvf ...`,l:"daily/index.html#阅读",a:"阅读"},"13.2":{t:"工具",p:`

博客发文所需小工具

掘金笔记模版：https://github.com/xitu/juejin-markdown-th ...`,l:"daily/index.html#工具",a:"工具"},"14.0":{t:"<!-- <middle /> -->",p:"",l:"index.html",a:"middle"},"15.0":{t:"About Me",p:`

我的微信号： mlylh0304


我的个人博客源码：https://github.com/HanochMa/Hano ...`,l:"me/index.html",a:"about-me"}},i={previewLength:62,buttonLabel:"Search",placeholder:"Search docs",allow:[],ignore:[],encode:!1,tokenize:"full"},t={INDEX_DATA:e,PREVIEW_LOOKUP:a,Options:i};export{t as default};