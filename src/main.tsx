import { createRoot } from 'react-dom/client'
import Deck from './Deck'
import './demo.css'
import PHOTOS from './photos.json'

const cards = PHOTOS.map((card) => ({
  url: `${import.meta.env.BASE_URL}img/${card.url}`
}))

const rootElement = document.getElementById('photo-deck')

if (!rootElement) {
  throw new Error('Photo deck root element not found')
}

createRoot(rootElement).render(<Deck cards={cards} />)
