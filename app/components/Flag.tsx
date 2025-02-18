'use client'
import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Plane, GradientTexture, useTexture } from '@react-three/drei'

export default function Flag() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [opacity, setOpacity] = useState(0)
  const [hovered, setHovered] = useState(false)
  
  
  useEffect(() => {
    const fadeIn = setTimeout(() => setOpacity(1), 0)
    return () => clearTimeout(fadeIn)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.getElapsedTime()
    const geometry = meshRef.current.geometry
    const position = geometry.attributes.position
    const colors = new Float32Array(position.count * 3)
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i)
      const y = position.getY(i)
      
      // เพิ่มความซับซ้อนของการเคลื่อนไหว
      const waveX = 0.4 * Math.sin(x * 1.5 + time * 2)
      const waveY = 0.2 * Math.sin(y * 2 + time * 2)
      const waveZ = 0.1 * Math.cos(x * 3 + y * 2 + time)
      
      const z = waveX + waveY + waveZ
      position.setZ(i, z * (hovered ? 1.5 : 1))
      
      // ปรับสีให้มีมิติมากขึ้น
      const colorIntensity = (z + 0.6) / 1.2
      const shimmer = Math.sin(time * 3 + x * 10 + y * 10) * 0.1
      colors[i * 3] = 0.12 + colorIntensity * 0.2 + shimmer
      colors[i * 3 + 1] = 0.56 + colorIntensity * 0.3 + shimmer
      colors[i * 3 + 2] = 1 - colorIntensity * 0.3 + shimmer
    }
    
    position.needsUpdate = true
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  })

  return (
    <Plane
      ref={meshRef}
      args={[20, 3, 196, 32]}
      rotation={[-0.7, 0.5, -0.12]}
      position={[0, 0.2, 2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshPhysicalMaterial 
        vertexColors={true}
        color="#1e90ff"
        emissive="#6884d9"
        emissiveIntensity={0.3}
        side={2}
        roughness={0.2}
        metalness={0.3}
        clearcoat={1}
        clearcoatRoughness={0.2}
        envMapIntensity={2}
        transparent={true}
        opacity={opacity}
        normalScale={new THREE.Vector2(0.5, 0.5)}
      >
        <GradientTexture
          stops={[0, 0.3, 0.7, 1]}
          colors={['#ffffff', '#87cefa', '#1e90ff', '#16328c']}
          attach="map"
        />
      </meshPhysicalMaterial>
    </Plane>
  )
} 