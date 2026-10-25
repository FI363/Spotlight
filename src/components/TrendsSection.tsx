import { useEffect, useRef, useState } from 'react'
import type {
  FocusEvent as ReactFocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  TouchEvent as ReactTouchEvent
} from 'react'
import './TrendsSection.css'
import trendStores from '../assets/trend_stores.jpg'
import trendLocalSpots from '../assets/trend_local_spots.jpg'
import trendHealthyLiving from '../assets/trend_healthy_living.jpg'
import carousel3 from '../assets/lifestyle_carousel_3.jpg'
import carousel1 from '../assets/lifestyle_carousel_1.jpg'
import carousel2 from '../assets/lifestyle_carousel_2.jpg'

interface TrendCard {
  id: number
  category: string
  title: string
  subtitle: string
  image: string
  /** Flat card surface colour */
  surface: string
  /** Text / button colour on the surface */
  ink: string
  /** Darker shade used for the visible card thickness */
  edge: string
  headline: string
  paragraph1: string
  paragraph2: string
  readTime: string
}

const TREND_CARDS: TrendCard[] = [
  {
    id: 1,
    category: 'JOURNAL',
    title: 'Concept Stores',
    subtitle: 'Curated stories, insights and ideas to keep you inspired.',
    image: trendStores,
    surface: '#f4c54f',
    ink: '#2a1f05',
    edge: '#c9961c',
    headline: 'Curated concept stores redefining modern retail',
    paragraph1: 'Discovering hidden gems in the city where retail meets art. Concept stores are redefining how we shop by offering curated collections of independent designers, vintage finds, and homeware.',
    paragraph2: 'These spaces are community hubs that host workshops, coffee counters, and rotating exhibitions celebrating slow consumption.',
    readTime: '3 MIN READ'
  },
  {
    id: 2,
    category: 'JOURNAL',
    title: 'Local Spots',
    subtitle: 'Ideas for a more creative, conscious and connected tomorrow.',
    image: trendLocalSpots,
    surface: '#a8cda8',
    ink: '#10301a',
    edge: '#6e9c72',
    headline: 'Neighborhood coffee, quiet corners & hidden roasts',
    paragraph1: 'The perfect Saturday morning starts at a local spot. From sun-drenched corner cafes serving single-origin roasts to quiet independent bookstores.',
    paragraph2: 'Supporting local businesses not only sustains the community but brings authenticity to your daily routines.',
    readTime: '4 MIN READ'
  },
  {
    id: 3,
    category: 'JOURNAL',
    title: 'Self Care',
    subtitle: 'Fresh insights, creative ideas and stories from around the world.',
    image: carousel3,
    surface: '#f2afc0',
    ink: '#42101f',
    edge: '#c97790',
    headline: 'The art of slowing down & modern mindfulness',
    paragraph1: 'Self care is creating sustainable daily rituals that ground you—whether ten minutes of morning tea, or disconnecting from screens.',
    paragraph2: 'By prioritizing rest and gentle boundaries, we can cultivate a lifestyle that feels deeply nourishing.',
    readTime: '5 MIN READ'
  },
  {
    id: 4,
    category: 'JOURNAL',
    title: 'Healthy Living',
    subtitle: 'Ideas, perspectives and trends shaping a brighter tomorrow.',
    image: trendHealthyLiving,
    surface: '#a9d0ea',
    ink: '#0b2b42',
    edge: '#6e9fc2',
    headline: 'Nourishing from the inside out with intuitive eating',
    paragraph1: 'Moving away from restrictive diets, the focus is now on intuitive nourishment, seasonal ingredients, and finding joy in preparing a meal.',
    paragraph2: 'Incorporate vibrant, plant-forward recipes and discover movement that feels good for your body.',
    readTime: '4 MIN READ'
  },
  {
    id: 5,
    category: 'JOURNAL',
    title: 'Slow Fashion',
    subtitle: 'People, places and ideas that shape what is next in daily wear.',
    image: carousel1,
    surface: '#ef9864',
    ink: '#3a1606',
    edge: '#c2683a',
    headline: 'Investing in longevity & mindful capsule wardrobes',
    paragraph1: 'Moving away from fast fashion to explore brands that prioritize sustainable materials, ethical production, and timeless silhouettes.',
    paragraph2: 'Building a capsule wardrobe is having pieces that you truly love and will wear for years to come.',
    readTime: '3 MIN READ'
  },
  {
    id: 6,
    category: 'JOURNAL',
    title: 'Workspaces',
    subtitle: 'Designing inspiring spaces where focus meets natural aesthetics.',
    image: carousel2,
    surface: '#cbd27e',
    ink: '#262a06',
    edge: '#99a04a',
    headline: 'Designing the modern desk & creative haven',
    paragraph1: 'The line between home and office has blurred. We look at how to design workspaces that foster creativity without compromising on aesthetics.',
    paragraph2: 'From ergonomic wooden chairs to minimalist desk setups, intentional design helps us work better.',
    readTime: '4 MIN READ'
  }
]

// Physical slab slices that give the card a continuous solid edge (~3.2px thick)
const SLAB_Z_OFFSETS = [-1.6, -0.8, 0, 0.8, 1.6]

/** Time each trend stays in the centre while auto-advancing */
const AUTO_ADVANCE_MS = 5000
/** Duration of the snap after a drag-to-flip release (matches --ease-drawer in CSS) */
const SNAP_MS = 520
/** Horizontal travel before a press on the centre card becomes a rotate drag */
const DRAG_THRESHOLD_PX = 8

const toSentenceCase = (value: string) => value.charAt(0) + value.slice(1).toLowerCase()

/** Apple's momentum projection: where would a flick at this velocity come to rest? */
const projectMomentum = (velocity: number, decelerationRate = 0.99) =>
  ((velocity / 1000) * decelerationRate) / (1 - decelerationRate)

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

interface DragState {
  startX: number
  startY: number
  startAngle: number
  angle: number
  moved: boolean
  flipper: HTMLElement
  samples: { t: number; angle: number }[]
}

/* ---------- Icons (one stroke system) ---------- */

const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {direction === 'left' ? (
      <>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </>
    ) : (
      <>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </>
    )}
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
)

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
)

const FlipIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <polyline points="21 3 21 9 15 9" />
  </svg>
)

export function TrendsSection() {
  const total = TREND_CARDS.length

  const [activeIndex, setActiveIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  // Auto-advance starts off for people who asked the OS for less motion
  const [isPlaying, setIsPlaying] = useState(
    () => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [isHovered, setIsHovered] = useState(false)
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const [isPageVisible, setIsPageVisible] = useState(true)

  const sectionRef = useRef<HTMLElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const suppressClickRef = useRef(false)
  const cardDraggedRef = useRef(false)
  const touchStartX = useRef<number | null>(null)

  const activeCard = TREND_CARDS[activeIndex]

  // Only advance when someone could actually be watching, and nothing else has their attention
  const shouldAdvance =
    isPlaying && !isHovered && !hasKeyboardFocus && !isDragging && !isFlipped && isInView && isPageVisible

  /* ---------- Visibility: pause off-screen and in background tabs ---------- */

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onVisibility = () => setIsPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  /* ---------- Navigation ---------- */

  const goTo = (index: number) => {
    setActiveIndex(((index % total) + total) % total)
    setIsFlipped(false)
  }

  const goPrev = () => goTo(activeIndex - 1)
  const goNext = () => goTo(activeIndex + 1)

  const flipCenter = (e: ReactMouseEvent<HTMLButtonElement>, toBack: boolean) => {
    e.stopPropagation()
    setIsFlipped(toBack)

    // Keyboard activation (detail === 0): move focus to the control on the newly visible face
    if (e.detail === 0) {
      const selector = toBack ? '.is-center .polaroid-back-btn' : '.is-center .polaroid-read-btn'
      requestAnimationFrame(() => {
        sectionRef.current?.querySelector<HTMLButtonElement>(selector)?.focus()
      })
    }
  }

  const handleSlotClick = (index: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    if (index === activeIndex) {
      setIsFlipped((prev) => !prev)
    } else {
      goTo(index)
    }
  }

  /* ---------- Drag-to-flip on the centre card ---------- */

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>, index: number) => {
    suppressClickRef.current = false
    if (e.button !== 0 || index !== activeIndex || dragRef.current) return

    const flipper = e.currentTarget.querySelector<HTMLElement>('.polaroid-flipper')
    if (!flipper) return

    const startAngle = isFlipped ? 180 : 0
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startAngle,
      angle: startAngle,
      moved: false,
      flipper,
      samples: [{ t: e.timeStamp, angle: startAngle }]
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* pointer capture is best-effort */
    }
  }

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return

    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY

    if (!drag.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD_PX) return
      drag.moved = true
      cardDraggedRef.current = true
      drag.flipper.style.transition = 'none'
      setIsDragging(true)
    }

    // 1:1 tracking — written straight to the element, never through React state
    const angle = drag.startAngle + dx * 0.6
    const tilt = clamp(-dy * 0.15, -12, 12)
    drag.angle = angle
    drag.flipper.style.transform = `rotateY(${angle}deg) rotateX(${tilt}deg)`

    drag.samples.push({ t: e.timeStamp, angle })
    while (drag.samples.length > 2 && e.timeStamp - drag.samples[0].t > 100) {
      drag.samples.shift()
    }
  }

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    dragRef.current = null
    if (!drag) return

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }

    if (!drag.moved) return
    suppressClickRef.current = true

    // Velocity over the last ~100ms, in degrees per second
    const first = drag.samples[0]
    const last = drag.samples[drag.samples.length - 1]
    const dt = last.t - first.t
    const velocity = dt > 0 ? ((last.angle - first.angle) / dt) * 1000 : 0

    // Snap to the face nearest the projected resting angle (a flick carries the card over)
    const base = Math.round(drag.angle / 180) * 180
    const projected = drag.angle + projectMomentum(velocity)
    const target = clamp(Math.round(projected / 180) * 180, base - 180, base + 180)
    const endsFlipped = Math.abs(target / 180) % 2 === 1
    const { flipper } = drag

    flipper.style.transition = `transform ${SNAP_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`
    flipper.style.transform = `rotateY(${target}deg) rotateX(0deg)`

    window.setTimeout(() => {
      // Hand control back to the class-driven transform without a visible jump
      flipper.style.transition = 'none'
      flipper.style.transform = `rotateY(${endsFlipped ? 180 : 0}deg)`
      setIsFlipped(endsFlipped)
      setIsDragging(false)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          flipper.style.transform = ''
          flipper.style.transition = ''
        })
      )
    }, SNAP_MS)
  }

  /* ---------- Section-level input ---------- */

  const onTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    cardDraggedRef.current = false
  }

  const onTouchEnd = (e: ReactTouchEvent) => {
    const startX = touchStartX.current
    touchStartX.current = null
    // A drag that rotated the centre card is not also a swipe
    if (startX === null || cardDraggedRef.current) return

    const diffX = e.changedTouches[0].clientX - startX
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) goPrev()
      else goNext()
    }
  }

  const onKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      goNext()
    }
  }

  const onFocus = (e: ReactFocusEvent<HTMLElement>) => {
    // Pause only for keyboard focus; clicking a control should not stop the carousel
    if ((e.target as HTMLElement).matches(':focus-visible')) setHasKeyboardFocus(true)
  }

  const onBlur = (e: ReactFocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHasKeyboardFocus(false)
  }

  /* ---------- Layout of the five visible slots ---------- */

  const getCardStyle = (index: number) => {
    let diff = index - activeIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    const side = diff > 0 ? '' : '-1 * '
    switch (Math.abs(diff)) {
      case 0:
        return { diff, style: { transform: 'translate3d(0, 0, 40px) scale(1) rotateY(0deg)', zIndex: 10, opacity: 1 } }
      case 1:
        return {
          diff,
          style: {
            transform: `translate3d(calc(${side}var(--slot-1)), 0, -20px) scale(0.84) rotateY(${diff > 0 ? -8 : 8}deg)`,
            zIndex: 7,
            opacity: 0.92
          }
        }
      case 2:
        return {
          diff,
          style: {
            transform: `translate3d(calc(${side}var(--slot-2)), 0, -70px) scale(0.7) rotateY(${diff > 0 ? -14 : 14}deg)`,
            zIndex: 5,
            opacity: 0.55
          }
        }
      default:
        return {
          diff,
          style: {
            transform: `translate3d(calc(${side}var(--slot-off)), 0, -140px) scale(0.5) rotateY(${diff > 0 ? -22 : 22}deg)`,
            zIndex: 2,
            opacity: 0,
            pointerEvents: 'none' as const
          }
        }
    }
  }

  return (
    <section
      ref={sectionRef}
      className="trends-carousel-section"
      aria-roledescription="carousel"
      aria-labelledby="trends-title"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setIsHovered(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setIsHovered(false)}
    >
      <header className="trends-header">
        <h2 id="trends-title" className="trends-title">Select trends</h2>
        <p className="trends-subtitle">
          Curated stories, insights and ideas to keep you inspired. Explore emerging trends,
          creative perspectives and voices from around the world.
        </p>
      </header>

      <div className="trends-stage-wrapper">
        <button
          type="button"
          id="trends-prev"
          className="trends-stage-btn trends-stage-btn--prev"
          aria-label="Previous trend"
          onClick={goPrev}
        >
          <ArrowIcon direction="left" />
        </button>

        <button
          type="button"
          id="trends-next"
          className="trends-stage-btn trends-stage-btn--next"
          aria-label="Next trend"
          onClick={goNext}
        >
          <ArrowIcon direction="right" />
        </button>

        <div className="trends-stage">
          {TREND_CARDS.map((card, index) => {
            const { style, diff } = getCardStyle(index)
            const isCenter = diff === 0
            const showBack = isCenter && isFlipped

            return (
              <div
                key={card.id}
                className={`trends-polaroid-slot${isCenter ? ' is-center' : ''}${showBack ? ' is-flipped' : ''}${isCenter && isDragging ? ' is-dragging' : ''}`}
                style={{
                  ...style,
                  ['--card-surface' as string]: card.surface,
                  ['--card-ink' as string]: card.ink,
                  ['--card-edge' as string]: card.edge
                }}
                onClick={() => handleSlotClick(index)}
                onPointerDown={(e) => handlePointerDown(e, index)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${total}: ${card.title}`}
                aria-hidden={!isCenter}
              >
                <div className="polaroid-flipper">
                  {SLAB_Z_OFFSETS.map((zOffset) => (
                    <div
                      key={zOffset}
                      className="polaroid-slab"
                      style={{ transform: `translateZ(${zOffset}px)` }}
                      aria-hidden="true"
                    />
                  ))}

                  {/* Front face */}
                  <article className="polaroid-face polaroid-front" aria-hidden={showBack}>
                    <div className="polaroid-image-frame">
                      <img src={card.image} alt="" className="polaroid-img" draggable={false} />
                    </div>

                    <div className="polaroid-front-body">
                      <h3 className="polaroid-title">{card.title}</h3>
                      <p className="polaroid-excerpt">{card.subtitle}</p>

                      <div className="polaroid-footer">
                        <span className="polaroid-meta">{toSentenceCase(card.readTime)}</span>
                        <button
                          type="button"
                          className="polaroid-btn polaroid-read-btn"
                          tabIndex={isCenter && !showBack ? 0 : -1}
                          aria-label={`Read about ${card.title}`}
                          onClick={(e) => (isCenter ? flipCenter(e, true) : undefined)}
                          onPointerDown={(e) => e.stopPropagation()}
                        >
                          Read
                          <FlipIcon />
                        </button>
                      </div>
                    </div>
                  </article>

                  {/* Back face: the article preview */}
                  <article className="polaroid-face polaroid-back" aria-hidden={!showBack}>
                    <span className="polaroid-meta">
                      {toSentenceCase(card.category)} · {toSentenceCase(card.readTime)}
                    </span>
                    <h3 className="polaroid-back-headline">{card.headline}</h3>
                    <p className="polaroid-back-text">{card.paragraph1}</p>

                    <div className="polaroid-footer">
                      <span className="polaroid-meta">{card.title}</span>
                      <button
                        type="button"
                        className="polaroid-btn polaroid-back-btn"
                        tabIndex={showBack ? 0 : -1}
                        aria-label={`Show the front of ${card.title}`}
                        onClick={(e) => flipCenter(e, false)}
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <FlipIcon />
                        Back
                      </button>
                    </div>
                  </article>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="trends-footer-bar">
        <div className="trends-pagination" role="group" aria-label="Choose a trend">
          {TREND_CARDS.map((card, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={card.id}
                type="button"
                id={`trends-dot-${card.id}`}
                aria-label={`Show ${card.title}`}
                aria-current={isActive ? 'true' : undefined}
                className={`trends-dot${isActive ? ' is-active' : ''}${isActive && !isPlaying ? ' is-static' : ''}`}
                onClick={() => goTo(idx)}
              >
                {isActive && isPlaying && (
                  <span
                    className="trends-dot-progress"
                    style={{
                      animationDuration: `${AUTO_ADVANCE_MS}ms`,
                      animationPlayState: shouldAdvance ? 'running' : 'paused'
                    }}
                    onAnimationEnd={goNext}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          id="trends-play-toggle"
          className="trends-play-badge"
          aria-label={isPlaying ? 'Pause automatic rotation' : 'Start automatic rotation'}
          aria-pressed={!isPlaying}
          onClick={() => setIsPlaying((prev) => !prev)}
          title={isPlaying ? 'Pause automatic rotation' : 'Start automatic rotation'}
        >
          <span className="trends-play-icon">{isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
          <span>{isPlaying ? 'Auto-advancing' : 'Paused'}</span>
        </button>
      </div>

      <p className="trends-sr-only" aria-live={isPlaying ? 'off' : 'polite'} aria-atomic="true">
        {`Trend ${activeIndex + 1} of ${total}: ${activeCard.title}`}
      </p>
    </section>
  )
}
