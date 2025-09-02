import React, { useState } from 'react';
import './Publications.css';

const Publications = () => {
  const [activeTab, setActiveTab] = useState('papers');
  const [selectedYear, setSelectedYear] = useState('all');

  const publications = {
    papers: [
      {
        id: 1,
        title: "CRISPR-Cas9을 활용한 유전자 치료의 새로운 접근법",
        authors: "김연구, 이실험, 박논문",
        journal: "Nature Biotechnology",
        year: 2024,
        impact: "IF 54.908",
        category: "유전공학"
      },
      {
        id: 2,
        title: "나노입자 기반 약물 전달 시스템의 생체 적합성 연구",
        authors: "이나노, 김약물, 박전달",
        journal: "Advanced Materials",
        year: 2024,
        impact: "IF 32.086",
        category: "나노바이오"
      },
      {
        id: 3,
        title: "AI 기반 단백질 구조 예측 모델 개발",
        authors: "박인공, 이지능, 김단백",
        journal: "Science",
        year: 2023,
        impact: "IF 47.728",
        category: "컴퓨터생물학"
      },
      {
        id: 4,
        title: "웨어러블 바이오센서를 통한 실시간 건강 모니터링",
        authors: "최웨어, 김센서, 이헬스",
        journal: "Nature Medicine",
        year: 2023,
        impact: "IF 82.955",
        category: "바이오메디컬"
      }
    ],
    patents: [
      {
        id: 1,
        title: "휴대용 혈당 측정 장치 및 방법",
        inventors: "김발명, 이특허",
        number: "KR10-2024-0001234",
        year: 2024,
        status: "등록",
        category: "의료기기"
      },
      {
        id: 2,
        title: "나노입자를 이용한 표적형 약물 전달 시스템",
        inventors: "박나노, 최약물",
        number: "US11,234,567",
        year: 2024,
        status: "등록",
        category: "나노기술"
      },
      {
        id: 3,
        title: "AI 기반 의료 영상 분석 알고리즘",
        inventors: "이인공, 김영상",
        number: "KR10-2023-0005678",
        year: 2023,
        status: "등록",
        category: "AI의료"
      }
    ]
  };

  const years = ['all', ...new Set([...publications.papers, ...publications.patents].map(item => item.year))].sort((a, b) => {
    if (a === 'all') return -1;
    if (b === 'all') return 1;
    return b - a;
  });

  const filteredData = publications[activeTab].filter(item => 
    selectedYear === 'all' || item.year === selectedYear
  );

  return (
    <section id="publications" className="publications section">
      <div className="container">
        <div className="publications-header text-center">
          <h2 className="text-headline mb-md">연구 성과</h2>
          <p className="text-body-large mb-xl">
            세계적 수준의 연구 논문과 혁신적인 특허를 통해
            <br />
            학술적 우수성과 실용적 가치를 동시에 추구합니다.
          </p>
        </div>

        <div className="publications-controls">
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === 'papers' ? 'active' : ''}`}
              onClick={() => setActiveTab('papers')}
            >
              <span className="tab-icon">📄</span>
              연구 논문
              <span className="tab-count">{publications.papers.length}</span>
            </button>
            <button
              className={`tab-button ${activeTab === 'patents' ? 'active' : ''}`}
              onClick={() => setActiveTab('patents')}
            >
              <span className="tab-icon">💡</span>
              특허
              <span className="tab-count">{publications.patents.length}</span>
            </button>
          </div>

          <div className="year-filter">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="year-select"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'all' ? '전체 연도' : `${year}년`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="publications-content">
          {activeTab === 'papers' ? (
            <div className="papers-grid">
              {filteredData.map((paper, index) => (
                <div
                  key={paper.id}
                  className="paper-card"
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className="paper-header">
                    <div className="paper-category">{paper.category}</div>
                    <div className="paper-year">{paper.year}</div>
                  </div>
                  
                  <h3 className="paper-title">{paper.title}</h3>
                  
                  <div className="paper-authors">
                    <strong>저자:</strong> {paper.authors}
                  </div>
                  
                  <div className="paper-journal">
                    <strong>게재지:</strong> {paper.journal}
                  </div>
                  
                  <div className="paper-impact">
                    <span className="impact-badge">{paper.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="patents-grid">
              {filteredData.map((patent, index) => (
                <div
                  key={patent.id}
                  className="patent-card"
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className="patent-header">
                    <div className="patent-category">{patent.category}</div>
                    <div className={`patent-status ${patent.status === '등록' ? 'registered' : 'pending'}`}>
                      {patent.status}
                    </div>
                  </div>
                  
                  <h3 className="patent-title">{patent.title}</h3>
                  
                  <div className="patent-inventors">
                    <strong>발명자:</strong> {patent.inventors}
                  </div>
                  
                  <div className="patent-number">
                    <strong>특허번호:</strong> {patent.number}
                  </div>
                  
                  <div className="patent-year">
                    <strong>등록년도:</strong> {patent.year}년
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredData.length === 0 && (
          <div className="no-results">
            <p>해당 연도의 {activeTab === 'papers' ? '논문' : '특허'}가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Publications;