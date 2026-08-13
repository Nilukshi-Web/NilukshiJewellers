'use client'

import React, { useId } from 'react'
import { Search as SearchIcon } from 'lucide-react'

import { cn } from '@/utilities/ui'

type Props = {
  autoFocus?: boolean
  className?: string
  defaultValue?: string
  placeholder?: string
}

/**
 * Product search field. A plain GET form pointing at /search, so it works
 * without JavaScript and leaves the query in a shareable URL.
 */
export const ProductSearch: React.FC<Props> = ({
  autoFocus,
  className,
  defaultValue,
  placeholder = 'Search jewellery, gems, silver…',
}) => {
  const id = useId()

  return (
    <form action="/search" role="search" className={cn('relative', className)}>
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <SearchIcon
        size={15}
        strokeWidth={1.6}
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-bronze"
      />
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus -- only set on the results page, where search is the purpose of the page
        autoFocus={autoFocus}
        className="w-full border-b border-bronze/50 bg-transparent py-1.5 pl-6 pr-2 text-sm placeholder:text-ink/40 focus:border-wine focus:outline-none"
        defaultValue={defaultValue}
        id={id}
        name="q"
        placeholder={placeholder}
        type="search"
      />
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  )
}
