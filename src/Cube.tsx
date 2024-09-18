import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CustomBox = () => {
  const mesh = useRef<THREE.Mesh>(null);

  // Create custom BufferGeometry
  const geometry = new THREE.BufferGeometry();

  // Define vertices of the box (8 vertices for a cube)
  const vertices = new Float32Array([
    -1, -1, -1,
    1, -1, -1,
    1, 1, -1,
    -1, 1, -1,
    -1, -1, 1,
    1, -1, 1,
    1, 1, 1,
    -1, 1, 1,
  ]);

  // Define indices to form 12 triangles (6 faces)
  const indices = [
    0, 1, 2, 2, 3, 0, // front face
    4, 5, 6, 6, 7, 4, // back face
    0, 1, 5, 5, 4, 0, // bottom face
    2, 3, 7, 7, 6, 2, // top face
    0, 3, 7, 7, 4, 0, // left face
    1, 2, 6, 6, 5, 1, // right face
  ];

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals(); // Computes normals for shading

  // Rotate the mesh every frame
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial attach="material" color="orange" />
    </mesh>
  );
};

const DrawTheCube = () => {
  return (
    // dont forget fill the background
    <Canvas style={{ height: '100vh'}}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CustomBox />
    </Canvas>
  );
};

export default DrawTheCube;
