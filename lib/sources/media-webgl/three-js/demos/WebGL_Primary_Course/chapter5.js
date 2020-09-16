import { __decorate, __extends, __metadata } from "tslib";
import { xX_BaseThreeClass, xX_BaseThreeClass_Helper, xX_My_YuanZhu_Option, xX_MyPoint3D } from '../Utils/BaseThreeClass';
// @ts-ignore
import TWEEN from '@tweenjs/tween.js';
import { xX_CDecoratorU } from '../../../../decorator/common-decorator'; // FIXME 此处版本较老，最新版本自带 .d.ts 。
var chapter5_three75 = /** @class */ (function (_super) {
    __extends(chapter5_three75, _super);
    function chapter5_three75() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$lights = [];
        _this.$objects = [];
        _this.$helper = new Chapter5_Helper();
        return _this;
    }
    chapter5_three75.prototype.$1_initScene = function () {
        return this.$scene = this.$helper.my_Default_Scene(this);
    };
    chapter5_three75.prototype.$2_initCamera = function () {
        var camera = this.$helper.my_Default_Camera(this, {
            fov: 45,
            near: 1,
            far: 10000,
            position: new xX_MyPoint3D(0, 0, 600),
            up: new xX_MyPoint3D(0, 1, 0),
            lookAt: new xX_MyPoint3D(0, 0, 0),
        });
        return this.$camera = camera;
    };
    chapter5_three75.prototype.$3_initRenderer_needAppend = function () {
        var renderer = this.$helper.my_DefaultRenderer_haveNotAppend(this, {
            antialias: true, bg_color: 0xffffff, bg_alpha: 1,
        });
        this._container.appendChild(renderer.domElement);
        return this.$renderer = renderer;
    };
    chapter5_three75.prototype.$4_initLight_needAdd = function () {
        var ambientLight = this.$helper.my_Default_LightsBundle_haveNotAdd(this, {
            color: 0xFF0000, position: new xX_MyPoint3D(100, 100, 200),
        }).ambientLight;
        var pointLight = this.$helper.my_Default_LightsBundle_haveNotAdd(this, {
            color: 0x00FF00, position: new xX_MyPoint3D(0, 0, 300),
        }).pointLight;
        this.$scene.add(ambientLight);
        this.$scene.add(pointLight);
        return this.$lights = [ambientLight, pointLight];
    };
    chapter5_three75.prototype.$5_initObject_needAdd = function () {
        var YuanZhu = this.$helper.my_Default_Object_haveNotAdd(this, {
            yuan_zhu: new xX_My_YuanZhu_Option({ radiusTop: 100, radiusBottom: 150, height: 400 }, {
                color: 0xffffff,
            }, new xX_MyPoint3D(0, 0, 0)),
        }).YuanZhu;
        this.$scene.add(YuanZhu.object3d);
        return this.$objects = [YuanZhu.object3d];
    };
    // @xX_CDecoratorU.log(this)
    chapter5_three75.prototype.$111_onceChange = function () {
        this.$statsUtil.update(); // 更新帧数
        // this.$objects.forEach(object => {
        //   object.position.x -= 1;   // 图形向左移动
        //   if (object.position.x < -300) {
        //     object.position.x = 300;
        //   }
        // })
        TWEEN.update(); // 更新动画
    };
    // @xX_CDecoratorU.log(this)
    chapter5_three75.prototype.$999_loopChange_Render = function () {
        this.$111_onceChange();
        this.$renderer.render(this.$scene, this.$camera);
        requestAnimationFrame(this.$999_loopChange_Render.bind(this));
    };
    chapter5_three75.prototype.$1000_threeStart = function () {
        this.$1_initScene();
        this.$2_initCamera();
        this.$3_initRenderer_needAppend();
        this.$4_initLight_needAdd();
        this.$5_initObject_needAdd();
        // 使用【TWEEN】，来移动物体
        // new TWEEN.Tween(this.$objects[0].position)
        // // .to({x: 300}, 1)   // 这句，似乎没起到作用？
        //   .to({x: -300}, 3000)
        //   .repeat(Number.POSITIVE_INFINITY)
        //   .start();
        // 使用【TWEEN】，来移动摄像头
        new TWEEN.Tween(this.$camera.position)
            .to({ x: 200, y: 500 }, 3000)
            .repeat(Number.POSITIVE_INFINITY)
            .start();
        this.$999_loopChange_Render();
    };
    __decorate([
        xX_CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", THREE.Scene)
    ], chapter5_three75.prototype, "$1_initScene", null);
    __decorate([
        xX_CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", THREE.PerspectiveCamera)
    ], chapter5_three75.prototype, "$2_initCamera", null);
    __decorate([
        xX_CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", THREE.WebGLRenderer)
    ], chapter5_three75.prototype, "$3_initRenderer_needAppend", null);
    __decorate([
        xX_CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Array)
    ], chapter5_three75.prototype, "$4_initLight_needAdd", null);
    __decorate([
        xX_CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Array)
    ], chapter5_three75.prototype, "$5_initObject_needAdd", null);
    __decorate([
        xX_CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], chapter5_three75.prototype, "$1000_threeStart", null);
    return chapter5_three75;
}(xX_BaseThreeClass));
export { chapter5_three75 };
var Chapter5_Helper = /** @class */ (function (_super) {
    __extends(Chapter5_Helper, _super);
    function Chapter5_Helper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Chapter5_Helper;
}(xX_BaseThreeClass_Helper));
//# sourceMappingURL=chapter5.js.map