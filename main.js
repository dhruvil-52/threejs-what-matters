import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// create scene (whole world)
const scene = new THREE.Scene();
// create camera (how much area we want to show || how much are we want to render into scene)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// make geometry and material then combine it to mesh

// cube geometry
// camera.position.z = 30; // from where (place) you want to show your object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
//   wireframe: true, // remove this line if you want solid object
// });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// AxesHelper (visualizes the axes: red = X, green = Y, blue = Z)
const axesHelper = new THREE.AxesHelper(5); // Length of the axes lines
scene.add(axesHelper);

// GridHelper (a grid plane)
const gridHelper = new THREE.GridHelper(100, 100); // Size of grid and number of divisions
scene.add(gridHelper);

// DirectionalLightHelper (shows the direction of a directional light)

const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // High intensity light
directionalLight.position.set(10, 20, 15); // Set the position of the light
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  5
); // 5 is the size of the helper
scene.add(directionalLightHelper);

// CameraHelper (visualizes the frustum of the camera)
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

// SphereGeometry
camera.position.z = 30;
const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshStandardMaterial({
  color: "blue",
  // wireframe: true, // remove this line if you want solid object
  // side: THREE.DoubleSide,
  // roughness: 0.5, // 0 is smooth (like a mirror), 1 is rough,
  // metalness: 0.8, // 0 is non-metal, 1 is fully metallic
  // emissive: "blue", // Emits red light
  // emissiveIntensity: 1, // Intensity of the emitted light
  // transparent: true, // Allow transparency
  // opacity: 0.5, // Semi-transparent
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// create renderer and attach to our document
const mycanvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: mycanvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// control our object by using orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

controls.autoRotate = true;
controls.autoRotateSpeed = 10.0; // autoRotate need to be true
controls.enableDamping = true; // Enable damping for smooth movement
controls.dampingFactor = 1.05; // Adjust damping factor (how much take a time to stop rotate) ( value is smaller >  more time to stop)
controls.screenSpacePanning = true; // Allow panning up/down and left/right
controls.enablePan = true; // Enable panning

// Set the keys for panning (optional)
controls.keys = {
  LEFT: "ArrowLeft", // Move left
  UP: "ArrowUp", // Move up
  RIGHT: "ArrowRight", // Move right
  BOTTOM: "ArrowDown", // Move down
};

// Increase pan speed for quicker movement
controls.keyPanSpeed = 30; // Adjust this to control the speed of key panning

// animate our scene
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();
// renderer.setAnimationLoop(animate);

// handle our object on resize screen
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  // whenever you change camera view that time you have to right below line
  camera.updateProjectionMatrix(); // remove this line and resize screen
});
