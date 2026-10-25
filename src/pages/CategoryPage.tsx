import type { Category } from '../data/categories'
import './CategoryPage.css'

function CategoryPage({ category, heroVideo }: { category: Category; heroVideo?: string }) {
  return (
    <section className="category-page" aria-labelledby="category-page-title">
      <div className="category-page-content">
        <div
          className={`category-page-feature category-page-feature--${category.tone}${heroVideo ? ' category-page-feature--video' : ''}`}
        >
          <div className="category-page-image-wrap">
            {heroVideo ? (
              <video
                className="category-page-image category-page-image--video"
                src={heroVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
              />
            ) : (
              <img
                className="category-page-image"
                src={category.image}
                alt={`${category.name} inspiration`}
              />
            )}
            <span className="category-page-image-label">
              SPOTLIGHT / {category.name.toUpperCase()}
            </span>
          </div>
          <div className="category-page-copy">
            <span className="category-heading-eyebrow">YOUR SPOTLIGHT COLLECTION</span>
            <h1 id="category-page-title">{category.name}</h1>
            <p>{category.description}</p>
            <a className="category-page-link" href="/">
              Explore all collections <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryPage
