import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 설정
  // - 로컬 개발: base: '/' (루트 경로)
  // - GitHub Pages: base: '/lfbc.github.io2/' (저장소 이름 경로)
  // NODE_ENV=production으로 빌드시 GitHub Pages용 경로 사용
  base: process.env.NODE_ENV === 'production' ? '/lfbc.github.io2/' : '/',
})
