const path = require("path");
const express = require('express')
const app = express()


var seller = require('./public/seller.json') //本地json文件数据
var goods = require('./public/goods.json') //本地json文件数据
var ratings = require('./public/ratings.json') //本地json文件数据
var apiRoutes = express.Router();
app.use('/api', apiRoutes)


function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    before(app) {
      app.get('/api/seller', (req, res) => {
        res.json({
          errno: 0, // 这里是你的json内容
          data: seller
        })
      })
      app.get('/api/goods', (req, res) => {
        res.json({
          errno: 0, // 这里是你的json内容
          data: goods
        })
      })
      app.get('/api/ratings', (req, res) => {
        res.json({
          errno: 0, // 这里是你的json内容
          data: ratings
        })
      })
      
    },
    // open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null //设置跨域，即将本文件内任何没有匹配到的静态文件，都指向跨域地址
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set("components", resolve("src/components"))
      .set("common", resolve("src/assets/common"))
      .set("api", resolve("src/api"));
  }
}
