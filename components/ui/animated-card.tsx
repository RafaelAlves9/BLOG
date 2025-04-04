"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  hoverScale?: number
  hoverRotate?: boolean
  glowOnHover?: boolean
}

export function AnimatedCard({
  children,
  className = "",
  hoverScale = 1.03,
  hoverRotate = true,
  glowOnHover = true,
}: AnimatedCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={{
        scale: hoverScale,
        zIndex: 10,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onMouseMove={hoverRotate ? handleMouseMove : undefined}
      style={
        hoverRotate
          ? {
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      animate={
        hoverRotate
          ? {
              rotateY: mousePosition.x / 20,
              rotateX: -mousePosition.y / 20,
            }
          : undefined
      }
    >
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 opacity-0 rounded-lg"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {children}
    </motion.div>
  )
}

