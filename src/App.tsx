import { useEffect, useRef, useState, type ComponentType } from 'react'
import './App.css'
import './HomePage.css'
import { categories } from './data/categories'
import EventsPage from './pages/EventsPage'
import FashionPage from './pages/FashionPage'
import FoodPage from './pages/FoodPage'
import LifestylePage from './pages/LifestylePage'

const floatingDoodles = [
  { id: 'star-1', icon: 'star', lane: 8, size: 30, duration: 32, delay: 0, direction: 'ltr' },
  { id: 'cloud-1', icon: 'cloud', lane: 17, size: 37, duration: 39, delay: 12, direction: 'rtl' },
  { id: 'heart-1', icon: 'heart', lane: 27, size: 28, duration: 35, delay: 22, direction: 'ltr' },
  { id: 'flower-1', icon: 'flower', lane: 37, size: 34, duration: 42, delay: 7, direction: 'rtl' },
  { id: 'sun-1', icon: 'sun', lane: 47, size: 30, duration: 37, delay: 29, direction: 'ltr' },
  { id: 'leaf-1', icon: 'leaf', lane: 58, size: 31, duration: 40, delay: 16, direction: 'rtl' },
  { id: 'sparkle-1', icon: 'sparkle', lane: 68, size: 34, duration: 34, delay: 4, direction: 'ltr' },
  { id: 'rainbow-1', icon: 'rainbow', lane: 79, size: 38, duration: 44, delay: 25, direction: 'rtl' },
  { id: 'note-1', icon: 'note', lane: 90, size: 29, duration: 36, delay: 10, direction: 'ltr' },
  { id: 'smile-1', icon: 'smile', lane: 13, size: 30, duration: 41, delay: 28, direction: 'rtl' },
  { id: 'camera-1', icon: 'camera', lane: 32, size: 35, duration: 38, delay: 19, direction: 'ltr' },
  { id: 'lightning-1', icon: 'lightning', lane: 53, size: 28, duration: 33, delay: 14, direction: 'rtl' },
  { id: 'mushroom-1', icon: 'mushroom', lane: 73, size: 33, duration: 43, delay: 2, direction: 'ltr' },
  { id: 'heart-2', icon: 'heart', lane: 95, size: 26, duration: 37, delay: 32, direction: 'rtl' },
  { id: 'star-2', icon: 'star', lane: 22, size: 23, duration: 45, delay: 34, direction: 'ltr' },
  { id: 'flower-2', icon: 'flower', lane: 63, size: 28, duration: 39, delay: 9, direction: 'rtl' },
  { id: 'cloud-2', icon: 'cloud', lane: 84, size: 31, duration: 35, delay: 20, direction: 'ltr' },
  { id: 'sparkle-2', icon: 'sparkle', lane: 42, size: 25, duration: 41, delay: 26, direction: 'rtl' },
] as const

type DoodleIconName =
  | 'star'
  | 'heart'
  | 'sparkle'
  | 'flower'
  | 'sun'
  | 'note'
  | 'cloud'
  | 'leaf'
  | 'rainbow'
  | 'smile'
  | 'camera'
  | 'lightning'
  | 'mushroom'

const extraDoodleIcons: DoodleIconName[] = [
  'star',
  'heart',
  'sparkle',
  'flower',
  'sun',
  'note',
  'cloud',
  'leaf',
  'rainbow',
  'smile',
  'camera',
  'lightning',
  'mushroom',
]

const extraDoodles = Array.from({ length: 36 }, (_, index) => ({
  id: `extra-${index}`,
  icon: extraDoodleIcons[index % extraDoodleIcons.length],
  lane: ((index * 37 + 11) % 96) + 2,
  size: 19 + ((index * 7) % 18),
  duration: 34 + ((index * 11) % 20),
  delay: (index * 13) % 53,
  direction: index % 2 === 0 ? 'ltr' : 'rtl',
}))

function DoodleIcon({ name }: { name: DoodleIconName }) {
  return (
    <svg className="doodle-icon" viewBox="0 0 64 64" aria-hidden="true">
      {name === 'star' && (
        <path d="m32 5 7.2 18.1 19.5 1.4-15 12.5 4.8 19-16.5-10.4L15.5 56l4.8-19L5 24.5l19.7-1.4L32 5Z" />
      )}
      {name === 'heart' && (
        <path d="M32 55 10.8 34.7C-3 21.3 14.8 4.4 28 18l4 4 4-4c13.2-13.6 31-1.7 17.2 16.7L32 55Z" />
      )}
      {name === 'sparkle' && (
        <>
          <path d="M25 4c0 18-7 25-23 27 16 2 23 9 23 27 0-18 7-25 23-27C32 29 25 22 25 4Z" />
          <path d="M51 5v17m-8.5-8.5h17M49 39v19m-9.5-9.5h19" />
        </>
      )}
      {name === 'flower' && (
        <>
          <path d="M32 30c-12-6-10-21 0-21s12 15 0 21Zm2 3c6-12 21-10 21 0s-15 12-21 0Zm-3 2c12 6 10 21 0 21s-12-15 0-21Zm-2-3C23 44 8 42 8 32s15-12 21 0Z" />
          <circle cx="32" cy="32" r="5" />
        </>
      )}
      {name === 'sun' && (
        <>
          <circle cx="32" cy="32" r="12" />
          <path d="M32 3v9m0 40v9M3 32h9m40 0h9M11.5 11.5l6.4 6.4m28.2 28.2 6.4 6.4m0-41-6.4 6.4m-28.2 28.2-6.4 6.4" />
        </>
      )}
      {name === 'note' && (
        <path d="M39 10v35.5a9 9 0 1 1-5-8V18l22-5v25.5a9 9 0 1 1-5-8V10l-12 3v-3Z" />
      )}
      {name === 'cloud' && (
        <path d="M16 48a12 12 0 0 1-2-23.8 18 18 0 0 1 34-3A13 13 0 1 1 49 48H16Z" />
      )}
      {name === 'leaf' && (
        <>
          <path d="M55 8C26 8 9 18 9 39c0 10 7 17 17 17C47 56 55 37 55 8Z" />
          <path d="M12 53c9-14 20-24 35-35" />
        </>
      )}
      {name === 'rainbow' && (
        <path d="M5 55a27 27 0 0 1 54 0M14 55a18 18 0 0 1 36 0M23 55a9 9 0 0 1 18 0" />
      )}
      {name === 'smile' && (
        <>
          <circle cx="32" cy="32" r="25" />
          <path d="M22 25h.1m19.8 0h.1M21 37c2 8 7 12 11 12s9-4 11-12" />
        </>
      )}
      {name === 'camera' && (
        <>
          <path d="M8 20h12l4-6h16l4 6h12a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4Z" />
          <circle cx="32" cy="36" r="11" />
          <circle cx="49" cy="26" r="2" />
        </>
      )}
      {name === 'lightning' && (
        <path d="M37 4 14 35h16l-3 25 23-34H34l3-22Z" />
      )}
      {name === 'mushroom' && (
        <>
          <path d="M8 30a24 24 0 0 1 48 0H8Zm17 0v18a7 7 0 0 0 14 0V30" />
          <path d="M23 17h.1m13-5h.1m9 13h.1M27 38h.1" />
        </>
      )}
    </svg>
  )
}

const polaroidVideo =
  'https://videos.pexels.com/video-files/3195394/3195394-hd_1280_720_25fps.mp4'

const socialLinks = [
  { name: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/' },
  { name: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/' },
  { name: 'x', label: 'X', href: 'https://x.com/' },
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { name: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/' },
  { name: 'gmail', label: 'Gmail', href: 'https://mail.google.com/' },
] as const

function SocialIcon({ name }: { name: (typeof socialLinks)[number]['name'] }) {
  return (
    <svg className="hero-social-icon" viewBox="0 0 24 24" aria-hidden="true">
      {name === 'youtube' && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="4" />
          <path className="hero-social-icon-cutout" d="m10 9 5 3-5 3z" />
        </>
      )}
      {name === 'tiktok' && (
        <path d="M14 3v11.2a3 3 0 1 1-2.4-2.9V8.8a6 6 0 1 0 5.2 5.8V9.5c1.3 1 2.7 1.5 4.2 1.6V7.8c-2.3-.2-3.8-1.7-4.2-3.4V3z" />
      )}
      {name === 'x' && (
        <path d="M5 4 19 20M19 4 5 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
      )}
      {name === 'instagram' && (
        <>
          <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3.7" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.4" cy="6.8" r="1.1" />
        </>
      )}
      {name === 'linkedin' && (
        <path d="M5 8.5H2.5V21H5zm-1.25-6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM21 13.3c0-3.4-1.8-5-4.2-5a3.6 3.6 0 0 0-3.2 1.8V8.5h-2.5V21h2.5v-6.2c0-1.7.3-3.3 2.4-3.3 2 0 2 1.9 2 3.4V21h2.5z" />
      )}
      {name === 'facebook' && (
        <path d="M13.4 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3V10H7.2v3h2.8v8z" />
      )}
      {name === 'gmail' && (
        <path d="M4.5 7h15v11h-3v-7.1L12 14.5l-4.5-3.6V18h-3zM5 7l7 5.5L19 7" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      )}
    </svg>
  )
}

const categoryPages: Record<string, ComponentType> = {
  '/lifestyle': LifestylePage,
  '/events': EventsPage,
  '/food': FoodPage,
  '/fashion': FashionPage,
}

function normalizePath(path: string) {
  return path === '/' ? path : path.replace(/\/+$/, '')
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname))
  const categoriesRef = useRef<HTMLElement>(null)
  const [categoriesVisible, setCategoriesVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )
  const [flippedCards, setFlippedCards] = useState<Set<string>>(() => new Set())
  const [activePolaroid, setActivePolaroid] = useState(0)
  const ActiveCategoryPage = categoryPages[currentPath]
  const activeCategory = categories.find(({ slug }) => currentPath === `/${slug}`)

  useEffect(() => {
    const syncPath = () => {
      setCurrentPath(normalizePath(window.location.pathname))
      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  useEffect(() => {
    const section = categoriesRef.current
    if (!section || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCategoriesVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (currentPath !== '/') return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let interval: number | undefined

    const startRotation = () => {
      if (interval !== undefined || motionPreference.matches) return
      interval = window.setInterval(() => {
        setActivePolaroid((current) => (current + 1) % categories.length)
      }, 2500)
    }

    const stopRotation = () => {
      if (interval === undefined) return
      window.clearInterval(interval)
      interval = undefined
    }

    const updateRotation = () => {
      if (motionPreference.matches) {
        stopRotation()
      } else {
        startRotation()
      }
    }

    motionPreference.addEventListener('change', updateRotation)
    updateRotation()

    return () => {
      motionPreference.removeEventListener('change', updateRotation)
      stopRotation()
    }
  }, [currentPath])

  useEffect(() => {
    document.title = activeCategory
      ? `${activeCategory.name} | Spotlight`
      : currentPath === '/'
        ? 'Spotlight'
        : 'Page not found | Spotlight'
  }, [activeCategory, currentPath])

  return (
    <div className="site-shell">
      <div className="doodle-field" aria-hidden="true">
        {[...floatingDoodles, ...extraDoodles].map(({ id, icon, lane, size, duration, delay, direction }) => (
          <span
            className={`doodle-flight doodle-flight--${direction}`}
            key={id}
            style={{
              top: `${lane}%`,
              width: size,
              height: size,
              animationDuration: `${duration}s`,
              animationDelay: `-${delay}s`,
            }}
          >
            <DoodleIcon name={icon} />
          </span>
        ))}
      </div>
      <header className="topbar">
        <a className="topbar-brand" href="/">
          Spotlight
        </a>
        <nav className="topbar-nav" aria-label="Main navigation">
          <a className="topbar-link" href="/" aria-current={currentPath === '/' ? 'page' : undefined}>
            Home
          </a>
          {categories.map(({ name, slug }) => (
            <a
              className="topbar-link"
              href={`/${slug}`}
              key={slug}
              aria-current={currentPath === `/${slug}` ? 'page' : undefined}
            >
              {name}
            </a>
          ))}
        </nav>
        <span className="topbar-caption">YOUR MEDIA, TOGETHER</span>
      </header>
      <main>
        {ActiveCategoryPage ? (
          <ActiveCategoryPage />
        ) : currentPath !== '/' ? (
          <section className="category-page" aria-labelledby="not-found-title">
            <div className="category-page-content">
              <div className="category-page-feature">
                <div className="category-page-copy">
                  <span className="category-heading-eyebrow">SPOTLIGHT / PAGE NOT FOUND</span>
                  <h1 id="not-found-title">Nothing here yet.</h1>
                  <p>That page isn’t part of our collections. Head back to Spotlight to keep exploring.</p>
                  <a className="category-page-link" href="/">
                    Back to Home <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <>
        <section className="landing" id="home" aria-label="Spotlight">
          <div className="hero-layout">
            <div className="hero-left">
              <div className="brand">
                <h1 className="wordmark">
                  Spotlight<span className="wordmark-cursor" aria-hidden="true" />
                </h1>
              </div>
              <div className="hero-copy">
                <span className="hero-copy-label">YOUR WHOLE WORLD</span>
                <p className="hero-copy-title">
                  All your media
                  <br />
                  <span>in one place.</span>
                </p>
              </div>
            </div>
            <div className="polaroid-stage" role="group" aria-label="A looping stack of Spotlight videos">
              {categories.map((category, index) => {
                const slot = (index - activePolaroid + categories.length) % categories.length
                const position = ['front', 'right', 'back', 'left'][slot]

                return (
                  <button
                    className={`polaroid-card polaroid-card--${category.tone} polaroid-card--${position}`}
                    key={category.name}
                    type="button"
                    aria-label={`Bring ${category.name} video to the front`}
                    onClick={() => setActivePolaroid(index)}
                  >
                    <span className="polaroid-media">
                      <video
                        className="polaroid-video"
                        src={polaroidVideo}
                        poster={category.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                      />
                      <span className="polaroid-label">{category.name}</span>
                      <span className="polaroid-duration">a moment to keep</span>
                    </span>
                    <span className="polaroid-caption">
                      <span>SPOTLIGHT / {category.name.toUpperCase()}</span>
                      <strong>{category.description}</strong>
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="hero-categories">
              <ul className="hero-category-list" aria-label="Media categories">
                <li>Lifestyle</li>
                <li>Events</li>
                <li>Food</li>
                <li>Fashion</li>
              </ul>
            </div>
            <div className="hero-footer">
              <div className="hero-hashtags" aria-label="Spotlight tags">
                <span>#kolkata</span>
                <span>#spotlight</span>
                <span>#sadafthemanager</span>
              </div>
              <nav className="hero-socials" aria-label="Find us online">
                <span className="hero-socials-label">JOIN US</span>
                <div className="hero-socials-links">
                  {socialLinks.map(({ name, label, href }) => (
                    <a
                      className={`hero-social-link hero-social-link--${name}`}
                      href={href}
                      key={name}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                    >
                      <SocialIcon name={name} />
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </section>
        <section className="media-intro" aria-label="Your media, together">
          <div className="media-card-row">
            <div className="media-card">
              <span className="media-card-label">ONE HOME FOR IT ALL</span>
              <h2>Good things deserve to be kept.</h2>
              <p>
                Bring your saved inspiration, favorite moments, and little
                discoveries together in one place.
              </p>
              <div className="media-card-icons" aria-hidden="true">
                <span>♡</span>
                <span>✳</span>
                <span>♫</span>
                <span>▧</span>
              </div>
            </div>
            <aside className="media-side-card" aria-label="A mix of saved media">
              <span className="media-card-label">YOUR COLLECTION</span>
              <div className="collection-stack" aria-hidden="true">
                <span className="collection-tile collection-tile--photo">✦</span>
                <span className="collection-tile collection-tile--music">♫</span>
                <span className="collection-tile collection-tile--note">♡</span>
              </div>
              <h3>A little bit of everything.</h3>
              <p>Photos, places, playlists, and all the things you want to find again.</p>
              <span className="collection-count"><span className="collection-dot" /> ALL IN ONE PLACE</span>
            </aside>
          </div>
        </section>
        <section
          className={`categories${categoriesVisible ? ' is-visible' : ''}`}
          ref={categoriesRef}
          aria-labelledby="categories-heading"
        >
          <div className="categories-content">
            <header className="category-heading">
              <span className="category-heading-eyebrow">SPOTLIGHT / COLLECTIONS</span>
              <h2 id="categories-heading">Explore what you love.</h2>
              <p>Find a little inspiration in every part of your world.</p>
            </header>
            <div className="category-grid">
              {categories.map(({ name, slug, description, image, tone }) => {
                const isFlipped = flippedCards.has(name)

                return (
                  <article className="category-card" key={name}>
                    <button
                      className={`category-flipper${isFlipped ? ' is-flipped' : ''}`}
                      type="button"
                      aria-pressed={isFlipped}
                      aria-label={`${name}: ${isFlipped ? 'hide' : 'show'} description`}
                      onClick={() => {
                        setFlippedCards((current) => {
                          const next = new Set(current)
                          if (next.has(name)) next.delete(name)
                          else next.add(name)
                          return next
                        })
                      }}
                    >
                      <span className={`category-face category-front category-front--${tone}`}>
                        <img className="category-image" src={image} alt="" loading="lazy" />
                        <span className="category-front-content">
                          <span className="category-eyebrow">SPOTLIGHT / {tone}</span>
                          <span className="category-title">{name}</span>
                          <span className="category-hint">Tap to discover <span aria-hidden="true">↗</span></span>
                        </span>
                      </span>
                      <span className={`category-face category-back category-back--${tone}`}>
                        <span className="category-eyebrow">A LITTLE OF EVERYTHING</span>
                        <span className="category-title">{name}</span>
                        <span className="category-description">{description}</span>
                        <span className="category-hint">Tap to turn back <span aria-hidden="true">↶</span></span>
                      </span>
                    </button>
                    <a
                      className={`category-visit category-visit--${tone}`}
                      href={`/${slug}`}
                    >
                      Visit {name}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
          </>
        )}
      </main>
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand-group">
            <a className="footer-brand" href="/">
              Spotlight
            </a>
            <p className="footer-tagline">all your media in one place</p>
          </div>
          <a className="footer-back-to-top" href="/">
            Back to top <span aria-hidden="true">↑</span>
          </a>
          <p className="footer-copyright">© 2026 Spotlight</p>
        </div>
      </footer>
    </div>
  )
}

export default App
