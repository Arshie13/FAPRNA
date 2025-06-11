"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface PageTransitionProps {
  children: React.ReactNode
  title: string
}

export default function PageTransition({ children, title }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true)
    }, 2000)

    const timer2 = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  if (isLoading) {
    return (
      <div
        className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <h1
            className="text-4xl md:text-6xl font-serif font-light tracking-[0.2em] animate-pulse bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FFD700 0%, #FFA500 15%, #FFD700 30%, #DAA520 45%, #FFD700 60%, #B8860B 75%, #FFD700 90%, #FFA500 100%)",
              textShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
