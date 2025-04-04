"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  speed?: number
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
}

export function AnimatedText({
  text,
  className = "",
  once = false,
  delay = 0,
  speed = 0.05,
  tag = "h1",
}: AnimatedTextProps) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!once) return
    setIsInView(true)
  }, [once])

  const letters = Array.from(text)

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const Tag = tag

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex" }}
      variants={container}
      initial="hidden"
      animate={once ? (isInView ? "visible" : "hidden") : "visible"}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => setIsInView(true)}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className={className}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

