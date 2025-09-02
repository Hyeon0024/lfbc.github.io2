import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: '연구 분야', href: '#research' },
    { name: '연구 성과', href: '#publications' },
    { name: '연구팀', href: '#team' },
    { name: '연락처', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'ResearchGate', icon: '🔬', url: '#' },
    { name: 'Google Scholar', icon: '🎓', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'GitHub', icon: '💻', url: '#' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <h3 className="footer-logo">Life Sciences Lab</h3>
            <p className="footer-description">
              생명과학의 새로운 지평을 여는 혁신적인 연구를 통해
              인류의 건강한 미래를 만들어가고 있습니다.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-link"
                  title={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">빠른 링크</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="footer-link"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">연락처 정보</h4>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>경상남도 진주시 진주대로 501<br />생명과학관 301호</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+82-55-772-1234</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>lifesciences@lab.ac.kr</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">뉴스레터</h4>
            <p className="newsletter-description">
              최신 연구 소식과 성과를 이메일로 받아보세요.
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="이메일 주소"
                className="newsletter-input"
              />
              <button className="newsletter-button">구독</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Life Sciences Lab. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">개인정보처리방침</a>
              <a href="#" className="footer-bottom-link">이용약관</a>
              <button onClick={scrollToTop} className="back-to-top">
                맨 위로 ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;