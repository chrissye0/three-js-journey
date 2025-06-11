import * as THREE from 'three'
// using the GreenSock library
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Method 1: Time
// let time = Date.now(); // returns timestamp, the amount of time in milliseconds since January 1st 1970

// Method 2: Clock
// const clock = new THREE.Clock();

// Method 3: Using GreenSock library
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

// Animations
const tick = () => {
    /**
    Method 1: Time - using JS Date function
    
    const currentTime = Date.now();
    const deltaTime = currentTime - time; // time between ticks
    time = currentTime; // updates the time for the next tick

    // having a smaller deltaTime indicates a higher frame rate
    console.log(deltaTime);

    // Update objects

    // by multiplying by deltaTime, the cube rotates at the same speed regardless of the computer's frame rate
    mesh.rotation.y += 0.002 * deltaTime;
    
    */

    /**
    Method 2: Clock - using Three.js built-in solution Clock
    
    const elapsedTime = clock.getElapsedTime(); // time since the Clock was first initialized (in seconds)
    console.log(elapsedTime);

    // Update objects

    // one revolution per second
    // mesh.rotation.y = elapsedTime * Math.PI * 2;

    // cube goes in a circle
    // mesh.position.y = Math.sin(elapsedTime);
    // mesh.position.x = Math.cos(elapsedTime);

    // camera is moving and cube is centered
    camera.position.y = Math.sin(elapsedTime);
    camera.position.x = Math.cos(elapsedTime);
    camera.lookAt(mesh.position);
    
    */

    // Render
    renderer.render(scene, camera);
    // requestAnimationFrame is used to call the function provided on the next frame
    // this can be used to create animations
    window.requestAnimationFrame(tick);
}

tick();
