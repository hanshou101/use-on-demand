/**
 * THREE.js，可能会遇到的坑，总结如下：
 *          1.版本问题：
 *                  1.1 PanJiaChen-Admin，采用56的版本。（<script>方式导入）
 *                  1.2 最新的【npm】安装版，采用  0.102.1 的版本号。
 *                  1.3 【WebGL学习网】，暂时还不知道采用的是何种版本。
 *                  1.4 【顶上战争】，采用的是  85 的版本。
 *                          1.4.1 有一个【TrackballControls】，是自定义工具类。
 *                  1.5 【MiniCity】，采用的是  95 的版本。
 *                          1.5.1 有一个【OrbitControls】，是自定义工具类。
 *                  1.6 【Course】，采用都是  75 的版本。
 *                          1.6.1 暂时没有出现  自定义工具类。
 *          1.5.不同版本之间，（同属NPM导入模式下）具体的导入细节，也有差异：
 *                  1.5.1 【56版本】，通过  【import * as THREE from 'three'】导入。是没有问题的。
 *                  1.5.2 【85版本】
 *                              1.5.2.1 通过【import * as THREE from 'three'】导入，会报【ReferenceError: THREE is not defined】错误。
 *                              1.5.2.2 必须要尝试其它导入方式了。
 *
 *                              1.5.2.3 以下方式是有效的：
 *                                          1.5.2.3.1 【const THREE = require('three')】
 *                                          1.5.2.3.2 参考资料：npm 安装的three.js怎么引入 - JoeRay61的回答 - SegmentFault 思否 - https://segmentfault.com/q/1010000009496363/a-1020000009497098
 *                  1.5.3 【95版本】
 *                              1.5.3.1 导入方式，和【85版本】是一致的。
 *                              1.5.3.2 现在已经跑通了。
 *
 *          1.6 不同版本之间，在API使用上的差异。（逐渐整理）
 *                  1.6.1 【85版本】和【95版本】，目前尚未遇到
 *                  1.6.2 【75版本】，目前有如下API差异：
 *                              1.6.2.1 75版本，不可以再使用  new THREE.Line(geometry,material,THREE.LinePieces)
 *                                      1.6.2.1.1 原因是，THREE.LinePieces在75版本，已属于过期的API。会直接Error报错。
 *                                      1.6.2.1.2 应该换用以下方式（任选一种皆可）：
 *                                              1.6.2.1.2.1 new Line(geometry,material,THREE.LineSegments)
 *                                                      1.6.2.1.2.1.1 参考资料：[评论第9层]Three.js教程  >  Threejs基础教程  > 第2章 还记得点、线、面吗(一） - http://www.hewebgl.com/article/getarticle/56
 *                                              1.6.2.1.2.2 new LineSegments(geometry,material)
 *                                                      1.6.2.1.2.2.1 参考资料：javascript  –  three.js r72不再支持THREE.LinePieces,如何将多个断开的行与THREE.LineSegments合并？ - 代码日志 - https://codeday.me/bug/20190124/552339.html
 *                                      1.6.2.1.3 【1.6.2.1.2】所说的两种API，均只可以在  【75版本】 上使用才有效果；在【85】、【95】版本上，都无法绘制出线条。
 *
 *
 *          1.7.在切换版本安装时，要注意的事情：
 *                  1.6.1 有时候，切换了  package.json  中的  npm-three 的版本后，浏览器页面黑色文字报错。
 *                              1.6.1.1 此时，可以考虑重新跑一遍服务。
 *                              1.6.1.2 如果一次不够，那么就跑两次
 *
 *          2.学习方案：
 *                  2.1 先按照【0.102.1】的学习，将来学成后，再来  改造0.56的版本 至可以运行的程度。  这个也可以当作自己的一个毕业作业。
 *          3.关于@type代码提示的问题：
 *                  3.1 最新【0.102.1】版本，已无需安装  【@type/three】。因为已是用 TypeScript写的了。（大概？）
 *                  3.2 56的版本，则找不到可用的  @type/three_56的版本；  因此，采用  【手写自己的.d.ts】 + 【忽略import导入语句报错】 的方案。
 *
 *          4.关于性能问题
 *                  4.1 初看，我以为npm方式引入的，会更加卡，因为会有平时没注意到的卡顿现象；
 *                  4.2 多次切换引入方式，并进行比较之后；可以确认：  两者基本没有性能差异，只是  偶然性现象。
 *                          4.2.1 <script>方式引入的，依然会有一些时刻，卡顿。
 */

// TODO 以下，为【试验性的NPM】引入方式。


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// TODO 以下，为【.html中<script>标签】引入方式。

/**
 * 有以下需要注意的点：
 *            1.用<script>方式导入，需要在  index.html里面，加入  <script src=<%= htmlWebpackPlugin.options.path %>/js/three.min.js></script>，这段语句来引入代码。
 */

export interface IScenePosition {
  x: number;
  y: number;
  z: number;
}

// export interface __3D_Point {
//   x: number;
//   y: number;
//   z: number;
//
//   set(x: number, y: number, z: number): void;
// }

// interface MeshRotate {
//   x: number,
//   y: number,
//   z: number,
// }

// interface MeshScale {
//   set(x: number, y: number, z: number): void
// }

interface IExtrudeSetting {
  steps: number;
  amount: number;
  bevelEnabled: boolean;   // 是否开启斜角
}


declare global {
  // Three.js导入后，生成的全局变量
  namespace THREE {

    // Canvas画布渲染
    class CanvasRenderer {
      public setSize(w: number, h: number): any;

      public render(scene: THREE.Scene, camera: THREE.PerspectiveCamera): any;

      public domElement: HTMLElement;
    }

    type TempCameraZoom = number;

    // 透视相机模式
    class PerspectiveCamera {
      public aspect: number;
      public position: /*__3D_Point*/Vector3;
      public up: Vector3;

      public quaternion: Quaternion;

      public isPerspectiveCamera: boolean;  // 是否透视相机
      public isOrthographicCamera: boolean; // 是否正投影正交相机
      public fov: number; // field of view ； 这个在另一个地方，已经讲解过了。搜索【fov】
      public matrix: IMyMatrix;

      // public right: Vector3;
      // public left: Vector3;
      // public top:Vector3;
      // public bottom:Vector3;
      // TODO 之前以为是Vector的  valueOf()方法，后来发现，好像就是纯数字
      public right: number;
      public left: number;
      public top: number;
      public bottom: number;
      public zoom: TempCameraZoom;


      constructor(
        fov: number,    // field of view 视野，  竖直方向上的张角（角度制，如90代表90°）
        aspect: number,     // 最近平面的宽高比。  w/h
        near: number,       // 近平面距离  TODO 似乎是，能够拉得最近的程度？如0.01
        far: number         // 远平面距离  TODO 似乎是，视野最远的可见程度？如50000
      )

      public updateProjectionMatrix(): any;//
      public lookAt(pos: IScenePosition): any;   // 对准某一个点

      public setViewOffset(fullWidth: number,   // 多视图设置的全宽
                           fullHeight: number,  // 多视图设置的全高
                           x: number,           // 副摄像头的水平偏移
                           y: number,           // 副摄像头的垂直偏移
                           width: number,       // 副摄像头的宽度
                           height: number      // 副摄像头的高度
      ): void;
    }

    // 正投影相机  模式
    class OrthographicCamera {
      constructor(
        left: number,     // 相机盒子，左平面位置
        right: number,    // 相机盒子，右平面位置
        top: number,      // 相机盒子，顶平面位置
        bottom: number,   // 相机盒子，底平面位置
        near: number,     // 相机盒子，近平面位置
        far: number      // 相机盒子，远平面位置
      )
    }

    // 场景
    class Scene {
      public position: /*IScenePosition*/Vector3;

      public add(obj3D: THREE.Object3D | THREE.Particle): any;
    }

    // 粒子用于Canvas画布的材质
    class ParticleCanvasMaterial {
      constructor(options: any)
    }

    // 粒子
    class Particle extends Object3D {
      public position: /*__3D_Point*/Vector3;
      public scale: Vector3;

      constructor(material: THREE.ParticleCanvasMaterial)
    }

    // 以下，是新增加的（2019年教程）

    // （追踪轨迹球，控制）
    // TODO 这其实，是一个自定义的类。
    // class TrackballControls {
    //   constructor(camera: any)
    //
    //   update(): void;
    // }

    class Light extends Object3D {
      constructor(color: number,
                  intensity?: number,  // 强度：点光源强度
                  distance?: number,   // 光照最远照射达到距离。为0，表示没有限制（无限远）
                  decay?: number      // 光照随距离变远，亮度的衰减速率
      )
    }

    // 环境光（很柔和的散光）
    /**
     * 1.环境光是经过多次反射而来的光称为环境光，无法确定其最初的方向。
     * 2.环境光是一种无处不在的光。环境光源放出的光线被认为来自任何方向。
     * 3.当你仅为场景指定环境光时，所有的物体无论法向量如何，都将表现为同样的明暗程度。
     *        3.1 （这是因为，反射光可以从各个方向进入您的眼睛）
     *
     * 4.环境光将照射场景中的所有物体，让物体显示出某种颜色。
     */
    class AmbientLight extends Light {
      // constructor(color: number,
      //             intensity ?: number, // 强度：环境光强度
      // )
    }

    // 方向光（平行而来的光束）
    class DirectionalLight extends Light {
      // position: /*__3D_Point*/Vector3;

      // constructor(color: number,
      //             intensity ?: number,  // 强度：方向光强度
      //             distance?: number,    // 光照最远照射达到距离。为0，表示没有限制（无限远）
      // )
    }

    // 点光源（由一个质点，散发出去；像太阳、蜡烛）
    /**
     * 1.点光源：由这种光源放出的光线来自同一点，且方向辐射向四面八方。
     *        1.1 例如蜡烛放出的光，萤火虫放出的光。
     */
    class PointLight extends Light {
      // constructor(color: number,
      //             intensity?: number,  // 强度：点光源强度
      //             distance?: number,   // 光照最远照射达到距离。为0，表示没有限制（无限远）
      //             decay?: number,      // 光照随距离变远，亮度的衰减速率
      // )
    }

    // 聚光灯的光
    /**
     * 1.聚光灯：这种光源的光线从一个锥体中射出，在被照射的物体上产生聚光的效果。
     *        1.1 锥体：圆锥体。
     *
     * 2.使用这种光源，需要指定光的射出方向以及锥体的顶角α。
     *        2.1 定向的；而且是沿锥体扩散的.
     */
    class SpotLight extends Light {
      constructor(color: number,        // 和别的一样
                  intensity?: number,   // 和别的一样
                  distance?: number,    // 和别的一样
                  //
                  angle?: number,       // 发出的锥体光束的宽度。（弧度表示）
                  penumbra?: number,    // 在同一距离时，锥体光束，最中间到最边缘，光强度的衰减系数（也有可能完全不衰减）
                  decay?: number       // 光强度，随光照距离的衰减程度速率（Yes！）
      )
    }

    // 区域光（？？？）
    class AreaLight extends Light {

    }

    // 纹理加载器
    class TextureLoader {
      public load(path: string,
                  callback: (texture: Texture) => void): Texture;
    }

    // 纹理
    class Texture {
      public repeat: TextureRepeat;    // 用于设置，纹理的重复规律

      public wrapS: number;            // 横向的纹理包裹。Horizontal
      public wrapT: number;            // 纵向的纹理包裹。Vertical

      public minFilter: number;    // 指定纹理如何缩小
      public magFilter: number;    // 指定纹理如何放大

      public format: number;

      public matrix: IMyMatrix;   // 内置矩阵

      constructor(canvas: HTMLCanvasElement)
    }

    const RepeatWrapping: number;   // 一种重复的模式

    const NearestFilter: number;    // 最邻近过滤
    const LinearFilter: number;     // 线性过滤

    const RGBFormat: number;        // 设置格式为  RGB ？？？

    class TextureRepeat {
      public set(a: number, b: number): void;
    }

    // 材质
    class Material {
      constructor(options: {
        shininess?: number,
        color?: number,
        specular?: number,
        map?: Texture,   // 用于纹理的平铺？
        side?: typeof THREE.FrontSide | typeof THREE.BackSide | typeof THREE.DoubleSide, // 材质（涂色）的面数。正面/反面/双面。
      })
    }

    const FrontSide: number;    // 材质的正面
    const BackSide: number;     // 材质的反面
    const DoubleSide: number;   // 材质的双面

    // 一个THREE内置变量  （顶点颜色？）
    // 通常，THREE.PointCloud中的所有粒子都将拥有相同颜色。
    const VertexColors: number;   // 如果该属性设置为THREE.VertexColors，并且几何体的颜色数组也有值，那就会使用颜色数组中的值。
    const NoColors: number; // 另一个相对应的属性

    // 线段为主体的基础材质。（可设置线段的颜色、宽度、断点、连接点）
    class LineBasicMaterial extends Material {
      constructor(option?: {
        color?: number,
        isLineBasicMaterial?: boolean,
        lights?: boolean,
        linewidth?: number,
        linecap?: "butt" | "round" | "square",
        linejoin?: "round" | "bevel" | "miter",
        opacity?: number,
        vertexColors?: typeof VertexColors,
        // fog?: number,
      })
    }

    // 非常简单（几乎是最简单）的一种材质
    class MeshBasicMaterial extends Material {
    }

    // 光亮的材质表面（表面网格-光亮-材质）
    class MeshPhongMaterial extends Material {
      public map: Texture;
    }

    // 兰伯特材质（对于光照，有反光效果；  但是自身是不发光的、暗淡的物体）
    class MeshLambertMaterial extends Material {
    }

    // 多面材质（可以在每一面，放上【各自独立的材质】。若干面，可以是6面，可以是8面）
    class MeshFaceMaterial extends Material {
      constructor(materials: Material[])
    }

    // 形状模型
    class Geometry {
      public translate(a: number, b: number, c: number): void;//
      public vertices: Vector3[];    // 顶点数组
      public colors: Color[];          // 颜色数组

      public clone(): Geometry;//
      public merge(geometry: Geometry): void;//
      public rotateX(num: number): void;//
      public rotateY(num: number): void;//
      public scale(width: number, height: number, depth: number): void;//
    }

    // 平面缓存模型
    class PlaneBufferGeometry extends Geometry {
      constructor(a: number, b: number)
    }

    // 立方体模型（75、76以后的版本，新版本采用【BoxGeometry】）
    class BoxGeometry extends Geometry {
      constructor(width: number, height: number, depth: number)
    }

    // 立方体模型（75以前的版本，旧版本采用【CubeGeometry】）
    class CubeGeometry extends Geometry {
      constructor(width: number, height: number, depth: number)
    }


    // 立方体缓存模型
    class BoxBufferGeometry extends BoxGeometry {
      constructor(width: number, height: number, depth: number)
    }

    // 网格（指三角贴片模型）
    class Mesh extends Object3D {
      public position: /*__3D_Point*/Vector3;
      // rotation: MeshRotate;
      // scale: MeshScale;
      public scale: Vector3;
      public receiveShadow: boolean;   // 是否接受阴影  在之上显示 ？？？
      public castShadow: boolean;      // 转化阴影？？？基于什么转化？

      constructor(geoMetry: Geometry, material: Material)

      public clone(): Mesh;//
    }

    // 圆柱体模型
    // 参考资料：CylinderGeometry - three.js docs - https://threejs.org/docs/#api/en/geometries/CylinderGeometry
    class CylinderGeometry extends Geometry {
      // 均是可选参数
      constructor(radiusTop?: number,        // 顶部圆柱的半径。  默认值 1
                  radiusBottom?: number,     // 底部圆柱的半径。  默认值 1
                  height?: number,           // 圆柱体的高度。    默认值 1

                  radialSegments?: number,   // 圆柱体圆周周围，被分割的面数。  默认值 8
                  heightSegments?: number,   // 圆柱体圆周，被分割的一面，有几行竖直堆叠的面数。 默认值 1

                  openEnded?: boolean,       // 圆柱体的末端，是敞开空心，还是加上盖子。 默认值 false（不加上盖子）

                  thetaStart?: number,       // 从哪里的起始角度开始计算，分割的第一段？  默认值 0 （最右侧，三点钟位置）
                  thetaLength?: number      // 整个圆柱体渲染多少弧度？   默认值 2π（渲染完整的圆柱体。若为π，则只渲染半个180°的圆柱体）
      )
    }

    // 一个THREE内置变量
    const PCFSoftShadowMap: number;   // 过滤阴影贴图的一种方式

    // 渲染器（WebGL引擎模式）
    class WebGLRenderer {
      public domElement: HTMLElement;//
      public shadowMap: {   // 大概和阴影相关吧？
        enabled: boolean;
        type: typeof PCFSoftShadowMap;
      };

      constructor(options?: {
        antialias: boolean,
        logarithmicDepthBuffer?: boolean,    // 是否使用  对数深度缓冲器
        canvas?: HTMLCanvasElement,
      })

      public setClearColor(color: number, alpha?: number): void;   //
      public setPixelRatio(pixelRatio: number): void;  // 屏幕物理参数：像素比
      public setSize(w: number, h: number): void;  //  大体尺寸

      public render(scene: Scene, camera: PerspectiveCamera): void; //
      public clear(): void;
    }


    interface IMyMatrix {
      identity(): this;  // 矩阵重置
      translate(x: number, y: number): this; // 设置中心点
      rotate(rad: number): this;   // 旋转（以弧度）
      scale(x: number, y: number): this;   // 缩放
    }

    // 以下，是为  85 版本，新加
    class Vector3 {   // TODO 三维矩阵
      public x: number;
      public y: number;
      public z: number;

      constructor(x: number, y: number, z: number)

      // public valueOf(): number;  // 计算转化的方法
      // public toString(): string;  // 转化字符串的方法

      public length(): number;  //
      public copy(vector3: Vector3): Vector3;   //
      public set(x: number, y: number, z: number): void;    //
      public crossVectors(vec_a: Vector3, vec_b: Vector3): any; //
      public setLength(length: number): Vector3;//
      public add(vec: Vector3): Vector3; //
      public applyQuaternion(vec: Quaternion): void;  //
      public multiplyScalar(factor: number): void;  //
      public sub(vector: Vector3): Vector3;  //
      public normalize(): void;   //
      public cross(vec: Vector3): Vector3;  //
      public lengthSq(): number;          //
      public subVectors(...vec: Vector3[]): Vector3;    //
      public distanceToSquared(vec: Vector3): number;   //
      public clone(): Vector3;  //
      public addVectors(...vecs: Vector3[]): Vector3;


      public setFromMatrixColumn(objectMatrix: IMyMatrix, num: number): void;
    }//
    class Vector2 {   // TODO 二维矩阵
      public x: number;
      public y: number;

      public set(x: number, y: number): void;//
      public copy(vec: Vector2): Vector2; //
      public sub(vec: Vector2): Vector2;  //
      public lengthSq(): number;         //
      public multiplyScalar(n: number): Vector2;   // \
      public add(vec: Vector2): Vector2;//
      public subVectors(...vec: Vector2[]): Vector2;
    }//
    class Quaternion {      // 四维矩阵
      public setFromAxisAngle(vec: Vector3, angle: number): void;
    }//

    // 以下，为MiniCity，新加（【95版本】，但不知道【85】版本有没有）（同时，还有一些95的声明，不小心放到了这行以上的地方了）
    const REVISION: number;//
    class Object3D {
      public position: Vector3;
      public rotation: Vector3;
      public scale: Vector3;

      public add(obj3D: THREE.Object3D | THREE.Mesh): void;//
      public clone(): Object3D;//
    }

    class Shape {
      public holes: {
        push(path: THREE.Shape): void;
      };      // 此处，为【Mini_City】，新建了一个多边形构型的方法。（好像和holes有关？）

      public moveTo(x: number, y: number): void;//
      public lineTo(x: number, y: number): void;
    }

    class Path {
      public moveTo(x: number, y: number): void;
    }

    // 拉伸几何体模型
    class ExtrudeBufferGeometry extends Geometry {
      constructor(shape: Shape, extrudeSetting: IExtrudeSetting)
    }

    // 自定义二维图形模型
    class ShapeGeometry extends Geometry {
      constructor(shape: THREE.Shape)
    }

    // 球体模型
    class Spherical {   // ???
      public theta: number;
      public phi: number;
      public radius: number;//

      public makeSafe(): void;

      public setFromVector3(vec: Vector3): void;

      public set(x: number, y: number, z: number): void;
    }

    // 事件分发基类？
    class EventDispatcher {
      public dispatchEvent(e: any): void;
    }

    // 新的系列教程（2019年3月23日20:12:17），加入以下类型声明


    class Color {
      constructor(color: number)
    }

    // 一个THREE内置变量
    // const LinePieces: number;   // 疑似和线条分段有关？
    // FIXME 上述常量已过期，换用下面一种方式
    const LineSegments: number; // 新版本，用于【线条分段】的新品种类型

    class Line extends Object3D {
      // constructor(geoMetry: Geometry, material: Material, seperate: typeof LinePieces)
      // FIXME 上述构造在旧版本已过时，新版本无第三个【线条分段】参数
      constructor(geoMetry: Geometry, material: Material, seperate?: typeof LineSegments)
    }

    // // 新版本，用于【线条分段】的新品种类型
    // class LineSegments {
    //   constructor(getMetry: Geometry, material: Material)
    // }

  }

  /**
   * 【Three.JS】自带的帧数统计工具。
   */
  class Stats {
    public REVISION: number; // 版本号
    public domElement: HTMLElement;

    // dom: HTMLElement;  // 疑似是兼容API？？？

    public showPanel(mode: number): void; // 0：fps模式  1：ms渲染毫秒模式  2：mb占用内存模式  3+：三以及三以上，自定义模式
    // addPanel(mode:number):void // 疑似是兼容API？？？
    // setMode(mode: number): void // 疑似是兼容API？？
    public begin(): void; //
    public end(): void; //
    public update(): void;  //

  }
}

