declare namespace CountDownNS {
    interface StepRes {
        day: string;
        hours: string;
        minutes: string;
        seconds: string;
    }
    type StepCb = (res: StepRes, stopFn: Function) => void;
}
export declare class xX_SDateTime_Helper {
    /**
     * 根据指定时间的倒计时功能
     */
    countDownForTime(__endTime: string, // 结束时间
    step_callBack: CountDownNS.StepCb, // 倒计时每走一次的回调函数
    finish_Callback: Function): void;
    static getTimePartStr(ms: number): {
        day: string;
        hours: string;
        minutes: string;
        seconds: string;
    };
    /**
     * 将0-9的数字前面加上0
     *        1.举例："1"，变为"01"。
     */
    static completeTimePartZero(timePart: string | number): string;
}
export declare class xX_ServerTime_Helper {
    /**
     *  差异时间
     *          1.【服务器】-【客户端】。
     *          2.毫秒为单位。
     */
    static diffTime: number;
    /**
     *  保存【时间差值】
     */
    static saveDiffTime(header: {
        Date: string;
    }): void;
    /**
     *  获取【服务器真实】当下时间，时间戳。
     */
    static getServer_NowTime_Ts(): number;
    /**
     *  获取【服务器真实】目标时间，时间戳。
     */
    static getServer_TargetTime_Ts(targetTimeStr: string): number;
}
export {};
//# sourceMappingURL=SDateTime_Helper.d.ts.map