interface MyAbsolutePosition {
  top: number;
  left: number;
}

export class DomStyle_Helper {

  /**
   * 获取元素的css属性值
   * @param ele dom元素
   * @param cssAttribute css属性名称
   */
  public static getDomStyle(ele: HTMLElement, cssAttribute: string) {
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

  // 获取浏览器宽高
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
   * 获取元素距浏览器最顶部及最左边的距离
   * @param ele dom元素
   */
  public static get_AbsoluteOffset_Position(ele: HTMLElement): MyAbsolutePosition {
    const position   = {
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
   * 兼容性：获取浏览器滚动条距离顶部的位置
   */
  public static getScrollTop(): number {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || -1;
  }

  /**
   * 获取兄弟节点
   * @param ele
   * @returns {Array}
   */
  public static getSiblingsDoms(ele: HTMLElement): Array<HTMLElement> {
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
   *
   * @param ele 父元素
   * @param childEle 子元素
   * @returns {Boolean}
   */
  public static isContains_otherEle(ele: HTMLElement, _childEle: Node): boolean {
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


}
