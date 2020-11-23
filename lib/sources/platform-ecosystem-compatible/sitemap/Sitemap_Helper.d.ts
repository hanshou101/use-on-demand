export declare class xX_Sitemap_Helper {
    /**
     * 参考资料：
     * 				https://www.npmjs.com/package/sitemap-generator
     * 				https://github.com/lgraubner/sitemap-generator
     */
    static generateSiteMap_useLib(): void;
    /**
     * 手动生成【sitemap.xml】。
     * 				1.
     * 				2.
     */
    static generateSiteMap_manual(cfg?: {
        /**
         * 参考资料：
         *				【greenrock2006】的回答：http://zhidao.baidu.com/question/1793260?sharesource=qzone
         *				常见网页格式，列表：https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F%E5%88%97%E8%A1%A8#%E7%B6%B2%E9%A0%81%E7%A8%8B%E5%BC%8F
         */
        exts: string[];
        baseDir: string;
        website: string;
    }): Promise<boolean>;
}
//# sourceMappingURL=Sitemap_Helper.d.ts.map