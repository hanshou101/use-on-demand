// import Vue from 'vue';    // 这句话，如果解开注释的话，需要调换【declare】的层次。

import Vue from 'vue';


declare global {

  interface I18nMessage {
    [key: string]: {};
  }


}

