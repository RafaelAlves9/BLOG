"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  width?: "fit-content" | "100%"
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  distance?: number
}

export function ScrollReveal({
  children,
  width = "fit-content",
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  distance = 50,
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.3 })

  const getDirection = () => {
    switch (direction) {
      case "up":
        return { y: distance }
      case "down":
        return { y: -distance }
      case "left":
        return { x: distance }
      case "right":
        return { x: -distance }
      default:
        return { y: distance }
    }
  }

  return (
    <div ref={ref} style={{ width, overflow: "hidden" }} className={className}>
      <motion.div
        initial={{ opacity: 0, ...getDirection() }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...getDirection() }}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}

