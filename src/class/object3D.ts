import * as THREE from "three";
import CANNON from "cannon";

export class Object3D {
    constructor (
        public readonly mesh: THREE.Mesh,
        public readonly physicalBody: CANNON.Body,
    ){

    }
}