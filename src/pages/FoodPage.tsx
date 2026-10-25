import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import circularTableImage from '../assets/top_veiw_of_circular_table_wit_1.png'
import cookImage from '../assets/COOK.png'
import './FoodPage.css'
import waiterImage from '../assets/WAITER.png'
import bodegaImage from '../assets/bodega.png'
import lightImage from '../assets/light.png'

const curatedFeasts = [
  {
    title: 'the blah',
    desc: 'Something happened, then again. Who knows what can happen when you pay attention.',
    number: '#01',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#ece3d4',
    textColor: '#183f34',
  },
  {
    title: 'on the menu',
    desc: 'Small details, bold flavours, and stories worth coming back for.',
    number: '#02',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#224336',
    textColor: '#e8e4d8',
  },
  {
    title: 'good things',
    desc: 'A little inspiration for whatever comes next.',
    number: '#03',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#9eb092',
    textColor: '#183f34',
  },
  {
    title: 'the daily',
    desc: 'Fresh finds, familiar favourites, and something unexpected.',
    number: '#04',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#bd6443',
    textColor: '#f3e4db',
  },
  {
    title: 'bite sized',
    desc: 'Ideas served simply, with a little extra flavour.',
    number: '#05',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#f3e4db',
    textColor: '#bd6443',
  },
  {
    title: 'one more',
    desc: 'There is always another good thing around the corner.',
    number: '#06',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#d5a044',
    textColor: '#183f34',
  },
  {
    title: 'extra slice',
    desc: 'A little something extra to satisfy that craving.',
    number: '#07',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#224336',
    textColor: '#e8e4d8',
  },
  {
    title: 'local eats',
    desc: 'Discover what the neighborhood has to offer today.',
    number: '#08',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#bd6443',
    textColor: '#f3e4db',
  },
  {
    title: 'sweet tooth',
    desc: 'Because there is always room for dessert.',
    number: '#09',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#ece3d4',
    textColor: '#183f34',
  },
  {
    title: 'morning brew',
    desc: 'Start the day right with the perfect roast.',
    number: '#10',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#9eb092',
    textColor: '#183f34',
  },
  {
    title: 'midnight snack',
    desc: 'For when the cravings hit after hours.',
    number: '#11',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#d5a044',
    textColor: '#183f34',
  },
  {
    title: 'the classic',
    desc: 'Timeless flavors that never go out of style.',
    number: '#12',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?fm=webp&fit=crop&w=600&q=80',
    bgColor: '#ece3d4',
    textColor: '#183f34',
  }
]

function FoodPage() {
  const [isRotating, setIsRotating] = useState(true)
  const [activeFeastIndex, setActiveFeastIndex] = useState(0)
  const [gridHeight, setGridHeight] = useState<number | undefined>(undefined)
  const [isScrollingState, setIsScrollingState] = useState(false)

  const cardsGridRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const currentRowRef = useRef(0)

  // 12 cards, 3 per row = 4 rows (0, 1, 2, 3)
  const maxRowIndex = 2

  // Measure row metrics
  const getRowMetrics = useCallback(() => {
    const grid = cardsGridRef.current
    if (!grid) return null
    const firstCard = grid.firstElementChild as HTMLElement | null
    if (!firstCard) return null
    const cardHeight = firstCard.getBoundingClientRect().height
    const gap = parseFloat(window.getComputedStyle(grid).rowGap || window.getComputedStyle(grid).gap) || 24
    const rowHeight = cardHeight + gap
    const maxScroll = grid.scrollHeight - grid.clientHeight
    return { grid, cardHeight, gap, rowHeight, maxScroll }
  }, [])

  // Calculate exact height of 2 rows on parent resize to avoid mid-scroll layout loops
  useLayoutEffect(() => {
    const grid = cardsGridRef.current
    if (!grid || !grid.parentElement) return

    const calculateTwoRowsHeight = () => {
      const firstCard = grid.firstElementChild as HTMLElement | null
      if (!firstCard) return
      const cardHeight = firstCard.getBoundingClientRect().height
      if (cardHeight === 0) return
      const gap = parseFloat(window.getComputedStyle(grid).rowGap || window.getComputedStyle(grid).gap) || 24
      const exactHeight = Math.round(cardHeight * 2 + gap)
      setGridHeight((prev) => (prev !== exactHeight ? exactHeight : prev))
    }

    calculateTwoRowsHeight()
    const ro = new ResizeObserver(calculateTwoRowsHeight)
    ro.observe(grid.parentElement)
    return () => ro.disconnect()
  }, [])

  // Programmatic scroll to target row with scroll lockout to prevent jitter
  const scrollToRow = useCallback((rowIndex: number) => {
    const metrics = getRowMetrics()
    if (!metrics) return
    const { grid, rowHeight, maxScroll } = metrics

    const clampedRow = Math.max(0, Math.min(rowIndex, maxRowIndex))
    currentRowRef.current = clampedRow
    const targetScroll = Math.min(maxScroll, clampedRow * rowHeight)

    isScrollingRef.current = true
    setIsScrollingState(true)

    grid.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })

    setTimeout(() => {
      isScrollingRef.current = false
      setIsScrollingState(false)
    }, 450)
  }, [getRowMetrics])

  // Wheel listener attached with { passive: false } for clean single-slide transitions
  useEffect(() => {
    const grid = cardsGridRef.current
    if (!grid) return

    const onWheel = (e: WheelEvent) => {
      // Ignore tiny jitter
      if (Math.abs(e.deltaY) < 15) return

      const metrics = getRowMetrics()
      if (!metrics) return
      const { rowHeight, maxScroll } = metrics

      // If a slide transition is currently animating, swallow continuous wheel ticks to prevent oscillation
      if (isScrollingRef.current) {
        e.preventDefault()
        return
      }

      const currentScroll = grid.scrollTop
      const activeRow = Math.round(currentScroll / rowHeight)

      if (e.deltaY > 0) {
        // Scrolling down: if at or past bottom row, let page scroll naturally
        if (activeRow >= maxRowIndex || currentScroll >= maxScroll - 6) {
          return
        }

        e.preventDefault()
        const nextRow = Math.min(maxRowIndex, activeRow + 1)
        scrollToRow(nextRow)
      } else if (e.deltaY < 0) {
        // Scrolling up: if at or before top row, let page scroll naturally
        if (activeRow <= 0 || currentScroll <= 6) {
          return
        }

        e.preventDefault()
        const prevRow = Math.max(0, activeRow - 1)
        scrollToRow(prevRow)
      }
    }

    grid.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      grid.removeEventListener('wheel', onWheel)
    }
  }, [getRowMetrics, scrollToRow])

  const handleGridScroll = () => {
    if (!isScrollingRef.current) {
      const metrics = getRowMetrics()
      if (metrics) {
        currentRowRef.current = Math.round(metrics.grid.scrollTop / metrics.rowHeight)
      }
    }
  }

  const handleSelectFeast = (idx: number) => {
    setActiveFeastIndex(idx)
    const targetRow = Math.min(maxRowIndex, Math.floor(idx / 3))
    scrollToRow(targetRow)
  }

  return (
    <div className="food-page" id="food-top">
      {/* Hero Section */}
      <section className="food-hero" aria-labelledby="food-hero-title">
        <div className="food-hero-container">
          <div className="food-hero-grid">
            {/* Left side: Bold heading + 3D Fallen Menu Card */}
            <div className="food-hero-left">
              <span className="food-hero-eyebrow">FOOD COLLECTION</span>
              <h1 id="food-hero-title" className="food-hero-title">
                Spotlight
                <span className="food-hero-title-bottom">select</span>
              </h1>

              <div className="food-hero-actions">
                <a className="food-hero-btn food-hero-btn--primary" href="#curated-spreads">
                  Explore Curations <span aria-hidden="true">↓</span>
                </a>
                <button
                  type="button"
                  className="food-hero-btn food-hero-btn--secondary"
                  onClick={() => setIsRotating((prev) => !prev)}
                  aria-pressed={!isRotating}
                  aria-label={isRotating ? 'Pause rotating table' : 'Spin table'}
                >
                  <span className={`rotation-indicator-dot ${isRotating ? 'is-active' : ''}`} />
                  {isRotating ? 'Pause Rotation' : 'Spin Table'}
                </button>
              </div>
              <p className="food-hero-filler">
                Handpicked menus &amp; curated dining experiences — crafted for the discerning table.
              </p>
              <img
                src={waiterImage}
                alt="Waiter serving"
                className="food-hero-waiter"
              />
            </div>

            {/* Centre: Cook prep station */}
            <div className="food-hero-cook-stage" aria-hidden="true">
              <img
                src={cookImage}
                alt="Chef plating food at kitchen prep counter"
                className="food-hero-cook-img"
              />
            </div>

            {/* Right corner: Rotating table figure */}
            <div className="food-hero-right">
              <div className="food-table-stage">
                <figure
                  className={`food-table-figure ${isRotating ? 'is-spinning' : 'is-paused'}`}
                  aria-label="A rotating circular wooden dining table laden with Mediterranean dishes, paella, appetizers, and wine"
                >
                  <img
                    src={circularTableImage}
                    alt="Top view of a circular dining table filled with paella, salads, bread, tapas, and drinks"
                    className="food-table-image"
                    loading="eager"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spreads Section */}
      <section className="food-curations-section" id="curated-spreads" aria-label="Curated Spreads">
        <div className="food-curations-container">
          <img src={lightImage} alt="" className="food-card-pendant-light food-card-pendant-light-left" aria-hidden="true" />
          <img src={lightImage} alt="" className="food-card-pendant-light food-card-pendant-light-right" aria-hidden="true" />
          <header className="food-curations-header">
            <div className="food-header-top-motif" aria-hidden="true">
              <svg width="36" height="30" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 25 C14 17, 18 10, 24 3" stroke="#16281e" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M24 3 C25.5 0.5, 29 1.5, 28.5 5 C27 8, 24 6.5, 24 3 Z" fill="#16281e" />
                <path d="M20.5 7.5 C24 6, 27.5 8, 26 11.5 C23.5 12.5, 21 10.5, 20.5 7.5 Z" fill="#16281e" />
                <path d="M18 10.5 C14.5 8.5, 13.5 11.5, 14 13.5 C16 14.5, 18 13, 18 10.5 Z" fill="#16281e" />
                <path d="M17 14.5 C20 14.5, 22.5 17.5, 20.5 19.5 C18 20, 16.5 17.5, 17 14.5 Z" fill="#16281e" />
                <path d="M14 18.5 C11 17, 10 20, 10.5 22 C12.5 22.5, 14 20.5, 14 18.5 Z" fill="#16281e" />
              </svg>
            </div>

            <div className="food-curations-eyebrow-wrap">
              <span className="food-header-rule" aria-hidden="true" />
              <span className="food-curations-eyebrow">SAVOR THE COLLECTION</span>
              <span className="food-header-rule" aria-hidden="true" />
            </div>

            <h2 className="food-curations-title">
              <span className="food-title-line food-title-dark">CURATED TABLES &amp;</span>
              <span className="food-title-line food-title-rust">SIGNATURE MENUS</span>
            </h2>

            <div className="food-header-bottom-wrap" aria-hidden="true">
              <span className="food-header-rule" />
              <div className="food-header-bottom-motif">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 19 L11 9" stroke="#16281e" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M11 9 C9.5 5, 11 0.8, 11 0 C11 0.8, 12.5 5, 11 9 Z" fill="#16281e" />
                  <path d="M10.5 11.5 C7 9.5, 2.8 10.5, 1.8 12 C3.8 14.2, 8 14, 10.5 11.5 Z" fill="#16281e" />
                  <path d="M11.5 11.5 C15 9.5, 19.2 10.5, 20.2 12 C18.2 14.2, 14 14, 11.5 11.5 Z" fill="#16281e" />
                  <circle cx="11" cy="15" r="1.2" fill="#16281e" />
                </svg>
              </div>
              <span className="food-header-rule" />
            </div>

            <img src={bodegaImage} alt="Bodega" className="food-bodega-image" />
          </header>

          <div className="food-curations-body">
            <div
              className={`food-cards-grid ${isScrollingState ? 'is-scrolling' : ''}`}
              ref={cardsGridRef}
              style={{ height: gridHeight ? `${gridHeight}px` : undefined }}
              onScroll={handleGridScroll}
              tabIndex={0}
              role="region"
              aria-label="Curated feasts carousel (2 rows visible)"
            >
              {curatedFeasts.map((feast, index) => (
                <article
                  className="food-card"
                  key={feast.title}
                  id={`food-card-${index}`}
                  style={{ backgroundColor: feast.bgColor, color: feast.textColor }}
                  onClick={() => setActiveFeastIndex(index)}
                >
                  <div className="food-card-image-wrap">
                    <picture>
                      <source type="image/webp" srcSet={feast.image} />
                      <img src={feast.image} alt={feast.title} className="food-card-image" loading="lazy" />
                    </picture>
                  </div>
                  <div className="food-card-content">
                    <h3 className="food-card-title">{feast.title}</h3>
                    <span className="food-card-number" style={{ color: feast.textColor }}>{feast.number}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="food-issue-list-wrapper">
              <aside className="food-issue-list">
                <h3 className="food-issue-header">IN THIS ISSUE</h3>
                <ul className="food-issue-items">
                  {curatedFeasts.map((feast, idx) => (
                    <li
                      className={`food-issue-item ${activeFeastIndex === idx ? 'is-active' : ''}`}
                      key={feast.number}
                      onClick={() => handleSelectFeast(idx)}
                    >
                      <div className="food-issue-num">{feast.number.replace('#', '')}</div>
                      <div className="food-issue-divider"></div>
                      <div className="food-issue-text">
                        <h4>{feast.title}</h4>
                        <p>{feast.desc}</p>
                      </div>
                      <button
                        className="food-issue-btn"
                        aria-label={`Go to ${feast.title}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectFeast(idx)
                        }}
                      >
                        <span aria-hidden="true">→</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FoodPage
