'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

interface Milestone {
  date: string
  title: string
  description: string 
}

export default function CountdownTimer({ targetDate, milestones }: { 
  targetDate: string
  milestones?: Milestone[]
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)
  const [progress, setProgress] = useState(100)
  const [showMilestones, setShowMilestones] = useState(false)
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference < 0) {
        setIsExpired(true)
        clearInterval(timer)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        return
      }

      const totalDuration = new Date(targetDate).getTime() - new Date().getTime()
      const progressPercent = (difference / totalDuration) * 100
      setProgress(progressPercent)

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      })

      if (milestones) {
        const nextMilestone = milestones.find(m => {
          const mDate = new Date(m.date).getTime()
          return mDate > now && mDate - now < 1000 * 60 * 60 * 24
        })
        if (nextMilestone && nextMilestone !== currentMilestone) {
          setCurrentMilestone(nextMilestone)
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, milestones, currentMilestone])

  if (isExpired) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-[#1e90ff] animate-bounce px-4 text-center"
      >
        Congratulations! 🎓
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 w-full px-4 max-w-7xl mx-auto"
    >
      {currentMilestone && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1e90ff]/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-[#1e90ff] text-sm sm:text-base font-medium mb-2 sm:mb-4 text-center"
        >
          Coming up: {currentMilestone.title}
        </motion.div>
      )}

      <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 bg-black/20 backdrop-blur-xl rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-2xl border border-white/20 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-full">
          {Object.entries(timeLeft).map(([key, value]) => (
            <motion.div 
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex flex-col items-center p-2 sm:p-3 md:p-4 lg:p-6 bg-gradient-to-br from-[#1e90ff]/5 to-[#1e90ff]/20 backdrop-blur-lg rounded-lg shadow-xl border border-[#87cefa]/20"
            >
              <div className="text-lg sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-br from-[#ffffff] via-[#87cefa] to-[#1e90ff] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {String(value).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-[#87cefa] font-medium capitalize mt-1 sm:mt-2 opacity-80">
                {key}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="w-full h-1.5 sm:h-2 md:h-3 bg-[#16328c]/10 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#87cefa] via-[#1e90ff] to-[#0066cc] shadow-lg"
            style={{ width: `${progress}%` }}
            animate={{ filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          <div className="text-xs sm:text-sm md:text-base lg:text-lg text-[#87cefa] font-medium bg-[#1e90ff]/5 px-3 sm:px-4 md:px-6 py-2 rounded-full backdrop-blur-md border border-[#87cefa]/20 text-center">
            {new Date(targetDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          {milestones && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMilestones(!showMilestones)}
              className="text-xs sm:text-sm text-[#87cefa] hover:text-[#1e90ff] transition-colors"
            >
              {showMilestones ? 'Hide' : 'Show'} Milestones
            </motion.button>
          )}
        </div> 
      </div>
    </motion.div>
  )
}