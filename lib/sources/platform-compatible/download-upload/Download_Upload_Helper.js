export var xX_Download_Upload_Helper;
(function (xX_Download_Upload_Helper) {
    var Download = /** @class */ (function () {
        function Download() {
        }
        return Download;
    }());
    xX_Download_Upload_Helper.Download = Download;
    var Upload = /** @class */ (function () {
        function Upload() {
        }
        /**
         * 检查【文件后缀名】
         *
         * 1.参考资料：
         * 				https://stackoverflow.com/a/11833377/6264260
         * 				https://stackoverflow.com/a/25230749/6264260
         */
        Upload.prototype.checkFileExt = function (sender) {
            var validExts = ['.xlsx', '.xls', '.csv'];
            var fileName = sender.value;
            var fileExt = fileName.substring(fileName.lastIndexOf('.'));
            if (validExts.indexOf(fileExt) < 0) {
                alert("Invalid file selected, valid files are of " + validExts.toString() + " types.");
                return false;
            }
            else {
                return true;
            }
        };
        Upload.acceptMap = {
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
                'text/csv',
                'application/csv',
                'text/comma-separated-values',
                'application/csv',
                'application/excel',
                // 'application/vnd.ms-excel',			// 仅作候补尝试
                'application/vnd.msexcel',
                'text/anytext',
                //
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ].join(' , '),
        };
        return Upload;
    }());
    xX_Download_Upload_Helper.Upload = Upload;
})(xX_Download_Upload_Helper || (xX_Download_Upload_Helper = {}));
//# sourceMappingURL=Download_Upload_Helper.js.map