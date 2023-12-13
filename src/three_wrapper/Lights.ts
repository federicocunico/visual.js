import {
    DirectionalLight,
    DirectionalLightHelper,
    Color,
    Vector3
} from "three";

function createLights(position: Vector3 = new Vector3(0, 0, 5), color: Color | string | number = "white") {
    const light = new DirectionalLight(color, 4);
    const lightHelper = new DirectionalLightHelper(light, 0);
    light.position.set(position.x, position.y, position.z);
    // light.tick = (delta) => {
    // };
    return { light, lightHelper };
}
export { createLights };
