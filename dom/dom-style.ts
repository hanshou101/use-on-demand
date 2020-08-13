interface MyAbsolutePosition {
  top: number;
  left: number;
}

export class DomStyle_Helper {

  /**
   * 获取元素的css属性值
   */
  public static getDomStyle(
    ele: HTMLElement,           // 元素
    cssAttribute: string,       // 实时属性名
  ) {
    if (!ele || !ele.nodeName) {
      console.error('ele 必须是一个dom元素');
      return;
    }
    if (!cssAttribute) {
      console.error('cssAttribute 必须是一个字符串');
      return;
    }
    let val = '';
    if (window.getComputedStyle) {
      val = (window.getComputedStyle(ele, null) as any)[cssAttribute];
    } else if ((ele as any).currentStyle) {
      val = (ele as any).currentStyle[cssAttribute];
    }
    if (!isNaN(parseFloat(val))) {
      return parseFloat(val);
    } else {
      return val;
    }
  }

  /**
   * 【浏览器窗口】，内部内容区域，宽高
   */
  public static getDocumentWidthHeight() {
    if (window.innerHeight != null) {
      return {
        width : window.innerWidth,
        height: window.innerHeight,
      };
    } else if (document.compatMode === 'CSS1Compat') {
      // 怪异模式浏览器
      return {
        width : document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      };
    }
    return {
      width : document.body.scrollWidth,
      height: document.body.scrollHeight,
    };
  }

  /**
   * 获取元素距【浏览器文档最顶部、最左边】的距离
   */
  public static get_AbsoluteOffset_Position(
    ele: HTMLElement,
  ): MyAbsolutePosition {
    const position: MyAbsolutePosition = {
      top : 0,
      left: 0,
    };

    let offsetParent = ele.offsetParent as HTMLElement;   // TODO offsetParent，为距离最近的【定位元素】。  （若不存在距离最近的【定位元素】，则直接获取  根元素（比如  <html>））
    position.top     = ele.offsetTop;
    position.left    = ele.offsetLeft;
    while (offsetParent != null) {
      position.top += offsetParent.offsetTop;
      position.left += offsetParent.offsetLeft;
      offsetParent = offsetParent.offsetParent as HTMLElement;
    }
    return position;
  }

  /**
   *  获取以下距离：
   *        1.【元素底部】，到【Window可见区域  底部】的距离
   *        2.【元素右侧】，到【Window可见区域  右侧】的距离。
   */
  public static get_eB2wB_eR2wR(e: HTMLElement) {
    // alert('尺寸改变，开始检测');
    const domAttr = {
      posit  : DomStyle_Helper.get_AbsoluteOffset_Position(e),
      oHeight: e.offsetHeight,
      oWidth : e.offsetWidth,
    };
    const wAttr   = {
      visibleH: window.innerHeight,
      visibleW: window.innerWidth,
    };
    console.log('属性信息', domAttr);
    console.log('窗口信息', wAttr);
    const res = {
      eB2wB: wAttr.visibleH - domAttr.posit.top - domAttr.oHeight,  // 元素底部，到 Window可见区域 底部
      eR2wR: wAttr.visibleW - domAttr.posit.left - domAttr.oWidth,  // 元素右侧，到 Window可见区域 右侧
    };
    console.log('距离下方、右方距离', res);
    return res;
  }

  /**
   * 兼容性：获取浏览器滚动条距离顶部的位置
   */
  public static getScrollTop(): number {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || -1;
  }


  /**
   * 获取兄弟节点
   */
  public static getSiblingsDoms(
    ele: HTMLElement,               // 目标元素
  ): Array<HTMLElement> {
    if (ele.parentNode) {
      const a = [];
      const p = ele.parentNode.children;
      for (let i = 0, pl = p.length; i < pl; i++) {
        if (p[i] !== ele) {
          a.push(p[i]);
        }
      }
      return a as Array<HTMLElement>;
    } else {
      return [];
    }
  }

  /**
   * 兼容性：判断两个元素是否是包含关系。（无限层级）
   *        1.无限个层级，都有效，
   */
  public static isContains_otherEle(
    ele: HTMLElement,           // 父级元素
    _childEle: Node,            // 子孙级元素
  ): boolean {
    let childEle = _childEle;
    if (ele == childEle) {
      return false;
    }

    if (typeof ele.contains == 'function') {
      return ele.contains(childEle);
    } else {
      while (true) {
        if (!childEle) {
          return false;
        }
        if (childEle == ele) {
          return true;
        } else {
          if (childEle.parentNode) {
            childEle = childEle.parentNode;
          }
        }
      }
    }
  }


  /**
   * 修复，Android下【软键盘】弹出时，导致的【VH不准确】的问题。
   */
  public static fix_AndroidKeyboard_errorVH(
    timeout: number = 300,
  ) {
    // 避免【小键盘】弹起，导致的【vh失效】。
    setTimeout(function () {
      const viewHeight = window.innerHeight;
      const viewWidth  = window.innerWidth;
      const viewport   = document.querySelector('meta[name=viewport]');
      viewport?.setAttribute('content', 'height=' + viewHeight + 'px, width=' + viewWidth + 'px, initial-scale=1.0');
    }, timeout);
  }


}
