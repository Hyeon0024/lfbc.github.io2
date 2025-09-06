# GitHub Pages 배포 가이드

## 로컬 개발 vs GitHub Pages 배포 차이점

### 1. Vite 설정 (vite.config.js)
```javascript
// 로컬 개발: base: '/'
// GitHub Pages: base: '/lfbc.github.io2/'
base: process.env.NODE_ENV === 'production' ? '/lfbc.github.io2/' : '/',
```

### 2. index.html 상태 관리

#### 로컬 개발용 (현재 상태)
```html
<!-- 개발용 - 이 상태로 유지 -->
<script type="module" src="/src/main.jsx"></script>
```

#### GitHub Pages 배포용 (빌드 후 자동 생성)
```html
<!-- 배포용 - 빌드시 자동 생성됨 -->
<script type="module" crossorigin src="/lfbc.github.io2/assets/index-[hash].js"></script>
<link rel="stylesheet" crossorigin href="/lfbc.github.io2/assets/index-[hash].css">
```

## 배포 명령어 순서

### 1. 로컬 테스트
```bash
npm run dev  # http://localhost:5173에서 테스트
```

### 2. GitHub Pages 배포
```bash
# 1. 프로덕션 빌드 (NODE_ENV=production 필수!)
NODE_ENV=production npm run build

# 2. 빌드 파일을 루트로 복사
cp -r dist/* . && rm -rf dist

# 3. Git 커밋 및 푸시
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 주요 컴포넌트별 수정 방법

### 1. 연구분야 수정 (`src/components/Research/Research.jsx`)
#### 연구분야 추가/수정:
```javascript
const researchAreas = [
  {
    id: 1,
    title: "새로운 연구분야",           // 제목
    subtitle: "간단한 소제목",         // 소제목
    icon: "🧪",                      // 아이콘 (이모지)
    color: "#007AFF",               // 테마 색상
    fullContent: "상세 설명 내용..."  // 새 창에 표시될 내용
  }
];
```

#### 연구분야 카드 스타일 수정 (`src/components/Research/Research.css`):
- `.research-item`: 카드 크기/패딩
- `.research-icon`: 아이콘 크기/스타일  
- `.btn-outline-small`: 더보기 버튼 스타일

### 2. 논문 연도 필터링 (`src/components/Publications/Publications.jsx`)
#### 표시할 연도 변경:
```javascript
const currentYear = 2025; // GitHub Pages 배포시: 필터링할 기준 연도
const recentYears = [currentYear]; // [2025] - 다른 연도 추가하려면 배열에 추가
```

#### 여러 연도 표시하려면:
```javascript
const recentYears = [2025, 2024, 2023]; // 최근 3년 표시
```

### 3. 멤버 정보 수정 (`src/components/Members/Members.jsx`)
#### 멤버 추가/수정:
```javascript
const members = [
  {
    id: 1,
    name: "홍길동",
    position: "교수",
    image: "/images/members/member1.jpg"
  }
];
```

### 4. 네비게이션 메뉴 (`src/components/Navigation/Navigation.jsx`)
#### 메뉴 항목 수정:
```javascript
const navItems = [
  { href: "#home", label: "홈" },
  { href: "#research", label: "연구분야" }
];
```

## 주의사항

⚠️ **중요**: 
- 로컬 개발시에는 `index.html`을 수정하지 마세요
- GitHub Pages 배포시에만 빌드된 파일로 덮어쓰기됩니다
- `NODE_ENV=production` 환경변수 없이 빌드하면 경로 문제 발생

## 문제 해결

### 404 에러 발생시
1. `vite.config.js`의 `base` 경로 확인
2. `NODE_ENV=production`으로 빌드했는지 확인
3. `index.html`이 올바른 경로를 참조하는지 확인

### 논문 필터링이 안될 때
1. `Publications.jsx:45, 84`의 `currentYear` 값 확인
2. 빌드 후 최신 코드가 반영되었는지 확인

### 연구분야 더보기 버튼이 안될 때
1. `Research.jsx:7-128`의 `openResearchDetail` 함수 확인
2. 팝업 차단 설정 확인