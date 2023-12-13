import { Clock, WebGLRenderer, Scene, PerspectiveCamera } from 'three';

const clock = new Clock();


class Loop {
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

    // addUpdatable(object: any) {
    //     this.updatables.push(object);
    // }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick();
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        // const delta = clock.getDelta();
        // this.renderer.render(this.scene, this.camera);
        // // for (const object of this.updatables) {
        // //     // console.log(object);
        // //     // object.tick(delta);
        // // }

        // Identity function, updated from world.setUpdateFunction()
    }
}

export { Loop }
