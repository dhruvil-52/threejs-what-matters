import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

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

// Ambient Light (from every where there are same light)
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // White ambient light with intensity 1
scene.add(ambientLight);

// Directional Light (if you want to throw light from perticular direction)
const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // White light with high intensity
directionalLight.position.set(10, 20, 15); // Set the position of the light
scene.add(directionalLight);

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  5 // 5 is the size of the helper
);
scene.add(directionalLightHelper);

// Point Light (simulate light sources that emit light in all directions from a single point, similar to a light bulb.)
const pointLight = new THREE.PointLight("red", 1, 10, 2); // White light, intensity 1, distance 100
pointLight.position.set(-10, -2, -15); // Set the position of the light
scene.add(pointLight);

// Point Light Helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1); // 1 is the size of the helper
scene.add(pointLightHelper);

const loader = new THREE.TextureLoader();
const color = loader.load("./images/earth.jpg");
const roughness = loader.load("./images/roughness.png"); // use for rough or smooth
const normal = loader.load("./images/normal.png");
const matel = loader.load("./images/matel.jpg"); // use for shine

// SphereGeometry
camera.position.z = 30;
const geometry = new THREE.SphereGeometry(15, 32, 100);
const material = new THREE.MeshStandardMaterial({
  map: color,
  roughnessMap: roughness,
  normalMap: normal,
  metalnessMap: matel,
  // color: "blue",
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

// Create GUI
const gui = new GUI();
// Add controls for MeshStandardMaterial properties
const materialFolder = gui.addFolder("Material Settings");
// Adjust roughness
materialFolder.add(material, "roughness", 0, 1).name("Roughness");
// Adjust metalness
materialFolder.add(material, "metalness", 0, 1).name("Metalness");
// Add color control (using a color picker)
materialFolder.addColor(material, "color").name("Color");
// Controls for maps (you'll need to make sure maps are set up beforehand)
materialFolder.add(material, "wireframe").name("Wireframe");
// Don't forget to open the folder
materialFolder.open();

// Mesh Settings
const meshFolder = gui.addFolder("Mesh Settings");
// Position controls
meshFolder.add(cube.position, "x", -10, 10).name("Position X");
meshFolder.add(cube.position, "y", -10, 10).name("Position Y");
meshFolder.add(cube.position, "z", -10, 10).name("Position Z");
// Rotation controls
meshFolder.add(cube.rotation, "x", 0, Math.PI * 2).name("Rotation X");
meshFolder.add(cube.rotation, "y", 0, Math.PI * 2).name("Rotation Y");
meshFolder.add(cube.rotation, "z", 0, Math.PI * 2).name("Rotation Z");
// Scale controls
meshFolder.add(cube.scale, "x", 0.1, 5).name("Scale X");
meshFolder.add(cube.scale, "y", 0.1, 5).name("Scale Y");
meshFolder.add(cube.scale, "z", 0.1, 5).name("Scale Z");
// Don't forget to open the folder
meshFolder.open();

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
