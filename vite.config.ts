import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const isLibraryBuild = mode === 'lib'

  if (isLibraryBuild) {
    return {
      base: '/',
      plugins: [react()],
      build: {
        lib: {
          entry: 'src/index.ts',
          name: 'ReactPolaroidPhotoDeck',
          formats: ['es', 'cjs'],
          cssFileName: 'style',
          fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs')
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime', '@react-spring/web', '@use-gesture/react']
        }
      }
    }
  }

  return {
    root: 'playground',
    publicDir: '../public',
    base: command === 'build' ? '/react-polaroid-photo-deck/' : '/',
    plugins: [react()],
    build: {
      outDir: '../dist',
      emptyOutDir: true
    }
  }
})
