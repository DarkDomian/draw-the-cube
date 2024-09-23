import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';

const DrawTheCube = ({ vertices, cubeColor }: { vertices: number[], cubeColor: string }) => {
  const indices = [
    // Near face
    0, 3, 2, 2, 1, 0,  
    // Far face
    4, 5, 6, 6, 7, 4,  
    // Top face
    3, 7, 6, 6, 2, 3,  
    // Bottom face
    0, 1, 5, 5, 4, 0,  
    // Right face
    1, 2, 6, 6, 5, 1,    
    // Left face
    0, 4, 7, 7, 3, 0
  ];

  // Use useMemo to avoid recalculating geometry on every render
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const verticesArray = new Float32Array(vertices);
    
    geom.setAttribute('position', new THREE.BufferAttribute(verticesArray, 3));
    geom.setIndex(indices);
    geom.center();
    geom.computeVertexNormals();
    
    return geom;
  }, [vertices]); // Only recalculate when vertices change

  const meshRef = useRef<THREE.Mesh>(null!);
  const { camera } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;

      const boundingBox = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));

      // Calculate the size of the object
      const size = new THREE.Vector3();
      boundingBox.getSize(size);
  
      // Calculate the bounding sphere radius (half of the diagonal of the bounding box)
      const boundingSphereRadius = size.length() / 2;
  
      // Set camera distance based on the bounding sphere radius
      const distance = boundingSphereRadius * 2; // The multiplier ensures the camera is equidistant
      camera.position.set(distance, distance, distance);
      camera.lookAt(0, 0, 0); // Ensure the camera looks at the cube
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color={cubeColor} />
    </mesh>
  );
};

const CubeScene = ({ vertices, cubeColor }: { vertices: number[], cubeColor: string}) => {
  return (
    <Canvas>
      <DrawTheCube vertices={vertices} cubeColor={cubeColor} />
      {/* <gridHelper args={[200, 20]} position={[0, -1, 0]} /> */}
      {/* <axesHelper args={[150]} /> */}
      <spotLight position={[1, 1, 1]} angle={Math.PI/2} penumbra={1} color={0xf7f7f7} intensity={0.9} />
      <directionalLight position={[1, 1, 1]} color={0xe8e3e3} intensity={0.5} />
      <hemisphereLight color={0xd0c5c6} groundColor={0xaf7a7d} intensity={1} />
      <ambientLight color={0xdfd4d5} intensity={0.5} />
    </Canvas>
  );
};

export default CubeScene;