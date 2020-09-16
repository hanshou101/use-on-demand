import {xX_BaseThreeClass, xX_BaseThreeClass_Helper, xX_My_YuanZhu_Option, xX_MyPoint3D} from '../Utils/BaseThreeClass';

const THREE = require('three');   // 75版本、85版本、95版本

export class chapter4_three75 extends xX_BaseThreeClass {
  public $scene!: THREE.Scene;
  public $camera!: THREE.PerspectiveCamera;
  public $renderer!: THREE.WebGLRenderer;
  public $lights: THREE.Light[] = [];
  public $objects: THREE.Object3D[] = [];
  public $helper: Chapter4_Helper = new Chapter4_Helper();


  public $1_initScene (): THREE.Scene {
    return this.$scene = this.$helper.my_Default_Scene(this);
  }

  public $2_initCamera (): THREE.PerspectiveCamera {
    const camera = this.$helper.my_Default_Camera(this, {
      fov: 45,
      near: 1,
      far: 10000,
      position: new xX_MyPoint3D(0, 0, 600),
      up: new xX_MyPoint3D(0, 1, 0),
      lookAt: new xX_MyPoint3D(0, 0, 0),
    });

    return this.$camera = camera;
  }

  public $3_initRenderer_needAppend (): THREE.WebGLRenderer {
    const renderer = this.$helper.my_DefaultRenderer_haveNotAppend(this, {
      antialias: true, bg_color: 0xffffff, bg_alpha: 1.0,
    });
    this._container.appendChild(renderer.domElement);

    return this.$renderer = renderer;
  }

  public $4_initLight_needAdd (): THREE.Light[] {
    const {ambientLight} = this.$helper.my_Default_LightsBundle_haveNotAdd(this, {
      color: 0xFFFFFF,  // 环境光：白色
      position: new xX_MyPoint3D(100, 100, 200),
    });
    const {pointLight} = this.$helper.my_Default_LightsBundle_haveNotAdd(this, {
      color: 0x00FF00,  // 点光源：绿色
      position: new xX_MyPoint3D(0, 0, 300),
    });

    this.$scene.add(ambientLight);
    this.$scene.add(pointLight);

    return this.$lights = [ambientLight, pointLight];
  }

  public $5_initObject_needAdd (): THREE.Object3D[] {
    const {YuanZhu} = this.$helper.my_Default_Object_haveNotAdd(this, {
      yuan_zhu: new xX_My_YuanZhu_Option(
        {
          radiusTop: 100, radiusBottom: 150, height: 400,
        }, {
          color: 0x00FF00,
        },
        new xX_MyPoint3D(0, 0, 0),
      ),
    });

    this.$scene.add(YuanZhu.object3d);
    return this.$objects = [YuanZhu.object3d];
  }


  public $111_onceChange (): void {
    this.$camera.position.x += 1;   // 摄像机，向右移动哦  （同时，物体应该是向左移动）
    if (this.$camera.position.x > 300) {
      this.$camera.position.x = -300;
    }
  }

  public $999_loopChange_Render (): void {
    this.$111_onceChange();
    this.$renderer.render(this.$scene, this.$camera);
    requestAnimationFrame(this.$999_loopChange_Render.bind(this));
  }

  public $1000_threeStart (): void {
    this.$1_initScene();
    this.$2_initCamera();
    this.$3_initRenderer_needAppend();
    this.$4_initLight_needAdd();
    this.$5_initObject_needAdd();
    this.$999_loopChange_Render();
  }


}

class Chapter4_Helper extends xX_BaseThreeClass_Helper {

}
