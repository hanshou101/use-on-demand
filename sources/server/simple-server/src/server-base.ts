// TIP———————————————————————————————导入依赖——————————————————————————————————
import e            from 'express';
import createError  from 'http-errors';
import express      from 'express';
import path         from 'path';
import cookieParser from 'cookie-parser';
import logger       from 'morgan';

import {mani} from './config/new_manifest';

// TIP———————————————————————————————创建Express应用———————————————————————————
const serverBase = express();

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
serverBase.all('*', (req, res, next) => {
  // TIP 此处，原作者比较愚蠢，没有添加任何的筛选。我自己加上http头筛选

  // 【HTTPS安全协议】，无须处理。
  if (req.secure) {
    next();
  } else {
    let host = req.headers.host || '';
    host     = host.replace(/\:\d+$/, ''); // Remove port number
    res.redirect(307, `https://${host}${req.path}`);
  }
});


for (const staticPath of mani.staticPaths) {
  serverBase.use(express.static(staticPath));
}

// TIP ——————————————————————————————Express的插件——————————————————————————————
serverBase.use(logger('dev'));                               // 日志
serverBase.use(express.json());                                    // JSON处理器
serverBase.use(express.urlencoded({extended: false}));     // Url-Encode转化
serverBase.use(cookieParser());                                    // Cookie

// TIP ——————————————————————————————挂载路由————————————————————————————————
// import {faceRouter} from '../routes/face';
// import {usersRouter} from '../routes/users';
// import {guoqiongRouter} from '../routes/guoqiong';
// application.use('/base', faceRouter);                   // TIP 以【/base】     为根路径。
// application.use('/users', usersRouter);             // TIP 以【/users】为根路径。
// application.use('/guoqiong', guoqiongRouter);       // TIP 以【/users】为根路径。
// 批量设置
for (const route of mani.routesMap) {
  serverBase.use(route.baseUrl, route.router);
}

// TIP ——————————————————————————————404界面————————————————————————————————
// catch 404 and forward to error handler
serverBase.use(function (req: e.Request, res: e.Response, next: e.NextFunction) {
  next(createError(404));
});

// TIP ——————————————————————————————500界面（内部出错）—————————————————————
// error handler
serverBase.use(function (err: MyExpress_Error, req: e.Request, res: e.Response, next: e.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = application;
export {
  serverBase,
};
