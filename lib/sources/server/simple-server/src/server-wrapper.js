#!/usr/bin/env node
// TIP —————————————————————————系统依赖————————————————————————
import http from 'http';
import https from 'https';
// TIP —————————————————————————个人————————————————————————
import { mani } from './config/new_manifest';
import { My_ServerOption } from './base/My_ServerOption';
import { serverBase } from './server-base';
// TIP —————————————————————————HTTPS安全凭证————————————————————————
// 根据项目的路径导入生成的证书文件
// const privateKey  = fs.readFileSync(path.join(__dirname, '../assets/cert/https_private.pem'), 'utf8');
// const certificate = fs.readFileSync(path.join(__dirname, '../assets/cert/https_file.crt'), 'utf8');
var credentials = { key: mani.privateKey, cert: mani.certificate };
// TIP —————————————————————————创建HTTPS服务器——————————————————————
var http_server = http.createServer(serverBase);
var https_server = https.createServer(credentials, serverBase);
var myServerOption = My_ServerOption.build(http_server, https_server);
// TIP ——————————————————————————挂载服务器，到HTTP端口————————————————————————
http_server.listen(mani._HTTP_PORT);
http_server.on('error', myServerOption.onError);
http_server.on('listening', myServerOption.onListening);
console.log("\u5C0F\u4E25\u7B14\u8BB0\uFF1Ahttp\u5DF2\u7ECF\u6302\u8F7D\u5230" + mani._HTTP_PORT + "\u7AEF\u53E3\u3002");
// TIP ——————————————————————————挂载服务器，到HTTPS端口———————————————————————
https_server.listen(mani._HTTPS_PORT);
https_server.on('error', myServerOption.onError);
https_server.on('listening', myServerOption.onListening);
console.log("\u5C0F\u4E25\u7B14\u8BB0\uFF1Ahttps\u5DF2\u7ECF\u6302\u8F7D\u5230" + mani._HTTPS_PORT + "\u7AEF\u53E3\u3002");
//# sourceMappingURL=server-wrapper.js.map