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
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white tracking-[0.2em] animate-pulse">
            {title}
          </h1>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
