'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed bottom-0 w-full py-4 text-center text-sm text-gray-500 font-sukhumvit"
    >
      <p>
        Made with ❤️ by{' '}
        <a
          href="https://github.com/ZoFirsT"
          target="_blank"
          rel="Thanatcha Saleekongchai"
          className="hover:text-gray-700 transition-colors"
        >
          Thanatcha Saleekongchai
        </a>
      </p>
    </motion.footer>
  )
}
