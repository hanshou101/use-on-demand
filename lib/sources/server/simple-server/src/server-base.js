var e_1, _a, e_2, _b;
import { __values } from "tslib";
import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { mani } from './config/new_manifest';
// TIP———————————————————————————————创建Express应用———————————————————————————
var serverBase = express();
// TIP ——————————————————————————————初始化View层模板引擎——————————————————————————
serverBase.set('views', mani.viewsPath);
serverBase.set('view engine', mani.viewsEngine);
// TIP ——————————————————————————————内部assets资源目录——————————————————————————
// 设置assets目录
// app.set('assets', path.join(__dirname, 'assets'))
// TIP ——————————————————————————————外部public资源目录——————————————————————————
// serverApp.use(express.static(path.join(__dirname, 'public')));
// application.use(express.static(path.join(__dirname, '../../public'))); // TODO 上层目录中
// application.use(express.static(path.join(__dirname, '../../public/guoqiong'))); // TODO 国琼目录
// TIP ——————————————————————————————路由批量设置————————————————————————————————
// WARN 此处，加上【http】全部转发到【https】的代码
// WARN 此处，加上【http】全部转发到【https】的代码
// WARN 此处，加上【http】全部转发到【https】的代码
console.log('此处，加上【http】全部转发到【https】的代码');
console.log('此处，加上【http】全部转发到【https】的代码');
console.log('此处，加上【http】全部转发到【https】的代码');
serverBase.all('*', function (req, res, next) {
    // TIP 此处，原作者比较愚蠢，没有添加任何的筛选。我自己加上http头筛选
    // 【HTTPS安全协议】，无须处理。
    if (req.secure) {
        next();
    }
    else {
        var host = req.headers.host || '';
        host = host.replace(/\:\d+$/, ''); // Remove port number
        res.redirect(307, "https://" + host + req.path);
    }
});
try {
    for (var _c = __values(mani.staticPaths), _d = _c.next(); !_d.done; _d = _c.next()) {
        var staticPath = _d.value;
        serverBase.use(express.static(staticPath));
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
    }
    finally { if (e_1) throw e_1.error; }
}
// TIP ——————————————————————————————Express的插件——————————————————————————————
serverBase.use(logger('dev')); // 日志
serverBase.use(express.json()); // JSON处理器
serverBase.use(express.urlencoded({ extended: false })); // Url-Encode转化
serverBase.use(cookieParser()); // Cookie
try {
    // TIP ——————————————————————————————挂载路由————————————————————————————————
    // import {faceRouter} from '../routes/face';
    // import {usersRouter} from '../routes/users';
    // import {guoqiongRouter} from '../routes/guoqiong';
    // application.use('/base', faceRouter);                   // TIP 以【/base】     为根路径。
    // application.use('/users', usersRouter);             // TIP 以【/users】为根路径。
    // application.use('/guoqiong', guoqiongRouter);       // TIP 以【/users】为根路径。
    // 批量设置
    for (var _e = __values(mani.routesMap), _f = _e.next(); !_f.done; _f = _e.next()) {
        var route = _f.value;
        serverBase.use(route.baseUrl, route.router);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
    }
    finally { if (e_2) throw e_2.error; }
}
// TIP ——————————————————————————————404界面————————————————————————————————
// catch 404 and forward to error handler
serverBase.use(function (req, res, next) {
    next(createError(404));
});
// TIP ——————————————————————————————500界面（内部出错）—————————————————————
// error handler
serverBase.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// module.exports = application;
export { serverBase, };
//# sourceMappingURL=server-base.js.map