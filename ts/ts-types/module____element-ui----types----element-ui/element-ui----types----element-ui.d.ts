import {Upload}                    from 'element-ui/types/element-ui';

// WHY 非常奇怪，竟然无效？？？
declare module 'element-ui/types/element-ui' {
// declare module 'element-ui/types/element-ui' {
  // interface ElUpload_Type extends ElUpload {
  // export class ElUpload extends  ElUploadClazz{
  //    uploadFiles: File[];
  //  }
  // TIP 一个临时的解法。
  interface ElUpload extends Upload {
    uploadFiles: File[];
  }
}
