import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = - (e.clientY / sizes.height - 0.5);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera

// Perspective camera
// parameters
// 1. field of view - vertical vision angle in degrees (45-75 is recommended)
// 2. aspect ratio - width of the render divided by the height of the render
// 3. near - corresponds to how near the camera can see (anything closer won't appear)
// 4. far - corresponds to how far the camera can see (anything further won't appear)
// for near and far, don't use extreme values because this prevents z-fighting (GPU has a hard time determining what face is in front of another)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

// Orthographic camera
// parameters - how far the camera can see in each direction (left, right, top, bottom) then the near and far
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
// move camera with left click drag and drop, move along plane with right click drag and drop, zoom in and out with mouse wheel
const controls = new OrbitControls(camera, canvas);
// by default, the camera is looking at the center of the scene
// controls.target.y = 2;
// controls.update();
// damping smooths the animation by adding some kind of acceleration and friction
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update camera

    // camera.position.x = cursor.x * 3;
    // camera.position.y = cursor.y * 3;

    // for a full rotation
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(mesh.position);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()