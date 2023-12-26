<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { World } from "@/three_wrapper/World";
import axios from "axios";
import { Mesh, Vector3, type ColorRepresentation, Color } from "three";
import { UriBuilder } from "@/uri";
import { SERVER_IP, SERVER_PORT, DATA_API } from "@/settings";
import { CircularBuffer } from "@/utils";
import { Skeleton } from "@/three_wrapper/Skeleton";

const target_requests_per_second = 60;
const average_ms_per_request_buffer: CircularBuffer<number> = new CircularBuffer(target_requests_per_second * 10);
const average_ms_per_request = ref("0.00");
const container = ref<HTMLElement | null>(null);
var waitingForServer = false;

let world: World = null as any;

function main() {
	if (!container.value) {
		throw new Error("Container element not found");
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

	enableControls(true);
}

async function getMeshesFromServer() {
	const uri = new UriBuilder(SERVER_IP, SERVER_PORT, DATA_API, "http").build();
	if (waitingForServer) {
		return;
	}
	waitingForServer = true;

	try {
		let startTime = new Date().getTime();

		var response = await axios.get(uri);
		// debugger;

		world.clearWorld();

		let rawData = response.data as any;
		// const rawData = JSON.parse(test) as any;

		let points = rawData.points.map((a: any) => new Vector3(a.x, a.y, a.z)) as Array<Vector3>;
		points.forEach((point: Vector3) => {
			world.addSphere(point, 1, "red");
		});

		let sks = rawData.skeletons as Array<Skeleton>;
		// convert colors from [0,1] to [0,255]
		sks.forEach((skeleton: Skeleton) => {
			skeleton.colors.forEach((color: ColorRepresentation, idx: number) => {
				let c = color as Color;
				if (c.r > 1 || c.g > 1 || c.b > 1) {
					return;
				}
				skeleton.colors[idx] = new Color(c.r * 255, c.g * 255, c.b * 255);
			});
			world.addSkeleton(
				skeleton.joints.map((a) => new Vector3(a.x, a.y, a.z)),
				skeleton.colors,
				skeleton.links,
				skeleton.name
			);
		});

		let endTime = new Date().getTime();
		let currFps = endTime - startTime;
		average_ms_per_request_buffer.push(currFps);

		average_ms_per_request.value = getAverageMsPerRequest();
	} catch (error) {
		console.log(error);
	} finally {
		waitingForServer = false;
	}
}

function enableControls(value: boolean) {
	if (!container.value) {
		throw new Error("Container element not found");
	}

	world.enableControls(value);
}

function getSceneElementsCount() {
	return world?.scene.children.length;
}

function getAverageMsPerRequest(): string {
	// return curr_FPS.value.getBuffer()[curr_FPS.value.size].toFixed(2);  // last value

	let buffer = average_ms_per_request_buffer.getBuffer();
	if (buffer.length == 0) {
		return "0";
	}

	// compute average
	let average = 0;
	buffer.forEach((element) => {
		average += element;
	});
	average /= buffer.length;

	return average.toFixed(2);
}

let getDataInterval: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
	main();

	getDataInterval = setInterval(() => {
		getMeshesFromServer();
	}, 1000 / target_requests_per_second);
});

onUnmounted(() => {
	clearInterval(getDataInterval);
});
</script>

<template lang="pug">
h1 3D Plot Viewer (ms per request: {{ average_ms_per_request }})
h5 Scene elements: {{ getSceneElementsCount() }}

//- Controls
div
    button(@click="enableControls(true)") Enable Controls
    button(@click="enableControls(false)") Disable Controls

//- Three js container
div(ref="container")

</template>
