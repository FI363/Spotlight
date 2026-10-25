import { useState, useEffect, useRef } from 'react'
import './FashionPage.css'
import womanImage from '../assets/woman.png'

type Trend = {
  id: string
  title: string
  category: string
  date: string
  location: string
  description: string
  highlights: string[]
  image: string
}

const TRENDS: Trend[] = [
  {
    id: 'quiet-luxury',
    title: 'Quiet Luxury',
    category: 'Runway',
    date: 'Oct 14, 2026',
    location: 'Milan, Italy',
    description:
      'An intimate showcase of understated tailoring — cashmere, camel tones and impeccable cuts that whisper rather than shout. Designers return to craft, fabric and fit as the ultimate status symbols.',
    highlights: ['Neutral palettes', 'Logo-free tailoring', 'Heritage fabrics'],
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
  },
  {
    id: 'neo-romantic',
    title: 'Neo-Romantic',
    category: 'Couture',
    date: 'Oct 21, 2026',
    location: 'Paris, France',
    description:
      'Ruffles, sheer layers and corsetry reimagined for the modern wardrobe. A celebration of softness and drama, pairing Victorian silhouettes with utilitarian boots.',
    highlights: ['Sheer layering', 'Corset details', 'Blush & bordeaux'],
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80',
  },
  {
    id: 'chrome-utility',
    title: 'Chrome Utility',
    category: 'Streetwear',
    date: 'Oct 28, 2026',
    location: 'Tokyo, Japan',
    description:
      'Technical fabrics meet metallic finishes. Cargo pockets, modular straps and reflective accents define a futuristic street uniform built for the city after dark.',
    highlights: ['Metallic nylon', 'Modular pieces', 'Reflective trims'],
    image: 'https://images.unsplash.com/photo-1550614000-4b95dd2447eb?w=400&q=80',
  },
  {
    id: 'sculpted-knit',
    title: 'Sculpted Knitwear',
    category: 'Ready-to-Wear',
    date: 'Nov 04, 2026',
    location: 'London, UK',
    description:
      'Knitwear becomes architecture — oversized ribbing, 3D textures and body-hugging forms. A cozy season, elevated into wearable sculpture.',
    highlights: ['3D textures', 'Chunky ribbing', 'Tonal dressing'],
    image: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=400&q=80',
  },
  {
    id: 'bold-bordeaux',
    title: 'Bold Bordeaux',
    category: 'Color Story',
    date: 'Nov 11, 2026',
    location: 'New York, USA',
    description:
      'The colour of the season. Deep wine hues saturate leather, velvet and satin, from head-to-toe looks to statement accessories.',
    highlights: ['Monochrome looks', 'Velvet & leather', 'Statement bags'],
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=400&q=80',
  },
  {
    id: 'archive-revival',
    title: 'Archive Revival',
    category: 'Vintage',
    date: 'Nov 18, 2026',
    location: 'Copenhagen, Denmark',
    description:
      'Houses reopen their archives, reissuing iconic pieces from the 90s and early 2000s. Sustainability meets nostalgia in a curated resale pop-up.',
    highlights: ['Reissued icons', 'Curated resale', 'Circular fashion'],
    image: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=400&q=80',
  },
  {
    id: 'soft-power',
    title: 'Soft Power Suiting',
    category: 'Tailoring',
    date: 'Nov 25, 2026',
    location: 'Seoul, South Korea',
    description:
      'Relaxed shoulders, fluid trousers and draped blazers redefine power dressing. Comfort becomes the new confidence.',
    highlights: ['Draped blazers', 'Wide trousers', 'Fluid fabrics'],
    image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400&q=80',
  },
  {
    id: 'faux-fur',
    title: 'Faux Fur Frenzy',
    category: 'Outerwear',
    date: 'Dec 02, 2026',
    location: 'Berlin, Germany',
    description:
      'Playful, oversized and entirely cruelty-free. Shaggy coats in candy colours and earthy tones take centre stage this winter.',
    highlights: ['Oversized coats', 'Candy tones', 'Cruelty-free'],
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
  },
]

type Hotspot = { label: string; item: string; shop: string; x: number; y: number }
type Look = { id: string; title: string; tagline: string; image: string; hotspots: Hotspot[] }

const LOOKS: Look[] = [
  {
    id: 'everyday',
    title: 'The Everyday Edit',
    tagline: 'Pieces curated for effortless dressing.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1400&q=80',
    hotspots: [
      { label: 'Jacket', item: 'Oversized wool overcoat', shop: 'Shop at Maison Aure', x: 46, y: 34 },
      { label: 'Trousers', item: 'Pleated wide-leg trousers', shop: 'Shop at Atelier Nord', x: 54, y: 72 },
    ],
  },
  {
    id: 'city-neutrals',
    title: 'City Neutrals',
    tagline: 'Quiet tones, sharp lines, all day.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=80',
    hotspots: [
      { label: 'Knit', item: 'Cashmere crew sweater', shop: 'Shop at Loro & Co.', x: 48, y: 38 },
      { label: 'Skirt', item: 'Satin bias midi skirt', shop: 'Shop at Studio Verre', x: 52, y: 68 },
    ],
  },
  {
    id: 'after-dark',
    title: 'After Dark',
    tagline: 'Evening dressing, softly undone.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&q=80',
    hotspots: [
      { label: 'Dress', item: 'Draped silk slip dress', shop: 'Shop at Elise Marlo', x: 50, y: 50 },
      { label: 'Heels', item: 'Pointed leather slingbacks', shop: 'Shop at Pied Rose', x: 52, y: 90 },
    ],
  },
  {
    id: 'weekend',
    title: 'Weekend Ease',
    tagline: 'Relaxed layers for slower mornings.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80',
    hotspots: [
      { label: 'Coat', item: 'Camel belted trench', shop: 'Shop at Maison Aure', x: 45, y: 40 },
      { label: 'Bag', item: 'Soft leather tote', shop: 'Shop at Cuir Atelier', x: 66, y: 62 },
    ],
  },
  {
    id: 'bordeaux',
    title: 'Bordeaux Hour',
    tagline: 'The season’s colour, head to toe.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1400&q=80',
    hotspots: [
      { label: 'Blazer', item: 'Velvet single-breasted blazer', shop: 'Shop at Rouge Atelier', x: 50, y: 36 },
      { label: 'Trousers', item: 'Tonal tailored trousers', shop: 'Shop at Atelier Nord', x: 50, y: 74 },
    ],
  },
]

type Reel = { id: string; tag: string; title: string; handle: string; duration: string; image: string }

const REELS: Reel[] = [
  { id: 'reel', tag: 'Reel', title: 'Runway in 15 seconds', handle: '@spotlight.select', duration: '0:15', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80' },
  { id: 'grwm', tag: 'GRWM', title: 'Get ready: gallery opening', handle: '@mira.wears', duration: '0:42', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700&q=80' },
  { id: 'haul', tag: 'Haul', title: 'Autumn haul, unboxed', handle: '@thread.theory', duration: '0:28', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=700&q=80' },
  { id: 'vlog', tag: 'Vlog', title: 'A day in Paris', handle: '@cloe.style', duration: '1:15', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=700&q=80' },
  { id: 'trends', tag: 'Trends', title: '5 staples for November', handle: '@curated.looks', duration: '0:55', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80' },
  { id: 'bts', tag: 'BTS', title: 'Behind the spotlight shoot', handle: '@spotlight.select', duration: '0:30', image: 'https://images.unsplash.com/photo-1524041255072-7da0525d6b34?w=700&q=80' },
]

function FashionPage() {
  const [lookIndex, setLookIndex] = useState(0)
  const [activeSpot, setActiveSpot] = useState<number | null>(0)
  const [playingReel, setPlayingReel] = useState<string | null>(null)
  const [reelIndex, setReelIndex] = useState(0)
  const goReel = (dir: number) => {
    setReelIndex((i) => (i + dir + REELS.length) % REELS.length)
    setPlayingReel(null)
  }
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    if (trackRef.current) {
      startX.current = e.pageX - trackRef.current.offsetLeft
      scrollLeft.current = trackRef.current.scrollLeft
    }
  }
  const handlePointerLeave = () => {
    isDragging.current = false
  }
  const handlePointerUp = () => {
    isDragging.current = false
  }
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 2
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault()
        track.scrollLeft += e.deltaY
      }
    }

    track.addEventListener('wheel', handleWheel, { passive: false })
    return () => track.removeEventListener('wheel', handleWheel)
  }, [])

  const look = LOOKS[lookIndex]
  const goLook = (dir: number) => {
    setLookIndex((i) => (i + dir + LOOKS.length) % LOOKS.length)
    setActiveSpot(null)
  }

  const [activeId, setActiveId] = useState(TRENDS[0].id)
  const activeIndex = TRENDS.findIndex((trend) => trend.id === activeId)
  const active = TRENDS[activeIndex]

  return (
    <main className="fashion-page">
      <section className="fashion-hero" aria-labelledby="fashion-hero-title">
        <div className="fashion-hero-glow" aria-hidden="true" />

        <header className="fashion-hero-meta">
          <span>Spotlight — N°04</span>
          <span className="fashion-hero-meta-center">The Fashion Editorial</span>
          <span>Autumn / Winter 2026</span>
        </header>

        <h1 id="fashion-hero-title" className="fashion-hero-title">
          <span className="fashion-hero-word fashion-hero-word--spotlight">Spotlight</span>
          <span className="fashion-hero-word fashion-hero-word--select">select</span>
          <span className="fashion-hero-word fashion-hero-word--fashion">Fashion</span>
        </h1>

        <div className="fashion-hero-figure" aria-hidden="true">
          <img className="fashion-hero-shadow" src={womanImage} alt="" />
          <img className="fashion-hero-woman" src={womanImage} alt="" />
        </div>
      </section>

      <div className="fashion-ribbon" aria-hidden="true">
        <div className="fashion-ribbon-track">
          {[0, 1].map((copy) => (
            <div className="fashion-ribbon-group" key={copy}>
              {['Spotlight Select', 'Autumn / Winter 2026', 'The Trend Report', 'Runway to Street', 'N°04 Fashion Edit'].map(
                (label) => (
                  <span className="fashion-ribbon-item" key={label}>
                    {label}
                    <span className="fashion-ribbon-star">✦</span>
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <section className="fashion-card-section" aria-labelledby="fashion-trends-title">
        <div className="fashion-card">
          <div className="fashion-card-inner fashion-trends">
            <article className="fashion-trend-detail" key={active.id} aria-live="polite">
              <span className="fashion-trend-eyebrow">Trending Now — The Season's Edit</span>
              <h2 id="fashion-trends-title" className="fashion-trend-title">
                {active.title}
              </h2>

              <div className="fashion-trend-meta">
                <span className="fashion-trend-chip">{active.category}</span>
                <span>{active.date}</span>
                <span className="fashion-trend-dot" aria-hidden="true" />
                <span>{active.location}</span>
              </div>

              <p className="fashion-trend-description">{active.description}</p>
            </article>

            <figure className="fashion-trend-polaroid" key={`${active.id}-polaroid`}>
              <div className="fashion-trend-polaroid-frame">
                <img src={active.image} alt={active.title} />
              </div>
            </figure>

            <nav className="fashion-trend-list-wrap" aria-label="Fashion trends">
              <ol className="fashion-trend-list">
                {TRENDS.map((trend, index) => (
                  <li key={trend.id}>
                    <button
                      id={`fashion-trend-${trend.id}`}
                      type="button"
                      className={`fashion-trend-item${trend.id === activeId ? ' is-active' : ''}`}
                      aria-current={trend.id === activeId}
                      onClick={() => setActiveId(trend.id)}
                    >
                      <span className="fashion-trend-item-index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="fashion-trend-item-body">
                        <span className="fashion-trend-item-title">{trend.title}</span>
                        <span className="fashion-trend-item-sub">
                          {trend.category} · {trend.location}
                        </span>
                      </span>
                      <span className="fashion-trend-item-arrow" aria-hidden="true">→</span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <section className="fashion-look" aria-labelledby="fashion-look-title">
        <div className="fashion-look-stage">
          <div className="fashion-look-frame" key={look.id}>
            <img src={look.image} alt={look.title} />
            {look.hotspots.map((spot, i) => (
              <button
                key={spot.label}
                type="button"
                className={`fashion-hotspot${activeSpot === i ? ' is-open' : ''}`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%`, animationDelay: `${0.6 + i * 0.25}s` }}
                onMouseEnter={() => setActiveSpot(i)}
                onFocus={() => setActiveSpot(i)}
                onClick={() => setActiveSpot(activeSpot === i ? null : i)}
                aria-label={`${spot.label}: ${spot.item}`}
              >
                <span className="fashion-hotspot-dot" />
                <span className="fashion-hotspot-tag">
                  <small>{spot.label}</small>
                  <strong>{spot.item}</strong>
                  <em>{spot.shop} →</em>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="fashion-look-text">
          <header className="fashion-section-head">
            <span className="fashion-section-kicker">01 — Shop the Look</span>
            <h2 id="fashion-look-title" className="fashion-section-title">Shop the Look</h2>
            <p className="fashion-section-sub">Lookbook Carousel — interactive outfit breakdowns</p>
          </header>

          <div className="fashion-look-caption" key={`${look.id}-cap`}>
            <h3>{look.title}</h3>
            <p>{look.tagline}</p>
            <a className="fashion-cta" href="#fashion-look-title">Shop this look <span>→</span></a>
          </div>

          <div className="fashion-look-nav">
            <button type="button" id="fashion-look-prev" onClick={() => goLook(-1)} aria-label="Previous look">←</button>
            <span>
              {String(lookIndex + 1).padStart(2, '0')} <small>/ {String(LOOKS.length).padStart(2, '0')}</small>
            </span>
            <button type="button" id="fashion-look-next" onClick={() => goLook(1)} aria-label="Next look">→</button>
          </div>
        </div>
      </section>

      <section className="fashion-reels fashion-reels-split" aria-labelledby="fashion-reels-title">
        <div className="fashion-reels-text">
          <header className="fashion-section-head fashion-section-head--fast">
            <span className="fashion-section-kicker">
              02 — Reel / Fashion Gallery · {String(reelIndex + 1).padStart(2, '0')} / {String(REELS.length).padStart(2, '0')}
            </span>
            <h2 id="fashion-reels-title" className="fashion-section-title">Fashion in Motion</h2>
            <p className="fashion-section-sub" key={REELS[reelIndex].id}>
              Now showing: {REELS[reelIndex].tag} — {REELS[reelIndex].title}
            </p>
          </header>

          <p className="fashion-reels-quote">“What’s new / What’s next”</p>
          <a className="fashion-cta fashion-cta--solid" href="#fashion-reels-title">View all reels <span>→</span></a>
          
          <div className="fashion-reels-list-carousel">
            <div 
              className="fashion-reels-list-track-wrap"
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerLeave={handlePointerLeave}
              onPointerUp={handlePointerUp}
              onPointerMove={handlePointerMove}
            >
              <div className="fashion-reels-list-track">
                {Array.from({ length: 12 }).flatMap(() => REELS).map((reel, i) => (
                  <button
                    key={`${reel.id}-${i}`}
                    type="button"
                    className={`fashion-reels-list-item${i % REELS.length === reelIndex ? ' is-current' : ''}`}
                    onClick={() => setReelIndex(i % REELS.length)}
                    aria-label={`View ${reel.title}`}
                  >
                    <img src={reel.image} alt={reel.title} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="fashion-reels-stage">
          {REELS.map((reel, i) => {
            const playing = playingReel === reel.id
            if (i !== reelIndex) return null;
            return (
              <button
                key={reel.id}
                type="button"
                className={`fashion-reel is-current${playing ? ' is-playing' : ''}`}
                onClick={() => setPlayingReel(playing ? null : reel.id)}
                aria-pressed={playing}
              >
                <img src={reel.image} alt={reel.title} />
                <span className="fashion-reel-tag">{reel.tag}</span>
                <span className="fashion-reel-play" aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
                <span className="fashion-reel-info">
                  <strong>{reel.title}</strong>
                  <small>{reel.handle} · {reel.duration}</small>
                </span>
                <span className="fashion-reel-progress" aria-hidden="true" />
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default FashionPage
