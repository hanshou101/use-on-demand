/**
 * 33.关于强大的【装饰器】，采用这样一篇文章，即可：
 *          33.1 从 JavaScript 到 TypeScript 4 - 装饰器和反射 - 听·说 - SegmentFault 思否     - https://segmentfault.com/a/1190000011520817
 *
 */
/**
 * 装饰器共有4种：
 *        1.【类】装饰器
 *        2.【静态方法】装饰器、【实例方法】装饰器。（还包括【getter、setter访问器】装饰器。）
 *        3.【静态属性】装饰器、【实例属性】装饰器。
 *        4.【参数】装饰器。
 */
export declare type MyBase_ClassDecorator = (classConstructor: Function) => void;
export declare type MyBase_Static_MethodDecorator = (classConstructor: Function, // 对于静态方法来说，是类的构造函数。（即，没有包括非静态的实例方法）
memberKeyName: string, // 静态方法的函数名字
memberValueDescriptor: PropertyDescriptor) => void;
export declare type MyBase_Instance_MethodDecorator = (classPrototype: {}, // 对于实例方法来说，是类的原型对象。（即，包括了所有的实例方法、以及 构造函数 ）
memberKeyName: string, // 实例方法的函数名字
memberValueDescriptor: PropertyDescriptor) => void;
export declare type MyBase_Static_PropertyVariableDecorator = (classConstructor: Function, // 同【静态方法】
memberKeyName: string) => void;
export declare type MyBase_Instance_PropertyVariableDecorator = (classPrototype: {}, // 同【实例方法】
memberKeyName: string) => void;
export interface MyBase_Static_FormalParam_Decorator {
    classConstructor: Function;
    paramName: string;
    paramIndex_inList: number;
}
export interface MyBase_Instance_FormalParam_Decorator {
    classPrototype: {};
    paramName: string;
    paramIndex_inList: number;
}
/**
 * 反射可以获得对象的：
 *            1.对象的类型
 *            2.成员/静态属性的信息（类型）
 *            3.方法的参数类型、返回类型
 *
 * TODO 注意，此处是专门去查看  TypeScript中，TS类型的结构。（这些信息，按道理编译为js后无法得到的；但这里通过反射可以得到）
 *
 */
import 'reflect-metadata';
//# sourceMappingURL=decorator-experiment.d.ts.map