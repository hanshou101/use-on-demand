import { xX_ExceptionError_Helper } from '../../exception-error/ExceptionError_Helper';

export class xX_Robots_Helper {
	/**
	 * 配套【sitemap】，来生成Robots。
	 */
	public static async generateRobots_forSitemap(
		cfg = {
			baseDir: 'lib-docs-dist',
			website: 'https://hanshou101.github.io',		// WARN 切记，尾部不要带【/】号
		},
	): Promise<boolean> {
		if (cfg.website.endsWith('/')) {
			throw new Error(xX_ExceptionError_Helper.throwError_andLog('尾部不能带【/】号'));
		}
		const fs = require('fs');
		fs.writeFileSync(`${cfg.baseDir}/robots.txt`, `
User-agent: *
Sitemap: ${cfg.website}/sitemap.xml
`);

		return true;
	}
}
