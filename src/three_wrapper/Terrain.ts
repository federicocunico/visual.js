import {
    PlaneGeometry,
    Mesh,
    MeshBasicMaterial,
    DoubleSide
} from "three";

export default function createTerrain(props: any) {
    // const loader = new TextureLoader();
    // const height = loader.load("textures/height.png");
    // //                                        w    h 
    // const geometry = new PlaneGeometry(150, 150, 64, 64);

    // const material = new MeshStandardMaterial({
    //     color: props.color,
    // });



    // const plane = new Mesh(geometry, material);
    // plane.position.set(0, 0, 0);
    // plane.rotation.x -= Math.PI * 0.35;

    // let frame = 0;
    // plane.tick = (delta) => {

    // };
    const geometry = new PlaneGeometry(1, 1);
    const material = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide });
    const plane = new Mesh(geometry, material);


    return plane;
}