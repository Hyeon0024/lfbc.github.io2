import React, { useState, useEffect } from 'react';
import './TeamGallery.css';

const TeamGallery = () => {
  const [visibleItems, setVisibleItems] = useState([]);

  // 팀 멤버 데이터 - GitHub Issues에 업로드한 이미지 URL로 교체하세요
  const teamMembers = [
    {
      id: 1,
      name: "김교수",
      position: "연구실 지도교수",
      specialization: "바이오메디컬 엔지니어링",
      image: "https://via.placeholder.com/300x300?text=김교수", // 실제 GitHub Issues URL로 교체
      email: "professor@example.com"
    },
    {
      id: 2,
      name: "박박사",
      position: "박사후연구원",
      specialization: "분자생물학",
      image: "https://via.placeholder.com/300x300?text=박박사", // 실제 GitHub Issues URL로 교체
      email: "postdoc@example.com"
    },
    {
      id: 3,
      name: "이박사과정",
      position: "박사과정 학생",
      specialization: "나노바이오 기술",
      image: "https://via.placeholder.com/300x300?text=이박사과정", // 실제 GitHub Issues URL로 교체
      email: "phd@example.com"
    },
    {
      id: 4,
      name: "최석사과정",
      position: "석사과정 학생", 
      specialization: "컴퓨터 생물학",
      image: "https://via.placeholder.com/300x300?text=최석사과정", // 실제 GitHub Issues URL로 교체
      email: "ms@example.com"
    },
    {
      id: 5,
      name: "한학부생",
      position: "학부 연구생",
      specialization: "생체신호처리",
      image: "https://via.placeholder.com/300x300?text=한학부생", // 실제 GitHub Issues URL로 교체
      email: "undergrad@example.com"
    },
    {
      id: 6,
      name: "신연구원",
      position: "연구원",
      specialization: "유전공학",
      image: "https://via.placeholder.com/300x300?text=신연구원", // 실제 GitHub Issues URL로 교체
      email: "researcher@example.com"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.dataset.id);
            setVisibleItems(prev => [...new Set([...prev, itemId])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.team-member-card');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" className="team-gallery section">
      <div className="container">
        <div className="team-header text-center">
          <h2 className="text-headline mb-md">연구팀</h2>
          <p className="text-body-large mb-xl">
            다양한 전문 분야의 연구원들이 모여
            <br />
            혁신적인 생명과학 연구를 수행하고 있습니다.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`team-member-card ${visibleItems.includes(member.id) ? 'visible' : ''}`}
              data-id={member.id}
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <div className="member-image-container">
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-image"
                  loading="lazy" // Lazy loading 적용
                  onError={(e) => {
                    // 이미지 로드 실패시 대체 이미지 표시
                    e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(member.name)}`;
                  }}
                />
                <div className="member-overlay">
                  <div className="member-contact">
                    <a href={`mailto:${member.email}`} className="contact-btn">
                      📧 연락하기
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <div className="member-position">{member.position}</div>
                <div className="member-specialization">{member.specialization}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="team-note text-center">
          <p className="text-body-small">
            연구팀에 합류하고 싶으시거나 협업을 원하시는 분들은 언제든 연락주세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamGallery;