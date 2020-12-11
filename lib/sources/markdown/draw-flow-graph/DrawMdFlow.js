import fs from 'fs';
import path from 'path';
import { FsUtil } from './sys-utils/FsUtil';
import { Case1 } from './cases/Case1';
var Cfg = function () {
    /**
     * 1.【绝对路径】，会直接导向 D盘。
     * 2.【相对路径】，会以当前项目根目录，为基准。
     */
    var env = {
        demo: Case1,
    };
    var _a = env.demo.draw(), title = _a.title, content = _a.content;
    var filePath = path.join(__dirname, "./dist/flow-" + title + "-" + new Date().valueOf() + ".md");
    return {
        filePath: filePath,
        title: title,
        content: content,
    };
}();
var xX_DrawMdFlow = /** @class */ (function () {
    function xX_DrawMdFlow() {
    }
    xX_DrawMdFlow.write = function () {
        // 创建目录
        FsUtil.createFolderSync(Cfg.filePath);
        // 写入文件
        var ws = fs.createWriteStream(Cfg.filePath);
        ws.write(Cfg.content);
    };
    return xX_DrawMdFlow;
}());
xX_DrawMdFlow.write();
//# sourceMappingURL=DrawMdFlow.js.map