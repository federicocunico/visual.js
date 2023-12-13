<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { World } from '@/three_wrapper/World';

const container = ref<HTMLElement | null>(null);

function main() {
    if (!container.value) {
        throw new Error('Container element not found');
    }
    const world = new World(container.value);
    world.setCameraPosition(0, 0, 5);

    // Loop Example - Not delete
    // const cube = world.addCube(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1), "green");
    // function animate() {
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
    // }
    // world.setUpdateFunction(animate);
}


onMounted(() => {
    main();
});

</script>

<template lang="pug">
h1 3D Plot Viewer

//- Three js container
div(ref="container")

</template>