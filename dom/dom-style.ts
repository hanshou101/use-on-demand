/**
 * 获取元素的css属性值
 * @param ele dom元素
 * @param cssAttribute css属性名称
 */
export function getDomStyle(ele: HTMLElement, cssAttribute: string) {
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