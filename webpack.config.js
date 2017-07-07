module.exports = {
  entry: ['babel-polyfill',"./src/index.js"],
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    inline: true,
    contentBase: './',
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader:"babel-loader",
        exclude: /(node_modules)/,
        query: {
          presets: ["es2015", "stage-0", "react"]
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 99999
            }
          }
        ]
      }
    ]
  }
}

