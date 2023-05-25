<template>
    <div class="gitalk-container">
        <div id="gitalk-container"></div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue"
import md5 from "md5"
import Gitalk from "gitalk"
import "gitalk/dist/gitalk.css"

onMounted(() => {
    const commentConfig = {
        clientID: '7de08a68f09ea4772f9d',
        clientSecret: '8ba59cfe8ba773ff65eebcadeab112bc4ca0a107',
        repo: 'HanochMa.github.io',
        owner: 'HanochMa',
        admin: ['HanochMa'],
        id: md5(location.pathname) as string, // 请确保你的 location 连接小于 50 个字符，否则，插件会生成失败
        distractionFreeMode: false  // 专注模式
    }
    const gitalk = new Gitalk(commentConfig)
    gitalk.render("gitalk-container")
})
</script>
<style lang="scss">
.gt-container .gt-header-textarea{
    color: #000;
}
</style>