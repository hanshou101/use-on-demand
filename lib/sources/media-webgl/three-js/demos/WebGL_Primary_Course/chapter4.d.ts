import { xX_BaseThreeClass, xX_BaseThreeClass_Helper } from '../Utils/BaseThreeClass';
export declare class chapter4_three75 extends xX_BaseThreeClass {
    $scene: THREE.Scene;
    $camera: THREE.PerspectiveCamera;
    $renderer: THREE.WebGLRenderer;
    $lights: THREE.Light[];
    $objects: THREE.Object3D[];
    $helper: Chapter4_Helper;
    $1_initScene(): THREE.Scene;
    $2_initCamera(): THREE.PerspectiveCamera;
    $3_initRenderer_needAppend(): THREE.WebGLRenderer;
    $4_initLight_needAdd(): THREE.Light[];
    $5_initObject_needAdd(): THREE.Object3D[];
    $111_onceChange(): void;
    $999_loopChange_Render(): void;
    $1000_threeStart(): void;
}
declare class Chapter4_Helper extends xX_BaseThreeClass_Helper {
}
export {};
//# sourceMappingURL=chapter4.d.ts.map