export class xX_CPlugin_Helper{
  /**
   * 初始化【v-viewer】，可拖动、放大的对话框。
   */
  public static init_vViewer(vue: VueConstructor_Type) {
    // 导入CSS
    require('viewerjs/dist/viewer.css');
    const Viewer = require('v-viewer').default;     // 标签主体。
    vue.use(Viewer);                         // 导入到Vue全局。（从此，可以使用<viewer>标签，来包裹<img>标签）
  }
}
