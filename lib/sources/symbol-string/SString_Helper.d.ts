declare type PhoneMaskOption = 'start' | 'center' | 'end';
export declare class SString_Helper {
    /**
     * 创建一个【独一无二】的【随机字符串】
     */
    static create_RandUnique_Str(): string;
    /**
     * 格式化手机号
     * 如：
     * formatPhone("12345678910", "start") => ****5678910
     * formatPhone("12345678910", "center") => 123****8910
     * formatPhone("12345678910", "end") => 1234567****
     * @param _phone 手机号
     * @param format 格式，可选值有：start、center、end
     * @param _count 格式化多少个字符，默认4个
     * @returns {string}
     */
    starMask_Phone(_phone: string, format?: PhoneMaskOption, _count?: number): string;
    /**
     * 格式化邮箱
     * 如：
     * formatEmail("123456789@qq.com") => 12*****89@qq.com
     * formatEmail("abc@qq.com") => a*c@qq.com
     * formatEmail("abc123@qq.com") => a*****@qq.com
     * formatEmail("abc12@qq.com") => a***2@qq.com
     * formatEmail("a@qq.com") => *@qq.com
     * @param email 邮箱
     * @param _maxCount 最大截取长度，默认5
     */
    starMask_Email(email: string, _maxCount?: string | number): string;
    /**
     * 【文件】的体积大小，格式化显示。
     */
    static formatFileSize(bytes_num: number, fixed_num?: number): {
        GB: number;
        MB: number;
        KB: number;
        B: number;
        total_GB: string;
        total_MB: string;
        total_KB: string;
        total_B: string;
    };
    /**
     * 文本超出内容，用【省略号】代替
     */
    static ellipsisText(text: string, num?: number): string;
    /**
     * 数字超过指定大小，如【99】后；用【99+】代替
     */
    static outOfNum_99plus(_num: NumOrStr, _maxNum: NumOrStr): string | number;
    /**
     * 创建v-for独一无二的id。用法：将强制重建  列表循环内的【子组件】项。
     */
    static uid(): string;
}
export {};
//# sourceMappingURL=SString_Helper.d.ts.map