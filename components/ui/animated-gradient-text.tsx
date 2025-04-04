"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
  text: string
  className?: string
  from?: string
  via?: string
  to?: string
  animate?: boolean
  duration?: number
}

export function AnimatedGradientText({
  text,
  className,
  from = "from-cyan-400",
  via = "via-blue-500",
  to = "to-purple-600",
  animate = true,
  duration = 5,
}: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={cn("bg-gradient-to-r bg-clip-text text-transparent", from, via, to, className)}
      style={{
        backgroundSize: animate ? "200% 200%" : "100% 100%",
      }}
      animate={
        animate
          ? {
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }
          : undefined
      }
      transition={
        animate
          ? {
              duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }
          : undefined
      }
    >
      {text}
    </motion.span>
  )
}

