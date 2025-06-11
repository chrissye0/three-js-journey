import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// you can put objects inside groups and apply transformations to those groups
const group = new THREE.Group();
group.position.y = 1;
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -2;
group.add(cube2);
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;
group.add(cube3);

/**
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// NOTE: the order of transformations (position, scale, rotation) does not matter

// Position
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
// same as setting each value individually
mesh.position.set(0.7, -0.6, 1);

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5);

// Rotation - uses radians (half a rotation is pi, full rotation is 2pi)
// change order of rotations, important to prevent gimbal lock - in games, you usually want to have Y before X
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

scene.add(mesh);

// returns distance between the center of the scene and the object's position
// console.log(mesh.position.length())

// turns distance between center of the scene and the object to 1
// mesh.position.normalize()
// console.log(mesh.position.length())
*/

// Axes helper - visualizes axes (red is x, green is y, blue is z), adding an argument adjusts axis length
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// returns distance between the camera and the object
// console.log(mesh.position.distanceTo(camera.position))

// rotates the object so that its -z faces the target you provide
camera.lookAt(group.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)