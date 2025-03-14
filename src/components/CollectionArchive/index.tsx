import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardAktualityData } from '@/components/Card'

export type Props = {
  aktuality: CardAktualityData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { aktuality } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {aktuality?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} _relationTo="aktuality" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
