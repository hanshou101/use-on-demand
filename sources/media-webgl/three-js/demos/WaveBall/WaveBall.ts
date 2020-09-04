// @ts-ignore
import * as THREE from 'three';    // 56版本
// const THREE = require('three');   // 85版本、95版本


const SEPARATION = 100;
const AMOUNTX    = 50;
const AMOUNTY    = 50;

let container: HTMLDivElement;
let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.CanvasRenderer;

let particles: THREE.Particle[] = [];
let particle: THREE.Particle;
let count                       = 0;

let mouseX = 0;
let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// animate();

export function WaveBall_initAll (box: HTMLDivElement): void {
  container = document.createElement('div');
  box.appendChild(container);

  camera            = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;

  scene = new THREE.Scene();

  particles = [];

  const PI2      = Math.PI * 2;
  // const material = new THREE.ParticleCanvasMaterial({
  const material = new THREE.ParticleCanvasMaterial({

    color: 0x0078DE,
    program (context: any) {
      context.beginPath();
      context.arc(0, 0, 1, 0, PI2, true);
      context.fill();
    },

  });

  let i = 0;

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      particle            = particles[i++] = new THREE.Particle(material);
      particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
      particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
      scene.add(particle);
    }
  }

  renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  //

  window.addEventListener('resize', onWindowResize, false);

  animate();
}

function onWindowResize (): void {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}


//

function onDocumentMouseMove (__event: Event): void {
  const event = __event as MouseEvent;
  mouseX      = event.clientX - windowHalfX;
  mouseY      = event.clientY - windowHalfY;
}

function onDocumentTouchStart (__event: Event): void {
  const event = __event as TouchEvent;
  if (event.touches.length === 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function onDocumentTouchMove (__event: Event): void {
  const event = __event as TouchEvent;
  if (event.touches.length === 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

//

function animate (): void {
  requestAnimationFrame(animate);

  render();
}

function render (): void {
  // 鼠标移动时，镜头旋转的效果
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);


  // 波浪球们，起伏的效果
  let i = 0;
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      particle            = particles[i++];
      particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
      particle.scale.x    = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;
    }
  }

  renderer.render(scene, camera);

  count += 0.1;
}

//
//
//
