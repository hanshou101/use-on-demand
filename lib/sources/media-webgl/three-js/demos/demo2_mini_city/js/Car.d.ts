export default class xX_Car {
    private color;
    mesh: THREE.Object3D;
    private wheels;
    private startAngle;
    constructor(color?: number);
    createWheel(): any;
    addWheels(): void;
    addLights(): void;
    addWindows(): void;
    addBody(): void;
    makeWindow(coords: number[][]): THREE.Mesh;
    setPosition(x: number, y: number, z: number): void;
    forward(speed?: number): void;
    backward(speed?: number): void;
    turnLeft(angle: number, speed: number): void;
    turnRight(angle: number, speed: number): void;
    _turn(angle: number, direction: boolean, speed: number): void;
    _moving(speed: number, direction: boolean): void;
    _rotateWheels(speed: number): void;
}
//# sourceMappingURL=Car.d.ts.map