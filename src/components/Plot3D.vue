<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { World } from '@/three_wrapper/World';
import { Vector3 } from 'three';

const container = ref<HTMLElement | null>(null);

let world: World = null as any;

function main() {
    if (!container.value) {
        throw new Error('Container element not found');
    }
    world = new World(container.value);
    world.setCameraPosition(0, 6, 12);
    world.lookAt();
    world.addReferenceSystem();

    world.addPlane(20, 20, "gray");
    // world.enableControls();

    // Loop Example - Not delete
    const cube = world.addCube(new Vector3(0, 1, 0), new Vector3(0.2, 0.2, 0.2), "green");
    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
    world.setUpdateFunction(animate);
}

function enableControls(value: boolean) {
    if (!container.value) {
        throw new Error('Container element not found');
    }

    world.enableControls(value);
}

onMounted(() => {
    main();
});

</script>

<template lang="pug">
h1 3D Plot Viewer

//- Controls
div
    button(@click="enableControls(true)") Enable Controls
    button(@click="enableControls(false)") Disable Controls

//- Three js container
div(ref="container")

</template>