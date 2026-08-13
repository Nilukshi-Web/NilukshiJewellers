'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Gem, X, ZoomIn, ZoomOut } from 'lucide-react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = {
  available: boolean
  images: MediaType[]
  name: string
}

const MAX_ZOOM = 3
const CENTRE = { x: 50, y: 50 }

/**
 * Stacked product gallery: the first image runs full width with the rest tiled
 * beneath it, so the column scrolls past the (sticky) product details. Clicking
 * any image opens it in a lightbox that can be paged through and zoomed into.
 */
export const ProductGallery: React.FC<Props> = ({ available, images, name }) => {
  const [lightbox, setLightbox] = useState<null | number>(null)
  const [zoom, setZoom] = useState(1)
  // Point the zoom is anchored to, in % of the frame — follows the pointer.
  const [origin, setOrigin] = useState(CENTRE)
  const triggers = useRef<Array<HTMLButtonElement | null>>([])
  const closeButton = useRef<HTMLButtonElement>(null)

  const count = images.length
  const isOpen = lightbox !== null
  const isZoomed = zoom > 1

  const resetZoom = useCallback(() => {
    setZoom(1)
    setOrigin(CENTRE)
  }, [])

  const close = useCallback(() => {
    if (lightbox !== null) triggers.current[lightbox]?.focus()
    setLightbox(null)
    resetZoom()
  }, [lightbox, resetZoom])

  const step = useCallback(
    (delta: number) => {
      setLightbox((current) => (current === null ? current : (current + delta + count) % count))
      resetZoom()
    },
    [count, resetZoom],
  )

  const changeZoom = useCallback((delta: number) => {
    setZoom((current) => {
      const next = Math.min(MAX_ZOOM, Math.max(1, current + delta))
      if (next === 1) setOrigin(CENTRE)
      return next
    })
  }, [])

  /** Anchor the zoom to wherever the pointer is over the frame. */
  const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    // Touch and pen only pan while dragging; a mouse pans on hover.
    if (event.pointerType !== 'mouse' && event.buttons === 0) return

    const rect = event.currentTarget.getBoundingClientRect()
    setOrigin({
      x: Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100)),
      y: Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100)),
    })
  }

  const toggleZoom = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isZoomed) {
      resetZoom()
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    setOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
    setZoom(2)
  }

  // Keyboard control and background scroll lock, only while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
      if (event.key === '+' || event.key === '=') changeZoom(1)
      if (event.key === '-' || event.key === '_') changeZoom(-1)
      if (event.key === '0') resetZoom()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    closeButton.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, close, step, changeZoom, resetZoom])

  if (count === 0) {
    return (
      <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand to-sage text-wine">
        <Gem size={32} strokeWidth={1} />
        <span className="font-serif">{name}</span>
      </div>
    )
  }

  const [lead, ...rest] = images
  const current = lightbox === null ? null : images[lightbox]

  const imageButton = (image: MediaType, index: number, className: string, sizes: string) => (
    <button
      aria-label={`View image ${index + 1} of ${count} in full screen`}
      className={cn('group relative block w-full cursor-zoom-in overflow-hidden bg-sand', className)}
      key={image.id ?? index}
      onClick={() => setLightbox(index)}
      ref={(node) => {
        triggers.current[index] = node
      }}
      type="button"
    >
      <Media
        alt={`${name} — image ${index + 1}`}
        fill
        imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        priority={index === 0}
        resource={image}
        size={sizes}
      />
      {index === 0 && !available && (
        <span className="absolute left-4 top-4 bg-ink px-3 py-1.5 text-[0.7rem] uppercase tracking-widest text-white">
          Sold Out
        </span>
      )}
    </button>
  )

  return (
    <div className="flex flex-col gap-3">
      {imageButton(lead!, 0, 'aspect-[4/5]', '(max-width: 1024px) 100vw, 50vw')}

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {rest.map((image, i) =>
            imageButton(image, i + 1, 'aspect-square', '(max-width: 1024px) 50vw, 25vw'),
          )}
        </div>
      )}

      {isOpen && current && (
        <div
          aria-label={`${name} image ${lightbox + 1} of ${count}`}
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95"
          onClick={close}
          role="dialog"
        >
          <div
            className="absolute right-4 top-4 z-10 flex items-center gap-1"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Zoom out"
              className="flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white disabled:opacity-30 disabled:hover:text-white/80"
              disabled={zoom === 1}
              onClick={() => changeZoom(-1)}
              type="button"
            >
              <ZoomOut size={22} strokeWidth={1.4} />
            </button>
            <button
              aria-label="Zoom in"
              className="flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white disabled:opacity-30 disabled:hover:text-white/80"
              disabled={zoom === MAX_ZOOM}
              onClick={() => changeZoom(1)}
              type="button"
            >
              <ZoomIn size={22} strokeWidth={1.4} />
            </button>
            <button
              aria-label="Close"
              className="flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
              onClick={close}
              ref={closeButton}
              type="button"
            >
              <X size={26} strokeWidth={1.4} />
            </button>
          </div>

          {count > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white md:left-6"
                onClick={(event) => {
                  event.stopPropagation()
                  step(-1)
                }}
                type="button"
              >
                <ChevronLeft size={30} strokeWidth={1.4} />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white md:right-6"
                onClick={(event) => {
                  event.stopPropagation()
                  step(1)
                }}
                type="button"
              >
                <ChevronRight size={30} strokeWidth={1.4} />
              </button>
            </>
          )}

          {/* Click zooms rather than closing, so the click must not reach the backdrop. */}
          <div
            className={cn(
              'relative h-[82vh] w-[92vw] max-w-5xl touch-none overflow-hidden',
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in',
            )}
            onClick={(event) => {
              event.stopPropagation()
              toggleZoom(event)
            }}
            onPointerMove={trackPointer}
          >
            {/* Only `transform` transitions — `transform-origin` is not animated,
                so panning tracks the pointer instantly while zoom steps ease. */}
            <div
              className="relative h-full w-full transition-transform duration-200"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: `${origin.x}% ${origin.y}%`,
              }}
            >
              <Media
                alt={`${name} — image ${lightbox + 1}`}
                fill
                imgClassName="object-contain"
                priority
                resource={current}
                size="(max-width: 1024px) 92vw, 80vw"
              />
            </div>
          </div>

          <div className="absolute bottom-6 flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-white/70">
            {count > 1 && (
              <span>
                {lightbox + 1} / {count}
              </span>
            )}
            <span className="hidden sm:inline">
              {isZoomed ? `${zoom}× — move to pan, click to reset` : 'Click image to zoom'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
