import fs from 'fs';

import {CDN_Helper} from './gen-helper';
import {EnvFlags}   from '../envir/env-flags';

/**
 * 一些类型设定。
 *        1.实现【静态属性】的接口。
 */

interface TplConfig {
  tplPath(): string;                    //
  targetPath(): string;
}

interface TplConfig_Static {
  new(fileName: string): TplConfig;                     //
  basePath: {
    tpl: string;
    target: string;
  }                                     //
}

function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

//
//
//
//
//
//

/**
 * RuntimeJS的配置。
 */
@staticImplements<TplConfig_Static>()
class RuntimeJs_Config implements TplConfig {
  static readonly basePath = {
    tpl   : `./gen/tpl/`,
    target: `./static/js/charting_library/static/bundles/`,
  };                                      //
  constructor(public fileName: string) {
  }                                       //
  tplPath() {
    return RuntimeJs_Config.basePath.tpl + this.fileName;
  }                                                                     //
  targetPath() {
    return RuntimeJs_Config.basePath.target + this.fileName;
  }
}

/**
 * Html的配置。
 */
@staticImplements<TplConfig_Static>()
class Html_Config implements TplConfig {
  static readonly basePath = {
    tpl   : `./gen/tpl/`,
    target: `./static/js/charting_library/static/`,
  };                                      //
  constructor(public fileName: string) {
  }                                       //
  tplPath() {
    return Html_Config.basePath.tpl + this.fileName;
  }                                                                     //
  targetPath() {
    return Html_Config.basePath.target + this.fileName;
  }
}


const cdnPath = EnvFlags.finalCheck_useCDN
  ? `${CDN_Helper.c_baseUrl}js/charting_library/static/bundles/`                    // 使用CDN
  : `bundles/`;                                                                     // 不使用CDN

function read_replace_write(
  tplPath: string,
  targetPath: string,
  replcaeFn: (originStr: string) => string,
) {
  fs.readFile(tplPath, 'utf-8', (err, data) => {             // 读取模板
    if (err) {
      return console.log(err);
    }
    console.log('读取成功');

    fs.writeFile(targetPath, replcaeFn(data), 'utf8', function (err) {  // 写入修改后的文件
      if (err) {
        return console.log(err);
      } else {
        console.log('写入成功');
      }
    });
  });
}

function gen_RuntimeJs() {
  const config = [
    new RuntimeJs_Config('runtime.d22af752ee0c2111becd.js'),
  ];
  config.forEach(item => {

    read_replace_write(
      item.tplPath(),
      item.targetPath(),
      (data) => {
        /**
         * d.p="bundles/"                             （注意，略微差别）
         */
        const pre        = `d.p="`;
        const originPath = `bundles/`;
        const suffix     = `"`;

        const reg = new RegExp(
          `(${pre})(${originPath})(${suffix})`,
          'g',                  // 查找替换所有
        );       // 查找正则

        console.log('gen_RuntimeJs', data.match(reg));

        const result = data.replace(reg, `$1${cdnPath}$3`);   // 替换中间段
        return result;
      }
    );

  });

}

function gen_Html() {
  const config = [
    new Html_Config('zh-tv-chart.08b1d9ed36065f36316f.html'),
    new Html_Config('en-tv-chart.08b1d9ed36065f36316f.html'),
  ];
  config.forEach(item => {

    read_replace_write(
      item.tplPath(),
      item.targetPath(),
      (data) => {
        /**
         * src="bundles/                               （注意，略微差别）
         */
        const pre        = `(src|href)="`;    // 注意，略微差别
        const originPath = `bundles/`;
        const suffix     = ``;    // 空字符串（同样可以工作）

        const reg = new RegExp(
          `(${pre})(${originPath})(${suffix})`,
          'g',                  // 查找替换所有
        );       // 查找正则

        console.log('gen_Html', data.match(reg));

        const result = data.replace(reg, `$1${cdnPath}$4`);   // 替换中间段
        return result;
      }
    );
  });
}

// 生成js文件
gen_RuntimeJs();
// 生成html文件
gen_Html();
