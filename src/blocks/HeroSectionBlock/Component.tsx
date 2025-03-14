'use client'

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import Image from 'next/image'
import type { HeroSectionBlock as HeroSectionBlockProps } from '@/payload-types'

const MotionDiv = motion.div

export const HeroSectionBlock: React.FC<
  HeroSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const {
    id,
    title,
    description,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    image,
  } = props

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      id={`block-${id}`}
      style={{ zIndex: 0 }}
    >
      {image && (
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            alt={
              typeof image === 'object'
                ? image.alt ||
                  'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová - úvodní obrázek'
                : 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová - úvodní obrázek'
            }
            className="object-cover w-full h-full"
            src={typeof image === 'object' && image.url ? image.url : ''}
            fill
            priority={true}
            quality={90}
            sizes="100vw"
            fetchPriority="high"
            loading="eager"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5jYI2iwAAAABJRU5ErkJggg=="
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary/60 via-[#f8a683]/50 to-primary/40 mix-blend-lighten"
            aria-hidden="true"
          />
        </div>
      )}

      <div
        id="uvod"
        className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl pt-32 pb-16 md:pt-40 md:pb-24"
      >
        <div className="grid gap-8 lg:grid-cols-[5fr_3fr] lg:gap-16 items-center">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-xl z-0 radial-gradient-backdrop"
              style={{
                background:
                  'radial-gradient(circle, rgba(248, 166, 131, 0.75) 0%, transparent 100%)',
                transform: 'translateY(10%)',
                width: '130%',
                height: '130%',
                left: '-15%',
                top: '-25%',
                borderRadius: '50%',
                filter: 'blur(32px)',
              }}
              aria-hidden="true"
            />
            <style jsx>{`
              @media (max-width: 1024px) {
                .radial-gradient-backdrop {
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  transform: none;
                }
              }
            `}</style>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative flex flex-col justify-center space-y-6 text-center lg:text-left lg:max-w-2xl z-10"
            >
              <div className="space-y-4">
                <AnimatedGradientText
                  as="h1"
                  className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none"
                  colorFrom="#1e293b"
                  colorTo="#334155"
                >
                  {title}
                </AnimatedGradientText>
                <div className="max-w-[600px] text-slate-800 md:text-xl my-4 space-y-4 mx-auto lg:mx-0">
                  {description?.split('\n\n').map((paragraph, index) => (
                    <p
                      key={`para-${index}-${paragraph.substring(0, 10).replace(/\s+/g, '')}`}
                      className="leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  )) || <p>Popis není k dispozici</p>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {primaryButtonText && primaryButtonLink && (
                  <Button
                    size="lg"
                    variant="ripple"
                    rippleColor="hsl(var(--primary) / 0.25)"
                    onClick={() => (window.location.href = primaryButtonLink)}
                    className="bg-primary/70 text-slate-800 hover:bg-primary/80 border-primary/30 hover:!text-slate-800"
                  >
                    {primaryButtonText}
                  </Button>
                )}
                {secondaryButtonText && secondaryButtonLink && (
                  <Button
                    size="lg"
                    variant="ripple"
                    rippleColor="hsl(var(--secondary) / 0.25)"
                    onClick={() => (window.location.href = secondaryButtonLink)}
                    className="bg-secondary/70 backdrop-blur-sm border-secondary/30 text-slate-800 hover:bg-secondary/80 hover:!text-slate-800 hover:!from-secondary/5 hover:!to-secondary/10 hover:!border-secondary/30"
                  >
                    {secondaryButtonText}
                  </Button>
                )}
              </div>
            </MotionDiv>
          </div>

          {image && (
            <Suspense
              fallback={
                <div className="w-full bg-white/10 animate-pulse rounded-2xl backdrop-blur-sm" />
              }
            >
              <MotionDiv
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                className="hidden lg:block relative mx-auto"
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    alt={
                      typeof image === 'object'
                        ? image.alt ||
                          'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová - úvodní obrázek'
                        : 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová - úvodní obrázek'
                    }
                    className="object-cover w-full h-full"
                    src={typeof image === 'object' && image.url ? image.url : ''}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={80}
                    style={{
                      objectPosition: 'center',
                    }}
                  />
                </div>
              </MotionDiv>
            </Suspense>
          )}
        </div>
      </div>
    </section>
  )
}
