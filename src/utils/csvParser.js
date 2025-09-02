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
    
    // 기본 데이터 반환 (개발/테스트용)
    return [
      {
        id: 1,
        name: "김지훈",
        position: "연구실 책임자", 
        education: "Ph.D. in Biomedical Engineering (MIT)",
        specialization: "바이오메디컬 엔지니어링",
        research: "의료기기 개발 및 생체재료",
        email: "professor.kim@lab.ac.kr",
        phone: "02-123-4567",
        website: "https://www.researchgate.net/profile/김지훈",
        photo: "/images/team/kim-jihoon.jpg"
      },
      {
        id: 2,
        name: "이서영",
        position: "선임연구원",
        education: "Ph.D. in Molecular Biology (서울대학교)",
        specialization: "분자생물학",
        research: "유전자 치료 및 줄기세포 연구",
        email: "dr.lee@lab.ac.kr",
        phone: "02-123-4568",
        website: "",
        photo: "/images/team/lee-seoyoung.jpg"
      },
      {
        id: 3,
        name: "박민수",
        position: "연구원",
        education: "M.S. in Nanotechnology (KAIST)",
        specialization: "나노바이오 기술",
        research: "약물 전달 시스템 개발", 
        email: "researcher.park@lab.ac.kr",
        phone: "02-123-4569",
        website: "",
        photo: "/images/team/park-minsu.jpg"
      }
    ];
  }
};