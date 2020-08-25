/**
 * 33.关于强大的【装饰器】，采用这样一篇文章，即可：
 *          33.1 从 JavaScript 到 TypeScript 4 - 装饰器和反射 - 听·说 - SegmentFault 思否     - https://segmentfault.com/a/1190000011520817
 *
 */
import { __decorate, __metadata } from "tslib";
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
const meta = function (classPrototype, memberKeyName, memberValueDescriptor) {
    // 获取成员类型（指定成员）
    const type = Reflect.getMetadata('design:type', classPrototype, memberKeyName);
    // 获取成员参数类型（指定成员）
    const paramtypes = Reflect.getMetadata('design:paramtypes', classPrototype, memberKeyName);
    // 获取成员返回类型（指定成员）
    const returntype = Reflect.getMetadata('design:returntype', classPrototype, memberKeyName);
    // 获取所有元数据key（由TypeScript 注入）
    const keys = Reflect.getMetadataKeys(classPrototype, memberKeyName);
    console.log(keys); // [ 'design:returntype', 'design:paramtypes', 'design:type' ]
    // 成员类型
    console.log(type); // Function
    // 参数类型
    console.log(paramtypes); // [String]  或者  [String,Number,Function,Boolean]
    // 成员返回类型
    console.log(returntype); // String
};
class ReflectTest {
    test(num) {
        return num + '';
    }
}
__decorate([
    meta // 使用该注解，打印出：该函数【所处的Class类型】，以及函数的【参数列表类型】、【返回类型】、【元数据】
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReflectTest.prototype, "test", null);
//# sourceMappingURL=decorator-experiment.js.map