import { CheckRefWrapper } from './RefCheckUtils';
export declare class DrawUtil {
    private static readonly SyntaxSep;
    private static readonly GraphType;
    /**
     * 绘制流程图
     */
    static drawFlow(eleObjsWrapper: CheckRefWrapper, operations: string[]): string;
    /**
     * 检查是否有开始标签、结束标签。
     */
    private static checkHasStartEnd;
    /**
     * 检查连接线。
     *        1.除【条件】、【平行】之外的框，连接数是否超过1
     */
    private static checkLinks;
}
//# sourceMappingURL=DrawUtil.d.ts.map