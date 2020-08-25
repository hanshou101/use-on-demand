import {GeeStableE, GeeStableUtil} from './GeeStableUtil';

const {gtInit} = require('./_util/geetest/geetest.gt.js');    // 在使用工具时，引用该【lib文件】。

enum LangMapE {
  'zh-CN' = 'zh',
  'zh-HK' = 'zh-tw',
  'en-US' = 'en',
}                                       //
const lang = LangMapE['zh-HK'];

export class GeeBzUtil {

  /**
   * 内部SDK调用，唤起一次极验。
   */
  private static __innerSdkInit(
    data: GeePreInfo,
    toListen_GeeCtrlCbs: ToListen_GeeCtrlCbs,
  ): Promise<GeeCtrl> {
    return new Promise((resolve, reject) => {
      window.initGeetest({
        gt         : data.gt,
        challenge  : data.challenge || '',
        offline    : !data.success,
        new_captcha: true,
        //
        product    : 'bind',
        width      : '100%',
        lang       : lang,
      }, function (geeCtrl) {
        geeCtrl.onReady(function () {                          // 初始化完毕，回调
          toListen_GeeCtrlCbs.onReadySuc(geeCtrl);
        });
        geeCtrl.onSuccess(function () {                        // 极验手势校验成功，回调
          toListen_GeeCtrlCbs.onFingerSuc(geeCtrl);
        });
        geeCtrl.onError(function () {                          // 极验出现错误，回调
          toListen_GeeCtrlCbs.onReadyFailure(geeCtrl);
        });
        resolve(geeCtrl);
      });
    });
  }

  public static beginGee(
    preInfoApi: () => Promise<BgCoinApi.Bean<GeePreInfo>>,
    onFingerSuc: (
      rawVerifyRes: SdkVerifyFingerResNS.RawData,
      parsedHeader: SdkVerifyFingerResNS.ParsedHeader,
    ) => void,      // WARN 此处，不采用Promise的原因，是Promise天然适合【立即执行Verify】的逻辑；可能造成误解。
    immediateVerify = true,                               // 是否直接，调用verify方法
  ): Promise<NullableType<GeeCtrl>> {
    return new Promise(async (resolve, reject/*WARN 用不到*/) => {
      // 向服务器，请求【极验预信息】
      const {data}                  = (await preInfoApi());         // FIXME 这一步，可能会报出异常！
      const {enable, success, sign} = data;
      const stableE                 = GeeStableUtil.calcCurrent_GeeStable(enable, success);
      switch (stableE) {
        // 以下两个，header是{}
        case GeeStableE.NoGeetest_false_0:
        case GeeStableE.NoGeetest_false_1: {
          console.error('并非 后台开启且第三方正常 的情况，所以不初始化极验；仅仅返回【模拟数据】');
          onFingerSuc(
            {},
            {},
          );
          resolve(null);                          // 没有控制器可返回。
          break;
        }
        // 以下，header是{sign}
        case GeeStableE.ErrorGeetest__true_0: {
          onFingerSuc({
            sign,
          }, {
            'gt-sign': sign,
          });
          resolve(null);                          // 没有控制器可返回。
          break;
        }
        // 以下，header是{3个值}
        case GeeStableE.SuccessGeetest_true_1: {
          console.log('后台开启且第三方政策，所以，初始化极验');
          //
          const geeCtrl = await GeeBzUtil.__innerSdkInit(data, {         // 初始化极验验证的实例
            onReadySuc    : (_geeCtrl) => {
              console.log('极验SDK内部初始化', '已准备好', _geeCtrl);
              //
              if (immediateVerify) {
                console.log('立即执行Verify');
                _geeCtrl.verify();
              } else {
                console.log('等待手动调用Verify');
              }
            },
            onFingerSuc   : (_geeCtrl) => {
              const {geetest_challenge, geetest_validate, geetest_seccode} = _geeCtrl.getValidate() as SdkVerifyFingerResNS._RawData_SucType;
              onFingerSuc({
                  geetest_challenge,
                  geetest_validate,
                  geetest_seccode,
                }, {
                  'gt-challenge': geetest_challenge,
                  'gt-validate' : geetest_validate,
                  'gt-seccode'  : geetest_seccode,
                },
              );
            },
            onReadyFailure: (_geeCtrl) => {
              console.error('极验SDK内部初始化，出错了');
            },
          });
          console.log('这一步，还需要Verify方法，才会弹出【用户界面】');
          resolve(geeCtrl);
          break;
        }
      }
    });
  }
}
