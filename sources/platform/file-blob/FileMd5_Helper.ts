import { xX_MD5_Helper } from '../encrypt/MD5_Helper';


export class xX_FileMd5_Helper {


	public static calculateMD5(blob: Blob) {
		return new Promise<string>((resolve) => {
			const reader = new FileReader();
			/*
					reader.readAsArrayBuffer(blob);				// TIP 以【ArrayBuffer】读取
			*/
			reader.readAsText(blob);			// TIP 以【String】读取
			reader.onloadend = function() {
				/*
						var wordArray = CryptoJS.lib.WordArray.create(reader.result),
								hash      = CryptoJS.MD5(wordArray).toString();
				*/
				const hash = xX_MD5_Helper.hash(reader.result as string);						// WARN 将返回的结果，做Hash化。
				resolve(hash);
			};
		});
	}

	public static downloadAndCreateHash(remoteUrl: string): Promise<string> {

		// const hashResultDiv = document.getElementById('hash-result');

		return fetch(remoteUrl)
			.then(function(response) {
				return response.blob();
			})
			.then(blob => {
				return this.calculateMD5(blob);
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
}
