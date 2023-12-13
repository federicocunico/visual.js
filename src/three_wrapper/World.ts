import { createCamera } from "./Camera";
import { createLights } from "./Lights";
import { createScene } from "./Scene";
import { createRenderer } from "./Renderer";
import createTerrain from "./Terrain";
import { Loop } from "./Loop";
import { Resizer } from "./Resizer";
import { PerspectiveCamera, Scene, WebGLRenderer, Vector3, Color, BoxGeometry, MeshBasicMaterial, Mesh } from "three";

// These variables are module-scoped: we cannot access them
// from outside the module.
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let loop: Loop;

class World {
    constructor(container: HTMLElement, backgroundColor: string | number = "lightgray") {
        // Instances of camera, scene, and renderer
        camera = createCamera();
        scene = createScene(backgroundColor);
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);

        // container.append(renderer.domElement);
        container.appendChild(renderer.domElement);

        // Light Instance, with optional light helper
        const { light, lightHelper } = createLights(
            new Vector3(0, 0, 5),
            "white"
        );
        // loop.addUpdatable(light); // loop.updatables.push(light);
        scene.add(light);

        loop.start();

        const resizer = new Resizer(container, camera, renderer);
        resizer.onResize = () => {
            this.render();
        };

    }

    clearWorld(): void {
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
    }

    setUpdateFunction(updateFunction: any): void {
        loop.tick = updateFunction;
    }

    setCameraPosition(x: number, y: number, z: number): void {
        camera.position.set(x, y, z);
    }

    addPlane(color: Color | string | number): void {
        let terrain = createTerrain({
            color: color,
        });
        this.addToWorld(terrain);
    }

    addCube(position: Vector3, size: Vector3, color: Color | string | number): Mesh {
        const geometry = new BoxGeometry(size.x, size.y, size.z);
        const material = new MeshBasicMaterial({ color: color });
        const cube = new Mesh(geometry, material);
        cube.position.set(position.x, position.y, position.z);
        this.addToWorld(cube);
        return cube;
    }

    addToWorld(object: any): void {
        // loop.addUpdatable(object); // loop.updatables.push(light);
        scene.add(object);
    }

    render(): void {
        // Draw a single frame
        renderer.render(scene, camera);
    }
}
export { World };