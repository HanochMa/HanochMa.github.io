

const frontBase = {
  text: "前端基础篇",
  items: [
    { text: "开发规范", link: "/blogs/front-base/2022-05-15-guifan" },
    { text: "Typescript定义", link: "/blogs/front-base/2022-05-20-typescript" },
    { text: "NPM命令", link: "/blogs/front-base/2022-05-21-npm" },
    { text: "VsCode插件和快捷键", link: "/blogs/front-base/2023-04-24-vscode" },
    { text: "CSS盒模型", link: "/blogs/front-base/2023-04-25-cssbox" },
    { text: "前端工程化的演变", link: "/blogs/front-base/2023-05-05-frontend-history" },
    { text: "控制反转（IOC）", link: "/blogs/front-base/2023-05-05-IOC" },
    { text: "深入浅出PNPM", link: "/blogs/front-base/2023-05-11-pnpm" },
    { text: "浅谈“this”（上）", link: "/blogs/front-base/2023-05-16-talk-this1" },
    { text: "浅谈“this”（下）", link: "/blogs/front-base/2023-05-16-talk-this2" },
    { text: "JS之prototype", link: "/blogs/front-base/2023-05-16-js-prototype" },
  ],
}

const commonSkill = {
  text: "通用能力篇",
  items: [
    { text: "Markdown Icon汇总", link: "/blogs/common-skill/2021-12-31-md-icon" },
    { text: "Git常用命令", link: "/blogs/common-skill/2022-05-07-git" },
    { text: "Markdown语法", link: "/blogs/common-skill/2023-04-23-md-write" },
    { text: "如何做一个有质量的技术分享", link: "/blogs/common-skill/2023-05-15-tech-share" },
    { text: "使用简单的逻辑方法进行独立思考", link: "/blogs/common-skill/2023-05-15-think-method" },
    { text: "Typora+PicGo+Github无缝上传图片", link: "/blogs/common-skill/2023-05-23-typora-picbed" },
    { text: "自动打包部署Github Pages", link: "/blogs/common-skill/2023-05-26-github-workflow" }
  ],
}

const network = {
  text: "网络篇",
  items: [
    { text: "HTTP2.0是如何优化传输性能的", link: "/blogs/network/2023-05-09-http2" },
    { text: "聊聊TCP握手", link: "/blogs/network/2023-05-15-tcp-handshake" },
    { text: "HTTP的前世今生", link: "/blogs/network/2023-05-18-http-history" },
  ],
}

const webApply = {
  text: "Web应用篇",
  items: [
    { text: "一文让你彻底理解JSbridge", link: "/blogs/web-apply/2023-04-25-jsbridge" },
    { text: "Echarts隐藏api之精细化监听click", link: "/blogs/web-apply/2023-04-25-echartsclick" },
    { text: "教你用Vue3实现移动端Dialog", link: "/blogs/web-apply/2023-04-25-vue3dialog" },
    { text: "New Vue之后到底发生了什么", link: "/blogs/web-apply/2023-04-26-newvue-process" },
    { text: "Webpack优化思路", link: "/blogs/web-apply/2023-04-26-webpack-opt" },
    { text: "Vite的HMR", link: "/blogs/web-apply/2023-05-04-vite-hmr" },
    { text: "Vite的拆包策略", link: "/blogs/web-apply/2023-05-05-vite-code-splitting" },
    { text: "现代图片性能优化及体验优化方案", link: "/blogs/web-apply/2023-05-05-image-handle" },
    { text: "VSCode是如何优化性能的", link: "/blogs/web-apply/2023-05-05-vscode-opt" },
    { text: "深入浅出vscode插件", link: "/blogs/web-apply/2023-05-05-vscode-plugin" },
  ],
}
function getBlogsSidebar() {
  return [
    frontBase,
    webApply,
    network,
    commonSkill,
  ];
}

function getDailySidebar() {
  return [
    {
      text: "2023年每日笔记",
      items: [
        { text: "2023-04", link: "/daily/2023-04" },
        { text: "2023-05", link: "/daily/2023-05" },
      ],
    },
    {
      text: "一些想说的",
      items: [
        { text: "2021年终总结", link: "/daily/2021-sum" },
      ],
    },
  ];
}

export default {
  "/blogs/": getBlogsSidebar(),
  "/daily/": getDailySidebar(),
};