function get_CryptoJS() {
	// @ts-ignore
	return import('crypto-js');
}

function get_Md5_Helper() {
	return import('../encrypt/MD5_Helper');
}

export class xX_FileMd5_Helper {


	public static downloadAndCreateHash(remoteUrl: string): Promise<string> {

		// const hashResultDiv = document.getElementById('hash-result');

		return fetch(remoteUrl)
			.then(function(response) {
				return response.blob();
			})
			.then(blob => {
				return this.calculateMD5____CryptoJS_ArrayBuffer_Correct(blob);
			})
			.then(hash => {
				// hashResultDiv.innerHTML = hash;
				console.log(`Hash of the file is: ${hash}`);
				return hash;
			})
			.catch(err => {
				// hashResultDiv.innerHTML = err;
				console.error(err);
				return Promise.reject(err);
			});

	}


	// TIP————————————————————————————————————————————————————————————————————————

	/**
	 * 这种方式，可以正常运行。
	 * 				1.之前，我曾嫌弃【crypto-js】的体积过大。
	 * 				2。后来发现，【网络传输】中的各种【噪音】，如果自己手动处理，过于复杂。
	 */
	public static calculateMD5____CryptoJS_ArrayBuffer_Correct(blob: Blob) {
		return new Promise<string>((resolve) => {
			const reader = new FileReader();
			reader.readAsArrayBuffer(blob);				// TIP 以【ArrayBuffer】读取
			reader.onloadend = function() {
				get_CryptoJS().then(CryptoJS => {
					const wordArray = CryptoJS.lib.WordArray.create(reader.result),
								hash      = CryptoJS.MD5(wordArray).toString();
					resolve(hash);
				});
			};
		});
	}

	/**
	 * 这种方式，出现了【MD5计算不准】的问题。
	 * 				1.可能和【返回文件】的【格式处理】有关。
	 * 						1.用【String】进行处理时，可能被【网络传输】层，加入了【噪音】。
	 * 				2.经过检验，【MD5_Helper】本身对【纯字符串】处理，是计算正确的。
	 * 						1.但是，只有对【纯字符串】，是处理正确的。
	 * 						2.无法处理【网络传输】的【噪音】问题。
	 */
	private static calculateMD5_CustomMD5_String_Error(blob: Blob) {
		return new Promise<string>((resolve) => {
			const reader = new FileReader();
			reader.readAsText(blob);			// TIP 以【String】读取
			reader.onloadend = function() {
				const res = reader.result as string;
				get_Md5_Helper().then(({ xX_MD5_Helper }) => {
					const hash = xX_MD5_Helper.hash(res);						// WARN 将返回的结果，做Hash化。
					// console.log('读取到的结果为', res, 'hash为', hash /*'用于演示的DemoHash为', demoHash*/);
					resolve(hash);
				});
			};
		});
	}

}
