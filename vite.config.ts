import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/react-polaroid-photo-deck/' : '/',
  plugins: [react()]
}))
