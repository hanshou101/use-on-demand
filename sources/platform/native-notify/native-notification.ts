/**
 * 参考资料：
 *          H5 notification浏览器桌面通知 - 掘金 - https://juejin.im/post/5c6df433f265da2de80f5eda
 */

// interface NotificationOption {
//     dir: string | 'auto';           // 文字方向
//     body: string;                   // 通知消息主题
//     requireInteraction: boolean;    // 不自动关闭通知
//     icon: string;                   // 通知的图标，可以用url网址
// }
// TODO ↑，官方已有一个定义。只是未挂载到  window对象上面。

export class xX_BrowserNativeNotification_Helper {

  /**
   * 测试用的选项
   */
  // 每次，都返回最新的。
  public static get __demoOptions(): NotificationOptions {
    return {
      dir               : 'auto', // 文字方向
      // body: '通知：OBKoro1评论了你的朋友圈', // 通知主体
      // TIP 此处，似乎最多四行内容。
      body              : `现在，将会生成一张图表，供您展示。\n第一行\n第二行\n第三行\n第四行\n第五行`,
      requireInteraction: true, // 不自动关闭通知
      // icon: 'https://upload-images.jianshu.io/upload_images/5245297-818e624b75271127.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      icon              : 'https://goss4.vcg.com/creative/vcg/800/version23/VCG21gic19273071.jpg',  // 通知图的字符串标，也可以直接指向一个图片的url地址。
      silent            : true,   // 通知出现时，是否静默（不带声音）。
      // sound: 'https:/music.163.com/xxx',   // 自定义声音的url
      // tag: '123',     // 区分不同通知的识别标签。（相同的一组tag，只会打开一个通知窗口。）
      // renotify: false,        // 相同tag情况下，新出现的通知，是否直接替换之前的通知。（若为true，新的替换老的；若为false，则一直保留老的通知。）
    };
  }

  public static simpleNotify(title: string, options: NotificationOptions) {

    const notifyWhenPermitted = () => {
      const notification: Notification = new Notification(title, options); // 显示通知

      // TODO 插入通知的处理事件。
      this.bindEvts(notification);
    };


    // 先检查浏览器是否支持
    if (!window.Notification) {
      console.log('浏览器不支持通知');
    } else {
      // 检查用户曾经是否同意接受通知
      if (Notification.permission === 'granted') {
        notifyWhenPermitted();
      } else if (Notification.permission === 'default') {
        // 用户还未选择，可以询问用户是否同意发送通知
        Notification.requestPermission().then((permission: string) => {
          if (permission === 'granted') {
            console.log('用户同意授权');
            notifyWhenPermitted();
          } else if (permission === 'default') {
            console.warn('用户关闭授权 未刷新页面之前 可以再次请求授权');
          } else {
            // denied
            console.log('用户拒绝授权 不能显示通知');
          }
        });
      } else {
        // denied 用户拒绝
        console.log('用户曾经拒绝显示通知');
      }
    }
  }

  private static bindEvts(notify: Notification) {
    console.log('通知标题（仅可读）:', notify.title);
    console.log('通知内容（仅可读）:', notify.body);
    console.log('通知图标（仅可读）:', notify.icon);

    // 点击通知框本身
    notify.onclick = (e) => {
      console.log('用户点击了通知：', e);
    };
    notify.onerror = (e) => {
      console.error('通知显示异常，如用户之前拒绝了权限:', e);
    };

    //
    // 一显示就触发
    notify.onshow  = (e) => {
      console.log('通知显示了：', e);
    };
    // 点击【→】按钮（    注意区别：点击【关闭】按钮，不会触发这个）
    notify.onclose = (e) => {
      console.log('通知关闭了：', e);
    };

  }

}


// 使用示范：
// simpleNotify('这是通知的标题', options);
