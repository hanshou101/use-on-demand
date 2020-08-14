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

// TODO 【类】：类的构造函数，作为唯一参数

export type MyBase_ClassDecorator = (classConstructor: Function) => void;

//
//
//

// TODO 【静态方法】：
export type MyBase_Static_MethodDecorator = (
  classConstructor: Function,   // 对于静态方法来说，是类的构造函数。（即，没有包括非静态的实例方法）
  memberKeyName: string,   // 静态方法的函数名字
  memberValueDescriptor: PropertyDescriptor,  // 对于一个对象内部属性值，内部的属性描绘符。（参见JS高程）
) => void;

// TODO 【实例方法】：
// 注意，【getter、setter访问器】方法，也是和【实例方法】一模一样。
export type MyBase_Instance_MethodDecorator = (
  classPrototype: Object,   // 对于实例方法来说，是类的原型对象。（即，包括了所有的实例方法、以及 构造函数 ）
  memberKeyName: string,   // 实例方法的函数名字
  memberValueDescriptor: PropertyDescriptor,  // 对于一个对象内部属性值，内部的属性描绘符。（参见JS高程）
) => void;

//
//
//

// TODO 【静态属性变量】：
export type MyBase_Static_PropertyVariableDecorator = (
  classConstructor: Function, // 同【静态方法】
  memberKeyName: string,      // 同【静态方法】
) => void;

// TODO 【实例属性变量】：
export type MyBase_Instance_PropertyVariableDecorator = (
  classPrototype: Object,     // 同【实例方法】
  memberKeyName: string,      // 同【实例方法】
) => void;

//
//
//

// TODO 【静态方法-形式参数】：
export interface MyBase_Static_FormalParam_Decorator {
  classConstructor: Function; // 同【静态方法】
  paramName: string;      // 同【静态方法】
  paramIndex_inList: number;        // 当前形式参数，在【参数列表】中所处的索引位置。（0到length-1）
}

// TODO 【实例方法-形式参数】：
export interface MyBase_Instance_FormalParam_Decorator {
  classPrototype: Object;     // 同【实例方法】
  paramName: string;      // 同【实例方法】
  paramIndex_inList: number;        // 当前形式参数，在【参数列表】中所处的索引位置。（0到length-1）
}


// TIP 以下，还有反射的情况

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

const meta: MyBase_Instance_MethodDecorator = function (
  classPrototype: Object,
  memberKeyName: string,
  memberValueDescriptor: PropertyDescriptor,
) {
  // 获取成员类型（指定成员）
  const type = Reflect.getMetadata('design:type', classPrototype, memberKeyName);
  // 获取成员参数类型（指定成员）
  const paramtypes = Reflect.getMetadata('design:paramtypes', classPrototype, memberKeyName);
  // 获取成员返回类型（指定成员）
  const returntype = Reflect.getMetadata('design:returntype', classPrototype, memberKeyName);
  // 获取所有元数据key（由TypeScript 注入）
  const keys = Reflect.getMetadataKeys(classPrototype, memberKeyName);

  console.log(keys);  // [ 'design:returntype', 'design:paramtypes', 'design:type' ]

  // 成员类型
  console.log(type);  // Function
  // 参数类型
  console.log(paramtypes);  // [String]  或者  [String,Number,Function,Boolean]
  // 成员返回类型
  console.log(returntype);   // String
};

class ReflectTest {
  @meta   // 使用该注解，打印出：该函数【所处的Class类型】，以及函数的【参数列表类型】、【返回类型】、【元数据】
  public test (num: number) {
    return num + '';
  }
}
