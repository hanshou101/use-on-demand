import { __awaiter, __decorate, __generator, __metadata } from "tslib";
/**
 * 参考资料：
 *      初识Three.js - 顶上战争 - 知乎 - https://zhuanlan.zhihu.com/p/27296011
 *
 * 注意以下事项
 *      1.TODO 版本号，为85
 *      2.TrackballControls 工具类，为原型链的自定义方法。
 *
 *      3.实践操作总结：
 *                  3.1 遇到了这些坑：
 *                          3.1.1 按照原教程，代码转化为ts完毕之后。发现地板的图片导入的地方，出现了不同步。（图片加载本身是异步的，而原教程此处未做回调处理，而是直接顺序执行了。）
 *                          3.1.2 TrackballControls这个类，并不是ThreeJS原生所有的。  而是原教程作者，自己实现的一个类。
 *                                      3.1.2.1 先转化为ts文件。转化为ts之后，声明方式，首先要符合ts的语法标准。
 *                                      3.1.2.2 处理普通JS的声明类方式，和TS的兼容。
 *                                      3.1.2.3 处理  prototype之上，额外的绑定  THREE.EventDispatcher的原型的问题。
 *                                      3.1.2.4 处理，【85版本】和【56版本】，在导入  【Npm方式的ThreeJS】 时，导入语法的差异问题。
 *                  3.2 全部的坑全部踩平后，再捉出这两只小虫子：
 *                          3.2.1 【ground.rotation.x = -Math.PI / 2;】，这句加上  负号就好。
 *                          3.2.2 【renderer.setSize(this.screen_width / 2, this.screen_height);】，这句，高度参数不除以2就好。
 */
import { CDecoratorU } from '../../../../decorator/common-decorator';
// @ts-ignore
// import * as THREE from 'three'     // 56版本
var THREE = require('three'); // 85版本、95版本
import { MyTrackballControls } from '../Utils/module/TrackballControls';
var Label = /** @class */ (function () {
    function Label(label, imgurl, position, size) {
        this.label = label;
        this.imgurl = imgurl;
        this.position = position;
        this.size = size;
    }
    return Label;
}());
var OnePiece_three95 = /** @class */ (function () {
    function OnePiece_three95() {
        this.FOV = 50; // 视野的竖直角度
        this.near = 0.1; // 近平面距离
        this.far = 50000; // 远平面距离
        this.textureLoader = new THREE.TextureLoader(); //
    }
    Object.defineProperty(OnePiece_three95.prototype, "labelData", {
        get: function () {
            return [
                new Label('艾斯', '/image/ThreeJS/ace.jpg', [0, 40 - this.FOV, 0], [50, 80, 10]),
                new Label('马歇尔·D·蒂奇', '/image/ThreeJS/teach.jpg', [-120, 75 - this.FOV, 500], [90, 150, 10]),
                new Label('唐吉诃德·多弗朗明哥', '/image/ThreeJS/doflamingo.jpg', [120, 90 - this.FOV, 500], [90, 160, 10]),
                new Label('波雅·汉库克', '/image/ThreeJS/hancock.jpg', [-120, 45 - this.FOV, 1000], [50, 90, 10]),
                new Label('月光·莫利亚', '/image/ThreeJS/moria.jpg', [120, 90 - this.FOV, 1000], [120, 180, 20]),
                new Label('乔拉可尔·米霍克', '/image/ThreeJS/mihawk.jpg', [-120, 50 - this.FOV, 1500], [50, 100, 10]),
                new Label('巴索罗米·熊', '/image/ThreeJS/kuma.jpg', [120, 75 - this.FOV, 1500], [140, 150, 10]),
                new Label('沙·克洛克达尔', '/image/ThreeJS/crocodile.jpg', [-120, 55 - this.FOV, 2000], [60, 110, 10]),
                new Label('甚平', '/image/ThreeJS/jinbe.jpg', [120, 50 - this.FOV, 2000], [70, 100, 10]),
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OnePiece_three95.prototype, "screen_width", {
        get: function () {
            return window.innerWidth;
        } //
        ,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OnePiece_three95.prototype, "screen_height", {
        get: function () {
            return window.innerHeight;
        } //
        ,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OnePiece_three95.prototype, "aspect", {
        get: function () {
            return this.screen_width / this.screen_height;
        } //
        ,
        enumerable: false,
        configurable: true
    });
    OnePiece_three95.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scene;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initScene()];
                    case 1:
                        scene = _a.sent();
                        // 初始化整个流程（相机、渲染器）
                        this.view = this.initView(scene);
                        // （追踪轨迹球，控制）  其实，就是用鼠标，去实现移动相机（Camera）的效果
                        this.controls = new MyTrackballControls(this.view.camera);
                        // 进行渲染
                        this.animate();
                        return [2 /*return*/];
                }
            });
        });
    };
    OnePiece_three95.prototype.initScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var scene, light, textureSquares, groundMaterial, planeGeoMetry, ground;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scene = new THREE.Scene();
                                    // 添加环境光
                                    scene.add(new THREE.AmbientLight(0x3f2806)); // 一束环境光
                                    light = new THREE.DirectionalLight(0xffffff, 1);
                                    light.position.set(0, 100, 100);
                                    scene.add(light);
                                    return [4 /*yield*/, this.asyncLoad_textureLoader('image/ThreeJS/bright_squares256.png')];
                                case 1:
                                    textureSquares = _a.sent();
                                    textureSquares.repeat.set(10, 10);
                                    textureSquares.wrapS = textureSquares.wrapT = THREE.RepeatWrapping;
                                    textureSquares.magFilter = THREE.NearestFilter;
                                    textureSquares.format = THREE.RGBFormat;
                                    groundMaterial = new THREE.MeshPhongMaterial({
                                        shininess: 80, color: 0xffffff, specular: 0xffffff, map: textureSquares,
                                    });
                                    planeGeoMetry = new THREE.PlaneBufferGeometry(100, 100);
                                    ground = new THREE.Mesh(planeGeoMetry, groundMaterial);
                                    ground.position.set(0, -this.FOV, 0);
                                    ground.rotation.x = -Math.PI / 2; // 旋转90°？
                                    ground.scale.set(1000, 1000, 1000);
                                    ground.receiveShadow = true;
                                    scene.add(ground);
                                    // 将人物，批量放置到场景中。
                                    this.labelData.forEach(function (item) {
                                        _this.textureLoader.load(item.imgurl, function (texture) {
                                            // THREE.BoxBufferGeometry为立方体，其构造函数参数为  对应立方体在X轴的宽度，Y轴的高度，Z轴的长度。
                                            var geometry = new THREE.BoxBufferGeometry(item.size[0], item.size[1], item.size[2]);
                                            // 兰伯特材质
                                            var material = new THREE.MeshLambertMaterial({ map: texture });
                                            var pirateMesh = new THREE.Mesh(geometry, material);
                                            // 设置人物位置
                                            pirateMesh.position.set(item.position[0], item.position[1], item.position[2]);
                                            scene.add(pirateMesh);
                                        });
                                    });
                                    resolve(scene);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    OnePiece_three95.prototype.initView = function (scene) {
        // 创建相机
        var camera = new THREE.PerspectiveCamera(this.FOV, this.aspect, this.near, this.far);
        // 设置相机位置
        camera.position.set(0, 0, 300);
        // 将相机添加到场景
        scene.add(camera);
        // 创建渲染器
        var renderer = new THREE.WebGLRenderer({
            antialias: true, logarithmicDepthBuffer: true,
        });
        // 设置渲染器参数
        renderer.setClearColor(0xf0f0f0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(this.screen_width / 2, this.screen_height);
        renderer.domElement.style.position = 'relative';
        renderer.domElement.id = 'renderer_logzbuf';
        // 将渲染器添加到Html容器
        var frameContainer = document.getElementById('container_logzbuf');
        if (frameContainer) {
            console.log('添加DOM');
            frameContainer.appendChild(renderer.domElement);
        }
        else {
            console.log('未添加成功');
        }
        return {
            frameContainer: frameContainer,
            renderer: renderer,
            scene: scene,
            camera: camera,
        };
    };
    OnePiece_three95.prototype.animate = function () {
        // 帧动画
        requestAnimationFrame(this.animate.bind(this));
        // 更新控制器
        this.controls.update();
        // 更新屏幕画面
        this.render();
    };
    OnePiece_three95.prototype.render = function () {
        this.updateRendererSizes();
        // 简单的用渲染器，重新渲染Scene和Camera
        this.view.renderer.render(this.view.scene, this.view.camera);
    };
    OnePiece_three95.prototype.updateRendererSizes = function () {
        this.view.renderer.setSize(this.screen_width, this.screen_height);
        this.view.camera.aspect = this.aspect;
        this.view.camera.updateProjectionMatrix();
        this.view.camera.setViewOffset(this.screen_width, this.screen_height, 0, 0, this.screen_width, this.screen_height);
        if (this.view.frameContainer) {
            this.view.frameContainer.style.width = 100 + '%';
        }
    };
    OnePiece_three95.prototype.asyncLoad_textureLoader = function (path) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.textureLoader.load(path, function (texture) {
                resolve(texture);
            });
        });
    };
    __decorate([
        CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], OnePiece_three95.prototype, "init", null);
    __decorate([
        CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], OnePiece_three95.prototype, "initScene", null);
    __decorate([
        CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [THREE.Scene]),
        __metadata("design:returntype", void 0)
    ], OnePiece_three95.prototype, "initView", null);
    __decorate([
        CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OnePiece_three95.prototype, "animate", null);
    __decorate([
        CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OnePiece_three95.prototype, "render", null);
    __decorate([
        CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OnePiece_three95.prototype, "updateRendererSizes", null);
    __decorate([
        CDecoratorU.log(this),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], OnePiece_three95.prototype, "asyncLoad_textureLoader", null);
    return OnePiece_three95;
}());
export { OnePiece_three95 };
//# sourceMappingURL=OnePiece_WebGL.js.map