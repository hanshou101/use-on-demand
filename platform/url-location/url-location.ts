/**
 * 参考资料：https://www.runoob.com/w3cnote/js-get-url-param.html
 */
export function getQueryField(
  key: string,
  likeQuery?: string, // 如果外部没有传入，则取默认值
) {
  const query = likeQuery ?? window.location.search.substring(1);
  const vars  = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] == key) {
      return pair[1];
    }
  }
  return undefined;
}

export function getFullQueryObj() {
  const theRequest: { [key: string]: any } = {};

  const url = location.search; // 获取url中"?"符后的字串
  if (url.indexOf('?') != -1) {
    const str  = url.substr(1);
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  return theRequest;
}

/**
 * 【WebView】中，location.replace存在兼容性问题！
 */
export function fixbug_locationReplace(url: string) {
  if (history.replaceState) {
    history.replaceState(null, document.title, url);
    history.go(0);
  } else {
    location.replace(url);
  }
}

/**
 * 通过【Url+时间戳】，来实现【防止缓存】。
 */
export function checkHtmlVersion() {
  // 获取query参数
  const Request        = getFullQueryObj();
  const key            = Request.random;
  const originQuerySeq = Object.entries(Request).map((entry) => {
    return `&${entry[0]}=${entry[1]}`;        // 拼接，有两种方式。这里用第二种。（第一种，join('&')）
  });
  const otherQuery     = `${originQuerySeq.join('')}`;
  const duration       = 5 * (60 * 1000);

  /**
   * 此处，关于【页面跳转】，已经踩了不少坑。
   *    1.    window.location.href 会增加一条历史记录，这样有时用户体验会不好。出于这个考虑，意图更换为  replace
   *    2.    个别安卓机型，replace方法仍然会  产生【历史记录】；所以，采用StackoverFlow上的  方法，来进行Polyfill。
   *    3.    但是，因为有些安卓机型  微信内置浏览器，replace会永远携带  只读取缓存。所以replace方法，又重新被放弃。
   *
   *
   */

  if (!key) {
    // FIXME 已修复Bug：现在新增random字段时，不再覆盖现有的query值。
    console.log('没有时间戳，为页面添加时间戳');
    // alert(key);
    const refreshTarget  = `?random=${new Date().getTime()}${otherQuery}`; // 跳转
    window.location.href = refreshTarget;            // 策略一，会产生一条历史记录
    // window.location.replace(refreshTarget);        // 策略二，不会产生历史记录
    // fixbug_locationReplace(refreshTarget);
  } else {
    // TIP 如果超过了5分钟，则自动进行一次新的【replace】。
    const ts  = parseInt(key);
    const now = new Date().valueOf();
    console.log('有时间戳', ts);
    if (now - ts > duration) {
      console.log('已超时');
      const refreshTarget  = `?${otherQuery.substring(1)}`.replace(/random=\d+/, `random=${now}`); // 跳转      // TODO 此处，必定有一个【  ?random  】，所以不用担心query为空的问题。
      window.location.href = refreshTarget;
      // window.location.replace(refreshTarget);
      // fixbug_locationReplace(refreshTarget);
    } else {
      console.log('未超时');
      // alert('未超时：' + window.location.href);
    }
  }
}

export function smoothJump(id: string) {
  console.log('开始jump');
  const dom = document.querySelector(`#${id}`);
  if (dom) {
    console.log('存在');
    dom.scrollIntoView({
      behavior: 'smooth', // 默认 auto
      block   : 'start', // 默认 center
      inline  : 'start', // 默认 nearest
    });
  }
}
