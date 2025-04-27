import { Suspense, useEffect, useState } from 'react';
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
        shadow-mapSize={512} // Reduced for mobile
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // If mobile, show a simpler version or nothing
  if (isMobile) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-blue-900 to-black">
        {/* Simplified background for mobile */}
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {/* Main 3D scene - only on desktop */}
      <Canvas
        shadows
        camera={{ position: [3, 3, 5], fov: 25 }}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          antialias: false, // Disable antialiasing for performance
        }}
        className="w-full h-full"
        dpr={[1, 1.5]} // Limit pixel ratio for better performance
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
