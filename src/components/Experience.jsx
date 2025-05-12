import { Suspense, useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { optimizeThreeJsPerformance } from '../utils/performance';

const FloatingPlanet = () => {
  // Use refs for better performance
  const groupRef = useRef();
  const planetRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();
  const particlesRef = useRef();
  const lightRef = useRef();

  // Optimize animations with useFrame
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(elapsedTime * 0.3) * 0.3;
      groupRef.current.rotation.y = elapsedTime * 0.15;
    }

    if (planetRef.current) {
      // Planet rotation
      planetRef.current.rotation.y = elapsedTime * 0.2;

      // Subtle pulsing effect
      const scale = 1 + Math.sin(elapsedTime * 0.5) * 0.03;
      planetRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef.current) {
      // Independent ring rotation
      ringRef.current.rotation.z = elapsedTime * 0.1;
    }

    if (ring2Ref.current) {
      // Second ring rotation in opposite direction
      ring2Ref.current.rotation.z = -elapsedTime * 0.15;
    }

    if (particlesRef.current) {
      // Rotate particles around the planet
      particlesRef.current.rotation.y = elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;
    }
  });

  // Create a custom shader material for the planet
  const planetMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#3b82f6",
      roughness: 0.2,
      metalness: 0.8,
      envMapIntensity: 1.0,
      emissive: "#1e40af",
      emissiveIntensity: 0.2
    });
  }, []);

  // Create a custom shader material for the rings
  const ringMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#8b5cf6",
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
  }, []);

  // Create a custom shader material for the atmosphere
  const atmosphereMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#60a5fa",
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });
  }, []);

  // Memoize geometries for better performance - reduced polygon count
  const planetGeometry = useMemo(() => new THREE.SphereGeometry(1.2, 32, 32), []);
  const atmosphereGeometry = useMemo(() => new THREE.SphereGeometry(1.5, 32, 32), []);
  const ringGeometry = useMemo(() => new THREE.TorusGeometry(2, 0.15, 16, 50), []);
  const smallRingGeometry = useMemo(() => new THREE.TorusGeometry(2.5, 0.08, 8, 50), []);

  // Generate random stars positions - reduced count for better performance
  const starPositions = useMemo(() => {
    return Array.from({ length: 50 }).map(() => [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ]);
  }, []);

  // Generate random orbital particles - reduced count for better performance
  const orbitalParticles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const angle = (i / 15) * Math.PI * 2;
      const radius = 3 + Math.random() * 0.5;
      return {
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 0.5,
          Math.sin(angle) * radius
        ],
        scale: 0.03 + Math.random() * 0.04,
        color: Math.random() > 0.7 ? "#f472b6" : (Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6")
      };
    });
  }, []);

  return (
    <mesh>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <hemisphereLight intensity={0.2} groundColor="#000033" />
      <spotLight
        ref={lightRef}
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.8}
        castShadow
        shadow-mapSize={256} // Reduced for performance
      />
      <pointLight intensity={0.8} position={[5, 5, 5]} color="#3b82f6" />
      <pointLight intensity={0.5} position={[-5, -5, 5]} color="#8b5cf6" />
      <pointLight intensity={0.3} position={[0, 0, 5]} color="#f472b6" />

      {/* Main group that floats */}
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Planet with atmosphere */}
        <mesh
          ref={planetRef}
          receiveShadow
          castShadow
          geometry={planetGeometry}
          material={planetMaterial}
        >
          {/* Atmosphere layer */}
          <mesh
            geometry={atmosphereGeometry}
            material={atmosphereMaterial}
          />
        </mesh>

        {/* Main decorative ring */}
        <mesh
          ref={ringRef}
          receiveShadow
          castShadow
          geometry={ringGeometry}
          material={ringMaterial}
          rotation={[Math.PI / 2, 0, 0]}
        />

        {/* Second decorative ring */}
        <mesh
          ref={ring2Ref}
          receiveShadow
          castShadow
          geometry={smallRingGeometry}
          material={ringMaterial}
          rotation={[Math.PI / 3, Math.PI / 6, 0]}
          scale={1.1}
        />

        {/* Orbital particles */}
        <group ref={particlesRef}>
          {orbitalParticles.map((particle, i) => (
            <mesh
              key={i}
              position={particle.position}
              scale={particle.scale}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial
                color={particle.color}
                emissive={particle.color}
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Background stars */}
      {starPositions.map((position, i) => (
        <mesh
          key={i}
          position={position}
          scale={0.02 + Math.random() * 0.03}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color={Math.random() > 0.9 ? "#f472b6" : (Math.random() > 0.6 ? "#3b82f6" : "#ffffff")}
            transparent
            opacity={0.8 + Math.random() * 0.2}
          />
        </mesh>
      ))}
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

// Simple fallback component
const SimpleFallback = () => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-900 to-black">
      {/* Empty fallback */}
    </div>
  );
};

const Experience = () => {
  const [isMobile, setIsMobile] = useState(false);
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

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
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
        dpr={[0.8, 1.2]} // Further reduced pixel ratio for better performance
        performance={{ min: 0.3 }} // Allow more frame rate drop for better performance
        onCreated={({ gl }) => {
          try {
            gl.setClearColor(new THREE.Color(0x000020), 0);
          } catch (error) {
            console.error('Error setting clear color:', error);
          }
        }}
      >
        <Renderer>
          <Suspense fallback={<SimpleFallback />}>
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
            <FloatingPlanet />
            <Preload all />
          </Suspense>
        </Renderer>
      </Canvas>
    </div>
  );
};

export default Experience;
