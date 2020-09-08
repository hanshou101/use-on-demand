var THREE = require('three'); // 85版本、95版本
var chapter2_three75 = /** @class */ (function () {
    function chapter2_three75() {
    }
    chapter2_three75.prototype.baseInit = function () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    chapter2_three75.prototype.init_2 = function () {
        document.body.appendChild(this.renderer.domElement);
    };
    chapter2_three75.prototype.init_3 = function () {
        var geometry = new THREE.CubeGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    };
    chapter2_three75.prototype.init_4 = function () {
        this.camera.position.z = 5; // 右手三维坐标系。向你自己的方向。
    };
    chapter2_three75.prototype.init_5 = function () {
        this.__render();
    };
    //
    //
    //
    chapter2_three75.prototype.__render = function () {
        requestAnimationFrame(this.__render.bind(this));
        this.change_1();
        this.renderer.render(this.scene, this.camera);
    };
    chapter2_three75.prototype.change_1 = function () {
        this.cube.rotation.x += 0.1 * 0.1;
        this.cube.rotation.y += 0.1 * 0.1;
    };
    return chapter2_three75;
}());
export { chapter2_three75 };
//# sourceMappingURL=chapter2.js.map