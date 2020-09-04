import { BaseThreeClass, BaseThreeClass_Helper, My_YuanZhu_Option, MyPoint3D } from '../Utils/BaseThreeClass';

// @ts-ignore
import TWEEN           from '@tweenjs/tween.js';
import { CDecoratorU } from '../../../../decorator/common-decorator';		// FIXME 此处版本较老，最新版本自带 .d.ts 。

export default class chapter5 extends BaseThreeClass {
	public $scene!: THREE.Scene;
	public $camera!: THREE.PerspectiveCamera;
	public $renderer!: THREE.WebGLRenderer;

	public $lights: THREE.Light[]     = [];
	public $objects: THREE.Object3D[] = [];

	public $helper = new Chapter5_Helper();


	@CDecoratorU.log(this)
	public $1_initScene(): THREE.Scene {
		return this.$scene = this.$helper.my_Default_Scene(this);
	}


	@CDecoratorU.log(this)
	public $2_initCamera(): THREE.PerspectiveCamera {
		const camera = this.$helper.my_Default_Camera(this, {
			fov     : 45,
			near    : 1,
			far     : 10000,
			position: new MyPoint3D(0, 0, 600),
			up      : new MyPoint3D(0, 1, 0),
			lookAt  : new MyPoint3D(0, 0, 0),
		});

		return this.$camera = camera;
	}


	@CDecoratorU.log(this)
	public $3_initRenderer_needAppend(): THREE.WebGLRenderer {
		const renderer = this.$helper.my_DefaultRenderer_haveNotAppend(this, {
			antialias: true, bg_color: 0xffffff, bg_alpha: 1,
		});
		this._container.appendChild(renderer.domElement);
		return this.$renderer = renderer;
	}

	@CDecoratorU.log(this)
	public $4_initLight_needAdd(): THREE.Light[] {
		const { ambientLight } = this.$helper.my_Default_LightsBundle_haveNotAdd(this, {
			color: 0xFF0000, position: new MyPoint3D(100, 100, 200),
		});
		const { pointLight }   = this.$helper.my_Default_LightsBundle_haveNotAdd(this, {
			color: 0x00FF00, position: new MyPoint3D(0, 0, 300),
		});

		this.$scene.add(ambientLight);
		this.$scene.add(pointLight);

		return this.$lights = [ambientLight, pointLight];
	}

	@CDecoratorU.log(this)
	public $5_initObject_needAdd(): THREE.Object3D[] {
		const { YuanZhu } = this.$helper.my_Default_Object_haveNotAdd(this, {
			yuan_zhu: new My_YuanZhu_Option(
				{ radiusTop: 100, radiusBottom: 150, height: 400 },
				{
					color: 0xffffff,
				},
				new MyPoint3D(0, 0, 0),
			),
		});

		this.$scene.add(YuanZhu.object3d);
		return this.$objects = [YuanZhu.object3d];
	}

	// @CDecoratorU.log(this)
	public $111_onceChange(): void {
		this.$statsUtil.update(); // 更新帧数


		// this.$objects.forEach(object => {
		//   object.position.x -= 1;   // 图形向左移动
		//   if (object.position.x < -300) {
		//     object.position.x = 300;
		//   }
		// })

		TWEEN.update(); // 更新动画

	}

	// @CDecoratorU.log(this)
	public $999_loopChange_Render(): void {
		this.$111_onceChange();
		this.$renderer.render(this.$scene, this.$camera);
		requestAnimationFrame(this.$999_loopChange_Render.bind(this));
	}

	@CDecoratorU.log(this)
	public $1000_threeStart(): void {
		this.$1_initScene();
		this.$2_initCamera();
		this.$3_initRenderer_needAppend();
		this.$4_initLight_needAdd();
		this.$5_initObject_needAdd();

		// 使用【TWEEN】，来移动物体
		// new TWEEN.Tween(this.$objects[0].position)
		// // .to({x: 300}, 1)   // 这句，似乎没起到作用？
		//   .to({x: -300}, 3000)
		//   .repeat(Number.POSITIVE_INFINITY)
		//   .start();

		// 使用【TWEEN】，来移动摄像头
		new TWEEN.Tween(this.$camera.position)
			.to({ x: 200, y: 500 }, 3000)
			.repeat(Number.POSITIVE_INFINITY)
			.start();

		this.$999_loopChange_Render();
	}

}

class Chapter5_Helper extends BaseThreeClass_Helper {

}
