import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';

const SimpleBox = () => {
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />

      {/* Simple 3D box */}
      <group position={[0, 0, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#4169e1" />
        </mesh>
      </group>
    </mesh>
  );
};

const Experience = () => {
  return (
    <div className="w-full h-full">
      {/* Main 3D scene */}
      <Canvas
        shadows
        camera={{ position: [3, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
          <SimpleBox />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default Experience;
