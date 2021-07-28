const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const glob = require("glob");
const webpack = require("webpack");
const isProd = process.env.NODE_ENV === "production";
console.log(isProd)
const config = {
  //do stuff with the webpack config...
  mode: isProd ? "production" : "development",
  entry: {
    app: [
      // "webpack-dev-server/client?http://0.0.0.0:9000/",
      // "webpack/hot/only-dev-server",
      "./src/index.tsx",
    ],

    Widget: ["./src/lib/widget.ts"],
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
    library: "[name]",
    libraryTarget: "umd",
    libraryExport: "default",
  },
  // devtool: "source-map",
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".css",
      ".txt",
      ".svg",
      ".png",
      ".jpg",
      ".jpeg",
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        include: [resolve("src")],
        loader: "ts-loader",
        options: {
          transpileOnly: false,
          compilerOptions: {
            module: "es2015",
          },

          configFile: require.resolve("./tsconfig-widget.json"),
        },
      },
      {
        test: /\.(scss|css)$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "resolve-url-loader",
            // options: {...}
          },
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          REACT_APP_CHAT: "true",
          REACT_APP_FAQ: "true",
          REACT_APP_CALLBACK: "true",
          REACT_APP_TICKET: "true",
          NODE_ENV: JSON.stringify("production"),
        },
      },
      // process: { env: { ...process.env } },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      hash: true,
      filename: "index.html",
      inject: "body",
      excludeChunks: ["widget"],
    }),
  ],
};
if (isProd) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  config.devServer = {
    port: 9000,
    contentBase: join(__dirname, "build"),
    open: true,
    hot: true,
    compress: true,
    stats: "errors-only",
    overlay: true,
  };
}

module.exports = config;