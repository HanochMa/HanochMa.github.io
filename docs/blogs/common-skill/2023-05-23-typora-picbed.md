# Typora+PicGo+Github无缝上传图片

## Typora

typora是一个markdown编辑器，特别好用，免费试用15天之后爱不释手，于是我付费了，本站博客都是用这个编辑器写的（我目前就只激活了1台设备，还可以激活2台，想要白嫖的可以找我）。[官网地址](https://typoraio.cn/)

## PicGo

picgo是一个图片上传插件，可以把图片上传到各个平台，包括腾讯云COS、阿里云OOS、SM.MS、GitHub等等，由于腾讯和阿里都是要付费的，SM.MS太不稳定，上传5张就能失败3张，果断选择GitHub，稳定性尚可，还免费。

## 开始操作

### github账号

第一步，注册一个github账号，[github](https://github.com/)

### 新建仓库

![image-20230523145323661](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/typora-pic1.png)

填写项目名、勾选public，Create repository



### 下载PicGo

[PicGo官网](https://molunerfinn.com/PicGo/)点击免费下载，选择自己的电脑平台下载

![image-20230523145835885](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/typora-pic2.png)



### 图床设置

设置图床，选择Github，编辑配置

![image-20230523150102323](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/typora-pic3.png)

这里需要我们填写一些信息，就是刚才我们github的仓库路径、分支、目录以及token

![image-20230523150224418](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/typora-pic4.png)

注意，这里的Token不是我们的SSH Key，是需要在github里面去生成的，下面会讲



### 生成GitHub Token

点击Github右上角头像，选择Settings，进入我们的[Settings页面](https://github.com/settings/profile)

页面滑到最下面有个 Developer settings 选项

![image-20230523150722977](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/typora-pic6.png)

点进去之后选择Personal aceess tokens，下面有两个选项，**Fine-grained tokens**和**Tokens(classic)**，有什么区别呢，简单来说，前者可以提供更细粒度的权限控制，涵盖仓库级、workflow、actions等一类的读写权限，github官方推荐是使用这个，更加安全。所以我们选择**Fine-grained tokens**，点击Generate new token

![image-20230523151313792](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/typora-pic7.png)

生成token需要我们填写一些信息，token名、有效期（最多可以选择一年）、仓库权限

![image-20230523151743681](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/typora-pic8.png)

这里的**Repository permissions**下建议全给最高权限，即 Read and Write，点击下拉菜单即可给每项操作设置权限，下面的**Account permissions**不用管，直接点击Generate token 生成。

注意：生成完以后会显示你的token，直接复制到PicGo的token中。

### 集成到Typora

到这里你已经可以使用PicGo去上传图片了，但是我们平常一般都是在Typora中编辑文档，要上传图片的时候去PicGo里去上传，完成以后再复制到Typora中，来回切换还是显得有点麻烦。我们可以把PicGo集成到Typora中。

打开Typora，左上角 文件 -> 偏好设置 -> 图像

上传服务选择PicGo(app),路径输入PicGo的安装路径，比如我是安装在C盘的，路径是C:\Users\xxx\AppData\Local\Programs\PicGo\PicGo.exe

![image-20230523152827216](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/typora-pic10.png)

完成之后我们可以点击**验证图片上传选项**测试一下，typora会给我们的github上传几张图片用来测试，显示上传成功即可。

### 完成

这样我们就可以在Typora里上传图片啦，不管是剪切板的截图还是本地图片，复制到Typora里面之后，编辑的时候鼠标右键选中图片-上传图片即可

## 一些问题

如果图片上传失败，我们可以在PicGo 的log文件里面查看日志，文件最底下是最新的日志

![image-20230523153344638](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/typora-pic11.png)



### statusCode: 422

我们可能会遇到上传失败，日志里显示这样的错误

```json
2023-05-23 15:02:56 [PicGo ERROR] {
  "method": "PUT",
  "url": "https://api.github.com/repos/HanochMa/PictureBed/contents/blogs/typora-pic3.png",
  "statusCode": 422,
  "message": "Request failed with status code 422",
  "stack": {},
  "response": {
    "status": 422,
    "statusCode": 422,
    "body": {
      "message": "Invalid request.\n\n\"sha\" wasn't supplied.",
      "documentation_url": "https://docs.github.com/rest/reference/repos#create-or-update-file-contents"
    }
  }
} 
```

这是因为github不允许上传相同文件名的图片，即使你的文件是不同的，我们可以在PicGo里面把**上传前重命名**和**时间戳重命名**这两个选项打开，之后上传的时候会让我们重命名文件，重命名完确定就可以上传啦。

![image-20230523153654671](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/typora-pic12.png)



### socket hang up

有时候网络波动，会有这样的错误,重新上传一次即可

```json
2023-05-23 15:08:44 [PicGo ERROR] {
  "method": "PUT",
  "url": "https://api.github.com/repos/HanochMa/PictureBed/contents/blogs/typora-pic5.png",
  "statusCode": 0,
  "message": "socket hang up",
  "stack": "Error: socket hang up\n    at connResetException (node:internal/errors:691:14)\n    at TLSSocket.socketOnEnd (node:_http_client:471:23)\n    at TLSSocket.emit (node:events:406:35)\n    at endReadableNT (node:internal/streams/readable:1343:12)\n    at processTicksAndRejections (node:internal/process/task_queues:83:21)",
  "response": {
    "status": 0,
    "statusCode": 0,
    "body": ""
  }
} 
```

### 如何在上传前对图片进行压缩

回到PicGo，进入左侧面板**插件设置**，我们下载社区里的插件`tinypng`使用tinypng对图片进行压缩后上传，下载完成后，点击**插件右下角配置 -> 配置plugin**，由于我们需要使用tinypng的api对图片进行压缩，需要在[tinypng官网](https://tinypng.com/developers)注册开发者账号获取个人的API key（每月前500次调用免费），将我们的API key配置到插件面板中，启用插件即可。





<git-talk />