# 팀 갤러리 이미지 업로드 가이드

## GitHub Issues를 활용한 이미지 호스팅 방법

### 1단계: GitHub Issues에 이미지 업로드

1. **Issues 페이지로 이동**
   - 저장소 메인 페이지에서 "Issues" 탭 클릭
   - "New Issue" 버튼 클릭

2. **Issue 생성**
   - Title: `Team Photos - [연구실명]`
   - 댓글 창에 팀 사진들을 **드래그 앤 드롭**

3. **이미지 URL 복사**
   - 업로드된 이미지를 우클릭 → "이미지 주소 복사"
   - 또는 마크다운 형태로 생성된 URL 복사
   ```
   ![image](https://github.com/user/repo/assets/123456/abc-def-ghi.jpg)
   ```

### 2단계: 팀 갤러리에 이미지 URL 적용

`src/components/TeamGallery/TeamGallery.jsx` 파일에서 `teamMembers` 배열을 수정:

```javascript
const teamMembers = [
  {
    id: 1,
    name: "김교수",
    position: "연구실 지도교수", 
    specialization: "바이오메디컬 엔지니어링",
    image: "https://github.com/user/repo/assets/123456/professor-kim.jpg", // 여기에 실제 URL 입력
    email: "professor@example.com"
  },
  // 다른 멤버들...
];
```

## 이미지 최적화 팁

### 권장 사양
- **크기**: 300x300px ~ 500x500px
- **용량**: 100KB 이하
- **형식**: JPG, PNG, WebP

### 이미지 압축 도구
- **온라인**: TinyPNG, Squoosh.app
- **로컬**: ImageOptim (Mac), RIOT (Windows)

## 팀 멤버 정보 수정 방법

### 새 멤버 추가
```javascript
{
  id: 7, // 고유 ID
  name: "새멤버이름",
  position: "직책",
  specialization: "전문분야", 
  image: "GitHub Issues 이미지 URL",
  email: "email@example.com"
}
```

### 멤버 정보 수정
- `name`: 표시될 이름
- `position`: 교수, 박사과정, 석사과정, 연구원 등
- `specialization`: 연구 전문 분야
- `image`: GitHub Issues에서 복사한 이미지 URL
- `email`: 연락처 이메일 (선택사항)

## 장점

✅ **무료 호스팅**: GitHub Issues를 통한 무료 이미지 호스팅
✅ **빠른 로딩**: GitHub CDN을 통한 빠른 이미지 전송
✅ **용량 절약**: 저장소 용량을 차지하지 않음
✅ **자동 최적화**: Lazy loading으로 페이지 로딩 속도 개선
✅ **반응형**: 다양한 화면 크기에 최적화
✅ **이메일 연동**: 클릭시 이메일 전송 기능

## 주의사항

⚠️ **이미지 URL**: GitHub Issues에서 생성된 URL이 변경될 수 있으므로, 주기적으로 확인 필요
⚠️ **개인정보**: 개인 사진 업로드시 본인 동의 필수
⚠️ **이미지 품질**: 고화질 사진을 사용하되, 파일 크기는 최적화 권장