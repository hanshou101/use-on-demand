import { __extends } from "tslib";
import { BaseThreeClass, BaseThreeClass_Helper } from '../Utils/BaseThreeClass';
var THREE = require('three'); // 85版本、95版本
var chapter2$5_three75 = /** @class */ (function (_super) {
    __extends(chapter2$5_three75, _super);
    function chapter2$5_three75() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$lights = [];
        _this.$objects = [];
        _this.$helper = new Chapter2$5_helper();
        return _this;
    }
    chapter2$5_three75.prototype.$1_initScene = function () {
        console.log('第1步，初始化Scene');
        var scene = new THREE.Scene();
        return this.$scene = scene;
    };
    chapter2$5_three75.prototype.$2_initCamera = function () {
        console.log('第2步，初始化Camera');
        var container = document.getElementById('canvas-frame');
        if (container) {
            var width = container.clientWidth;
            var height = container.clientHeight;
            var camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
            camera.position.x = 0;
            camera.position.y = 1000;
            camera.position.z = 0;
            camera.up.x = 0;
            camera.up.y = 0;
            camera.up.z = 1;
            camera.lookAt({
                x: 0,
                y: 0,
                z: 0,
            });
            return this.$camera = camera;
        }
    };
    chapter2$5_three75.prototype.$3_initRenderer_needAppend = function () {
        console.log('第3步，初始化Renderer');
        var container = document.getElementById('canvas-frame');
        if (container) {
            var renderer = new THREE.WebGLRenderer({
                antialias: true,
            });
            // 尺寸、背景颜色
            var width = container.clientWidth;
            var height = container.clientHeight;
            renderer.setSize(width, height);
            renderer.setClearColor(0xFFFFFF, 1.0);
            container.appendChild(renderer.domElement); // 放置在Html文档
            return this.$renderer = renderer;
        }
    };
    chapter2$5_three75.prototype.$4_initLight_needAdd = function () {
        console.log('第4步，初始化Light');
        var light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
        light.position.set(100, 100, 200);
        this.$scene.add(light);
        return this.$lights = [light];
    };
    chapter2$5_three75.prototype.$5_initObject_needAdd = function () {
        console.log('第5步，初始化Object');
        var line = this.$helper.createLine();
        this.$scene.add(line);
        return this.$objects = [
            line,
        ];
    };
    chapter2$5_three75.prototype.$111_onceChange = function () {
    };
    chapter2$5_three75.prototype.$999_loopChange_Render = function () {
        console.log('第999步，循环渲染');
        this.$renderer.clear();
        this.$renderer.render(this.$scene, this.$camera);
        requestAnimationFrame(this.$999_loopChange_Render.bind(this));
    };
    chapter2$5_three75.prototype.$1000_threeStart = function () {
        this.$1_initScene();
        this.$2_initCamera();
        this.$3_initRenderer_needAppend();
        this.$4_initLight_needAdd();
        this.$5_initObject_needAdd();
        this.$999_loopChange_Render();
    };
    return chapter2$5_three75;
}(BaseThreeClass));
export { chapter2$5_three75 };
var Chapter2$5_helper = /** @class */ (function (_super) {
    __extends(Chapter2$5_helper, _super);
    function Chapter2$5_helper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chapter2$5_helper.prototype.createLine = function () {
        //  形状a
        var geometry = new THREE.Geometry();
        var color1 = new THREE.Color(0x444444);
        var color2 = new THREE.Color(0xFF0000);
        // 线的材质可以由2点的颜色决定
        var p1 = new THREE.Vector3(-100, 0, 100);
        var p2 = new THREE.Vector3(100, 0, -100);
        // 添加顶点
        geometry.vertices.push(p1);
        geometry.vertices.push(p2);
        // 添加颜色
        geometry.colors.push(color1, color2);
        // 材质
        var material = new THREE.LineBasicMaterial({
            vertexColors: THREE.VertexColors,
        });
        // let line = new THREE.Line(geometry, material, THREE.LinePieces)
        // FIXME 上述方式已过期，换用下面一种方式
        // let line = new THREE.LineSegments(geometry, material);
        // FIXME 上述方式，网上的参考资料有问题，换用下面一种方式
        var line = new THREE.Line(geometry, material, THREE.LineSegments);
        return line;
    };
    return Chapter2$5_helper;
}(BaseThreeClass_Helper));
//# sourceMappingURL=chapter2$5.js.map