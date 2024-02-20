import * as THREE from "three";
import * as CANNON from "cannon";
//import myImage from '../img/lol.jpg';
import { Scene } from "./class/scene";
import { ButtonCameraControl } from "./class/buttonCameraControl";
import { Object3D } from "./class/object3D";

const textureLoader = new THREE.TextureLoader();
// Инициализация Cannon.js
const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);

const scene = new Scene(world, new THREE.Scene(), new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));

// Создание физики земли
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({mass: 0});
groundBody.addShape(groundShape);
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);


// Создание текстуры земли
const groundTexture = textureLoader.load('https://i0.wp.com/art-grea.ru/wp-content/uploads/2021/07/135-2.jpg?resize=800,600');
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10, 10); // Повторение текстуры

const groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
const groundGeometry = new THREE.PlaneGeometry(50, 50); // Размер земли
const groundMesh: THREE.Mesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = Math.PI / 2 + Math.PI;

scene.add(new Object3D(groundMesh, groundBody));
scene.addCameraControl(new ButtonCameraControl());
scene.start();
// // Создание сферы
// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// const sphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
// const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// //scene.add(sphereMesh);
//
// const sphereShape = new CANNON.Sphere(1);
// const sphereBody = new CANNON.Body({mass: 5});
// sphereBody.addShape(sphereShape);
// sphereBody.position.set(0, 5, 10);
// world.addBody(sphereBody);


// Three.js камера
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// camera.position.z = -5;
// camera.position.y = -1;

// Three.js рендерер
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// Получаем ссылку на HTML-элемент



// Загружаем текстуру для фона
//
// const backgroundTexture = textureLoader.load(myImage);
// backgroundTexture.encoding = THREE.sRGBEncoding;

// Создаем сферу для отображения текстуры
// const backgroundGeometry = new THREE.SphereGeometry(1000, 32, 32);
// const backgroundMaterial = new THREE.MeshBasicMaterial({map: backgroundTexture, side: THREE.BackSide});
// const backgroundSphere = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
//
//
// scene.add(backgroundSphere);
// Создаем Cannon.js физический мир
//const world = new Cannon.World();
//world.gravity.set(0, -9.8, 0); // Гравитация

// Создаем Cannon.js статическое тело для земли
// const groundShape = new Cannon.Plane();
// const groundBody = new Cannon.Body({ mass: 0, shape: groundShape });
// world.addBody(groundBody);

// Создаем геометрию и материал для куба
// const cubeGeometry = new THREE.BoxGeometry();
// const cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);


// // Создание круглой геометрии
// var radius = 5;
// var segments = 32;
// var geometry = new THREE.CircleGeometry(radius, segments);
//
// // Загрузка текстуры
// const textureLoader2 = new THREE.TextureLoader();
// var texture = textureLoader2.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA7MnevgGl8tO7PLBsk2RNJwcOayCID6qyAA&usqp=CAU');
//
// // Создание материала с текстурой
// var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
//
// // Создание меша (объекта) с использованием геометрии и материала
// var circle = new THREE.Mesh(geometry, material);
// circle.position.set(10,10,1)
// // Добавление меша на сцену
// scene.add(circle);

// var radius = 5;
// var widthSegments = 32;
// var heightSegments = 16;
// var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
//
// // Загрузка текстуры
// var textureLoader2 = new THREE.TextureLoader();
// var texture = textureLoader.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA7MnevgGl8tO7PLBsk2RNJwcOayCID6qyAA&usqp=CAU');
//
// // Создание материала с текстурой
// var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
//
// // Создание меша (объекта) с использованием геометрии и материала
// var sphere = new THREE.Mesh(geometry, material);

// Добавление меша на сцену
// scene.add(sphere);

//sphere.position.set(20, 6, 1);
//alert('fgfgfgfg')
// Добавляем куб на сцену
// scene.add(cube);
// cube.position.set(10, 1, 1)
//sphereBody.allowSleep = false;
// Анимация



// let step = 1 / 360000;
// let rotateBefore = {z: 0, y: 0};
// let rotateCamera = {z: 0, y: 0};

// document.addEventListener('mousemove', (e)=> {
//     if(rotateBefore.z < e.x){
//         rotateCamera.z =  -0.01;
//     } else if (rotateBefore.z > e.x){
//         rotateCamera.z = 0.01;
//     }
//
//     // if (1 < rotateCamera.z) {
//     //     rotateCamera.z = 0;
//     // }else if(rotateCamera.z < 0 ) {
//     //     rotateCamera.z = Math.PI;
//     // }
//
//     if(rotateBefore.y < e.y){
//         rotateCamera.y =  -0.01;
//     }else if (rotateBefore.y > e.y){
//         rotateCamera.y =  0.01;
//     }
//
//     // if (1 < rotateCamera.y) {
//     //     rotateCamera.y = 0;
//     // }else if(rotateCamera.y < 0 ) {
//     //     rotateCamera.y = Math.PI;
//     // }
//     rotateBefore.z = e.x;
//     rotateBefore.y = e.y;
//     camera.rotateX(rotateCamera.y);
//     camera.rotateY(rotateCamera.z);
//     //console.log(e.x, e.y, e);
// })
//
// let rotateVector = new THREE.Vector3(0, 3.5779, 0);
// //camera.rotation.setFromVector3(rotateVector);
//
// const moveForce = 15;
// const moveDirection = new CANNON.Vec3(0, 0, 0);
//
// function handleKeyDown(event: any) {
//     const speed = 10 * Math.PI / 360;
//
//     // let moveVector = new THREE.Vector3(rotateVector.x % 2* Math.PI, rotateVector.y % 2* Math.PI, rotateVector.z % 2* Math.PI);
//     // moveVector.setLength(0.1);
//     let position = new THREE.Vector3();
//     //console.log(moveVector.length());
//     //moveVector.setLength(1)
//     switch (event.key) {
//         case 'ArrowUp':
//             // Перемещение вперед в направлении взгляда камеры
//             //moveVector.z += -speed;
//             //moveVector.addScalar(speed);
//             position = cameraPosition(rotateVector, -speed);
//
//             break;
//         case 'ArrowDown':
//             // Перемещение назад в направлении взгляда камеры
//             //moveVector.z += speed;
//             position = cameraPosition(rotateVector, speed);
//
//             break;
//         case 'ArrowLeft':
//             // Поворот влево
//             rotateVector.y += speed;
//
//             //moveVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.1);
//             break;
//         case 'ArrowRight':
//             rotateVector.y += -speed;
//             // Поворот вправо
//             //moveVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), -0.1);
//             break;
//     }
//
//     switch (event.keyCode) {
//         case 32:
//             position.setY(speed);
//             break;
//         case 16:
//             position.setY(-speed);
//             break;
//         case 87:
//             moveDirection.z = -moveForce;
//             sphereBody.applyForce(moveDirection, sphereBody.position);
//             break;
//         case 83:
//             moveDirection.z = moveForce;
//             sphereBody.applyForce(moveDirection, sphereBody.position);
//             break;
//         case 65:
//             moveDirection.x = -moveForce;
//             sphereBody.applyForce(moveDirection, sphereBody.position);
//             break;
//         case 68:
//
//             moveDirection.x = moveForce;
//             sphereBody.applyForce(moveDirection, sphereBody.position);
//             break;
//     }
//     console.log(event.keyCode)
//
//     //camera.rotation.setFromVector3(rotateVector);
//     // Применяем движение к кубу
//    // camera.position.add(position);
//
//     console.log(rotateVector, 'moveVector z',);
// }
//
// function cameraPosition(rotateVector: THREE.Vector3, speed: number): THREE.Vector3 {
//     return new THREE.Vector3(Math.sin(rotateVector.y), 0, Math.cos(rotateVector.y)).setLength(speed);
// }
//
// document.addEventListener('keydown', handleKeyDown);
// // Запускаем анимацию
//animate();
