import { Suspense, useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { optimizeThreeJsPerformance } from '../utils/performance';

const SimpleBox = () => {
  // Use refs for better performance
  const meshRef = useRef();
  const lightRef = useRef();

  // Optimize animations with useFrame
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Smooth rotation animation
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  // Memoize geometry and material for better performance
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(2, 2, 2), []);
  const boxMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#4169e1",
    roughness: 0.5,
    metalness: 0.2
  }), []);

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        ref={lightRef}
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={256} // Further reduced for performance
      />
      <pointLight intensity={0.8} position={[0, 5, 5]} />

      {/* Simple 3D box */}
      <group position={[0, 0, 0]}>
        <mesh
          ref={meshRef}
          receiveShadow
          castShadow
          geometry={boxGeometry}
          material={boxMaterial}
        />
      </group>
    </mesh>
  );
};

// Renderer component to optimize Three.js performance
const Renderer = ({ children }) => {
  const rendererRef = useRef();

  useEffect(() => {
    if (rendererRef.current) {
      optimizeThreeJsPerformance(rendererRef.current);
    }
  }, []);

  return children;
};

// Loading fallback component
const LoadingFallback = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-blue-900 to-black">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

const Experience = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef();

  // Debounced resize handler
  const handleResize = useMemo(() => {
    return () => {
      setIsMobile(window.innerWidth < 768);
    };
  }, []);

  useEffect(() => {
    // Check if device is mobile
    handleResize();

    // Add debounced event listener
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);

    // Set loaded state after a delay
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
      clearTimeout(loadTimer);
    };
  }, [handleResize]);

  // If mobile, show a simpler version
  if (isMobile) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-blue-900 to-black">
        {/* Simplified background for mobile */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 relative">
            <div className="absolute w-full h-full bg-blue-500 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {/* Main 3D scene - only on desktop */}
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [3, 3, 5], fov: 25 }}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          antialias: false, // Disable antialiasing for performance
          alpha: true,
          stencil: false, // Disable stencil buffer for performance
          depth: true,
        }}
        className="w-full h-full"
        dpr={[1, 1.5]} // Limit pixel ratio for better performance
        performance={{ min: 0.5 }} // Allow frame rate to drop for better performance
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000020), 0);
        }}
      >
        <Renderer>
          <Suspense fallback={<LoadingFallback />}>
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 4}
            />
            <SimpleBox />
            <Preload all />
          </Suspense>
        </Renderer>
      </Canvas>
    </div>
  );
};

export default Experience;
