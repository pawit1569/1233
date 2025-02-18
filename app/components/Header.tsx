'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='fixed top-0 left-0 z-50 w-full py-4'
    >
      <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-32'>
        <motion.nav 
          whileHover={{ scale: 1.01 }}
          className='flex flex-col items-center gap-2 bg-black/20 backdrop-blur-xl rounded-lg p-3 shadow-lg border border-white/20 w-full'
        >
          <div className='flex items-center justify-between w-full'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='text-[#87cefa] text-lg md:text-xl lg:text-2xl font-bold font-sukhumvitSemiBold bg-gradient-to-r from-[#87cefa] to-[#1e90ff] bg-clip-text text-transparent cursor-pointer'
            >
              Congrets.me
            </motion.div>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  )
}