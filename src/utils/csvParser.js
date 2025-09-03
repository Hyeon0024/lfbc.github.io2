/**
 * CSV 파일을 파싱하여 팀원 데이터를 반환하는 유틸리티 함수
 * 쌍따옴표로 감싸진 필드와 콤마가 포함된 값들을 올바르게 처리합니다.
 */
export const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) return [];
  
  // 헤더 파싱
  const headers = parseCSVLine(lines[0]);
  console.log('CSV 헤더:', headers);
  
  // 데이터 라인 파싱
  const data = lines.slice(1).map((line, index) => {
    if (!line.trim()) return null; // 빈 줄 건너뛰기
    
    const values = parseCSVLine(line);
    const member = {};
    
    headers.forEach((header, i) => {
      member[header] = values[i] || '';
    });
    
    return {
      id: index + 1,
      ...member
    };
  }).filter(Boolean); // null 값 제거
  
  console.log(`CSV에서 파싱된 팀원 수: ${data.length}`);
  console.log('파싱된 데이터:', data);
  
  return data;
};

/**
 * CSV 라인을 파싱하는 헬퍼 함수
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // 이스케이프된 따옴표
        current += '"';
        i++; // 다음 따옴표 건너뛰기
      } else {
        // 따옴표 토글
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // 필드 구분자
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // 마지막 필드 추가
  result.push(current.trim());
  
  return result;
}

/**
 * 팀원 CSV 데이터를 로드하는 함수
 */
export const loadTeamData = async () => {
  try {
    const response = await fetch('./data/team-members.csv');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    const data = parseCSV(csvText);
    
    // 데이터 유효성 검사
    if (!data || data.length === 0) {
      throw new Error('CSV 파일이 비어있습니다.');
    }
    
    return data;
  } catch (error) {
    console.error('팀 데이터 로딩 오류:', error);
    console.error('Error details:', error.message);
    
    // CSV 로딩 실패시 빈 배열 반환하여 문제를 명확히 드러냄
    throw error; // 에러를 다시 던져서 컴포넌트에서 처리하도록 함
  }
};

/**
 * 논문 CSV 데이터를 로드하는 함수
 */
export const loadPapersData = async () => {
  try {
    const response = await fetch('./data/papers.csv');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    const data = parseCSV(csvText);
    
    // 데이터 유효성 검사
    if (!data || data.length === 0) {
      throw new Error('논문 CSV 파일이 비어있습니다.');
    }
    
    // authors 필드를 배열로 변환 (세미콜론으로 구분)
    return data.map((paper, index) => ({
      id: index + 1,
      ...paper,
      authors: paper.authors ? paper.authors.split(';') : [],
      year: parseInt(paper.year) || 2024
    }));
    
  } catch (error) {
    console.error('논문 데이터 로딩 오류:', error);
    throw error;
  }
};

/**
 * 특허 CSV 데이터를 로드하는 함수  
 */
export const loadPatentsData = async () => {
  try {
    const response = await fetch('./data/patents.csv');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    const data = parseCSV(csvText);
    
    // 데이터 유효성 검사
    if (!data || data.length === 0) {
      throw new Error('특허 CSV 파일이 비어있습니다.');
    }
    
    // inventors 필드를 배열로 변환 (세미콜론으로 구분)
    return data.map((patent, index) => ({
      id: index + 1,
      ...patent,
      inventors: patent.inventors ? patent.inventors.split(';') : [],
      year: parseInt(patent.year) || 2024
    }));
    
  } catch (error) {
    console.error('특허 데이터 로딩 오류:', error);
    throw error;
  }
};