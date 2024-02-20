import {CameraControl} from "./cameraControl";
import * as THREE from "three";

export class ButtonCameraControl extends CameraControl{

    public start(camera: THREE.Camera): void {
        const speed = 10 * Math.PI / 360;
        document.addEventListener('keydown', (event: any) => {
            let position = new THREE.Vector3();
            switch (event.key) {
                case 'ArrowUp':
                    position = this.cameraPosition(this.rotateVector, -speed);
                    break;
                case 'ArrowDown':
                    position = this.cameraPosition(this.rotateVector, speed);
                    break;
                case 'ArrowLeft':
                    this.rotateVector.y += speed;
                    break;
                case 'ArrowRight':
                    this.rotateVector.y += -speed;
                    break;

            }
            switch (event.keyCode) {
                case 32:
                    position.setY(speed);
                    break;
                case 16:
                    position.setY(-speed);
                    break;
            }
            console.log(camera.position.y,'camera.position.y');
            console.log(position,'position');
            camera.position.add(position);
            camera.rotation.setFromVector3(this.rotateVector);

        });
    }

    public stop() {

    }

    private rotateVector = new THREE.Vector3(0, 3.5779, 0);

    private cameraPosition(rotateVector: THREE.Vector3, speed: number): THREE.Vector3 {
        return new THREE.Vector3(Math.sin(rotateVector.y), 0, Math.cos(rotateVector.y)).setLength(speed);
    }
}