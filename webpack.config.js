const path    = require('path');
const webpack = require('webpack');

/**
 * 【ExtractTextPlugin】：
 *        1.其实，也可以生成多个实例（每个实例，可以生成名称不同的dist/css文件）
 */
const VueLoaderPlugin     = require('vue-loader/lib/plugin');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const VueStyleLoader_name = 'vue-style-loader';
const NodeEnv             = process.env.NODE_ENV;
const outputFilename      = 'test-cp-vue';
const outputPath          = './lib-cp/vue';
console.log('打包入口文件', NodeEnv);
console.log('不能写入 .env 的变量', outputFilename);

/**
 * @type { import('webpack').Configuration  }
 */
const WebpackCfg = {
  // 修改打包入口
  entry      : NodeEnv === 'development'
    ? './src/main.ts'
    : './cp/vue/to-build.js',
  output     : {
    path          : path.resolve(__dirname, outputPath),
    publicPath    : outputPath,
    filename      : outputFilename + '.js',
    library       : outputFilename, // 指定的就是你使用require时的模块名
    libraryTarget : 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
    umdNamedDefine: true, // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  },
  module     : {
    rules: [
      {
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
          fallback: VueStyleLoader_name,
          use     : ['css-loader'],
        }),
      },
      {
        test: /\.scss$/,
        use : ExtractTextPlugin.extract({
          fallback: VueStyleLoader_name,
          use     : ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.sass$/,
        use : ExtractTextPlugin.extract({
          fallback: VueStyleLoader_name,
          use     : ['css-loader', 'sass-loader?indentedSyntax'],
        }),
      },
      // 新增styl
      {
        test: /\.styl(us)?$/,
        use : ExtractTextPlugin.extract({
          fallback: VueStyleLoader_name,
          use     : ['css-loader', 'stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'],
        }),
      },
      // TIP——————————————————————————————————分隔线——————
      // 新增字体
      {
        // 此处，之前在网上找的方法，漏掉了svg。我们手动补上。
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        /**
         * 此处，之前在网上找的方法，url-loader无法加载，我们换成file-loader
         * WHY 非常奇怪！！！这里在【之前】，必须要url-loader，file-loader反而不行；而【现在】，又是url-loader不行，只能用file-loader
         */
        use : 'url-loader',
      },
      // 对TS的编译。
      {
        test   : /\.tsx?$/,
        loader : 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      //
      {
        test   : /\.vue$/,
        loader : 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss'  : [
              VueStyleLoader_name,
              'css-loader',
              'sass-loader',
            ],
            'sass'  : [
              VueStyleLoader_name,
              'css-loader',
              'sass-loader?indentedSyntax',
            ],
            'stylus': [
              VueStyleLoader_name,
              'css-loader',
              'stylus-loader',
            ],
          },
          // other vue-loader options go here
        },
      },
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
        query  : {
          presets: ['es2015'],                                // TIP 注意此处的版本！！！！！！
          plugins: [
            'syntax-dynamic-import',
          ],
        },
      },
      //
      {
        test   : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader : 'url-loader',
        options: {
          limit: 10000,
          // name: utils.assetsPath('img/[name].[hash:7].[ext]')
          // 生成的文件的存放目录
          // name : 'dist/[name].[ext]'
        },
      },
    ],
  },
  resolve    : {
    alias     : {
      'vue$': 'vue/dist/vue.esm.js',
      // 新增
      'root': path.resolve(__dirname, './src'),
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  devServer  : {
    historyApiFallback: true,
    noInfo            : true,
    overlay           : true,
  },
  performance: {
    hints: false,
  },
  devtool    : '#eval-source-map',
  // 新增
  plugins    : [
    // new HtmlWebpackPlugin({  // Also generate a test.html
    //   outputFilename,
    // })
    //

    new VueLoaderPlugin(),
    new ExtractTextPlugin({
      disable  : false,
      filename : `./${outputFilename}.css`,
      allChunks: true,
    }),

  ],
};

if (NodeEnv === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      // 似乎【3.12】有这个属性。（.d.ts是3.8的）
      compress : {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}

module.exports = WebpackCfg;
