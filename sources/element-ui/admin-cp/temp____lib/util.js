/* eslint-disable */

export const formatDate        = (date, val) => {
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	m     = m < 10 ? ('0' + m) : m;
	let d = date.getDate();
	d     = d < 10 ? ('0' + d) : d;
	let h = date.getHours();
	if (val == 'startTime') {
		return y + '-' + m + '-' + d + ' ' + '00:00:00';
	} else if (val == 'endTime') {
		return y + '-' + m + '-' + d + ' ' + '23:59:59';
	}
};
const getCurrentDate           = () => {
	return new Date();
};
// 获取当天起止时间
export const getCurrentday     = () => {
	let startStop = new Array();
	startStop.push(formatDate(getCurrentDate(), 'startTime'));
	startStop.push(formatDate(getCurrentDate(), 'endTime'));
	return startStop;
};
// 获取本周起止时间
export const getCurrentWeek    = () => {
	let startStop   = new Array();
	//获取当前时间
	let currentDate = getCurrentDate();
	//返回date是一周中的某一天
	let week        = currentDate.getDay();
	//返回date是一个月中的某一天
	let month       = currentDate.getDate();
	//一天的毫秒数
	let millisecond = 1000 * 60 * 60 * 24;
	//减去的天数
	let minusDay    = week != 0 ? week - 1 : 6;
	//alert(minusDay);
	//本周 周一
	let monday = new Date(currentDate.getTime() - (minusDay * millisecond));
	//本周 周日
	let sunday = new Date(monday.getTime() + (6 * millisecond));
	startStop.push(formatDate(monday, 'startTime'));
	startStop.push(formatDate(sunday, 'endTime'));
	return startStop;
};
// 获取本月起止时间
export const getCurrentMonth   = () => {
	let startStop    = new Array();
	//获取当前时间
	let currentDate  = getCurrentDate();
	//获得当前月份0-11
	let currentMonth = currentDate.getMonth();
	//获得当前年份4位年
	let currentYear  = currentDate.getFullYear();
	//求出本月第一天
	let firstDay     = new Date(currentYear, currentMonth, 1);
	//当为12月的时候年份需要加1
	//月份需要更新为0 也就是下一年的第一个月
	if (currentMonth == 11) {
		currentYear++;
		currentMonth = 0; //就为
	} else {
		//否则只是月份增加,以便求的下一月的第一天
		currentMonth++;
	}
	//一天的毫秒数
	let millisecond     = 1000 * 60 * 60 * 24;
	//下月的第一天
	let nextMonthDayOne = new Date(currentYear, currentMonth, 1);
	//求出上月的最后一天
	let lastDay         = new Date(nextMonthDayOne.getTime() - millisecond);
	startStop.push(formatDate(firstDay, 'startTime'));
	startStop.push(formatDate(lastDay, 'endTime'));
	return startStop;
};
// 获取n天前的起止时间
export const getDay            = (n) => {
	let startStop   = new Array();
	let curTime     = new Date().getTime();
	let currentDate = getCurrentDate();
	let startDate   = curTime - (n * 3600 * 24 * 1000);
	let firstDay    = new Date(startDate);
	startStop.push(formatDate(firstDay, 'startTime'));
	startStop.push(formatDate(currentDate, 'endTime'));
	return startStop;
};
// 获取一个月前的当日至当日的起止时间
export const getBeforeOneMonth = (AddDayCount) => {
	let startStop = new Array();
	let date      = new Date();
	var curdate   = date.getDate();
	var lastmonth = new Date(date.getTime()); // 不直接修改原对象
	lastmonth.setDate(0); //上月最后一天，当前月为一月时这种写法会退到上一年十二月
	var lastmax = lastmonth.getDate();
	if (curdate <= lastmax) {//天值不大于上月最大一天，天值同步
		lastmonth.setDate(curdate);
	} else {
		if (isRtnNull) {
			return null;
		}
	}
	startStop.push(formatDate(lastmonth, 'startTime'));
	startStop.push(formatDate(date, 'endTime'));
	return startStop;
};

