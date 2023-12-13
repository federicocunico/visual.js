import { createCamera } from "./Camera";
import { createLights } from "./Lights";
import { createScene } from "./Scene";
import { createRenderer } from "./Renderer";
import createTerrain from "./Terrain";
import type { Loop } from "./Loop";
import { Resizer } from "./Resizer";
import { LocalLoop } from "./loops/LocalLoop";
import { PerspectiveCamera, Scene, WebGLRenderer, Vector3, Color, BoxGeometry, Mesh, SphereGeometry, DirectionalLight, MeshStandardMaterial, AxesHelper } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";


class World {
    camera: PerspectiveCamera = null as any;
    renderer: WebGLRenderer = null as any;
    scene: Scene = null as any;
    loop: Loop = null as any;
    controls: OrbitControls = null as any;

    constructor(container: HTMLElement, backgroundColor: string | number = "lightgray", addLights: boolean = true) {
        // Instances of camera, scene, and renderer
        this.camera = createCamera();
        this.scene = createScene(backgroundColor);
        this.renderer = createRenderer();
        this.loop = new LocalLoop(this.camera, this.scene, this.renderer);
        container.appendChild(this.renderer.domElement);

        if (addLights) {
            const light = createLights();
            this.scene.add(light);
        }

        this.loop.start();

        const resizer = new Resizer(container, this.camera, this.renderer);
        resizer.onResize = () => {
            this.render();
        };
    }

    enableControls(enable: boolean): void {
        if (enable) {
            // Add controls for easier navigation
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        }
        else {
            this.controls = null as any;
        }
    }

    clearWorld(): void {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
    }

    setUpdateFunction(updateFunction: any): void {
        this.loop.update = updateFunction;
    }

    setCameraPosition(x: number, y: number, z: number): void {
        this.camera.position.set(x, y, z);
    }

    lookAt(object: any = null): void {
        if (object) {
            this.camera.lookAt(object.position);
        }
        else {
            this.camera.lookAt(new Vector3(0, 0, 0));
        }
    }

    addReferenceSystem(position: Vector3 = new Vector3(0, 0, 0), size: number = 2): void {
        // create a reference system with three axis (x, y, z)
        const axesHelper = new AxesHelper(size); // You can adjust the size of the axes
        axesHelper.position.set(position.x, position.y, position.z);
        // Add the AxesHelper to the scene
        this.addToWorld(axesHelper);
    }

    addPlane(sizeX: number = 20, sizeY: number = 20, color: Color | string | number = "gray"): void {
        let terrain = createTerrain(sizeX, sizeY, color);
        this.addToWorld(terrain);
    }

    addCube(position: Vector3, size: Vector3, color: Color | string | number): Mesh {
        const geometry = new BoxGeometry(size.x, size.y, size.z);
        const material = new MeshStandardMaterial({ color: color });
        const cube = new Mesh(geometry, material);
        // cube.castShadow = true;
        cube.position.set(position.x, position.y, position.z);
        this.addToWorld(cube);
        return cube;
    }

    addSphere(positionL: Vector3, radius: number, color: Color | string | number): Mesh {
        const geometry = new SphereGeometry(radius, radius, radius);
        const material = new MeshStandardMaterial({ color: color });
        const sphere = new Mesh(geometry, material);
        sphere.position.set(positionL.x, positionL.y, positionL.z);
        this.addToWorld(sphere);
        return sphere;
    }

    addToWorld(object: any): void {
        // loop.addUpdatable(object); // loop.updatables.push(light);
        this.scene.add(object);
    }

    render(): void {
        if (this.controls) {
            this.controls.update();
        }
        // Draw a single frame
        this.renderer.render(this.scene, this.camera);
    }
}
export { World };