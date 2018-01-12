# fun-english-dictionary

## 简介

这是一个全英词典，支持模糊搜索（比如输入 `*ment` 可以搜索所有以 "ment" 结尾的单词）。

词典数据源于 [WordsAPI](https://www.wordsapi.com/)，界面使用 [Vue.js](https://cn.vuejs.org/) 开发。

> [Demo](http://dict.eazyc.info/)

## 目录结构

```bash
.
├── build/                            # webpack 配置文件
│   └── ...
├── config/                           # 项目配置文件
│   └── ...
├── dist/                             # npm run build 生成的文件
│   └── ...
├── php/                              # php 后端项目文件夹
│   ├── composer.json                 # php 模块管理文件
│   ├── search.php                    # 接口文件
│   ├── words.php                     # 接口文件
│   └── wordsapi-keys.php             # WordsAPI key 文件
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── global.css            # 全局 css 文件
│   │   │   └── loaders-reduce.css    # Loaders.css 项目精简版
│   │   ├── data/                     # 模拟服务器返回的 json
│   │   │   └── ...
│   │   └── js/
│   │       ├── config.js             # js 请求地址配置文件
│   │       └── ezUtil.js             # js 工具集
│   ├── components/                   # vue 组件
│   │   ├── Descriptions.vue
│   │   ├── Home.vue
│   │   ├── List.vue
│   │   └── Word.vue
│   ├── router/
│   │   └── index.js                  # Vue Router 配置文件
│   ├── App.vue                       # vue 主组件
│   └── main.js                       # vue 入口文件
├── .babelrc                          # babel 配置文件
├── .gitignore                        # git 忽略内容 配置文件
├── index.html                        # index.html 模板
├── package.json                      # npm 模块说明文件
├── README.md                         # 默认 README 文件
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
开发模式下需要解决跨域访问接口的问题，或者您也可以使用项目里提供一些的 json 数据 `/src/assets/data`，访问路径配置在 `List.vue` 和 `Word.vue` 里。

版本发布：
```bash
$ npm run build
```

> 工程化的细节可参考 [vuejs-templates](http://vuejs-templates.github.io/webpack/) 以及 [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 后端配置

先在 [WordsAPI](https://www.wordsapi.com/) 注册并申请使用权限（免费服务每天可以请求 2500 次，注册也需要绑定信用卡）。

本项目使用 PHP 作为后端语言，为了方便管理，放在了 `/php` 文件夹下。为了使用 WordsAPI，您可在该文件夹下创建 `wordsapi-keys.php` 文件，并用 `X_Mashape_Key` 和 `X_Mashape_Host` 作为变量名，把注册申请的 keys 存入文件中：

```php
<?php
$X_Mashape_Key = "";
$X_Mashape_Host = "";
```

项目中的 php 使用了 [unirest](http://unirest.io/)，进入 `/php` 目录用 composer 即可安装：

```bash
$ composer install
```

> WordsAPI 在大陆内访问响应比较慢，建议使用域外的 VPS 搭建服务器。

最后，记得把后端项目放在您部署好的服务器上，然后在 `/src/assets/js/config.js` 配置接口地址。
