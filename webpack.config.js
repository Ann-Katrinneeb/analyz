const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});
// const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false,
            interpolate: require
          }
        }]
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        include: /imageloader/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 15000
          }
        }]
      },
      {
        test: /\.(jpg|png|gif)$/,
        exclude: /imageloader/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: {
                safe: true
              }
            }
          },
          {
            loader: "sass-loader",
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      d3: 'd3',
      Popper: ['popper.js', 'default']
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    HtmlWebpackPluginConfig
  ]
};



// const path = require('path');
// const webpack = require('webpack');
//
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: './src/index.html',
//   filename: 'index.html',
//   inject: 'body',
// })
//
// module.exports = {
//   entry: './src/index.js',
//   module: {
//     rules: [{
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.csv$/,
//         loader: 'csv-loader',
//         options: {
//           dynamicTyping: true,
//           header: true,
//           skipEmptyLines: true
//         }
//       },
//       {
//         test: /\.html$/,
//         use: [{
//           loader: 'html-loader',
//           options: {
//             minimize: false,
//             interpolate: require
//           }
//         }]
//       },
//       {
//         test: /\.(jpg|png|gif)$/,
//         include: /imageloader/,
//         use: [{
//           loader: 'url-loader',
//           options: {
//             limit: 150000
//           }
//         }]
//       },
//       {
//         test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
//         use: [{
//                     loader: 'file-loader',
//                     options: {
//                         name: '[name].[ext]',
//                         outputPath: 'fonts/'
//                     }
//                 }]
//       },
//       {
//         test: /\.(jpg|png|gif)$/,
//         exclude: /imageloader/,
//         use: [
//           'file-loader'
//         ]
//       },
//
//       {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         use: [{
//             loader: "style-loader"
//           },
//           {
//             loader: "css-loader"
//           }
//         ]
//       },
//       {
//         test: /\.scss$/,
//         exclude: /node_modules/,
//         use: [{
//             loader: "style-loader"
//           },
//           {
//             loader: "css-loader"
//           },
//           {
//             loader: "sass-loader"
//           }
//         ]
//       }
//     ]
//   },
//   devtool: 'inline-source-map',
//   plugins: [
//     new webpack.ProvidePlugin({
//       $: 'jquery',
//       jQuery: 'jquery',
//       'window.jQuery': 'jquery',
//       d3: 'd3',
//       Popper: ['popper.js', 'default']
//     }),
//     HtmlWebpackPluginConfig
//   ]
// }
