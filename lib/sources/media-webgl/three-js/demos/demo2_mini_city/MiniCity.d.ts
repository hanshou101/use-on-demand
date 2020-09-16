import xX_Car from './js/Car';
export declare class xX_MiniCity_three95 {
    width?: number;
    height?: number;
    config: {
        isMobile: boolean;
        background: number;
    };
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cars: xX_Car[];
    /**
     * TODO 以下为启动阶段：
     *            1.【开始】
     *            2.【检验手机平台：适配】
     */
    startCity(): void;
    checkUserAgent(): void;
    /**
     * 以上为启动阶段。
     */
    /**
     * TODO 以下为初始化场景阶段：
     *            1.【构建辅助网格系统（模拟地砖效果）】
     *            2.【】
     */
    buildAuxSystem(): void;
    buildLightSystem(): void;
    buildBuilding(): void;
    private Building_add_Plane;
    private Building_add_Fense;
    private Building_add_Green;
    private Building_add_Trees;
    private Building_add_Hospital;
    private Building_add_Lamps;
    buildRoad(): void;
    buildStaticCars(): void;
    buildMovingCars(): void;
    loop(): void;
    onWindowResize(): void;
}
//# sourceMappingURL=MiniCity.d.ts.map