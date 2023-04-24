import { defineConfig } from "vitepress";
import nav from "./configs/nav";
import sidebar from "./configs/sidebar";
export default defineConfig({
  title: "HanochMa",
  description: "hello world",
  ignoreDeadLinks: true,
  base: "/",

  head: [["link", { rel: "icon", type: "image/png", href: "logo.png" }]],
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.png",
    nav,
    sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/HanochMa" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-04-23～present HanochMa",
    },
  },
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
  },
});
