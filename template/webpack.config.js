const path = require("path")
const webpack = require("webpack")
const fs = require("fs")

const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")

const config = {
  entryFile: path.join(__dirname, "../src/index.ts"),
  dist: path.join(__dirname, "../dist")
}

const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json")).toString()
)
const externals = packageJson.dependencies
for (let i in externals) {
  externals[i] = i
}

module.exports = {
  entry: {
    "es-base": config.entryFile
  },
  externals,
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
    alias: {
      src: path.resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        loader: "tslint-loader",
        exclude: [/\.spec\.ts/, /(node_modules)/]
      },
      {
        test: /\.tsx?$/,
        exclude: [/\.spec\.ts/, /(node_modules)/],
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              useCache: true
            }
          }
        ]
      }
    ]
  },
  output: {
    path: config.dist,
    publicPath: "/",
    filename: "[name].js",
    library: "es-base",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new FriendlyErrorsPlugin()
  ]
}
