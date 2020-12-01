import fs               from 'fs';
import path             from 'path';
import { FsUtil }       from './sys-utils/FsUtil';
import { Case1 }        from './cases/Case1';
import { Case2 }        from './cases/Case2';
import { Hacker1 }      from './cases/Hacker1';
import { HackerPython } from './cases/HackerPython';

const Cfg = function() {
	/**
	 * 1.【绝对路径】，会直接导向 D盘。
	 * 2.【相对路径】，会以当前项目根目录，为基准。
	 */
	const env                = {
		demo: Case1,
		// demo: Case2,
		// demo: Hacker1,
		// demo: HackerPython,
	};
	const { title, content } = env.demo.draw();
	const filePath           = path.join(__dirname, `./dist/flow-${title}-${new Date().valueOf()}.md`);
	return {
		filePath,
		title,
		content,
	};
}();


class xX_DrawMdFlow {
	public static write() {
		// 创建目录
		FsUtil.createFolderSync(Cfg.filePath);
		// 写入文件
		const ws = fs.createWriteStream(Cfg.filePath);
		ws.write(Cfg.content);
	}
}


xX_DrawMdFlow.write();
