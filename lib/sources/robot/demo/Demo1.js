var xX_Robot_Demo1 = /** @class */ (function () {
    function xX_Robot_Demo1() {
    }
    xX_Robot_Demo1.test = function () {
        /**
         * Move the mouse across the screen as a sine wave.
         * 				1.以【Sin函数波浪】，将鼠标移动过屏幕。
         */
        var robot = require('robotjs');
        /**
         * Speed up the mouse.
         * 				1.加快鼠标的延迟。
         */
        robot.setMouseDelay(2);
        /**
         * 屏幕尺寸
         */
        var screenSize = robot.getScreenSize();
        var height = (screenSize.height / 2) - 10;
        var width = screenSize.width;
        /**
         * 移动鼠标
         */
        var twoPI = Math.PI * 2.0;
        for (var x = 0; x < width; x++) {
            var y = height * Math.sin((twoPI * x) / width) + height;
            robot.moveMouse(x, y);
        }
    };
    xX_Robot_Demo1.keyboard = function () {
        /**
         * Type "Hello World" then press enter.
         * 				1.输入"Hello World"，并按下Enter。
         */
        var robot = require('robotjs');
        robot.typeString('H-e-l-l-o    W-o-r-l-d');
        setTimeout(function () {
            robot.keyTap('enter');
        }, 1000);
    };
    /**
     * 这个方法，会报错【Requested coordinates are outside the main screen's dimensions】。
     * 				1.原因：【RobotJs】库，暂时不支持【多显示屏】。
     */
    xX_Robot_Demo1.screen = function () {
        /**
         * Get pixel color under the mouse.
         * 				1.从鼠标，获取到像素颜色。
         */
        var robot = require('robotjs');
        /**
         * Get mouse position.
         * 				1.得到鼠标的位置。
         */
        var mouse = robot.getMousePos();
        /**
         * Get pixel color in hex format.
         * 				1.从 Hex 格式，获得像素颜色。
         */
        var hex = robot.getPixelColor(mouse.x, mouse.y);
        console.log('#' + hex + ' at x:' + mouse.x + ' y:' + mouse.y);
    };
    return xX_Robot_Demo1;
}());
export { xX_Robot_Demo1 };
xX_Robot_Demo1.test();
xX_Robot_Demo1.keyboard();
// xX_Robot_Demo1.screen();
//# sourceMappingURL=Demo1.js.map