import { useEffect, useRef, useState, type CSSProperties } from 'react'
import './EventsPage.css'
import ticketMachineImage from '../assets/ticket machine.png'
import { EventsLibrarySearcher } from '../components/EventsLibrarySearcher'
import { EventsCoverBox } from '../components/EventsCoverBox'

const eventOrbitImages = [
  'photo-1501386761578-eac5c94b800a',
  'photo-1492684223066-81342ee5ff30',
  'photo-1506157786151-b8491531f063',
  'photo-1514525253161-7a46d19cd819',
  'photo-1470229722913-7c0e2dbbafd3',
  'photo-1505373877841-8d25f7d46678',
  'photo-1511795409834-ef04bbd61622',
  'photo-1519671482749-fd09be7ccebf',
  'photo-1527529482837-4698179dc6ce',
  'photo-1464366400600-7168b8af9bc3',
  'photo-1501281668745-f7f57925c3b4',
  'photo-1516450360452-9312f5e86fc7',
  'photo-1505236858219-8359eb29e329',
  'photo-1429962714451-bb934ecdc4ec',
  'photo-1519167758481-83f550bb49b3',
  'photo-1519671482749-fd09be7ccebf',
  'photo-1506157786151-b8491531f063',
  'photo-1492684223066-81342ee5ff30',
  'photo-1470229722913-7c0e2dbbafd3',
  'photo-1501386761578-eac5c94b800a',
  'photo-1464366400600-7168b8af9bc3',
  'photo-1514525253161-7a46d19cd819',
  'photo-1527529482837-4698179dc6ce',
  'photo-1511795409834-ef04bbd61622',
] as const

const eventTickets = [
  {
    category: 'ACOUSTIC',
    date: 'DEC 12',
    title: 'Midnight Jazz Vault',
    subtitle: 'Subterranean Quartet',
    venue: 'DEPOT VAULT ROOM 2',
    time: '22:00 EST',
    admission: '$22 Entry · 60 seats',
  },
  {
    category: 'VISUALS',
    date: 'DEC 18',
    title: 'Neon Glass Foundry',
    subtitle: 'Spotlight event pass',
    venue: 'GENERAL ADMISSION',
    time: 'EVENING',
    admission: 'EVENT ENTRY',
  },
] as const

function EventsPage() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const ticketTrackRef = useRef<HTMLDivElement>(null)
  const ticketOutputRef = useRef<HTMLDivElement>(null)
  const currentEvent = eventTickets[currentEventIndex]

  useEffect(() => {
    let frame = 0
    let lastIndex = 0

    const syncCurrentEvent = () => {
      const outputRect = ticketOutputRef.current?.getBoundingClientRect()
      const tickets = ticketTrackRef.current?.querySelectorAll<HTMLElement>('.event-ticket')

      if (outputRect && tickets?.length) {
        let largestVisibleArea = 0
        let highestVisibleTop = Number.POSITIVE_INFINITY
        let index = lastIndex

        tickets.forEach((ticket, ticketIndex) => {
          const ticketRect = ticket.getBoundingClientRect()
          const visibleWidth = Math.max(
            0,
            Math.min(ticketRect.right, outputRect.right) -
            Math.max(ticketRect.left, outputRect.left),
          )
          const visibleHeight = Math.max(
            0,
            Math.min(ticketRect.bottom, outputRect.bottom) -
            Math.max(ticketRect.top, outputRect.top),
          )
          const visibleArea = visibleWidth * visibleHeight
          const visibleTop = Math.max(ticketRect.top, outputRect.top)
          const isLarger = visibleArea > largestVisibleArea + 0.5
          const isTiedAndHigher =
            Math.abs(visibleArea - largestVisibleArea) <= 0.5 &&
            visibleArea > 0 &&
            visibleTop < highestVisibleTop

          if (isLarger || isTiedAndHigher) {
            largestVisibleArea = visibleArea
            highestVisibleTop = visibleTop
            index = ticketIndex % eventTickets.length
          }
        })

        if (index !== lastIndex) {
          lastIndex = index
          setCurrentEventIndex(index)
        }
      }

      frame = window.requestAnimationFrame(syncCurrentEvent)
    }

    frame = window.requestAnimationFrame(syncCurrentEvent)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <section className="events-hero" aria-labelledby="events-hero-title">
        <div className="events-hero-content">
          <div className="event-orbit" aria-hidden="true">
            <div className="event-orbit-ring">
              <div className="event-orbit-carousel">
                {eventOrbitImages.map((image, index) => {
                  const angle = (index / eventOrbitImages.length) * 360
                  const style = {
                    '--event-orbit-angle': `${angle}deg`,
                  } as CSSProperties

                  return (
                    <span
                      className="event-orbit-item"
                      key={`${image}-${index}`}
                      style={style}
                    >
                      <img
                        className="event-orbit-image"
                        src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=160&h=220&q=75`}
                        alt=""
                        loading={index < 8 ? 'eager' : 'lazy'}
                      />
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="events-hero-copy">
            <h1 id="events-hero-title">Never miss<br />an Event.</h1>
            <p>New events, live music, and nights out worth looking forward to.</p>
            <a className="events-hero-link" href="#coming-up">
              Explore Events<span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* Black Rectangular Editorial Cover Box */}
      <EventsCoverBox />

      <section
        className="events-story-section"
        id="coming-up"
        aria-label="Event ticket dispenser"
      >
        <div className="events-story-grid">
          <article className="ticket-dispenser-card" aria-label="Ticket dispenser">
            <div className="ticket-dispenser-scene">
              <div className="ticket-dispenser-machine-shell">
                <img
                  className="ticket-dispenser-machine"
                  src={ticketMachineImage}
                  alt="The dispensing slot of a Spotlight ticket machine"
                />
              </div>
              <div className="ticket-dispenser-output" ref={ticketOutputRef}>
                <div
                  className="ticket-dispenser-track"
                  ref={ticketTrackRef}
                  aria-hidden="true"
                >
                  {[...eventTickets, ...eventTickets].map((ticket, index) => (
                    <article
                      className="event-ticket"
                      key={`${ticket.title}-${index}`}
                    >
                      <div className="event-ticket-heading">
                        <span>{ticket.category}</span>
                        <span>{ticket.date}</span>
                      </div>
                      <h2>{ticket.title}</h2>
                      <p className="event-ticket-subtitle">{ticket.subtitle}</p>
                      <div className="event-ticket-details">
                        <span>{ticket.venue}</span>
                        <span>{ticket.time}</span>
                      </div>
                      <p className="event-ticket-admission">{ticket.admission}</p>
                      <span className="event-ticket-stamp">SPOTLIGHT EVENT PASS</span>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </article>
          <article className="events-lineup-card">
            <span className="events-lineup-eyebrow">SPOTLIGHT PRESENTS</span>
            <h2>Coming up</h2>
            <article className="events-current-card" aria-label="Current event">
              <div className="events-current-heading">
                <span>{currentEvent.category}</span>
                <time>{currentEvent.date}</time>
              </div>
              <h3>{currentEvent.title}</h3>
              <p className="events-current-subtitle">{currentEvent.subtitle}</p>
              <dl className="events-current-details">
                <div>
                  <dt>Venue</dt>
                  <dd>{currentEvent.venue}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{currentEvent.time}</dd>
                </div>
              </dl>
              <p className="events-current-admission">{currentEvent.admission}</p>
            </article>
          </article>
        </div>
      </section>

      {/* Library Searcher for Current Events in the City */}
      <EventsLibrarySearcher />
    </>
  )
}

export default EventsPage
