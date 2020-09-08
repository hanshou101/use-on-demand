import { __extends, __read, __spread } from "tslib";
import { BaseThreeClass, BaseThreeClass_Helper } from '../Utils/BaseThreeClass';
var THREE = require('three'); // 75版本、85版本、95版本
var chapter3_three75 = /** @class */ (function (_super) {
    __extends(chapter3_three75, _super);
    function chapter3_three75() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$lights = [];
        _this.$objects = [];
        _this.$helper = new Chapter3_Helper();
        return _this;
    }
    chapter3_three75.prototype.$1_initScene = function () {
        return this.$scene = new THREE.Scene();
    };
    chapter3_three75.prototype.$2_initCamera = function () {
        var camera = new THREE.PerspectiveCamera(45, this._width / this._height, 1, 10000);
        // 人头的中心（y为1000）（代表具体位置）
        camera.position.x = 0;
        camera.position.y = 1000;
        camera.position.z = 0;
        // 头顶的位置（代表矢量方向）
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
        // 摄像机所看向的点。（代表具体位置）
        camera.lookAt({
            x: 0,
            y: 0,
            z: 0,
        });
        // TIP 摄像机，从1000米高空，以原点为开始，头朝向z轴方向。从上往下看。
        return this.$camera = camera;
    };
    chapter3_three75.prototype.$3_initRenderer_needAppend = function () {
        var renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setSize(this._width, this._height);
        renderer.setClearColor(0xFFFFFF, 1.0);
        this._container.appendChild(renderer.domElement); // append
        return this.$renderer = renderer;
    };
    chapter3_three75.prototype.$4_initLight_needAdd = function () {
        var light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
        light.position.set(100, 100, 200);
        this.$scene.add(light); // add
        return [this.$lights = light];
    };
    chapter3_three75.prototype.$5_initObject_needAdd = function () {
        var _this = this;
        var lines = this.$helper.createLines();
        lines.forEach(function (item) {
            _this.$scene.add(item);
        });
        return __spread(lines);
    };
    chapter3_three75.prototype.$999_loopChange_Render = function () {
        this.$renderer.clear();
        this.$111_onceChange();
        this.$renderer.render(this.$scene, this.$camera);
        requestAnimationFrame(this.$999_loopChange_Render.bind(this));
    };
    chapter3_three75.prototype.$1000_threeStart = function () {
        this.$1_initScene();
        this.$2_initCamera();
        this.$3_initRenderer_needAppend();
        this.$5_initObject_needAdd();
        this.$5_initObject_needAdd();
        this.$999_loopChange_Render();
    };
    chapter3_three75.prototype.$111_onceChange = function () {
        console.log('单个');
    };
    return chapter3_three75;
}(BaseThreeClass));
export { chapter3_three75 };
var Chapter3_Helper = /** @class */ (function (_super) {
    __extends(Chapter3_Helper, _super);
    function Chapter3_Helper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chapter3_Helper.prototype.createLines = function () {
        var lines = [];
        // 形状
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
        geometry.vertices.push(new THREE.Vector3(500, 0, 0));
        for (var i = 0; i <= 20; i++) {
            // 按照z轴，从-500到500铺开。
            var line_1 = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x000000, opacity: 0.2,
            }));
            line_1.position.z = (i * 50) - 500;
            // 按照x轴，从-500到500，重叠。然后，围绕自身y轴，逆时针旋转45度。
            var line_2 = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x000000, opacity: 0.2,
            }));
            line_2.position.x = (i * 50) - 500;
            line_2.rotation.y = 90 * Math.PI / 180; // 旋转90度。
            lines.push(line_1, line_2);
        }
        return lines;
    };
    return Chapter3_Helper;
}(BaseThreeClass_Helper));
//# sourceMappingURL=chapter3.js.map