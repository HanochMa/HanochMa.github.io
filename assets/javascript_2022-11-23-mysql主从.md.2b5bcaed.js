import{_ as a,o as e,c as l,O as s}from"./chunks/framework.7d656979.js";const q=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"javascript/2022-11-23-mysql主从.md","lastUpdated":1682239025000}'),t={name:"javascript/2022-11-23-mysql主从.md"},r=s(`<p><a href="https://www.cnblogs.com/elsons/p/15763248.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/elsons/p/15763248.html</a></p><h2 id="查看主从" tabindex="-1">查看主从 <a class="header-anchor" href="#查看主从" aria-label="Permalink to &quot;查看主从&quot;">​</a></h2><p>maxctrl list servers</p><h2 id="查看运行进程" tabindex="-1">查看运行进程 <a class="header-anchor" href="#查看运行进程" aria-label="Permalink to &quot;查看运行进程&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">top</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">top -Hp pid</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 查找到具体的mysql 进程id</span></span>
<span class="line"><span style="color:#A6ACCD;">pidof mysqld</span></span></code></pre></div><h2 id="mysql-慢查询日志和数据文件路径" tabindex="-1">mysql 慢查询日志和数据文件路径 <a class="header-anchor" href="#mysql-慢查询日志和数据文件路径" aria-label="Permalink to &quot;mysql 慢查询日志和数据文件路径&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/var/lib/mysql</span></span></code></pre></div><p>清空慢查询日志，并恢复 <a href="https://blog.csdn.net/weixin_41275260/article/details/125461408" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_41275260/article/details/125461408</a></p><h2 id="mysql-group-by-字段或者非聚合字段是否可以添加到select-后" tabindex="-1">mysql group by 字段或者非聚合字段是否可以添加到select 后 <a class="header-anchor" href="#mysql-group-by-字段或者非聚合字段是否可以添加到select-后" aria-label="Permalink to &quot;mysql group by 字段或者非聚合字段是否可以添加到select 后&quot;">​</a></h2><ul><li><a href="https://blog.csdn.net/qq_34637782/article/details/101029487" target="_blank" rel="noreferrer">https://blog.csdn.net/qq_34637782/article/details/101029487</a></li></ul><h2 id="查看磁盘文件大小" tabindex="-1">查看磁盘文件大小 <a class="header-anchor" href="#查看磁盘文件大小" aria-label="Permalink to &quot;查看磁盘文件大小&quot;">​</a></h2><ul><li>du -sh *</li></ul><h2 id="查看linux-磁盘分区" tabindex="-1">查看linux 磁盘分区 <a class="header-anchor" href="#查看linux-磁盘分区" aria-label="Permalink to &quot;查看linux 磁盘分区&quot;">​</a></h2><ul><li>df -h</li></ul><h2 id="mysql文件存储位置" tabindex="-1">mysql文件存储位置 <a class="header-anchor" href="#mysql文件存储位置" aria-label="Permalink to &quot;mysql文件存储位置&quot;">​</a></h2><p>MariaDB [(none)]&gt; show variables like &#39;%%datadir&#39;; +---------------+-----------------+ | Variable_name | Value | +---------------+-----------------+ | datadir | /var/lib/mysql/ | +---------------+-----------------+ 1 row in set (0.001 sec)</p><h2 id="查看事务-查看锁" tabindex="-1">查看事务 查看锁 <a class="header-anchor" href="#查看事务-查看锁" aria-label="Permalink to &quot;查看事务 查看锁&quot;">​</a></h2><ul><li><a href="https://blog.csdn.net/qq_42764269/article/details/122045831" target="_blank" rel="noreferrer">https://blog.csdn.net/qq_42764269/article/details/122045831</a></li></ul><h2 id="主从停止" tabindex="-1">主从停止 <a class="header-anchor" href="#主从停止" aria-label="Permalink to &quot;主从停止&quot;">​</a></h2><ul><li><a href="https://blog.csdn.net/weixin_34981046/article/details/113127203" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_34981046/article/details/113127203</a></li></ul><h2 id="mysql-全量备份" tabindex="-1">mysql 全量备份 <a class="header-anchor" href="#mysql-全量备份" aria-label="Permalink to &quot;mysql 全量备份&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/7135363385700384799#heading-18" target="_blank" rel="noreferrer">https://juejin.cn/post/7135363385700384799#heading-18</a></li><li><a href="https://www.jianshu.com/p/17337e3d3a33" target="_blank" rel="noreferrer">https://www.jianshu.com/p/17337e3d3a33</a> 这一篇非常关键<br> 全量备份的时候不要锁表</li></ul><p>mysqldump -uroot -p123456 db1 &gt; db1.sql</p><p>/usr/share/mysql/policy/apparmor</p><p>/etc/my.cnf.d</p><p>create user &#39;root&#39;@&#39;%&#39; identified with mysql_native_password by &#39;sunlight2010&#39;;</p><p>create user &#39;root&#39;@&#39;%&#39; identified by &#39;sunlight2010&#39;; update mysql.user set plugin=&#39;mysql_native_password&#39; where</p><p>grant all privileges on <em>.</em> to &#39;root&#39;@&#39;%&#39;;</p><p>// 新建一个用户 CREATE USER &#39;course&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;123456&#39;;</p><p>// 并将数据库添加到该用户下 grant all privileges on <em>.</em> to &#39;course&#39;@&#39;localhost&#39;;</p><p>flush privileges;</p><h2 id="mysql最大链接数" tabindex="-1">mysql最大链接数 <a class="header-anchor" href="#mysql最大链接数" aria-label="Permalink to &quot;mysql最大链接数&quot;">​</a></h2><ul><li><a href="http://t.zoukankan.com/JentZhang-p-12581116.html" target="_blank" rel="noreferrer">http://t.zoukankan.com/JentZhang-p-12581116.html</a></li></ul><p>/etc/my.cnf.d</p><p>systemctl daemon-reload</p><p>systemctl restart mysqld.service</p><h2 id="mysql-count-汇总统计" tabindex="-1">mysql count 汇总统计 <a class="header-anchor" href="#mysql-count-汇总统计" aria-label="Permalink to &quot;mysql count 汇总统计&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/7130276921534840845" target="_blank" rel="noreferrer">https://juejin.cn/post/7130276921534840845</a></li></ul>`,38),n=[r];function i(o,p,c,h,d,u){return e(),l("div",null,n)}const b=a(t,[["render",i]]);export{q as __pageData,b as default};
