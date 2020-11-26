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


/**
 * 相关框架信息：
 * 				1.godot引擎
 * 								1.【3.2.1】
 * 								2.存档地址：
 * 												【C:\Users\Administrator\AppData\Roaming\Godot\app_userdata\Legend Creatures\data1】
 * 				2.需要创意工坊的【BaseTools】工具。
 */

//——————————————————————————————————————————————————————————————————————————————
//——————————————————————————————————————————————————————————————————————————————
//——————————————————————————————————————————————————————————————————————————————

interface Cell {

}

interface ReTimer {

}

type Path_Type = NullableType<string>;

type ImgRelPath_Type = string | 'cex___toolman/cha.png'

type CurFileName_Type = 'g_test'

interface BaseTool {
	connect: INode['connect'];

	g_sys: {
		has(key: CurFileName_Type): unknown;							// 可以读取【base.g_sys】到自己的【全局变量】
	};

	loadImg(path: Path_Type, imgRelPath: ImgRelPath_Type): ITexture;
}

interface ITexture {

}

interface IFile {
	/**
	 * 得到一个实例
	 * 				1.原文为【new】，但new是关键字。
	 */
	create(): this;												//
}

/**
 * 文件夹相关
 */
interface IDirectory {
	/**
	 * 得到一个实例
	 * 				1.原文为【new】，但new是关键字。
	 */
	create(): this;												//

	open(path: string): IResultE;					// 打开一处目录


	list_dir_begin(
		bol: boolean,			// ？？？？？？
	): void;																		// 遍历该目录

	get_next(): string;													// 获取组中，下一个条目。（游标）

	current_is_dir(): boolean;									// （游标控制）当前游标，是否一个文件夹
}

interface IImage {
	/**
	 * 得到一个实例
	 * 				1.原文为【new】，但new是关键字。
	 */
	create(): this;												//

	load(path: string): void;							// 读取一处路径，作为文本
}

interface IImageTexture {
	/**
	 * 得到一个实例
	 * 				1.原文为【new】，但new是关键字。
	 */
	create(): this;															//

	create_from_image(im: IImage): void;				// 有一处图片，创建【图片纹理】。
}


enum IFileModeE {
	READ,
	WRITE,
}

enum IResultE {
	OK,
	Error,
}

interface INode {
	add_child(node: INode): void;						// 添加一个子节点。

	set_texture(texture: ITexture): void;		// 设置【纹理内容】。

	get_children(): Array<INode>;						// 获得所有子节点。

	get_node(path: Path_Type): INode;														// 查找到一个【虚拟场景节点】

	has_node(path: Path_Type): NullableType<INode>;							// 查找一个【虚拟场景节点】是否存在。 是-返回Node  否-null

	/**
	 * 绑定一个新的钩子回调。
	 * 				1.连接基础工具信号。
	 */
	connect(
		hook: 'onHurt' | '_onHurt',					// 钩子名称    WARN 此处【onHurt】是不是写错了？？？
		context: any,												// 上下文，如self
		fnName: 'onHurt',										// 要绑上去的函数名称
		args?: any[],												// 可选：触发时，传递的参数列表。
	): void;
}

type call_deferred_MethodE = 'testInit';

type globalData_ToolE = 'g_base';			//
type globalData_infoDs_Type = {
	[key in globalData_ToolE]: NullableType<BaseTool>;	// 获取基础工具对象
}

type chaData_CharR = 'cex___toolman';
type chaData_infoDs_Type = {
	[key in chaData_CharR]: {
		dir: NullableType<string>;				// 获取本MOD地址，本测试工具用工具人实现，实际应用请选择你MOD实际存在的角色ID
	};
}

enum SignalE {
	onPickCha,    	// 选角色界面时发射信号
	onPickItem,    	// 选道具界面时发射信号
	onNewGame,   		// 初次进入游戏界面时发射信号
	onLoadGame,    	// 读取进入游戏界面时发射信号
	onSaveGame,    	// 退回标题页面时发射信号
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


enum TeamTypeE {
	Enemy = 1,											// 敌方阵营
	Our   = 2,											// 己方阵营
}

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
		hasBuff(buffName: Buff['name']): NullableType<Buff>;										// 根据名字，查找Buff。有则返回实例，无则返回null
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
	interface _IAllBase {
		_upS(): void;													// 每过了一秒 的回调。
		_connect(): void;											//
	}

	interface UIHook {
		pressed(): void;											// 当某个UI（如 按钮），按下时。
		button_down(): void;									// 特指【按钮按下】。
		tree_exited(): void;									//
	}

	interface GameHook {
		onNewGame(): void;										// 【钩子】新开游戏时，初始化的操作
		onLoadGame(): void;										// 【钩子】当读取游戏时，初始化的操作
		onBattleStart(): void;								// 【钩子】当单场战斗开始时，初始化的操作
	}

	export interface Chara extends _IAllBase {
		_info(): void;							//
		_extInit(): void;											// 额外的初始化
		_castCdSkill(id: string): void;				// 处理【CD技能】的施放
		_onBattleStart(): void;								// 当战斗开始时

		_onKillChara(atkInfo: IAtkInfo): void;			// 当己角色，击杀了，其它一个角色 时
		_onCharaDel(char: Chara): void;							// 当场上任一角色死亡时。（似乎，是个全局通知广播？）
		_onHurt(atkInfo: IAtkInfo): void;						// 当己角色，受到伤害时
	}

	export interface Buff extends _IAllBase {
		_init(): void;																			// Buff的初始化
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
		b_jiSu: Buff;								// 极速Buff
	}

	export interface Base {
		reTimer(duration: number): ReTimer;						// ？？？
		yield(t: ReTimer, name: 'timeout'): void;			// 应该是，线程阻塞【若干秒】的意思。
		range(num: number): unknown;									//

		getAllChas(
			team: TeamTypeE,														// 角色所属阵营
		): CharaSequence;															// 场上所有的角色队列。（可分 己方阵营、地方阵营）
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
		sys: INode & {
			// 主要面板
			main: {
				// 自身领主角色
				player: {
					plusGold(goldNum: number): void;				// 增加【自身】黄金。
					addItem(item: PackItem): void;							// 增加【自身】的【背包物品】。
				}
			};
			rndPer(possibleRatio: number): boolean;			// 可能性概率。 最大值 100


			newItem(itemName: string): PackItem;				// 创建一个新的【背包物品】。
		};

		file: {
			file_exists(path: string): NullableType<IFile>;								// 检查，文件是否存在。 是-File  否-null
			open(path: string, mode: IFileModeE): void;										// 尝试打开文件，建立文件流
			get_len(): number;																						// 查看当前文件流，所剩长度
			get_line(): string;																						// 获取当前文件流，下一行文本
			close(): void;																								// 关闭文件流
			store_line(str: string): void;																// 在文件流中，存储一行文本
		}

		parse_json(str: string): any;																		// 从文本，解析出JSON对象·。

		// TIP 具体加载流程

		id: string;								// 此MOD创意工坊ID，可选，暂不使用
		name: CurFileName_Type;							// 此文件名称
		test: boolean;						// 是否开启测试，推荐格式，非必要
		data: Array<any> | Map<string, any>;		// 想要支持硬盘保存的数据，也可以改成字典或其他类型
		base: NullableType<any>;	// 基础工具变量名
		path: Path_Type;							// 本MOD的地址

		call_deferred(customFn: call_deferred_MethodE): void;	// （经常在全局_init后调用）读取完毕后初始化，可解决【创意工坊后于本地mod调用】的问题

		emit_signal(signal: SignalE): void;										// 发射广播信号。

		globalData: {
			infoDs: globalData_infoDs_Type & {
				has(toolName: globalData_ToolE): NullableType<BaseTool>;		// 检测是否有【依赖的工具】
			};
		};

		chaData: {
			infoDs: chaData_infoDs_Type;
		};

		print(str: string): void;	//

	}

}

interface IGlobal extends Global.ICell, Global.IBuff, Global.Base, Global.Skill, Global.Att, Global.System {
}

interface Chara extends 															//
	LifeCycle.Chara,																		//
	INode,
	//
	Ability.Base, Ability.MyBuff, Ability.RelatedChara	//
{
	global: IGlobal;											// 全局的一些变量、方法。
	img: ImageBitmap;
	attCoe: Ability.Att;									// 攻击属性
	evos: Array<Chara['name']>;						// 进化树，下一步的进化分支  的角色名。
	team: TeamTypeE;													// 【所属团队】。 1-自己团队  2-敌方团队


	isDeath: boolean;											// 自身是否死亡

	isSumm: unknown;											// ？？？？？？？？？
}


interface Buff extends LifeCycle.Buff {
	id: string;																					// 唯一ID
	name: string;																				// 名称
	life: number;																				// 剩余时间（可由外部设定）
	/**
	 * 得到一个实例
	 * 				1.原文为【new】，但new是关键字。
	 */
	create(
		life?: number,			// 【life】是持续时间。不传的话，默认是【永远存在】。
	): Buff;												//
	//
	//

	// 【Buff加成】攻击相关
	att: {
		spd: number;																			// 攻击速度【比率】。 默认值 为1 。
		atkL: number;																			// 物理攻击力【比率】
		mgiAtkL: number;																	// 魔法攻击力【比率】
		cri: number;																			// 暴击几率
	};
	masCha: Chara;																			// TIP MasterChar - Buff原本相关，可挂靠的【角色】

}

interface Label extends INode {
	/**
	 * 得到一个实例
	 * 				1.原文为【new】，但new是关键字。
	 */
	create(): this;												//

	text: string;
}


interface PackItem {

}
