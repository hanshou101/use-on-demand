declare global {
  interface RoutesMap_Item {
    baseUrl: string;
    router: e.Router;
  }
}

// TIP——————————————————————————————————————————系统依赖————————————————————
import fs   from 'fs';
import path from 'path';
import e    from 'express';

// TIP——————————————————————————————————————————用户依赖————————————————————
import {faceRouter}     from '../routes/face';
import {usersRouter}             from '../routes/users';
import {guoqiongRouter}          from '../routes/guoqiong';
import {dbRouter}                from '../routes/db';
import {myStepByStepLife_router} from '../routes/my_step_by_step_life';

export const mani: MyBaseManifest = new class extends MyBaseManifest {
  public readonly _HTTPS_PORT: number = 443;

  // TIP 以前用过的HTTP端口
  // public readonly _HTTP_PORT: number  = 81;
  // TIP 现在新使用的HTTP端口（因为，测试pwa，需要服务横跨  80端口 和443端口）
  public readonly _HTTP_PORT: number = 80;

  // TIP 以前用的https证书
  /*
  public readonly privateKey                  = fs.readFileSync(path.join(__dirname, '../assets/cert/https_private.pem'), 'utf8');
  public readonly certificate                 = fs.readFileSync(path.join(__dirname, '../assets/cert/https_file.crt'), 'utf8');
  */
  // TIP 最新获得的https证书（2020.01.19获得）
  public readonly privateKey  = fs.readFileSync(path.join(__dirname, '../assets/cert/new-20200119/private.key'), 'utf8');
  public readonly certificate = fs.readFileSync(path.join(__dirname, '../assets/cert/new-20200119/full_chain.pem'), 'utf8');

  public readonly viewsPath: string           = path.join(__dirname, '../views');
  public readonly viewsEngine: 'jade'         = 'jade';
  //
  public readonly staticPaths: string[]       = [
    path.join(__dirname, '../../public'),
    path.join(__dirname, '../../public/guoqiong'),
  ];
  //
  public readonly routesMap: RoutesMap_Item[] = [
    {baseUrl: '/base', router: faceRouter},
    {baseUrl: '/users', router: usersRouter},
    {baseUrl: '/guoqiong', router: guoqiongRouter},
    {baseUrl: '/db', router: dbRouter},
    {baseUrl: '/dist-MyBestLife-MyBestProject', router: myStepByStepLife_router},
  ];

};
