export declare class xX_FileMd5_Helper {
    static downloadAndCreateHash(remoteUrl: string): Promise<string>;
    /**
     * 这种方式，可以正常运行。
     * 				1.之前，我曾嫌弃【crypto-js】的体积过大。
     * 				2。后来发现，【网络传输】中的各种【噪音】，如果自己手动处理，过于复杂。
     */
    static calculateMD5____CryptoJS_ArrayBuffer_Correct(blob: Blob): Promise<string>;
    /**
     * 这种方式，出现了【MD5计算不准】的问题。
     * 				1.可能和【返回文件】的【格式处理】有关。
     * 						1.用【String】进行处理时，可能被【网络传输】层，加入了【噪音】。
     * 				2.经过检验，【MD5_Helper】本身对【纯字符串】处理，是计算正确的。
     * 						1.但是，只有对【纯字符串】，是处理正确的。
     * 						2.无法处理【网络传输】的【噪音】问题。
     */
    private static calculateMD5_CustomMD5_String_Error;
}
//# sourceMappingURL=FileMd5_Helper.d.ts.map