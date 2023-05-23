import { defineConfig } from "vitepress";
import { SearchPlugin } from "vitepress-plugin-search";
import nav from "./configs/nav";
import sidebar from "./configs/sidebar";
// import timeline from 'vitepress-markdown-timeline'
const searchOptions: any = {
  encode: false,
  tokenize: "full",
  previewLength: 62,
  buttonLabel: "Search",
  placeholder: "Search docs",
  allow: [],
  ignore: [],
};
export default defineConfig({
  title: "HanochMa",
  description: "hello world",
  ignoreDeadLinks: true,
  base: "/",
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", type: "image/png", href: "logo.png" }],
    ["meta", {name: "baidu-site-verification", content: "codeva-kpyolTmPBl"}],
  ],
  lastUpdated: true,
  themeConfig: {
    outlineTitle: "本页目录",
    lastUpdatedText: "上次更新",
    logo: "/logo.png",
    nav,
    sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/HanochMa" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-04-23～present HanochMa",
    },
  },
  // markdown: {
  //   config: (md) =>{
  //     md.use(timeline)
  //   }
  // },
  vite: {
    server: {
      host: true,
      port: 3000,
      proxy: {
        "/so": {
          target: "http://139.159.245.209:5000", // 代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/so/, ""),
        },
      },
    },
    plugins: [SearchPlugin(searchOptions)],
  },
});
