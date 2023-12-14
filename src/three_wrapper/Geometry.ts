import { SphereGeometry, type ColorRepresentation, MeshStandardMaterial, Mesh, BoxGeometry, Vector3, CylinderGeometry } from "three";

function createSphere(radius: number, color: ColorRepresentation): Mesh {
    const geometry = new SphereGeometry(radius);
    const material = new MeshStandardMaterial({ color: color });
    const sphere = new Mesh(geometry, material);
    sphere.visible = true;
    return sphere
}

function createCube(size: Vector3, color: ColorRepresentation): Mesh {
    const geometry = new BoxGeometry(size.x, size.y, size.z);
    const material = new MeshStandardMaterial({ color: color });
    const cube = new Mesh(geometry, material);
    // cube.castShadow = true;
    cube.visible = true;
    return cube;
}

function createLinkMesh(point1: Vector3, point2: Vector3): Mesh {
    // create cylinder between two points
    const geometry = new CylinderGeometry(0.01, 0.01, 1, 32);
    const material = new MeshStandardMaterial({ color: "gray" });
    const cylinder = new Mesh(geometry, material);
    
    cylinder.position.copy(point1);
    cylinder.position.lerp(point2, 0.5);
    cylinder.lookAt(point1);
    cylinder.scale.set(1, 1, point1.distanceTo(point2));
    
    cylinder.visible = true;
    return cylinder;

}

export { createSphere, createCube, createLinkMesh }