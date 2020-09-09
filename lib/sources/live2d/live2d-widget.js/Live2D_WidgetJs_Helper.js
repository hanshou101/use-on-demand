// import {L2Dwidget}       from 'live2d-widget/lib/L2Dwidget.min.js';    // 这种方式，不能用import；只能用【window】方式。
// import {DomScript_Helper} from '../../dom/dom-script';
var _a;
import { DomScript_Helper } from '../../dom/dom-script';
var CssE;
(function (CssE) {
    CssE["demo"] = "demo";
})(CssE || (CssE = {}));
var CdnModeE;
(function (CdnModeE) {
    CdnModeE["SelfPublic"] = "SelfPublic";
    CdnModeE["UnPkg"] = "UnPkg";
})(CdnModeE || (CdnModeE = {}));
var L2Dwidget_LoadWayE;
(function (L2Dwidget_LoadWayE) {
    L2Dwidget_LoadWayE[L2Dwidget_LoadWayE["DynamicLoad"] = 0] = "DynamicLoad";
    L2Dwidget_LoadWayE[L2Dwidget_LoadWayE["Import"] = 1] = "Import";
    L2Dwidget_LoadWayE[L2Dwidget_LoadWayE["SrcModuleImport"] = 2] = "SrcModuleImport";
    L2Dwidget_LoadWayE[L2Dwidget_LoadWayE["Require"] = 3] = "Require";
})(L2Dwidget_LoadWayE || (L2Dwidget_LoadWayE = {}));
export var Live2DModelE;
(function (Live2DModelE) {
    Live2DModelE["default_demo"] = "\u4E0D\u9700\u8981\u4F20\u503C\uFF0C\u7559\u4E00\u4E2Aundefined\u5373\u53EF";
    Live2DModelE["chitose"] = "chitose";
    /**
     * 原数据为；["epsilon2.1", "epsilon2_1"]。
     *        1.目录名和文件名，不一样。
     */
    Live2DModelE["epsilon2_1"] = "epsilon2_1";
    /**
     * 原数据为：["gantzert_felixander", "gf"]。
     *        1.目录名和文件名，不一样。
     */
    Live2DModelE["gf"] = "gf";
    //
    //
    //
    Live2DModelE["haru01"] = "haru01";
    Live2DModelE["haru02"] = "haru02";
    Live2DModelE["haruto"] = "haruto";
    Live2DModelE["hibiki"] = "hibiki";
    Live2DModelE["hijiki"] = "hijiki";
    Live2DModelE["izumi"] = "izumi";
    Live2DModelE["koharu"] = "koharu";
    Live2DModelE["miku"] = "miku";
    Live2DModelE["nico"] = "nico";
    Live2DModelE["ni-j"] = "ni-j";
    Live2DModelE["nipsilon"] = "nipsilon";
    Live2DModelE["nito"] = "nito";
    Live2DModelE["shizuku"] = "shizuku";
    Live2DModelE["tororo"] = "tororo";
    // FIXME 【tsumiki】的远程资源包 【/assets/exp】 ，因为大小写的缘故，全都挂了。
    // FIXME 【tsumiki】的远程资源包 【/assets/exp】 ，因为大小写的缘故，全都挂了。
    // FIXME 【tsumiki】的远程资源包 【/assets/exp】 ，因为大小写的缘故，全都挂了。
    Live2DModelE["tsumiki"] = "tsumiki";
    Live2DModelE["Unitychan"] = "Unitychan";
    Live2DModelE["wanko"] = "wanko";
    Live2DModelE["z16"] = "z16";
})(Live2DModelE || (Live2DModelE = {}));
var Live2D_WidgetJs_Helper = /** @class */ (function () {
    function Live2D_WidgetJs_Helper() {
    }
    Live2D_WidgetJs_Helper.initDemo = function (modelE, pathCfg) {
        var _this = this;
        if (modelE === void 0) { modelE = Live2DModelE.default_demo; }
        if (pathCfg === void 0) { pathCfg = this.pathCfg; }
        getL2Dwidget().then(function (_exports) {
            console.log('最新调用', _exports);
            var L2Dwidget = _exports.L2Dwidget;
            _this.loadDemoCss(CssE.demo); // 尝试加载CSS
            L2Dwidget
                .on('*', function (name) {
                console.log('%c EVENT ' + '%c -> ' + name, // 事件
                'background: #222; color: yellow', 'background: #fff; color: #000');
            })
                .init({
                dialog: {
                    // 开启对话框
                    enable: true,
                    script: {
                        // 每空闲 10 秒钟，显示一条一言
                        'every idle 10s': '$hitokoto$',
                        // 当触摸到星星图案
                        'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
                        // 当触摸到角色身体
                        'tap body': '哎呀！别碰我！',
                        // 当触摸到角色头部
                        'tap face': '人家已经不是小孩子了！',
                    },
                },
                model: {
                    jsonPath: modelE === Live2DModelE.default_demo ? undefined : getModelUrl(modelE, pathCfg),
                },
                display: {
                    position: 'left',
                },
            });
            // });
        });
    };
    Live2D_WidgetJs_Helper.loadDemoCss = function (cssE) {
        if (!this.cssLoadStatus[cssE]) { // 未加载过该CSS
            this.cssLoadStatus[cssE] = true; // TIP 记录，该CSS已经加载
            switch (cssE) {
                case CssE.demo:
                    require('./css/default-demo.less');
                    break;
            }
        }
        else { // 已加载过该CSS
            console.log('该CSS已经加载过', cssE);
        }
    };
    /**
     * 根据【live2d-widget.js】库的不同版本，选择不同的加载方式。
     */
    Live2D_WidgetJs_Helper.libLoadWay = L2Dwidget_LoadWayE.SrcModuleImport;
    Live2D_WidgetJs_Helper.cdnMode = CdnModeE.UnPkg;
    /**
     * Model存储空间 的【远程路径】。
     */
    Live2D_WidgetJs_Helper.pathCfg = {
        modelBase: 'http://test-admin.bgex.link/',
    };
    //
    //
    //
    //
    //
    /**
     * CSS，加载状态表
     */
    Live2D_WidgetJs_Helper.cssLoadStatus = (_a = {},
        _a[CssE.demo] = false,
        _a);
    return Live2D_WidgetJs_Helper;
}());
export { Live2D_WidgetJs_Helper };
//
function getModelUrl(modelE, pathCfg) {
    switch (Live2D_WidgetJs_Helper.cdnMode) {
        //
        //
        //
        case CdnModeE.SelfPublic: { // 从自身public目录获取
            var dirName = modelE.valueOf().toLowerCase();
            var fileName = (function () {
                switch (modelE) {
                    case Live2DModelE.epsilon2_1:
                        return 'epsilon2.1';
                    case Live2DModelE.gf:
                        return 'gantzert_felixander';
                    default:
                        return modelE.valueOf().toLowerCase(); // WARN 转化为小写字母。
                }
            })();
            // TIP 加上远程路径。
            return pathCfg.modelBase + ("live2d/model/live2d-widget-model-" + dirName + "/assets/" + fileName + ".model.json");
        }
        //
        //
        //
        case CdnModeE.UnPkg: { // 从远程 Unpkg.com 网站，进行获取
            var dirName = (function () {
                switch (modelE) {
                    case Live2DModelE.haru01:
                        return 'haru'; // 需要拼接中间目录。
                    case Live2DModelE.haru02:
                        return 'haru'; // 需要拼接中间目录。
                    default:
                        return modelE.valueOf().toLowerCase(); // WARN 转化为小写字母。
                }
            })();
            var middleDir = (function () {
                switch (modelE) {
                    case Live2DModelE.haru01:
                        return '01/'; // 需要拼接中间目录。
                    case Live2DModelE.haru02:
                        return '02/'; // 需要拼接中间目录。
                    default:
                        return ''; // 默认没有中间目录
                }
            })();
            var fileName = (function () {
                switch (modelE) {
                    case Live2DModelE.epsilon2_1:
                        return 'Epsilon2.1'; // 首字母大写！
                    case Live2DModelE.gf:
                        return 'Gantzert_Felixander';
                    default:
                        return modelE.valueOf().toLowerCase(); // WARN 转化为小写字母。
                }
            })();
            return "https://unpkg.com/live2d-widget-model-" + dirName + "@latest/" + middleDir + "assets/" + fileName + ".model.json";
        }
    }
}
function getL2Dwidget() {
    switch (Live2D_WidgetJs_Helper.libLoadWay) {
        case L2Dwidget_LoadWayE.DynamicLoad: { // TIP 动态脚本加载
            console.log('此处注意，【public】目录，最终是落在了哪一个项目上');
            return DomScript_Helper.loadJsScript_Async('/L2Dwidget/3.1.5/L2Dwidget.min.js').then(function () {
                return {
                    L2Dwidget: window.L2Dwidget,
                };
            });
        }
        case L2Dwidget_LoadWayE.Import: { // TIP Import方式
            return import('live2d-widget');
        }
        /**
         * TIP 此处，官方的【发行版本】并没有给出最新的【common.js】。
         *        1.我们可以【下载代码】，然后【手动打包】出来。
         *        2.
         */
        case L2Dwidget_LoadWayE.SrcModuleImport: {
            // 								上面方法，好像个别环境，会有【exports is not defined】的问题。
            return Promise.resolve(require('./3.1.5/L2Dwidget.common.js'));
            // @ts-ignore
            // return import('./3.1.5/L2Dwidget.common.js').then(exports => {
            // 	return {
            // 		L2Dwidget: exports as L2Dwidget_SimpleNS.L2Dwidget_Type,
            // 	};
            // });
        }
        case L2Dwidget_LoadWayE.Require: {
            return Promise.resolve({
                L2Dwidget: require('live2d-widget/lib/L2Dwidget.min.js'),
            });
        }
    }
}
//# sourceMappingURL=Live2D_WidgetJs_Helper.js.map