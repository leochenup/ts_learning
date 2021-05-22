const HtmlPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

let styleLoader = (type) => {
  return [
    "style-loader",
    "css-loader",
    {
      //配置 postcss-loader
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            //postcss的插件
            require("postcss-preset-env")(/*optoins*/),
          ],
        },
      },
    },
    type + "-loader",
  ];
};

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: styleLoader("less"),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: styleLoader("sass"),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, "dist"),
    port: 3000,
    open: true,
    hot: true,
  },
  mode: "development",
  target: "web",
  resolve: {
    extensions: [".ts", ".js"],
  },
};
