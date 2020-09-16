import { xX_BaseThreeClass, xX_BaseThreeClass_Helper } from '../Utils/BaseThreeClass';
export declare class chapter3_three75 extends xX_BaseThreeClass {
    $scene: THREE.Scene;
    $camera: THREE.PerspectiveCamera;
    $renderer: THREE.WebGLRenderer;
    $lights: THREE.Light[];
    $objects: THREE.Object3D[];
    $helper: Chapter3_Helper;
    $1_initScene(): THREE.Scene;
    $2_initCamera(): THREE.PerspectiveCamera;
    $3_initRenderer_needAppend(): THREE.WebGLRenderer;
    $4_initLight_needAdd(): THREE.Light[];
    $5_initObject_needAdd(): THREE.Object3D[];
    $999_loopChange_Render(): void;
    $1000_threeStart(): void;
    $111_onceChange(): void;
}
declare class Chapter3_Helper extends xX_BaseThreeClass_Helper {
    createLines(): THREE.Line[];
}
export {};
//# sourceMappingURL=chapter3.d.ts.map