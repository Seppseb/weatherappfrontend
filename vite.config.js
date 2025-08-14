import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: base should match the repo name if you host at https://<user>.github.io/<repo>/
export default defineConfig({
  base: '/weatherappfrontend/',
  plugins: [react()],
})