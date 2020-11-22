import { xX_Sitemap_Helper } from '../../platform-ecosystem-compatible/sitemap/Sitemap_Helper';

console.log('尝试生成 SiteMap ', '工作目录', process.cwd());

// xX_Sitemap_Helper.generateSiteMap_useLib();
xX_Sitemap_Helper.generateSiteMap_manual().then(res => {
	if (res) {
		console.log('创建成功');
	}
});
