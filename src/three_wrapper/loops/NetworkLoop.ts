import type { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import type { Loop } from "../Loop";

class NetworkLoop implements Loop {
    camera: PerspectiveCamera
    scene: Scene
    renderer: WebGLRenderer
    updatables: any[]

    constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.update();
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    update(): void {
    }

}