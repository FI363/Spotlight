import './LifestylePage.css'
import carousel1 from '../assets/lifestyle_carousel_1.jpg'
import carousel2 from '../assets/lifestyle_carousel_2.jpg'
import carousel3 from '../assets/lifestyle_carousel_3.jpg'
import { VinylPlayer } from '../components/VinylPlayer'
import { ReelsSection } from '../components/ReelsSection'
import { TrendsSection } from '../components/TrendsSection'
import { PopCultureSection } from '../components/PopCultureSection'


const ARTICLES = [
  { img: carousel1, tag: 'WELLNESS', title: 'A slower kind of morning', excerpt: 'How to build a morning routine that focuses on intentional slowness, grounding yourself before the rush of the day begins. In this piece, we explore the benefits of slow brewing coffee, journaling, and embracing the quiet moments.' },
  { img: carousel2, tag: 'SPACES', title: 'Interiors that feel like home', excerpt: 'Creating spaces that are meant to be lived in, not just looked at. We talk to three interior designers about the importance of soft lighting, textured fabrics, and personal artifacts in making a house feel like a home.' },
  { img: carousel3, tag: 'FOOD', title: 'Comfort on a plate', excerpt: 'A journey through recipes that feel like a warm hug. From slow-cooked stews to freshly baked bread, this collection of culinary ideas focuses on the sensory experience of cooking and the joy of sharing a meal with loved ones.' },
  { img: carousel1, tag: 'FASHION', title: 'Everyday expressions', excerpt: 'Fashion as a daily language. Moving away from fleeting trends, we explore the concept of a capsule wardrobe built on quality, comfort, and pieces that tell a story over time.' },
  { img: carousel2, tag: 'CULTURE', title: 'Sounds that move you', excerpt: 'The resurgence of analog audio in a digital age. Why putting a record on a turntable forces us to listen differently, and the artists who are shaping the modern vinyl revival.' },
  { img: carousel3, tag: 'PLACES', title: 'Cities, corners and escapes', excerpt: 'Discovering the hidden spots that offer respite in bustling cities. A curated guide to secret gardens, quiet corner cafes, and architectural havens that provide a moment of peace.' }
]


function LifestylePage() {

  return (
    <div className="lifestyle-page" id="lifestyle-top">
      {/* Hero Section */}
      <section className="lifestyle-hero">


        {/* Right Side: Text */}
        <div className="lifestyle-hero-container">
          <div className="lifestyle-hero-eyebrow">
            <div className="eyebrow-line"></div>
            <span>LIFESTYLE</span>
          </div>
          <svg
            viewBox="0 0 680 160"
            xmlns="http://www.w3.org/2000/svg"
            className="lifestyle-hero-logo"
            aria-label="Lifestyle"
          >
            <style>
              {`
                .rotating-star {
                  animation: star-spin 6s linear infinite;
                  transform-origin: 0px 0px;
                }
                @keyframes star-spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}
            </style>
            <g fill="currentColor">
              {/* L and i stem block */}
              <path d="M 20 36 H 40 V 120 H 85 V 80 H 105 V 140 H 20 Z" />
              {/* Rotating Star */}
              <g transform="translate(95, 50)">
                <polygon
                  className="rotating-star"
                  points="0,-14 4,-4 13,-4 5,2 8,11 0,5 -8,11 -5,2 -13,-4 -4,-4"
                />
              </g>
              {/* Rest of the word */}
              <text
                x="104"
                y="140"
                fontFamily="var(--heading, 'Inter', sans-serif)"
                fontWeight="900"
                fontSize="115"
                letterSpacing="-0.04em"
              >
                festyle
              </text>
            </g>
          </svg>
          <p className="lifestyle-hero-subtitle">
            Curated experiences, modern wellness, and the art of living well. Explore our handpicked guide to elevating your everyday.
          </p>
          <button className="lifestyle-hero-btn">
            <span>Explore now</span>
            <div className="btn-arrow-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </button>
        </div>


        {/* Right Side: Vinyl Player */}
        <div className="lifestyle-hero-media">
          <VinylPlayer />
        </div>
      </section>

      {/* Newsletter Card */}
      <section className="newsletter-card">
        <div className="newsletter-text">
          <span className="newsletter-eyebrow">THE WEEKLY DIGEST</span>
          <h2 className="newsletter-title">Wanna be featured ?</h2>
          <p className="newsletter-desc">
            Mail us email@gmail.com and see if you got what it takes.
          </p>
        </div>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" className="newsletter-input" placeholder="Enter your email" aria-label="Email address" />
          <button type="submit" className="newsletter-btn">Subscribe</button>
        </form>
      </section>

      {/* Trends Section */}
      <TrendsSection />

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
          <div className="carousel-header-left">
            <h2 className="carousel-title">Essential Items</h2>
            <div className="carousel-divider"></div>
            <span className="carousel-subtitle">PRODUCTS FOR A BETTER EVERYDAY</span>
          </div>
          <a href="#" className="carousel-explore">
            EXPLORE ALL
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" style={{ marginLeft: '4px' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div className="lifestyle-carousel">
          <div className="lifestyle-carousel-track">
            {[...Array(2)].map((_, groupIndex) => (
              <div className="carousel-group" key={groupIndex} style={{ display: 'flex' }}>
                {ARTICLES.map((item, i) => (
                  <div
                    className="lifestyle-carousel-card"
                    key={`${groupIndex}-${i}`}
                  >
                    <img src={item.img} alt={item.title} className="carousel-card-img" />
                    <div className="carousel-card-content">
                      <div className="carousel-card-text">
                        <span className="carousel-card-tag">{item.tag}</span>
                        <h3 className="carousel-card-title">{item.title}</h3>
                      </div>
                      <button className="carousel-card-btn" aria-label="Read more">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Pop Culture Section */}
      <PopCultureSection />

      {/* Reel Section */}
      <ReelsSection />
    </div>
  )
}

export default LifestylePage
