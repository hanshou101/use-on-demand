const THREE = require('three');   // 85版本、95版本

export  class chapter2_three75 {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;


  public baseInit () {    // 初始化三件套
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

  }

  public init_2 () {    // 将三件套的控制器，作为元素添加到网页文档
    document.body.appendChild(this.renderer.domElement);
  }

  public init_3 () {    // 创建 模型+材质=3D网格对象 ———— 添加入场景
    const geometry = new THREE.CubeGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  public init_4 () {    // 默认镜头焦距为0 ———— 0看不见，1看得见 ———— 拉远摄像头
    this.camera.position.z = 5;   // 右手三维坐标系。向你自己的方向。
  }

  public init_5 () {    // 激活逐帧渲染
    this.__render();
  }

  //
  //
  //

  private __render () {
    requestAnimationFrame(this.__render.bind(this));
    this.change_1();
    this.renderer.render(this.scene, this.camera);
  }

  private change_1 () {    // 所有的  动态改变，都放在这里
    this.cube.rotation.x += 0.1 * 0.1;
    this.cube.rotation.y += 0.1 * 0.1;
  }

}
