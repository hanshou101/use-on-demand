var FileBlobBase64_Helper = /** @class */ (function () {
    function FileBlobBase64_Helper() {
    }
    /**
     * 【Base64】格式，转【Blob】格式。
     */
    FileBlobBase64_Helper.prototype.base64ToBlob = function (base64) {
        var _a;
        var arr = base64.split(',');
        var mime = (_a = arr[0].match(/:(.*?);/)) === null || _a === void 0 ? void 0 : _a[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };
    /**
     * 【Blob】格式，转【File】格式。
     *        1.附加参考资料：[node.js - How to convert Blob to File in JavaScript - Stack Overflow](https://stackoverflow.com/a/29390393/6264260)
     */
    FileBlobBase64_Helper.prototype.blobToFile = function (theBlob, fileName) {
        var b = theBlob;
        // A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;
        // Cast to a File() type
        return theBlob;
    };
    /**
     * 【File】格式，转【Base64】格式。
     *        1.附加参考资料：[How to convert file to base64 in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript)
     */
    FileBlobBase64_Helper.prototype.fileToBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = function (error) { return reject(error); };
        });
    };
    return FileBlobBase64_Helper;
}());
export { FileBlobBase64_Helper };
//# sourceMappingURL=FileBlobBase64_Helper.js.map