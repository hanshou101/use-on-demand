import {L2Dwidget} from 'live2d-widget';
// import {L2Dwidget}       from 'live2d-widget/lib/L2Dwidget.min.js';    // 这种方式，不能用import；只能用【window】方式。
// import {DomScript_Helper} from '../../dom/dom-script';

enum CssE {
  demo = 'demo',
}


export class Live2D_WidgetJs_Helper {
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
    // DomScript_Helper.loadJsScript_Async('/L2Dwidget.min.js').then(() => {
    //   const L2Dwidget: L2Dwidget_SimpleNS.L2Dwidget_Type = (window as any).L2Dwidget;

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
  }
}
