import { __extends } from "tslib";
import { BaseThreeClass, BaseThreeClass_Helper, My_YuanZhu_Option, MyPoint3D } from '../Utils/BaseThreeClass';
var THREE = require('three'); // 75版本、85版本、95版本
var chapter4_three75 = /** @class */ (function (_super) {
    __extends(chapter4_three75, _super);
    function chapter4_three75() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$lights = [];
        _this.$objects = [];
        _this.$helper = new Chapter4_Helper();
        return _this;
    }
    chapter4_three75.prototype.$1_initScene = function () {
        return this.$scene = this.$helper.my_Default_Scene(this);
    };
    chapter4_three75.prototype.$2_initCamera = function () {
        var camera = this.$helper.my_Default_Camera(this, {
            fov: 45,
            near: 1,
            far: 10000,
            position: new MyPoint3D(0, 0, 600),
            up: new MyPoint3D(0, 1, 0),
            lookAt: new MyPoint3D(0, 0, 0),
        });
        return this.$camera = camera;
    };
    chapter4_three75.prototype.$3_initRenderer_needAppend = function () {
        var renderer = this.$helper.my_DefaultRenderer_haveNotAppend(this, {
            antialias: true, bg_color: 0xffffff, bg_alpha: 1.0,
        });
        this._container.appendChild(renderer.domElement);
        return this.$renderer = renderer;
    };
    chapter4_three75.prototype.$4_initLight_needAdd = function () {
        var ambientLight = this.$helper.my_Default_LightsBundle_haveNotAdd(this, {
            color: 0xFFFFFF,
            position: new MyPoint3D(100, 100, 200),
        }).ambientLight;
        var pointLight = this.$helper.my_Default_LightsBundle_haveNotAdd(this, {
            color: 0x00FF00,
            position: new MyPoint3D(0, 0, 300),
        }).pointLight;
        this.$scene.add(ambientLight);
        this.$scene.add(pointLight);
        return this.$lights = [ambientLight, pointLight];
    };
    chapter4_three75.prototype.$5_initObject_needAdd = function () {
        var YuanZhu = this.$helper.my_Default_Object_haveNotAdd(this, {
            yuan_zhu: new My_YuanZhu_Option({
                radiusTop: 100, radiusBottom: 150, height: 400,
            }, {
                color: 0x00FF00,
            }, new MyPoint3D(0, 0, 0)),
        }).YuanZhu;
        this.$scene.add(YuanZhu.object3d);
        return this.$objects = [YuanZhu.object3d];
    };
    chapter4_three75.prototype.$111_onceChange = function () {
        this.$camera.position.x += 1; // 摄像机，向右移动哦  （同时，物体应该是向左移动）
        if (this.$camera.position.x > 300) {
            this.$camera.position.x = -300;
        }
    };
    chapter4_three75.prototype.$999_loopChange_Render = function () {
        this.$111_onceChange();
        this.$renderer.render(this.$scene, this.$camera);
        requestAnimationFrame(this.$999_loopChange_Render.bind(this));
    };
    chapter4_three75.prototype.$1000_threeStart = function () {
        this.$1_initScene();
        this.$2_initCamera();
        this.$3_initRenderer_needAppend();
        this.$4_initLight_needAdd();
        this.$5_initObject_needAdd();
        this.$999_loopChange_Render();
    };
    return chapter4_three75;
}(BaseThreeClass));
export { chapter4_three75 };
var Chapter4_Helper = /** @class */ (function (_super) {
    __extends(Chapter4_Helper, _super);
    function Chapter4_Helper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Chapter4_Helper;
}(BaseThreeClass_Helper));
//# sourceMappingURL=chapter4.js.map