import { xX_MD5_Helper } from '../encrypt/MD5_Helper';
var xX_FileMd5_Helper = /** @class */ (function () {
    function xX_FileMd5_Helper() {
    }
    xX_FileMd5_Helper.calculateMD5 = function (blob) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            /*
                    reader.readAsArrayBuffer(blob);				// TIP 以【ArrayBuffer】读取
            */
            reader.readAsText(blob); // TIP 以【String】读取
            reader.onloadend = function () {
                /*
                        var wordArray = CryptoJS.lib.WordArray.create(reader.result),
                                hash      = CryptoJS.MD5(wordArray).toString();
                */
                var hash = xX_MD5_Helper.hash(reader.result); // WARN 将返回的结果，做Hash化。
                resolve(hash);
            };
        });
    };
    xX_FileMd5_Helper.downloadAndCreateHash = function (remoteUrl) {
        // const hashResultDiv = document.getElementById('hash-result');
        var _this = this;
        return fetch(remoteUrl)
            .then(function (response) {
            return response.blob();
        })
            .then(function (blob) {
            return _this.calculateMD5(blob);
        })
            .then(function (hash) {
            // hashResultDiv.innerHTML = hash;
            console.log("Hash of the file is: " + hash);
            return hash;
        })
            .catch(function (err) {
            // hashResultDiv.innerHTML = err;
            console.error(err);
            return Promise.reject(err);
        });
    };
    return xX_FileMd5_Helper;
}());
export { xX_FileMd5_Helper };
//# sourceMappingURL=FileMd5_Helper.js.map