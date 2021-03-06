export declare namespace xX_Download_Upload_Helper {
    class Download {
    }
    class Upload {
        /**
         * 1.参考资料：
         *        [图片格式_百度百科](https://baike.baidu.com/item/%E5%9B%BE%E7%89%87%E6%A0%BC%E5%BC%8F/381122?fr=aladdin)
         */
        static imageExts: string[];
        static acceptMap: {
            /**
             * 1.此处，StackOverFlow，给出的高赞答案，在【macOS 10.15.7 Catalina】版本下，是有错误的：
             * 				【Excel 的 accept】https://stackoverflow.com/a/11834872/6264260
             *
             * 2.所以，我们通过【试验】+【总结其它答案】，拼凑出了一条，比较完整的。
             * 				个人总结的答案：https://stackoverflow.com/a/64926038/6264260
             */
            readonly excel: string;
            readonly image: string;
        };
        /**
         * 检查【文件后缀名】
         *
         * 1.参考资料：
         * 				https://stackoverflow.com/a/11833377/6264260
         * 				https://stackoverflow.com/a/25230749/6264260
         */
        checkFileExt(sender: HTMLInputElement): boolean;
    }
}
//# sourceMappingURL=Download_Upload_Helper.d.ts.map