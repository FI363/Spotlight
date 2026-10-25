import { useState } from 'react'
import './EventsCoverBox.css'

const TICKER_ITEMS = [
  'MIDNIGHT JAZZ VAULT · FEW SLIPS REMAINING',
  'ATELIER COBALT PRUSSIAN BLUE STUDIO OPENS 14:00',
  'SOLARIUM NATURAL WINE TASTINGS DOORS AT 18:30',
  'METROPOLITAN EVENT INDEX UPDATED HOURLY',
  'NITRATE FILM VAULT 35MM NOIR TONIGHT 23:15',
  'EXCLUSIVE SPOTLIGHT DIGITAL PASS ACCESS',
]

export function EventsCoverBox() {
  const [claimed, setClaimed] = useState(false)

  return (
    <section className="events-cover-box-section" aria-label="Curated headliner event pass">
      <div className="events-cover-box">
        {/* Top Marquee Ticker */}
        <div className="cover-box-ticker-wrap" aria-hidden="true">
          <div className="cover-box-ticker-badge">
            <span className="ticker-live-dot"></span>
            <span>LIVE ARCHIVE</span>
          </div>
          <div className="cover-box-ticker-track">
            {[...Array(2)].map((_, groupIdx) => (
              <div className="cover-box-ticker-group" key={groupIdx}>
                {TICKER_ITEMS.map((item, i) => (
                  <span className="ticker-item" key={i}>
                    <span className="ticker-star">★</span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="cover-box-content">
          {/* Left Column: Editorial Headline & Meta */}
          <div className="cover-box-editorial">
            <div className="cover-box-eyebrow">
              <span className="cover-pill">SPOTLIGHT CURATED</span>
              <span className="cover-issue">SERIES NO. 04 · NOCTURNAL CITY ARCHIVE</span>
            </div>

            <h2 className="cover-box-title">
              Subterranean Soundwaves: The Midnight Vault Sessions
            </h2>

            <p className="cover-box-desc">
              An uncompressed acoustic experience in pitch darkness. Rare Japanese spiritual jazz master reels, live modular synthesizer rescores, and subterranean quadraphonic horn systems.
            </p>

            <div className="cover-box-meta-chips">
              <div className="meta-chip">
                <span className="meta-chip-label">DATE & TIME</span>
                <span className="meta-chip-val">Tonight · 22:00 – Late</span>
              </div>
              <div className="meta-chip">
                <span className="meta-chip-label">LOCATION</span>
                <span className="meta-chip-val">Depot Vault Room 2 · Orchard St</span>
              </div>
              <div className="meta-chip">
                <span className="meta-chip-label">CAPACITY</span>
                <span className="meta-chip-val highlight">60 Seats · Soundproofed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Ticket Pass Callout */}
          <div className="cover-box-ticket-wrapper">
            <div className="cover-ticket-pass">
              {/* Top Notch Accents */}
              <div className="ticket-notch ticket-notch--left" aria-hidden="true"></div>
              <div className="ticket-notch ticket-notch--right" aria-hidden="true"></div>

              <div className="ticket-pass-header">
                <span className="ticket-pass-kicker">ADMISSION CARD</span>
                <span className="ticket-pass-id">#NY-VAULT-2026</span>
              </div>

              <div className="ticket-pass-body">
                <span className="ticket-event-label">SPECIAL ACCESS PASS</span>
                <h3 className="ticket-event-name">Vault Room 2 Session</h3>
                <span className="ticket-event-sub">Includes Hi-Fi Listening Flight</span>
              </div>

              {/* Perforation Line */}
              <div className="ticket-perforation" aria-hidden="true">
                <div className="perforation-line"></div>
              </div>

              {/* Barcode & Action */}
              <div className="ticket-pass-footer">
                <div className="ticket-barcode" aria-hidden="true">
                  {[3, 1, 4, 2, 5, 1, 3, 2, 6, 1, 4, 2, 5, 3, 2, 4, 1, 5, 2, 6, 2, 3, 5, 1, 4].map((w, idx) => (
                    <span key={idx} style={{ width: `${w}px` }}></span>
                  ))}
                </div>

                <button
                  type="button"
                  className={`ticket-claim-btn ${claimed ? 'is-claimed' : ''}`}
                  onClick={() => setClaimed(!claimed)}
                  aria-label={claimed ? 'Pass claimed' : 'Claim Spotlight Guest Pass'}
                >
                  {claimed ? (
                    <>
                      <span className="btn-check">✓</span>
                      Pass Secured
                    </>
                  ) : (
                    <>
                      <span>Claim Pass</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ambient Status Bar */}
        <div className="cover-box-bottom-bar">
          <div className="cover-live-status">
            <span className="status-bars" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="status-text">CURRENT ROOM TEMPERATURE: 19°C · SOUND CHECK VERIFIED</span>
          </div>

          <div className="cover-attendance-stat">
            <span className="stat-label">RESERVATION QUOTA</span>
            <div className="stat-bar" aria-hidden="true">
              <div className="stat-fill" style={{ width: '82%' }}></div>
            </div>
            <span className="stat-pct">82% Claimed</span>
          </div>
        </div>
      </div>
    </section>
  )
}
