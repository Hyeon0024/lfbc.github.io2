import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 로컬 테스트용 - GitHub 배포시에는 다시 주석 해제 필요
  base: '/lfbc.github.io2/',
})
