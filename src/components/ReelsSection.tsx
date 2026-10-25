import { useState, useRef, useEffect } from 'react'
import reelVideo1 from '../assets/Vinyl_record_rotating_on_turntable_20261009202426.mp4'
import reelVideo2 from '../assets/kinetic_title_sequence.mp4'
import carousel1 from '../assets/lifestyle_carousel_1.jpg'
import carousel2 from '../assets/lifestyle_carousel_2.jpg'

export interface ReelComment { user: string; text: string; time: string }

export interface ReelData {
  id: string
  video: string
  poster: string
  description: string
  tags: string
  details: string[]
  likes: number
  comments: ReelComment[]
}

const FALLBACK_REELS: ReelData[] = [
  {
    id: 'local-1',
    video: reelVideo1,
    poster: carousel1,
    description: 'Put the needle down and let the room fill up. A slow Sunday soundtrack for mornings worth staying in for.',
    tags: '#slowliving #vinyl #sundayreset',
    details: [
      'Shot on a quiet Sunday morning with nothing but a turntable, a window and a cup of coffee.',
      'The record is a 1974 pressing we found at a local flea market. Its warm crackle is the whole mood of this reel.',
      'Try this at home: pick one album, put your phone away, and listen all the way through. Side A to Side B.',
    ],
    likes: 1284,
    comments: [
      { user: 'maya.r', text: 'This is the exact calm I needed today 🌿', time: '2h' },
      { user: 'jonas_k', text: 'The sound of vinyl never gets old.', time: '5h' },
      { user: 'aria.lives', text: 'Saving this for my Sunday mornings!', time: '1d' },
    ],
  },
  {
    id: 'local-2',
    video: reelVideo2,
    poster: carousel2,
    description: 'Motion, type and a little bit of rhythm. A short title sequence for the way we tell our stories.',
    tags: '#motion #design #everydayedit',
    details: [
      'A kinetic type study exploring how movement can carry meaning before a single word is read.',
      'Built frame by frame with a focus on rhythm: every beat of the sequence lands on a letterform.',
      'This title sequence opens our Everyday Expressions series, a collection of small ideas about design in daily life.',
    ],
    likes: 862,
    comments: [
      { user: 'leo.studio', text: 'That typography is so clean.', time: '3h' },
      { user: 'sana.m', text: 'Where can I get this as a wallpaper?', time: '9h' },
    ],
  },
]

export function ReelsSection() {
  const [reels, setReels] = useState<ReelData[]>(FALLBACK_REELS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [reelIndex, setReelIndex] = useState(0)
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({})
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({})
  const [commentsMap, setCommentsMap] = useState<Record<string, ReelComment[]>>({})
  const [shared, setShared] = useState(false)
  const [muted, setMuted] = useState(true)
  const [heartKey, setHeartKey] = useState(0)
  const [showDesc, setShowDesc] = useState(false)
  const [draft, setDraft] = useState('')
  const lastTap = useRef(0)

  // Setup Instagram API fetching mechanics here
  // In a real app, this would hit your own backend endpoint (e.g. /api/instagram/reels)
  // which securely holds your Instagram Graph API access token and fetches the reels.
  useEffect(() => {
    const fetchInstagramReels = async () => {
      // setLoading(true)
      try {
        // const response = await fetch('/api/instagram/reels')
        // if (!response.ok) throw new Error('Failed to fetch reels')
        // const data = await response.json()
        // 
        // Map the Instagram API response to our ReelData structure
        // const mappedReels = data.data.map(item => ({
        //   id: item.id,
        //   video: item.media_url,
        //   poster: item.thumbnail_url || '',
        //   description: item.caption || '',
        //   tags: '', // Extract tags from caption if needed
        //   details: [item.caption || ''], 
        //   likes: item.like_count || 0,
        //   comments: [] // Would need a separate API call per reel to fetch comments
        // }))
        // setReels(mappedReels)
      } catch (err: any) {
        // setError(err.message)
        // Fallback to local reels on error
        console.error("Using fallback local reels. Instagram fetch failed:", err)
      } finally {
        // setLoading(false)
      }
    }

    // Uncomment to enable fetching
    // fetchInstagramReels()
  }, [])

  if (reels.length === 0) return null

  const reel = reels[reelIndex]
  const liked = !!likedMap[reel.id]
  const saved = !!savedMap[reel.id]
  const comments = commentsMap[reel.id] ?? reel.comments

  const toggleLike = () => {
    const next = !liked
    setLikedMap({ ...likedMap, [reel.id]: next })
    if (next) setHeartKey((k) => k + 1)
  }

  const likeFromDoubleClick = () => {
    if (!liked) setLikedMap({ ...likedMap, [reel.id]: true })
    setHeartKey((k) => k + 1)
  }

  const handleVideoTap = () => {
    const now = Date.now()
    if (now - lastTap.current < 300) likeFromDoubleClick()
    lastTap.current = now
  }

  const nextReel = () => {
    setReelIndex((reelIndex + 1) % reels.length)
    setHeartKey(0)
    setDraft('')
    setShowDesc(false)
  }

  const addComment = (e: React.FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setCommentsMap({ ...commentsMap, [reel.id]: [{ user: 'you', text, time: 'now' }, ...comments] })
    setDraft('')
  }

  const shareReel = () => {
    navigator.clipboard?.writeText(window.location.href)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  return (
    <section className="reel-section">
      <div className="reel-video-wrap" onClick={handleVideoTap}>
        <video key={reel.id} className="reel-video" src={reel.video} poster={reel.poster} autoPlay loop muted={muted} playsInline />
        <button
          type="button"
          className="reel-mute-btn"
          onClick={(e) => { e.stopPropagation(); setMuted(!muted) }}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M19 5a10 10 0 0 1 0 14" /></svg>
          )}
        </button>
        {heartKey > 0 && (
          <svg key={heartKey} className="reel-heart-pop" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="reel-heart-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff5e7e" />
                <stop offset="100%" stopColor="#c4001d" />
              </linearGradient>
            </defs>
            <path fill="url(#reel-heart-grad)" d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        )}
      </div>

      <div className="reel-panel">
        <div className="reel-author">
          <div>
            <div className="reel-author-name">Spotlight</div>
            <div className="reel-author-meta">Reel · Everyday expressions</div>
          </div>
          <button type="button" className="reel-next-btn" onClick={nextReel}>
            Next reel
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>
        </div>

        <p className="reel-description">
          {reel.description} <span className="reel-tags">{reel.tags}</span>
        </p>

        <div className="reel-actions">
          <button type="button" className={`reel-action ${liked ? 'is-active' : ''}`} onClick={toggleLike} aria-pressed={liked}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
            <span>{reel.likes + (liked ? 1 : 0)}</span>
          </button>
          <button type="button" className={`reel-action ${showDesc ? 'is-active' : ''}`} onClick={() => setShowDesc(!showDesc)} aria-expanded={showDesc}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="14" y2="18" /></svg>
            <span>Description</span>
          </button>
          <button type="button" className={`reel-action ${shared ? 'is-active' : ''}`} onClick={shareReel}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.6" y1="13.5" x2="15.4" y2="17.5" /><line x1="15.4" y1="6.5" x2="8.6" y2="10.5" /></svg>
            <span>{shared ? 'Link copied' : 'Share'}</span>
          </button>
          <button type="button" className={`reel-action reel-action-save ${saved ? 'is-active' : ''}`} onClick={() => setSavedMap({ ...savedMap, [reel.id]: !saved })} aria-pressed={saved} aria-label="Save">
            <svg viewBox="0 0 24 24" width="20" height="20" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </button>
        </div>

        {showDesc ? (
          <>
            <h3 className="reel-comments-title">About this reel</h3>
            <div className="reel-details">
              {reel.details.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3 className="reel-comments-title">Comments</h3>
            <ul className="reel-comments">
              {comments.map((c, i) => (
                <li className="reel-comment" key={i}>
                  <div className="reel-comment-avatar">{c.user[0].toUpperCase()}</div>
                  <div>
                    <div className="reel-comment-head"><strong>{c.user}</strong><span>{c.time}</span></div>
                    <p>{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <form className="reel-comment-form" onSubmit={addComment}>
              <input id="reel-comment-input" type="text" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a comment..." aria-label="Add a comment" />
              <button type="submit" disabled={!draft.trim()}>Post</button>
            </form>
          </>
        )}
      </div>
    </section>
  )
}
