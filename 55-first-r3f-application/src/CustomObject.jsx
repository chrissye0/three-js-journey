import * as THREE from 'three';
import { useEffect, useRef, useMemo } from 'react';

export default function CustomObject() {

    const geometry = useRef();


    const verticesCount = 10 * 3; // 3 vertices for triangles

    // save the positions and prevent the shapes being re-rendered and calculating again and again
    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3); // each vertex has 3 dimensions (x,y,z)

        for (let i = 0; i < verticesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3;
        }

        return positions;
    }, []);

    // compute vertex normals upon first render
    useEffect(() => {
            geometry.current.computeVertexNormals();
    }, []);

    return <mesh>
        <bufferGeometry ref={geometry}>
            {/* attach to geometry.attribute.position */}
            <bufferAttribute
                attach="attributes-position"
                count={verticesCount}
                itemSize={3}
                array={positions}
            />
        </bufferGeometry>
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
}