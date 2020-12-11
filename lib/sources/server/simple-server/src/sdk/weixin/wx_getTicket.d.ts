declare global {
    interface WxTicketBean {
        ticket: string;
    }
}
import e from "express";
declare function wx_getTicket(req: e.Request, res: e.Response, next: e.NextFunction): void;
export { wx_getTicket, };
//# sourceMappingURL=wx_getTicket.d.ts.map