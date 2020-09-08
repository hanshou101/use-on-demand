import { __decorate, __metadata } from "tslib";
import fs from 'fs';
import { CDN_Helper } from './gen-helper';
import { EnvFlags } from '../envir/env-flags';
function staticImplements() {
    return function (constructor) {
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
var RuntimeJs_Config = /** @class */ (function () {
    function RuntimeJs_Config(fileName) {
        this.fileName = fileName;
    } //
    RuntimeJs_Config_1 = RuntimeJs_Config;
    RuntimeJs_Config.prototype.tplPath = function () {
        return RuntimeJs_Config_1.basePath.tpl + this.fileName;
    }; //
    RuntimeJs_Config.prototype.targetPath = function () {
        return RuntimeJs_Config_1.basePath.target + this.fileName;
    };
    var RuntimeJs_Config_1;
    RuntimeJs_Config.basePath = {
        tpl: "./gen/tpl/",
        target: "./static/js/charting_library/static/bundles/",
    }; //
    RuntimeJs_Config = RuntimeJs_Config_1 = __decorate([
        staticImplements(),
        __metadata("design:paramtypes", [String])
    ], RuntimeJs_Config);
    return RuntimeJs_Config;
}());
/**
 * Html的配置。
 */
var Html_Config = /** @class */ (function () {
    function Html_Config(fileName) {
        this.fileName = fileName;
    } //
    Html_Config_1 = Html_Config;
    Html_Config.prototype.tplPath = function () {
        return Html_Config_1.basePath.tpl + this.fileName;
    }; //
    Html_Config.prototype.targetPath = function () {
        return Html_Config_1.basePath.target + this.fileName;
    };
    var Html_Config_1;
    Html_Config.basePath = {
        tpl: "./gen/tpl/",
        target: "./static/js/charting_library/static/",
    }; //
    Html_Config = Html_Config_1 = __decorate([
        staticImplements(),
        __metadata("design:paramtypes", [String])
    ], Html_Config);
    return Html_Config;
}());
var cdnPath = EnvFlags.finalCheck_useCDN
    ? CDN_Helper.c_baseUrl + "js/charting_library/static/bundles/" // 使用CDN
    : "bundles/"; // 不使用CDN
function read_replace_write(tplPath, targetPath, replcaeFn) {
    fs.readFile(tplPath, 'utf-8', function (err, data) {
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
    var config = [
        new RuntimeJs_Config('runtime.d22af752ee0c2111becd.js'),
    ];
    config.forEach(function (item) {
        read_replace_write(item.tplPath(), item.targetPath(), function (data) {
            /**
             * d.p="bundles/"                             （注意，略微差别）
             */
            var pre = "d.p=\"";
            var originPath = "bundles/";
            var suffix = "\"";
            var reg = new RegExp("(" + pre + ")(" + originPath + ")(" + suffix + ")", 'g'); // 查找正则
            console.log('gen_RuntimeJs', data.match(reg));
            var result = data.replace(reg, "$1" + cdnPath + "$3"); // 替换中间段
            return result;
        });
    });
}
function gen_Html() {
    var config = [
        new Html_Config('zh-tv-chart.08b1d9ed36065f36316f.html'),
        new Html_Config('en-tv-chart.08b1d9ed36065f36316f.html'),
    ];
    config.forEach(function (item) {
        read_replace_write(item.tplPath(), item.targetPath(), function (data) {
            /**
             * src="bundles/                               （注意，略微差别）
             */
            var pre = "(src|href)=\""; // 注意，略微差别
            var originPath = "bundles/";
            var suffix = ""; // 空字符串（同样可以工作）
            var reg = new RegExp("(" + pre + ")(" + originPath + ")(" + suffix + ")", 'g'); // 查找正则
            console.log('gen_Html', data.match(reg));
            var result = data.replace(reg, "$1" + cdnPath + "$4"); // 替换中间段
            return result;
        });
    });
}
// 生成js文件
gen_RuntimeJs();
// 生成html文件
gen_Html();
//# sourceMappingURL=gen-tradingView.js.map