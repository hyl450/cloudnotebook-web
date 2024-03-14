# cloudnotebook-web
cloudnotebook-web云笔记前台vue项目

将vue项目上传到Linux服务器，编译运行
# 进入vue项目的根目录
  cd /home/web
# 安装依赖
  npm install
# 编译打包

#####1.config/prod.env.js中修改为BASE_API: '"http://192.168.150.128:8089/cloudnote-admin"'

#####2.config/dev.env.js中修改为BASE_API: '"http://192.168.150.128:8089/cloudnote-admin"'

#####3.config/index.js中host修改部署主机IP192.168.150.128

**npm run build**
# 启动项目
  npm run dev

vue项目 npm run dev 运行时报错：webpack-dev-server --inline --progress --config build/webpack.dev.conf.js
单独重装 webpack-dev-server模块

npm uninstall webpack-dev-server

npm install webpack-dev-server@2.11.5

npm run dev

vue打包后路径多了个/css/static导致一些css属性、字体文件等 效果不显示。
在build/utils.js文件中添加publicPath:’…/…/’,重新打包即可

if (options.extract) {
  return ExtractTextPlugin.extract({
	use: loaders,
	fallback: "vue-style-loader",
	publicPath: "../../"
  });
} else {
  return ["vue-style-loader"].concat(loaders);
}

关于Vue项目中favicon.ico的应用配置favicon.ico请求
在开发环境中，配置 webpack.dev.conf.js里的plugins
new HtmlWebpackPlugin里加上 favicon: './static/ico/favicon.ico',相对路径
项目打包部署，便配置 webpack.prod.conf.js里的plugins
new HtmlWebpackPlugin里加上 favicon: './static/ico/favicon.ico',相对路径
