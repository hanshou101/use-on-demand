export namespace xX_Download_Upload_Helper {
	export class Download {

	}

	export class Upload {

		/**
		 * 1.参考资料：
		 *        [图片格式_百度百科](https://baike.baidu.com/item/%E5%9B%BE%E7%89%87%E6%A0%BC%E5%BC%8F/381122?fr=aladdin)
		 */
		public static imageExts = [		// 注意，都转化为小写的。
			'JPG',
			'JPEG',
			'PNG',
			//
			'BMP',
			'GIF',
			'WEBP',
			//
			'JFIF',
			'PJPEG',
			'PJP',
			'TIF',
			'PCX',
			'TGA',
			'EXIF',
			'FPX',
			'SVG',
			'PSD',
			'CDR',
			'PCD',
			'DXF',
			'UFO',
			'EPS',
			'AI',
			'RAW',
			'WMF',
			'AVIF',
		].map(name => name.toLowerCase());

		public static acceptMap = {
			/**
			 * 1.此处，StackOverFlow，给出的高赞答案，在【macOS 10.15.7 Catalina】版本下，是有错误的：
			 * 				【Excel 的 accept】https://stackoverflow.com/a/11834872/6264260
			 *
			 * 2.所以，我们通过【试验】+【总结其它答案】，拼凑出了一条，比较完整的。
			 * 				个人总结的答案：https://stackoverflow.com/a/64926038/6264260
			 */
			excel: [
				'.csv',
				'.xls',
				'.xlsx',
				//
				'text/csv',														// 有局限，不推荐
				'application/csv',										// 有局限，不推荐
				'text/comma-separated-values',				// 仅适用于 Opera
				'application/csv',							// 仅作候补尝试
				'application/excel',						// 仅作候补尝试
				// 'application/vnd.ms-excel',			// 仅作候补尝试
				'application/vnd.msexcel',			// 仅作候补尝试
				'text/anytext',									// 仅作候补尝试
				//
				'application/vnd.ms-excel',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			].join(' , '),

			image: Upload.imageExts.map(type => `image/${type}`).join(' , '),

		} as const;

		/**
		 * 检查【文件后缀名】
		 *
		 * 1.参考资料：
		 * 				https://stackoverflow.com/a/11833377/6264260
		 * 				https://stackoverflow.com/a/25230749/6264260
		 */
		checkFileExt(sender: HTMLInputElement) {
			const validExts = ['.xlsx', '.xls', '.csv'];
			const fileName = sender.value;
			const fileExt   = fileName.substring(fileName.lastIndexOf('.'));
			if (validExts.indexOf(fileExt) < 0) {
				alert(`Invalid file selected, valid files are of ${validExts.toString()} types.`);
				return false;
			} else {
				return true;
			}
		}

	}
}
