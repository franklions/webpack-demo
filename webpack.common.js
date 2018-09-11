 const path = require('path');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require("extract-text-webpack-plugin");
 const CopyWebpackPlugin = require('copy-webpack-plugin');

 module.exports = {
   entry: {
    "routerTable": "./src/routerTable.jsx"
   },
   plugins: [
     new CleanWebpackPlugin(['dist']),
     new ExtractTextPlugin({
       filename: 'assets/css/vendor.styles.css'
       ,
       allChunks: true
      }),
     new HtmlWebpackPlugin({
       title: 'Production',
       filename: 'index.html',
       template: 'src/index.html'
     }),
     new CopyWebpackPlugin([
            { from: __dirname + '/src/assets/libs', to: __dirname + '/dist/assets/libs' }
        ]),
   ],
   optimization:{
    splitChunks:{
     chunks: "async",
     minSize: 30000,
     minChunks: 1,
     maxAsyncRequests: 5,
     maxInitialRequests: 3,
     name: true,
     cacheGroups: {
         default: {
             minChunks: 2,
             priority: -20,
             reuseExistingChunk: true,
         },
         vendors: {
             test: /[\\/]node_modules[\\/]/,
             priority: -10
         }
     }
    }
  },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     publicPath: "/",
    chunkFilename: "[name].bundle.js"
   },
   module: {
       rules:[
           {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                  loader:'file-loader',
                  options:{
                    name :'[name].[ext]',
                    // publicPath: 'dist/',
                    outputPath:'assets/images/'
                  }
                }]
            },
            {
              test:/\.(js|jsx)$/,
              exclude:/node_modules/,
              use:{
                loader:'babel-loader',
                options:{}
            }
            }   
       ]
   }
 };