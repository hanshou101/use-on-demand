export declare class xX_CVS_Excel_Helper {
    /**
     * 先将二维数组转成纯文本，重点是要处理可能在内容中出现的分隔符和双引号：
     */
    static arrayToCsv(data: any, args?: {
        columnDelimiter?: string;
        lineDelimiter?: string;
    }): any;
    /**
     * 导出cvs文件
     *        1.有空，要好好看看这段代码。可拓展面应该很广。
     */
    static exportCsv(inputData: any, filename?: string): void;
    /**
     * 从【】，触发【下载Excel】操作
     */
    static downloadExcel(url: string, filename?: string): void;
    /**
     * 从Excel文件中，获取某些行列。
     */
    static readArr_fromExcel(excel_file: File, // 传入的Excel文件
    sheet_field: any, // 筛选特定字段
    inputDom: any): Promise<unknown>;
    /**
     * 将文本，导出为【ZIP文件】
     */
    export_txt_to_zip(th: any, jsonData: any, txtName: string, zipName: string): Promise<unknown>;
    /**
     *
     */
    static export_table_to_excel(id: string): void;
    export_json_to_excel({ header, _data, filename, autoWidth }?: any): void;
}
//# sourceMappingURL=CVS_Excel_Helper.d.ts.map