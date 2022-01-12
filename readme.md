### 项目打包流程

ionic cordova platform add android / ios
ionic cordova plugin add \*\*\*
ionic cordova build android 打 debug 包
ionic cordova build android --release 正式包
如果没有签名就生成签名 有的话就直接签名 执行下边命令即可

### 常用命令

ionic g page demo 新建页面
ionic g service demo 新建服务
ionic g components demo 新建组件

# 新都生成 keystore

keytool -genkey -alias demo.keystore -keyalg RSA -validity 20000 -keystore demo.keystore

# 新都打包安卓命令（秘钥）

jarsigner -verbose -keystore demo.keystore -signedjar demo.apk platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk demo.keystore

# 打包命令 lanfeng

###

### 目录结构及作用

- config.xml 打包的配置条件 包含 app name,签名，以及一些配置条件
- plugins 项目所依赖的插件
- resources app 的启动页以及 logo 存放的地方
- platforms 打包的平台 里边是平台的配置
- src 项目开发的真正目录
- src/app 开发代码基本都在这里边
- src/myplugins 放自定义的一些插件 比如视频插件等等

### TODO

以及一些公共方法 组件
