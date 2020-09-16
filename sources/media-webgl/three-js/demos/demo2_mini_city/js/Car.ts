// 'use strict';

const THREE = require('three');   // 85版本、95版本

import {xX_MyThree_Util} from './utils';

export default class xX_Car {
  private color: number;
  public mesh: THREE.Object3D;
  private wheels: any[];
  private startAngle: number;

  constructor (color?: number) {
    const colors = [0x2cbab2, 0x47a700, 0xd60000, 0x087f87, 0x37ad0e, 0x4d4d4d, 0xce7e00, 0xe0a213, 0x87bcde];
    const index = Math.floor(Math.random() * colors.length);
    this.color = color || colors[index];
    this.mesh = new THREE.Object3D();
    this.wheels = [];
    this.startAngle = 0;


    this.addBody();         // 车身
    this.addWindows();      // 车窗
    this.addLights();       // 灯光
    this.addWheels();       // 车轮

  }

  public createWheel () {
    const wheel = new THREE.Object3D();

    const wheelOuterGeometry = new THREE.CylinderGeometry(3, 3, 3, 32);
    wheelOuterGeometry.rotateX(0.5 * Math.PI);
    const wheelOuter = xX_MyThree_Util.makeMesh('lambert', wheelOuterGeometry, 0x000000);
    wheel.add(wheelOuter);

    const wheelInner = xX_MyThree_Util.makeMesh('lambert', wheelOuterGeometry, 0xdddddd);
    wheelInner.castShadow = false;
    wheelInner.scale.set(0.8, 0.8, 1.1);
    wheel.add(wheelInner);

    const wheelCenterGeometry = new THREE.CylinderGeometry(1, 1, 3.6, 4);
    wheelCenterGeometry.rotateX(0.5 * Math.PI);
    const wheelCenter = xX_MyThree_Util.makeMesh('lambert', wheelCenterGeometry, 0xa7a7a7);
    wheelCenter.castShadow = false;
    wheel.add(wheelCenter);

    return wheel;
  }

  public addWheels () {
    const wheelFrontLeft = this.createWheel();
    wheelFrontLeft.position.set(8, 3, -6);
    this.wheels.push(wheelFrontLeft);
    this.mesh.add(wheelFrontLeft);

    const wheelFrontRight = this.createWheel();
    wheelFrontRight.position.set(8, 3, 6);
    this.wheels.push(wheelFrontRight);
    this.mesh.add(wheelFrontRight);

    const wheelBackLeft = this.createWheel();
    wheelBackLeft.position.set(-8, 3, 6);
    this.wheels.push(wheelBackLeft);
    this.mesh.add(wheelBackLeft);

    const wheelBackRight = this.createWheel();
    wheelBackRight.position.set(-8, 3, -6);
    this.wheels.push(wheelBackRight);
    this.mesh.add(wheelBackRight);
  }

  public addLights () {
    let carLightsGeometry = new THREE.Geometry();
    const carLigetGeometry = new THREE.BoxGeometry(2, 2, 2);

    const carLightsPosition = [
      [12.5, 7.1, 6.1],
      [12.5, 7.1, -6.1],
      [-14, 7.1, 6.1],
      [-14, 7.1, -6.1],
    ];
    carLightsPosition.forEach(function (elem) {
      const x = elem[0],
        y = elem[1],
        z = elem[2];
      const geometry = carLigetGeometry.clone();
      geometry.translate(x, y, z);
      carLightsGeometry.merge(geometry);
    });

    const carLightFrontGeometry = carLigetGeometry.clone();
    carLightFrontGeometry.scale(1, 1.3, 7.1);
    carLightFrontGeometry.translate(12.1, 3.3, 0);
    carLightsGeometry.merge(carLightFrontGeometry);

    const carLightBackGeometry = carLightFrontGeometry.clone();
    carLightBackGeometry.translate(-26, 0, 0);
    carLightsGeometry.merge(carLightBackGeometry);

    carLightsGeometry = new THREE.BufferGeometry().fromGeometry(carLightsGeometry);
    const carLights = xX_MyThree_Util.makeMesh('phong', carLightsGeometry, 0xffffff);
    this.mesh.add(carLights);

  }


  public addWindows () {
    const carWindows = new THREE.Object3D();

    const carWindowLeft = new THREE.Object3D();
    const carWindowLeftFrontCoords = [
      [-2, 8],
      [4, 8],
      [2.5, 12],
      [-2, 12],
    ];
    const carWindowLeftFront = this.makeWindow(carWindowLeftFrontCoords);
    carWindowLeft.add(carWindowLeftFront);

    const carWindowLeftBackCoords = [
      [-9, 8],
      [-3, 8],
      [-3, 12],
      [-7.5, 12],
    ];
    const carWindowLeftBack = this.makeWindow(carWindowLeftBackCoords);
    carWindowLeft.add(carWindowLeftBack);
    carWindowLeft.position.z = 7.1;
    carWindows.add(carWindowLeft);

    const carWindowRight = carWindowLeft.clone();
    carWindowRight.position.z = -7.1;
    carWindows.add(carWindowRight);

    const carWindowFrontGeometry = new THREE.CubeGeometry(0.1, 5, 12);
    carWindowFrontGeometry.rotateZ(0.12 * Math.PI);
    carWindowFrontGeometry.translate(4.2, 10, 0);
    const carWindowFront = xX_MyThree_Util.makeMesh('phong', carWindowFrontGeometry, 0x000000);
    carWindows.add(carWindowFront);

    const carWindowBack = carWindowFront.clone();
    carWindowBack.rotation.z = -0.24 * Math.PI;
    carWindowBack.position.x = -19;
    carWindowBack.position.y = 6;
    // carWindowFrontGeometry.translate(4.2,10,7)
    carWindows.add(carWindowBack);

    this.mesh.add(carWindows);
  }

  public addBody () {
    const carBodyCoords = [
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
    const carBodyShape = xX_MyThree_Util.makeShape(carBodyCoords);
    const carBodyGeometry = xX_MyThree_Util.makeExtrudeGeometry(carBodyShape, 14);
    carBodyGeometry.translate(0, -7, 0);
    carBodyGeometry.rotateX(0.5 * Math.PI);
    const carBody = xX_MyThree_Util.makeMesh('phong', carBodyGeometry, this.color);
    this.mesh.add(carBody);
  }


  public makeWindow (coords: number[][]) {
    const windowColor = 0x000000;
    const shape = xX_MyThree_Util.makeShape(coords);
    const geometry = xX_MyThree_Util.makeExtrudeGeometry(shape, 0.1);
    geometry.rotateX(0.5 * Math.PI);
    const mesh = xX_MyThree_Util.makeMesh('phong', geometry, windowColor);
    mesh.castShadow = false;
    return mesh;
  }


//
//
//

  public setPosition (x: number, y: number, z: number) {
    this.mesh.position.set(x, y, z);
  }

  public forward (speed?: number) {
    speed = speed || 1;
    this._moving(speed, true);
  }

  public backward (speed?: number) {
    speed = speed || 1;
    this._moving(speed, false);
  }

  public turnLeft (angle: number, speed: number) {
    this._turn(angle, true, speed);
  }

  public turnRight (angle: number, speed: number) {
    this._turn(angle, false, speed);
  }

  public _turn (angle: number, direction: boolean, speed: number) {
    const __direction = direction ? 1 : -1;
    if (speed) {
      if (this.startAngle < angle) {
        this.mesh.rotation.y += speed;
        this.startAngle += speed;
        if (angle - this.startAngle < speed) {
          const originAngle = this.mesh.rotation.y - this.startAngle;
          this.mesh.rotation.y = originAngle + angle;
          this.startAngle = 0;
          return;
        }
      }
    } else {
      this.mesh.rotation.y += angle * __direction;
    }
  }

  public _moving (speed: number, direction: boolean) {
    const rotation = this.mesh.rotation.y;
    const __direction = direction ? 1 : -1;
    const xLength = speed * Math.cos(rotation) * __direction,
      zLength = speed * Math.sin(rotation) * __direction;
    this.mesh.position.x += xLength;
    this.mesh.position.z -= zLength;
    this._rotateWheels(speed);
  }

  public _rotateWheels (speed: number) {
    this.wheels.forEach(function (elem) {
      elem.rotation.z -= 0.1 * speed;
    });
  }

}

//
//
//
//
//
//
//
//
//
