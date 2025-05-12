import { Suspense, useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { optimizeThreeJsPerformance } from '../utils/performance';

const FloatingSphere = () => {
  // Use refs for better performance
  const groupRef = useRef();
  const sphereRef = useRef();
  const lightRef = useRef();

  // Optimize animations with useFrame
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }

    if (sphereRef.current) {
      // Subtle pulsing effect
      const scale = 1 + Math.sin(clock.getElapsedTime() * 0.8) * 0.05;
      sphereRef.current.scale.set(scale, scale, scale);
    }
  });

  // Memoize geometries and materials for better performance
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1.2, 32, 32), []);
  const sphereMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#3b82f6",
    roughness: 0.2,
    metalness: 0.8,
    envMapIntensity: 0.8
  }), []);

  const ringGeometry = useMemo(() => new THREE.TorusGeometry(2, 0.15, 16, 100), []);
  const ringMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#8b5cf6",
    roughness: 0.3,
    metalness: 0.6,
    transparent: true,
    opacity: 0.7
  }), []);

  return (
    <mesh>
      <ambientLight intensity={0.2} />
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        ref={lightRef}
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.8}
        castShadow
        shadow-mapSize={256} // Reduced for performance
      />
      <pointLight intensity={0.6} position={[5, 5, 5]} color="#3b82f6" />
      <pointLight intensity={0.4} position={[-5, -5, 5]} color="#8b5cf6" />

      {/* Floating 3D elements */}
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Main sphere */}
        <mesh
          ref={sphereRef}
          receiveShadow
          castShadow
          geometry={sphereGeometry}
          material={sphereMaterial}
        />

        {/* Decorative ring */}
        <mesh
          receiveShadow
          castShadow
          geometry={ringGeometry}
          material={ringMaterial}
          rotation={[Math.PI / 2, 0, 0]}
        />

        {/* Second decorative ring */}
        <mesh
          receiveShadow
          castShadow
          geometry={ringGeometry}
          material={ringMaterial}
          rotation={[Math.PI / 4, Math.PI / 4, 0]}
          scale={0.8}
        />

        {/* Particles effect */}
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 5,
              (Math.random() - 0.5) * 5,
              (Math.random() - 0.5) * 5
            ]}
            scale={0.05 + Math.random() * 0.05}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color={Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6"}
              emissive={Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6"}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
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
              autoRotateSpeed={0.3}
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 4}
            />
            <FloatingSphere />
            <Preload all />
          </Suspense>
        </Renderer>
      </Canvas>
    </div>
  );
};

export default Experience;
