import { BaseThreeClass, BaseThreeClass_Helper } from '../Utils/BaseThreeClass';
export declare class chapter2$5_three75 extends BaseThreeClass {
    $renderer: THREE.WebGLRenderer;
    $camera: THREE.PerspectiveCamera;
    $scene: THREE.Scene;
    $lights: THREE.Light[];
    $objects: THREE.Object3D[];
    $helper: Chapter2$5_helper;
    $1_initScene(): any;
    $2_initCamera(): any;
    $3_initRenderer_needAppend(): any;
    $4_initLight_needAdd(): THREE.Light[];
    $5_initObject_needAdd(): THREE.Line[];
    $111_onceChange(): void;
    $999_loopChange_Render(): void;
    $1000_threeStart(): void;
}
declare class Chapter2$5_helper extends BaseThreeClass_Helper {
    createLine(): THREE.Line;
}
export {};
//# sourceMappingURL=chapter2$5.d.ts.map