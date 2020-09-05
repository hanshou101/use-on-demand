const THREE = require('three'); // 75版本、85版本、95版本
const Stats = require('stats-js');
export class BaseThreeClass {
    constructor(_container) {
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
    get _width() {
        return this._container.clientWidth;
    } //
    get _height() {
        return this._container.clientHeight;
    } //
}
export class MyPoint3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
// TIP Object的返回类型
class My_Object3DBundle {
}
// TODO 哈哈，我也可以熟练地命名【命名空间】啦
var a;
(function (a) {
    class aaa {
    } //
    class bbb {
    } //
})(a || (a = {}));
export class My_YuanZhu_Option {
    constructor(geometry, material, position) {
        this.geometry = geometry;
        this.material = material;
        this.position = position;
    }
}
export class My_LiFangTi_Option {
    constructor(geometry, material, position) {
        this.geometry = geometry;
        this.material = material;
        this.position = position;
    }
}
export class My_CommonLine_Option {
    constructor(geometry, material, position) {
        this.geometry = geometry;
        this.material = material;
        this.position = position;
    }
}
export class My_ColorLine_Option {
    constructor(geometry, material, position) {
        this.geometry = geometry;
        this.material = material;
        this.position = position;
    }
}
export class BaseThreeClass_Helper {
    // // 创建一个Object3D对象，并进行返回。
    // abstract create<T>(): T;
    // TODO 将来，这里可以写一些通用的，工具类方法。
    my_Default_Scene(threeClass, options) {
        const scene = new THREE.Scene();
        // scene = scene;
        return scene;
    }
    my_Default_Camera(threeClass, options) {
        const fov = options.fov || 45;
        const near = options.near || 0.1;
        const far = options.far || 10000;
        const position = ((options || {}).position || {});
        const position_x = position.x || 0;
        const position_y = position.y || 0;
        const position_z = position.z || 1000;
        const up = ((options || {}).up || {});
        const up_x = up.x || 0;
        const up_y = up.y || 1;
        const up_z = up.z || 0;
        const lookAt = ((options || {}).lookAt || {});
        const lookAt_x = lookAt.x || 0;
        const lookAt_y = lookAt.y || 0;
        const lookAt_z = lookAt.z || 0;
        const camera = new THREE.PerspectiveCamera(fov, threeClass._width / threeClass._height, near, far);
        camera.position.set(position_x, position_y, position_z);
        camera.up.set(up_x, up_y, up_z);
        camera.lookAt({
            x: lookAt_x,
            y: lookAt_y,
            z: lookAt_z,
        });
        return camera;
    }
    my_DefaultRenderer_haveNotAppend(threeClass, options) {
        const antialias = options.antialias || true;
        const bg_color = options.bg_color || 0xFFFFFF;
        const bg_alpha = options.bg_alpha || 1.0;
        const renderer = new THREE.WebGLRenderer({
            antialias: antialias,
        });
        renderer.setSize(threeClass._width, threeClass._height);
        renderer.setClearColor(bg_color, bg_alpha);
        // threeClass._container.appendChild(renderer.domElement);
        return renderer;
    }
    my_Default_LightsBundle_haveNotAdd(threeClass, options) {
        const color = options.color || 0xFFFFFF; // 颜色 默认值
        const intensity = options.intensity || 1; // 强度 默认值
        const distance = options.distance || 0; // 光照距离 默认值
        const decay = options.decay || 1; // 光照随距离衰减 默认值
        // Light中心点的位置信息
        const position = options.position || {};
        const x = position.x || 0;
        const y = position.y || 0;
        const z = position.z || 0;
        const ambientLight = new THREE.AmbientLight(color, intensity, distance, decay);
        ambientLight.position.set(x, y, z);
        const pointLight = new THREE.PointLight(color, intensity, distance, decay);
        pointLight.position.set(x, y, z);
        const directionalLight = new THREE.DirectionalLight(color, intensity, distance, decay);
        directionalLight.position.set(x, y, z);
        return {
            ambientLight,
            pointLight,
            directionalLight,
        };
    }
    my_Default_Object_haveNotAdd(threeClass, options) {
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
        const YuanZhu = new My_Object3DBundle();
        if (options.yuan_zhu) {
            const g = options.yuan_zhu.geometry;
            const m = options.yuan_zhu.material;
            const p = options.yuan_zhu.position;
            YuanZhu.geometry = new THREE.CylinderGeometry(g.radiusTop, g.radiusBottom, g.height);
            YuanZhu.material = new THREE.MeshLambertMaterial({ color: m.color });
            YuanZhu.object3d = new THREE.Mesh(YuanZhu.geometry, YuanZhu.material);
            YuanZhu.object3d.position.set(p.x, p.y, p.z);
        }
        // 立方体模型+贴面基本材质=Mesh贴面物体
        const LiFangTi = new My_Object3DBundle();
        if (options.li_fang_ti) {
            const g = options.li_fang_ti.geometry;
            const m = options.li_fang_ti.material;
            const p = options.li_fang_ti.position;
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
        const CommonLine = new My_Object3DBundle();
        if (options.common_line) {
            const g = options.common_line.geometry;
            const m = options.common_line.material;
            const p = options.common_line.position;
            CommonLine.geometry = new THREE.Geometry(); // 基类
            CommonLine.geometry.vertices.push(...g.vertices); // 顶点
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
        const ColorLine = new My_Object3DBundle();
        if (options.color_line) {
            const g = options.color_line.geometry;
            const m = options.color_line.material;
            const p = options.color_line.position;
            //  TIP a.形状
            ColorLine.geometry = new THREE.Geometry();
            g.my_colors.forEach((color) => {
                ColorLine.geometry.colors.push(new THREE.Color(color));
            });
            g.my_vertices.forEach((point) => {
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
            YuanZhu,
            LiFangTi,
            CommonLine,
            ColorLine,
        };
    }
}
//# sourceMappingURL=BaseThreeClass.js.map