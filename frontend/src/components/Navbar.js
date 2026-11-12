import React, { useState, useEffect, useRef } from 'react';
import portfolioData from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'Home',        section: 'home' },
  { label: 'What I Build', section: 'what-i-build' },
  { label: 'Skills',      section: 'skills' },
  { label: 'Projects',    section: 'projects' },
  { label: 'Journey',     section: 'timeline' },
  { label: 'Achievements',section: 'achievements' },
  { label: 'About',       section: 'about' },
  { label: 'Contact',     section: 'contact' },
];

const TRACKED_SECTIONS = NAV_LINKS.map((l) => l.section);

const styles = `
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0;
  background: rgba(36,24,19,0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(198,155,50,0.1);
  transition: all 0.3s ease;
}
.navbar.scrolled {
  background: rgba(36,24,19,0.98);
  border-bottom-color: rgba(198,155,50,0.2);
  box-shadow: 0 4px 30px rgba(0,0,0,0.3);
}
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
}
.logo-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg,#C69B32,#E6C879);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9rem;
  color: #241813;
  flex-shrink: 0;
}
.logo-text {
  color: #F5EFE5;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.5px;
  font-family: Inter, -apple-system, sans-serif;
}
.nav-menu {
  display: flex;
  list-style: none;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
}
.nav-link {
  background: none;
  border: none;
  cursor: pointer;
  color: #B9A99A;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 8px;
  transition: all 0.25s ease;
  font-family: Inter, -apple-system, sans-serif;
  position: relative;
}
.nav-link:hover,
.nav-link.active {
  color: #C69B32;
}
.nav-link.active {
  background: rgba(198,155,50,0.1);
}
.nav-resume-btn {
  background: linear-gradient(135deg,#C69B32,#E6C879);
  color: #241813;
  padding: 9px 20px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  margin-left: 1rem;
  white-space: nowrap;
  font-family: Inter, -apple-system, sans-serif;
}
.nav-resume-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(198,155,50,0.4);
}
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  flex-direction: column;
  gap: 5px;
  z-index: 1001;
}
.hamburger-bar {
  display: block;
  width: 24px;
  height: 2px;
  background: #C69B32;
  border-radius: 2px;
  transition: all 0.3s ease;
}
.mobile-menu-toggle.open .hamburger-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.mobile-menu-toggle.open .hamburger-bar:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.mobile-menu-toggle.open .hamburger-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
@media (max-width: 1024px) {
  .mobile-menu-toggle {
    display: flex;
  }
  .nav-menu {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(36,24,19,0.98);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    z-index: 999;
  }
  .nav-menu.mobile-open {
    display: flex;
  }
  .nav-link {
    font-size: 1.3rem;
    padding: 12px 24px;
  }
  .nav-resume-btn {
    margin-left: 0;
    margin-top: 1rem;
  }
  .nav-container {
    padding: 0 24px;
  }
}
`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { personal } = portfolioData;
  const observerRef = useRef(null);

  // Scroll → .scrolled class
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const options = { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    TRACKED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 72; // navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style>{styles}</style>
      <nav
        className={`navbar${isScrolled ? ' scrolled' : ''}`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="nav-container">
          {/* Logo */}
          <button onClick={scrollToTop} className="logo-btn" aria-label="Scroll to top — Varsha M R">
            <span className="logo">VM</span>
            <span className="logo-text">{personal.name}</span>
          </button>

          {/* Hamburger */}
          <button
            className={`mobile-menu-toggle${isMobileMenuOpen ? ' open' : ''}`}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>

          {/* Nav links */}
          <ul className={`nav-menu${isMobileMenuOpen ? ' mobile-open' : ''}`}>
            {NAV_LINKS.map(({ label, section }) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`nav-link${activeSection === section ? ' active' : ''}`}
                  aria-current={activeSection === section ? 'page' : undefined}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <a
                href={personal.resumePdf}
                download={personal.resumeDownloadName}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-resume-btn"
                aria-label="Download Resume PDF"
              >
                Resume <span aria-hidden="true">📄</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
