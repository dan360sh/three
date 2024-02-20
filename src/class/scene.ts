import * as THREE from "three";
import * as CANNON from "cannon";
import { Object3D } from "./object3D";
import {CameraControl} from "./cameraControl";
export class Scene {
    private readonly renderer = new THREE.WebGLRenderer();

    constructor(readonly world: CANNON.World,
                public readonly  scene: THREE.Scene,
                public readonly camera: THREE.Camera
                ) {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        const container = document.getElementById('your-container-id');
        container?.appendChild(this.renderer.domElement);
    }


    private objects: Object3D[] = [];

    public add(object: Object3D){

        this.scene.add(object.mesh);
        this.world.addBody(object.physicalBody);
        this.objects.push(object);
    }

    public start () {
        const pointLight = new THREE.PointLight(0xFFFFFF); // Цвет белый (можете выбрать любой цвет)
        pointLight.position.set(0, 0, 5); // Устанавливаем положение света
        pointLight.intensity = 2;
        this.scene.add(pointLight);
        this.animate();
    }

    public stop () {

    }

    addCameraControl (control : CameraControl) {
        control.start(this.camera);
    }

    private animate = () => {
        requestAnimationFrame(this.animate);

        // Обновление физики
        this.world.step(1 / 60);
        for (let object of this.objects) {
            object.mesh.position.copy(object.physicalBody.position as any);
            object.mesh.quaternion.copy(object.physicalBody.quaternion as any);
        }

        this.renderer.render(this.scene, this.camera);
    };
}