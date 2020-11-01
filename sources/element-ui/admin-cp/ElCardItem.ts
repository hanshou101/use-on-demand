/**
 * El卡片的配置类
 *
 * TODO 具体使用方式：查看  PlayerDetail_Page.vue 文件。
 */
export class xX_MyEl_Cards {
  constructor(public array: xX_MyEl_OneCard[]) {
    this.array = array;
  }
}//

export class xX_MyEl_OneCard {
  constructor(public cardTitle: string, public  rows: MyEl_OneRow[]) {
    this.cardTitle = cardTitle;
    this.rows      = rows;
  }
}//

type  MyEl_OneRow = xX_MyEl_OneCol[];//

export class xX_MyEl_OneCol {
  constructor(public leftLabel: string, public rightProp: string) {
    this.leftLabel = leftLabel;
    this.rightProp = rightProp;
  }
}


// interface MyEl_CardBatch {
//
// }
const conf = {
  array: [{cardTitle: '基本信息', row: [[{col_left: '玩家ID', col_right: '字段名'}, {col_left: '玩家ID', col_right: '字段名'}], [{col_left: '玩家ID', col_right: '字段名'}, {col_left: '玩家ID', col_right: '字段名'}]]}, {
    cardTitle: '基本信息',
    row      : [[{col_left: '玩家ID', col_right: '字段名'}, {col_left: '玩家ID', col_right: '字段名'}], [{col_left: '玩家ID', col_right: '字段名'}, {col_left: '玩家ID', col_right: '字段名'}]],
  }],
};
