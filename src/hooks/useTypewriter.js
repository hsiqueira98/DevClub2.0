import { useEffect, useRef, useState } from 'react'

/*
 * DevClub's native typewriter hero device (docs/BRAND.md): cycles role
 * names character by character. The blinking cursor is a separate
 * element (CSS animation), matching the terminal-cursor kicker device.
 * Under prefers-reduced-motion the first word renders statically.
 */
const TYPE_MS = 90
const DELETE_MS = 45
const HOLD_MS = 1800

export function useTypewriter(words) {
  const [text, setText] = useState(words[0])
  const state = useRef({ word: 0, len: words[0].length, deleting: false })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let timer
    const tick = () => {
      const s = state.current
      const current = words[s.word]

      if (!s.deleting && s.len === current.length) {
        s.deleting = true
        timer = setTimeout(tick, HOLD_MS)
        return
      }
      if (s.deleting && s.len === 0) {
        s.deleting = false
        s.word = (s.word + 1) % words.length
      }

      s.len += s.deleting ? -1 : 1
      setText(words[s.word].slice(0, s.len))
      timer = setTimeout(tick, s.deleting ? DELETE_MS : TYPE_MS)
    }

    // The first word starts already fully typed, so the opening tick
    // only has to flip into deleting — scheduling it at HOLD_MS made
    // that word hold 2x HOLD_MS before erasing, unlike every later one.
    timer = setTimeout(tick, 0)
    return () => clearTimeout(timer)
  }, [words])

  return text
}
