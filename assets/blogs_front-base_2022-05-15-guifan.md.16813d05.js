import{_ as a,D as l,o as n,c as p,G as o,V as e}from"./chunks/framework.ab6d8354.js";const A=JSON.parse('{"title":"前端开发规范","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/front-base/2022-05-15-guifan.md","filePath":"blogs/front-base/2022-05-15-guifan.md","lastUpdated":1684998501000}'),t={name:"blogs/front-base/2022-05-15-guifan.md"},c=e(`<h1 id="前端开发规范" tabindex="-1">前端开发规范 <a class="header-anchor" href="#前端开发规范" aria-label="Permalink to &quot;前端开发规范&quot;">​</a></h1><h2 id="_1、驼峰式命名法介绍" tabindex="-1">1、驼峰式命名法介绍 <a class="header-anchor" href="#_1、驼峰式命名法介绍" aria-label="Permalink to &quot;1、驼峰式命名法介绍&quot;">​</a></h2><ul><li>Pascal Case 大驼峰式命名法：首字母大写。eg：RequestScanQrcode、UserInfo、GetQueryString</li><li>Camel Case 小驼峰式命名法：首字母小写。eg：requestScanQrcode、userInfo、getQueryString</li></ul><h2 id="_2、命名规范" tabindex="-1">2、命名规范 <a class="header-anchor" href="#_2、命名规范" aria-label="Permalink to &quot;2、命名规范&quot;">​</a></h2><ul><li><p>项目命名</p><p>全部采用小写方式,项目包含多个单词时，单词之间建议使用半角的连词线 ( - ) 进行分隔。 例：dvs-sunlight-tech</p></li><li><p>目录命名</p><p>1、参考项目命名。 例：popup-message 2、有复数结构时，要采用复数命名法。例：scripts，styles，images，views，components，utils 等</p></li><li><p>JS 和 VUE 文件命名</p><p>1、参考项目命名。例：column-tree、investigate 等 2、注意：components 中的组件名称使用大驼峰命名方式，在 template 模板中引用组件时全部采用小写中间使用（-）进行分隔。</p></li><li><p>CSS、SCSS 文件命名</p><p>参考项目命名。例：variable.scss、element-theme.scss 等</p></li></ul><h2 id="_3、css、scss-规范" tabindex="-1">3、CSS、SCSS 规范 <a class="header-anchor" href="#_3、css、scss-规范" aria-label="Permalink to &quot;3、CSS、SCSS 规范&quot;">​</a></h2><ul><li><p>缩进（个人用的 tab，也可以直接使用空格）</p><p>使用 tab 缩进（2 个空格）</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">right-chart</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">position</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> relative</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">f2f2f2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></li><li><p>分号</p><p>每个声明后都加分号</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">right-chart</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">position</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> relative</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">f2f2f2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></li><li><p>命名</p><ul><li>类名使用小写字母，单词之间建议使用半角的连词线 ( - ) 进行分隔。例：village-list</li><li>id 采用小驼峰式命名。例：villageDialog</li><li>scss 中的变量、函数、混合、placeholder 采用小驼峰式命名</li></ul><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/* class */</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">village-list</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* id */</span></span>
<span class="line"><span style="color:#89DDFF;">#</span><span style="color:#F78C6C;">villageDialog</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* 变量 */</span></span>
<span class="line"><span style="color:#A6ACCD;">$themeColor: </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">000;</span></span></code></pre></div></li></ul><h2 id="_4、javascript-规范" tabindex="-1">4、JavaScript 规范 <a class="header-anchor" href="#_4、javascript-规范" aria-label="Permalink to &quot;4、JavaScript 规范&quot;">​</a></h2><ul><li><p>缩进</p><p>使用 Tab 缩进（两个空格）</p></li><li><p>分号</p><p>每个声明结束都要加分号</p></li><li><p>命名</p><ul><li>标准变量采用小驼峰式命名</li><li>常量全大写，用下划线连接</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">data</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    pickerOptions</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#F07178;">  </span><span style="color:#676E95;font-style:italic;">// 小驼峰式</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> MAX_COUNT </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 常量全大写</span></span></code></pre></div></li><li><p>注释</p><ul><li>单行注释 注释单独一行的情况下，注释的//后面要跟一个空格 注释如果和代码同一行，代码分号结束后，要跟一个空格，注释的//后也要跟一个空格</li></ul></li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 调用函数</span></span>
<span class="line"><span style="color:#82AAFF;">select</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> maxCount </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 这是一个变量</span></span></code></pre></div><ul><li><p>多行注释 多行注释使用下面这种形式：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 代码注释1</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 代码注释2</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span></code></pre></div><p>多行注释建议在以下几种情况使用：</p><ul><li>难于理解的代码段</li><li>可能存在错误的代码段</li><li>业务逻辑强相关的代码</li></ul></li></ul><h2 id="_5、git-提交的用户名和邮箱设置" tabindex="-1">5、git 提交的用户名和邮箱设置 <a class="header-anchor" href="#_5、git-提交的用户名和邮箱设置" aria-label="Permalink to &quot;5、git 提交的用户名和邮箱设置&quot;">​</a></h2><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git config </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">global user</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">xxx</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  git config </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">global user</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">email </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">987654321@qq.com</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div>`,13);function i(r,y,D,C,F,d){const s=l("git-talk");return n(),p("div",null,[c,o(s)])}const h=a(t,[["render",i]]);export{A as __pageData,h as default};