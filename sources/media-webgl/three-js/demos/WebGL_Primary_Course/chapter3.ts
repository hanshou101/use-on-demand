import {BaseThreeClass, BaseThreeClass_Helper} from '../Utils/BaseThreeClass';

const THREE = require('three');   // 75版本、85版本、95版本

export class chapter3_three75 extends BaseThreeClass {
  public $scene!: THREE.Scene;
  public $camera!: THREE.PerspectiveCamera;
  public $renderer!: THREE.WebGLRenderer;
  public $lights: THREE.Light[] = [];
  public $objects: THREE.Object3D[] = [];

  public $helper: Chapter3_Helper = new Chapter3_Helper();

  public $1_initScene (): THREE.Scene {
    return this.$scene = new THREE.Scene();
  }

  public $2_initCamera (): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(45, this._width / this._height, 1, 10000);

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
  }

  public $3_initRenderer_needAppend (): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(this._width, this._height);
    renderer.setClearColor(0xFFFFFF, 1.0);

    this._container.appendChild(renderer.domElement); // append

    return this.$renderer = renderer;
  }

  public $4_initLight_needAdd (): THREE.Light[] {
    const light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);

    this.$scene.add(light); // add

    return [this.$lights = light];
  }

  public $5_initObject_needAdd (): THREE.Object3D[] {
    const lines = this.$helper.createLines();
    lines.forEach((item) => {
      this.$scene.add(item);
    });
    return [...lines];
  }

  public $999_loopChange_Render (): void {
    this.$renderer.clear();
    this.$111_onceChange();
    this.$renderer.render(this.$scene, this.$camera);
    requestAnimationFrame(this.$999_loopChange_Render.bind(this));
  }

  public $1000_threeStart (): void {
    this.$1_initScene();
    this.$2_initCamera();
    this.$3_initRenderer_needAppend();
    this.$5_initObject_needAdd();
    this.$5_initObject_needAdd();
    this.$999_loopChange_Render();
  }

  public $111_onceChange (): void {
    console.log('单个');
  }


}

class Chapter3_Helper extends BaseThreeClass_Helper {
  public createLines (): THREE.Line[] {
    const lines = [];

    // 形状
    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
    geometry.vertices.push(new THREE.Vector3(500, 0, 0));

    for (let i = 0; i <= 20; i++) {

      // 按照z轴，从-500到500铺开。
      const line_1 = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: 0x000000, opacity: 0.2,
      }));
      line_1.position.z = (i * 50) - 500;

      // 按照x轴，从-500到500，重叠。然后，围绕自身y轴，逆时针旋转45度。
      const line_2 = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: 0x000000, opacity: 0.2,
      }));
      line_2.position.x = (i * 50) - 500;
      line_2.rotation.y = 90 * Math.PI / 180;   // 旋转90度。

      lines.push(line_1, line_2);
    }
    return lines;

  }
}
