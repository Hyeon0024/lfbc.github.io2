import React, { useState } from 'react';
import './TeamMember.css';

const TeamMember = ({ member, index, isAlumni = false }) => {
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`team-member ${isAlumni ? 'alumni-member' : ''}`}
      style={{ '--delay': `${index * 0.1}s` }}
    >
      <div className="member-avatar">
        {member.photo && !imageError ? (
          <img
            src={member.photo}
            alt={`${member.name} 프로필 사진`}
            onError={handleImageError}
            onLoad={() => console.log(`이미지 로드 성공: ${member.photo}`)}
            onClick={() => setShowModal(true)}
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
            <strong>Specialization:</strong> {member.specialization}
          </div>
        )}
        {member.research && (
          <div className="member-research">
            <strong>Research:</strong> {member.research}
          </div>
        )}
        {member.phone && (
          <div className="member-phone">
            <strong>Tel:</strong> {member.phone}
          </div>
        )}
        {member.email && (
          <div className="member-contact">
            <strong>E-mail:</strong> <a href={`mailto:${member.email}`} className="email-link">
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
      
      {showModal && (
        <div className="photo-modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={member.photo}
              alt={`${member.name} 프로필 사진 원본`}
              className="modal-image"
            />
            <button className="close-button" onClick={() => setShowModal(false)}>
              <span className="close-x"></span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMember;