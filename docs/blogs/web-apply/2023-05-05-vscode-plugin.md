# 深入浅出vscode插件

## 写在前面

vscode相信大家都不陌生，对于咱们前端来说是一款很称手的开发工具了。功能强大，提示友好，还有不错的性能和颜值，微软自推出这款IDE后很快就受到很多开发者的青睐，但是再强大的IDE也不可能面面俱到，把什么功能都塞进去，于是设计者推出了**插件**的概念，框架只提供一个基本的壳子，由插件去扩展和丰富它的功能。

## vscode插件能做什么

1. 不受限的磁盘访问
2. 自定义命令、快捷键、菜单
3. 自定义跳转、自动补全、悬浮提示
4. 自定义设置、欢迎页
5. 自定义webview
6. 自定义左侧功能面板
7. 新增语言支持
8. ......

总的来说，只有想不到，没有做不到，但至于可以开发什么样的插件、实现什么样的功能、以什么样的形式呈现，这就要靠我们从工作和生活中去发现，去找灵感并提炼了。

## 项目初始化

```bash
// 安装微软官方脚手架
npm install -g yo generator-code

// 初始化项目
yo code
```

跟着提示一步步操作，脚手架提供了各种不同功能的模版，根据功能需求选择。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-plugin1.png)

### 项目结构

项目结构很简单，主要是两个文件，**extension.js**(插件入口文件，实现插件功能) 和 **package.json**(清单文件，功能配置)

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-plugin2.png)

### 配置文件解析

pakage.json是vscode插件的核心，注册插件功能、以及插件何时被激活等等都是在这里完成。

```json
{
	// 插件的名字，应全部小写，不能有空格
    "name": "vscode-plugin-demo",
	// 插件的友好显示名称，用于显示在应用市场，支持中文
    "displayName": "VSCode插件demo",
	// 描述
    "description": "VSCode插件demo",
	// 关键字，用于应用市场搜索
    "keywords": ["vscode", "plugin", "demo"],
	// 版本号
    "version": "1.0.0",
	// 发布者，如果要发布到应用市场的话，这个名字必须与发布者一致
    "publisher": "maheng",
	// 表示插件最低支持的vscode版本
    "engines": {
        "vscode": "^1.27.0"
    },
	// 插件应用市场分类，可选值： [Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs]
    "categories": [
        "Other"
    ],
	// 插件图标，至少128x128像素
    "icon": "images/icon.png",
	// 扩展的激活事件数组，可以被哪些事件激活扩展，后文有详细介绍
    "activationEvents": [
        "onCommand:extension.sayHello"
    ],
	// 插件的主入口
    "main": "./src/extension",
	// 贡献点，整个插件最重要最多的配置项
    "contributes": {
		// 插件配置项
		"configuration": {
            "type": "object",
			// 配置项标题，会显示在vscode的设置页
            "title": "vscode-plugin-demo",
            "properties": {
				// 这里我随便写了2个设置，配置你的昵称
                "vscodePluginDemo.yourName": {
                    "type": "string",
                    "default": "guest",
                    "description": "你的名字"
                },
				// 是否在启动时显示提示
                "vscodePluginDemo.showTip": {
                    "type": "boolean",
                    "default": true,
                    "description": "是否在每次启动时显示欢迎提示！"
                }
            }
        },
		// 命令
        "commands": [
            {
                "command": "extension.sayHello",
                "title": "Hello World"
            }
        ],
		// 快捷键绑定
        "keybindings": [
            {
                "command": "extension.sayHello",
                "key": "ctrl+f10",
                "mac": "cmd+f10",
                "when": "editorTextFocus"
            }
        ],
		// 菜单
        "menus": {
			// 编辑器右键菜单
            "editor/context": [
                {
					// 表示只有编辑器具有焦点时才会在菜单中出现
                    "when": "editorFocus",
                    "command": "extension.sayHello",
					// navigation是一个永远置顶的分组，后面的@6是人工进行组内排序
                    "group": "navigation@6"
                },
                {
                    "when": "editorFocus",
                    "command": "extension.demo.getCurrentFilePath",
                    "group": "navigation@5"
                },
                {
					// 只有编辑器具有焦点，并且打开的是JS文件才会出现
                    "when": "editorFocus && resourceLangId == javascript",
                    "command": "extension.demo.testMenuShow",
                    "group": "z_commands"
                },
                {
                    "command": "extension.demo.openWebview",
                    "group": "navigation"
                }
            ],
			// 编辑器右上角图标，不配置图片就显示文字
            "editor/title": [
                {
                    "when": "editorFocus && resourceLangId == javascript",
                    "command": "extension.demo.testMenuShow",
                    "group": "navigation"
                }
            ],
			// 编辑器标题右键菜单
            "editor/title/context": [
                {
                    "when": "resourceLangId == javascript",
                    "command": "extension.demo.testMenuShow",
                    "group": "navigation"
                }
            ],
			// 资源管理器右键菜单
            "explorer/context": [
                {
                    "command": "extension.demo.getCurrentFilePath",
                    "group": "navigation"
                },
                {
                    "command": "extension.demo.openWebview",
                    "group": "navigation"
                }
            ]
        },
		// 代码片段
        "snippets": [
            {
                "language": "javascript",
                "path": "./snippets/javascript.json"
            },
            {
                "language": "html",
                "path": "./snippets/html.json"
            }
        ],
		// 自定义新的activitybar图标，也就是左侧侧边栏大的图标
        "viewsContainers": {
            "activitybar": [
                {
                    "id": "demaxiya",
                    "title": "德玛西亚",
                    "icon": "images/demaxiya.svg"
                }
            ]
        },
		// 自定义侧边栏内view的实现
        "views": {
			// 和 viewsContainers 的id对应
            "LOL": [
                {
                    "id": "demaxiya",
                    "name": "德玛西亚"
                },
                {
                    "id": "jifengjianhao",
                    "name": "疾风剑豪"
                },
                {
                    "id": "wujijiansheng",
                    "name": "无极剑圣"
                }
            ]
        },
		// 图标主题
        "iconThemes": [
            {
                "id": "testIconTheme",
                "label": "测试图标主题",
                "path": "./theme/icon-theme.json"
            }
        ]
    },
	// 同 npm scripts
    "scripts": {
        "postinstall": "node ./node_modules/vscode/bin/install",
        "test": "node ./node_modules/vscode/bin/test"
    },
	// 开发依赖
    "devDependencies": {
        "typescript": "^2.6.1",
        "vscode": "^1.1.6",
        "eslint": "^4.11.0",
        "@types/node": "^7.0.43",
        "@types/mocha": "^2.2.42"
    },
	// 后面这几个应该不用介绍了
    "license": "SEE LICENSE IN LICENSE.txt",
    "bugs": {
        "url": "https://github.com/HanochMa/vscode-Andrew/issues"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/HanochMa/vscode-Andrew"
    },
	// 主页
    "homepage": "https://github.com/HanochMa/vscode-Andrew/blob/main/README.md"
}
```

## 功能开发

### hello world

上文中我们说过，vscode插件的核心功能是在extension.js和package.json这两个文件中实现，现在我们从hello world开始，实现一个简单的插件。

1.在插件入口文件extension中写我们的插件逻辑，这里我们实现一个命令，在vscode中弹出一个hello world的message

```javascript
// extension.js
const vscode = require('vscode');

//当插件被激活时调用，具体插件何时被激活，可在package.json中配置
function activate(context) {
  
  //注册一个vscode命令
	let disposable = vscode.commands.registerCommand('helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from demo-plugin!');
	});
 	//将命令push进上下文中
	context.subscriptions.push(disposable);
}
//插件销毁时调用
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
```

2.在package.json中配置我们的插件选项，也就是功能要怎样调用，这里我们配置一个命令，当执行命令时，触发插件的功能。

```json
// pakage.json
"contributes": {
		"commands": [{
      // 要执行的命令，就是我们在extension中定义的命令
      "command": "helloWorld",
      // 命令的标题，我们在UI中通过 Hello World去执行这个命令
      "title": "Hello World"
		}]
	},
```

完成～很简单有木有

## 运行调试

接下来我们调试一下刚才写的demo，看看是什么效果。

默认情况下，工程已经帮我们配置好了调试相关参数（有兴趣的可以查看.vscode/launch.json文件的写法），只需要到调试面板选中要调试的项目(仅仅是第一次需要，后续会自动记住上次调试的项目)，然后按下F5就会弹出一个新的vscode窗口，这个新窗口则是我们的调试窗口。简单的来说，新窗口中vscode自动帮我们安装了刚才写的插件，供我们调试代码。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-plugin3.png)



在新窗口中（title上会有个[拓展开发宿主]用来区分），我们按下Ctrl+Shift+P，运行命令Hello World，即可看到效果。

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-plugin4.png)

## 打包发布升级

插件开发完了，如何发布出去分享给他人呢？主要有3种方法：

1. 直接把文件夹发给别人，让别人找到vscode的插件存放目录并放进去，然后重启vscode，一般不推荐
2. 打包成vsix插件，然后发送给别人安装，如果你的插件涉及机密不方便发布到应用市场，可以尝试采用这种方式
3. 注册开发者账号，发布到官网应用市场，这个发布和npm一样是不需要审核的

### 本地打包

无论是打包成vsix文件给别人安装还是发不到应用商店，都需要先在本地进行打包，借助微软官方提供的vsce这个工具

```bash
// 安装
npm i vsce -g

// 打包成vsix文件
vsce package
```

### 发布应用商店

1.要发布到线上首先要有一个微软账号，没有的话可以先注册一个(可以百度)



2.用微软账号创建一个Azure组织,Visual Studio Code的应用市场基于微软自己的Azure DevOps，插件的身份验证、托管和管理都是在这里（https://aka.ms/SignupAzureDevOps）



3.创建令牌，类似github的ssh key，把线上生成的一个code存到本地,标识当前发布人身份。



点击右上角头像 -> Personal access tokens

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-plugin2.png)



newtoken ->输入token名

![img](https://github.com/HanochMa/PictureBed/raw/main/blogs/vscode-plugin6.png)

点击create后会生成一个token（**注意：网站不会帮你保存，生成后需要马上copy下来**）



4.创建发布账号

```bash
vsce create-publisher your-name
// 依次输入名称、邮箱（微软账号的邮箱）、令牌（上一步生成的token）
//这里的name一定要和pakage.json里的publisher统一，不然发不上去
```

5.创建成功后会默认登陆这个账号，然后就可以直接发布了，命令很简单

```bash
vsce publish
```

过几分钟后就可以在应用市场搜到你的插件了



## 常用功能实现

介绍完整个流程，当然，我们不能只满足写hello world，微软也提供了非常丰富的api，用来拓展我们的插件功能。



### 自动补全

通过vscode.languages.registerCompletionItemProvider方法注册自动补全，实现输入this.dependencies时自动带出package.json中依赖项

```javascript
function provideCompletionItems(document, position, token, context) {
    const line = document.lineAt(position);
  	// 获取项目目录
    const projectPath = util.getProjectPath(document);

    // 只截取到光标位置为止，防止一些特殊情况
    const lineText = line.text.substring(0, position.character);
    // 简单匹配，只要当前光标前的字符串为`this.dependencies.`都自动带出所有的依赖
    if(/(^|=| )\w+\.dependencies\.$/g.test(lineText)) {
        const json = require(`${projectPath}/package.json`);
        const dependencies = Object.keys(json.dependencies || {}).concat(Object.keys(json.devDependencies || {}));
        return dependencies.map(dep => {
            // vscode.CompletionItemKind 表示提示的类型
            return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field);
        })
    }
}

module.exports = function(context) {
    // 注册代码建议提示，只有当按下“.”时才触发
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems,
        resolveCompletionItem
    }, '.'));
};
```



### 代码片段

平时我们在开发过程中，一些导入导出语句和console.log调试语句会频繁用到，这时候我们可以通过vscode插件简化操作，只用输入几个字母即可带出一个完整的代码块，通过snippets自定义配置

```javascript
// 节选javacript code snippets
{
  "import": {
    "prefix": "imp",
    "body": "import ${2:moduleName} from '${1:module}';$0",
    "description": "Imports entire module statement in ES6 syntax"
  },
  "importNoModuleName": {
    "prefix": "imn",
    "body": "import '${1:module}';$0",
    "description": "Imports entire module in ES6 syntax without module name"
  }
}
```



### 自定义webview

vscode允许我们自定义webview，并在这个webview上做任何我们想做的事情，但是要注意几点

- Does this functionality really need to live within VS Code? Would it be better as a separate application or website?
- Is a webview the only way to implement your feature? Can you use the regular VS Code APIs instead?
- Will your webview add enough user value to justify its high resource cost?

上面是微软官方给出的几点警示，翻译出来简单来说就是在使用webview之前要先确认其价值，是否有别的方式可以实现，因为webview会带来一定程度上的性能开销。



#### 创建webview

通过vscode.window.createWebviewPanel即可创建一个webview，和上面一样，将创建好的实例push进上下文对象中，配置命令即可打开

```javascript
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        'catCoding', // webview类型，相当于一个标识符
        'Cat Coding', // 标题
        vscode.ViewColumn.One, // 在vscode的哪一块哪展示这个webview
        {} // 其他options，参考官方文档
      );

      // 设置html
      panel.webview.html = getWebviewContent();
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cat Coding</title>
    </head>
    <body>
        <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    </body>
    </html>`;
}
```



#### 消息通信

Webview不能直接调用任何VSCodeAPI，但是，它唯一特别之处就在于多了一个名叫acquireVsCodeApi的方法（在全局window上）执行这个方法会返回一个mini版的vscode对象，这个对象里面有3个可以和插件通信的API：

getState()

setState()

postMessage()

```javascript
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          enableScripts: true
        }
      );

      panel.webview.html = getWebviewContent();

      // 处理从webview中传过来的消息
      panel.webview.onDidReceiveMessage(
        message => {
          switch (message.command) {
            case 'alert':
              vscode.window.showErrorMessage(message.text);
              return;
          }
        },
        undefined,
        context.subscriptions
      );
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        (function() {
            const vscode = acquireVsCodeApi();
            const counter = document.getElementById('lines-of-code-counter');

            let count = 0;
            setInterval(() => {
                counter.textContent = count++;

                // Alert the extension when our cat introduces a bug
                if (Math.random() < 0.001 * count) {
                    vscode.postMessage({
                        command: 'alert',
                        text: '🐛  on line ' + count
                    })
                }
            }, 100);
        }())
    </script>
</body>
</html>`;
}
```

#### 生命周期

webview由创建它的扩展程序所有，返回的panel对象必须自己保存，如果你的扩展程序丢失了这个引用，那么将无法再次重新访问该webview，即使Web视图继续显示在vscode中。

用户也可以随时关闭webview面板。当用户关闭webview面板时，webview本身将被销毁，此时不能再使用panel引用，否则将会出现异常，可以通过监听onDidDispose事件在这里面做一些销毁操作。

可以通过panel.dispose()方法主动关闭webview

```javascript
const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      let iteration = 0;
      const updateWebview = () => {
        const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
        panel.title = cat;
        panel.webview.html = getWebviewContent(cat);
      };

      updateWebview();
      const interval = setInterval(updateWebview, 1000);

      panel.onDidDispose(
        () => {
          // When the panel is closed, cancel any future updates to the webview content
          clearInterval(interval);
        },
        null,
        context.subscriptions
      );
    })
  );
}
```

### 自定义侧边栏

未完待续...



## 参考文档

官方api文档 https://code.visualstudio.com/api/references/vscode-api