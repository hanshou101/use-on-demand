import fs   from 'fs';
import path from 'path';

export class FsUtil {
	/**
	 * 创建目录。（同步）
	 *        1.可以一次性，创建多个递进目录。
	 *        				1.比如 本来a目录不存在 ，但我们可以一次性创建 a/b/c/d/e
	 *
	 */
	public static createFolderSync(to: string) {
		const _sep    = path.sep;																	// 分隔符
		const folders = path.dirname(to).split(_sep);							// 返回【从路径提取到目录】的字符串。再分隔开
		let p         = '';
		console.log('folders', folders);
		while (folders.length) {
			p += folders.shift() + _sep;														// 从前往后数。
			if (!fs.existsSync(p)) {				// 如果当前层次，目录不存在，则创建。
				fs.mkdirSync(p);			// 创建目录。
			}
		}
	}
}
