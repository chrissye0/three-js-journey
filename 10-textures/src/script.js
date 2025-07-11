import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */
// const image = new Image();
// const texture = new THREE.Texture(image);
// // encode texture in sRGB
// texture.colorSpace = THREE.SRGBColorSpace;

// image.onload = () => {
//     texture.needsUpdate = true;
// }

// image.src = '/textures/door/color.jpg';

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log('onStart');
};
loadingManager.onLoad = () => {
    console.log('onLoad');
};
loadingManager.onProgress = () => {
    console.log('onProgress');
};
loadingManager.onError = () => {
    console.log('onError');
};

// using a texture loader
// a texture loader can be used to load multiple textures
const textureLoader = new THREE.TextureLoader(loadingManager);
    // texture can have 3 function arguments after the path
    // load - when the image loaded successfully
    // progress - when the loading is progressing
    // error - if something went wrong
// const colorTexture = textureLoader.load('/textures/door/color.jpg');
// for testing minification
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png');
// for testing magnification
const colorTexture = textureLoader.load('/textures/minecraft.png');

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

colorTexture.colorSpace = THREE.SRGBColorSpace;

/**
// repeating the texture
colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;
// by default, the texture doesn't repeat and the last pixel gets stretched
// we can change that with THREE.RepeatWrapping (.wrapS for X, .wrapT for Y)
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;
// we can offset the texture using the offset property
colorTexture.offset.x = 0.5;
colorTexture.offset.y = 0.5;
// rotate the texture
colorTexture.rotation = Math.PI / 4;
// for centering the rotation
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;
 */

// we can change the minification of the texture using the minFilter property
// if we're using THREE.NearestFilter on minFilter, we don't need the mipmaps
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
// we can change the magnification when the texture is too small for the surface it covers
colorTexture.magFilter = THREE.NearestFilter; // nearest filter gives a sharper look

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
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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