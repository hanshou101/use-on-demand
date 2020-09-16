export declare class xX_FileBlobBase64_Helper {
    /**
     * 【Base64】格式，转【Blob】格式。
     */
    base64ToBlob(base64: string): Blob;
    /**
     * 【Blob】格式，转【File】格式。
     *        1.附加参考资料：[node.js - How to convert Blob to File in JavaScript - Stack Overflow](https://stackoverflow.com/a/29390393/6264260)
     */
    blobToFile(theBlob: Blob, fileName: string): File;
    /**
     * 【File】格式，转【Base64】格式。
     *        1.附加参考资料：[How to convert file to base64 in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript)
     */
    fileToBase64(file: File): Promise<FileReader['result']>;
}
//# sourceMappingURL=FileBlobBase64_Helper.d.ts.map