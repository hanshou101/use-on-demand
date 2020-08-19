/**
 * TIP 一些笔记：
 *        1.其实，【Element-UI】库，采用的【export type】方法，是一种【非常落后】的方法。
 *                1.对于类型而言，找不到任何【export】的必要性？
 *                2.除非，是在【库里面】？
 *        2.
 */

import {ElementUIComponent} from 'element-ui/types/component';
import {Abs_ElTItem}        from '../../../element-ui/admin-cp/ElTItem';
import {ElUpload}           from 'element-ui/types/upload';
// import {Abs_ElTItem} from '@/_framework/sdk/elment-ui/new/Abs_ElTItem';

declare global {
  interface MyElForm extends ElementUIComponent {
    validate(cb: (valid: boolean) => void): void;

    validateField(lang: string, cb: (res: string) => void): void;
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
  type RowTransformFn<T> = (row: any, item: Abs_ElTItem.Base) => T;
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

// declare global {
//   interface ElUpload_Type extends ElUpload {
//     uploadFiles: File[];
//   }
// }
