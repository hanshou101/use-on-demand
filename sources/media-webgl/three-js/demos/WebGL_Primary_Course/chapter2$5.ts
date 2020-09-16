import {xX_BaseThreeClass, xX_BaseThreeClass_Helper} from '../Utils/BaseThreeClass';

const THREE = require('three');   // 85版本、95版本

export  class chapter2$5_three75 extends xX_BaseThreeClass {
  public $renderer!: THREE.WebGLRenderer;
  public $camera!: THREE.PerspectiveCamera;
  public $scene!: THREE.Scene;
  public $lights: THREE.Light[] = [];
  public $objects: THREE.Object3D[] = [];
  public $helper: Chapter2$5_helper = new Chapter2$5_helper();

  public $1_initScene () {
    console.log('第1步，初始化Scene');
    const scene = new THREE.Scene();
    return this.$scene = scene;
  }


  public $2_initCamera () {
    console.log('第2步，初始化Camera');
    const container = document.getElementById('canvas-frame');
    if (container) {
      const width = container.clientWidth;
      const height = container.clientHeight;

      const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);

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
  }

  public $3_initRenderer_needAppend () {
    console.log('第3步，初始化Renderer');
    const container = document.getElementById('canvas-frame');
    if (container) {
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });

      // 尺寸、背景颜色
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      renderer.setClearColor(0xFFFFFF, 1.0);

      container.appendChild(renderer.domElement); // 放置在Html文档

      return this.$renderer = renderer;
    }
  }

  public $4_initLight_needAdd (): THREE.Light[] {
    console.log('第4步，初始化Light');
    const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);

    this.$scene.add(light);


    return this.$lights = [light];
  }

  public $5_initObject_needAdd () {
    console.log('第5步，初始化Object');

    const line = this.$helper.createLine();

    this.$scene.add(line);

    return this.$objects = [
      line,
    ];

  }

  public $111_onceChange (): void {

  }

  public $999_loopChange_Render () {
    console.log('第999步，循环渲染');
    this.$renderer.clear();
    this.$renderer.render(this.$scene, this.$camera);
    requestAnimationFrame(this.$999_loopChange_Render.bind(this));
  }

  public $1000_threeStart () {
    this.$1_initScene();
    this.$2_initCamera();
    this.$3_initRenderer_needAppend();
    this.$4_initLight_needAdd();
    this.$5_initObject_needAdd();
    this.$999_loopChange_Render();
  }

}

class Chapter2$5_helper extends xX_BaseThreeClass_Helper {
  public createLine (): THREE.Line {
    //  形状a
    const geometry = new THREE.Geometry();

    const color1 = new THREE.Color(0x444444);
    const color2 = new THREE.Color(0xFF0000);
    // 线的材质可以由2点的颜色决定
    const p1 = new THREE.Vector3(-100, 0, 100);
    const p2 = new THREE.Vector3(100, 0, -100);
    // 添加顶点
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    // 添加颜色
    geometry.colors.push(color1, color2);

    // 材质
    const material = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors,
    });

    // let line = new THREE.Line(geometry, material, THREE.LinePieces)
    // FIXME 上述方式已过期，换用下面一种方式
    // let line = new THREE.LineSegments(geometry, material);
    // FIXME 上述方式，网上的参考资料有问题，换用下面一种方式
    const line = new THREE.Line(geometry, material, THREE.LineSegments);

    return line;
  }
}
