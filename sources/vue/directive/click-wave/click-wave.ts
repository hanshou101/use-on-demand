// import 'click-wave.css';    // CSS 似乎只能用这种方式导入（TIP 尝试一下，用require试试？）

const context: '@@wavesContext' = '@@wavesContext';

interface ClickWaveD_El extends HTMLElement {
  [context]: NullableType<{
    removeHandle(e: MouseEvent): false | undefined,
  }>;
}

interface ClickWaveD_Binding extends DirectiveBinding_Type {

}

export function xX_getClickWaveD() {

  // 导入CSS文件
  require('./click-wave.css');

  const ClickWaveD: VueDirective_Type = {
    //
    bind  : function (el: ClickWaveD_El, binding: ClickWaveD_Binding) {
      el.addEventListener('click', handleClick(el, binding), false);
    } as any as DirectiveFunction_Type,
    //
    update: function (el: ClickWaveD_El, binding: ClickWaveD_Binding) {
      // 为空判断
      const ctxEvts = el[context];
      if (!ctxEvts) {
        throw new Error('el[context]不存在！');
      }
      //
      el.removeEventListener('click', ctxEvts.removeHandle, false);
      el.addEventListener('click', handleClick(el, binding), false);
    } as any as DirectiveFunction_Type,
    //
    unbind: function (el: ClickWaveD_El, binding: ClickWaveD_Binding) {
      // 为空判断
      const ctxEvts = el[context];
      if (!ctxEvts) {
        throw new Error('el[context]不存在！');
      }
      //
      el.removeEventListener('click', ctxEvts.removeHandle, false);
      el[context] = null;
      // @ts-ignore
      delete el[context];
    } as any as DirectiveFunction_Type,
  };

  return ClickWaveD;

}

//
//
//
//
//
//

function handleClick(el: ClickWaveD_El, binding: ClickWaveD_Binding) {

  //
  function handle(e: MouseEvent) {
    const customOpts = {...binding.value};
    const opts       = {
      ele  : el, // 波纹作用元素
      type : 'hit', // hit 点击位置扩散 center中心点扩展
      color: 'rgba(0, 0, 0, 0.15)',
      ...customOpts,
    };
    const target     = opts.ele;
    if (target) {
      target.style.position = 'relative';
      target.style.overflow = 'hidden';
      const rect            = target.getBoundingClientRect();
      let ripple            = target.querySelector('.waves-ripple');
      if (!ripple) {
        ripple              = document.createElement('span');
        ripple.className    = 'waves-ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
      } else {
        ripple.className = 'waves-ripple';
      }
      switch (opts.type) {
        case 'center':
          ripple.style.top  = rect.height / 2 - ripple.offsetHeight / 2 + 'px';
          ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px';
          break;
        default:
          ripple.style.top  =
            (e.pageY - rect.top - ripple.offsetHeight / 2 - document.documentElement.scrollTop ||
              document.body.scrollTop) + 'px';
          ripple.style.left =
            (e.pageX - rect.left - ripple.offsetWidth / 2 - document.documentElement.scrollLeft ||
              document.body.scrollLeft) + 'px';
      }
      ripple.style.backgroundColor = opts.color;
      ripple.className             = 'waves-ripple z-active';
      return false;       // 此处【false】的含义，是什么呢？
    }
    return undefined;
  }

  const ctxEvts = el[context];
  if (!ctxEvts) {
    el[context] = {           // 此处，要注意【ctxEvts】的引用指向。（所以，ctxEvts，最好设置为 const常量 ）
      removeHandle: handle,
    };
  } else {
    ctxEvts.removeHandle = handle;
  }

  return handle;
}
