import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';

function HeartBox({ isAnimating }: { isAnimating: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && isAnimating) {
      meshRef.current.rotation.y += 0.05;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Add shake animation when opening
      if (isAnimating) {
        meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 20) * 0.05;
        meshRef.current.scale.set(
          1 + Math.sin(state.clock.elapsedTime * 10) * 0.1,
          1 + Math.sin(state.clock.elapsedTime * 10) * 0.1,
          1 + Math.sin(state.clock.elapsedTime * 10) * 0.1
        );
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={isAnimating ? 1.2 : 1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#FFB6C1" metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

function Particles({ isAnimating, particleColor = '#FFB6C1' }: { isAnimating: boolean; particleColor?: string }) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = isAnimating ? 2000 : 1000;
  
  useFrame((state) => {
    if (particlesRef.current && isAnimating) {
      particlesRef.current.rotation.y += 0.01;
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.02;
        
        // Add explosion effect during animation
        if (isAnimating) {
          const distance = Math.sqrt(
            positions[i] * positions[i] +
            positions[i + 1] * positions[i + 1] +
            positions[i + 2] * positions[i + 2]
          );
          const force = (5 - distance) * 0.05;
          positions[i] += (positions[i] / distance) * force;
          positions[i + 1] += (positions[i + 1] / distance) * force;
          positions[i + 2] += (positions[i + 2] / distance) * force;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={particleCount}
          array={new Float32Array(particleCount * 3).map(() => (Math.random() - 0.5) * 10)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color={particleColor} 
        transparent 
        opacity={isAnimating ? 0.8 : 0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function GachaScene() {
  const { isAnimating, selectedReward } = useGameStore();

  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <spotLight position={[0, 5, 0]} intensity={0.5} />
      
      <Suspense fallback={null}>
        <HeartBox isAnimating={isAnimating} />
        <Particles 
          isAnimating={isAnimating} 
          particleColor={selectedReward?.animation.particleColor || '#FFB6C1'} 
        />
      </Suspense>
    </Canvas>
  );
}