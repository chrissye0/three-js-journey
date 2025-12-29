import { extend, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import CustomObject from './CustomObject.jsx';

// extend automatically converts a Three.js class into a declarative version and makes it available in JSX
extend({OrbitControls});

export default function Experience() {

    const {camera, gl} = useThree(); // contains relevant info like camera, WebGL renderer, etc.
    const cube = useRef();
    const group = useRef();

    // rotate the cube and move the camera
    useFrame((state, deltaTime) => {
        // const angle = state.clock.elapsedTime;
        // state.camera.position.x = Math.sin(angle);
        // state.camera.position.z = Math.cos(angle);
        // state.camera.lookAt(0, 0, 0);

        cube.current.rotation.y += deltaTime;
        // group.current.rotation.y += deltaTime;
    })

    return <>
        {/** move the camera */}
        <orbitControls args={[camera, gl.domElement]}/>


        <directionalLight position={[1, 2, 3]} intensity={4.5}/>
        <ambientLight intensity={1.5}/>

        <group ref={group}>
            <mesh position-x={-2}>
                <sphereGeometry/>
                <meshStandardMaterial color="orange"/>
            </mesh>

            <mesh ref={cube} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
                <boxGeometry scale={1.5} />
                <meshStandardMaterial color="mediumpurple"/>
            </mesh>
        </group>

        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry/>
            <meshStandardMaterial color="greenyellow"/>
        </mesh>

        <CustomObject/>
    </>
}