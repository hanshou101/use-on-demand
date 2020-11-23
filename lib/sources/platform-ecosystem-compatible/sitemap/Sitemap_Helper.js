import { __assign, __awaiter, __generator, __read, __spread } from "tslib";
import { xX_SRegexp_Helper } from '../../symbol-regexp/SRegexp_Helper';
import { xX_ExceptionError_Helper } from '../../exception-error/ExceptionError_Helper';
var xX_Sitemap_Helper = /** @class */ (function () {
    function xX_Sitemap_Helper() {
    }
    /**
     * 参考资料：
     * 				https://www.npmjs.com/package/sitemap-generator
     * 				https://github.com/lgraubner/sitemap-generator
     */
    xX_Sitemap_Helper.generateSiteMap_useLib = function () {
        // const SitemapGenerator = require('sitemap-generator');
        var SitemapGenerator = require('advanced-sitemap-generator');
        // 创建生成器
        var generator = SitemapGenerator(
        // 'https://hanshou101.github.io',					// 遇到了安全性问题
        // 'http://hanshou101.github.io',						// 会自动跳转到【https】协议
        // 'http://localhost:28080',								// 只抓到了一个
        'http://192.168.50.39:28080', 
        // 'http://www.cnpaf.net/class/http/',
        {
            maxDepth: 99999,
            filepath: './lib-docs-dist/sitemap.xml',
            maxEntriesPerFile: 50000,
            stripQuerystring: false,
            //
            // WARN 以下属性，都是猜测的属性
            allowInitialDomainChange: true,
            timeout: 999999,
            listenerTTL: 999999,
        });
        // 事件监听
        generator.on('done', function () {
            console.log('已经完成');
            // const crawler = generator.getCrawler();
            // const sitemap = generator.getSitemap();
            // console.log('crawler', crawler);
            // console.log('sitemap', sitemap);
            // console.log('sitemap输出文件', sitemap.getPaths());
        });
        generator.on('error', function (error) {
            console.log('error', error);
            // => { code: 404, message: 'Not found.', url: 'http://example.com/foo' }
        });
        generator.on('add', function (url) {
            console.log('add', url);
            // log url
        });
        generator.on('fetch', function (status, url) {
            console.log(status, url);
        });
        generator.on('clienterror', function (queueError, errorData) {
            console.log(queueError, errorData);
        });
        generator.on('ignore', function (url) {
            console.log('ignore', url);
            // log ignored url
        });
        // 开始【Crawler】爬行
        generator.start();
    };
    /**
     * 手动生成【sitemap.xml】。
     * 				1.
     * 				2.
     */
    xX_Sitemap_Helper.generateSiteMap_manual = function (
    // 配置选项
    cfg) {
        if (cfg === void 0) { cfg = {
            /**
             * 参考资料：
             *				【greenrock2006】的回答：http://zhidao.baidu.com/question/1793260?sharesource=qzone
             *				常见网页格式，列表：https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F%E5%88%97%E8%A1%A8#%E7%B6%B2%E9%A0%81%E7%A8%8B%E5%BC%8F
             */
            exts: [
                // 'js', 'mdx',
                'html', 'htm',
                'asp', 'php', 'jsp', 'nsp',
                'xhtml', 'shtml',
            ],
            baseDir: 'lib-docs-dist',
            website: 'https://hanshou101.github.io',
        }; }
        return __awaiter(this, void 0, void 0, function () {
            /**
             * 使用【globby】的方法。
             */
            function from_globbyLib() {
                return __awaiter(this, void 0, void 0, function () {
                    var pages;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, globby(querySyntax, {
                                    cwd: process.cwd(),
                                    gitignore: false,
                                })];
                            case 1:
                                pages = _a.sent();
                                return [2 /*return*/, {
                                        pages: pages,
                                    }];
                        }
                    });
                });
            }
            /**
             * 使用【glob】的方法
             */
            function from_rawGlobLib() {
                // WARN 只支持【单个glob表达式】！
                var pages = require('glob').sync(querySyntax[0], 
                // 'lib-docs-dist/**/*.html',
                {});
                return {
                    pages: pages,
                };
            }
            var fs, globby, prettier, prettierConfig, querySyntax, pages, sitemap, formatted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (cfg.website.endsWith('/')) {
                            throw new Error(xX_ExceptionError_Helper.throwError_andLog('尾部不能带【/】号'));
                        }
                        if (cfg.exts.length <= 1) {
                            throw new Error(xX_ExceptionError_Helper.throwError_andLog('因为使用了【{}】语法，所以必须至少有2个元素！！！不然会出现意外'));
                        }
                        fs = require('fs');
                        globby = require('globby');
                        prettier = require('prettier');
                        prettierConfig = { // 手动指定【配置】
                        // semi  : false,
                        // parser: 'babel',
                        };
                        querySyntax = [
                            // 【js】、【mdx】。  形如：【'pages/**/*{.js,.mdx}'】
                            // WARN 采用动态拼接，将来更好修改。
                            // FIXME 此处，切记一个Bug————【最前面要加 / 斜杠】。具体原因，好像【加了 是根目录】，【不加 是当前目录】。
                            // WARN 后来，又发现  是不用加【/ 斜杠】的！！！
                            cfg.baseDir + "/**/*{" + 
                            // 形如 【.js,.mdx】
                            cfg.exts.map(function (e) {
                                return "." + e;
                            }).join(',') /* + ',' */ // WARN 此处，Glob的列表，单个元素时，必须要在末尾加逗号！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
                             + "}",
                            "!" + cfg.baseDir + "/_*.js",
                            "!" + cfg.baseDir + "/api",
                        ];
                        return [4 /*yield*/, from_globbyLib()];
                    case 1:
                        pages = (_a.sent()).pages;
                        // const { pages } = await from_rawGlobLib();
                        console.log('查找格式', querySyntax);
                        console.log('查找到的页面', pages);
                        sitemap = "\n        <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        <urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n            " + pages.map(function (page) {
                            // const path = page
                            // 	.replace('pages', '')        // 去除前面的【pages】前缀
                            // 	.replace('.js', '')          // 去除后面的【js】后缀
                            // 	.replace('.mdx', '');				// 去除后面的【.mdx】后缀
                            // TIP 去除行首目录，去除行尾后缀名。
                            var path = __spread([
                                new RegExp("^" + xX_SRegexp_Helper.escapeRegex("" + cfg.baseDir))
                            ], cfg.exts.map(function (e) {
                                return new RegExp("." + ("" + xX_SRegexp_Helper.escapeRegex(e)) + "$"); // 后缀名。且是行尾
                            })).reduce(function (preObj, curItem) {
                                return preObj.replace(curItem, '');
                            }, page);
                            console.log('path', path);
                            // WARN 处理【根路由】的情况
                            var route = path === '/index' ? '' : path;
                            return "\n\t\t\t\t\t\t\t\t<url>\n\t\t\t\t\t\t\t\t\t\t<loc>" + cfg.website + route + "</loc>\n\t\t\t\t\t\t\t\t</url>\n               ";
                        }).join('') + "\n        </urlset>\n    ";
                        formatted = prettier.format(sitemap, __assign(__assign({}, prettierConfig), { parser: 'html' }));
                        fs.writeFileSync(cfg.baseDir + "/sitemap.xml", formatted);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return xX_Sitemap_Helper;
}());
export { xX_Sitemap_Helper };
//# sourceMappingURL=Sitemap_Helper.js.map