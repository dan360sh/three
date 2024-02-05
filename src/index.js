import * as THREE from 'three';
import * as Cannon from 'cannon';
import * as Orbitcontrols from 'three-orbitcontrols';
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
container.appendChild(renderer.domElement);

// Цвета фона
const color1 = new THREE.Color(0x3498db);
const color2 = new THREE.Color(0xe74c3c);

// Uniforms для передачи цветов в шейдер
const uniforms = {
    color1: { value: color1 },
    color2: { value: color2 },
};

// Геометрия и материал для плоскости (земли)
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI ; // Поворачиваем плоскость, чтобы она была параллельна оси Y
scene.add(ground);

// Загружаем текстуру для фона
const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('https://png.pngtree.com/background/20230401/original/pngtree-romantic-and-beautiful-background-of-stars-and-clouds-picture-image_2235485.jpg');
backgroundTexture.encoding = THREE.sRGBEncoding;

// Создаем сферу для отображения текстуры
const backgroundGeometry = new THREE.SphereGeometry(1000, 32, 32);
const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture, side: THREE.BackSide });
const backgroundSphere = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(backgroundSphere);
// Создаем Cannon.js физический мир
const world = new Cannon.World();
world.gravity.set(0, -9.8, 0); // Гравитация

// Создаем Cannon.js статическое тело для земли
const groundShape = new Cannon.Plane();
const groundBody = new Cannon.Body({ mass: 0, shape: groundShape });
world.addBody(groundBody);

// Создаем геометрию и материал для куба
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Создаем Cannon.js динамическое тело для куба
const cubeShape = new Cannon.Box(new Cannon.Vec3(0.5, 0.5, 0.5));
const cubeBody = new Cannon.Body({ mass: 1, shape: cubeShape });
world.addBody(cubeBody);

// Добавляем куб на сцену
scene.add(cube);

// Анимация
const animate = () => {
    requestAnimationFrame(animate);

    // Шаг физического мира
    world.step(1 / 60);

    // Обновляем позицию куба
    cube.position.copy(cubeBody.position);
    cube.quaternion.copy(cubeBody.quaternion);

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
