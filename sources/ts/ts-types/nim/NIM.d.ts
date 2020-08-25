// import {privateConf}    from '~/components/nim/3rd/nim_server_conf';
// import {RoomLogicClass} from '~/components/nim/im/chatroom/bz-util/room';
import Vue from 'sources/vue';

declare global {
  interface Window {
    SDK: {
      Chatroom: {
        /**
         * 1.在这个方法中，调用了这个接口【https://wlnimsc1.netease.im/socket.io/1/?t=1587987426591】
         *
         * 2.在这个SDK的WebSocket的消息返回中，会调用【https://dr.netease.im/1.gif?event=ws_connected&appkey=45c6af3c98409b18a84451215d0bdd6e&uid=hanshou101&os=web&session=&ver=75&type=chatroom&platform=chrome80】接口
         */
        getInstance(options: NimNS.SDK.ChatRoom_InitOptions): NimNS.SDK.ChatRoom_Instance;
      }
    };
    // RoomLogicClass_OnWindow: RoomLogicClass,
  }

  namespace NimNS {
    interface BaseConfig_Type {
      appkey: string;
      url: string;
      chatroomList: string;
      chatroomAddr: string;
    }

    type Combined_BaseConfig_Type = BaseConfig_Type & {
      openSubscription: boolean;
      usePrivateEnv: undefined | 1 | 2;
      // privateConf: typeof privateConf;
    }

    type Emoji_Type = {
      file: string;
    }
    type EmojiList_Type = {
      [key: string]: {
        [key: string]: Emoji_Type;
      };
    }

    type Pinup_Type = {};

    type PinupList_Type = {
      [key: string]: Array<any>
    };


    type EmojiConfig_Type = {
      emojiList?: EmojiList_Type;//表情列表
      pinupList?: PinupList_Type;//贴图列表
      callback?: (result: EmojiConfig_CbResultType) => void;


      imgpath?: string;    // 图片根目录


      width?: number;
      height?: number;
    }

    type EmojiConfig_CbResultType = {
      emoji: string;

    }


    type ConnectedMsg_Type = {
      chatroom: Link.RoomInfo;
      member: MemberType_Type,
    }

    interface Msg_BaseType {
      text: string;
      from: string;
      idClient: boolean;
      fromClientType: string;
      chatroomId: string;
      flow: string;
      status: string;
      resend: boolean;
      time: number;
      type: 'text' | 'custom' | 'notification'
    }   //
    // 文字消息、自定义消息
    interface TextOrCustom_Msg extends Msg_BaseType {
      content: string;
      custom?: string;
      fromNick: string;
      fromAvatar: string;
      userUpdateTime: number;
    }   //
    // 系统消息
    interface SysMsg_Type extends Msg_BaseType {
      attach: {
        to: Array<string>;                    // 存放，account账户ID的数组
        type: 'blackMember' | 'unblackMember' | 'gagMember' | 'ungagMember' | 'addManager' | 'removeManager'
          | 'memberEnter' | 'memberExit' | 'addCommon' | 'removeCommon'
          | 'kickMember';
        from: string;
        toNick: string[];
        fromNick: string[];
      }/* & Msg_BaseType['attach'] */;
    }   //

    enum MemberNumberType {
      'guest'      = -2,
      'common'     = 0,
      'owner'      = 1,
      'manager'    = 2,
      'restricted' = -1,
    }

    type MemberType_Type = {
      type: 'guest' | 'common' | 'owner' | 'manager' | 'restricted';
      account: string;


      updateTime: number;
      enterTime: number;      // 可能和游客相关

      avatar: string;
      nick: string;

      valid: boolean;
      online: boolean;
      gaged: boolean;   // 被临时禁言
      tempMuted: boolean;
      tempMuteDuration: number;
      blacked: boolean; // 被放入黑名单

      custom: string;
    }


    namespace Link {
      interface Data_Type {
        person: {                              // 用于，逐个将成员，以Key-Value的形式，存放进去。
          [key: string]: MemberType_Type | undefined,
        };
        roomInfo?: RoomInfo;
      }

      interface RoomInfo {
        id: string;
        name: string;
        custom: string;
        createTime: number;
        queuelevel: string;
        creator: string;
        onlineMemberNum: number;
        mute: boolean;
        announcement: string;
        broadcastUrl: string;
      }

      interface Base_Option_Type {
        appKey: string;
        id: number;                 // FIXME 这里，其实正统的数据，应该是【chatroomId】。只是之前的老代码，把它写作了 id ，这是一个错误。
        chatroomAddresses?: Array<string>;        // FIXME 这个，是一定要传的；但是老代码，把它拆成了两部分的拼接。
      }

      interface Anonymous_Option_Type extends Base_Option_Type {
        chatroomNick: string;
        chatroomAvatar: string;
        isAnonymous?: true;
      }

      interface Logged_Option_Type extends Base_Option_Type {
        account: string;
        token: string;
      }

      enum DealCommand_TypeEnum {
        'kickChatroomMember'    = '0',    // 踢出房间
        'markChatroomGaglist'   = '1',    // 禁言
        'markChatroomBlacklist' = '2',    // 黑名单
        'markChatroomManager'   = '3',    // 任命管理员
      }

      /*
            enum CommandTypeE {
              'kick'  = '0',
              'gag'   = '1',
              'black' = '2',
              'admin' = '3',
            }
      */

    }

    namespace SDK {
      type ChatRoom_ErrMessage = {
        message: string;
      } | undefined;

      type ChatRoom_CustomMessage_Type = {
        type: number;
        data: {
          value: any;
        }
      }

      type ChatRoom_ChatroomMembersInfo_Type = {
        members: Array<MemberType_Type>
      }

      type ChatRoom_DoneFn<T = {}> = (error: ChatRoom_ErrMessage, obj: T) => void;

      interface ChatRoom_InitOptions {
        appKey: string;
        account: string;
        token: string;
        // privateConf?: typeof privateConf;             // 私有化配置文件 （WARN 此处，仅官方Demo的情况下，需要）
        chatroomId: number;
        chatroomAddresses: string[];                        //
        onconnect(msg: NimNS.ConnectedMsg_Type): void;    //
        onmsgs(msgs: Array<NimNS.TextOrCustom_Msg>): void;       //
        onerror(error: string, obj: IndexedObj): void;    //
        onwillreconnect(obj: IndexedObj): void;           //
        ondisconnect(error: {
          code: 302 | 13003 | 403
            | 'kicked'
            | 'logout';
          reason: 'managerKick' | 'blacked';
          message: string;
        }): void;                //

        // 访客模式，可选项
        isAnonymous?: boolean;
        chatroomNick?: string;          // 游客模式下，是本地手动加的
      }

      interface ChatRoom_Instance {
        account: string;

        // 同步显示图片
        viewImageSync(cfg: {
          url: string;
          quality: number;
          thumbnail: {
            width: number,
            height: number,
            mode: 'cover'
          }
        }): string;


        /**
         * 发送文本
         * @param  {String}   text     内容
         * @param  {String}   custom   扩展字段json序列化{type:0} 0游客，1正常 2房主 3管理员 4受限制的
         * @param  {Function} callback 回调
         * @return {void}
         */
        sendText(cfg: {
          custom: string,
          text: string,
          done: ChatRoom_DoneFn<NimNS.TextOrCustom_Msg>,
        }): void;

        /**
         * 发送自定义消息
         * @param  {String}   custom   扩展字段json序列化{type:0} 0游客，1正常 2房主 3管理员 4受限制的
         * @param  {Object}   content   自定义消息内容
         * @param  {Function} callback  回调
         * @return {void}
         */
        sendCustomMsg(cfg: {
          custom: string,
          content: string,
          done: ChatRoom_DoneFn<NimNS.TextOrCustom_Msg>,
        }): void;

        /**
         * 获取聊天室成员
         * @param  {Boolean}   guest  true获取游客 false固定成员
         * @param  {number}   time   上一个记录的时间戳 0为当前
         * @param {boolean} onlyOnline
         * @param {number} limit 限制
         * @param  {Function} callback 回调
         * @return {void}
         */
        getChatroomMembers(cfg: {
          guest: boolean,
          time: number,
          onlyOnline: boolean,
          limit: number,
          done: ChatRoom_DoneFn<ChatRoom_ChatroomMembersInfo_Type>,
        }): void;

        /**
         * 获取历史消息
         * @param {number} limit 限制
         * @param  {Function} callback 回调
         * @return {void}
         */
        getHistoryMsgs(cfg: {
          limit: number,
          done: ChatRoom_DoneFn<{
            msgs: Array<NimNS.TextOrCustom_Msg>
          }>,
        }): void;

        /**
         * 踢人
         * @param  {string}   account   账号
         * @param  {Function} callback 回调
         * @return {void}
         */
        kickChatroomMember(cfg: {
          account: string,
          done: Function,
        }): void;

        /**
         * 标记黑名单
         * @param  {string}   account  账号
         * @param  {Boolean}  isAdd    添加移除
         * @param  {Function} callback 回调
         * @return {void}
         */
        markChatroomBlacklist(cfg: {
          account: string,
          isAdd: boolean,
          done: ChatRoom_DoneFn,
        }): void;

        /**
         * 标记禁言名单
         * @param  {string}   account  账号
         * @param  {Boolean}  isAdd    添加移除
         * @param  {Function} callback 回调
         * @return {void}
         */
        markChatroomGaglist(cfg: {
          account: string,
          isAdd: boolean,
          done: ChatRoom_DoneFn,
        }): void;


        /**
         * 标记管理员
         * @param  {string}   account  账号
         * @param  {Boolean}  isAdd    添加移除
         * @param  {Function} callback 回调
         * @return {void}
         */
        markChatroomManager(cfg: {
          account: string,
          isAdd: boolean,
          done: Function,
        }): void;

        /**
         * 获取聊天室群成员信息
         * @param  {Array}   account  需要获取信息的成员队列
         * @param  {Function} callback 回调方法
         * @return {void}
         */
        getChatroomMembersInfo(cfg: {
          accounts: Array<string>,
          done: ChatRoom_DoneFn<ChatRoom_ChatroomMembersInfo_Type>,
        }): void;

        /**
         * 清除聊天室实例
         */
        destroy(cfg: {
          done: ChatRoom_DoneFn<undefined>,
        }): void;
      }
    }

  }

}
