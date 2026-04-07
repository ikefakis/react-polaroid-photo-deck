import { createRoot } from 'react-dom/client'
import { Deck } from '../src'
import './demo.css'

const photos = [
  {
    url: 'https://picsum.photos/id/1025/800/1100'
  },
  {
    url: 'https://picsum.photos/id/1011/1200/800'
  },
  {
    url: 'https://picsum.photos/id/1003/820/1180'
  },
  {
    url: 'https://picsum.photos/id/1039/1280/860'
  },
  {
    url: 'https://picsum.photos/id/1062/840/1200'
  }
]

const rootElement = document.getElementById('photo-deck')

if (!rootElement) {
  throw new Error('Photo deck root element not found')
}

createRoot(rootElement).render(<Deck cards={photos} />)
