import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [react()],
  }

  // GitHub Pages에서만 base 경로 설정
  if (mode === 'production' && process.env.GITHUB_ACTIONS) {
    config.base = '/lfbc.github.io2/'
  }

  return config
})
