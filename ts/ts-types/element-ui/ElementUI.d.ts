import {ElementUIComponent} from 'element-ui/types/component';
import {ElTItem} from '@/_framework/sdk/elment-ui/new/ElTItem';

declare global {
  interface MyElForm extends ElementUIComponent {
    validate (cb: (valid: boolean) => void): void;

    validateField (lang: string, cb: (res: string) => void): void;
  }

  // 用于提交表单
  type MyFormItem_Category = 'text' | 'number' | 'radio' | 'positiveNumber' | 'step'
    | 'options' | 'options_arr'
    | 'date_time' | 'date_time_range' | 'date_time_range_btn' | 'time' | 'time_range' | 'single_date'
    | 'custom' | 'textarea'
    | 'upload_img' | 'lang_input' | 'lang_inputTextarea' | 'lang_ueditor' | 'cascader'
    | 'number_range' | 'password'; //
  // 用于回显表格
  type MyTableCol_Category = 'text' | 'selection' | 'enumTag' | 'i18nDisplay' | 'image' | 'custom'; //

  // 回显表格时，转换字段的函数
  type Origin__RowTransformFn = (row: any, field: string) => string;
  type RowTransformFn<T> = (row: any, item: ElTItem.Base) => T;
  type DetailInfoTransformFn = (row: any, field: string) => string;
  type Detail_DisableRender_CheckFn = (row: any, field: string) => boolean;
  type SelectableFn = (row: any, index: number) => boolean;

  // interface ElSimple_TableCol {
  //     name: string;             // name和prop一致
  //     prop: string;             // name和prop一致
  //
  //     label: string;
  //     type: MyTableCol_Category;
  //
  //     // 可选字段
  //     selectOption?: MySelectOption_Single;
  //     i18nKey?: string;
  //     minWidth?: number;
  //     elementTableColumnAttrs?: {};
  // }

  interface DetailInfoPair {
    // 左侧名称（固定值）
    leftLabel: string;
    // 右侧字段（对象的key）
    rightProp: string | {
      prop: string;
      simpleValueFunction: DetailInfoTransformFn;
    };
    // 是否  禁止渲染 当前行
    disableRender?: Detail_DisableRender_CheckFn;
  }

}
