const config = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express')
const app = express()
const webpack = require('webpack');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(`/assets`, express.static(`${__dirname}/assets`))
app.get('*',(req, res, next) => {
  res.sendFile(`${__dirname}/index.html`)
})
app.listen(3000, ()=>{
  console.log('Listening on port 3000')
})