// TIP——————————————————————————————————————————系统依赖————————————————————
import fs from 'fs';
import path from 'path';
import { r_db } from '../routes/db';
import { r_myStepByStepLife } from '../routes/my_step_by_step_life';
export var cfg = new /** @class */ (function () {
    function class_1() {
        /**
         * 挂载端口
         */
        this.port = {
            http: 20080,
            https: 20443,
        };
        /**
         * Https证书
         *        1. 2020.01.19获得
         */
        this.cert = {
            privateKey: fs.readFileSync(path.join(__dirname, '../assets/cert/new-20200119/private.key'), 'utf8'),
            certificate: fs.readFileSync(path.join(__dirname, '../assets/cert/new-20200119/full_chain.pem'), 'utf8'),
        };
        /**
         * 视图
         */
        this.view = {
            // 页面渲染
            viewsPath: path.join(__dirname, '../../views'),
            viewsEngine: 'jade',
            // 外部public资源
            staticPaths: [
                path.join(__dirname, '../../public'),
                path.join(__dirname, '../../public/guoqiong'),
            ],
            // 内部assets资源
            assetsPaths: [
                path.join(__dirname, '../assets'),
            ],
        };
        /**
         * 路由表
         */
        this.route = {
            map: [
                { baseUrl: '/db', router: r_db },
                { baseUrl: '/dist-MyBestLife-MyBestProject', router: r_myStepByStepLife },
            ],
        };
    }
    return class_1;
}());
//# sourceMappingURL=config.js.map