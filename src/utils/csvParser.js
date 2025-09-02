/**
 * CSV 파일을 파싱하여 팀원 데이터를 반환하는 유틸리티 함수
 */
export const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1).map((line, index) => {
    const values = line.split(',').map(value => value.trim());
    const member = {};
    
    headers.forEach((header, i) => {
      member[header] = values[i] || '';
    });
    
    return {
      id: index + 1,
      ...member
    };
  });
};

/**
 * 팀원 CSV 데이터를 로드하는 함수
 */
export const loadTeamData = async () => {
  try {
    const response = await fetch('/data/team-members.csv');
    if (!response.ok) {
      throw new Error('CSV 파일을 불러올 수 없습니다.');
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('팀 데이터 로딩 오류:', error);
    // 기본 데이터 반환
    return [
      {
        id: 1,
        name: "김교수",
        position: "연구실 책임자",
        education: "Ph.D. in Biomedical Engineering",
        specialization: "바이오메디컬 엔지니어링, 의료기기 개발",
        email: "professor.kim@lab.ac.kr",
        photo: "/images/team/default-avatar.jpg"
      }
    ];
  }
};