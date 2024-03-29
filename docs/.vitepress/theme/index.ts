import Theme from 'vitepress/theme'
import './styles/vars.scss'
import './styles/style.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vitepress-markdown-timeline/dist/theme/index.css'
//@ts-ignore
import Comment from '../../../src/components/gitTalk.vue'
export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx)
    ctx.app.use(ElementPlus)
    ctx.app.component("git-talk", Comment)
  }
}