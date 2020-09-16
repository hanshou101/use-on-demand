// 'use strict';
var THREE = require('three'); // 85版本、95版本
import { xX_MyThree_Util } from './utils';
var xX_Car = /** @class */ (function () {
    function xX_Car(color) {
        var colors = [0x2cbab2, 0x47a700, 0xd60000, 0x087f87, 0x37ad0e, 0x4d4d4d, 0xce7e00, 0xe0a213, 0x87bcde];
        var index = Math.floor(Math.random() * colors.length);
        this.color = color || colors[index];
        this.mesh = new THREE.Object3D();
        this.wheels = [];
        this.startAngle = 0;
        this.addBody(); // 车身
        this.addWindows(); // 车窗
        this.addLights(); // 灯光
        this.addWheels(); // 车轮
    }
    xX_Car.prototype.createWheel = function () {
        var wheel = new THREE.Object3D();
        var wheelOuterGeometry = new THREE.CylinderGeometry(3, 3, 3, 32);
        wheelOuterGeometry.rotateX(0.5 * Math.PI);
        var wheelOuter = xX_MyThree_Util.makeMesh('lambert', wheelOuterGeometry, 0x000000);
        wheel.add(wheelOuter);
        var wheelInner = xX_MyThree_Util.makeMesh('lambert', wheelOuterGeometry, 0xdddddd);
        wheelInner.castShadow = false;
        wheelInner.scale.set(0.8, 0.8, 1.1);
        wheel.add(wheelInner);
        var wheelCenterGeometry = new THREE.CylinderGeometry(1, 1, 3.6, 4);
        wheelCenterGeometry.rotateX(0.5 * Math.PI);
        var wheelCenter = xX_MyThree_Util.makeMesh('lambert', wheelCenterGeometry, 0xa7a7a7);
        wheelCenter.castShadow = false;
        wheel.add(wheelCenter);
        return wheel;
    };
    xX_Car.prototype.addWheels = function () {
        var wheelFrontLeft = this.createWheel();
        wheelFrontLeft.position.set(8, 3, -6);
        this.wheels.push(wheelFrontLeft);
        this.mesh.add(wheelFrontLeft);
        var wheelFrontRight = this.createWheel();
        wheelFrontRight.position.set(8, 3, 6);
        this.wheels.push(wheelFrontRight);
        this.mesh.add(wheelFrontRight);
        var wheelBackLeft = this.createWheel();
        wheelBackLeft.position.set(-8, 3, 6);
        this.wheels.push(wheelBackLeft);
        this.mesh.add(wheelBackLeft);
        var wheelBackRight = this.createWheel();
        wheelBackRight.position.set(-8, 3, -6);
        this.wheels.push(wheelBackRight);
        this.mesh.add(wheelBackRight);
    };
    xX_Car.prototype.addLights = function () {
        var carLightsGeometry = new THREE.Geometry();
        var carLigetGeometry = new THREE.BoxGeometry(2, 2, 2);
        var carLightsPosition = [
            [12.5, 7.1, 6.1],
            [12.5, 7.1, -6.1],
            [-14, 7.1, 6.1],
            [-14, 7.1, -6.1],
        ];
        carLightsPosition.forEach(function (elem) {
            var x = elem[0], y = elem[1], z = elem[2];
            var geometry = carLigetGeometry.clone();
            geometry.translate(x, y, z);
            carLightsGeometry.merge(geometry);
        });
        var carLightFrontGeometry = carLigetGeometry.clone();
        carLightFrontGeometry.scale(1, 1.3, 7.1);
        carLightFrontGeometry.translate(12.1, 3.3, 0);
        carLightsGeometry.merge(carLightFrontGeometry);
        var carLightBackGeometry = carLightFrontGeometry.clone();
        carLightBackGeometry.translate(-26, 0, 0);
        carLightsGeometry.merge(carLightBackGeometry);
        carLightsGeometry = new THREE.BufferGeometry().fromGeometry(carLightsGeometry);
        var carLights = xX_MyThree_Util.makeMesh('phong', carLightsGeometry, 0xffffff);
        this.mesh.add(carLights);
    };
    xX_Car.prototype.addWindows = function () {
        var carWindows = new THREE.Object3D();
        var carWindowLeft = new THREE.Object3D();
        var carWindowLeftFrontCoords = [
            [-2, 8],
            [4, 8],
            [2.5, 12],
            [-2, 12],
        ];
        var carWindowLeftFront = this.makeWindow(carWindowLeftFrontCoords);
        carWindowLeft.add(carWindowLeftFront);
        var carWindowLeftBackCoords = [
            [-9, 8],
            [-3, 8],
            [-3, 12],
            [-7.5, 12],
        ];
        var carWindowLeftBack = this.makeWindow(carWindowLeftBackCoords);
        carWindowLeft.add(carWindowLeftBack);
        carWindowLeft.position.z = 7.1;
        carWindows.add(carWindowLeft);
        var carWindowRight = carWindowLeft.clone();
        carWindowRight.position.z = -7.1;
        carWindows.add(carWindowRight);
        var carWindowFrontGeometry = new THREE.CubeGeometry(0.1, 5, 12);
        carWindowFrontGeometry.rotateZ(0.12 * Math.PI);
        carWindowFrontGeometry.translate(4.2, 10, 0);
        var carWindowFront = xX_MyThree_Util.makeMesh('phong', carWindowFrontGeometry, 0x000000);
        carWindows.add(carWindowFront);
        var carWindowBack = carWindowFront.clone();
        carWindowBack.rotation.z = -0.24 * Math.PI;
        carWindowBack.position.x = -19;
        carWindowBack.position.y = 6;
        // carWindowFrontGeometry.translate(4.2,10,7)
        carWindows.add(carWindowBack);
        this.mesh.add(carWindows);
    };
    xX_Car.prototype.addBody = function () {
        var carBodyCoords = [
            [-13, 2],
            [13, 2],
            [13, 8],
            [5, 8],
            [3, 13],
            [-8, 13],
            [-10, 8],
            [-13, 8],
            [-13, 2],
        ];
        var carBodyShape = xX_MyThree_Util.makeShape(carBodyCoords);
        var carBodyGeometry = xX_MyThree_Util.makeExtrudeGeometry(carBodyShape, 14);
        carBodyGeometry.translate(0, -7, 0);
        carBodyGeometry.rotateX(0.5 * Math.PI);
        var carBody = xX_MyThree_Util.makeMesh('phong', carBodyGeometry, this.color);
        this.mesh.add(carBody);
    };
    xX_Car.prototype.makeWindow = function (coords) {
        var windowColor = 0x000000;
        var shape = xX_MyThree_Util.makeShape(coords);
        var geometry = xX_MyThree_Util.makeExtrudeGeometry(shape, 0.1);
        geometry.rotateX(0.5 * Math.PI);
        var mesh = xX_MyThree_Util.makeMesh('phong', geometry, windowColor);
        mesh.castShadow = false;
        return mesh;
    };
    //
    //
    //
    xX_Car.prototype.setPosition = function (x, y, z) {
        this.mesh.position.set(x, y, z);
    };
    xX_Car.prototype.forward = function (speed) {
        speed = speed || 1;
        this._moving(speed, true);
    };
    xX_Car.prototype.backward = function (speed) {
        speed = speed || 1;
        this._moving(speed, false);
    };
    xX_Car.prototype.turnLeft = function (angle, speed) {
        this._turn(angle, true, speed);
    };
    xX_Car.prototype.turnRight = function (angle, speed) {
        this._turn(angle, false, speed);
    };
    xX_Car.prototype._turn = function (angle, direction, speed) {
        var __direction = direction ? 1 : -1;
        if (speed) {
            if (this.startAngle < angle) {
                this.mesh.rotation.y += speed;
                this.startAngle += speed;
                if (angle - this.startAngle < speed) {
                    var originAngle = this.mesh.rotation.y - this.startAngle;
                    this.mesh.rotation.y = originAngle + angle;
                    this.startAngle = 0;
                    return;
                }
            }
        }
        else {
            this.mesh.rotation.y += angle * __direction;
        }
    };
    xX_Car.prototype._moving = function (speed, direction) {
        var rotation = this.mesh.rotation.y;
        var __direction = direction ? 1 : -1;
        var xLength = speed * Math.cos(rotation) * __direction, zLength = speed * Math.sin(rotation) * __direction;
        this.mesh.position.x += xLength;
        this.mesh.position.z -= zLength;
        this._rotateWheels(speed);
    };
    xX_Car.prototype._rotateWheels = function (speed) {
        this.wheels.forEach(function (elem) {
            elem.rotation.z -= 0.1 * speed;
        });
    };
    return xX_Car;
}());
export default xX_Car;
//
//
//
//
//
//
//
//
//
//# sourceMappingURL=Car.js.map