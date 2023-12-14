import { Mesh, Scene, Vector3 } from "three";
import { createCube, createSphere, createLinkMesh } from "./Geometry";

class Pool {
    pool: Mesh[];

    constructor() {
        this.pool = [];
    }

    get(): Mesh | null {
        if (this.pool.length == 0) {
            return null;
        }
        let candidate: Mesh | null = null;
        for (let i = 0; i < this.pool.length; i++) {
            if (!this.pool[i].visible) {
                candidate = this.pool[i];
                break;
            }
        }
        return candidate;
    }
    put(obj: Mesh) {
        this.pool.push(obj);
    }

}

class PrimitiveFactory {
    spherePool: Pool = new Pool();
    cubePool: Pool = new Pool();
    linkPool: Pool = new Pool()
    scene: Scene = null as any;

    constructor(scene: Scene) {
        this.scene = scene;
    }


    getSphere(): Mesh {
        let candidate = this.spherePool.get();
        if (candidate == null) {
            candidate = createSphere(0.1, "black");
            this.scene.add(candidate);
            this.spherePool.put(candidate);
        }
        return candidate;
    }

    getCube(): Mesh {
        let candidate = this.cubePool.get();
        if (candidate == null) {
            candidate = createCube(new Vector3(0.1, 0.1, 0.1), "black");
            this.scene.add(candidate);
            this.cubePool.put(candidate);
        }
        return candidate;
    }

    getLink(): Mesh {
        throw new Error("Method not implemented.");
        // let candidate = this.linkPool.get();
        // if (candidate == null) {
        //     // TODO: createLinkMesh should take two points as arguments
        //     candidate = createLinkMesh(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
        //     this.linkPool.put(candidate);
        // }
        // return candidate;
    }

}

export { PrimitiveFactory }
