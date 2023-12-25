import { CylinderGeometry, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { distanceTo } from "./Geometry";

class MeshLink {
    point1 = new Vector3(0, 0, 0);
    point2 = new Vector3(0, 0, 0);
    mesh: Mesh;

    constructor(point1: Vector3, point2: Vector3) {
        this.point1 = point1;
        this.point2 = point2;
        this.mesh = this.build();
    }

    build(): Mesh {
        // create cylinder between two points
        const geometry = new CylinderGeometry(0.1, 0.1, 1, 32);
        const material = new MeshStandardMaterial({ color: "gray" });
        const cylinder = new Mesh(geometry, material);

        cylinder.position.copy(this.point1);
        cylinder.position.lerp(this.point2, 0.5);
        cylinder.lookAt(this.point1);
        cylinder.scale.set(1, 1, distanceTo(this.point1, this.point2));

        cylinder.visible = true;
        return cylinder;
    }

    update(point1: Vector3, point2: Vector3): void {
        this.point1 = point1;
        this.point2 = point2;
        this.mesh.position.copy(this.point1);
        this.mesh.position.lerp(this.point2, 0.5);
        this.mesh.lookAt(this.point1);
        this.mesh.scale.set(1, 1, distanceTo(this.point1, this.point2));
    }
}

export { MeshLink }