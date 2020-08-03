import {getDocumentWidthHeight} from '../../dom/dom-style';

export enum LessScaleBpE {
  xxs = 0,
  xs  = 320,
  s   = 576,
  m   = 768,
  l   = 992,
  xl  = 1200,
  xxl = 1400,
}


export class LessScaleBpDiy_Helper {
  static isSmallerThan(targetBpE: LessScaleBpE) {
    return getDocumentWidthHeight().width <= targetBpE;
  }
}
