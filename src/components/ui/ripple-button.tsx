'use client'

import { cn } from '@/utilities/ui'
import React, { MouseEvent, useEffect, useState } from 'react'

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string
  duration?: string
}

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      className,
      children,
      rippleColor = 'hsl(var(--primary) / 0.2)',
      duration = '600ms',
      onClick,
      ...props
    },
    ref,
  ) => {
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([])

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event)
      onClick?.(event)
    }

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 1.5 // Slightly larger ripple
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const newRipple = { x, y, size, key: Date.now() }
      setButtonRipples((prevRipples) => [...prevRipples, newRipple])
    }

    useEffect(() => {
      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1]
        const timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple && lastRipple && ripple.key !== lastRipple.key),
          )
        }, parseInt(duration))
        return () => clearTimeout(timeout)
      }
    }, [buttonRipples, duration])

    return (
      <button
        className={cn(
          'relative flex cursor-pointer items-center justify-center overflow-hidden rounded-md',
          className,
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              className="absolute animate-rippling rounded-full opacity-30"
              key={ripple.key}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                transform: `scale(0)`,
                // Apply duration as a CSS variable through style attribute
                ['--duration' as string]: duration,
              }}
            />
          ))}
        </span>
      </button>
    )
  },
)

RippleButton.displayName = 'RippleButton'
