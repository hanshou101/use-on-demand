export class SDateTime_Helper {
    /**
     * 根据指定时间的倒计时功能
     */
    countDownForTime(__endTime, // 结束时间
    step_callBack, // 倒计时每走一次的回调函数
    finish_Callback) {
        const timeReg = /\d{13,}/;
        if (!timeReg.test(__endTime)) {
            console.error('endTime 必须是一个时间戳！');
            return;
        }
        if (!step_callBack || typeof step_callBack != 'function') {
            console.error('callBack 必须是一个函数！');
            return;
        }
        const endTime = Number(__endTime);
        const endDate = new Date(endTime);
        let ms = 0;
        const clear = function () {
            clearInterval(timer);
        };
        const timer = setInterval(() => {
            ms = (endDate.getTime() - new Date().getTime());
            let result = {
                day: '0',
                hours: '0',
                minutes: '0',
                seconds: '0',
            };
            if (ms < 0) {
                clearInterval(timer);
                if (finish_Callback && typeof finish_Callback == 'function') {
                    finish_Callback(result); // 此时，都为零
                }
                return;
            }
            result = SDateTime_Helper.getTimePartStr(ms); // 这一条，可能是负数。
            step_callBack(result, clear);
        }, 1000);
    }
    static getTimePartStr(ms) {
        const s = ms / 1000;
        const day = Math.floor(s / 60 / 60 / 24);
        const hours = Math.floor(s / 60 / 60 % 24);
        const minutes = Math.floor(s / 60 % 60);
        const seconds = Math.floor(s % 60);
        const result = {
            day: this.completeTimePartZero(day),
            hours: this.completeTimePartZero(hours),
            minutes: this.completeTimePartZero(minutes),
            seconds: this.completeTimePartZero(seconds),
        };
        console.log(result);
        return result;
    }
    /**
     * 将0-9的数字前面加上0
     *        1.举例："1"，变为"01"。
     */
    static completeTimePartZero(timePart) {
        return parseInt(timePart) < 10 ?
            '0' + String(timePart)
            : String(timePart);
    }
}
export class ServerTime_Helper {
    /**
     *  保存【时间差值】
     */
    static saveDiffTime(header) {
        const HeaderDate = header.Date;
        const serverT = new Date(HeaderDate).getTime();
        const clientT = new Date().getTime();
        this.diffTime = serverT - clientT;
    }
    /**
     *  获取【服务器真实】当下时间，时间戳。
     */
    static getServer_NowTime_Ts() {
        return new Date().getTime() + this.diffTime;
    }
    /**
     *  获取【服务器真实】目标时间，时间戳。
     */
    static getServer_TargetTime_Ts(targetTimeStr) {
        const fix_iOSBug_Str = targetTimeStr.replace(/-/g, '/'); // IOS的时间特质，有点奇怪。所以在这里，加上转化判断。
        return new Date(fix_iOSBug_Str).getTime() + this.diffTime;
    }
}
/**
 *  差异时间
 *          1.【服务器】-【客户端】。
 *          2.毫秒为单位。
 */
ServerTime_Helper.diffTime = 0;
//# sourceMappingURL=SDateTime_Helper.js.map