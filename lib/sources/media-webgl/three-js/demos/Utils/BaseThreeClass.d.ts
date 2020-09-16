declare const THREE: any;
export declare abstract class xX_BaseThreeClass {
    _container: HTMLElement;
    abstract $scene: THREE.Scene;
    abstract $camera: THREE.PerspectiveCamera;
    abstract $renderer: THREE.WebGLRenderer;
    abstract $lights: THREE.Light[];
    abstract $objects: THREE.Object3D[];
    abstract $helper: xX_BaseThreeClass_Helper;
    $statsUtil: Stats;
    get _width(): number;
    get _height(): number;
    constructor(_container: HTMLElement);
    abstract $1_initScene(): THREE.Scene;
    abstract $2_initCamera(): THREE.PerspectiveCamera;
    abstract $3_initRenderer_needAppend(): THREE.WebGLRenderer;
    abstract $4_initLight_needAdd(): THREE.Light[];
    abstract $5_initObject_needAdd(): THREE.Object3D[];
    abstract $111_onceChange(): void;
    abstract $999_loopChange_Render(): void;
    abstract $1000_threeStart(): void;
}
export declare class xX_MyPoint3D {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
}
interface MyRendererOptions {
    antialias?: boolean;
    bg_color?: number;
    bg_alpha?: number;
}
interface MyCameraOptions {
    fov?: number;
    near?: number;
    far?: number;
    position?: xX_MyPoint3D;
    up?: xX_MyPoint3D;
    lookAt?: xX_MyPoint3D;
}
interface MyLightOptions {
    color?: number;
    intensity?: number;
    distance?: number;
    decay?: number;
    position?: xX_MyPoint3D;
}
interface MyObject3DOptions {
    yuan_zhu?: xX_My_YuanZhu_Option;
    li_fang_ti?: xX_My_LiFangTi_Option;
    common_line?: xX_My_CommonLine_Option;
    color_line?: xX_My_ColorLine_Option;
}
declare class My_Object3DBundle<T extends THREE.Object3D> {
    geometry: THREE.Geometry;
    material: THREE.Material;
    object3d: T;
}
export declare class xX_My_YuanZhu_Option {
    geometry: {
        radiusTop: number;
        radiusBottom: number;
        height: number;
    };
    material: {
        color: number;
    };
    position: xX_MyPoint3D;
    constructor(geometry: {
        radiusTop: number;
        radiusBottom: number;
        height: number;
    }, material: {
        color: number;
    }, position: xX_MyPoint3D);
}
export declare class xX_My_LiFangTi_Option {
    geometry: {
        width: number;
        height: number;
        depth: number;
    };
    material: {
        color: number;
    };
    position: xX_MyPoint3D;
    constructor(geometry: {
        width: number;
        height: number;
        depth: number;
    }, material: {
        color: number;
    }, position: xX_MyPoint3D);
}
export declare class xX_My_CommonLine_Option {
    geometry: {
        vertices: THREE.Vector3[];
    };
    material: {
        color: number;
        opacity: number;
    };
    position: xX_MyPoint3D;
    constructor(geometry: {
        vertices: THREE.Vector3[];
    }, material: {
        color: number;
        opacity: number;
    }, position: xX_MyPoint3D);
}
export declare class xX_My_ColorLine_Option {
    geometry: {
        my_vertices: THREE.Vector3[];
        my_colors: number[];
    };
    material: {
        vertexColors: typeof THREE.VertexColors;
    };
    position: xX_MyPoint3D;
    constructor(geometry: {
        my_vertices: THREE.Vector3[];
        my_colors: number[];
    }, material: {
        vertexColors: typeof THREE.VertexColors;
    }, position: xX_MyPoint3D);
}
export declare abstract class xX_BaseThreeClass_Helper {
    my_Default_Scene(threeClass: xX_BaseThreeClass, options?: any): any;
    my_Default_Camera(threeClass: xX_BaseThreeClass, options: MyCameraOptions): THREE.PerspectiveCamera;
    my_DefaultRenderer_haveNotAppend(threeClass: xX_BaseThreeClass, options: MyRendererOptions): any;
    my_Default_LightsBundle_haveNotAdd(threeClass: xX_BaseThreeClass, options: MyLightOptions): {
        ambientLight: THREE.AmbientLight;
        pointLight: THREE.PointLight;
        directionalLight: any;
    };
    my_Default_Object_haveNotAdd(threeClass: xX_BaseThreeClass, options: MyObject3DOptions): {
        LiFangTi: My_Object3DBundle<THREE.Mesh>;
        YuanZhu: My_Object3DBundle<THREE.Mesh>;
        ColorLine: My_Object3DBundle<THREE.Line>;
        CommonLine: My_Object3DBundle<THREE.Line>;
    };
}
export {};
//# sourceMappingURL=BaseThreeClass.d.ts.map