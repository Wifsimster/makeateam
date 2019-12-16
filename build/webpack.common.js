const path = require("path")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const packageJson = require("../package.json")

module.exports = {
  entry: [path.join(__dirname, "../src/app")],
  output: {
    filename: "static/js/[name].bundle.js",
    path: path.join(__dirname, "../dist"),
    publicPath: "/"
  },
  resolve: {
    modules: [path.join(__dirname, "../src/"), "node_modules"],
    alias: {
      img: path.join(__dirname, "../static/img/"),
      fonts: path.join(__dirname, "../static/fonts/"),
      api: path.join(__dirname, "../src/api/"),
      components: path.join(__dirname, "../src/components/"),
      pages: path.join(__dirname, "../src/pages/")
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
      BUILD_DATE: JSON.stringify(new Date())
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].bundle.css",
      chunkFilename: "static/css/[id].bundle.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "local"
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/img/[name].[ext]"
        }
      },
      {
        test: /\.(woff(2)?|eot|otf|ttf|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          name: "static/fonts/[name].[ext]"
        }
      }
    ]
  }
}
