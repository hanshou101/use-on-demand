export declare class xX_FileBlobBase64_Helper {
    /**
     * 【Base64】格式，转【Blob】格式。
     */
    static base64ToBlob(base64: string): Blob;
    /**
     * 【Base64】格式，转【Uint8Array】格式。
     */
    static url_base64_To_Uint8Array(base64String: string): Uint8Array;
    /**
     * 【Blob】格式，转【File】格式。
     *        1.附加参考资料：[node.js - How to convert Blob to File in JavaScript - Stack Overflow](https://stackoverflow.com/a/29390393/6264260)
     */
    static blobToFile(theBlob: Blob, fileName: string): File;
    /**
     * 【File】格式，转【Base64】格式。
     *        1.附加参考资料：[How to convert file to base64 in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript)
     */
    static fileToBase64(file: File): Promise<FileReader['result']>;
}
//# sourceMappingURL=FileBlobBase64_Helper.d.ts.map