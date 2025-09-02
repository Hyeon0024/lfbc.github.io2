import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToResearch = () => {
    const element = document.getElementById('research');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>
      
      <div className="container">
        <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
          <h1 className="hero-title text-display">
            생명과학의 아싸 아싸 아싸
            <br />
            <span className="gradient-text">새로운 지평</span>
          </h1>
          
          <p className="hero-description text-body-large">
            첨단 기술과 혁신적 연구로 인류의 건강한 미래를 만들어갑니다.
            <br />
            생명과학 분야의 선도적 연구를 통해 새로운 가능성을 탐구합니다.
          </p>
          
          <div className="hero-actions">
            <button 
              onClick={scrollToResearch}
              className="btn btn-primary"
            >
              연구 분야 살펴보기
            </button>
            <button 
              onClick={() => document.getElementById('publications').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-secondary"
            >
              연구 성과 보기
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">년간 연구 경험</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">발표 논문</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">연구 프로젝트</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">20+</div>
              <div className="stat-label">특허 등록</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>아래로 스크롤</span>
      </div>
    </section>
  );
};

export default Hero;