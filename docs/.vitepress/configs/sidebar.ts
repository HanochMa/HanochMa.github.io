export default {
  "/blogs/": getBlogsSidebar(),
  "/daily/": getDailySidebar(),
};

function getBlogsSidebar() {
  return [
    {
      text: "博客文章",
      items: [
        { text: "Markdown Icon汇总", link: "/blogs/2021-12-31-md-icon" },
        { text: "Git常用命令", link: "/blogs/2022-05-07-git" },
        { text: "开发规范", link: "/blogs/2022-05-15-guifan" },
        { text: "Typescript定义", link: "/blogs/2022-05-20-typescript" },
        { text: "NPM命令", link: "/blogs/2022-05-21-npm" },
        { text: "VsCode插件和快捷键", link: "/blogs/2023-04-24-vscode" },
        { text: "Markdown语法", link: "/blogs/2023-04-23-md-write" },
        { text: "一文让你彻底理解JSbridge", link: "/blogs/2023-04-25-jsbridge" },
        { text: "Echarts隐藏api之精细化监听click", link: "/blogs/2023-04-25-echartsclick" },
        { text: "教你用Vue3实现移动端Dialog", link: "/blogs/2023-04-25-vue3dialog" },
        { text: "CSS盒模型", link: "/blogs/2023-04-25-cssbox" },
        { text: "New Vue之后到底发生了什么", link: "/blogs/2023-04-26-newvue-process" },
        { text: "Webpack优化思路", link: "/blogs/2023-04-26-webpack-opt" },
        { text: "Vite的HMR", link: "/blogs/2023-05-04-vite-hmr" },
      ],
    },
  ];
}

function getDailySidebar() {
  return [
    {
      text: "2023年每日笔记",
      items: [
        { text: "2023-04", link: "/daily/2023-04" },
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
