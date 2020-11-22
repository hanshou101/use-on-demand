import { xX_SRegexp_Helper }        from '../../symbol-regexp/SRegexp_Helper';
import { xX_ExceptionError_Helper } from '../../exception-error/ExceptionError_Helper';

export class xX_Sitemap_Helper {
	/**
	 * 参考资料：
	 * 				https://www.npmjs.com/package/sitemap-generator
	 * 				https://github.com/lgraubner/sitemap-generator
	 */
	public static generateSiteMap_useLib() {
		// const SitemapGenerator = require('sitemap-generator');
		const SitemapGenerator = require('advanced-sitemap-generator');


		// 创建生成器
		const generator = SitemapGenerator(
			// 'https://hanshou101.github.io',					// 遇到了安全性问题
			// 'http://hanshou101.github.io',						// 会自动跳转到【https】协议
			// 'http://localhost:28080',								// 只抓到了一个
			'http://192.168.50.39:28080',
			// 'http://www.cnpaf.net/class/http/',
			{
				maxDepth         : 99999,																	// 最大深度 5层
				filepath         : './lib-docs-dist/sitemap.xml',													// 导出文件的路径。（多个文件时，会自动加后缀【"part_$index"】）
				maxEntriesPerFile: 50000,
				stripQuerystring : false,														// 是否在队列项目构建时，从URL剥离查询字符串参数
				//

				// WARN 以下属性，都是猜测的属性
				allowInitialDomainChange: true,
				timeout                 : 999999,
				listenerTTL             : 999999,
			});

		// 事件监听
		generator.on('done', () => {
			console.log('已经完成');
			// const crawler = generator.getCrawler();
			// const sitemap = generator.getSitemap();
			// console.log('crawler', crawler);
			// console.log('sitemap', sitemap);
			// console.log('sitemap输出文件', sitemap.getPaths());
		});
		generator.on('error', (error: any) => {
			console.log('error', error);
			// => { code: 404, message: 'Not found.', url: 'http://example.com/foo' }
		});
		generator.on('add', (url: string) => {
			console.log('add', url);
			// log url
		});
		generator.on('fetch', function(status: any, url: string) {
			console.log(status, url);
		});

		generator.on('clienterror', function(queueError: any, errorData: any) {
			console.log(queueError, errorData);
		});
		generator.on('ignore', (url: string) => {
			console.log('ignore', url);
			// log ignored url
		});

		// 开始【Crawler】爬行
		generator.start();
	}

	/**
	 * 手动生成【sitemap.xml】。
	 * 				1.
	 * 				2.
	 */
	public static async generateSiteMap_manual(
		// 配置选项
		cfg = {
			/**
			 * 参考资料：
			 *				【greenrock2006】的回答：http://zhidao.baidu.com/question/1793260?sharesource=qzone
			 *				常见网页格式，列表：https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F%E5%88%97%E8%A1%A8#%E7%B6%B2%E9%A0%81%E7%A8%8B%E5%BC%8F
			 */
			exts   : [
				// 'js', 'mdx',
				'html', 'htm',
				'asp', 'php', 'jsp', 'nsp',
				'xhtml', 'shtml',
			],
			baseDir: 'lib-docs-dist',
			website: 'https://hanshou101.github.io',		// WARN 切记，尾部不要带【/】号
		},
	): Promise<boolean> {
		if (cfg.website.endsWith('/')) {
			throw new Error(xX_ExceptionError_Helper.throwError_andLog('尾部不能带【/】号'));
		}
		if (cfg.exts.length <= 1) {
			throw new Error(xX_ExceptionError_Helper.throwError_andLog('因为使用了【{}】语法，所以必须至少有2个元素！！！不然会出现意外'));
		}

		const fs = require('fs');

		const globby   = require('globby');
		const prettier = require('prettier');

		// const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');				// 从文件中，读取
		const prettierConfig = {																													// 手动指定【配置】
			// semi  : false,
			// parser: 'babel',
		};


		// Ignore Next.js specific files (e.g., _app.js) and API routes.
		const querySyntax = [
			// 【js】、【mdx】。  形如：【'pages/**/*{.js,.mdx}'】
			// WARN 采用动态拼接，将来更好修改。
			// FIXME 此处，切记一个Bug————【最前面要加 / 斜杠】。具体原因，好像【加了 是根目录】，【不加 是当前目录】。
			// WARN 后来，又发现  是不用加【/ 斜杠】的！！！
			`${cfg.baseDir}/**/*{${
				// 形如 【.js,.mdx】
				cfg.exts.map(e => {
					return `.${e}`;
				}).join(',') /* + ',' */		// WARN 此处，Glob的列表，单个元素时，必须要在末尾加逗号！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			}}`,
			`!${cfg.baseDir}/_*.js`,					// 忽略Next.js 自带的下划线开头
			`!${cfg.baseDir}/api`,						// 忽略 api 文件夹
		];

		/**
		 * 使用【globby】的方法。
		 */
		async function from_globbyLib() {
			const pages: Array<string> = await globby(querySyntax, {
				cwd      : process.cwd(),																			// FIXME 这里，官方库有Bug。它引用的库的文档，说默认是CWD。但它自己却不是。
				gitignore: false,																							// 不采用【.gitignore】的忽略规则
			});
			return {
				pages,
			};
		}

		/**
		 * 使用【glob】的方法
		 */
		function from_rawGlobLib() {
			// WARN 只支持【单个glob表达式】！
			const pages: string[] = require('glob').sync(
				querySyntax[0],
				// 'lib-docs-dist/**/*.html',
				{},
			);
			return {
				pages,
			};
		}

		const { pages } = await from_globbyLib();
		// const { pages } = await from_rawGlobLib();

		console.log('查找格式', querySyntax);
		console.log('查找到的页面', pages);

		const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${
			pages.map((page) => {
				// const path = page
				// 	.replace('pages', '')        // 去除前面的【pages】前缀
				// 	.replace('.js', '')          // 去除后面的【js】后缀
				// 	.replace('.mdx', '');				// 去除后面的【.mdx】后缀

				// TIP 去除行首目录，去除行尾后缀名。
				const path = [
					new RegExp(`^` + xX_SRegexp_Helper.escapeRegex(`${cfg.baseDir}`)),				// 前缀目录。且是行首
					...cfg.exts.map(e => {
						return new RegExp(`.` + `${xX_SRegexp_Helper.escapeRegex(e)}` + `$`);			// 后缀名。且是行尾
					}),
				].reduce((preObj, curItem) => {
					return preObj.replace(curItem, '');
				}, page);

				console.log('path', path);

				// WARN 处理【根路由】的情况
				const route = path === '/index' ? '' : path;

				return `
								<url>
										<loc>${cfg.website}${route}</loc>
								</url>
               `;
			}).join('')
		}
        </urlset>
    `;

		// If you're not using Prettier, you can remove this.
		// 按照Html格式，进行美化
		const formatted = prettier.format(sitemap, {
			...prettierConfig,
			parser: 'html',
		});

		fs.writeFileSync(`${cfg.baseDir}/sitemap.xml`, formatted);

		return true;
	}


}
