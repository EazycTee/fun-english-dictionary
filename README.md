# fun-english-dictionary

## 简介

这是一个全英词典，支持模糊搜索（比如输入 `*ment` 可以搜索所有以 "ment" 结尾的单词）。

项目数据源于 [WordsAPI](https://www.wordsapi.com/)，使用 [Vue.js](https://cn.vuejs.org/) 开发。

## 目录结构

```bash
.
├── build/                         # webpack 配置文件
│   └── ...
├── config/                        # 项目配置文件
│   └── ...
├── dist/                          # npm run build 生成的文件
│   └── ...
├── php/                           # php 后端项目文件夹
│   ├── composer.json              # php 模块管理文件
│   ├── search.php                 # 接口文件
│   ├── words.php                  # 接口文件
│   └── wordsapi-keys.php          # WordsAPI key 文件
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── global.css         # 全局 css 文件
│   │   │   └── loaders-reduce.css # Loaders.css 项目精简版
│   │   ├── data/                  # 模拟服务器返回的 json
│   │   │   └── ...
│   │   └── js/
│   │       ├── config.js          # js 请求地址配置文件
│   │       └── ezUtil.js          # js 工具集
│   ├── components/                # vue 组件
│   │   ├── Descriptions.vue
│   │   ├── Home.vue
│   │   ├── List.vue
│   │   └── Word.vue
│   ├── router/
│   │   └── index.js               # Vue Router 配置文件
│   ├── App.vue                    # vue 主组件
│   └── main.js                    # vue 入口文件
├── .babelrc                       # babel 配置文件
├── .gitignore                     # git 忽略内容 配置文件
├── index.html                     # index.html 模板
├── package.json                   # npm 模块说明文件
├── README.md                      # 默认 README 文件
└── ...
```

## 前端配置

前端项目基于 [vue-loader](https://vue-loader.vuejs.org/zh-cn/) 生成，使用了其中的 [webpack](https://vuejs-templates.github.io/webpack/) 模板。

进入项目根目录 `/`，安装依赖：composer
``` bash
$ npm install
```

开发模式：
```bash
$ npm run dev
```
开发模式下需要解决跨域访问接口的问题，或者您也可以使用项目里提供一些的 json 数据 `/src/assets/data`。

版本发布：
```bash
$ npm run build
```

> 工程化的细节可参考 [vuejs-templates](http://vuejs-templates.github.io/webpack/) 以及 [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 后端配置

先在 [WordsAPI](https://www.wordsapi.com/) 注册并申请使用权限（免费服务每天可以请求 2500 次，注册需要绑定信用卡）。

本项目使用 PHP 作为后端语言，您可在项目的 `/php` 文件夹下创建 `wordsapi-keys.php` 文件，并用 `X_Mashape_Key` 和 `X_Mashape_Host` 作为变量名，把两个申请来的权限 keys 存入文件中，放到服务器上（本地服务器亦可）：

```php
<?php
$X_Mashape_Key = "";
$X_Mashape_Host = "";
```

若使用本项目中的 php，需要安装 unirest，进入 `/php` 目录用 composer 安装即可：

```bash
$ composer install
```

或者，您也可以自己另行配置后端。

> 提示：WordsAPI 在大陆内访问似乎响应很慢，建议使用域外的 VPS 搭建服务器。