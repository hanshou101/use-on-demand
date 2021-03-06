// @ts-ignore
import * as THREE from 'three';    // 56版本
// const THREE = require('three');   // 85版本、95版本


export class xX_WebGL_WaveBall_Demo_three56 {


	SEPARATION = 100;
	AMOUNTX    = 50;
	AMOUNTY    = 50;

	container!: HTMLDivElement;
	camera: THREE.PerspectiveCamera;
	scene: THREE.Scene;
	renderer: THREE.CanvasRenderer;

	particles: THREE.Particle[] = [];
	particle: THREE.Particle;
	count                       = 0;

	mouseX = 0;
	mouseY = 0;

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

// animate();

	initAll(box: HTMLDivElement): void {
		this.container = document.createElement('div');
		box.appendChild(this.container);

		this.camera            = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		this.camera.position.z = 1000;

		this.scene = new THREE.Scene();

		this.particles = [];

		const PI2      = Math.PI * 2;
		// const material = new THREE.ParticleCanvasMaterial({
		const material = new THREE.ParticleCanvasMaterial({

			color: 0x0078DE,
			program(context: any) {
				context.beginPath();
				context.arc(0, 0, 1, 0, PI2, true);
				context.fill();
			},

		});

		let i = 0;

		for (let ix = 0; ix < this.AMOUNTX; ix++) {
			for (let iy = 0; iy < this.AMOUNTY; iy++) {
				this.particle            = this.particles[i++] = new THREE.Particle(material);
				this.particle.position.x = ix * this.SEPARATION - ((this.AMOUNTX * this.SEPARATION) / 2);
				this.particle.position.z = iy * this.SEPARATION - ((this.AMOUNTY * this.SEPARATION) / 2);
				this.scene.add(this.particle);
			}
		}

		this.renderer = new THREE.CanvasRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.container.appendChild(this.renderer.domElement);

		document.addEventListener?.('mousemove', this.onDocumentMouseMove, false);
		//

		window.addEventListener('resize', this.onWindowResize, false);

		this.animate();
	}

	onWindowResize = () => {
		this.windowHalfX = window.innerWidth / 2;
		this.windowHalfY = window.innerHeight / 2;

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(window.innerWidth, window.innerHeight);
	};


//

	onDocumentMouseMove = (__event: Event) => {
		const event = __event as MouseEvent;
		this.mouseX = event.clientX - this.windowHalfX;
		this.mouseY = event.clientY - this.windowHalfY;
	};

	onDocumentTouchStart = (__event: Event) => {
		const event = __event as TouchEvent;
		if (event.touches.length === 1) {
			event.preventDefault();

			this.mouseX = event.touches[0].pageX - this.windowHalfX;
			this.mouseY = event.touches[0].pageY - this.windowHalfY;
		}
	};

	onDocumentTouchMove = (__event: Event) => {
		const event = __event as TouchEvent;
		if (event.touches.length === 1) {
			event.preventDefault();

			this.mouseX = event.touches[0].pageX - this.windowHalfX;
			this.mouseY = event.touches[0].pageY - this.windowHalfY;
		}
	};

//

	animate = () => {
		requestAnimationFrame(this.animate);

		this.render();
	};

	render(): void {
		// 鼠标移动时，镜头旋转的效果
		this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
		this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
		this.camera.lookAt(this.scene.position);


		// 波浪球们，起伏的效果
		let i = 0;
		for (let ix = 0; ix < this.AMOUNTX; ix++) {
			for (let iy = 0; iy < this.AMOUNTY; iy++) {
				this.particle            = this.particles[i++];
				this.particle.position.y = (Math.sin((ix + this.count) * 0.3) * 50) + (Math.sin((iy + this.count) * 0.5) * 50);
				this.particle.scale.x    = this.particle.scale.y = (Math.sin((ix + this.count) * 0.3) + 1) * 2 + (Math.sin((iy + this.count) * 0.5) + 1) * 2;
			}
		}

		this.renderer.render(this.scene, this.camera);

		this.count += 0.1;
	}


//
//
//

}
