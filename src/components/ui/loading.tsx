"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Component() {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Start fade out after 3 seconds
    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="min-h-screen bg-white flex items-center justify-center px-4"
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-12">
        {/* Logo with rotation animation - responsive sizes */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="relative"
        >
          <Image
            src="/faprna_logo.png"
            alt="FAPRNA Logo"
            width={200}
            height={200}
            className="drop-shadow-lg w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
          />
        </motion.div>

        {/* Company name - no animations, responsive text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-red-500 tracking-wider text-center">
          FAPRNA-NV
        </h1>

        {/* Loading dots - responsive sizes */}
        <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0,
              ease: "easeInOut",
            }}
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.2,
              ease: "easeInOut",
            }}
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-blue-500 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.4,
              ease: "easeInOut",
            }}
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-yellow-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  )
}
