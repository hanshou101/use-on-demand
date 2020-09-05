/**
 * 参考资料：
 *      初识Three.js - 顶上战争 - 知乎 - https://zhuanlan.zhihu.com/p/27296011
 *
 * 注意以下事项
 *      1.TODO 版本号，为85
 *      2.TrackballControls 工具类，为原型链的自定义方法。
 *
 *      3.实践操作总结：
 *                  3.1 遇到了这些坑：
 *                          3.1.1 按照原教程，代码转化为ts完毕之后。发现地板的图片导入的地方，出现了不同步。（图片加载本身是异步的，而原教程此处未做回调处理，而是直接顺序执行了。）
 *                          3.1.2 TrackballControls这个类，并不是ThreeJS原生所有的。  而是原教程作者，自己实现的一个类。
 *                                      3.1.2.1 先转化为ts文件。转化为ts之后，声明方式，首先要符合ts的语法标准。
 *                                      3.1.2.2 处理普通JS的声明类方式，和TS的兼容。
 *                                      3.1.2.3 处理  prototype之上，额外的绑定  THREE.EventDispatcher的原型的问题。
 *                                      3.1.2.4 处理，【85版本】和【56版本】，在导入  【Npm方式的ThreeJS】 时，导入语法的差异问题。
 *                  3.2 全部的坑全部踩平后，再捉出这两只小虫子：
 *                          3.2.1 【ground.rotation.x = -Math.PI / 2;】，这句加上  负号就好。
 *                          3.2.2 【renderer.setSize(this.screen_width / 2, this.screen_height);】，这句，高度参数不除以2就好。
 */
import { CDecoratorU } from '../../../../decorator/common-decorator';


// @ts-ignore
// import * as THREE from 'three'     // 56版本
const THREE = require('three');   // 85版本、95版本


import { MyTrackballControlsInterface, MyTrackballControls } from '../Utils/module/TrackballControls';

class Label {
	public label: string;
	public imgurl: string;
	public position: [number, number, number];   // 所在位置的x、y、z
	public size: [number, number, number]; // 立方体的宽、高、深
	constructor(label: string, imgurl: string, position: [number, number, number], size: [number, number, number]) {
		this.label    = label;
		this.imgurl   = imgurl;
		this.position = position;
		this.size     = size;
	}
}

export class OnePiece_three95 {
	private get labelData(): Label[] {
		return [  // 一个包含人物物体数据的数组
			new Label('艾斯', '/image/ThreeJS/ace.jpg',
				[0, 40 - this.FOV, 0], [50, 80, 10]),
			new Label('马歇尔·D·蒂奇', '/image/ThreeJS/teach.jpg',
				[-120, 75 - this.FOV, 500], [90, 150, 10]),
			new Label('唐吉诃德·多弗朗明哥', '/image/ThreeJS/doflamingo.jpg',
				[120, 90 - this.FOV, 500], [90, 160, 10]),
			new Label('波雅·汉库克', '/image/ThreeJS/hancock.jpg',
				[-120, 45 - this.FOV, 1000], [50, 90, 10]),
			new Label('月光·莫利亚', '/image/ThreeJS/moria.jpg',
				[120, 90 - this.FOV, 1000], [120, 180, 20]),
			new Label('乔拉可尔·米霍克', '/image/ThreeJS/mihawk.jpg',
				[-120, 50 - this.FOV, 1500], [50, 100, 10]),
			new Label('巴索罗米·熊', '/image/ThreeJS/kuma.jpg',
				[120, 75 - this.FOV, 1500], [140, 150, 10]),
			new Label('沙·克洛克达尔', '/image/ThreeJS/crocodile.jpg',
				[-120, 55 - this.FOV, 2000], [60, 110, 10]),
			new Label('甚平', '/image/ThreeJS/jinbe.jpg',
				[120, 50 - this.FOV, 2000], [70, 100, 10]),
		];
	}


	private FOV: number = 50;   // 视野的竖直角度
	private get screen_width() {
		return window.innerWidth;
	}//
	private get screen_height() {
		return window.innerHeight;
	}//
	private get aspect(): number {      // 最近平面的宽高比
		return this.screen_width / this.screen_height;
	}//
	private near: number = 0.1;   // 近平面距离
	private far: number  = 50000;    // 远平面距离

	private textureLoader = new THREE.TextureLoader();//
	private controls!: MyTrackballControlsInterface;
	private view!: {
		frameContainer: HTMLElement | null;
		renderer: THREE.WebGLRenderer;
		camera: THREE.PerspectiveCamera;
		scene: THREE.Scene;
	};

	@CDecoratorU.log(this)
	public async init() {
		// 初始化场景
		const scene = await this.initScene();

		// 初始化整个流程（相机、渲染器）
		this.view = this.initView(scene);

		// （追踪轨迹球，控制）  其实，就是用鼠标，去实现移动相机（Camera）的效果
		this.controls = new MyTrackballControls(this.view.camera);

		// 进行渲染
		this.animate();
	}

	@CDecoratorU.log(this)
	private async initScene(): Promise<THREE.Scene> {

		return new Promise(async (resolve) => {

			const scene = new THREE.Scene();

			// 添加环境光
			scene.add(new THREE.AmbientLight(0x3f2806));   // 一束环境光

			// 添加方向光
			const light = new THREE.DirectionalLight(0xffffff, 1);

			light.position.set(0, 100, 100);

			scene.add(light);

			// 添加地面（包括地面的纹理）

			// 地面纹理

			/// image/ThreeJS/bright_squares256.png
			const textureSquares = await this.asyncLoad_textureLoader('image/ThreeJS/bright_squares256.png'); // TODO （此处，是一个异步的加载过程）
			textureSquares.repeat.set(10, 10);
			textureSquares.wrapS     = textureSquares.wrapT = THREE.RepeatWrapping;
			textureSquares.magFilter = THREE.NearestFilter;
			textureSquares.format    = THREE.RGBFormat;

			// 地面材质
			const groundMaterial = new THREE.MeshPhongMaterial({
				shininess: 80, color: 0xffffff, specular: 0xffffff, map: textureSquares,
			});

			// 地面形状
			const planeGeoMetry = new THREE.PlaneBufferGeometry(100, 100);

			// 生成地面
			const ground = new THREE.Mesh(planeGeoMetry, groundMaterial);
			ground.position.set(0, -this.FOV, 0);
			ground.rotation.x = -Math.PI / 2;  // 旋转90°？
			ground.scale.set(1000, 1000, 1000);
			ground.receiveShadow = true;

			scene.add(ground);

			// 将人物，批量放置到场景中。
			this.labelData.forEach((item) => {
				this.textureLoader.load(item.imgurl, (texture: THREE.Texture) => {
					// THREE.BoxBufferGeometry为立方体，其构造函数参数为  对应立方体在X轴的宽度，Y轴的高度，Z轴的长度。
					const geometry   = new THREE.BoxBufferGeometry(item.size[0], item.size[1], item.size[2]);
					// 兰伯特材质
					const material   = new THREE.MeshLambertMaterial({ map: texture });
					const pirateMesh = new THREE.Mesh(geometry, material);

					// 设置人物位置
					pirateMesh.position.set(item.position[0], item.position[1], item.position[2]);
					scene.add(pirateMesh);
				});
			});

			resolve(scene);
		});
	}

	@CDecoratorU.log(this)
	private initView(scene: THREE.Scene) {
		// 创建相机
		const camera = new THREE.PerspectiveCamera(this.FOV, this.aspect, this.near, this.far);

		// 设置相机位置
		camera.position.set(0, 0, 300);

		// 将相机添加到场景
		scene.add(camera);

		// 创建渲染器
		const renderer = new THREE.WebGLRenderer({
			antialias: true, logarithmicDepthBuffer: true,
		});

		// 设置渲染器参数
		renderer.setClearColor(0xf0f0f0);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(this.screen_width / 2, this.screen_height);
		renderer.domElement.style.position = 'relative';
		renderer.domElement.id             = 'renderer_logzbuf';

		// 将渲染器添加到Html容器
		const frameContainer = document.getElementById('container_logzbuf');
		if (frameContainer) {
			console.log('添加DOM');
			frameContainer.appendChild(renderer.domElement);
		} else {
			console.log('未添加成功');
		}

		return {
			frameContainer,
			renderer,
			scene,
			camera,
		};
	}

	@CDecoratorU.log(this)
	private animate() {
		// 帧动画
		requestAnimationFrame(this.animate.bind(this));
		// 更新控制器
		this.controls.update();
		// 更新屏幕画面
		this.render();
	}

	@CDecoratorU.log(this)
	private render() {
		this.updateRendererSizes();

		// 简单的用渲染器，重新渲染Scene和Camera
		this.view.renderer.render(this.view.scene, this.view.camera);
	}

	@CDecoratorU.log(this)
	private updateRendererSizes() {
		this.view.renderer.setSize(this.screen_width, this.screen_height);
		this.view.camera.aspect = this.aspect;
		this.view.camera.updateProjectionMatrix();
		this.view.camera.setViewOffset(this.screen_width, this.screen_height, 0, 0, this.screen_width, this.screen_height);
		if (this.view.frameContainer) {
			this.view.frameContainer.style.width = 100 + '%';
		}
	}

	@CDecoratorU.log(this)
	private asyncLoad_textureLoader(path: string): Promise<THREE.Texture> {
		return new Promise((resolve) => {
			this.textureLoader.load(path, (texture: THREE.Texture) => {
				resolve(texture);
			});
		});
	}

}
