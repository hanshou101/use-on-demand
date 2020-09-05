import * as THREE from 'three';
export declare class WebGL_WaveBall_Demo_three56 {
    SEPARATION: number;
    AMOUNTX: number;
    AMOUNTY: number;
    container: HTMLDivElement;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.CanvasRenderer;
    particles: THREE.Particle[];
    particle: THREE.Particle;
    count: number;
    mouseX: number;
    mouseY: number;
    windowHalfX: number;
    windowHalfY: number;
    initAll(box: HTMLDivElement): void;
    onWindowResize: () => void;
    onDocumentMouseMove: (__event: Event) => void;
    onDocumentTouchStart: (__event: Event) => void;
    onDocumentTouchMove: (__event: Event) => void;
    animate: () => void;
    render(): void;
}
//# sourceMappingURL=WaveBall.d.ts.map