import type { ColorRepresentation, Mesh, Vector3 } from "three";
import { createSphere, createLinkMesh } from "./Geometry";

class Skeleton {
    points: Array<Vector3> = [];
    links: Array<Array<number>> = [];

    spheres: Array<Mesh> = [];
    linksMesh: Array<Mesh> = [];

    constructor(
        points: Array<Vector3>,
        colors: Array<ColorRepresentation> = [],
        links: Array<Array<number>> = [],
        jointRadius: number = 0.1,
    ) {
        this.points = points;
        this.links = links;

        this.points.forEach((point, index) => {
            let color;
            if (colors.length < index) {
                color = colors[index];
            }
            else {
                color = "gray";
            }
            const sphere = createSphere(jointRadius, color);
            sphere.position.copy(point);
            this.spheres.push(sphere);
        });

        this.links.forEach((link, index) => {
            const linkMesh = createLinkMesh(this.points[link[0]], this.points[link[1]]);
            this.linksMesh.push(linkMesh);
        });
    }

    getMeshToAdd(): Array<Mesh> {
        return this.spheres.concat(this.linksMesh);
    }
}
export { Skeleton }
