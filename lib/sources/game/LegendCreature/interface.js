"use strict";
/**
 * 原程序的一些BUG：
 * 				1.【董事长】，释放技能的判断，【双非】会导致，任何角色都会被施加【极速】。
 * 				2.一些继承关系，文字描述不大清楚。
 *
 * 				3.有一个Buff，代码是会反复触发的；而描述中是单次。
 * 							1.每当贱民死亡，所有贱民物理攻击+50%。
 * 										1.此处，应该只有0级生物，才会触发。（根据ID判断）
 *
 * 				4.有一次【onHurt】写错了。
 *							1.应该是【_onHurt】。
 *							2.也有可能，【onHurt】不是写错了，而是手动绑的方法？？？
 *
 * 				5.
 */
var IFileModeE;
(function (IFileModeE) {
    IFileModeE[IFileModeE["READ"] = 0] = "READ";
    IFileModeE[IFileModeE["WRITE"] = 1] = "WRITE";
})(IFileModeE || (IFileModeE = {}));
var IResultE;
(function (IResultE) {
    IResultE[IResultE["OK"] = 0] = "OK";
    IResultE[IResultE["Error"] = 1] = "Error";
})(IResultE || (IResultE = {}));
var SignalE;
(function (SignalE) {
    SignalE[SignalE["onPickCha"] = 0] = "onPickCha";
    SignalE[SignalE["onPickItem"] = 1] = "onPickItem";
    SignalE[SignalE["onNewGame"] = 2] = "onNewGame";
    SignalE[SignalE["onLoadGame"] = 3] = "onLoadGame";
    SignalE[SignalE["onSaveGame"] = 4] = "onSaveGame";
})(SignalE || (SignalE = {}));
var AtkType;
(function (AtkType) {
    AtkType[AtkType["NORMAL"] = 0] = "NORMAL";
    AtkType[AtkType["SKILL"] = 1] = "SKILL";
    AtkType[AtkType["ContinueBuffDamage"] = 2] = "ContinueBuffDamage";
})(AtkType || (AtkType = {}));
var TeamTypeE;
(function (TeamTypeE) {
    TeamTypeE[TeamTypeE["Enemy"] = 1] = "Enemy";
    TeamTypeE[TeamTypeE["Our"] = 2] = "Our";
})(TeamTypeE || (TeamTypeE = {}));
//# sourceMappingURL=interface.js.map