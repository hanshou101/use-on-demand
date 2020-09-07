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
interface Cell {
}
interface ReTimer {
}
declare type Path_Type = NullableType<string>;
declare type ImgRelPath_Type = string | 'cex___toolman/cha.png';
declare type CurFileName_Type = 'g_test';
interface BaseTool {
    connect: INode['connect'];
    g_sys: {
        has(key: CurFileName_Type): unknown;
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
    create(): this;
}
/**
 * 文件夹相关
 */
interface IDirectory {
    /**
     * 得到一个实例
     * 				1.原文为【new】，但new是关键字。
     */
    create(): this;
    open(path: string): IResultE;
    list_dir_begin(bol: boolean): void;
    get_next(): string;
    current_is_dir(): boolean;
}
interface IImage {
    /**
     * 得到一个实例
     * 				1.原文为【new】，但new是关键字。
     */
    create(): this;
    load(path: string): void;
}
interface IImageTexture {
    /**
     * 得到一个实例
     * 				1.原文为【new】，但new是关键字。
     */
    create(): this;
    create_from_image(im: IImage): void;
}
declare enum IFileModeE {
    READ = 0,
    WRITE = 1
}
declare enum IResultE {
    OK = 0,
    Error = 1
}
interface INode {
    add_child(node: INode): void;
    set_texture(texture: ITexture): void;
    get_children(): Array<INode>;
    get_node(path: Path_Type): INode;
    has_node(path: Path_Type): NullableType<INode>;
    /**
     * 绑定一个新的钩子回调。
     * 				1.连接基础工具信号。
     */
    connect(hook: 'onHurt' | '_onHurt', // 钩子名称    WARN 此处【onHurt】是不是写错了？？？
    context: any, // 上下文，如self
    fnName: 'onHurt', // 要绑上去的函数名称
    args?: any[]): void;
}
declare type call_deferred_MethodE = 'testInit';
declare type globalData_ToolE = 'g_base';
declare type globalData_infoDs_Type = {
    [key in globalData_ToolE]: NullableType<BaseTool>;
};
declare type chaData_CharR = 'cex___toolman';
declare type chaData_infoDs_Type = {
    [key in chaData_CharR]: {
        dir: NullableType<string>;
    };
};
declare enum SignalE {
    onPickCha = 0,
    onPickItem = 1,
    onNewGame = 2,
    onLoadGame = 3,
    onSaveGame = 4
}
declare enum AtkType {
    NORMAL = 0,
    SKILL = 1,
    ContinueBuffDamage = 2
}
/**
 * 攻击信息。
 * 				1.有【攻击方】、【受伤方】。
 * 				2.在【攻击敌方】、【收到敌方伤害】时，都会触发。
 */
interface IAtkInfo {
    atkType: AtkType;
    atkCha: Chara;
}
/**
 * 角色队列。
 * 				1.有一定的拓展方法。
 */
declare type CharaSequence = Array<Chara> & {
    sort_custom(context: any, type: 'sort'): CharaSequence;
};
declare enum TeamTypeE {
    Enemy = 1,
    Our = 2
}
declare namespace Ability {
    interface Base {
        lv: number;
        name: string;
    }
    interface Att {
        maxHp: number;
        atkRan: number;
        atk: number;
        mgiAtk: number;
        def: number;
        mgiDef: number;
        atkEff: 'atk_dao';
    }
    interface MyBuff {
        addBuff(buff: Buff): void;
        hasBuff(buffName: Buff['name']): NullableType<Buff>;
        delBuff(buff: Buff): void;
    }
    interface RelatedChara {
        newChara(charName: Chara['name'], belongCell: Cell): Chara;
    }
}
/**
 * 一般内置属性、方法，用 _ 开头命名。
 */
declare namespace LifeCycle {
    interface _IAllBase {
        _upS(): void;
        _connect(): void;
    }
    export interface Chara extends _IAllBase {
        _info(): void;
        _extInit(): void;
        _castCdSkill(id: string): void;
        _onBattleStart(): void;
        _onKillChara(atkInfo: IAtkInfo): void;
        _onCharaDel(char: Chara): void;
        _onHurt(atkInfo: IAtkInfo): void;
    }
    export interface Buff extends _IAllBase {
        _init(): void;
    }
    export {};
}
declare namespace Global {
    /**
     * 容器、单元格，相关。
     * 				1.代表地图的一个格子。
     */
    interface ICell {
        cell: Cell;
        cellRan(a: Cell, b: Cell): number;
    }
    interface IBuff {
        attInit(): void;
        b_jieShuang: Buff;
        b_shaoZhuo: Buff;
        b_jiSu: Buff;
    }
    interface Base {
        reTimer(duration: number): ReTimer;
        yield(t: ReTimer, name: 'timeout'): void;
        range(num: number): unknown;
        getAllChas(team: TeamTypeE): CharaSequence;
    }
    interface Skill {
        addCdSkill(charName: string, cd: number): void;
        addSkillTxt(desc: string): void;
    }
    interface Att {
        normalAtkChara(char: Chara): void;
    }
    interface System {
        sys: INode & {
            main: {
                player: {
                    plusGold(goldNum: number): void;
                    addItem(item: PackItem): void;
                };
            };
            rndPer(possibleRatio: number): boolean;
            newItem(itemName: string): PackItem;
        };
        file: {
            file_exists(path: string): NullableType<IFile>;
            open(path: string, mode: IFileModeE): void;
            get_len(): number;
            get_line(): string;
            close(): void;
            store_line(str: string): void;
        };
        parse_json(str: string): any;
        id: string;
        name: CurFileName_Type;
        test: boolean;
        data: Array<any> | Map<string, any>;
        base: NullableType<any>;
        path: Path_Type;
        call_deferred(customFn: call_deferred_MethodE): void;
        emit_signal(signal: SignalE): void;
        globalData: {
            infoDs: globalData_infoDs_Type & {
                has(toolName: globalData_ToolE): NullableType<BaseTool>;
            };
        };
        chaData: {
            infoDs: chaData_infoDs_Type;
        };
        print(str: string): void;
    }
}
interface IGlobal extends Global.ICell, Global.IBuff, Global.Base, Global.Skill, Global.Att, Global.System {
}
interface Chara extends //
LifeCycle.Chara, //
INode, Ability.Base, Ability.MyBuff, Ability.RelatedChara {
    global: IGlobal;
    img: ImageBitmap;
    attCoe: Ability.Att;
    evos: Array<Chara['name']>;
    team: TeamTypeE;
    isDeath: boolean;
    isSumm: unknown;
}
interface Buff extends LifeCycle.Buff {
    id: string;
    name: string;
    life: number;
    /**
     * 得到一个实例
     * 				1.原文为【new】，但new是关键字。
     */
    create(life?: number): Buff;
    att: {
        spd: number;
        atkL: number;
        mgiAtkL: number;
        cri: number;
    };
    masCha: Chara;
}
interface Label extends INode {
    /**
     * 得到一个实例
     * 				1.原文为【new】，但new是关键字。
     */
    create(): this;
    text: string;
}
interface PackItem {
}
//# sourceMappingURL=interface.d.ts.map