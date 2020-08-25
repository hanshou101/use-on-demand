var RuntimeJs_Config_1, Html_Config_1;
import { __decorate, __metadata } from "tslib";
import fs from 'fs';
import { CDN_Helper } from './gen-helper';
import { EnvFlags } from '../envir/env-flags';
function staticImplements() {
    return (constructor) => {
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
let RuntimeJs_Config = RuntimeJs_Config_1 = class RuntimeJs_Config {
    constructor(fileName) {
        this.fileName = fileName;
    } //
    tplPath() {
        return RuntimeJs_Config_1.basePath.tpl + this.fileName;
    } //
    targetPath() {
        return RuntimeJs_Config_1.basePath.target + this.fileName;
    }
};
RuntimeJs_Config.basePath = {
    tpl: `./gen/tpl/`,
    target: `./static/js/charting_library/static/bundles/`,
}; //
RuntimeJs_Config = RuntimeJs_Config_1 = __decorate([
    staticImplements(),
    __metadata("design:paramtypes", [String])
], RuntimeJs_Config);
/**
 * Html的配置。
 */
let Html_Config = Html_Config_1 = class Html_Config {
    constructor(fileName) {
        this.fileName = fileName;
    } //
    tplPath() {
        return Html_Config_1.basePath.tpl + this.fileName;
    } //
    targetPath() {
        return Html_Config_1.basePath.target + this.fileName;
    }
};
Html_Config.basePath = {
    tpl: `./gen/tpl/`,
    target: `./static/js/charting_library/static/`,
}; //
Html_Config = Html_Config_1 = __decorate([
    staticImplements(),
    __metadata("design:paramtypes", [String])
], Html_Config);
const cdnPath = EnvFlags.finalCheck_useCDN
    ? `${CDN_Helper.c_baseUrl}js/charting_library/static/bundles/` // 使用CDN
    : `bundles/`; // 不使用CDN
function read_replace_write(tplPath, targetPath, replcaeFn) {
    fs.readFile(tplPath, 'utf-8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        console.log('读取成功');
        fs.writeFile(targetPath, replcaeFn(data), 'utf8', function (_err) {
            if (_err) {
                return console.log(_err);
            }
            else {
                console.log('写入成功');
            }
        });
    });
}
function gen_RuntimeJs() {
    const config = [
        new RuntimeJs_Config('runtime.d22af752ee0c2111becd.js'),
    ];
    config.forEach((item) => {
        read_replace_write(item.tplPath(), item.targetPath(), (data) => {
            /**
             * d.p="bundles/"                             （注意，略微差别）
             */
            const pre = `d.p="`;
            const originPath = `bundles/`;
            const suffix = `"`;
            const reg = new RegExp(`(${pre})(${originPath})(${suffix})`, 'g'); // 查找正则
            console.log('gen_RuntimeJs', data.match(reg));
            const result = data.replace(reg, `$1${cdnPath}$3`); // 替换中间段
            return result;
        });
    });
}
function gen_Html() {
    const config = [
        new Html_Config('zh-tv-chart.08b1d9ed36065f36316f.html'),
        new Html_Config('en-tv-chart.08b1d9ed36065f36316f.html'),
    ];
    config.forEach((item) => {
        read_replace_write(item.tplPath(), item.targetPath(), (data) => {
            /**
             * src="bundles/                               （注意，略微差别）
             */
            const pre = `(src|href)="`; // 注意，略微差别
            const originPath = `bundles/`;
            const suffix = ``; // 空字符串（同样可以工作）
            const reg = new RegExp(`(${pre})(${originPath})(${suffix})`, 'g'); // 查找正则
            console.log('gen_Html', data.match(reg));
            const result = data.replace(reg, `$1${cdnPath}$4`); // 替换中间段
            return result;
        });
    });
}
// 生成js文件
gen_RuntimeJs();
// 生成html文件
gen_Html();
//# sourceMappingURL=gen-tradingView.js.map