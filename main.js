import "./style.css";

import * as THREE from "three";

// Setting up complete scene
const scene = new THREE.Scene();

// Adding Avatar Texture
const avatarTexture = new THREE.TextureLoader().load("/avatar.png");

// Adding Moon Texture and Normals
const moonTexture = new THREE.TextureLoader().load("/moon.jpg");
const moonNormal = new THREE.TextureLoader().load("/moonNormal.jpg");

// Adding Space texture
const spaceTexture = new THREE.TextureLoader().load("/space.jpg");
scene.background = spaceTexture;

// Setting up camera that follow objects
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

// Setting the rendering function for the entire image
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;
camera.position.x = -3;

// Rendering everything to the canvas.
renderer.render(scene, camera);

// Object Avatar
const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: avatarTexture })
);
scene.add(avatar);

// Object Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: "#A3A3A3",
});
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Object Moon
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: moonNormal })
);
moon.position.z = 50;
moon.position.x = -10;
scene.add(moon);

// Object Star
const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: "white",
  });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
};

Array(200).fill().forEach(addStar);

// Setting up the lights of the scene
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Move Camera with Scroll
const moveCamera = () => {
  // Space between top of the page and your position in the page
  const t = document.body.getBoundingClientRect().top;

  // Rotate objects while scrolling
  moon.rotation.x += 0.01;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.01;

  avatar.rotation.y += 0.01;
  avatar.rotation.z += 0.01;

  camera.position.z = 5 + t * -0.01;
  camera.position.x = -3 + t * -0.001;
  camera.rotation.y = t * -0.0003;
};
document.body.onscroll = moveCamera;

// Animate Torus
const animate = () => {
  requestAnimationFrame(animate);

  // Rotate the geometry
  box.rotation.x += 0.01;
  box.rotation.y += 0.005;
  box.rotation.z += 0.01;

  renderer.render(scene, camera);
};

animate();
