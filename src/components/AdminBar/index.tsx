'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from 'payload-admin-bar'

import { cn } from '@/utilities/ui'
import { useSelectedLayoutSegments, useRouter } from 'next/navigation'
import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useState } from 'react'

import './index.scss'

import { getClientSideURL } from '@/utilities/getURL'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Stránky',
    singular: 'Stránka',
  },
  aktuality: {
    plural: 'Aktuality',
    singular: 'Aktualita',
  },
  projects: {
    plural: 'Projekty',
    singular: 'Projekt',
  },
}

const Title: React.FC = () => <span>Administrace</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'pages'
  ) as keyof typeof collectionLabels
  const router = useRouter()

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  return (
    <div
      className={cn(baseClass, 'py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Stránky',
            singular: collectionLabels[collection]?.singular || 'Stránka',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
