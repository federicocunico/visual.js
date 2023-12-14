<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { World } from '@/three_wrapper/World';
import axios from 'axios';
import { Mesh, Vector3 } from 'three';
import { UriBuilder } from '@/uri';
import { SERVER_IP, SERVER_PORT, DATA_API } from '@/settings';
import { CircularBuffer } from '@/utils';

const MAX_FPS = 60;
// const curr_FPS = ref<number>(MAX_FPS);
const curr_FPS = ref<CircularBuffer<number>>(new CircularBuffer(MAX_FPS * 10));
const container = ref<HTMLElement | null>(null);
var waitingForServer = false;

let world: World = null as any;

function main() {
    if (!container.value) {
        throw new Error('Container element not found');
    }
    world = new World(container.value);
    world.setUp();
    world.setCameraPosition(0, 6, 12);
    world.lookAt();

    // world.enableControls();

    // Loop Example - Not delete
    // const cube = world.addCube(new Vector3(0, 1, 0), new Vector3(0.2, 0.2, 0.2), "green");
    // function animate() {
    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;
    // }
    // world.setUpdateFunction(animate);


}

function getMeshesFromServer() {
    const uri = new UriBuilder(
        SERVER_IP, SERVER_PORT, DATA_API, "http"
    ).build()
    if (waitingForServer) {
        return;
    }
    waitingForServer = true;
    let startTime = new Date().getTime();
    axios.get(uri).then((response) => {
        // debugger;
        // console.log(world.scene.children)
        world.clearWorld();

        let rawData = response.data as any;

        let points = rawData.points as Array<Vector3>;
        points.forEach((point: Vector3) => {
            world.addSphere(point, 1, "red");
        });

        // debugger;
        // let skeletons = [] as Array<any>;

        waitingForServer = false;

        let endTime = new Date().getTime();
        let currFps = 1000 / (endTime - startTime);
        curr_FPS.value.push(currFps);
    }).catch((error) => {
        console.log(error);
    });
}

function enableControls(value: boolean) {
    if (!container.value) {
        throw new Error('Container element not found');
    }

    world.enableControls(value);
}

function getSceneElementsCount() {
    return world?.scene.children.length;
}


function getCurrFPS() {
    // return curr_FPS.value.getBuffer()[curr_FPS.value.size].toFixed(2);  // last value

    let buffer = curr_FPS.value.getBuffer();
    if (buffer.length == 0) {
        return 0;
    }

    // compute average  
    let average = 0;
    buffer.forEach(element => {
        average += element;
    });
    average /= buffer.length;

    return average.toFixed(2);
}

onMounted(() => {
    main();

    setInterval(() => {
        getMeshesFromServer();
    }, 1000 / MAX_FPS);
});

</script>

<template lang="pug">
h1 3D Plot Viewer (fps: {{ getCurrFPS() }})
h5 Scene elements: {{ getSceneElementsCount() }}

//- Controls
div
    button(@click="enableControls(true)") Enable Controls
    button(@click="enableControls(false)") Disable Controls

//- Three js container
div(ref="container")

</template>