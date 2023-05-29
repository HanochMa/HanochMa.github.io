# 自动打包部署Github Pages

## workflow介绍

workflow（工作流）是 GitHub Actions 的核心组成部分之一，可以帮助开发人员自动化执行各种任务，从而提高生产力、加速开发流程、提高代码质量等，实现

GitHub Actions 工作流程文件的目录是在项目根目录.github/workflows/ 中存放 ，该目录的文件名必须以 .yml 或 .yaml 为后缀名，否则 GitHub 将无法识别该文件为工作流程文件。这些工作流程文件可用于自动化执行项目中的各种任务，例如构建、测试、部署等。

## 如何实现在push时自动打包构建

下面我们通过本博客的一个workflow文件来逐一分析，是怎么实现推送代码的时候实现自动构建的。

```yaml
name: build to my github

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    # strategy:
    #   matrix:
    #     node-version: [node16]
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: 16
        
      - name: Install pnpm
        id: pnpm-install
        uses: pnpm/action-setup@v2
        with:
          version: 7
          run_install: false

      - name: Get pnpm store
        id: pnpm-store
        shell: bash
        run: echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT

      - name: Setup pnpm cache
        uses: actions/cache@v3
        with:
          path: ${{ steps.pnpm-store.outputs.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm i --frozen-lockfile

      - name: Build
        run: pnpm run build

      # - name: CreateTag
      #   run git tag -a
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist

```



文件中包含以下这些部分：

- name：定义工作流程名称为 “build to my github”。
- on：定义工作流程触发条件，包括在 master 分支上推送时构建，也可以配置Pull Request或者手动触发时执行工作流程。
- jobs：定义工作流程中的工作。
  1. runs-on：定义使用的操作系统为 ubuntu-latest。
  2. steps：定义构成工作流程的一系列步骤。
  3. Checkout：将代码检出到工作目录。
  4. Setup Node.js：安装 Node.js 运行时环境。
  5. Install [pnpm](https://so.csdn.net/so/search?q=pnpm&spm=1001.2101.3001.7020)：安装依赖管理工具 pnpm。（这里我使用的是pnpm，如果使用npm构建，可直接跳到第步骤8，使用npm安装依赖）
  6. Get pnpm store：获取 pnpm 仓库路径并存储到环境变量 GITHUB_OUTPUT 中。
  7. Setup pnpm cache：使用 GitHub Actions 缓存功能设置 pnpm 缓存。
  8. Install dependencies：安装项目依赖。
  9. Build：构建文档。
  10. Deploy：发布文档到 GitHub Pages 上，前提是代码已经推送到 master 分支或手动触发工作流程，并且在输入参数中指定了 deploy=true。

## Github Pages

上方工作流，会创建一个gh-pages分支，选择该分支作为github pages使用的分支即可，只要往master分支推送代码，github就会自动打包部署项目到github pages上。



<git-talk />