import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <div className="nav-logo">
            <button 
              onClick={() => scrollToSection('hero')}
              className="logo-button"
            >
              Life Sciences Lab
            </button>
          </div>
          
          <div className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <button onClick={() => scrollToSection('research')} className="nav-link">
              연구 분야
            </button>
            <button onClick={() => scrollToSection('publications')} className="nav-link">
              연구 성과
            </button>
            <button onClick={() => scrollToSection('team')} className="nav-link">
              연구팀
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              연락처
            </button>
          </div>
          
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 토글"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;