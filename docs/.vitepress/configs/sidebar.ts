export default {
  "/fe/": getFeSidebar(),
  "/daily/": getDailySidebar(),
};

function getFeSidebar() {
  return [
    {
      text: "前端总结",
      items: [
        { text: "Markdown Icon汇总", link: "/fe/2021-12-31-md-icon" },
        { text: "Git常用命令", link: "/fe/2022-05-07-git" },
        { text: "开发规范", link: "/fe/2022-05-15-guifan" },
        { text: "Typescript定义枚举", link: "/fe/2022-05-20-typescript" },
        { text: "NPM命令", link: "/fe/2022-05-21-npm" },
        { text: "VsCode插件和快捷键", link: "/fe/2023-04-24-vscode" },
        { text: "Markdown语法", link: "/fe/2023-04-23-md-write" },
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
  ];
}
