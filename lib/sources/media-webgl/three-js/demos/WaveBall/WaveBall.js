// @ts-ignore
import * as THREE from 'three'; // 56版本
// const THREE = require('three');   // 85版本、95版本
var WebGL_WaveBall_Demo_three56 = /** @class */ (function () {
    function WebGL_WaveBall_Demo_three56() {
        var _this = this;
        this.SEPARATION = 100;
        this.AMOUNTX = 50;
        this.AMOUNTY = 50;
        this.particles = [];
        this.count = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.onWindowResize = function () {
            _this.windowHalfX = window.innerWidth / 2;
            _this.windowHalfY = window.innerHeight / 2;
            _this.camera.aspect = window.innerWidth / window.innerHeight;
            _this.camera.updateProjectionMatrix();
            _this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        //
        this.onDocumentMouseMove = function (__event) {
            var event = __event;
            _this.mouseX = event.clientX - _this.windowHalfX;
            _this.mouseY = event.clientY - _this.windowHalfY;
        };
        this.onDocumentTouchStart = function (__event) {
            var event = __event;
            if (event.touches.length === 1) {
                event.preventDefault();
                _this.mouseX = event.touches[0].pageX - _this.windowHalfX;
                _this.mouseY = event.touches[0].pageY - _this.windowHalfY;
            }
        };
        this.onDocumentTouchMove = function (__event) {
            var event = __event;
            if (event.touches.length === 1) {
                event.preventDefault();
                _this.mouseX = event.touches[0].pageX - _this.windowHalfX;
                _this.mouseY = event.touches[0].pageY - _this.windowHalfY;
            }
        };
        //
        this.animate = function () {
            requestAnimationFrame(_this.animate);
            _this.render();
        };
        //
        //
        //
    }
    // animate();
    WebGL_WaveBall_Demo_three56.prototype.initAll = function (box) {
        this.container = document.createElement('div');
        box.appendChild(this.container);
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;
        this.scene = new THREE.Scene();
        this.particles = [];
        var PI2 = Math.PI * 2;
        // const material = new THREE.ParticleCanvasMaterial({
        var material = new THREE.ParticleCanvasMaterial({
            color: 0x0078DE,
            program: function (context) {
                context.beginPath();
                context.arc(0, 0, 1, 0, PI2, true);
                context.fill();
            },
        });
        var i = 0;
        for (var ix = 0; ix < this.AMOUNTX; ix++) {
            for (var iy = 0; iy < this.AMOUNTY; iy++) {
                this.particle = this.particles[i++] = new THREE.Particle(material);
                this.particle.position.x = ix * this.SEPARATION - ((this.AMOUNTX * this.SEPARATION) / 2);
                this.particle.position.z = iy * this.SEPARATION - ((this.AMOUNTY * this.SEPARATION) / 2);
                this.scene.add(this.particle);
            }
        }
        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        document.addEventListener('mousemove', this.onDocumentMouseMove, false);
        //
        window.addEventListener('resize', this.onWindowResize, false);
        this.animate();
    };
    WebGL_WaveBall_Demo_three56.prototype.render = function () {
        // 鼠标移动时，镜头旋转的效果
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);
        // 波浪球们，起伏的效果
        var i = 0;
        for (var ix = 0; ix < this.AMOUNTX; ix++) {
            for (var iy = 0; iy < this.AMOUNTY; iy++) {
                this.particle = this.particles[i++];
                this.particle.position.y = (Math.sin((ix + this.count) * 0.3) * 50) + (Math.sin((iy + this.count) * 0.5) * 50);
                this.particle.scale.x = this.particle.scale.y = (Math.sin((ix + this.count) * 0.3) + 1) * 2 + (Math.sin((iy + this.count) * 0.5) + 1) * 2;
            }
        }
        this.renderer.render(this.scene, this.camera);
        this.count += 0.1;
    };
    return WebGL_WaveBall_Demo_three56;
}());
export { WebGL_WaveBall_Demo_three56 };
//# sourceMappingURL=WaveBall.js.map