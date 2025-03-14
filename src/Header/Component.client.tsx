// src/Header/Component.client.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import type { Header, Media } from '@/payload-types'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the menu is open and the click is outside the menu
      if (isMobileMenuOpen) {
        const target = event.target as HTMLElement
        const isMenuButton =
          target.closest('button')?.getAttribute('aria-label') === 'Přepnout menu'
        const isInsideMenu = target.closest('.mobile-menu')

        if (!isMenuButton && !isInsideMenu) {
          setIsMobileMenuOpen(false)
        }
      }
    }

    // Add event listener when menu is open
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const navItems = data.navItems || []
  const button = data.button || { label: 'Objednat se', url: '#objednani', type: 'custom' }
  const logo = data.logo as Media | undefined // Logo is now optional

  return (
    <header className="fixed top-0 z-50 w-full border-b border-secondary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity min-w-[48px] flex-shrink-0"
        >
          <Link href="/" className="flex items-center">
            {logo && logo.url ? (
              <Image
                src={logo.url}
                alt="Logo MUDr. Janulová"
                width={144}
                height={36}
                className="object-contain"
                priority
              />
            ) : (
              <div className="w-[144] h-[36] flex items-center justify-center text-primary font-bold">
                MUDr. Miroslava Janulová
              </div>
            )}
          </Link>
        </motion.div>

        <nav className="items-center space-x-6 hidden lg:flex">
          {navItems.map((item, index) => (
            <motion.div
              key={item.link.url}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05, ease: 'easeOut' }}
            >
              <Link
                href={item.link.url || '#'}
                className="text-sm font-medium transition-colors hover:text-secondary whitespace-nowrap"
              >
                {item.link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: navItems.length * 0.05, ease: 'easeOut' }}
          >
            <Button
              variant="ripple"
              size="sm"
              className="bg-primary/10 text-primary hover:bg-primary/15 border-primary/30"
            >
              <Link href={button.url || '#'}>{button.label}</Link>
            </Button>
          </motion.div>
        </nav>

        <div className="flex items-center lg:hidden">
          <Button
            variant="ripple"
            size="sm"
            className="mr-4 bg-primary/10 text-primary hover:bg-primary/15 border-primary/30"
          >
            <Link href={button.url || '#'}>{button.label}</Link>
          </Button>
          <motion.button
            className="cursor-pointer"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Přepnout menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            <span className="sr-only">Přepnout menu</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="top-0 left-0 right-0 z-40 border-b border-secondary/20 shadow-lg lg:hidden mobile-menu relative before:absolute before:inset-0 before:-z-10"
          style={
            {
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
            } as React.CSSProperties
          }
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container px-4 py-4 mx-auto max-w-7xl">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.link.url}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={item.link.url || '#'}
                    className="text-base font-medium transition-colors hover:text-secondary block py-1"
                    onClick={toggleMobileMenu}
                  >
                    {item.link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
