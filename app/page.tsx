'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ArrowRight,
  Clock,
  ExternalLink,
  MapPin,
  Menu,
  MessageCircle,
  Pause,
  Phone,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'

interface Category {
  name: string
  count: string
  tagline: string
  image: string
}

interface Occasion {
  name: string
  subtitle: string
  image: string
}

const categories: Category[] = [
  {
    name: 'Gold',
    count: '120+ Designs',
    tagline: '22K & 24K BIS Hallmarked Heirlooms',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Diamond',
    count: '80+ Designs',
    tagline: 'Certified Solitaires & Fine Jewels',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Silver',
    count: '60+ Designs',
    tagline: '925 Sterling Ornaments & Puja Articles',
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Platinum',
    count: '40+ Designs',
    tagline: 'Rare, Enduring Pure Love Bands',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85',
  },
]

const occasions: Occasion[] = [
  {
    name: 'Bridal Edit',
    subtitle: 'For your forever beginning',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
  },
  {
    name: 'Everyday Luxury',
    subtitle: 'Subtle elegance, every day',
    image:
      'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1000&q=85',
  },
  {
    name: 'Festive Glow',
    subtitle: 'Celebrate in your own light',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85',
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [consultModalOpen, setConsultModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Instagram Reel video player state
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
        setIsVideoPlaying(false)
      } else {
        videoRef.current.play()
        setIsVideoPlaying(true)
      }
    }
  }

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted
      setIsVideoMuted(!isVideoMuted)
    }
  }

  // Consultation form state
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [consultService, setConsultService] = useState('Bridal Jewellery Consultation')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setSearchOpen(false)
        setMenuOpen(false)
        setConsultModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3200)
  }

  // Live search filtering
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredOccasions = occasions.filter((o) =>
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = encodeURIComponent(
      `Hello Poonam Jewellers, I would like to book a consultation.\nName: ${consultName}\nPhone: ${consultPhone}\nService: ${consultService}`
    )
    window.open(`https://wa.me/919892776014?text=${message}`, '_blank')
    setConsultModalOpen(false)
    showToast('Consultation request generated via WhatsApp!')
    setConsultName('')
    setConsultPhone('')
  }

  return (
    <main className="site-shell" id="top">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="site-toast">
          <Sparkles size={16} color="var(--gold)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="site-header">
        <button
          className="icon-button mobile-menu"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} />
        </button>

        <a className="brand" href="#top" aria-label="Poonam Jewellers home">
          <img
            className="brand-logo"
            src="/images/logo.png"
            alt="Poonam Jewellers emblem logo"
            width={52}
            height={52}
          />
          <span>
            Poonam
            <small>JEWELLERS</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#collections">Collections</a>
          <a href="#occasions">Occasions</a>
          <a href="#story">Our Story</a>
          <a href="#visit">Visit Showroom</a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button"
            aria-label="Search collections"
            title="Search (⌘K)"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={19} />
          </button>

          <a
            className="header-whatsapp"
            href="https://wa.me/919892776014?text=Hello%20Poonam%20Jewellers,%20I%20would%20like%20to%20enquire%20about%20your%20jewellery%20collection."
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with Poonam Jewellers on WhatsApp"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={19} />
          </a>

          <button
            className="header-cta-btn"
            onClick={() => setConsultModalOpen(true)}
          >
            Consultation
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top">
              <span className="eyebrow">Poonam Jewellers · Dombivli</span>
              <button
                className="icon-button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav>
              <a href="#collections" onClick={() => setMenuOpen(false)}>
                Collections <ArrowRight size={16} />
              </a>
              <a href="#occasions" onClick={() => setMenuOpen(false)}>
                Occasions <ArrowRight size={16} />
              </a>
              <a href="#story" onClick={() => setMenuOpen(false)}>
                Our Story <ArrowRight size={16} />
              </a>
              <a href="#visit" onClick={() => setMenuOpen(false)}>
                Visit Showroom <ArrowRight size={16} />
              </a>
            </nav>
            <div style={{ marginTop: '20px' }}>
              <button
                className="button button-gold"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setMenuOpen(false)
                  setConsultModalOpen(true)
                }}
              >
                Book a Consultation
              </button>
            </div>
            <p className="drawer-note">
              Crafted with generational trust and artistry in Dombivli East.
            </p>
          </aside>
        </div>
      )}

      {/* Interactive Search Modal */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="search-close icon-button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <X size={24} />
            </button>
            <span className="eyebrow">Search Poonam Jewellers</span>
            <div className="search-field">
              <Search size={26} color="var(--gold-dark)" />
              <input
                autoFocus
                placeholder="Search gold, diamond, silver, bridal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span>ESC to exit</span>
            </div>

            {searchQuery ? (
              <div className="search-results">
                {filteredCategories.map((c) => (
                  <a
                    key={c.name}
                    href={`https://wa.me/919892776014?text=Hello%20Poonam%20Jewellers,%20I%20would%20like%20to%20enquire%20about%20your%20${encodeURIComponent(
                      c.name
                    )}%20jewellery%20collection.`}
                    target="_blank"
                    rel="noreferrer"
                    className="search-result-item"
                    onClick={() => setSearchOpen(false)}
                  >
                    <div>
                      <strong>{c.name} Jewellery</strong>
                      <small>{c.tagline} · {c.count}</small>
                    </div>
                    <ArrowRight size={16} color="var(--gold)" />
                  </a>
                ))}
                {filteredOccasions.map((o) => (
                  <a
                    key={o.name}
                    href="#occasions"
                    className="search-result-item"
                    onClick={() => setSearchOpen(false)}
                  >
                    <div>
                      <strong>{o.name}</strong>
                      <small>{o.subtitle}</small>
                    </div>
                    <ArrowRight size={16} color="var(--gold)" />
                  </a>
                ))}
                {filteredCategories.length === 0 && filteredOccasions.length === 0 && (
                  <p style={{ color: 'var(--muted)', marginTop: '20px' }}>
                    No direct match for &quot;{searchQuery}&quot;. Visit our showroom in Dombivli East to explore our full collection.
                  </p>
                )}
              </div>
            ) : (
              <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginTop: '20px' }}>
                Popular categories: 22K Gold Heirlooms, Certified Solitaires, 925 Sterling Silver, Platinum Love Bands, Bridal Sets.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Book a Consultation Modal */}
      {consultModalOpen && (
        <div
          className="consult-modal-overlay"
          onClick={() => setConsultModalOpen(false)}
        >
          <div className="consult-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="icon-button"
              style={{ position: 'absolute', right: '16px', top: '16px' }}
              onClick={() => setConsultModalOpen(false)}
              aria-label="Close consultation modal"
            >
              <X size={20} />
            </button>
            <span className="eyebrow">Personal Jewellery Concierge</span>
            <h3>Book a Consultation</h3>
            <p>
              Schedule an exclusive one-on-one session at our Dombivli showroom with our master jewellery consultants.
            </p>

            <form onSubmit={handleConsultSubmit} className="consult-form">
              <div className="form-group">
                <label htmlFor="c-name">Your Full Name</label>
                <input
                  id="c-name"
                  required
                  placeholder="e.g. Priyanshu Sharma"
                  value={consultName}
                  onChange={(e) => setConsultName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-phone">Phone / WhatsApp Number</label>
                <input
                  id="c-phone"
                  required
                  type="tel"
                  placeholder="+91 98927 XXXXX"
                  value={consultPhone}
                  onChange={(e) => setConsultPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-service">Consultation Focus</label>
                <select
                  id="c-service"
                  value={consultService}
                  onChange={(e) => setConsultService(e.target.value)}
                >
                  <option>Bridal Jewellery Consultation</option>
                  <option>Custom Heirlooms & Bespoke Design</option>
                  <option>Diamond Solitaire Selection</option>
                  <option>Old Gold Exchange & Valuation</option>
                  <option>Jewellery Restoration & Resizing</option>
                </select>
              </div>

              <button
                type="submit"
                className="button button-gold"
                style={{ marginTop: '10px', justifyContent: 'center' }}
              >
                Confirm via WhatsApp <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modern Luxury Split Hero Section */}
      <section className="hero" aria-label="Hero showcase">
        <div className="hero-container">
          {/* Left Column: Story, Headline, Actions & Trust */}
          <div className="hero-content">
            <span className="hero-eyebrow">Poonam Jewellers · Fine Atelier</span>
            <h1>
              Jewellery that
              <br />
              <em>holds a feeling.</em>
            </h1>
            <p>
              Handcrafted 22K & 24K Gold, Certified Solitaire Diamonds, Platinum & Silver heirlooms crafted for life&apos;s most cherished celebrations.
            </p>
            <div className="hero-buttons">
              <a className="button button-gold" href="#collections">
                Explore Collections <ArrowRight size={17} />
              </a>
              <button
                className="button button-ghost"
                onClick={() => setConsultModalOpen(true)}
              >
                Book Consultation
              </button>
            </div>
            <div className="hero-trust-bar">
              <div className="hero-trust-item">
                <ShieldCheck size={18} color="var(--gold)" />
                <span>100% BIS Hallmarked</span>
              </div>
              <div className="hero-trust-item">
                <Sparkles size={18} color="var(--gold)" />
                <span>Certified Diamonds</span>
              </div>
              <div className="hero-trust-item">
                <MapPin size={18} color="var(--gold)" />
                <span>Dombivli Showroom</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="hero-visual-wrap">
            <div className="hero-card-main">
              <img
                src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=90"
                alt="Poonam Jewellers Master Craftsmanship"
                className="hero-main-img"
              />
              <div className="hero-card-overlay">
                <span className="hero-card-tag">Master Vault</span>
                <h3>Bridal & Heritage Heirlooms</h3>
                <a href="#collections" className="hero-card-link">
                  Explore Collections <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Video & Story */}
      <section className="atelier-video" id="film">
        <div className="video-intro">
          <span className="eyebrow">Inside the atelier</span>
          <h2>
            A glimpse of
            <br />
            <em>our world.</em>
          </h2>
          <p>
            Discover the artistry, meticulous precision, and enduring dedication behind every Poonam Jewellers creation.
          </p>
          <a
            className="text-link"
            href="https://www.instagram.com/reel/DKzSqOTSj5v/"
            target="_blank"
            rel="noreferrer"
          >
            Watch reel on Instagram <ArrowRight size={16} />
          </a>
        </div>
        <div className="atelier-reel-card">
          <video
            ref={videoRef}
            src="/AQPPWCohjl85C5vVSjG9Ya45p2FreIzPWryvYoJ4Mf433ABwOR4Gfsp1JDtEmQnc7AMnYClOCC8aTEUgUXMAdZS1DP7Me3tj-jSEvaw.mp4"
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            preload="auto"
            onClick={toggleVideoPlay}
            style={{ cursor: 'pointer' }}
          >
            <source
              src="/AQPPWCohjl85C5vVSjG9Ya45p2FreIzPWryvYoJ4Mf433ABwOR4Gfsp1JDtEmQnc7AMnYClOCC8aTEUgUXMAdZS1DP7Me3tj-jSEvaw.mp4"
              type="video/mp4"
            />
            <source src="/videos/atelier.mp4" type="video/mp4" />
          </video>
          <div className="atelier-reel-overlay">
            <div className="atelier-reel-badge">
              <span className="atelier-reel-dot" />
              <span>@poonamjewellersofficial · Reel</span>
            </div>
            <div className="atelier-reel-controls">
              <button
                type="button"
                className="video-control-btn"
                onClick={toggleVideoPlay}
                aria-label={isVideoPlaying ? 'Pause reel' : 'Play reel'}
                title={isVideoPlaying ? 'Pause' : 'Play'}
              >
                {isVideoPlaying ? <Pause size={17} /> : <Play size={17} style={{ marginLeft: '2px' }} />}
              </button>
              <button
                type="button"
                className="video-control-btn"
                onClick={toggleVideoMute}
                aria-label={isVideoMuted ? 'Unmute reel' : 'Mute reel'}
                title={isVideoMuted ? 'Unmute sound' : 'Mute sound'}
              >
                {isVideoMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Collections Grid */}
      <section className="section collection-section" id="collections">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Our Master Vault</span>
            <h2>
              Explore by <em>category.</em>
            </h2>
          </div>
          <button
            className="text-link"
            style={{ background: 'none', border: '0', cursor: 'pointer', padding: '0 0 6px 0' }}
            onClick={() => setConsultModalOpen(true)}
          >
            Custom order enquiry <ArrowRight size={16} />
          </button>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <a
              className="category-card"
              href={`https://wa.me/919892776014?text=Hello%20Poonam%20Jewellers,%20I%20would%20like%20to%20enquire%20about%20your%20${encodeURIComponent(
                category.name
              )}%20jewellery%20collection.`}
              target="_blank"
              rel="noreferrer"
              key={category.name}
              title={`Enquire about ${category.name} Jewellery`}
            >
              <img
                src={category.image}
                alt={`${category.name} Jewellery at Poonam Jewellers`}
                loading="lazy"
              />
              <div className="category-info">
                <span>{category.count}</span>
                <h3>{category.name}</h3>
                <ArrowRight size={18} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Occasions Section */}
      <section className="occasion-section" id="occasions">
        <div className="section-heading centered">
          <div>
            <span className="eyebrow">Curated Moments</span>
            <h2>
              Shop by <em>occasion.</em>
            </h2>
          </div>
        </div>
        <div className="occasion-grid">
          {occasions.map((occasion) => (
            <a
              className="occasion-card"
              href="#collections"
              key={occasion.name}
              title={`Shop ${occasion.name}`}
            >
              <img src={occasion.image} alt={occasion.name} loading="lazy" />
              <div>
                <span>{occasion.subtitle}</span>
                <h3>{occasion.name}</h3>
                <ArrowRight size={17} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Values & Legacy Section */}
      <section className="values-section" id="story">
        <div className="values-inner">
          <div className="value-image">
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85"
              alt="Gold jewellery craftsmanship"
              loading="lazy"
            />
          </div>
          <div className="values-copy">
            <span className="eyebrow">The Poonam promise</span>
            <h2>
              Some things are
              <br />
              <em>worth doing right.</em>
            </h2>
            <p>
              With generations of trust in Dombivli, we believe jewellery should feel as profound as it looks. That means absolute transparency in pricing, 100% BIS hallmarked gold, and a relationship that lasts across generations.
            </p>
            <div className="value-list">
              <div>
                <ShieldCheck size={22} />
                <span>
                  <strong>100% BIS Hallmarked</strong>
                  Every gold ornament is stamped with official HUID certification.
                </span>
              </div>
              <div>
                <Sparkles size={22} />
                <span>
                  <strong>Custom Artisan Studio</strong>
                  Bring your dream bridal trousseau or heirloom sketch to reality.
                </span>
              </div>
            </div>
            <button
              className="button button-gold"
              onClick={() => setConsultModalOpen(true)}
            >
              Book a Consultation <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Single Compact Unified Luxury Footer */}
      <footer className="site-footer" id="visit">
        <div className="footer-unified-grid">
          {/* Column 1: Brand & Contact Info */}
          <div className="footer-col-brand">
            <a className="brand" href="#top" aria-label="Poonam Jewellers">
              <img
                className="brand-logo"
                src="/images/logo.png"
                alt="Poonam Jewellers logo"
                width={52}
                height={52}
              />
              <span>
                Poonam
                <small>JEWELLERS</small>
              </span>
            </a>
            <p>
              Timeless BIS hallmarked gold, certified diamonds, platinum, and silver jewellery crafted with trust in Dombivli East.
            </p>
            <div className="footer-brand-contact">
              <a href="tel:+919892776014">
                <Phone size={15} color="var(--gold)" /> +91 98927 76014
              </a>
              <a href="tel:+919820489976">
                <Phone size={15} color="var(--gold)" /> +91 98204 89976
              </a>
              <a
                href="https://wa.me/919892776014?text=Hello%20Poonam%20Jewellers,%20I%20would%20like%20to%20enquire."
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={15} color="#25D366" /> Chat on WhatsApp
              </a>
              <a
                href="https://www.instagram.com/reel/DKzSqOTSj5v/"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={15} color="var(--gold)" /> Follow on Instagram
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col-links">
            <span className="eyebrow">Explore</span>
            <a href="#collections">Gold Jewellery</a>
            <a href="#collections">Diamond Jewellery</a>
            <a href="#collections">Silver Ornaments</a>
            <a href="#collections">Platinum Bands</a>
            <a href="#occasions">Bridal Collections</a>
            <a href="#story">Our Legacy & Artisans</a>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                setConsultModalOpen(true)
              }}
            >
              Book Showroom Consultation
            </a>
          </div>

          {/* Column 3: Compact Map Card */}
          <div className="footer-map-card">
            <div className="footer-map-header">
              <span className="eyebrow" style={{ fontSize: '11px', margin: 0 }}>Visit Showroom</span>
              <a
                href="https://maps.app.goo.gl/fmXLR9BJD8FGqCw7"
                target="_blank"
                rel="noreferrer"
              >
                Directions <ArrowRight size={13} />
              </a>
            </div>

            <div className="footer-map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.48862023127327!2d73.095164043437!3d19.203153336206384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795820133ff6f%3A0xbe4563c49f72b364!2sPOONAM%20JEWELLERS!5e0!3m2!1sen!2sin!4v1792217712273!5m2!1sen!2sin"
                title="Poonam Jewellers showroom map"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="footer-map-details">
              <span>
                <MapPin size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} color="var(--gold)" />
                Shop no 1, Bhagwan Smruti Bldg, Manpada Rd, Sagaon
              </span>
              <span style={{ whiteSpace: 'nowrap' }}>
                <Clock size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} color="var(--gold)" />
                10:30 AM – 9:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <span>© 2026 Poonam Jewellers. All rights reserved.</span>
          <span>Crafted with trust in Dombivli</span>
          <span style={{ display: 'flex', gap: '16px' }}>
            <a
              href="https://wa.me/919892776014"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/reel/DKzSqOTSj5v/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://maps.app.goo.gl/fmXLR9BJD8FGqCw7"
              target="_blank"
              rel="noreferrer"
            >
              Google Maps
            </a>
          </span>
        </div>
      </footer>

      {/* Floating Quick Action Bar for Mobile */}
      <div className="quick-actions" role="navigation" aria-label="Quick contact actions">
        <a href="tel:+919892776014">
          <Phone size={16} /> Call
        </a>
        <a
          href="https://wa.me/919892776014?text=Hello%20Poonam%20Jewellers,%20I%20would%20like%20to%20enquire%20about%20your%20jewellery."
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
        <a
          href="https://maps.app.goo.gl/fmXLR9BJD8FGqCw7"
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={16} /> Showroom
        </a>
      </div>
    </main>
  )
}
