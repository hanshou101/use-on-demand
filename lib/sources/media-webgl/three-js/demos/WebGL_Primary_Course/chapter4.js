import { BaseThreeClass, BaseThreeClass_Helper, My_YuanZhu_Option, MyPoint3D } from '../Utils/BaseThreeClass';
const THREE = require('three'); // 75版本、85版本、95版本
export class chapter4_three75 extends BaseThreeClass {
    constructor() {
        super(...arguments);
        this.$lights = [];
        this.$objects = [];
        this.$helper = new Chapter4_Helper();
    }
    $1_initScene() {
        return this.$scene = this.$helper.my_Default_Scene(this);
    }
    $2_initCamera() {
        const camera = this.$helper.my_Default_Camera(this, {
            fov: 45,
            near: 1,
            far: 10000,
            position: new MyPoint3D(0, 0, 600),
            up: new MyPoint3D(0, 1, 0),
            lookAt: new MyPoint3D(0, 0, 0),
        });
        return this.$camera = camera;
    }
    $3_initRenderer_needAppend() {
        const renderer = this.$helper.my_DefaultRenderer_haveNotAppend(this, {
            antialias: true, bg_color: 0xffffff, bg_alpha: 1.0,
        });
        this._container.appendChild(renderer.domElement);
        return this.$renderer = renderer;
    }
    $4_initLight_needAdd() {
        const { ambientLight } = this.$helper.my_Default_LightsBundle_haveNotAdd(this, {
            color: 0xFFFFFF,
            position: new MyPoint3D(100, 100, 200),
        });
        const { pointLight } = this.$helper.my_Default_LightsBundle_haveNotAdd(this, {
            color: 0x00FF00,
            position: new MyPoint3D(0, 0, 300),
        });
        this.$scene.add(ambientLight);
        this.$scene.add(pointLight);
        return this.$lights = [ambientLight, pointLight];
    }
    $5_initObject_needAdd() {
        const { YuanZhu } = this.$helper.my_Default_Object_haveNotAdd(this, {
            yuan_zhu: new My_YuanZhu_Option({
                radiusTop: 100, radiusBottom: 150, height: 400,
            }, {
                color: 0x00FF00,
            }, new MyPoint3D(0, 0, 0)),
        });
        this.$scene.add(YuanZhu.object3d);
        return this.$objects = [YuanZhu.object3d];
    }
    $111_onceChange() {
        this.$camera.position.x += 1; // 摄像机，向右移动哦  （同时，物体应该是向左移动）
        if (this.$camera.position.x > 300) {
            this.$camera.position.x = -300;
        }
    }
    $999_loopChange_Render() {
        this.$111_onceChange();
        this.$renderer.render(this.$scene, this.$camera);
        requestAnimationFrame(this.$999_loopChange_Render.bind(this));
    }
    $1000_threeStart() {
        this.$1_initScene();
        this.$2_initCamera();
        this.$3_initRenderer_needAppend();
        this.$4_initLight_needAdd();
        this.$5_initObject_needAdd();
        this.$999_loopChange_Render();
    }
}
class Chapter4_Helper extends BaseThreeClass_Helper {
}
//# sourceMappingURL=chapter4.js.map