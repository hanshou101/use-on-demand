import {xX_MyThree_Util} from './js/utils';


const THREE = require('three');   // 85版本、95版本

import xX_textures from './js/textures';
import xX_Car      from './js/Car';
import xX_treesPosition     from './config/treesPosition';
import {xX_MyOrbitControls} from './js/MyOrbitControls';

export class xX_MiniCity_three95 {
  // 屏幕参数
  public width?: number;
  public height?: number;
  public config      = {isMobile: false, background: 0x282828};
  // 基本
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: THREE.WebGLRenderer;
  // 汽车
  public cars: xX_Car[] = [];

  /**
   * TODO 以下为启动阶段：
   *            1.【开始】
   *            2.【检验手机平台：适配】
   */
  public startCity (): void {
    //

    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this.scene  = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
    this.camera.position.set(330, 330, 330);
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas:    document.querySelector('canvas'),
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(this.config.background);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
    // document.body.appendChild(this.renderer.domElement)

    this.checkUserAgent();

    this.buildAuxSystem();
    this.buildLightSystem();
    this.buildBuilding();
    this.buildRoad();
    this.buildStaticCars();
    this.buildMovingCars();

    this.loop();
    this.onWindowResize();
  }

  // TIP 检测手机平台
  public checkUserAgent (): void {    // 检测手机平台
    const n = navigator.userAgent;
    if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i)) {
      this.config.isMobile = true;
      this.camera.position.set(420, 420, 420);
      this.renderer.shadowMap.enabled = false;
    }
  }

  /**
   * 以上为启动阶段。
   */


  /**
   * TODO 以下为初始化场景阶段：
   *            1.【构建辅助网格系统（模拟地砖效果）】
   *            2.【】
   */

  // 构建辅助网格系统（模拟地砖效果）
  public buildAuxSystem (): void {    // 建造辅助网格系统（模拟地砖效果）

    // 绘制网格线
    const gridHelper = new THREE.GridHelper(320, 32);
    this.scene.add(gridHelper);

    // 允许【视角旋转】、【视角放大缩小】。（包括阻尼系数）
    const controls         = new xX_MyOrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.rotateSpeed   = 0.35;
  }


  public buildLightSystem (): void {    // 建造灯光系统

    if (!this.config.isMobile) {
      // TODO 电脑之上

      // 方向光：设置光照
      const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.1);
      directionalLight.position.set(300, 1000, 500);
      directionalLight.target.position.set(0, 0, 0);
      directionalLight.castShadow = true;

      // 方向光：设置光照阴影
      const d                               = 300;
      directionalLight.shadow.camera        = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
      directionalLight.shadow.bias          = 0.0001;
      directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
      this.scene.add(directionalLight);

      // 环境光
      const light = new THREE.AmbientLight(0xFFFFFF, 0.3);
      this.scene.add(light);
    } else {
      // TODO 手机之上

      // 半球光（也就是天光效果，更加自然）
      const hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 1);
      this.scene.add(hemisphereLight);

      // 环境光
      const light = new THREE.AmbientLight(0xFFFFFF, 0.15);
      this.scene.add(light);
    }
  }


  // 构造建筑物
  public buildBuilding (): void {   // 建造建筑物


    this.Building_add_Plane();
    this.Building_add_Fense();
    this.Building_add_Green();
    this.Building_add_Trees();
    this.Building_add_Hospital();
    this.Building_add_Lamps();
  }

  // TIP 大平板（作为地基板块）
  private Building_add_Plane (): void {  // 添加大平板
    // 绘制大平板（作为地基板块）
    const planeGeometry = new THREE.BoxBufferGeometry(320, 6, 320);
    const plane         = xX_MyThree_Util.makeMesh('lambert', planeGeometry, 0x6F5F6A);
    plane.position.y    = -3;
    this.scene.add(plane);
  }

  // TIP 外层的白色大理石围墙。
  private Building_add_Fense (): void {   // 添加栅栏
    const fenseCoords = [
      [-130, -130],
      [-130, 130],
      [130, 130],
      [130, -130],
      [20, -130],
      [20, -120],
      [120, -120],
      [120, 120],
      [-120, 120],
      [-120, -120],
      [-20, -120],
      [-20, -130],
      [-130, -130],
    ];
    const fenseShape  = xX_MyThree_Util.makeShape(fenseCoords);

    const fenseGeometry = xX_MyThree_Util.makeExtrudeGeometry(fenseShape, 3);
    const fense         = xX_MyThree_Util.makeMesh('lambert', fenseGeometry, 0xE5CABF);
    this.scene.add(fense);
  }

  // TIP 一圈绿色的矮小灌木丛
  private Building_add_Green (): void {   // 添加绿化带
    const greenCoords = [
      [-120, -120],
      [-120, 120],
      [120, 120],
      [120, -120],
      [20, -120],
      [20, -100],
      [100, -100],
      [100, 100],
      [-100, 100],
      [-100, -100],
      [-20, -100],
      [-20, -120],
      [-120, -120],
    ];
    const greenShape  = xX_MyThree_Util.makeShape(greenCoords);

    const greenGeometry = xX_MyThree_Util.makeExtrudeGeometry(greenShape, 3);
    const green         = xX_MyThree_Util.makeMesh('lambert', greenGeometry, 0xC0C06A);
    this.scene.add(green);
  }

  // TIP 添加长在【矮小灌木丛】之上的大树
  private Building_add_Trees (): void {   // 添加大树
    xX_treesPosition.forEach((elem) => {
      const x    = elem[0];
      const y    = 1;
      const z    = elem[1];
      const tree = BuildingHelper.createItem_Tree(x, y, z);
      this.scene.add(tree);
    });
  }

  // TIP 主体大医院建筑。
  private Building_add_Hospital (): void {    // 添加医院
    // 生成。放置。
    const hospital      = BuildingHelper.create_Hospital();
    hospital.position.z = -20;
    this.scene.add(hospital);
  }


  private Building_add_Lamps (): void { // 添加路灯

    // 路灯位置。（x坐标、y坐标、旋转弧度）
    const lampsPosition = [
      [-12.5, 12.5, 1.25],
      [-7.5, 12.5, -0.5],
      [-2.5, 12.5, -0.5],
      [2.5, 12.5, -0.5],
      [7.5, 12.5, -0.5],
      [12.5, 12.5, -0.25],
      [12.5, 7.5, 0],
      [12.5, 2.5, 0],
      [12.5, -2.5, 0],
      [12.5, -7.5, 0],
      [12.5, -12.5, 0.25],
      [7.5, -12.5, 0.5],
      [2.5, -12.5, 0.5],
      [-2.5, -12.5, 0.5],
      [-7.5, -12.5, 0.5],
      [-12.5, -12.5, 0.75],
      [-12.5, -7.5, 1],
      [-12.5, -2.5, 1],
      [-12.5, 2.5, 1],
      [-12.5, 7.5, 1],
    ];

    // 生成。放置。
    lampsPosition.forEach((elem) => {
      const x         = elem[0] * 10;
      const z         = elem[1] * 10;
      const r         = elem[2];
      const lamp      = BuildingHelper.createItem_Lamp();
      lamp.rotation.y = r * Math.PI;
      lamp.position.set(x, 0, z);
      this.scene.add(lamp);
    });
  }

  // TIP 建造道路
  public buildRoad (): void {   // 建造道路
    const road      = new THREE.Object3D();
    const roadColor = 0xFFFFFF;

    // TIP 外部，start
    // 最外面的一层白线边缘。
    const roadBorderOuterCoords     = [
      [-160, 160],
      [160, 160],
      [160, -160],
      [-160, -160],
    ];
    const roadBorderOuterHoleCoords = [
      [-159, 159],
      [-159, -159],
      [159, -159],
      [159, 159],
    ];
    const roadBorderOuterShape      = xX_MyThree_Util.makeShape(roadBorderOuterCoords, roadBorderOuterHoleCoords);
    const roadBorderOuterGeometry   = xX_MyThree_Util.makeExtrudeGeometry(roadBorderOuterShape, 0.1);
    const roadBorderOuter           = xX_MyThree_Util.makeMesh('phong', roadBorderOuterGeometry, roadColor);
    road.add(roadBorderOuter);
    // TIP end，外部

    // TIP 内部，start
    // 最内部的道路白块，采用多边形算法，绘制而成。（分隔线，是【辅助网格线】环节绘制的。）
    const roadBorderInnerCoords   = [
      [-131, 131],
      [-131, -131],
      [131, -131],
      [131, 131],
      [19, 131],
      [19, 99],
      [99, 99],
      [99, -99],
      [-99, -99],
      [-99, 99],
      [-19, 99],
      [-19, 131],
    ];
    const roadBorderInnerShape    = xX_MyThree_Util.makeShape(roadBorderInnerCoords);
    const roadBorderInnerGeometry = xX_MyThree_Util.makeExtrudeGeometry(roadBorderInnerShape, 0.1);
    const roadBorderInner         = xX_MyThree_Util.makeMesh('phong', roadBorderInnerGeometry, roadColor);
    roadBorderInner.rotation.y    = Math.PI;
    road.add(roadBorderInner);
    // TIP end，内部

    // TIP 线条，start
    // 道路中间的白色虚线。
    let roadLinesGeometry  = new THREE.Geometry();
    const roadLineGeometry = new THREE.BoxGeometry(20, 0.1, 2);

    // 底部
    const roadLinesBottomGeometry: THREE.Geometry = new THREE.Geometry();
    for (let i = 0; i < 9; i++) {
      const geometry = roadLineGeometry.clone();
      geometry.translate(i * 30, 0, -1);
      roadLinesBottomGeometry.merge(geometry);
    }
    roadLinesBottomGeometry.translate(-120, 0, 145);
    roadLinesGeometry.merge(roadLinesBottomGeometry);

    // 顶部
    const roadLinesTopGeometry = roadLinesBottomGeometry.clone();
    roadLinesTopGeometry.translate(0, 0, -290);
    roadLinesGeometry.merge(roadLinesTopGeometry);

    // 左侧
    const roadLinesLeftGeometry = roadLinesBottomGeometry.clone();
    roadLinesLeftGeometry.rotateY(0.5 * Math.PI);
    roadLinesGeometry.merge(roadLinesLeftGeometry);

    // 右侧
    const roadLinesRightGeometry = roadLinesBottomGeometry.clone();
    roadLinesRightGeometry.rotateY(-0.5 * Math.PI);
    roadLinesGeometry.merge(roadLinesRightGeometry);

    roadLinesGeometry = new THREE.BufferGeometry().fromGeometry(roadLinesGeometry);
    const roadLines   = xX_MyThree_Util.makeMesh('phong', roadLinesGeometry, roadColor);
    road.add(roadLines);
    // TIP end，线条

    this.scene.add(road);
  }

  // 建造静止汽车
  public buildStaticCars (): void {   // 建造静止汽车

    // 汽车位置。（x坐标、y坐标、旋转弧度）
    const carsPosition = [
      [-84, 82, 1.5],
      [-58, 82, 1.5],
      [-32, 82, 1.5],
      [84, 82, 1.5],
    ];

    // 生成。放置。
    carsPosition.forEach((elem) => {
      const car = new xX_Car();
      const x   = elem[0];
      const z   = elem[1];
      const r   = elem[2];
      car.setPosition(x, 0, z);
      car.mesh.rotation.y = r * Math.PI;
      this.scene.add(car.mesh);
    });
  }


  // 建造移动汽车
  public buildMovingCars (): void {   // 建造移动汽车

    // 汽车位置。（x坐标、y坐标、旋转弧度）
    const carsPosition = [
      [-130, 145, 0],
      [10, 145, 0],
      [145, 20, 0.5],
      [30, -145, 1],
      [-145, -60, 1.5],
    ];

    // 生成。放置。
    carsPosition.forEach((elem) => {
      const car = new xX_Car();
      const x   = elem[0];
      const z   = elem[1];
      const r   = elem[2];
      car.setPosition(x, 0, z);
      car.mesh.rotation.y = r * Math.PI;
      this.cars.push(car);
      this.scene.add(car.mesh);
    });
  }


  // TIP 循环执行代码
  public loop (): void {    // 循环执行代码
    // stats.update()
    this.cars.forEach((car) => {
      MyCarHelper.carMoving(car);
    });
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.loop.bind(this));
  }

  // TIP 监听浏览器窗口大小变化
  public onWindowResize (): void {    // 监听浏览器窗口大小变化
    window.addEventListener('resize', () => {
      this.width  = window.innerWidth;
      this.height = window.innerHeight;

      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.width, this.height);
    });
  }

}

class MyCarHelper {
  // TIP 令车辆开始移动
  public static carMoving (car: xX_Car): void {    // 令车辆开始移动
    const angle = car.mesh.rotation.y;
    const x     = car.mesh.position.x;
    const z     = car.mesh.position.z;

    if (x < 145 && z === 145) {
      car.forward();
    } else if (angle < 0.5 * Math.PI) {
      car.turnLeft(0.5 * Math.PI, 0.1);
    } else if (x === 145 && z > -145) {
      car.forward();
    } else if (angle < Math.PI) {
      car.turnLeft(0.5 * Math.PI, 0.1);
    } else if (x > -145 && z == -145) {
      car.forward();
    } else if (angle < 1.5 * Math.PI) {
      car.turnLeft(0.5 * Math.PI, 0.1);
    } else if (x === -145 && z < 145) {
      car.mesh.rotation.y = 1.5 * Math.PI;
      car.forward();
    } else if (angle < 2 * Math.PI) {
      car.turnLeft(0.5 * Math.PI, 0.1);
    } else {
      car.setPosition(-145, 0, 145);
      car.mesh.rotation.set(0, 0, 0);
    }
  }
}

class BuildingHelper {
  // TIP 创建单个路灯
  public static createItem_Lamp (): THREE.Object3D {   // 创建路灯
    const lamp = new THREE.Object3D();

    // 路灯杆子
    const pillarGeomertry = new THREE.CubeGeometry(2, 30, 2);
    pillarGeomertry.translate(0, 15, 0);
    const pillar = xX_MyThree_Util.makeMesh('phong', pillarGeomertry, 0xEBD1C2);
    lamp.add(pillar);

    // 连接处（路灯头和路灯杆子的连接）
    const connectGeometry = new THREE.CubeGeometry(10, 1, 1);
    const connect         = xX_MyThree_Util.makeMesh('phong', connectGeometry, 0x2C0E0E);
    connect.position.set(3, 30, 0);
    lamp.add(connect);

    // 路灯头
    const lightGeometry = new THREE.CubeGeometry(6, 2, 4);
    const light         = xX_MyThree_Util.makeMesh('phong', lightGeometry, 0xEBD1C2);
    light.position.set(10, 30, 0);
    lamp.add(light);

    return lamp;
  }

  // TIP 创建单个大树
  public static createItem_Tree (_x: number, _y: number, _z: number): THREE.Object3D {    // 创建大树
    const x = _x || 0;
    const y = _y || 0;
    const z = _z || 0;

    const tree = new THREE.Object3D();

    const treeTrunkGeometry = new THREE.BoxBufferGeometry(2, 16, 2);
    const treeTrunk         = xX_MyThree_Util.makeMesh('lambert', treeTrunkGeometry, 0x8A613A);
    treeTrunk.position.y    = 8;
    tree.add(treeTrunk);

    const treeLeafsGeometry = new THREE.BoxBufferGeometry(8, 8, 8);
    const treeLeafs         = xX_MyThree_Util.makeMesh('lambert', treeLeafsGeometry, 0x9C9E5D);
    treeLeafs.position.y    = 13;
    tree.add(treeLeafs);

    tree.position.set(x, y, z);

    return tree;
  }

  // TIP 创建单个医院
  public static create_Hospital (): THREE.Object3D {   // 创建医院
    const hospital = new THREE.Object3D();

    hospital.add(HospitalHelper.create_Hospital_WhiteBase());
    hospital.add(HospitalHelper.create_Hospital_FrontMain());
    hospital.add(HospitalHelper.create_Hospital_FrontRooftop());
    hospital.add(HospitalHelper.create_Hospital_FrontRooftop_Shelf());
    hospital.add(HospitalHelper.create_Hospital_FrontSecondFloor_GardenPlane());
    hospital.add(HospitalHelper.create_Hospital_FrontSecondFloor_Langan_BlueWall());
    hospital.add(HospitalHelper.create_Hospital_FrontSecondFloor_Langan_WhiteFushou());
    HospitalHelper.create_Hospital_Pillar_UnderFrontSecondFloor().forEach((object3D) => {
      hospital.add(object3D);
    });
    hospital.add(HospitalHelper.create_Hospital_FrontMain_VerticalEdge_White());
    hospital.add(HospitalHelper.create_Hospital_FrontRooftop_EdgeWall());
    hospital.add(HospitalHelper.create_Hospital_BackMain_YellowWrapShell());
    hospital.add(HospitalHelper.create_Hospital_BackMain());
    hospital.add(HospitalHelper.create_Hospital_BackMain_MirrorWall());
    HospitalHelper.create_Hospital_BackMain_Windows().forEach((object3D) => {
      hospital.add(object3D);
    });

    return hospital;
  }

}

class HospitalHelper {
  // 前栋大楼：共用的地基底座形状。
  private static frontMainCoords = [
    [-80, -30],
    [-80, 20],
    [50, 20],
    [50, 0],
    [20, -30],
    [-80, -30],
  ];

  public static create_Hospital_WhiteBase (): THREE.Mesh {
    // 白色地基底座。
    const baseGeometry = new THREE.BoxBufferGeometry(180, 3, 140);
    const base         = xX_MyThree_Util.makeMesh('lambert', baseGeometry, 0xFFFFFF);
    base.position.y    = 1;
    return base;
  }

  public static create_Hospital_FrontMain (): THREE.Mesh {
    const frontMainShape                             = xX_MyThree_Util.makeShape(this.frontMainCoords);
    // 前栋大楼。
    const frontMainGeometry                          = xX_MyThree_Util.makeExtrudeGeometry(frontMainShape, 100);
    const frontMainMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({map: xX_textures.window() as THREE.Texture });
    frontMainMaterial.map.repeat.set(0.1, 0.08);
    const frontMain         = new THREE.Mesh(frontMainGeometry, frontMainMaterial);
    frontMain.castShadow    = true;
    frontMain.receiveShadow = true;
    return frontMain;
  }

  public static create_Hospital_FrontRooftop (): THREE.Mesh {
    const frontTopShape    = xX_MyThree_Util.makeShape(this.frontMainCoords);
    // 前栋大楼的天台石质板块。
    const frontTopGeometry = xX_MyThree_Util.makeExtrudeGeometry(frontTopShape, 5);
    const frontTop         = xX_MyThree_Util.makeMesh('lambert', frontTopGeometry, 0xB1A7AF);
    frontTop.position.y    = 100;
    return frontTop;
  }

  public static create_Hospital_FrontRooftop_Shelf (): THREE.Mesh {
    // 前栋大楼的天台【顶上葡萄架】。
    let frontRoofShelfGeometry                          = new THREE.Geometry();
    const frontRoofShelfCubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(2, 2, 40);
    // for z-axis
    for (let i = 0; i < 12; i++) {
      const geometry = frontRoofShelfCubeGeometry.clone();
      geometry.translate(i * 5, 0, 0);
      frontRoofShelfGeometry.merge(geometry);
    }
    // for x-axis
    for (let i = 0; i < 2; i++) {
      const geometry = frontRoofShelfCubeGeometry.clone();
      geometry.rotateY(0.5 * Math.PI);
      geometry.scale(1.6, 1, 1);
      geometry.translate(27, 0, -15 + i * 30);
      frontRoofShelfGeometry.merge(geometry);
    }
    // for y-axis
    const frontRoofShelfCubeYPosition = [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ];
    for (const p of frontRoofShelfCubeYPosition) {
      const geometry = frontRoofShelfCubeGeometry.clone();
      geometry.scale(1, 1, 0.4);
      geometry.rotateX(0.5 * Math.PI);
      geometry.translate(p[0] * 55, 0, -15 + p[1] * 30);
      frontRoofShelfGeometry.merge(geometry);
    }
    // for (let i = 0; i < frontRoofShelfCubeYPosition.length; i++) {
    //   const p        = frontRoofShelfCubeYPosition[i];
    //   const geometry = frontRoofShelfCubeGeometry.clone();
    //   geometry.scale(1, 1, 0.4);
    //   geometry.rotateX(0.5 * Math.PI);
    //   geometry.translate(p[0] * 55, 0, -15 + p[1] * 30);
    //   frontRoofShelfGeometry.merge(geometry);
    // }
    frontRoofShelfGeometry = new THREE.BufferGeometry().fromGeometry(frontRoofShelfGeometry);
    const frontRoofShelf   = xX_MyThree_Util.makeMesh('phong', frontRoofShelfGeometry, 0xFFFFFF);
    frontRoofShelf.position.set(-70, 115, 5);
    return frontRoofShelf;
  }

  public static create_Hospital_FrontSecondFloor_GardenPlane (): THREE.Mesh {
    // 二层大露台的地板。
    const frontPlatGeometry = new THREE.BoxBufferGeometry(150, 3, 90);
    const fronPlat          = xX_MyThree_Util.makeMesh('lambert', frontPlatGeometry, 0x0792A5);
    fronPlat.position.set(-3, 18, 25);
    return fronPlat;
  }

  public static create_Hospital_FrontSecondFloor_Langan_BlueWall (): THREE.Mesh {
    // 二层大露台的【栏杆-蓝色墙体】。
    const frontPlatVerticalGeometry = new THREE.BoxBufferGeometry(150, 15, 3);
    const frontPlatVertical         = xX_MyThree_Util.makeMesh('phong', frontPlatVerticalGeometry, 0x0792A5);
    frontPlatVertical.receiveShadow = false;
    frontPlatVertical.position.set(-3, 24, 68.5);
    return frontPlatVertical;
  }

  public static create_Hospital_FrontSecondFloor_Langan_WhiteFushou (): THREE.Mesh {
    // 二层大露台的【栏杆-白色扶手】。
    const frontPlatVerticalWhiteGeometry = new THREE.BoxBufferGeometry(150, 3, 3);
    const frontPlatVerticalWhite         = xX_MyThree_Util.makeMesh('phong', frontPlatVerticalWhiteGeometry, 0xFFFFFF);
    frontPlatVerticalWhite.position.set(-3, 33, 68.5);
    return frontPlatVerticalWhite;
  }

  public static create_Hospital_Pillar_UnderFrontSecondFloor (): THREE.Mesh[] {
    // 支撑二层大露台的【柱子：一】
    const frontPlatPillarGeometry = new THREE.CylinderGeometry(2, 2, 15, 32);
    const frontPlatPillar         = xX_MyThree_Util.makeMesh('lambert', frontPlatPillarGeometry, 0xFFFFFF);
    frontPlatPillar.position.set(-60, 10, 55);
    // 支撑二层大露台的【柱子：二】
    const frontPlatPillar2 = frontPlatPillar.clone();
    frontPlatPillar2.position.set(55, 10, 55);

    return [frontPlatPillar, frontPlatPillar2];
  }

  public static create_Hospital_FrontMain_VerticalEdge_White (): THREE.Object3D {
    // 前栋大楼，三条竖直的【转角包边-白色棱线】。
    const frontBorderVerticles        = new THREE.Object3D();
    const frontBorderVerticleGeometry = new THREE.BoxBufferGeometry(4, 106, 4);
    const frontBorderVerticleMesh     = xX_MyThree_Util.makeMesh('phong', frontBorderVerticleGeometry, 0xFFFFFF);
    const frontBorderVerticle1        = frontBorderVerticleMesh.clone();
    frontBorderVerticle1.position.set(-80, 52, 30);
    frontBorderVerticles.add(frontBorderVerticle1);
    const frontBorderVerticle2 = frontBorderVerticleMesh.clone();
    frontBorderVerticle2.position.set(-80, 52, -20);
    frontBorderVerticles.add(frontBorderVerticle2);
    const frontBorderVerticle3 = frontBorderVerticleMesh.clone();
    frontBorderVerticle3.position.set(50, 52, -18);
    frontBorderVerticles.add(frontBorderVerticle3);
    return frontBorderVerticles;
  }

  public static create_Hospital_FrontRooftop_EdgeWall (): THREE.Mesh {
    // 前栋大楼的天台【白色围栏】。
    const frontRoofCoords   = [
      [-82, -32],
      [20, -32],
      [52, 0],
      [52, 22],
      [-82, 22],
      [-82, -32],
    ];
    const frontRoofHolePath = [
      [-78, -28],
      [20, -28],
      [48, 0],
      [48, 18],
      [-78, 18],
      [-78, -28],
    ];
    const frontRoofShape    = xX_MyThree_Util.makeShape(frontRoofCoords, frontRoofHolePath);
    const frontRoofGeometry = xX_MyThree_Util.makeExtrudeGeometry(frontRoofShape, 8);
    const frontRoof         = xX_MyThree_Util.makeMesh('phong', frontRoofGeometry, 0xFFFFFF);
    frontRoof.position.y    = 100;
    return frontRoof;
  }

  public static create_Hospital_BackMain_YellowWrapShell (): THREE.Mesh {
    // 后栋大楼的【黄色外层包裹外壳】（窗户另外嵌入生成）
    const backMainCoords   = [
      [-80, 20],
      [-80, 60],
      [80, 60],
      [80, 20],
      [-80, 20],
    ];
    const backMainHolePath = [
      [-78, 22],
      [78, 22],
      [78, 58],
      [-78, 58],
      [-78, 22],
    ];
    const backMainShape    = xX_MyThree_Util.makeShape(backMainCoords, backMainHolePath);
    const backMainGeometry = xX_MyThree_Util.makeExtrudeGeometry(backMainShape, 90);
    const backMain         = xX_MyThree_Util.makeMesh('lambert', backMainGeometry, 0xF2E21B);
    return backMain;
  }

  public static create_Hospital_BackMain (): THREE.Mesh {
    // 后栋大楼的【白色主要楼体】（窗户另外嵌入生成）
    const backMiddleCoords   = [
      [0, 0],
      [36, 0],
      [36, 70],
      [0, 70],
      [0, 0],
    ];
    const backMiddleHolePath = [
      [2, 2],
      [34, 2],
      [34, 68],
      [2, 68],
      [2, 2],
    ];
    const backMiddleShape    = xX_MyThree_Util.makeShape(backMiddleCoords, backMiddleHolePath);
    const backMiddkeGeometry = xX_MyThree_Util.makeExtrudeGeometry(backMiddleShape, 165);
    const backMiddle         = xX_MyThree_Util.makeMesh('lambert', backMiddkeGeometry, 0xFFFFFF);
    backMiddle.rotation.x    = -0.5 * Math.PI;
    backMiddle.rotation.z    = -0.5 * Math.PI;
    backMiddle.position.y    = 86;
    backMiddle.position.z    = -58;
    backMiddle.position.x    = -78;
    return backMiddle;
  }

  public static create_Hospital_BackMain_MirrorWall (): THREE.Mesh {
    // 后栋大楼，侧边的整面【幕墙墙体】。
    const backMiddleWindowGeometry = new
    THREE.PlaneGeometry(32, 66, 1, 1);
    const backMiddleWindowMaterial = new THREE.MeshPhongMaterial({map: xX_textures.window() as THREE.Texture});
    backMiddleWindowMaterial.map.repeat.set(2, 6);
    const backMiddleWindow = new THREE.Mesh(backMiddleWindowGeometry, backMiddleWindowMaterial);
    backMiddleWindow.position.set(83, 51, -40);
    backMiddleWindow.rotation.y = 0.5 * Math.PI;
    return backMiddleWindow;
  }

  public static create_Hospital_BackMain_Windows (): THREE.Object3D[] {
    const windows: THREE.Object3D[] = [];
    // 后栋大楼，背面的窗户（共 4*7=28面）。
    const windowBackOrigin          = HospitalHelper.inner_create_Hospital_Window();
    windowBackOrigin.scale.set(0.6, 0.6, 1);
    windowBackOrigin.rotation.y = Math.PI;
    windowBackOrigin.position.set(65, 75, -61);
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 4; j++) {
        const windowObj = windowBackOrigin.clone();
        windowObj.position.x -= i * 22;
        windowObj.position.y -= j * 20;
        windows.push(windowObj);
      }
    }
    return windows;
  }

  // TIP 创建大楼窗户
  private static inner_create_Hospital_Window (): THREE.Object3D {   // 创建大楼窗户
    const windowObj     = new THREE.Object3D();
    const glassGeometry = new THREE.PlaneGeometry(20, 20);
    const glass         = xX_MyThree_Util.makeMesh('phong', glassGeometry, 0x6A5E74);
    windowObj.add(glass);

    const windowBorderGeometry = new THREE.BoxBufferGeometry(22, 2, 2);
    const windowBorder         = xX_MyThree_Util.makeMesh('phong', windowBorderGeometry, 0xFFFFFF);

    const windowBorderTop      = windowBorder.clone();
    windowBorderTop.position.y = 10;
    windowObj.add(windowBorderTop);

    const windowBorderBottom      = windowBorder.clone();
    windowBorderBottom.position.y = -10;
    windowObj.add(windowBorderBottom);

    const windowBorderLeft      = windowBorder.clone();
    windowBorderLeft.rotation.z = 0.5 * Math.PI;
    windowBorderLeft.position.x = -10;
    windowObj.add(windowBorderLeft);

    const windowBorderRight      = windowBorderLeft.clone();
    windowBorderRight.position.x = 10;
    windowObj.add(windowBorderRight);

    return windowObj;
  }

}
