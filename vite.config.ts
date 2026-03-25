import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const isLibraryBuild = mode === 'lib'

  return {
    base: isLibraryBuild || command !== 'build' ? '/' : '/react-polaroid-photo-deck/',
    plugins: [react()],
    build: isLibraryBuild
      ? {
          lib: {
            entry: 'src/index.ts',
            name: 'ReactPolaroidPhotoDeck',
            formats: ['es', 'cjs'],
            cssFileName: 'style',
            fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs')
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime']
          }
        }
      : undefined
  }
})
