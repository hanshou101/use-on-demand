import FStream from 'fs';
import axios from 'axios';
import { DebugU, LogE } from '../../../debug-util/debug-util';
export class VersionUpdate_Helper {
    static getCheckUrl() {
        return `${location.origin}/${this.vFileName}?_=${Math.random()}`;
    }
    /**
     * 在路由跳转中，检查【版本更新】。
     */
    static checkVersion() {
        const nowTs = new Date().getTime();
        if (nowTs - this.lastCheckTs > this.checkIntervalTs) { // 如果，距离上次【检测更新】，已超过了【最小检测更新间隔时间】。
            /**
             * TIP 刷新【最近一次检查更新时间戳】
             * 				1.FIXME 此处，根据统计报告中的BUG。更新【最近一次时间戳】，适合放在  axios网络请求的外面（之前）。这样可以有效避免（死循环导致axios无限发送，进而pending，进而更加无限地发送）BUG。
             */
            this.lastCheckTs = new Date().getTime();
            axios.get(this.getCheckUrl()).then(({ data: resContent }) => {
                const localVersion = process.env.VUE_APP_VERSION;
                DebugU.l(LogE.versionCheck, '【新版线上】检查更新时，获得的版本号为：', resContent, '【老版本地】本地记录的版本号为：', localVersion);
                DebugU.l(LogE.versionCheck, '当前检查更新的时间戳为：', this.lastCheckTs);
                // 暂时不作，当前环境的检测。
                if (`${localVersion}` !== `${resContent}`) { // TIP 都转化为字符串后，进行判断。
                    console.log('判断：版本号不一致，开始更新。');
                    // alert('弹出这个标记，用以详细查看Console日志信息，进行分析比对。并且，可以有非常直观的【需要更新】和【不需要更新】的区分。')
                    window.location.reload(true); // TIP 此时，需要进行强制刷新，进而达到【清除缓存】+【获取最新网页+资源文件】的效果。
                }
                else {
                    console.log('判断：版本号一致。不需更新。');
                }
            });
        }
    }
}
VersionUpdate_Helper.vFileName = 'version.js';
VersionUpdate_Helper.lastCheckTs = new Date().getTime();
VersionUpdate_Helper.checkIntervalTs = 1 * 1000;
//
/**
 * 在打包时，设置【版本号】。
 * 				1.建议，无论是【开发环境】还是【打包环境】，都执行【设置版本号】操作。
 */
VersionUpdate_Helper.setVersion_onBuild = function (config, versionFilePath = `public/${VersionUpdate_Helper.vFileName}`) {
    var _a;
    const definePlugin = (_a = config.plugins) === null || _a === void 0 ? void 0 : _a.find(item => {
        return item.hasOwnProperty('definitions');
    });
    if (!definePlugin) {
        throw new Error('definePlugin不存在！');
    }
    const processEnv = definePlugin.definitions['process.env'];
    console.log('检测更新，对应插件', definePlugin);
    /**
     * TIP
     * 		1.发布到线上后 process.env.VUE_APP_VERSION 又被还原了 没有效果，
     * 		2.换成 config.plugins[1].definitions['process.env'].VUE_APP_VERSION 实测可行
     */
    processEnv.VUE_APP_VERSION = new Date().getTime() + ''; // 设置版本号
    console.log('当前版本', processEnv.VUE_APP_VERSION);
    // 使用文件管理工具，创建版本号文件
    console.log('尝试写入：版本信息文件');
    FStream.writeFile(versionFilePath, processEnv.VUE_APP_VERSION, function (err) {
        if (err) {
            throw err;
        }
        else {
            console.log('写入成功');
        }
    });
};
//# sourceMappingURL=VersionUpdate_Helper.js.map