<script setup lang="js">
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth/2, window.innerHeight/2);
document.body.appendChild(renderer.domElement);

// Enable PointerLockControls
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

// Define skeleton pose (list of 3D points and links)
const skeletonPose = {
  points: [
    new THREE.Vector3(0, 0, 0),  // Joint 1
    new THREE.Vector3(0, 1, 0),  // Joint 2
    new THREE.Vector3(1, 1, 0),  // Joint 3
  ],
  links: [
    [0, 1],  // Link between Joint 1 and Joint 2
    [1, 2],  // Link between Joint 2 and Joint 3
  ],
};

// Create spheres for joints
const sphereGeometry = new THREE.SphereGeometry(0.05);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const jointSpheres = skeletonPose.points.map((point) => {
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.copy(point);
  scene.add(sphere);
  return sphere;
});

// Create lines for links
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

const linkLines = skeletonPose.links.map((link) => {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    skeletonPose.points[link[0]],
    skeletonPose.points[link[1]],
  ]);
  const line = new THREE.Line(geometry, lineMaterial);
  scene.add(line);
  return line;
});

// Enable drag and drop for spheres
let selectedSphere = null;

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);

function onMouseDown(event) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(jointSpheres);

  if (intersects.length > 0) {
    controls.lock(); // Capture mouse movements
    selectedSphere = intersects[0].object;
  }
}

function onMouseUp() {
  controls.unlock(); // Release mouse movements
  selectedSphere = null;
}

function animate() {
  requestAnimationFrame(animate);

  // Update dragged sphere's position
  if (selectedSphere) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([scene], true);

    if (intersects.length > 0) {
      const position = intersects[0].point;
      selectedSphere.position.copy(position);
    }
  }

  // Render the scene
  renderer.render(scene, camera);
}

// Set up camera position
camera.position.z = 5;

// Start the animation loop
animate();

</script>

<template lang="pug">
h1 3D Plot Viewer
</template>