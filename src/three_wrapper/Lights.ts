import {
    DirectionalLight,
    DirectionalLightHelper,
    Color,
    Vector3,
    AmbientLight,
    SpotLight
} from "three";

function createLights(position: Vector3 = new Vector3(0, 0, 5), color: Color | string | number = "white") {
    const light = new DirectionalLight(color, 5);
    // const lightHelper = new DirectionalLightHelper(light, 0);
    light.position.set(position.x, position.y, position.z);
    // light.tick = (delta) => {
    // };
    // return { light, lightHelper };
    return light;

    // const light = new AmbientLight(0x404040); // soft white light
    // const light = new AmbientLight(color);

    // const light = new SpotLight(color, 4);
    // light.position.set(position.x, position.y, position.z);
    // // light.castShadow = true;
    // light.angle = Math.PI / 4;
    // light.distance = 10;

    return light;

}
export { createLights };
