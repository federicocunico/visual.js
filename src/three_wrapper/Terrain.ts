import {
    PlaneGeometry,
    Mesh,
    MeshBasicMaterial,
    DoubleSide,
    Color
} from "three";

export default function createTerrain(sizeX: number, sizeY: number, color: Color | string | number) {
    const geometry = new PlaneGeometry(sizeX, sizeY);
    const material = new MeshBasicMaterial({ color: color, side: DoubleSide });  // without shadows (otherwise use MeshStandardMaterial)
    const plane = new Mesh(geometry, material);
    plane.position.set(0, 0, 0);
    // set plane rotation to be flat
    plane.rotation.x -= Math.PI * 0.5;
    return plane;
}
