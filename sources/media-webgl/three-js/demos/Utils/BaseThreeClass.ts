const THREE = require('three');   // 75版本、85版本、95版本

const Stats = require('stats-js');

export abstract class BaseThreeClass {
  // 基础变量
  public abstract $scene: THREE.Scene;
  public abstract $camera: THREE.PerspectiveCamera;
  public abstract $renderer: THREE.WebGLRenderer;
  // 增效变量
  public abstract $lights: THREE.Light[];
  public abstract $objects: THREE.Object3D[];

  // 帮助工具
  public abstract $helper: BaseThreeClass_Helper; //

  // 帧数统计插件
  public $statsUtil: Stats; // 该工具，必须要render时调用update()，才有帧数更新效果

  get _width () {
    return this._container.clientWidth;
  }  //
  get _height () {
    return this._container.clientHeight;
  }  //

  constructor (public _container: HTMLElement) {

    // 添加ThreeJS插件————Stats，用作帧数的统计。
    this.$statsUtil = new Stats();
    this.$statsUtil.domElement.style.position = 'absolute';
    // this.$statsUtil.domElement.style.left = '0px';
    this.$statsUtil.domElement.style.left = '';       // 如果要覆盖默认属性，则需要置为空字符串
    this.$statsUtil.domElement.style.right = '10px';
    this.$statsUtil.domElement.style.top = '10px';
    this._container.appendChild(this.$statsUtil.domElement);
  }

  // 基础初始化
  public abstract $1_initScene (): THREE.Scene;                           //
  public abstract $2_initCamera (): THREE.PerspectiveCamera;                          //
  public abstract $3_initRenderer_needAppend (): THREE.WebGLRenderer;                        //
  // 增效初始化
  public abstract $4_initLight_needAdd (): THREE.Light[];        //
  public abstract $5_initObject_needAdd (): THREE.Object3D[];       //
  // 单次变化单元
  public abstract $111_onceChange (): void;                      //
  // 开始运行，循环渲染
  public abstract $999_loopChange_Render (): void;                                //
  // {
  //   // this.$renderer.clear();    // 如执行该句，则会清除renderer的颜色、深度、模板绘制缓存。
  //   console.log('第999步，循环渲染');
  //   this.$111_onceChange();
  //   this.$renderer.render(this.$scene, this.$camera);
  //   requestAnimationFrame(this.$999_loopRender.bind(this))
  // }                                                       //

  public abstract $1000_threeStart (): void;
}

export class MyPoint3D {
  constructor (public x: number, public  y: number, public  z: number) {
  }
}


// TIP Renderer的通用配置。
interface MyRendererOptions {
  antialias?: boolean;   // 是否抗锯齿
  bg_color?: number;  // 十六进制，如 0xFFFFFF
  bg_alpha?: number;  // 不透明度，如 0.0，1.0
}

// TIP Camera的通用配置。
interface MyCameraOptions {
  fov?: number;    // filed-of-view ，眼睛视野上下角度
  near?: number;
  far?: number;
  position?: MyPoint3D;
  up?: MyPoint3D;
  lookAt?: MyPoint3D;
}

// TIP Light的通用配置
interface MyLightOptions {
  color?: number;       // 光照色彩                                       // TODO 默认值0xffffff
  intensity?: number;   // 强度：点光源强度                                 // TODO 默认值 1
  distance?: number;    // 光照最远照射达到距离。为0，表示没有限制（无限远）  // TODO 默认值 0
  decay?: number;       // 光照随距离变远，亮度的衰减速率                    // TODO 默认值 1
  position?: MyPoint3D;
}

// TIP Object的通用配置
interface MyObject3DOptions {
  yuan_zhu?: My_YuanZhu_Option;
  li_fang_ti?: My_LiFangTi_Option;
  common_line?: My_CommonLine_Option;
  color_line?: My_ColorLine_Option;
}

// TIP Object的返回类型
class My_Object3DBundle<T extends THREE.Object3D> {
  public geometry!: THREE.Geometry;
  public material!: THREE.Material;
  public object3d!: T;
}

// TODO 哈哈，我也可以熟练地命名【命名空间】啦
namespace a {
  class aaa {
  }//
  class bbb {
  }//
}

export class My_YuanZhu_Option {
  public geometry: {
    radiusTop: number;        // 顶部圆柱的半径。  默认值 1
    radiusBottom: number;     // 底部圆柱的半径。  默认值 1
    height: number;           // 圆柱体的高度。    默认值 1
  };
  public material: {
    color: number;
  };
  public position: MyPoint3D;

  constructor (geometry: { radiusTop: number; radiusBottom: number; height: number }, material: { color: number }, position: MyPoint3D) {
    this.geometry = geometry;
    this.material = material;
    this.position = position;
  }
}

export class My_LiFangTi_Option {
  public geometry: {
    width: number;
    height: number;
    depth: number;
  };
  public material: {
    color: number;
  };
  public position: MyPoint3D;

  constructor (geometry: { width: number; height: number; depth: number }, material: { color: number }, position: MyPoint3D) {
    this.geometry = geometry;
    this.material = material;
    this.position = position;
  }
}

export class My_CommonLine_Option {
  public geometry: {
    vertices: THREE.Vector3[],
  };
  public material: {
    color: number;
    opacity: number;
  };
  public position: MyPoint3D;

  constructor (geometry: { vertices: THREE.Vector3[] }, material: { color: number; opacity: number }, position: MyPoint3D) {
    this.geometry = geometry;
    this.material = material;
    this.position = position;
  }
}

export class My_ColorLine_Option {
  public geometry: {
    my_vertices: THREE.Vector3[];
    my_colors: number[];
  };
  public material: {
    vertexColors: typeof THREE.VertexColors;    // 可以是顶点决定颜色。也可以传NONE。（None的话，系统会根据  geometry的颜色，来自行绘制）
  };
  public position: MyPoint3D;

  constructor (geometry: { my_vertices: THREE.Vector3[]; my_colors: number[] }, material: { vertexColors: typeof THREE.VertexColors }, position: MyPoint3D) {
    this.geometry = geometry;
    this.material = material;
    this.position = position;
  }
}

export abstract class BaseThreeClass_Helper {
  // // 创建一个Object3D对象，并进行返回。
  // abstract create<T>(): T;

  // TODO 将来，这里可以写一些通用的，工具类方法。
  public my_Default_Scene (threeClass: BaseThreeClass, options?: any) {
    const scene = new THREE.Scene();
    // scene = scene;
    return scene;
  }

  public my_Default_Camera (threeClass: BaseThreeClass, options: MyCameraOptions): THREE.PerspectiveCamera {
    const fov = options.fov || 45;
    const near = options.near || 0.1;
    const far = options.far || 10000;

    const position = ((options || {} as any).position || {} as any);
    const position_x = position.x || 0;
    const position_y = position.y || 0;
    const position_z = position.z || 1000;

    const up = ((options || {} as any).up || {} as any);
    const up_x = up.x || 0;
    const up_y = up.y || 1;
    const up_z = up.z || 0;

    const lookAt = ((options || {} as any).lookAt || {} as any);
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

  public my_DefaultRenderer_haveNotAppend (threeClass: BaseThreeClass, options: MyRendererOptions) {
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

  public my_Default_LightsBundle_haveNotAdd (threeClass: BaseThreeClass, options: MyLightOptions) {
    const color = options.color || 0xFFFFFF;    // 颜色 默认值
    const intensity = options.intensity || 1;   // 强度 默认值
    const distance = options.distance || 0;     // 光照距离 默认值
    const decay = options.decay || 1;           // 光照随距离衰减 默认值

    // Light中心点的位置信息
    const position = options.position || {} as any;
    const x = position.x || 0;
    const y = position.y || 0;
    const z = position.z || 0;

    const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(color, intensity, distance, decay);
    ambientLight.position.set(x, y, z);

    const pointLight: THREE.PointLight = new THREE.PointLight(color, intensity, distance, decay);
    pointLight.position.set(x, y, z);

    const directionalLight = new THREE.DirectionalLight(color, intensity, distance, decay);
    directionalLight.position.set(x, y, z);

    return {
      ambientLight,
      pointLight,
      directionalLight,
    };
  }

  public my_Default_Object_haveNotAdd (threeClass: BaseThreeClass, options: MyObject3DOptions):
    {
      LiFangTi: My_Object3DBundle<THREE.Mesh>;
      YuanZhu: My_Object3DBundle<THREE.Mesh>;
      ColorLine: My_Object3DBundle<THREE.Line>;
      CommonLine: My_Object3DBundle<THREE.Line>;
    } {
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
    const YuanZhu = new My_Object3DBundle<THREE.Mesh>();
    if (options.yuan_zhu) {
      const g = options.yuan_zhu.geometry;
      const m = options.yuan_zhu.material;
      const p = options.yuan_zhu.position;
      YuanZhu.geometry = new THREE.CylinderGeometry(g.radiusTop, g.radiusBottom, g.height);
      YuanZhu.material = new THREE.MeshLambertMaterial({color: m.color});
      YuanZhu.object3d = new THREE.Mesh(YuanZhu.geometry, YuanZhu.material);
      YuanZhu.object3d.position.set(p.x, p.y, p.z);
    }

    // 立方体模型+贴面基本材质=Mesh贴面物体
    const LiFangTi = new My_Object3DBundle<THREE.Mesh>();
    if (options.li_fang_ti) {
      const g = options.li_fang_ti.geometry;
      const m = options.li_fang_ti.material;
      const p = options.li_fang_ti.position;
      LiFangTi.geometry = new THREE.BoxGeometry(g.width, g.height, g.depth);
      LiFangTi.material = new THREE.MeshBasicMaterial({color: m.color});
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
    const CommonLine = new My_Object3DBundle<THREE.Line>();
    if (options.common_line) {
      const g = options.common_line.geometry;
      const m = options.common_line.material;
      const p = options.common_line.position;
      CommonLine.geometry = new THREE.Geometry();                       // 基类
      CommonLine.geometry.vertices.push(...g.vertices);                 // 顶点
      CommonLine.material = new THREE.LineBasicMaterial({         // 线性基本材质
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

    const ColorLine = new My_Object3DBundle<THREE.Line>();
    if (options.color_line) {
      const g = options.color_line.geometry;
      const m = options.color_line.material;
      const p = options.color_line.position;
      //  TIP a.形状
      ColorLine.geometry = new THREE.Geometry();

      g.my_colors.forEach((color) => {    // 放入一组颜色
        ColorLine.geometry.colors.push(new THREE.Color(color));
      });

      g.my_vertices.forEach((point) => {  // 放入一组点（顶点）
        ColorLine.geometry.vertices.push(new THREE.Vector3(point.x, point.y, point.z));
      });

      // TIP b.材质
      ColorLine.material = new THREE.LineBasicMaterial({  // 线的材质可以由几点的颜色决定
        vertexColors: m.vertexColors/*THREE.VertexColors*/,
      });

      // TIP 物体
      ColorLine.object3d = new THREE.Line(ColorLine.geometry, ColorLine.material,
        THREE.LineSegments);  // TODO 此处，涉及到API的兼容。

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

  // TIP 以下，是由子类实现：一系列的创建Line，创建Mesh，等等的方法。
}
