import { __read, __spread } from "tslib";
var THREE = require('three'); // 75版本、85版本、95版本
var Stats = require('stats-js');
var xX_BaseThreeClass = /** @class */ (function () {
    function xX_BaseThreeClass(_container) {
        this._container = _container;
        // 添加ThreeJS插件————Stats，用作帧数的统计。
        this.$statsUtil = new Stats();
        this.$statsUtil.domElement.style.position = 'absolute';
        // this.$statsUtil.domElement.style.left = '0px';
        this.$statsUtil.domElement.style.left = ''; // 如果要覆盖默认属性，则需要置为空字符串
        this.$statsUtil.domElement.style.right = '10px';
        this.$statsUtil.domElement.style.top = '10px';
        this._container.appendChild(this.$statsUtil.domElement);
    }
    Object.defineProperty(xX_BaseThreeClass.prototype, "_width", {
        get: function () {
            return this._container.clientWidth;
        } //
        ,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(xX_BaseThreeClass.prototype, "_height", {
        get: function () {
            return this._container.clientHeight;
        } //
        ,
        enumerable: false,
        configurable: true
    });
    return xX_BaseThreeClass;
}());
export { xX_BaseThreeClass };
var xX_MyPoint3D = /** @class */ (function () {
    function xX_MyPoint3D(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return xX_MyPoint3D;
}());
export { xX_MyPoint3D };
// TIP Object的返回类型
var My_Object3DBundle = /** @class */ (function () {
    function My_Object3DBundle() {
    }
    return My_Object3DBundle;
}());
// TODO 哈哈，我也可以熟练地命名【命名空间】啦
var a;
(function (a) {
    var aaa = /** @class */ (function () {
        function aaa() {
        }
        return aaa;
    }()); //
    var bbb = /** @class */ (function () {
        function bbb() {
        }
        return bbb;
    }()); //
})(a || (a = {}));
var xX_My_YuanZhu_Option = /** @class */ (function () {
    function xX_My_YuanZhu_Option(geometry, material, position) {
        this.geometry = geometry;
        this.material = material;
        this.position = position;
    }
    return xX_My_YuanZhu_Option;
}());
export { xX_My_YuanZhu_Option };
var xX_My_LiFangTi_Option = /** @class */ (function () {
    function xX_My_LiFangTi_Option(geometry, material, position) {
        this.geometry = geometry;
        this.material = material;
        this.position = position;
    }
    return xX_My_LiFangTi_Option;
}());
export { xX_My_LiFangTi_Option };
var xX_My_CommonLine_Option = /** @class */ (function () {
    function xX_My_CommonLine_Option(geometry, material, position) {
        this.geometry = geometry;
        this.material = material;
        this.position = position;
    }
    return xX_My_CommonLine_Option;
}());
export { xX_My_CommonLine_Option };
var xX_My_ColorLine_Option = /** @class */ (function () {
    function xX_My_ColorLine_Option(geometry, material, position) {
        this.geometry = geometry;
        this.material = material;
        this.position = position;
    }
    return xX_My_ColorLine_Option;
}());
export { xX_My_ColorLine_Option };
var xX_BaseThreeClass_Helper = /** @class */ (function () {
    function xX_BaseThreeClass_Helper() {
    }
    // // 创建一个Object3D对象，并进行返回。
    // abstract create<T>(): T;
    // TODO 将来，这里可以写一些通用的，工具类方法。
    xX_BaseThreeClass_Helper.prototype.my_Default_Scene = function (threeClass, options) {
        var scene = new THREE.Scene();
        // scene = scene;
        return scene;
    };
    xX_BaseThreeClass_Helper.prototype.my_Default_Camera = function (threeClass, options) {
        var fov = options.fov || 45;
        var near = options.near || 0.1;
        var far = options.far || 10000;
        var position = ((options || {}).position || {});
        var position_x = position.x || 0;
        var position_y = position.y || 0;
        var position_z = position.z || 1000;
        var up = ((options || {}).up || {});
        var up_x = up.x || 0;
        var up_y = up.y || 1;
        var up_z = up.z || 0;
        var lookAt = ((options || {}).lookAt || {});
        var lookAt_x = lookAt.x || 0;
        var lookAt_y = lookAt.y || 0;
        var lookAt_z = lookAt.z || 0;
        var camera = new THREE.PerspectiveCamera(fov, threeClass._width / threeClass._height, near, far);
        camera.position.set(position_x, position_y, position_z);
        camera.up.set(up_x, up_y, up_z);
        camera.lookAt({
            x: lookAt_x,
            y: lookAt_y,
            z: lookAt_z,
        });
        return camera;
    };
    xX_BaseThreeClass_Helper.prototype.my_DefaultRenderer_haveNotAppend = function (threeClass, options) {
        var antialias = options.antialias || true;
        var bg_color = options.bg_color || 0xFFFFFF;
        var bg_alpha = options.bg_alpha || 1.0;
        var renderer = new THREE.WebGLRenderer({
            antialias: antialias,
        });
        renderer.setSize(threeClass._width, threeClass._height);
        renderer.setClearColor(bg_color, bg_alpha);
        // threeClass._container.appendChild(renderer.domElement);
        return renderer;
    };
    xX_BaseThreeClass_Helper.prototype.my_Default_LightsBundle_haveNotAdd = function (threeClass, options) {
        var color = options.color || 0xFFFFFF; // 颜色 默认值
        var intensity = options.intensity || 1; // 强度 默认值
        var distance = options.distance || 0; // 光照距离 默认值
        var decay = options.decay || 1; // 光照随距离衰减 默认值
        // Light中心点的位置信息
        var position = options.position || {};
        var x = position.x || 0;
        var y = position.y || 0;
        var z = position.z || 0;
        var ambientLight = new THREE.AmbientLight(color, intensity, distance, decay);
        ambientLight.position.set(x, y, z);
        var pointLight = new THREE.PointLight(color, intensity, distance, decay);
        pointLight.position.set(x, y, z);
        var directionalLight = new THREE.DirectionalLight(color, intensity, distance, decay);
        directionalLight.position.set(x, y, z);
        return {
            ambientLight: ambientLight,
            pointLight: pointLight,
            directionalLight: directionalLight,
        };
    };
    xX_BaseThreeClass_Helper.prototype.my_Default_Object_haveNotAdd = function (threeClass, options) {
        var _a;
        /**
         * 1.Mesh贴面物体
         *        1.1 形状：
         *              1.1.1 圆柱形的
         *              1.1.2 立方体模型（Cube或Box）
         *        1.2 材质：
         *              1.2.1 贴面兰伯特材质
         *              1.2.2 贴面基本材质
         */
        // 圆柱+贴面兰伯特材质=Mesh贴面物体
        var YuanZhu = new My_Object3DBundle();
        if (options.yuan_zhu) {
            var g = options.yuan_zhu.geometry;
            var m = options.yuan_zhu.material;
            var p = options.yuan_zhu.position;
            YuanZhu.geometry = new THREE.CylinderGeometry(g.radiusTop, g.radiusBottom, g.height);
            YuanZhu.material = new THREE.MeshLambertMaterial({ color: m.color });
            YuanZhu.object3d = new THREE.Mesh(YuanZhu.geometry, YuanZhu.material);
            YuanZhu.object3d.position.set(p.x, p.y, p.z);
        }
        // 立方体模型+贴面基本材质=Mesh贴面物体
        var LiFangTi = new My_Object3DBundle();
        if (options.li_fang_ti) {
            var g = options.li_fang_ti.geometry;
            var m = options.li_fang_ti.material;
            var p = options.li_fang_ti.position;
            LiFangTi.geometry = new THREE.BoxGeometry(g.width, g.height, g.depth);
            LiFangTi.material = new THREE.MeshBasicMaterial({ color: m.color });
            LiFangTi.object3d = new THREE.Mesh(LiFangTi.geometry, LiFangTi.material);
            LiFangTi.object3d.position.set(p.x, p.y, p.z);
        }
        /**
         * 2.（普通）Line线条物体
         *        2.1 形状：
         *              2.1.1 基类+顶点=线条
         *        2.2 材质：
         *              2.2.1 线性基本材质
         */
        // (基类+顶点)+线性基本材质=Line线条物体
        var CommonLine = new My_Object3DBundle();
        if (options.common_line) {
            var g = options.common_line.geometry;
            var m = options.common_line.material;
            var p = options.common_line.position;
            CommonLine.geometry = new THREE.Geometry(); // 基类
            (_a = CommonLine.geometry.vertices).push.apply(_a, __spread(g.vertices)); // 顶点
            CommonLine.material = new THREE.LineBasicMaterial({
                color: m.color, opacity: m.opacity,
            });
            CommonLine.object3d = new THREE.Line(CommonLine.geometry, CommonLine.material);
            CommonLine.object3d.position.set(p.x, p.y, p.z);
        }
        /**
         * 3.（彩色）Line线条物体
         *      3.1 形状：
         *            3.1.1 基类+顶点+颜色=（彩色）线条
         *      3.2 材质：
         *            3.2.1 线性基本材质+顶点颜色组=（彩色）线性基本材料
         */
        // （基类+顶点+颜色）+（线性基本材质+顶点颜色组）
        var ColorLine = new My_Object3DBundle();
        if (options.color_line) {
            var g = options.color_line.geometry;
            var m = options.color_line.material;
            var p = options.color_line.position;
            //  TIP a.形状
            ColorLine.geometry = new THREE.Geometry();
            g.my_colors.forEach(function (color) {
                ColorLine.geometry.colors.push(new THREE.Color(color));
            });
            g.my_vertices.forEach(function (point) {
                ColorLine.geometry.vertices.push(new THREE.Vector3(point.x, point.y, point.z));
            });
            // TIP b.材质
            ColorLine.material = new THREE.LineBasicMaterial({
                vertexColors: m.vertexColors /*THREE.VertexColors*/,
            });
            // TIP 物体
            ColorLine.object3d = new THREE.Line(ColorLine.geometry, ColorLine.material, THREE.LineSegments); // TODO 此处，涉及到API的兼容。
            ColorLine.object3d.position.set(p.x, p.y, p.z);
        }
        // TODO 返回Bundle
        return {
            YuanZhu: YuanZhu,
            LiFangTi: LiFangTi,
            CommonLine: CommonLine,
            ColorLine: ColorLine,
        };
    };
    return xX_BaseThreeClass_Helper;
}());
export { xX_BaseThreeClass_Helper };
//# sourceMappingURL=BaseThreeClass.js.map