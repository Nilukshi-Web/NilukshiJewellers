'use client'

import React, { createContext, use, useEffect } from 'react'

import type { ThemeContextType } from './types'

// The AMARÉ storefront is a single, light-only brand theme. We intentionally
// ignore the OS `prefers-color-scheme` and any stored preference so the
// hardcoded cream/wine/ink palette always renders with dark text on light
// backgrounds. (The Payload admin panel keeps its own independent theme.)
const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: 'light',
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Enforce light even if a dark preference lingers in localStorage from
    // an earlier session or the template default.
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  return <ThemeContext value={initialContext}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
