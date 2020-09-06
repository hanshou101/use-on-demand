
interface Cell {

}

interface ReTimer {

}

enum AtkType {
	NORMAL,								// 普通攻击。
	SKILL,								// 技能伤害。
	ContinueBuffDamage,		// 持续Buff伤害。
}

/**
 * 攻击信息。
 * 				1.有【攻击方】、【受伤方】。
 * 				2.在【攻击敌方】、【收到敌方伤害】时，都会触发。
 */
interface IAtkInfo {
	atkType: AtkType;
	atkCha: Chara;										// 攻击方的角色。
}


/**
 * 角色队列。
 * 				1.有一定的拓展方法。
 */
type CharaSequence = Array<Chara> & {
	sort_custom(context: any, type: 'sort'): CharaSequence;
};


namespace Ability {
	export interface Base {
		lv: number;			// 等级
		name: string;		// 名字
	}

	export interface Att {
		maxHp: number;	// 最大生命（呈现在游戏中时，每点代表112.5，取整数，下同）
		atkRan: number;	// 攻击距离
		atk: number;		// 攻击力（每点代表8.5）
		mgiAtk: number;	// 魔法攻击（每点代表13.7）
		def: number;		// 物理防御（每点代表15）
		mgiDef: number;	// 魔法防御（每点代表16.6）
		//
		atkEff: 'atk_dao';				// 攻击时的特效
	}


	export interface MyBuff {
		addBuff(buff: Buff): void;																			//
		hasBuff(buffName: Buff['name']): Buff | null;										// 根据名字，查找Buff。有则返回实例，无则返回null
		delBuff(buff: Buff): void;																			//
	}

	export interface RelatedChara {
		newChara(charName: Chara['name'], belongCell: Cell): Chara;
	}

}

/**
 * 一般内置属性、方法，用 _ 开头命名。
 */
namespace LifeCycle {
	interface Timer {
		_upS(): void;													// 每过了一秒 的回调。

	}

	export interface Chara extends Timer {
		_info(): void;							//
		_connect(): void;						//
		_extInit(): void;											// 额外的初始化
		_castCdSkill(id: string): void;				// 处理【CD技能】的施放
		_onBattleStart(): void;								// 当战斗开始时

		_onKillChara(atkInfo: IAtkInfo): void;			// 当击杀了，其它一个角色 时
		_onCharaDel(char: Chara): void;							// 当场上任一角色死亡时。（似乎，是个全局通知广播？）
		_onHurt(atkInfo: IAtkInfo): void;						// 当自身受到伤害时
	}

	export interface Buff extends Timer {
	}
}

namespace Global {
	/**
	 * 容器、单元格，相关。
	 * 				1.代表地图的一个格子。
	 */
	export interface ICell {
		cell: Cell;																					// 容器、单元格。
		cellRan(a: Cell, b: Cell): number;									// 计算 两个Cell 之间的距离。
	}

	export interface IBuff {
		attInit(): void;						// ？？？相关的初始化？


		// 自带的一些Buff效果。
		b_jieShuang: Buff;					// 结霜Buff
		b_shaoZhuo: Buff;						// 烧灼Buff
	}

	export interface Base {
		reTimer(duration: number): ReTimer;						// ？？？
		yield(t: ReTimer, name: 'timeout'): void;			// ？？？
		range(num: number): unknown;									//

		getAllChas(num: number): CharaSequence;		// ？？？？？？和角色有关
	}

	export interface Skill {
		addCdSkill(charName: string, cd: number): void;				// 添加带CD技能。
		addSkillTxt(desc: string): void;														// 角色/技能  的描述。
	}

	export interface Att {
		normalAtkChara(char: Chara): void;						// 指定，攻击某一目标
	}


	export interface System {
		// 系统层面的对象
		sys: {
			// 主要面板
			main: {
				// 自身领主角色
				player: {
					plusGold(goldNum: number): void;				// 增加【自身】黄金。
				}
			};
			rndPer(possibleRatio: number): boolean;			// 可能性概率。 最大值 100
		}
	}

}

interface Chara extends LifeCycle.Chara,
	Global.ICell, Global.IBuff, Global.Base, Global.Skill, Global.Att, Global.System,
	Ability.Base, Ability.MyBuff, Ability.RelatedChara {
	img: ImageBitmap;
	attCoe: Ability.Att;									// 攻击属性
	evos: Array<Chara['name']>;						// 进化树，下一步的进化分支  的角色名。
	team: 1 | 2;													// 【所属团队】。 1-自己团队  2-敌方团队


	isDeath: boolean;											// 自身是否死亡
}


interface Buff extends LifeCycle.Buff {
	id: string;																					// 唯一ID
	name: string;																				// 名称
	life: number;																				// 剩余时间（可由外部设定）
	/**
	 * 得到一个实例
	 * 				1.原文为【new】，但new是关键字。
	 * 				2.【life】是持续时间。不传的话，默认是【永远存在】。
	 */
	create(life?: number): Buff;												//
	//
	//
	_init(): void;																			// Buff的初始化

	// 【Buff加成】攻击相关
	att: {
		spd: number;																			// 攻击速度【比率】。 默认值 为1 。
		atkL: number;																			// 物理攻击力【比率】
		mgiAtkL: number;																	// 魔法攻击力【比率】
		cri: number;																			// 暴击几率
	};
	masCha: Chara;																			// TIP MasterChar - Buff原本相关，可挂靠的【角色】

}
