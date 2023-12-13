import { BasicShadowMap, PCFSoftShadowMap, WebGLRenderer } from "three";

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });

    // Enable shadows in the renderer
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = PCFSoftShadowMap;
    // renderer.shadowMap.type = BasicShadowMap;
    // renderer.shadowMap.autoUpdate = true;
    // renderer.shadowMap.needsUpdate = true;

    // Turn on the physically correct lighting model.
    // renderer.physicallyCorrectLights = true;
    return renderer;
}

export { createRenderer };
