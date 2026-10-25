import { useState, useMemo } from 'react'
import './EventsLibrarySearcher.css'

export interface LibraryEvent {
  id: string
  callNumber: string
  classification: string
  category: 'music' | 'visual' | 'culinary' | 'film' | 'talks'
  categoryLabel: string
  title: string
  subtitle: string
  venue: string
  district: 'downtown' | 'bushwick' | 'uptown' | 'waterfront'
  districtLabel: string
  roomStack: string
  dateText: string
  timeText: string
  timeFrame: 'tonight' | 'weekend' | 'upcoming'
  admission: string
  isFree: boolean
  status: 'CIRCULATING' | 'LIMITED SLIPS' | 'RESERVE REQ.' | 'OPEN STACKS'
  stampColor: string
  description: string
  tags: string[]
}

const LIBRARY_EVENTS: LibraryEvent[] = [
  {
    id: 'ev-01',
    callNumber: 'ARC·781.42 / NY-01',
    classification: '780 · SOUND & LIVE',
    category: 'music',
    categoryLabel: 'Music & Sound',
    title: 'Midnight Vinyl Listening Session',
    subtitle: 'Reel-to-Reel & Japanese Jazz Fusion',
    venue: 'The Subterranean Vault, 88 Orchard St',
    district: 'downtown',
    districtLabel: 'Downtown & SoHo',
    roomStack: 'Floor B2 · Sound Chamber',
    dateText: 'Tonight, Oct 16',
    timeText: '22:00 – 01:30 EST',
    timeFrame: 'tonight',
    admission: 'Free RSVP · 40 seats max',
    isFree: true,
    status: 'CIRCULATING',
    stampColor: '#2563eb',
    description: 'Uncompressed master tapes and first-pressing Japanese spiritual jazz played in pitch-black darkness through vintage 1974 Klipschorn corner horns.',
    tags: ['Analog Audio', 'Spiritual Jazz', 'Late Night', 'Hi-Fi'],
  },
  {
    id: 'ev-02',
    callNumber: 'ARC·772.10 / PR-08',
    classification: '700 · VISUAL ARTS',
    category: 'visual',
    categoryLabel: 'Visual & Galleries',
    title: 'Cyanotype & Wet-Plate Studio',
    subtitle: 'Sun-Printing & Botanical Emulsion Archive',
    venue: 'Atelier Cobalt, Dumbo Lofts',
    district: 'waterfront',
    districtLabel: 'Waterfront & Dumbo',
    roomStack: 'Studio 4A · Light Lab',
    dateText: 'Saturday, Oct 18',
    timeText: '13:00 – 16:30 EST',
    timeFrame: 'weekend',
    admission: '$18 Materials Included',
    isFree: false,
    status: 'LIMITED SLIPS',
    stampColor: '#c2410c',
    description: 'Explore 19th-century photographic iron salt processes. Create archival Prussian blue cyanotypes using fresh greenhouse botanicals and vintage urban negatives.',
    tags: ['Darkroom', 'Cyanotype', 'Printmaking', 'Tactile'],
  },
  {
    id: 'ev-03',
    callNumber: 'ARC·641.87 / FERM-3',
    classification: '641 · GASTRONOMY',
    category: 'culinary',
    categoryLabel: 'Culinary & Tastings',
    title: 'Fermentation & Wild Koji Clinic',
    subtitle: 'Micro-Larder Tasting & Masterclass',
    venue: 'The Yeast & Copper Cellar, Greenpoint',
    district: 'bushwick',
    districtLabel: 'Lower East Side & Bushwick',
    roomStack: 'Fermentation Larder · Bay 3',
    dateText: 'Sunday, Oct 19',
    timeText: '11:30 – 14:00 EST',
    timeFrame: 'weekend',
    admission: '$24 · Includes Starter Culture',
    isFree: false,
    status: 'RESERVE REQ.',
    stampColor: '#b45309',
    description: 'A sensory dissection of traditional cedar-tub koji fermentation, two-year aged buckwheat misos, and sparkling wild-ferment pét-nats produced along the Hudson Valley.',
    tags: ['Fermentation', 'Koji', 'Food Science', 'Tasting'],
  },
  {
    id: 'ev-04',
    callNumber: 'ARC·791.43 / FLM-99',
    classification: '791 · CINEMA & STAGES',
    category: 'film',
    categoryLabel: 'Cinema & Stages',
    title: '35mm Celluloid Noir & Live Synth',
    subtitle: '1954 Restored Print + Modular Rescore',
    venue: 'The Metrograph Screening Room',
    district: 'downtown',
    districtLabel: 'Downtown & SoHo',
    roomStack: 'Auditorium C · Nitrate Vault',
    dateText: 'Tonight, Oct 16',
    timeText: '23:15 – 01:10 EST',
    timeFrame: 'tonight',
    admission: '$12 Archival Pass',
    isFree: false,
    status: 'CIRCULATING',
    stampColor: '#4f46e5',
    description: 'An immaculate 35mm print projection of cold-war cityscape cinema, underscored live with patched Buchla and Eurorack analog oscillators.',
    tags: ['35mm Film', 'Live Score', 'Film Noir', 'Modular'],
  },
  {
    id: 'ev-05',
    callNumber: 'ARC·720.97 / ARCH-12',
    classification: '800 · WORDS & HISTORIES',
    category: 'talks',
    categoryLabel: 'Talks & Print',
    title: 'Architecture of the Shadows Tour',
    subtitle: 'Pneumatic Tubes, Alleys & Cast-Iron Facades',
    venue: 'Departing Trinity Church Yard',
    district: 'downtown',
    districtLabel: 'Downtown & SoHo',
    roomStack: 'Public Wayfinding · Route 1',
    dateText: 'Friday, Oct 17',
    timeText: '19:30 – 21:30 EST',
    timeFrame: 'upcoming',
    admission: 'Free Public Access',
    isFree: true,
    status: 'OPEN STACKS',
    stampColor: '#059669',
    description: 'City historian walking survey exploring forgotten underground mail tubes, subterranean vault lights, and the engineering marvels of pre-electric Manhattan.',
    tags: ['Walking Tour', 'Architecture', 'Hidden History', 'Free'],
  },
  {
    id: 'ev-06',
    callNumber: 'ARC·780.28 / AMB-04',
    classification: '780 · SOUND & LIVE',
    category: 'music',
    categoryLabel: 'Music & Sound',
    title: 'Quadraphonic Ambient Greenhouse',
    subtitle: 'Bio-Voltage Plant Resonance & Modular Harps',
    venue: 'Conservatory Palm Dome, Central Botanical',
    district: 'uptown',
    districtLabel: 'Harlem & Uptown',
    roomStack: 'Palm Glasshouse · Sector 2',
    dateText: 'Sunday, Oct 19',
    timeText: '16:00 – 19:30 EST',
    timeFrame: 'weekend',
    admission: '$10 Conservatory Entry',
    isFree: false,
    status: 'CIRCULATING',
    stampColor: '#15803d',
    description: 'Four spatial speakers positioned across a humid sub-tropical canopy playing micro-currents translated directly from living monstera leaves into lush sine waves.',
    tags: ['Ambient', 'Bio-Sound', 'Botanical', 'Immersive'],
  },
  {
    id: 'ev-07',
    callNumber: 'ARC·808.02 / PUB-56',
    classification: '800 · WORDS & HISTORIES',
    category: 'talks',
    categoryLabel: 'Talks & Print',
    title: 'Indie Small-Press & Risograph Fair',
    subtitle: '60+ Micro-Publishers, Chapbooks & Zines',
    venue: 'Old Foundry Yards, East Williamsburg',
    district: 'bushwick',
    districtLabel: 'Lower East Side & Bushwick',
    roomStack: 'Main Hall · Press Tables',
    dateText: 'Saturday & Sunday',
    timeText: '12:00 – 18:00 EST',
    timeFrame: 'weekend',
    admission: 'Free Entry',
    isFree: true,
    status: 'OPEN STACKS',
    stampColor: '#0d9488',
    description: 'Gathering of independent risograph print collectives, typography foundries, radical political tracts, and experimental accordion-fold artist publications.',
    tags: ['Risograph', 'Zines', 'Art Books', 'Typography'],
  },
  {
    id: 'ev-08',
    callNumber: 'ARC·641.22 / NAT-22',
    classification: '641 · GASTRONOMY',
    category: 'culinary',
    categoryLabel: 'Culinary & Tastings',
    title: 'Low-Intervention Wine & Crudo Salon',
    subtitle: 'Skin-Contact Macerations & Day-Boat Crudo',
    venue: 'Solarium Terrace, Chinatown',
    district: 'downtown',
    districtLabel: 'Downtown & SoHo',
    roomStack: 'Rooftop Solarium',
    dateText: 'Tonight, Oct 16',
    timeText: '18:30 – 21:30 EST',
    timeFrame: 'tonight',
    admission: '$28 Flight & Plate',
    isFree: false,
    status: 'LIMITED SLIPS',
    stampColor: '#be185d',
    description: 'A curated flight of amber Georgian qvevri wines and volcanic Sicilian whites paired with thinly sliced Atlantic fluke, fermented Meyer lemon, and wild caper leaf.',
    tags: ['Natural Wine', 'Seafood', 'Rooftop', 'Sunset'],
  },
  {
    id: 'ev-09',
    callNumber: 'ARC·738.10 / CLAY-07',
    classification: '700 · VISUAL ARTS',
    category: 'visual',
    categoryLabel: 'Visual & Galleries',
    title: 'Subterranean Raku Ceramic Firing',
    subtitle: 'Live Kiln Openings & Smoked Stoneware',
    venue: 'Kiln Vault 9, Long Island City',
    district: 'waterfront',
    districtLabel: 'Waterfront & Dumbo',
    roomStack: 'Kiln Yard · Trench 1',
    dateText: 'Friday, Oct 17',
    timeText: '19:00 – 22:30 EST',
    timeFrame: 'upcoming',
    admission: 'Free RSVP',
    isFree: true,
    status: 'CIRCULATING',
    stampColor: '#b91c1c',
    description: 'Witness glowing red-hot 1000°C clay vessels pulled from open kilns and plunged directly into cedar sawdust bins for lustrous metallic carbon reductions.',
    tags: ['Raku Firing', 'Ceramics', 'Fire & Craft', 'Subterranean'],
  },
]

type CategoryFilter = 'all' | 'music' | 'visual' | 'culinary' | 'film' | 'talks'
type DistrictFilter = 'all' | 'downtown' | 'bushwick' | 'uptown' | 'waterfront'
type TimeFilter = 'all' | 'tonight' | 'weekend' | 'upcoming'

export function EventsLibrarySearcher() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictFilter>('all')
  const [selectedTime, setSelectedTime] = useState<TimeFilter>('all')
  const [freeOnly, setFreeOnly] = useState(false)
  const [savedEventIds, setSavedEventIds] = useState<string[]>([])
  const [activeSlipEvent, setActiveSlipEvent] = useState<LibraryEvent | null>(null)
  const [slipStamped, setSlipStamped] = useState(false)

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSavedEventIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleOpenSlip = (event: LibraryEvent) => {
    setActiveSlipEvent(event)
    setSlipStamped(false)
  }

  const handleStampSlip = () => {
    setSlipStamped(true)
  }

  const filteredEvents = useMemo(() => {
    return LIBRARY_EVENTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false
      }
      // District filter
      if (selectedDistrict !== 'all' && item.district !== selectedDistrict) {
        return false
      }
      // Time filter
      if (selectedTime !== 'all' && item.timeFrame !== selectedTime) {
        return false
      }
      // Free only
      if (freeOnly && !item.isFree) {
        return false
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim()
        const matchTitle = item.title.toLowerCase().includes(q)
        const matchVenue = item.venue.toLowerCase().includes(q)
        const matchCall = item.callNumber.toLowerCase().includes(q)
        const matchDesc = item.description.toLowerCase().includes(q)
        const matchTag = item.tags.some((t) => t.toLowerCase().includes(q))
        const matchClass = item.classification.toLowerCase().includes(q)
        if (!matchTitle && !matchVenue && !matchCall && !matchDesc && !matchTag && !matchClass) {
          return false
        }
      }
      return true
    })
  }, [searchQuery, selectedCategory, selectedDistrict, selectedTime, freeOnly])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedDistrict('all')
    setSelectedTime('all')
    setFreeOnly(false)
  }

  return (
    <section className="events-library-section" id="city-events-library" aria-label="City events library archive">
      <div className="library-card-catalog">
        {/* Brass Header Plate */}
        <header className="library-catalog-header">
          <div className="library-brass-tag">
            <span className="library-screw library-screw--left" aria-hidden="true">•</span>
            <span className="library-brass-label">CATALOGUE DRAWER NO. 04 · METROPOLITAN EVENT ARCHIVE</span>
            <span className="library-screw library-screw--right" aria-hidden="true">•</span>
          </div>

          <div className="library-header-main">
            <div className="library-title-group">
              <span className="library-eyebrow">PUBLIC ACCESS CATALOGUE · CITY REGISTRY</span>
              <h2 className="library-title">City Events Library</h2>
              <p className="library-subtitle">
                Search active records, subterranean listening rooms, analog screenings, and cultural gatherings currently in circulation across the city.
              </p>
            </div>

            <div className="library-stats-badge">
              <div className="library-stats-indicator">
                <span className="library-pulse-dot"></span>
                <span className="library-stats-count">{filteredEvents.length} RECORDS</span>
              </div>
              <span className="library-stats-sub">ON PUBLIC STACKS</span>
              {savedEventIds.length > 0 && (
                <div className="library-saved-pill">
                  ★ {savedEventIds.length} Saved to Slip
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Tactile Library Search Console */}
        <div className="library-search-console">
          {/* Main Search Input */}
          <div className="library-search-bar-wrap">
            <div className="library-search-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              className="library-search-input"
              placeholder="Search catalog by title, artist, venue, call no. or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search city events catalog"
            />
            {searchQuery && (
              <button
                type="button"
                className="library-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
              >
                ✕
              </button>
            )}
          </div>

          {/* Classification Drawer Tabs (Dewey System) */}
          <div className="library-drawers-tabs" role="tablist" aria-label="Event classification drawers">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              className={`library-tab-btn ${selectedCategory === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              <span className="tab-code">[ALL]</span> All Collections
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'music'}
              className={`library-tab-btn ${selectedCategory === 'music' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('music')}
            >
              <span className="tab-code">780</span> Sound & Live
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'visual'}
              className={`library-tab-btn ${selectedCategory === 'visual' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('visual')}
            >
              <span className="tab-code">700</span> Visual & Galleries
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'culinary'}
              className={`library-tab-btn ${selectedCategory === 'culinary' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('culinary')}
            >
              <span className="tab-code">641</span> Culinary & Tastings
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'film'}
              className={`library-tab-btn ${selectedCategory === 'film' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('film')}
            >
              <span className="tab-code">791</span> Cinema & Stages
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'talks'}
              className={`library-tab-btn ${selectedCategory === 'talks' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('talks')}
            >
              <span className="tab-code">800</span> Talks & Print
            </button>
          </div>

          {/* Secondary Controls Bar */}
          <div className="library-filters-bar">
            <div className="library-filter-field">
              <label htmlFor="district-select" className="library-filter-label">DISTRICT:</label>
              <select
                id="district-select"
                className="library-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value as DistrictFilter)}
              >
                <option value="all">All Boroughs & Districts</option>
                <option value="downtown">Downtown & SoHo</option>
                <option value="bushwick">Lower East & Bushwick</option>
                <option value="waterfront">Waterfront & Dumbo</option>
                <option value="uptown">Harlem & Uptown</option>
              </select>
            </div>

            <div className="library-filter-field">
              <label htmlFor="time-select" className="library-filter-label">TIMEFRAME:</label>
              <select
                id="time-select"
                className="library-select"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value as TimeFilter)}
              >
                <option value="all">All Available Dates</option>
                <option value="tonight">Tonight</option>
                <option value="weekend">This Weekend</option>
                <option value="upcoming">Upcoming Days</option>
              </select>
            </div>

            <label className="library-checkbox-label">
              <input
                type="checkbox"
                className="library-checkbox"
                checked={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
              />
              <span>Free Admission Only</span>
            </label>

            {(searchQuery || selectedCategory !== 'all' || selectedDistrict !== 'all' || selectedTime !== 'all' || freeOnly) && (
              <button
                type="button"
                className="library-reset-btn"
                onClick={resetFilters}
              >
                Reset Stacks
              </button>
            )}
          </div>
        </div>

        {/* Index Cards Grid */}
        {filteredEvents.length === 0 ? (
          <div className="library-empty-state">
            <div className="library-empty-stamp">RECORD NOT FOUND</div>
            <h3>No index slips match your current query</h3>
            <p>Try clearing your search terms or selecting a broader classification drawer.</p>
            <button type="button" className="library-empty-btn" onClick={resetFilters}>
              Reset Index Drawers
            </button>
          </div>
        ) : (
          <div className="library-cards-grid" role="region" aria-label="Event Index Cards">
            {filteredEvents.map((event) => {
              const isSaved = savedEventIds.includes(event.id)

              return (
                <article
                  key={event.id}
                  className="library-index-card"
                  onClick={() => handleOpenSlip(event)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open circulation slip for ${event.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleOpenSlip(event)
                    }
                  }}
                >
                  {/* Manila top index rule line */}
                  <div className="index-card-redline" aria-hidden="true"></div>

                  {/* Header Row: Call Number & Status Stamp */}
                  <div className="index-card-header">
                    <div className="index-call-number">
                      <span className="call-code">{event.callNumber}</span>
                      <span className="call-class">{event.classification}</span>
                    </div>

                    <div
                      className="index-status-stamp"
                      style={{ borderColor: event.stampColor, color: event.stampColor }}
                    >
                      {event.status}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="index-card-body">
                    <h3 className="index-event-title">{event.title}</h3>
                    <p className="index-event-subtitle">{event.subtitle}</p>

                    {/* Metadata Ledger */}
                    <dl className="index-card-ledger">
                      <div className="ledger-row">
                        <dt>WHEN</dt>
                        <dd><strong>{event.dateText}</strong> · {event.timeText}</dd>
                      </div>
                      <div className="ledger-row">
                        <dt>STACK</dt>
                        <dd>{event.roomStack}</dd>
                      </div>
                      <div className="ledger-row">
                        <dt>VENUE</dt>
                        <dd>{event.venue}</dd>
                      </div>
                      <div className="ledger-row">
                        <dt>ADMISSION</dt>
                        <dd className="admission-tag">{event.admission}</dd>
                      </div>
                    </dl>

                    <p className="index-card-desc">{event.description}</p>

                    {/* Tags */}
                    <div className="index-tags-wrap">
                      {event.tags.map((tag) => (
                        <span key={tag} className="index-tag">#{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Punched Catalog Hole & Actions */}
                  <div className="index-card-footer">
                    {/* Authentic card catalog rod hole */}
                    <div className="index-card-rod-hole" title="Catalog drawer rod hole" aria-hidden="true"></div>

                    <div className="index-card-actions">
                      <button
                        type="button"
                        className={`index-bookmark-btn ${isSaved ? 'is-saved' : ''}`}
                        onClick={(e) => toggleBookmark(event.id, e)}
                        aria-label={isSaved ? 'Remove from saved slips' : 'Save to library slip'}
                        title={isSaved ? 'Saved in library pocket' : 'Save to library pocket'}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>{isSaved ? 'Saved' : 'Slip'}</span>
                      </button>

                      <button
                        type="button"
                        className="index-view-slip-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenSlip(event)
                        }}
                      >
                        Borrow Slip
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Footer Note */}
        <div className="library-catalog-footer">
          <span className="library-footer-stamp">SPOTLIGHT PUBLIC COLLECTION · NYC STACKS</span>
          <span className="library-footer-text">
            All records verified with local independent venues. Return slips and reservation notices updated hourly.
          </span>
        </div>
      </div>

      {/* Circulation Slip Modal (Interactive Library Due Date Card) */}
      {activeSlipEvent && (
        <div
          className="circulation-modal-backdrop"
          onClick={() => setActiveSlipEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-slip-title"
        >
          <div
            className="circulation-slip-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              className="slip-close-btn"
              onClick={() => setActiveSlipEvent(null)}
              aria-label="Close circulation slip"
            >
              ✕
            </button>

            {/* Vintage Due Date Slip Header */}
            <div className="slip-header">
              <span className="slip-subheading">SPOTLIGHT PUBLIC ARCHIVES · CIRCULATION SLIP</span>
              <h3 id="modal-slip-title" className="slip-title">Official Event Due Date Record</h3>
              <p className="slip-callout">
                Present this stamped slip or your Spotlight digital card at admission.
              </p>
            </div>

            {/* Event Specifics on Card */}
            <div className="slip-content-grid">
              <div className="slip-meta-block">
                <span className="slip-meta-label">CALL NUMBER</span>
                <span className="slip-meta-val monospace">{activeSlipEvent.callNumber}</span>
              </div>
              <div className="slip-meta-block">
                <span className="slip-meta-label">CLASSIFICATION</span>
                <span className="slip-meta-val">{activeSlipEvent.classification}</span>
              </div>
              <div className="slip-meta-block slip-meta-block--full">
                <span className="slip-meta-label">RECORD TITLE</span>
                <span className="slip-meta-val title-val">{activeSlipEvent.title}</span>
                <span className="slip-meta-sub">{activeSlipEvent.subtitle}</span>
              </div>
              <div className="slip-meta-block">
                <span className="slip-meta-label">SCHEDULED DATE</span>
                <span className="slip-meta-val highlight">{activeSlipEvent.dateText}</span>
              </div>
              <div className="slip-meta-block">
                <span className="slip-meta-label">ACCESS TIME</span>
                <span className="slip-meta-val">{activeSlipEvent.timeText}</span>
              </div>
              <div className="slip-meta-block">
                <span className="slip-meta-label">LOCATION & STACK</span>
                <span className="slip-meta-val">{activeSlipEvent.venue}</span>
                <span className="slip-meta-sub">{activeSlipEvent.roomStack}</span>
              </div>
              <div className="slip-meta-block">
                <span className="slip-meta-label">ADMISSION</span>
                <span className="slip-meta-val highlight">{activeSlipEvent.admission}</span>
              </div>
            </div>

            {/* Stamped Date Table Section */}
            <div className="slip-stamps-table">
              <div className="slip-stamps-header">
                <span>DATE DUE</span>
                <span>BORROWER STACK ID</span>
                <span>STATUS</span>
              </div>
              <div className="slip-stamps-row">
                <span className="stamped-date">OCT 09 2026</span>
                <span className="stamped-id">ARCHIVE-DESK-01</span>
                <span className="stamped-note">RETURNED</span>
              </div>
              <div className="slip-stamps-row">
                <span className="stamped-date">OCT 14 2026</span>
                <span className="stamped-id">PATRON-88219</span>
                <span className="stamped-note">RENEWED</span>
              </div>
              <div className={`slip-stamps-row current-stamp-row ${slipStamped ? 'is-stamped' : ''}`}>
                <span className="stamped-date stamped-date--active">
                  {slipStamped ? 'CONFIRMED · OCT 16 2026' : 'PENDING STAMP'}
                </span>
                <span className="stamped-id">PATRON-GUEST-PASS</span>
                <span className="stamped-note stamp-glow">
                  {slipStamped ? 'OFFICIALLY STAMPED' : 'UNSTAMPED'}
                </span>
              </div>
            </div>

            {/* Barcode Graphic */}
            <div className="slip-barcode-wrap" aria-hidden="true">
              <div className="barcode-bars">
                {[4, 2, 6, 1, 3, 5, 2, 4, 1, 7, 3, 2, 5, 2, 6, 1, 4, 3, 2, 6, 4, 1, 5, 2, 3, 6, 2, 4, 5, 1, 3, 6, 2, 5, 1, 4].map((width, i) => (
                  <span key={i} style={{ width: `${width}px` }} className="barcode-stripe"></span>
                ))}
              </div>
              <span className="barcode-number">*NYC-SLIP-{activeSlipEvent.id.toUpperCase()}-2026*</span>
            </div>

            {/* Slip Action Buttons */}
            <div className="slip-actions">
              {!slipStamped ? (
                <button
                  type="button"
                  className="slip-stamp-btn"
                  onClick={handleStampSlip}
                >
                  <span className="stamp-icon">✎</span>
                  Stamp & Reserve Slip
                </button>
              ) : (
                <div className="slip-stamped-feedback">
                  <span className="stamp-success-icon">✓</span>
                  <span>Slip Validated & Reserved in Archive</span>
                </div>
              )}
              <button
                type="button"
                className="slip-done-btn"
                onClick={() => setActiveSlipEvent(null)}
              >
                Close Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
