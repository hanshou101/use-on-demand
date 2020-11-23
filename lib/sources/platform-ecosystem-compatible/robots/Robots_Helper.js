import { __awaiter, __generator } from "tslib";
import { xX_ExceptionError_Helper } from '../../exception-error/ExceptionError_Helper';
var xX_Robots_Helper = /** @class */ (function () {
    function xX_Robots_Helper() {
    }
    /**
     * 配套【sitemap】，来生成Robots。
     */
    xX_Robots_Helper.generateRobots_forSitemap = function (cfg) {
        if (cfg === void 0) { cfg = {
            baseDir: 'lib-docs-dist',
            website: 'https://hanshou101.github.io',
        }; }
        return __awaiter(this, void 0, void 0, function () {
            var fs;
            return __generator(this, function (_a) {
                if (cfg.website.endsWith('/')) {
                    throw new Error(xX_ExceptionError_Helper.throwError_andLog('尾部不能带【/】号'));
                }
                fs = require('fs');
                fs.writeFileSync(cfg.baseDir + "/robots.txt", "\nUser-agent: *\nSitemap: " + cfg.website + "/sitemap.xml\n");
                return [2 /*return*/, true];
            });
        });
    };
    return xX_Robots_Helper;
}());
export { xX_Robots_Helper };
//# sourceMappingURL=Robots_Helper.js.map