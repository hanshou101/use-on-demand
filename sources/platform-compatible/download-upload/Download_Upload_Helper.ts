export namespace xX_Download_Upload_Helper {
	class Download {

	}

	class Upload {
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
		};

		/**
		 * 检查【文件后缀名】
		 *
		 * 1.参考资料：
		 * 				https://stackoverflow.com/a/11833377/6264260
		 * 				https://stackoverflow.com/a/25230749/6264260
		 */
		checkFileExt(sender: HTMLInputElement) {
			const validExts = ['.xlsx', '.xls', '.csv'];
			let fileName    = sender.value;
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
