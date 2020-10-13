const a =
				{
					mode         : 'production',
					context      : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand',
					devtool      : false,
					externals    : {
						vue: {
							commonjs : 'Vue',
							commonjs2: 'Vue',
							amd      : 'Vue',
							root     : 'Vue',
						},
					},
					node         : {
						setImmediate : false,
						process      : 'mock',
						dgram        : 'empty',
						fs           : 'empty',
						net          : 'empty',
						tls          : 'empty',
						child_process: 'empty',
					},
					output       : {
						path         : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\lib-cp',
						filename     : '[name]/index.js',
						publicPath   : '/',
						chunkFilename: 'js/[name].[contenthash:8].js',
						libraryTarget: 'commonjs2',
					},
					resolve      : {
						alias     : {
							'@' : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\src',
							vue$: 'vue/dist/vue.runtime.esm.js',
						},
						extensions: [
							'.tsx',
							'.ts',
							'.mjs',
							'.js',
							'.jsx',
							'.vue',
							'.json',
							'.wasm',
						],
						modules   : [
							'node_modules',
							'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules',
							'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\@vue\\cli-service\\node_modules',
						],
						plugins   : [
							{
								apply               : function nothing() {
									// ¯\_(ツ)_/¯
								},
								makePlugin          : function() { /* omitted long function */
								},
								moduleLoader        : function() { /* omitted long function */
								},
								topLevelLoader      : {
									apply: function nothing() {
										// ¯\_(ツ)_/¯
									},
								},
								bind                : function() { /* omitted long function */
								},
								tsLoaderOptions     : function() { /* omitted long function */
								},
								forkTsCheckerOptions: function() { /* omitted long function */
								},
							},
						],
					},
					resolveLoader: {
						modules: [
							'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\@vue\\cli-plugin-typescript\\node_modules',
							'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
							'node_modules',
							'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules',
							'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\@vue\\cli-service\\node_modules',
						],
						plugins: [
							{
								apply: function nothing() {
									// ¯\_(ツ)_/¯
								},
							},
						],
					},
					module       : {
						noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
						rules  : [
							/* config.module.rule('vue') */
							{
								test: /\.vue$/,
								use : [
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\cache-loader\\dist\\cjs.js',
										options: {
											cacheDirectory : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\.cache\\vue-loader',
											cacheIdentifier: '43ffb6d2',
										},
									},
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\vue-loader\\lib\\index.js',
										options: {
											compilerOptions: {
												whitespace: 'condense',
											},
											cacheDirectory : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\.cache\\vue-loader',
											cacheIdentifier: '43ffb6d2',
										},
									},
								],
							},
							/* config.module.rule('images') */
							{
								test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
								use : [
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\url-loader\\dist\\cjs.js',
										options: {
											limit   : 4096,
											fallback: {
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\file-loader\\dist\\cjs.js',
												options: {
													name: 'img/[name].[hash:8].[ext]',
												},
											},
										},
									},
								],
							},
							/* config.module.rule('svg') */
							{
								test: /\.(svg)(\?.*)?$/,
								use : [
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\file-loader\\dist\\cjs.js',
										options: {
											name: 'img/[name].[hash:8].[ext]',
										},
									},
								],
							},
							/* config.module.rule('media') */
							{
								test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
								use : [
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\url-loader\\dist\\cjs.js',
										options: {
											limit   : 4096,
											fallback: {
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\file-loader\\dist\\cjs.js',
												options: {
													name: 'media/[name].[hash:8].[ext]',
												},
											},
										},
									},
								],
							},
							/* config.module.rule('fonts') */
							{
								test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
								use : [
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\url-loader\\dist\\cjs.js',
										options: {
											limit   : 4096,
											fallback: {
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\file-loader\\dist\\cjs.js',
												options: {
													name: 'static/fonts/[name].[hash:8].[ext]',
												},
											},
										},
									},
								],
							},
							/* config.module.rule('pug') */
							{
								test : /\.pug$/,
								oneOf: [
									/* config.module.rule('pug').rule('pug-vue') */
									{
										resourceQuery: /vue/,
										use          : [
											{
												loader: 'pug-plain-loader',
											},
										],
									},
									/* config.module.rule('pug').rule('pug-template') */
									{
										use: [
											{
												loader: 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\raw-loader\\index.js',
											},
											{
												loader: 'pug-plain-loader',
											},
										],
									},
								],
							},
							/* config.module.rule('css') */
							{
								test : /\.css$/,
								oneOf: [
									/* config.module.rule('css').rule('vue-modules') */
									{
										resourceQuery: /module/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
									/* config.module.rule('css').rule('vue') */
									{
										resourceQuery: /\?vue/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
									/* config.module.rule('css').rule('normal-modules') */
									{
										test: /\.module\.\w+$/,
										use : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
									/* config.module.rule('css').rule('normal') */
									{
										use: [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
								],
							},
							/* config.module.rule('postcss') */
							{
								test : /\.p(ost)?css$/,
								oneOf: [
									/* config.module.rule('postcss').rule('vue-modules') */
									{
										resourceQuery: /module/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
									/* config.module.rule('postcss').rule('vue') */
									{
										resourceQuery: /\?vue/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
									/* config.module.rule('postcss').rule('normal-modules') */
									{
										test: /\.module\.\w+$/,
										use : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
									/* config.module.rule('postcss').rule('normal') */
									{
										use: [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
								],
							},
							/* config.module.rule('scss') */
							{
								test : /\.scss$/,
								oneOf: [
									/* config.module.rule('scss').rule('vue-modules') */
									{
										resourceQuery: /module/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\sass-loader\\dist\\cjs.js',
												options: {
													sourceMap     : true,
													implementation: {
														render         : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														renderSync     : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														info           : 'dart-sass\t1.26.10\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
														types          : {
															Boolean: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Color  : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															List   : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Map    : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Null   : function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Number : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															String : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Error  : function Error() {
																[native code];
															},
														},
														NULL           : {
															toString: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
														},
														TRUE           : {
															value: true,
														},
														FALSE          : {
															value: false,
														},
														cli_pkg_main_0_: function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
													},
												},
											},
										],
									},
									/* config.module.rule('scss').rule('vue') */
									{
										resourceQuery: /\?vue/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\sass-loader\\dist\\cjs.js',
												options: {
													sourceMap     : true,
													implementation: {
														render         : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														renderSync     : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														info           : 'dart-sass\t1.26.10\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
														types          : {
															Boolean: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Color  : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															List   : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Map    : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Null   : function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Number : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															String : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Error  : function Error() {
																[native code];
															},
														},
														NULL           : {
															toString: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
														},
														TRUE           : {
															value: true,
														},
														FALSE          : {
															value: false,
														},
														cli_pkg_main_0_: function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
													},
												},
											},
										],
									},
									/* config.module.rule('scss').rule('normal-modules') */
									{
										test: /\.module\.\w+$/,
										use : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\sass-loader\\dist\\cjs.js',
												options: {
													sourceMap     : true,
													implementation: {
														render         : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														renderSync     : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														info           : 'dart-sass\t1.26.10\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
														types          : {
															Boolean: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Color  : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															List   : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Map    : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Null   : function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Number : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															String : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Error  : function Error() {
																[native code];
															},
														},
														NULL           : {
															toString: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
														},
														TRUE           : {
															value: true,
														},
														FALSE          : {
															value: false,
														},
														cli_pkg_main_0_: function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
													},
												},
											},
										],
									},
									/* config.module.rule('scss').rule('normal') */
									{
										use: [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\sass-loader\\dist\\cjs.js',
												options: {
													sourceMap     : true,
													implementation: {
														render         : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														renderSync     : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														info           : 'dart-sass\t1.26.10\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
														types          : {
															Boolean: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Color  : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															List   : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Map    : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Null   : function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Number : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															String : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Error  : function Error() {
																[native code];
															},
														},
														NULL           : {
															toString: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
														},
														TRUE           : {
															value: true,
														},
														FALSE          : {
															value: false,
														},
														cli_pkg_main_0_: function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
													},
												},
											},
										],
									},
								],
							},
							/* config.module.rule('sass') */
							{
								test : /\.sass$/,
								oneOf: [
									/* config.module.rule('sass').rule('vue-modules') */
									{
										resourceQuery: /module/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\sass-loader\\dist\\cjs.js',
												options: {
													sourceMap     : true,
													implementation: {
														render         : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														renderSync     : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														info           : 'dart-sass\t1.26.10\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
														types          : {
															Boolean: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Color  : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															List   : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Map    : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Null   : function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Number : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															String : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Error  : function Error() {
																[native code];
															},
														},
														NULL           : {
															toString: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
														},
														TRUE           : {
															value: true,
														},
														FALSE          : {
															value: false,
														},
														cli_pkg_main_0_: function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
													},
													sassOptions   : {
														indentedSyntax: true,
													},
												},
											},
										],
									},
									/* config.module.rule('sass').rule('vue') */
									{
										resourceQuery: /\?vue/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\sass-loader\\dist\\cjs.js',
												options: {
													sourceMap     : true,
													implementation: {
														render         : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														renderSync     : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														info           : 'dart-sass\t1.26.10\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
														types          : {
															Boolean: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Color  : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															List   : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Map    : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Null   : function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Number : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															String : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Error  : function Error() {
																[native code];
															},
														},
														NULL           : {
															toString: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
														},
														TRUE           : {
															value: true,
														},
														FALSE          : {
															value: false,
														},
														cli_pkg_main_0_: function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
													},
													sassOptions   : {
														indentedSyntax: true,
													},
												},
											},
										],
									},
									/* config.module.rule('sass').rule('normal-modules') */
									{
										test: /\.module\.\w+$/,
										use : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\sass-loader\\dist\\cjs.js',
												options: {
													sourceMap     : true,
													implementation: {
														render         : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														renderSync     : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														info           : 'dart-sass\t1.26.10\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
														types          : {
															Boolean: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Color  : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															List   : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Map    : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Null   : function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Number : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															String : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Error  : function Error() {
																[native code];
															},
														},
														NULL           : {
															toString: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
														},
														TRUE           : {
															value: true,
														},
														FALSE          : {
															value: false,
														},
														cli_pkg_main_0_: function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
													},
													sassOptions   : {
														indentedSyntax: true,
													},
												},
											},
										],
									},
									/* config.module.rule('sass').rule('normal') */
									{
										use: [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\sass-loader\\dist\\cjs.js',
												options: {
													sourceMap     : true,
													implementation: {
														render         : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														renderSync     : function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
														info           : 'dart-sass\t1.26.10\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
														types          : {
															Boolean: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Color  : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															List   : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Map    : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Null   : function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
															Number : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															String : function() {
																return _call(f, this, Array.prototype.slice.apply(arguments));
															},
															Error  : function Error() {
																[native code];
															},
														},
														NULL           : {
															toString: function() {
																return _call(f, Array.prototype.slice.apply(arguments));
															},
														},
														TRUE           : {
															value: true,
														},
														FALSE          : {
															value: false,
														},
														cli_pkg_main_0_: function() {
															return _call(f, Array.prototype.slice.apply(arguments));
														},
													},
													sassOptions   : {
														indentedSyntax: true,
													},
												},
											},
										],
									},
								],
							},
							/* config.module.rule('less') */
							{
								test : /\.less$/,
								oneOf: [
									/* config.module.rule('less').rule('vue-modules') */
									{
										resourceQuery: /module/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\less-loader\\dist\\cjs.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
									/* config.module.rule('less').rule('vue') */
									{
										resourceQuery: /\?vue/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\less-loader\\dist\\cjs.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
									/* config.module.rule('less').rule('normal-modules') */
									{
										test: /\.module\.\w+$/,
										use : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\less-loader\\dist\\cjs.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
									/* config.module.rule('less').rule('normal') */
									{
										use: [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\less-loader\\dist\\cjs.js',
												options: {
													sourceMap: true,
												},
											},
										],
									},
								],
							},
							/* config.module.rule('stylus') */
							{
								test : /\.styl(us)?$/,
								oneOf: [
									/* config.module.rule('stylus').rule('vue-modules') */
									{
										resourceQuery: /module/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\stylus-loader\\index.js',
												options: {
													sourceMap         : true,
													preferPathResolver: 'webpack',
												},
											},
										],
									},
									/* config.module.rule('stylus').rule('vue') */
									{
										resourceQuery: /\?vue/,
										use          : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\stylus-loader\\index.js',
												options: {
													sourceMap         : true,
													preferPathResolver: 'webpack',
												},
											},
										],
									},
									/* config.module.rule('stylus').rule('normal-modules') */
									{
										test: /\.module\.\w+$/,
										use : [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
													modules      : {
														localIdentName: '[name]_[local]_[hash:base64:5]',
													},
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\stylus-loader\\index.js',
												options: {
													sourceMap         : true,
													preferPathResolver: 'webpack',
												},
											},
										],
									},
									/* config.module.rule('stylus').rule('normal') */
									{
										use: [
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
												options: {
													hmr       : false,
													publicPath: '../',
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\css-loader\\dist\\cjs.js',
												options: {
													sourceMap    : true,
													importLoaders: 2,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\postcss-loader\\src\\index.js',
												options: {
													sourceMap: true,
												},
											},
											{
												loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\stylus-loader\\index.js',
												options: {
													sourceMap         : true,
													preferPathResolver: 'webpack',
												},
											},
										],
									},
								],
							},
							/* config.module.rule('js') */
							{
								test   : /\.m?jsx?$/,
								include: [
									'/packages',
								],
								exclude: [
									function() { /* omitted long function */
									},
								],
								use    : [
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\cache-loader\\dist\\cjs.js',
										options: {
											cacheDirectory : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\.cache\\babel-loader',
											cacheIdentifier: '192b9f6a',
										},
									},
									{
										loader: 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\thread-loader\\dist\\cjs.js',
									},
									{
										loader: 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\babel-loader\\lib\\index.js',
									},
									{
										loader: 'babel-loader',
									},
								],
							},
							/* config.module.rule('eslint') */
							{
								enforce: 'pre',
								test   : /\.(vue|(j|t)sx?)$/,
								exclude: [
									/node_modules/,
									'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\@vue\\cli-service\\lib',
								],
								use    : [
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\eslint-loader\\index.js',
										options: {
											extensions     : [
												'.js',
												'.jsx',
												'.vue',
												'.ts',
												'.tsx',
											],
											cache          : true,
											cacheIdentifier: '63b2008e',
											emitWarning    : false,
											emitError      : false,
											eslintPath     : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\eslint',
											formatter      : undefined,
										},
									},
								],
							},
							/* config.module.rule('ts') */
							{
								test: /\.ts$/,
								use : [
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\cache-loader\\dist\\cjs.js',
										options: {
											cacheDirectory : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\.cache\\ts-loader',
											cacheIdentifier: '60aa1790',
										},
									},
									{
										loader: 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\thread-loader\\dist\\cjs.js',
									},
									{
										loader: 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\babel-loader\\lib\\index.js',
									},
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\@vue\\cli-plugin-typescript\\node_modules\\ts-loader\\index.js',
										options: {
											transpileOnly   : true,
											appendTsSuffixTo: [
												'\\.vue$',
											],
											happyPackMode   : true,
										},
									},
								],
							},
							/* config.module.rule('tsx') */
							{
								test: /\.tsx$/,
								use : [
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\cache-loader\\dist\\cjs.js',
										options: {
											cacheDirectory : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\.cache\\ts-loader',
											cacheIdentifier: '60aa1790',
										},
									},
									{
										loader: 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\thread-loader\\dist\\cjs.js',
									},
									{
										loader: 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\babel-loader\\lib\\index.js',
									},
									{
										loader : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\node_modules\\@vue\\cli-plugin-typescript\\node_modules\\ts-loader\\index.js',
										options: {
											transpileOnly    : true,
											happyPackMode    : true,
											appendTsxSuffixTo: [
												'\\.vue$',
											],
										},
									},
								],
							},
						],
					},
					optimization : {
						minimizer: [
							{
								options: {
									test           : /\.m?js(\?.*)?$/i,
									chunkFilter    : () => true,
									warningsFilter : () => true,
									extractComments: false,
									sourceMap      : false,
									cache          : true,
									cacheKeys      : defaultCacheKeys => defaultCacheKeys,
									parallel       : true,
									include        : undefined,
									exclude        : undefined,
									minify         : undefined,
									terserOptions  : {
										compress: {
											arrows        : false,
											collapse_vars : false,
											comparisons   : false,
											computed_props: false,
											hoist_funs    : false,
											hoist_props   : false,
											hoist_vars    : false,
											inline        : false,
											loops         : false,
											negate_iife   : false,
											properties    : false,
											reduce_funcs  : false,
											reduce_vars   : false,
											switches      : false,
											toplevel      : false,
											typeofs       : false,
											booleans      : true,
											if_return     : true,
											sequences     : true,
											unused        : true,
											conditionals  : true,
											dead_code     : true,
											evaluate      : true,
										},
										mangle  : {
											safari10: true,
										},
									},
								},
							},
						],
					},
					plugins      : [
						/* config.plugin('vue-loader') */
						new VueLoaderPlugin(),
						/* config.plugin('define') */
						new DefinePlugin(
							{
								'process.env': {
									NODE_ENV: '"production"',
									BASE_URL: '"/"',
								},
							},
						),
						/* config.plugin('case-sensitive-paths') */
						new CaseSensitivePathsPlugin(),
						/* config.plugin('friendly-errors') */
						new FriendlyErrorsWebpackPlugin(
							{
								additionalTransformers: [
									function() { /* omitted long function */
									},
								],
								additionalFormatters  : [
									function() { /* omitted long function */
									},
								],
							},
						),
						/* config.plugin('extract-css') */
						new MiniCssExtractPlugin(
							{
								filename     : 'style/[name].css',
								chunkFilename: 'css/[name].[contenthash:8].css',
							},
						),
						/* config.plugin('optimize-css') */
						new OptimizeCssnanoPlugin(
							{
								sourceMap     : false,
								cssnanoOptions: {
									preset: [
										'default',
										{
											mergeLonghand       : false,
											cssDeclarationSorter: false,
										},
									],
								},
							},
						),
						/* config.plugin('hash-module-ids') */
						new HashedModuleIdsPlugin(
							{
								hashDigest: 'hex',
							},
						),
						/* config.plugin('named-chunks') */
						new NamedChunksPlugin(
							function() { /* omitted long function */
							},
						),
						/* config.plugin('fork-ts-checker') */
						new ForkTsCheckerWebpackPlugin(
							{
								vue                 : {
									enabled : true,
									compiler: 'vue-template-compiler',
								},
								tslint              : false,
								formatter           : 'codeframe',
								checkSyntacticErrors: true,
							},
						),
					],
					entry        : {
						HelloWorld          : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\packages\\components\\HelloWorld\\index.ts',
						index               : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\packages\\components\\index.ts',
						Live2D_Config_Dialog: 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\packages\\components\\Live2D_Config_Dialog\\index.ts',
						VideoJS             : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\packages\\components\\VideoJS\\index.ts',
						'webgl-demos'       : 'D:\\Program_Files\\JetBrains_ToolBox\\projects\\WebStorm\\use-on-demand\\packages\\components\\webgl-demos\\index.ts',
					},
				};
