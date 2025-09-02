import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 구현에서는 이메일 전송 로직을 추가
    alert('문의사항이 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: '📍',
      title: '주소',
      content: '경상남도 진주시 진주대로 501\n생명과학관 301호'
    },
    {
      icon: '📞',
      title: '전화',
      content: '+82-55-772-1234'
    },
    {
      icon: '✉️',
      title: '이메일',
      content: 'lifesciences@lab.ac.kr'
    },
    {
      icon: '🕒',
      title: '운영시간',
      content: '월-금 09:00-18:00\n(공휴일 제외)'
    }
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact-header text-center">
          <h2 className="text-headline mb-md">연락처</h2>
          <p className="text-body-large mb-xl">
            연구 협력, 학술 교류, 또는 기타 문의사항이 있으시면
            <br />
            언제든지 편안하게 연락해 주시기 바랍니다.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3 className="text-title mb-lg">연구실 정보</h3>
            <div className="info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <div className="info-icon">
                    <span>{info.icon}</span>
                  </div>
                  <div className="info-content">
                    <h4 className="info-title">{info.title}</h4>
                    <p className="info-text">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="location-map">
              <h4 className="map-title">찾아오시는 길</h4>
              <div className="map-placeholder">
                <div className="map-content">
                  <span className="map-icon">🗺️</span>
                  <p>진주대학교 생명과학관 301호</p>
                  <p>대중교통: 진주역에서 버스 15분</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h3 className="text-title mb-lg">문의하기</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">이름 *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="홍길동"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">이메일 *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">제목 *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="문의 제목을 입력해주세요"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">메시지 *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="문의 내용을 자세히 작성해주세요"
                />
              </div>

              <button type="submit" className="btn btn-primary form-submit">
                문의 전송하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;