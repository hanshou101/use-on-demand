/**
 * 自行推断的【L2Dwidget】类型。
 */
declare namespace L2Dwidget_SimpleNS {
  type BaseOnCb = (name: string) => void

  interface InitCfg {
    dialog?: IDialog;
    display?: IDisplay;
    model?: IModel;
    mobile?: IMobile;
  }

  interface BaseObject {
    on(
      selector: string,
      cb: BaseOnCb,
    ): BaseObject;

    init(cfg: InitCfg): BaseObject;
  }

  interface L2Dwidget_Type extends BaseObject {
    eventHandlers: IEventHandler;
    config: IConfig;
  }

  interface IConfig {
    dialog: IDialog;
    model: IModel;
    display: IDisplay;
    mobile: IMobile;
    name: IName;
    react: IReact;
    dev: IDev;
  }

  interface IDev {
    border: boolean;
  }


  interface IReact {
    opacity: number;
  }


  interface IName {
    canvas: string;
    div: string;
  }


  interface IMobile {
    show?: boolean;
    scale?: number;
    motion?: boolean;
  }


  interface IDisplay {
    superSample?: number;
    width?: number;
    height?: number;
    position?: string;
    hOffset?: number;
    vOffset?: number;
  }


  interface IModel {
    jsonPath?: string;
    scale?: number;
  }


  interface IDialog {
    enable: boolean;            // 开启对话框
    script: IScript;
    hitokoto?: boolean;
  }


  interface IScript {
    // 'every idle 10s': string;
    // 'hover .star': string;
    // 'tap body': string;
    // 'tap face': string;
    [key: string]: string;      // 相关交互脚本
  }


  interface IEventHandler {
    [key: string]: Array<BaseOnCb>;
  }

}

declare module 'live2d-widget' {
  export let L2Dwidget: L2Dwidget_SimpleNS.L2Dwidget_Type;
  // noinspection JSDuplicatedDeclaration
  // export default {L2Dwidget};
}

declare module 'live2d-widget/lib/L2Dwidget.min.js' {
  export let L2Dwidget: L2Dwidget_SimpleNS.L2Dwidget_Type;
  // noinspection JSDuplicatedDeclaration
  // export default {L2Dwidget};
}
