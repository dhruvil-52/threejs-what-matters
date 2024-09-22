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
camera.position.z = 5;

// make geometry and material then combine it to mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true, // remove this line if you want solid object
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
