import sha1 from 'sha1';                        // 签名服务必要的

declare global {
  interface WxTicketBean {
    ticket: string;
  }
}

import e from "express";
import request, {Response} from "request";
import {WxConfig}          from "./wxConfig";

let wx_ticket_json: WxTicketBean | null = null;
let wx_ticket_lastUpdateTime            = new Date().getTime();           // TIP 服务器启动时，则自动记录当前时间。
let ticket_expireTime                   = (7200 - 500) * 1000;       // TIP 暂定为7200秒。（再减去500秒，因为考虑到延时）

const timeStamp = new Date().getTime();


function wx_getTicket (req: e.Request, res: e.Response, next: e.NextFunction) {

  // 首先，访问自身的接口。获取Token值。

  console.log('获取原始originalUrl？', req.originalUrl);            // TIP 这个，就是你所需要的。原始子URL。

  request(/*options*/
    {
      headers: {"Connection": "close"},                         // TIP 这里，估计网上资料的初衷，是为了避免大量【close_wait】的问题。
      url:     "http://www.geeksuper.top" + '/token',
      method:  'GET',
      json:    true,                                               // TIP 客户端告诉服务端，希望接收的【数据格式：JSON】。
      // body: req.body                                            // TIP 设置上传的body（如果为POST请求的话）。
    },
    function callback (error: any, response: Response, data: any) {
      if (!error && response.statusCode == 200) {
        console.log('------接口数据------', data);

        // TIP 此时，已经获取到wx_token的JSON对象。


        if (
          wx_ticket_json                         // ticket。
          &&
          (new Date().getTime() - wx_ticket_lastUpdateTime < ticket_expireTime)      // 且，ticket
        ) {

          console.log('满足条件：有ticket，且没有过期，则直接返回');
          console.log('ticket:距离过期时间，还有', (wx_ticket_lastUpdateTime + ticket_expireTime - new Date().getTime()) / 1000, '秒');


          // FIXME 注意，返回时，要把带签名的数据，返回给  浏览器。
          // res.json(wx_ticket_json)

          res.json(___getWx_Sign_Json())

        } else {

          console.log('此时，没有ticket，或者ticket已经过期，尝试重新获取ticket。');


          request(/*options*/
            {
              headers: {"Connection": "close"},                         // TIP 这里，估计网上资料的初衷，是为了避免大量【close_wait】的问题。
              url:     WxConfig.wx_proxy_base_url + req.originalUrl + `?access_token=${data.access_token}&type=${'jsapi'}`,
              method:  'GET',
              json:    true,                                               // TIP 客户端告诉服务端，希望接收的【数据格式：JSON】。
              // body: req.body                                            // TIP 设置上传的body（如果为POST请求的话）。
            },
            function callback (error: any, response: Response, data: any) {
              if (!error && response.statusCode == 200) {
                console.log('------接口数据------', data);
                console.log('此时，已经获取到了TICKET的数据。');

                // TIP 此时，需要记录ticket
                wx_ticket_lastUpdateTime = new Date().getTime();
                wx_ticket_json           = data;
                // expireTime = data.expires_in     // 过期时间，暂时可以写死。


                // FIXME 注意，返回时，要把带签名的数据，返回给  浏览器。
                // res.json(data)      // 返回给浏览器。

                res.json(___getWx_Sign_Json())

              }
            }
          )
        }

      }
    }
  )

}


// 生成经由微信加密规则，加密过后的JSON参数串。
function ___getWx_Sign_Json () {
  let before_sign_string = 'jsapi_ticket=' + (wx_ticket_json as any).ticket + '&noncestr=' + WxConfig.noncestr + '&timestamp=' + timeStamp + '&url=' + WxConfig.wx_page;
  const sign_string      = sha1(before_sign_string);

  const forClient_json = {
    appId:     WxConfig.app_id + '', // 必填，公众号的唯一标识
    timestamp: timeStamp + '', // 必填，生成签名的时间戳
    nonceStr:  WxConfig.noncestr + '', // 必填，生成签名的随机串
    signature: sign_string + '',// 必填，签名，见附录1
    jsApiList: [
      "onMenuShareTimeline",      // 朋友圈（将过时）
      "onMenuShareAppMessage",    // 发送微信好友（将过时）
      "onMenuShareQQ",             // 发送到QQ（将过时）
      'updateAppMessageShareData',        // TIP 新版的微信好友
      'updateTimelineShareData',          // TIP 新版的微信朋友圈
      'onMenuShareWeibo',                 // TIP 分享到腾讯微博
      'onMenuShareQZone',                 // 分享到QQ空间（将过时）
    ]  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2

  };

  return forClient_json
}

export {
  wx_getTicket,
}
