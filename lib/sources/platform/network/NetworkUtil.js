/**
 * 该方法，仅可检测【Android】型号上的部分手机网络类型。
 */
export function getNetworkType_1() {
    var connectInfo = navigator.connection || navigator;
    console.log('方法1网络状态', connectInfo);
    var downlink = connectInfo.downlink, effectiveType = connectInfo.effectiveType, onchange = connectInfo.onchange, rtt = connectInfo.rtt, saveData = connectInfo.saveData;
    var json = JSON.stringify({ downlink: downlink, effectiveType: effectiveType, onchange: onchange, rtt: rtt, saveData: saveData });
    alert(json);
    return '';
}
export function getNetworkType_2() {
    var ua = navigator.userAgent;
    // @ts-ignore
    var networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other';
    networkStr = networkStr.toLowerCase().replace('nettype/', '');
    var networkType;
    switch (networkStr) {
        case 'wifi':
            networkType = 'wifi';
            break;
        case '5g':
            networkType = '5g';
            break;
        case '4g':
            networkType = '4g';
            break;
        case '3g':
            networkType = '3g';
            break;
        case '3gnet':
            networkType = '3g';
            break;
        case '2g':
            networkType = '2g';
            break;
        default:
            networkType = 'other';
    }
    console.log('方法2检测网络状态', networkStr);
    alert(networkStr);
}
//# sourceMappingURL=NetworkUtil.js.map