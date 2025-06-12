import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui';

/**
 * Debug
 */
const gui = new GUI({
    width: 300,
    title: 'Debug UI',
    closeFolders: true
});
// gui.close();
// hide GUI by default, show/hide upon h key being pressed
gui.hide();
window.addEventListener('keydown', (e) => {
    if(e.key == 'h') {
        gui.show(gui._hidden)
    };
});

const debugObject = {};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

debugObject.color = '#A778D8';

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// can divide debug UI components into folders
const cubeTweaks = gui.addFolder('Cube');

// add to gui
// parameters: Vector3, minimum, maximum, step precision

// gui.add(mesh.position, 'y', -3, 3, 0.01);
cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation');

// visibility checkbox
cubeTweaks.add(mesh, 'visible');

// wireframe checkbox
cubeTweaks.add(material, 'wireframe');

// color changer
// three.js applies color management to optimize the rendering (so the color you see isn't the same as the one used internally)
// gui.addColor(material, 'color');
cubeTweaks.addColor(debugObject, 'color').onChange((value) => {
    material.color.set(debugObject.color);
});

// spin button
debugObject.spin = () => {
    gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI * 2});
};
cubeTweaks.add(debugObject, 'spin');

// tweak the geometry
// since it's not a property, we need to add a subdivision property to the debugObject and apply our tweak to it
debugObject.subdivision = 2;
// on finish change - building a geometry is a lot for the CPU, so only trigger once the user stops tweaking the value
cubeTweaks.add(debugObject, 'subdivision').min(1).max(20).step(1).onFinishChange(() => {
    // call dispose method on old geometry before creating the new one
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, debugObject.subdivision, debugObject.subdivision, debugObject.subdivision);
});

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()