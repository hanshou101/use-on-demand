/**
 * 该方法，仅可检测【Android】型号上的部分手机网络类型。
 */
export function getNetworkType_1 () {
  const connectInfo = (navigator as any).connection || navigator;
  console.log('方法1网络状态', connectInfo);
  const {downlink, effectiveType, onchange, rtt, saveData} = connectInfo;

  const json = JSON.stringify({downlink, effectiveType, onchange, rtt, saveData});
  alert(json);
  return '';
}

export function getNetworkType_2 () {
  const ua       = navigator.userAgent;
  // @ts-ignore
  let networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other';
  networkStr     = networkStr.toLowerCase().replace('nettype/', '');
  let networkType;
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
