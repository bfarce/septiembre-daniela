import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PETAL_COUNT = 22;

function PetalField() {
  const group = useRef<THREE.Group>(null);
  const petals = useMemo(() => Array.from({ length: PETAL_COUNT }, (_, i) => ({
    x: ((i * 37) % 29) / 2.4 - 6,
    y: ((i * 53) % 31) / 2.2 - 3,
    z: ((i * 19) % 17) / 2 - 5,
    speed: 0.1 + (i % 5) * 0.025,
    spin: (i % 2 ? 1 : -1) * (0.12 + (i % 4) * 0.04),
    scale: 0.09 + (i % 4) * 0.025,
  })), []);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.08, 1 - Math.exp(-2 * delta));
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.04, 1 - Math.exp(-2 * delta));
      group.current.children.forEach((child, i) => {
        const petal = petals[i];
        if (!petal) return;
        child.position.y -= petal.speed * delta;
        child.rotation.x += petal.spin * delta;
        child.rotation.z += petal.spin * 0.7 * delta;
        child.position.x += Math.sin(state.clock.elapsedTime * 0.45 + i) * 0.002;
        if (child.position.y < -4) child.position.y = 6;
      });
    }
  });

  return (
    <group ref={group}>
      {petals.map((petal, index) => (
        <mesh key={index} position={[petal.x, petal.y, petal.z]} rotation={[index, 0, index / 3]} scale={petal.scale}>
          <sphereGeometry args={[1, 5, 3, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color={index % 3 === 0 ? "#e7b8bd" : "#f5d9d8"} roughness={0.62} clearcoat={0.15} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function AmbientPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-80" aria-hidden="true">
      <Canvas dpr={[1, 1.35]} camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: false, alpha: true }}>
        <ambientLight intensity={1.3} />
        <directionalLight position={[4, 6, 5]} intensity={2} color="#fff5e7" />
        <Environment resolution={64}>
          <Lightformer intensity={1.5} position={[0, 5, 2]} scale={[8, 8, 1]} />
        </Environment>
        <PetalField />
      </Canvas>
    </div>
  );
}
