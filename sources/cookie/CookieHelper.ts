// 对cookie的用法进行封装


import {DebugU, LogE} from '../debug-util/debug-util';

export class CookieHelper {

  // 设置cookie
  public static setCookie(
    name: string,
    value: string,
    exdays: number,
    path: string,
    domain: string,
  ) {
    let stExdays = '';
    let stDomain = '';
    if (exdays) {
      const date = new Date();
      date.setTime(date.getTime() + (parseInt(exdays) * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000));
      stExdays = ';expires=' + date.toUTCString();
    }
    if (domain) {
      stDomain = ';domain=' + domain;
    }
    window.document.cookie = name + '=' + value + stExdays + ';path=' + path + stDomain;

    DebugU.l(LogE.cookieUtil, '设置cookie',
      'name', name,
      'value', value,
      'exdays', exdays,
      'path', path,
      'domain', domain,
    );
  }

  // 获取cookie
  public static getCookie(name: string) {
    const cookieName = name + '=';
    const arr        = document.cookie.split(';');
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      while (item.charAt(0) === ' ') {
        item = item.substring(1);
      }
      if (!item.indexOf(cookieName)) {
        return item.substring(cookieName.length, item.length);
      }
    }
    return '';
  }

  // 清除cookie
  public static clearCookie(
    name: string,
    domain: string,
  ) {
    const date = new Date();
    date.setTime(date.getTime() - 10000);
    const cookieValue = this.getCookie(name);
    let stDomain      = '';
    if (domain) {
      stDomain = ';domain=' + domain;
    }
    if (cookieValue !== null) {
      document.cookie = name + '=' + ' ' + ';expires=' + date.toUTCString() + ';path=/' + stDomain;
    } else {
      alert(name + '的值为空！');
    }
    DebugU.l(LogE.cookieUtil, '清除cookie',
      'name', name,
      'domain', domain,
    );
  }
}

export function quickSave(
  key: string,
  _value: string,
  domain = location.hostname,
) {
  let finalV;
  if (_value == undefined && _value == null) {
    finalV = '';
  } else {
    finalV = _value;
  }
  CookieHelper.setCookie(
    key, finalV,
    1,                                            // 默认有效期1天。
    '/', domain);
}

export function quickGet(name: string) {
  return CookieHelper.getCookie(name);
}
