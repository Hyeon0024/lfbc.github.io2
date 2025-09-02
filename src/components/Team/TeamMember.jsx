import React, { useState } from 'react';
import './TeamMember.css';

const TeamMember = ({ member, index }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="team-member"
      style={{ '--delay': `${index * 0.1}s` }}
    >
      <div className="member-avatar">
        {member.photo && !imageError ? (
          <img
            src={member.photo}
            alt={`${member.name} 프로필 사진`}
            onError={handleImageError}
            onLoad={() => console.log(`이미지 로드 성공: ${member.photo}`)}
            className="avatar-image"
          />
        ) : (
          <div className="avatar-placeholder">
            <span className="avatar-initials">
              {member.name ? member.name.charAt(0) : '?'}
            </span>
          </div>
        )}
      </div>
      
      <div className="member-info">
        <h3 className="member-name">{member.name || '이름 없음'}</h3>
        <div className="member-position">{member.position || '직책 미정'}</div>
        {member.education && (
          <div className="member-education">{member.education}</div>
        )}
        {member.specialization && (
          <div className="member-specialization">
            <strong>전문 분야:</strong> {member.specialization}
          </div>
        )}
        {member.research && (
          <div className="member-research">
            <strong>연구 분야:</strong> {member.research}
          </div>
        )}
        {member.phone && (
          <div className="member-phone">
            <strong>전화:</strong> {member.phone}
          </div>
        )}
        {member.email && (
          <div className="member-contact">
            <a href={`mailto:${member.email}`} className="email-link">
              {member.email}
            </a>
          </div>
        )}
        {member.website && (
          <div className="member-website">
            <a 
              href={member.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="website-link"
            >
              개인 웹사이트
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember;