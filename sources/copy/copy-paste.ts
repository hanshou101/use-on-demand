import Clipboard from 'clipboard';

type Clipboard_SelectorType = string | Element | NodeListOf<Element>;

export class xX_CopyPaste_Util {

  // 简单复制
  public simpleCopy (selector: Clipboard_SelectorType): ClipboardJS {
    const clipboard = new Clipboard(selector);
    return clipboard;
  }

  // 带回调的复制
  public copyWithCb (selector: Clipboard_SelectorType,
                     sucCb: (e: Event) => void,
                     errCb: (e: Event) => void,
  ) {
    const clipboard = this.simpleCopy(selector);
    clipboard.on('success', sucCb);
    clipboard.on('error', errCb);

    return clipboard;
  }

  // 指定复制过程中的一些选项
  public specialCopy (selector: Clipboard_SelectorType, options?: Clipboard.Options) {
    // 基于目标元素，指定复制的真正元素（比如，我们需要复制目标元素的下一个元素）
    const clipboard = new Clipboard(selector, options || {
      // TIP 指定一个目标，真正复制的  是这个目标的下一个兄弟元素
      target:    function (trigger) {
        return trigger.nextElementSibling as Element;
      },
      // TIP 指定一个目标，复制的是这个目标的【aria-label】标签属性
      text:      function (trigger) {
        return trigger.getAttribute('aria-label') as string;
      },
      // TIP 指定一个目标，作为  复制过程中的container值（？？？  这里的focus改变，指的是什么？）
      container: document.getElementById('bootstrap-modal') as Element,

      // TIP 指定操作模式Action（剪切、复制）
      action (elem: Element): 'cut' | 'copy' {
        return 'cut';
      },
    });
  }

  // 销毁Clipboard对象
  public destroy (clipboard: Clipboard) {
    clipboard.destroy();
  }

}
