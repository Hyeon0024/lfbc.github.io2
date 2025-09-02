import React from 'react';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "김교수",
      position: "연구실 책임자",
      education: "Ph.D. in Biomedical Engineering",
      specialization: "바이오메디컬 엔지니어링, 의료기기 개발",
      email: "professor.kim@lab.ac.kr",
      avatar: "👨‍🔬"
    },
    {
      id: 2,
      name: "이박사",
      position: "선임연구원",
      education: "Ph.D. in Molecular Biology",
      specialization: "분자생물학, 유전자 치료",
      email: "dr.lee@lab.ac.kr",
      avatar: "👩‍🔬"
    },
    {
      id: 3,
      name: "박연구원",
      position: "연구원",
      education: "M.S. in Nanotechnology",
      specialization: "나노바이오 기술, 약물 전달",
      email: "researcher.park@lab.ac.kr",
      avatar: "👨‍💻"
    },
    {
      id: 4,
      name: "최학생",
      position: "박사과정",
      education: "Ph.D. Candidate in Computer Science",
      specialization: "바이오인포매틱스, 머신러닝",
      email: "phd.choi@lab.ac.kr",
      avatar: "👩‍💻"
    }
  ];

  return (
    <section id="team" className="team section">
      <div className="container">
        <div className="team-header text-center">
          <h2 className="text-headline mb-md">연구팀</h2>
          <p className="text-body-large mb-xl">
            다양한 전문성을 가진 연구진들이 협력하여
            <br />
            혁신적인 연구 성과를 창출하고 있습니다.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="team-member"
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <div className="member-avatar">
                <span>{member.avatar}</span>
              </div>
              
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <div className="member-position">{member.position}</div>
                <div className="member-education">{member.education}</div>
                <div className="member-specialization">
                  <strong>전문 분야:</strong> {member.specialization}
                </div>
                <div className="member-contact">
                  <a href={`mailto:${member.email}`} className="email-link">
                    {member.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="team-cta text-center">
          <h3 className="text-title mb-md">함께 연구하고 싶으시나요?</h3>
          <p className="text-body mb-lg">
            우리 연구실에서는 열정적인 연구자들을 항상 환영합니다.
            <br />
            관심 있으시면 언제든 연락해 주세요.
          </p>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-primary"
          >
            연락하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;