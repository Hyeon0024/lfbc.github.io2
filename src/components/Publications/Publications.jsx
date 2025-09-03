import React, { useState, useEffect } from 'react';
import { loadPapersData, loadPatentsData } from '../../utils/csvParser';
import './Publications.css';

const Publications = () => {
  const [activeTab, setActiveTab] = useState('papers');
  const [selectedYear, setSelectedYear] = useState('all');
  const [publications, setPublications] = useState({
    papers: [],
    patents: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedYears, setExpandedYears] = useState({}); // 연도별 더보기 상태

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [papersData, patentsData] = await Promise.all([
          loadPapersData(),
          loadPatentsData()
        ]);
        
        console.log('📄 논문 데이터 로드됨:', papersData.length, '편');
        console.log('💡 특허 데이터 로드됨:', patentsData.length, '건');
        
        setPublications({
          papers: papersData,
          patents: patentsData
        });
      } catch (err) {
        console.error('Publications 데이터 로딩 실패:', err);
        setError('연구 성과 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 올해 논문만 필터링 및 연도별 그룹화
  const getRecentPapers = () => {
    const currentYear = 2025;
    const recentYears = [currentYear]; // [2025]
    
    const recentPapers = publications.papers.filter(paper => 
      recentYears.includes(paper.year)
    );
    
    // 연도별로 그룹화
    const groupedByYear = {};
    recentYears.forEach(year => {
      const yearPapers = recentPapers.filter(paper => paper.year === year);
      
      if (yearPapers.length > 0) {
        groupedByYear[year] = {
          all: yearPapers, // 해당 연도의 전체 논문
          preview: yearPapers.slice(0, 5), // 미리보기용 5편
          hasMore: yearPapers.length > 5 // 더보기 버튼 표시 여부
        };
      }
    });
    
    return groupedByYear;
  };

  // 더보기 버튼 클릭 핸들러
  const toggleExpandYear = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  const years = ['all', ...new Set([...publications.papers, ...publications.patents].map(item => item.year))].sort((a, b) => {
    if (a === 'all') return -1;
    if (b === 'all') return 1;
    return b - a;
  });

  const filteredData = publications[activeTab].filter(item => {
    const currentYear = 2025;
    // 논문과 특허 모두 올해(2025) 것만 표시
    return selectedYear === 'all' ? item.year === currentYear : item.year === selectedYear;
  });

  const recentPapersGrouped = getRecentPapers();

  if (loading) {
    return (
      <section id="publications" className="publications section">
        <div className="container">
          <div className="publications-header text-center">
            <h2 className="text-headline mb-md">연구 성과</h2>
            <p className="text-body-large mb-xl">
              연구 데이터를 불러오는 중...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="publications" className="publications section">
        <div className="container">
          <div className="publications-header text-center">
            <h2 className="text-headline mb-md">연구 성과</h2>
            <p className="text-body-large mb-xl error-message">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

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
            <div className="papers-section">
              {selectedYear === 'all' ? (
                // 올해 연도별 구분 표시
                <div className="papers-by-year">
                  {Object.entries(recentPapersGrouped)
                    .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
                    .map(([year, yearData]) => {
                      const isExpanded = expandedYears[year];
                      const papersToShow = isExpanded ? yearData.all : yearData.preview;
                      
                      return (
                      <div key={year} className="year-section">
                        <div className="year-header">
                          <h3 className="year-title">{year}년 논문</h3>
                          <span className="papers-count">{yearData.all.length}편</span>
                        </div>
                        <div className="papers-grid">
                          {papersToShow.map((paper, index) => (
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
                                <strong>저자:</strong> {Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors}
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
                        
                        {yearData.hasMore && (
                          <div className="more-papers-section">
                            <button 
                              className="more-papers-btn"
                              onClick={() => toggleExpandYear(year)}
                            >
                              {isExpanded ? (
                                <>
                                  <span>접기</span>
                                  <span className="btn-icon">▲</span>
                                </>
                              ) : (
                                <>
                                  <span>더보기 ({yearData.all.length - yearData.preview.length}편 더)</span>
                                  <span className="btn-icon">▼</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                      );
                    })
                  }
                </div>
              ) : (
                // 특정 연도 선택시 기존 방식
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
                        <strong>저자:</strong> {Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors}
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
              )}
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
                    <strong>발명자:</strong> {Array.isArray(patent.inventors) ? patent.inventors.join(', ') : patent.inventors}
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