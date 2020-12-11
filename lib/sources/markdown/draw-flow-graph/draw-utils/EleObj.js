import { __extends, __read, __spread } from "tslib";
import os from 'os';
import { RefCheckUtilsFactory } from './RefCheckUtils';
var IRefCheckUtil = RefCheckUtilsFactory.getV2();
export var EleObj;
(function (EleObj) {
    // 原生类型
    var EleObj_Enum;
    (function (EleObj_Enum) {
        EleObj_Enum["Start"] = "start";
        EleObj_Enum["End"] = "end";
        EleObj_Enum["Operation"] = "operation";
        EleObj_Enum["Subroutine"] = "subroutine";
        EleObj_Enum["Condition"] = "condition";
        EleObj_Enum["Inputoutput"] = "inputoutput";
        EleObj_Enum["Parallel"] = "parallel";
    })(EleObj_Enum || (EleObj_Enum = {}));
    // 操作过程中的衍生类型
    var VirtualEleObj_Enum;
    (function (VirtualEleObj_Enum) {
        VirtualEleObj_Enum["__Cond"] = "__cond";
        VirtualEleObj_Enum["__Direction"] = "__direction";
        VirtualEleObj_Enum["__Para"] = "__para";
    })(VirtualEleObj_Enum || (VirtualEleObj_Enum = {}));
    var Base = /** @class */ (function () {
        function Base(type, content_canBreakLine, urlLink, paramName) {
            this.type = type;
            this.content_canBreakLine = content_canBreakLine;
            this.urlLink = urlLink;
            this.paramName = paramName;
            this.linkTimes = 0; // 记录，当前元素，连接了几个其它元素
            /**
             * 先加后减，和先减后加。效果是一个样！！！
             */
            this.canUseTimes = 0; // 元素，被声明次数 - 被使用次数
            if (!paramName) {
                /**
                 * 此处，增加了对于content中【换行符】的支持。（更加方便排版）
                 *        1.content 允许有换行符
                 *        2.paramName 不允许有换行符
                 */
                this.paramName = content_canBreakLine.replace(os.EOL, '')
                    .replace(/\s/g, '') + new Date().valueOf();
                console.log(this.paramName + " /// " + content_canBreakLine);
            }
        }
        Base.prototype.toString = function () {
            var _a, _b;
            if (this.urlLink
                && !((_a = this.urlLink) === null || _a === void 0 ? void 0 : _a.startsWith('http://'))
                && !((_b = this.urlLink) === null || _b === void 0 ? void 0 : _b.startsWith('https://'))) {
                var newUrl = "http://" + this.urlLink;
                console.log('替换了urlLink', '新值', newUrl, '原值', this.urlLink);
                this.urlLink = newUrl;
            }
            return this.paramName + "=>" + this.type + ": " + this.content_canBreakLine + (
            // this?.urlLink ?? ''                                   // 缺省值为空字符
            this.urlLink ? ':>' + this.urlLink : '');
        };
        /**
         * 检查，自身对象的type，是属于哪一种枚举类型
         *        1.【虚拟衍生元素】，将不被ref检查；
         *        2.【实际元素】，将被ref检查；
         */
        Base.prototype.__isVirtualEleObj = function () {
            var bool;
            if (Object.values(VirtualEleObj_Enum).includes(this.type)) {
                bool = true;
            }
            else {
                bool = false;
            }
            // const bool = (this.type as any) instanceof VirtualEleObj_Enum;
            return bool;
        };
        Base.prototype.link = function () {
            var objs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                objs[_i] = arguments[_i];
            }
            this.linkTimes++; // link次数记录+1
            IRefCheckUtil.checkUsedIfOnce(this); // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）
            objs.forEach(function (item, index, arr) {
                if (index + 1 < arr.length) { // 如果自身不是最后一个元素（自己的身后，还有其它元素）
                    item.linkTimes++; // link次数记录+1
                }
                IRefCheckUtil.checkUsedIfOnce(item); // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）
            });
            var str = __spread([this], objs).map(function (item) {
                return item.paramName;
            }).join('->');
            return str;
        };
        Base.prototype.toDirection = function (direc) {
            IRefCheckUtil.checkUsedIfOnce(this); // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）
            if (this.type === VirtualEleObj_Enum.__Cond) {
                throw new Error("\u3010Cond\u3011\u6846\u5185\uFF0C\u4E0D\u5141\u8BB8\u76F4\u63A5\u4F7F\u7528toDirection\u65B9\u6CD5\u3002" + os.EOL + "1.\u8BF7\u4F7F\u7528cond\u65B9\u6CD5\u91CC\u7684\u989D\u5916\u53C2\u6570\uFF01" + os.EOL + "2." + this.toString());
            }
            var __newDirect = this.paramName + "(" + direc + ")";
            return new Base(VirtualEleObj_Enum.__Direction, __newDirect, undefined, __newDirect);
        };
        return Base;
    }());
    EleObj.Base = Base;
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        function Start(content_canBreakLine, urlLink, paramName) {
            return _super.call(this, EleObj_Enum.Start, content_canBreakLine, urlLink, paramName) || this;
        }
        return Start;
    }(Base));
    EleObj.Start = Start;
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        function End(content_canBreakLine, urlLink, paramName) {
            return _super.call(this, EleObj_Enum.End, content_canBreakLine, urlLink, paramName) || this;
        }
        return End;
    }(Base));
    EleObj.End = End;
    var Operation = /** @class */ (function (_super) {
        __extends(Operation, _super);
        function Operation(content_canBreakLine, urlLink, paramName) {
            return _super.call(this, EleObj_Enum.Operation, content_canBreakLine, urlLink, paramName) || this;
        }
        return Operation;
    }(Base));
    EleObj.Operation = Operation;
    var Subroutine = /** @class */ (function (_super) {
        __extends(Subroutine, _super);
        function Subroutine(content_canBreakLine, urlLink, paramName) {
            return _super.call(this, EleObj_Enum.Subroutine, content_canBreakLine, urlLink, paramName) || this;
        }
        return Subroutine;
    }(Base));
    EleObj.Subroutine = Subroutine;
    var Condition = /** @class */ (function (_super) {
        __extends(Condition, _super);
        function Condition(content_canBreakLine, urlLink, paramName) {
            return _super.call(this, EleObj_Enum.Condition, content_canBreakLine, urlLink, paramName) || this;
        }
        Condition.prototype.cond = function (state, direct) {
            this.linkTimes++; // link次数记录+1
            IRefCheckUtil.checkUsedIfOnce(this); // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）
            if (this.paramName
                && (this.paramName.indexOf('(') > 0
                    || this.paramName.indexOf(')') > 0)) {
                throw new Error("Condition\u6846\u5B58\u5728\u7279\u6B8A\u7B26\u53F7\uFF01\u4F1A\u5F71\u54CDcond\u5224\u65AD\u3002\n        \u89E3\u51B3\u65B9\u6848\uFF1A\n        1.\u4E0D\u53EF\u4EE5\u7528\u534A\u89D2\u62EC\u53F7\u3002\n        2.\u53EF\u4EE5\u8003\u8651\u7528\u5168\u89D2\u62EC\u53F7");
            }
            var directStr = direct ? "," + direct : '';
            var newContent = this.paramName + "(" + state + directStr + ")";
            return new Base(VirtualEleObj_Enum.__Cond, newContent, undefined, newContent);
        };
        return Condition;
    }(Base));
    EleObj.Condition = Condition;
    var InputOutput = /** @class */ (function (_super) {
        __extends(InputOutput, _super);
        function InputOutput(content_canBreakLine, urlLink, paramName) {
            return _super.call(this, EleObj_Enum.Inputoutput, content_canBreakLine, urlLink, paramName) || this;
        }
        return InputOutput;
    }(Base));
    EleObj.InputOutput = InputOutput;
    var Parallel = /** @class */ (function (_super) {
        __extends(Parallel, _super);
        function Parallel(content_canBreakLine, urlLink, paramName) {
            return _super.call(this, EleObj_Enum.Parallel, content_canBreakLine, urlLink, paramName) || this;
        }
        Parallel.prototype.parallel = function (pathName, direct) {
            this.linkTimes++; // link次数记录+1
            IRefCheckUtil.checkUsedIfOnce(this); // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）
            var paramName = this.paramName + "(" + pathName + "," + direct + ")";
            return new Base(VirtualEleObj_Enum.__Para, paramName, undefined, paramName);
        };
        return Parallel;
    }(Base));
    EleObj.Parallel = Parallel;
})(EleObj || (EleObj = {}));
//# sourceMappingURL=EleObj.js.map