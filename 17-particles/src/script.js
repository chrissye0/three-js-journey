import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/textures/particles/2.png');

/**
 * Particles
 */

// Geometry
// sphere geometry parameters - radius, width subdivisions, height subdivisions
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);

const particlesGeometry = new THREE.BufferGeometry();
// number of particles
const count = 50000;
// multiply by 3 (each group of 3 will represent the x, y, and z coordinates of each vertex)
const positions = new Float32Array(count * 3);
// same for colors (each group of 3 represents the R, G, and B values)
const colors = new Float32Array(count * 3);
for(let i = 0; i < count * 3; i++) {
    // spread particles out both in negative and position direction
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
}
// the 3 indicates you're using 3 values for a vertex
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    sizeAttenuation: true, // creates perspective
    transparent: true,
    alphaMap: particleTexture,
});

// alphaTest - value between 0 and 1 that enables WebGL to know when not to render the pixel according to its transparency (default is 0, meaning it will be rendered anyway)
// particlesMaterial.alphaTest = 0.001;

// depthTest - WebGL tests if what's being drawn is closer than what's already drawn, deactivate with setting depthTest
// deactivating depth testing might create bugs if you have other objects in the scene or particles with different colors
// particlesMaterial.depthTest = false;

// depthWrite - the depth of what's being drawn is stored in depth buffer
// instead of not testing if the particle is closer than what's in the depth buffer, we can tell WebGL not to write particles in that buffer with depthWrite
particlesMaterial.depthWrite = false;

// blending - we can tell WebGL to add the color of the pixel to the color of the pixel already drawn (gets brighter when particles overlap)
particlesMaterial.blending = THREE.AdditiveBlending;

// set random colors
particlesMaterial.vertexColors = true;

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Cube
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update particles
    particles.rotation.y = elapsedTime * 0.2;
    for(let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = particlesGeometry.attributes.position.array[i3] // i3 represents the x coordinate
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x) // i3 + 1 represents the y coordinate, offset by x to create wave effect
    } 

    particlesGeometry.attributes.position.needsUpdate = true;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()