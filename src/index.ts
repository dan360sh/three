import * as THREE from "three";
// Three.js сцена
const scene = new THREE.Scene();

// Three.js камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = -5;
// camera.position.y = -1;

// Three.js рендерер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// Получаем ссылку на HTML-элемент
const container = document.getElementById('your-container-id');

// Добавляем рендерер в HTML-элемент
container?.appendChild(renderer.domElement);


// Загружаем текстуру для фона
const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('https://blenderartists.org/uploads/default/original/3X/3/f/3f02f7f73b60903be4f9a00d8d2c28581d42447f.jpg');
backgroundTexture.encoding = THREE.sRGBEncoding;

// Создаем сферу для отображения текстуры
const backgroundGeometry = new THREE.SphereGeometry(1000, 32, 32);
const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture, side: THREE.BackSide });
const backgroundSphere = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(backgroundSphere);
// Создаем Cannon.js физический мир
//const world = new Cannon.World();
//world.gravity.set(0, -9.8, 0); // Гравитация

// Создаем Cannon.js статическое тело для земли
// const groundShape = new Cannon.Plane();
// const groundBody = new Cannon.Body({ mass: 0, shape: groundShape });
// world.addBody(groundBody);

// Создаем геометрию и материал для куба
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);



// Создание круглой геометрии
var radius = 5;
var segments = 32;
var geometry = new THREE.CircleGeometry(radius, segments);

// Загрузка текстуры
const textureLoader2 = new THREE.TextureLoader();
var texture = textureLoader2.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA7MnevgGl8tO7PLBsk2RNJwcOayCID6qyAA&usqp=CAU');

// Создание материала с текстурой
var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

// Создание меша (объекта) с использованием геометрии и материала
var circle = new THREE.Mesh(geometry, material);
circle.position.set(10,10,1)
// Добавление меша на сцену
scene.add(circle);
// Создаем Cannon.js динамическое тело для куба
// const cubeShape = new Cannon.Box(new Cannon.Vec3(0.5, 0.5, 0.5));
// const cubeBody = new Cannon.Body({ mass: 1, shape: cubeShape });
// world.addBody(cubeBody);

// Добавляем куб на сцену
scene.add(cube);
cube.position.set(10,1,1)
// Анимация
const animate = () => {
    requestAnimationFrame(animate);

    // Шаг физического мира
    //world.step(1 / 60);

    // Обновляем позицию куба
    // cube.position.copy(cubeBody.position);
    // cube.quaternion.copy(cubeBody.quaternion);
    console.log(cube.position);
    // Рендерим сцену
    renderer.render(scene, camera);
};
let step = 1 / 360000;
let rotateBefore = {z: 0, y: 0};
let rotateCamera = {z: 0, y: 0};
document.addEventListener('mousemove', (e)=> {
    if(rotateBefore.z < e.x){
        rotateCamera.z =  -0.01;
    } else if (rotateBefore.z > e.x){
        rotateCamera.z = 0.01;
    }

    // if (1 < rotateCamera.z) {
    //     rotateCamera.z = 0;
    // }else if(rotateCamera.z < 0 ) {
    //     rotateCamera.z = Math.PI;
    // }

    if(rotateBefore.y < e.y){
        rotateCamera.y =  -0.01;
    }else if (rotateBefore.y > e.y){
        rotateCamera.y =  0.01;
    }

    // if (1 < rotateCamera.y) {
    //     rotateCamera.y = 0;
    // }else if(rotateCamera.y < 0 ) {
    //     rotateCamera.y = Math.PI;
    // }
    rotateBefore.z = e.x;
    rotateBefore.y = e.y;
    console.log(rotateCamera)
    camera.rotateX(rotateCamera.y);
    camera.rotateY(rotateCamera.z);
    //console.log(e.x, e.y, e);
})
// Запускаем анимацию
animate();
