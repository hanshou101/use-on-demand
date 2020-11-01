export class xX_Robot_Demo1 {
	public static test() {
		/**
		 * Move the mouse across the screen as a sine wave.
		 * 				1.以【Sin函数波浪】，将鼠标移动过屏幕。
		 */
		const robot = require('robotjs');

		/**
		 * Speed up the mouse.
		 * 				1.加快鼠标的延迟。
		 */
		robot.setMouseDelay(2);

		/**
		 * 屏幕尺寸
		 */
		const screenSize = robot.getScreenSize();
		const height     = (screenSize.height / 2) - 10;
		const width      = screenSize.width;

		/**
		 * 移动鼠标
		 */
		const twoPI = Math.PI * 2.0;
		for (let x = 0; x < width; x++) {
			const y = height * Math.sin((twoPI * x) / width) + height;
			robot.moveMouse(x, y);
		}
	}

	public static keyboard() {
		/**
		 * Type "Hello World" then press enter.
		 * 				1.输入"Hello World"，并按下Enter。
		 */
		const robot = require('robotjs');
		robot.typeString('H-e-l-l-o    W-o-r-l-d');
		setTimeout(() => {
			robot.keyTap('enter');
		}, 1000);
	}

	/**
	 * 这个方法，会报错【Requested coordinates are outside the main screen's dimensions】。
	 * 				1.原因：【RobotJs】库，暂时不支持【多显示屏】。
	 */
	public static screen() {
		/**
		 * Get pixel color under the mouse.
		 * 				1.从鼠标，获取到像素颜色。
		 */
		const robot = require('robotjs');

		/**
		 * Get mouse position.
		 * 				1.得到鼠标的位置。
		 */
		const mouse = robot.getMousePos();

		/**
		 * Get pixel color in hex format.
		 * 				1.从 Hex 格式，获得像素颜色。
		 */
		const hex = robot.getPixelColor(mouse.x, mouse.y);
		console.log('#' + hex + ' at x:' + mouse.x + ' y:' + mouse.y);
	}

}

xX_Robot_Demo1.test();
xX_Robot_Demo1.keyboard();
// xX_Robot_Demo1.screen();
