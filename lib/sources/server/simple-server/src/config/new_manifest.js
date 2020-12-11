import { __extends } from "tslib";
// TIP——————————————————————————————————————————系统依赖————————————————————
import fs from 'fs';
import path from 'path';
// TIP——————————————————————————————————————————用户依赖————————————————————
import { faceRouter } from '../routes/face';
import { usersRouter } from '../routes/users';
import { guoqiongRouter } from '../routes/guoqiong';
import { dbRouter } from '../routes/db';
import { myStepByStepLife_router } from '../routes/my_step_by_step_life';
export var mani = new /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._HTTPS_PORT = 443;
        // TIP 以前用过的HTTP端口
        // public readonly _HTTP_PORT: number  = 81;
        // TIP 现在新使用的HTTP端口（因为，测试pwa，需要服务横跨  80端口 和443端口）
        _this._HTTP_PORT = 80;
        // TIP 以前用的https证书
        /*
        public readonly privateKey                  = fs.readFileSync(path.join(__dirname, '../assets/cert/https_private.pem'), 'utf8');
        public readonly certificate                 = fs.readFileSync(path.join(__dirname, '../assets/cert/https_file.crt'), 'utf8');
        */
        // TIP 最新获得的https证书（2020.01.19获得）
        _this.privateKey = fs.readFileSync(path.join(__dirname, '../assets/cert/new-20200119/private.key'), 'utf8');
        _this.certificate = fs.readFileSync(path.join(__dirname, '../assets/cert/new-20200119/full_chain.pem'), 'utf8');
        _this.viewsPath = path.join(__dirname, '../views');
        _this.viewsEngine = 'jade';
        //
        _this.staticPaths = [
            path.join(__dirname, '../../public'),
            path.join(__dirname, '../../public/guoqiong'),
        ];
        //
        _this.routesMap = [
            { baseUrl: '/base', router: faceRouter },
            { baseUrl: '/users', router: usersRouter },
            { baseUrl: '/guoqiong', router: guoqiongRouter },
            { baseUrl: '/db', router: dbRouter },
            { baseUrl: '/dist-MyBestLife-MyBestProject', router: myStepByStepLife_router },
        ];
        return _this;
    }
    return class_1;
}(MyBaseManifest));
//# sourceMappingURL=new_manifest.js.map