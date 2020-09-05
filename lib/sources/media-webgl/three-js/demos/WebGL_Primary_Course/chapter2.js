const THREE = require('three'); // 85版本、95版本
export class chapter2_three75 {
    baseInit() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    init_2() {
        document.body.appendChild(this.renderer.domElement);
    }
    init_3() {
        const geometry = new THREE.CubeGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }
    init_4() {
        this.camera.position.z = 5; // 右手三维坐标系。向你自己的方向。
    }
    init_5() {
        this.__render();
    }
    //
    //
    //
    __render() {
        requestAnimationFrame(this.__render.bind(this));
        this.change_1();
        this.renderer.render(this.scene, this.camera);
    }
    change_1() {
        this.cube.rotation.x += 0.1 * 0.1;
        this.cube.rotation.y += 0.1 * 0.1;
    }
}
//# sourceMappingURL=chapter2.js.map