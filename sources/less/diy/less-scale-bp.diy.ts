import {xX_DomStyle_Helper} from '../../dom/dom-style';

/**
 *  TIP 总结的参考资料，欢迎随时补充：
 *          1.[响应式布局 · (5) 最佳实践](https://www.teambition.com/project/5c4567c7266c640018d21c28/posts/post/5f283c1d7bf60900442418e7)
 */
export enum xX_LessScaleBpE {
  xxs = 0,
  xs  = 320,
  s   = 576,
  m   = 768,
  l   = 992,
  xl  = 1200,
  xxl = 1400,
}


export class xX_LessScaleBpDiy_Helper {
  public static isSmallerThan(targetBpE: xX_LessScaleBpE) {
    return xX_DomStyle_Helper.getDocumentWidthHeight().width <= targetBpE;
  }
}
