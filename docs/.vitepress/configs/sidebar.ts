export default {
  "/fe/": getFeSidebar(),
  "/daily/": getDailySidebar(),
};

function getFeSidebar() {
  return [
    {
      text: "前端总结",
      items: [
        { text: "markdown常用icon", link: "/fe/2021-12-31-md-icon" },
        { text: "git常用命令", link: "/fe/2022-05-07-git" },
        { text: "vue3总结", link: "/fe/2022-05-12-vue3" },
        { text: "开发规范", link: "/fe/2022-05-15-guifan" },
        { text: "Typescript常用", link: "/fe/2022-05-20-typescript" },
        { text: "npm常用命令", link: "/fe/2022-05-21-npm" },
      ],
    },
  ];
}

function getDailySidebar() {
  return [
    {
      text: "2023年每日笔记",
      items: [
        {
          text: "一些小工具",
          link: "/daily/",
        },
        { text: "2023-04", link: "/daily/2023-04" },
      ],
    },
  ];
}
