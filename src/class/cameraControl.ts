import * as THREE from "three";

export abstract class CameraControl {

    public abstract start(camera: THREE.Camera): void;

    public abstract stop(): void;

}