import React, { useState, useEffect } from 'react';
import './Research.css';

const Research = () => {
  const [visibleItems, setVisibleItems] = useState([]);

  const researchAreas = [
    {
      id: 1,
      title: "바이오메디컬 엔지니어링",
      description: "의료 기기 개발과 생체 신호 분석을 통해 질병 진단 및 치료 기술을 연구합니다.",
      details: [
        "의료 영상 분석 및 처리",
        "생체 신호 모니터링 시스템",
        "웨어러블 헬스케어 기기",
        "AI 기반 진단 알고리즘"
      ],
      icon: "🧬",
      color: "#007AFF"
    },
    {
      id: 2,
      title: "분자생물학 및 유전공학",
      description: "유전자 편집 기술과 단백질 공학을 활용한 혁신적 치료법을 개발합니다.",
      details: [
        "CRISPR 유전자 편집 기술",
        "단백질 구조 예측 및 설계",
        "유전자 치료제 개발",
        "바이오마커 발굴"
      ],
      icon: "🔬",
      color: "#FF6B6B"
    },
    {
      id: 3,
      title: "나노바이오 기술",
      description: "나노 기술을 생명과학에 응용하여 약물 전달 시스템과 진단 도구를 개발합니다.",
      details: [
        "나노입자 약물 전달 시스템",
        "바이오센서 개발",
        "나노소재 생체 적합성",
        "표적 치료 플랫폼"
      ],
      icon: "⚛️",
      color: "#50E3C2"
    },
    {
      id: 4,
      title: "컴퓨터 생물학",
      description: "빅데이터와 인공지능을 활용하여 생명 현상을 이해하고 예측합니다.",
      details: [
        "바이오인포매틱스 알고리즘",
        "시스템 생물학 모델링",
        "머신러닝 기반 약물 발굴",
        "단백질-약물 상호작용 예측"
      ],
      icon: "🤖",
      color: "#BD10E0"
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

    const items = document.querySelectorAll('.research-item');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="research" className="research section">
      <div className="container">
        <div className="research-header text-center">
          <h2 className="text-headline mb-md">연구 분야</h2>
          <p className="text-body-large mb-xl">
            생명과학의 다양한 분야에서 혁신적인 연구를 수행하며,
            <br />
            인류의 건강과 삶의 질 향상에 기여하고 있습니다.
          </p>
        </div>

        <div className="research-grid">
          {researchAreas.map((area, index) => (
            <div
              key={area.id}
              className={`research-item ${visibleItems.includes(area.id) ? 'visible' : ''}`}
              data-id={area.id}
              style={{
                '--delay': `${index * 0.2}s`,
                '--color': area.color
              }}
            >
              <div className="research-icon">
                <span>{area.icon}</span>
              </div>
              
              <div className="research-content">
                <h3 className="research-title text-title mb-sm">{area.title}</h3>
                <p className="research-description text-body mb-md">{area.description}</p>
                
                <ul className="research-details">
                  {area.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="detail-item">
                      <span className="detail-bullet"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="research-overlay"></div>
            </div>
          ))}
        </div>

        <div className="research-cta text-center">
          <p className="text-body mb-md">
            더 자세한 연구 내용이 궁금하시다면 연구 성과를 확인해보세요.
          </p>
          <button 
            onClick={() => document.getElementById('publications').scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-primary"
          >
            연구 성과 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default Research;