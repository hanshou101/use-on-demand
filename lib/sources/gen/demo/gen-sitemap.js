import { xX_Sitemap_Helper } from '../../platform-ecosystem-compatible/sitemap/Sitemap_Helper';
import { xX_Robots_Helper } from '../../platform-ecosystem-compatible/robots/Robots_Helper';
console.log('尝试生成 SiteMap ', '工作目录', process.cwd());
// xX_Sitemap_Helper.generateSiteMap_useLib();
xX_Sitemap_Helper.generateSiteMap_manual().then(function (res) {
    if (res) {
        console.log('创建成功：sitemap');
        xX_Robots_Helper.generateRobots_forSitemap().then(function (res) {
            if (res) {
                console.log('创建成功：robots.txt');
            }
        });
    }
});
//# sourceMappingURL=gen-sitemap.js.map