import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";  // Added 'motion' to the imports

const COLORS_TOP = ["#B447C3"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  // Use state to control opacity for Canvas
  const [canvasOpacity, setCanvasOpacity] = useState(0);

  useEffect(() => {
    // Reset opacity to 0 then fade to 1 on mount
    setCanvasOpacity(0);
    const timeoutId = setTimeout(() => setCanvasOpacity(1), 50); // delay to ensure it applies post-mount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <motion.section
      style={{
        backgroundImage,
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Canvas style={{ width: '100%', height: '100%', opacity: canvasOpacity, transition: 'opacity 1.5s' }}>
        <Stars radius={50} count={2500} factor={4} fade speed={2} />
      </Canvas>
    </motion.section>
  );
};
