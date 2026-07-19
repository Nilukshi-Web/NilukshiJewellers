import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContactChannelsBlock } from '@/blocks/ContactChannels/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CustomCommissionBlock } from '@/blocks/CustomCommission/Component'
import { FeaturedProductsBlock } from '@/blocks/FeaturedProducts/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroCarouselBlock } from '@/blocks/HeroCarousel/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MetalShowcaseBlock } from '@/blocks/MetalShowcase/Component'
import { ProductCatalogBlock } from '@/blocks/ProductCatalog/Component'
import { PromoStripBlock } from '@/blocks/PromoStrip/Component'

const blockComponents = {
  archive: ArchiveBlock,
  contactChannels: ContactChannelsBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  customCommission: CustomCommissionBlock,
  featuredProducts: FeaturedProductsBlock,
  formBlock: FormBlock,
  heroCarousel: HeroCarouselBlock,
  mediaBlock: MediaBlock,
  metalShowcase: MetalShowcaseBlock,
  productCatalog: ProductCatalogBlock,
  promoStrip: PromoStripBlock,
}

// Full-bleed blocks manage their own spacing and background
const fullBleedBlocks = ['heroCarousel', 'metalShowcase', 'promoStrip']

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={fullBleedBlocks.includes(blockType) ? '' : 'my-16'} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
