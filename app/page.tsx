'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import Flag from './components/Flag'
import CountdownTimer from './components/CountdownTimer'
import Footer from './components/Footer'
import Header from './components/Header'


export default function Home() {
  return (
    <>
      {/* ---------- flag bg ---------- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw', 
          height: '100vh',
          zIndex: -99,
          pointerEvents: 'none'
        }}
      >
        <Canvas>
          <ambientLight intensity={0.8} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={3}
            castShadow
          />
          <Flag />
        </Canvas>
      </motion.div>
      {/* ---------- flag bg ---------- */}

      {/* ---------- Header ---------- */}
      <Header />

      {/* ---------- content ---------- */}
      <div className="h-screen w-screen flex flex-col items-center justify-center font-sukhumvit">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e90ff] mb-8 text-center px-4"
        >
          ปัจฉิมนิเทศ นักศึกษาแล้วนะ
          <br />
          <span className="text-base md:text-lg lg:text-xl opacity-80 bg-gradient-to-r from-white to-[#1e90ff] bg-clip-text text-transparent">
            เราจะจบกันเเล้วนะมีอะไรอยากจะบอกมากๆเลยนะ
          </span>
        </motion.h1>
        
        <CountdownTimer 
          targetDate="2025-02-21" 
        />
      </div>


      {/* ---------- Footer ---------- */}
      <Footer />
    </>
  )
}