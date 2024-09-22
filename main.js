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

// animate our scene
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
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
