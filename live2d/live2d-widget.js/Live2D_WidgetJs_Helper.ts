// import {L2Dwidget}       from 'live2d-widget/lib/L2Dwidget.min.js';    // 这种方式，不能用import；只能用【window】方式。
// import {DomScript_Helper} from '../../dom/dom-script';

import {DomScript_Helper} from '../../dom/dom-script';

enum CssE {
  demo = 'demo',
}

enum L2Dwidget_LoadWayE {
  DynamicLoad,
  Import,
  SrcModuleImport,
  Require,
}

function getL2Dwidget() {
  switch (Live2D_WidgetJs_Helper.libLoadWay) {
    case L2Dwidget_LoadWayE.DynamicLoad:                                                // TIP 动态脚本加载
      console.log('此处注意，【public】目录，最终是落在了哪一个项目上');
      return DomScript_Helper.loadJsScript_Async(
        '/L2Dwidget/3.1.5/L2Dwidget.min.js',
      ).then(() => {
        return {
          L2Dwidget: (window as any).L2Dwidget as L2Dwidget_SimpleNS.L2Dwidget_Type,
        };
      });
    case L2Dwidget_LoadWayE.Import:                                                     // TIP Import方式
      return import('live2d-widget');
    /**
     * TIP 此处，官方的【发行版本】并没有给出最新的【common.js】。
     *        1.我们可以【下载代码】，然后【手动打包】出来。
     *        2.
     */
    case L2Dwidget_LoadWayE.SrcModuleImport:
      return Promise.resolve(require('./3.1.5/L2Dwidget.common.js') as {
        L2Dwidget: L2Dwidget_SimpleNS.L2Dwidget_Type,
      });
    case L2Dwidget_LoadWayE.Require:
      return Promise.resolve({
        L2Dwidget: require('live2d-widget/lib/L2Dwidget.min.js') as L2Dwidget_SimpleNS.L2Dwidget_Type,
      });
  }
}

export class Live2D_WidgetJs_Helper {
  /**
   * 根据【live2d-widget.js】库的不同版本，选择不同的加载方式。
   */
  public static readonly libLoadWay: L2Dwidget_LoadWayE = L2Dwidget_LoadWayE.SrcModuleImport;

  /**
   * CSS，加载状态表
   */
  private static cssLoadStatus = {
    [CssE.demo]: false,
  };

  private static loadDemoCss(cssE: CssE) {
    if (!this.cssLoadStatus[cssE]) {      // 未加载过该CSS
      this.cssLoadStatus[cssE] = true;                // TIP 记录，该CSS已经加载
      switch (cssE) {
        case CssE.demo:
          require('./css/default-demo.less');
          break;
      }
    } else {                              // 已加载过该CSS
      console.log('该CSS已经加载过', cssE);
    }
  }

  public static initDemo() {
    getL2Dwidget().then(({L2Dwidget}) => {

      console.log(L2Dwidget);
      this.loadDemoCss(CssE.demo);      // 尝试加载CSS

      L2Dwidget
        .on('*', (name) => {
          console.log(
            '%c EVENT ' + '%c -> ' + name,      // 事件
            'background: #222; color: yellow', 'background: #fff; color: #000',   // 修饰的CSS
          );
        })
        .init({
          dialog: {
            // 开启对话框
            enable: true,
            script: {
              // 每空闲 10 秒钟，显示一条一言
              'every idle 10s': '$hitokoto$',
              // 当触摸到星星图案
              'hover .star'   : '星星在天上而你在我心里 (*/ω＼*)',
              // 当触摸到角色身体
              'tap body'      : '哎呀！别碰我！',
              // 当触摸到角色头部
              'tap face'      : '人家已经不是小孩子了！',
            },
          },
        });
      // });
    });

  }
}
