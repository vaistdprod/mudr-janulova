'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Image from 'next/image'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BorderBeam } from '@/components/ui/border-beam'
import type { TeamSectionBlock as TeamSectionBlockProps } from '@/payload-types'

export const TeamSectionBlock: React.FC<
  TeamSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, description, teamMembers } = props

  return (
    <section className="py-16" id={`block-${id}`}>
      <div id="nas-tym" className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center">
            <User className="w-8 h-8 mr-2" />
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-4 -mb-4"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers?.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-lg shadow-xs"
            >
              <div className="relative overflow-hidden aspect-3/4 rounded-t-lg">
                <Image
                  src={
                    typeof member.image === 'object' && member.image?.url ? member.image.url : ''
                  }
                  alt={
                    typeof member.image === 'object' && member.image?.alt
                      ? member.image.alt
                      : `${member.title} - ${member.role || 'Člen týmu'} - Dětská ordinace Zbiroh`
                  }
                  width={300}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  loading={index < 3 ? 'eager' : 'lazy'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={index < 3 ? 90 : 85} // Higher quality for first three team members
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5jYI2iwAAAABJRU5ErkJggg=="
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  style={{
                    maxWidth: '100%',
                    height: '100%',
                    willChange: 'transform',
                  }}
                  onLoad={(e) => {
                    if (e.target) {
                      const img = e.target as HTMLImageElement
                      img.setAttribute('data-loaded', 'true')
                      img.classList.add('img-loaded')
                    }
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="relative p-4 bg-card rounded-b-lg overflow-hidden">
                <h3 className="text-xl font-semibold">{member.title}</h3>
                <p className="text-primary font-medium">{member.role}</p>
                <p className="mt-2 text-muted-foreground">{member.description}</p>
              </div>
              <BorderBeam
                duration={30}
                size={600}
                className="from-transparent via-rose-200 to-transparent"
              />
              <BorderBeam
                duration={30}
                delay={15}
                size={600}
                className="from-transparent via-rose-200 to-transparent"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
