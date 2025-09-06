import React, { useState, useEffect } from 'react';
import './Research.css';

const Research = () => {
  const [visibleItems, setVisibleItems] = useState([]);

  const openResearchDetail = (area) => {
    // 새 창에서 연구 분야 상세 페이지 열기
    const detailWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
    
    const detailHTML = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${area.title} - Life Sciences Lab</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Noto Sans KR', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background: #f8f9fa; 
            padding: 2rem;
          }
          .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 16px; 
            box-shadow: 0 4px 24px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header { 
            background: ${area.color}; 
            color: white; 
            padding: 2rem; 
            text-align: center; 
          }
          .header .icon { 
            font-size: 4rem; 
            margin-bottom: 1rem; 
            display: block;
          }
          .header h1 { 
            font-size: 2rem; 
            margin-bottom: 0.5rem; 
          }
          .header .subtitle { 
            font-size: 1.1rem; 
            opacity: 0.9; 
          }
          .content { 
            padding: 2rem; 
          }
          .section { 
            margin-bottom: 2rem; 
          }
          .section h2 { 
            color: ${area.color}; 
            margin-bottom: 1rem; 
            font-size: 1.5rem;
            border-bottom: 2px solid ${area.color};
            padding-bottom: 0.5rem;
          }
          .details-list { 
            list-style: none; 
            margin-left: 0; 
          }
          .details-list li { 
            padding: 0.75rem; 
            margin: 0.5rem 0; 
            background: #f8f9fa; 
            border-left: 4px solid ${area.color}; 
            border-radius: 4px;
          }
          .description { 
            font-size: 1.1rem; 
            line-height: 1.8; 
            color: #555; 
          }
          .close-btn { 
            position: fixed; 
            top: 20px; 
            right: 20px; 
            background: rgba(0,0,0,0.7); 
            color: white; 
            border: none; 
            border-radius: 50%; 
            width: 40px; 
            height: 40px; 
            cursor: pointer; 
            font-size: 20px;
          }
          .close-btn:hover { 
            background: rgba(0,0,0,0.9); 
          }
        </style>
      </head>
      <body>
        <button class="close-btn" onclick="window.close()">×</button>
        <div class="container">
          <div class="header">
            <span class="icon">${area.icon}</span>
            <h1>${area.title}</h1>
            <div class="subtitle">${area.subtitle}</div>
          </div>
          <div class="content">
            <div class="section">
              <h2>연구 분야 개요</h2>
              <p class="description">${area.fullContent}</p>
            </div>
            <div class="section">
              <h2>주요 연구 영역</h2>
              <ul class="details-list">
                ${area.details.map(detail => `<li>${detail}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    detailWindow.document.write(detailHTML);
    detailWindow.document.close();
  };

  const researchAreas = [
    {
      id: 1,
      title: "바이오메디컬 엔지니어링",
      subtitle: "의료 기기 개발과 생체 신호 분석",
      description: "의료 기기 개발과 생체 신호 분석을 통해 질병 진단 및 치료 기술을 연구합니다.",
      details: [
        "의료 영상 분석 및 처리",
        "생체 신호 모니터링 시스템",
        "웨어러블 헬스케어 기기",
        "AI 기반 진단 알고리즘"
      ],
      fullContent: "바이오메디컬 엔지니어링 분야에서는 첨단 공학 기술을 의료 분야에 접목하여 인류의 건강 증진에 기여하고 있습니다. 의료 영상 분석 기술을 통해 CT, MRI, X-ray 등의 의료 영상에서 병변을 자동으로 감지하고 분석하는 시스템을 개발하고 있으며, 생체 신호 모니터링 시스템을 통해 실시간으로 환자의 생체 정보를 추적하고 이상 상황을 조기에 감지할 수 있는 기술을 연구하고 있습니다.",
      icon: "🧬",
      color: "#007AFF"
    },
    {
      id: 2,
      title: "분자생물학 및 유전공학",
      subtitle: "유전자 편집 기술과 단백질 공학",
      description: "유전자 편집 기술과 단백질 공학을 활용한 혁신적 치료법을 개발합니다.",
      details: [
        "CRISPR 유전자 편집 기술",
        "단백질 구조 예측 및 설계",
        "유전자 치료제 개발",
        "바이오마커 발굴"
      ],
      fullContent: "분자생물학 및 유전공학 분야에서는 CRISPR-Cas9 기술을 활용한 정밀 유전자 편집을 통해 유전적 질환의 근본적 치료법을 개발하고 있습니다. 또한 인공지능을 활용한 단백질 구조 예측 및 설계를 통해 새로운 치료용 단백질을 개발하고, 유전자 치료제 개발을 통해 기존 치료법으로 해결되지 않던 질환들에 대한 새로운 접근법을 제시하고 있습니다.",
      icon: "🔬",
      color: "#FF6B6B"
    },
    {
      id: 3,
      title: "나노바이오 기술",
      subtitle: "나노 기술과 약물 전달 시스템",
      description: "나노 기술을 생명과학에 응용하여 약물 전달 시스템과 진단 도구를 개발합니다.",
      details: [
        "나노입자 약물 전달 시스템",
        "바이오센서 개발",
        "나노소재 생체 적합성",
        "표적 치료 플랫폼"
      ],
      fullContent: "나노바이오 기술 분야에서는 나노미터 크기의 입자를 이용한 표적 약물 전달 시스템을 개발하여 기존 치료법의 부작용을 최소화하고 치료 효과를 극대화하는 연구를 진행하고 있습니다. 나노바이오센서를 통해 질병의 조기 진단이 가능한 플랫폼을 구축하고, 생체 적합성이 우수한 나노소재를 개발하여 안전하고 효과적인 치료 방법을 제공하고 있습니다.",
      icon: "⚛️",
      color: "#50E3C2"
    },
    {
      id: 4,
      title: "컴퓨터 생물학",
      subtitle: "빅데이터와 인공지능 활용",
      description: "빅데이터와 인공지능을 활용하여 생명 현상을 이해하고 예측합니다.",
      details: [
        "바이오인포매틱스 알고리즘",
        "시스템 생물학 모델링",
        "머신러닝 기반 약물 발굴",
        "단백질-약물 상호작용 예측"
      ],
      fullContent: "컴퓨터 생물학 분야에서는 대용량 생물학적 데이터를 분석하기 위한 고성능 알고리즘을 개발하고, 시스템 생물학적 접근을 통해 복잡한 생명 현상을 수학적으로 모델링하고 있습니다. 머신러닝과 딥러닝 기술을 활용하여 신약 개발 과정을 가속화하고, 단백질-약물 상호작용을 예측하여 보다 효과적인 치료제 개발에 기여하고 있습니다.",
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
                <p className="research-subtitle text-body-small mb-md">{area.subtitle}</p>
                
                <div className="research-actions">
                  <button 
                    className="btn btn-outline-small"
                    onClick={() => openResearchDetail(area)}
                  >
                    더보기
                  </button>
                </div>
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