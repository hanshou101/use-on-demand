#!/usr/bin/env node

// TIP —————————————————————————系统依赖————————————————————————
import http, {Server as HttpServer}   from 'http';
import https, {Server as HttpsServer} from 'https';

// TIP —————————————————————————个人————————————————————————
import {mani}            from './config/new_manifest';
import {My_ServerOption} from './base/My_ServerOption';
import {serverBase}      from './webApplication';

// TIP —————————————————————————HTTPS安全凭证————————————————————————
// 根据项目的路径导入生成的证书文件
// const privateKey  = fs.readFileSync(path.join(__dirname, '../assets/cert/https_private.pem'), 'utf8');
// const certificate = fs.readFileSync(path.join(__dirname, '../assets/cert/https_file.crt'), 'utf8');
const credentials = {key: mani.privateKey, cert: mani.certificate};

// TIP —————————————————————————创建HTTPS服务器——————————————————————
const http_server: HttpServer   = http.createServer(serverBase);
const https_server: HttpsServer = https.createServer(credentials, serverBase);

const myServerOption = My_ServerOption.build(http_server, https_server);

// TIP ——————————————————————————挂载服务器，到HTTP端口————————————————————————
http_server.listen(mani._HTTP_PORT);
http_server.on('error', myServerOption.onError);
http_server.on('listening', myServerOption.onListening);
console.log(`小严笔记：http已经挂载到${mani._HTTP_PORT}端口。`);

// TIP ——————————————————————————挂载服务器，到HTTPS端口———————————————————————
https_server.listen(mani._HTTPS_PORT);
https_server.on('error', myServerOption.onError);
https_server.on('listening', myServerOption.onListening);
console.log(`小严笔记：https已经挂载到${mani._HTTPS_PORT}端口。`);
