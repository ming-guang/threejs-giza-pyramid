import { useLoader } from "@tresjs/core";
import * as THREE from "three";
import { GLTFLoader, OBJLoader } from "three/examples/jsm/Addons.js";

export class SimpleModel {
  constructor(
    public readonly name: string,
    public readonly path: string,
  ) {}

  async loadObject(): Promise<THREE.Object3D> {
    if (this.path.endsWith(".obj")) {
      return await this.loadOBJObject();
    }
    return await this.loadGLTFObject();
  }

  private async loadOBJObject(): Promise<THREE.Object3D> {
    // @ts-expect-error
    const object = await useLoader(OBJLoader, this.path);
    object.traverse((node: THREE.Mesh) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return object;
  }

  private async loadGLTFObject(): Promise<THREE.Object3D> {
    // @ts-expect-error
    const object = await useLoader(GLTFLoader, this.path);
    object.scene.traverse((node: THREE.Mesh) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return object.scene;
  }
}

export const models: { [key: string]: SimpleModel } = {
  teapot: new SimpleModel("Teapot", "assets/models/teapot.obj"),
  spoon: new SimpleModel("Spoon", "assets/models/spoon.obj"),
  teacup: new SimpleModel("Teacup", "assets/models/teacup.obj"),
  sun: new SimpleModel("Sun", "assets/models/sun/scene.gltf"),
  moon: new SimpleModel("Moon", "assets/models/moon/scene.gltf"),
};
