import { useState } from 'react'
import carousel1 from '../assets/lifestyle_carousel_1.jpg'
import carousel2 from '../assets/lifestyle_carousel_2.jpg'
import carousel3 from '../assets/lifestyle_carousel_3.jpg'
import trendStores from '../assets/trend_stores.jpg'
import trendLocalSpots from '../assets/trend_local_spots.jpg'
import trendHealthyLiving from '../assets/trend_healthy_living.jpg'

type Category = 'Actors' | 'Artists' | 'Musicians' | 'Dancers'

// Swap `img` for real portraits and edit the details as needed.
const PEOPLE: { name: string; role: Category; note: string; img: string }[] = [
  { name: 'Aarav Mehta', role: 'Actors', note: 'Stage-to-screen breakout of the year', img: carousel1 },
  { name: 'Nisha Rao', role: 'Artists', note: 'Murals that rewrite the city skyline', img: trendStores },
  { name: 'The Sunday Folk', role: 'Musicians', note: 'Indie trio from the old quarter', img: carousel2 },
  { name: 'Kabir Anand', role: 'Dancers', note: 'Contemporary meets street rhythm', img: trendLocalSpots },
  { name: 'Meera Joshi', role: 'Actors', note: 'Theatre veteran, now on streaming', img: carousel3 },
  { name: 'Rohan Das', role: 'Artists', note: 'Ceramics and found-object sculpture', img: trendHealthyLiving },
  { name: 'Tara Sen', role: 'Musicians', note: 'Soulful vocals, bedroom-pop beats', img: carousel1 },
  { name: 'Ishaan Verma', role: 'Dancers', note: 'Choreographer behind local festivals', img: carousel2 },
]

const FILTERS: ('All' | Category)[] = ['All', 'Actors', 'Artists', 'Musicians', 'Dancers']

export function PopCultureSection() {
  const [filter, setFilter] = useState<'All' | Category>('All')
  const visible = filter === 'All' ? PEOPLE.slice(0, 4) : PEOPLE.filter((p) => p.role === filter)

  return (
    <section className="popculture-section" id="pop-culture">
      <div className="popculture-header">
        <div>
          <span className="popculture-eyebrow">LOCAL SPOTLIGHT</span>
          <h2 className="popculture-title">Pop <span>culture</span></h2>
          <p className="popculture-subtitle">
            The local actors, artists, musicians and performers shaping what our city watches, hears and talks about.
          </p>
        </div>
        <div className="popculture-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`popculture-chip ${filter === f ? 'is-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="popculture-grid">
        {visible.map((p) => (
          <article className="popculture-person" key={p.name}>
            <img src={p.img} alt={p.name} />
            <span className="popculture-person-role">{p.role}</span>
            <div className="popculture-person-info">
              <div>
                <h3 className="popculture-person-name">{p.name}</h3>
                <p className="popculture-person-note">{p.note}</p>
              </div>
              <span className="popculture-person-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
