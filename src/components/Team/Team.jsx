import React, { useState, useEffect } from 'react';
import TeamMember from './TeamMember';
import { loadTeamData } from '../../utils/csvParser';
import './Team.css';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const data = await loadTeamData();
        setTeamMembers(data);
      } catch (err) {
        console.error('팀 데이터 로딩 실패:', err);
        setError('팀 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <section id="team" className="team section">
        <div className="container">
          <div className="team-header text-center">
            <h2 className="text-headline mb-md">연구팀</h2>
            <p className="text-body-large mb-xl">
              팀 데이터를 불러오는 중...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="team" className="team section">
        <div className="container">
          <div className="team-header text-center">
            <h2 className="text-headline mb-md">연구팀</h2>
            <p className="text-body-large mb-xl error-message">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

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
            <TeamMember 
              key={member.id} 
              member={member} 
              index={index} 
            />
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