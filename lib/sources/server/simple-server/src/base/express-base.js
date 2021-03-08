import { __values } from "tslib";
// TIP———————————————————————————————导入依赖——————————————————————————————————
import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { cfg } from '../config/config';
var ExpressBase_Helper = /** @class */ (function () {
    function ExpressBase_Helper(expressBase) {
        if (expressBase === void 0) { expressBase = express(); }
        this.expressBase = expressBase;
        this.initAll();
    }
    ExpressBase_Helper.prototype.initAll = function () {
        this.$2_redirectHttps(); // WARN 放在【Public】的前面，才能将【public/index.html】重定向到【https】。
        this.$0_initView();
        this.$1_initAssets_andPublic();
        this.$6_handleCORS(); // 跨域，尽量靠前。
        this.$4_initPlugin();
        this.$3_bindRoutes(); // 路由，尽量放在靠后的位置。
        this.$5_bindErrorPage(); // WARN 应该放在最后，会拦截其它页面
    };
    /**
     * 初始化View层模板引擎
     */
    ExpressBase_Helper.prototype.$0_initView = function () {
        this.expressBase.set('views', cfg.view.viewsPath); // 视图地址
        this.expressBase.set('view engine', cfg.view.viewsEngine); // 视图引擎
    };
    /**
     * 初始化 内部Assets、外部public。
     */
    ExpressBase_Helper.prototype.$1_initAssets_andPublic = function () {
        var _this = this;
        // TIP ——————————————————————————————内部assets资源目录——————————————————————————
        cfg.view.assetsPaths.forEach(function (assetsPath) {
            _this.expressBase.set('assets', assetsPath);
        });
        // TIP ——————————————————————————————外部public资源目录——————————————————————————
        cfg.view.staticPaths.forEach(function (staticPath) {
            _this.expressBase.use(express.static(staticPath));
        });
    };
    ExpressBase_Helper.prototype.$2_redirectHttps = function () {
        console.log('此处，加上【http】全部转发到【https】的代码');
        this.expressBase.all('*', function (req, res, next) {
            // TIP 此处，原作者比较愚蠢，没有添加任何的筛选。我自己加上http头筛选
            // 【HTTPS安全协议】，无须处理。
            if (req.secure) {
                next();
            }
            else {
                var host = req.headers.host || ''; // 带端口的主机
                var hostname = req.hostname || ''; // 不带端口的主机
                var url = req.url || ''; // 子路径
                /*
                host = host.replace(/\:\d+$/, ''); // Remove port number
                res.redirect(307, `https://${host}${req.path}`);
                */
                res.redirect(307, "https://" + hostname + ":" + cfg.port.https + url);
            }
        });
    };
    /**
     * 路由批量设置
     */
    ExpressBase_Helper.prototype.$3_bindRoutes = function () {
        var e_1, _a;
        try {
            for (var _b = __values(cfg.route.map), _c = _b.next(); !_c.done; _c = _b.next()) {
                var route = _c.value;
                this.expressBase.use(route.baseUrl, route.router);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Express的插件
     */
    ExpressBase_Helper.prototype.$4_initPlugin = function () {
        this.expressBase.use(logger('dev')); // 日志
        this.expressBase.use(express.json()); // JSON处理器
        this.expressBase.use(express.urlencoded({ extended: false })); // Url-Encode转化
        this.expressBase.use(cookieParser()); // Cookie
    };
    /**
     * 设置错误页面
     */
    ExpressBase_Helper.prototype.$5_bindErrorPage = function () {
        // 404界面
        this.expressBase.use(function (req, res, next) {
            next(createError(404));
        });
        // 500界面（内部出错）
        this.expressBase.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    };
    /**
     * 处理CORS跨域问题
     */
    ExpressBase_Helper.prototype.$6_handleCORS = function () {
        var c = function () {
            return cors({ credentials: true, origin: true });
        }; // 解决跨域问题
        this.expressBase.use(c());
        this.expressBase.options('*', c());
    };
    return ExpressBase_Helper;
}());
// TIP———————————————————————————————创建Express应用———————————————————————————
export { ExpressBase_Helper, };
//# sourceMappingURL=express-base.js.map