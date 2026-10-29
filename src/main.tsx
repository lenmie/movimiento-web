import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/libre-bodoni/latin-400.css'
import '@fontsource/libre-bodoni/latin-400-italic.css'
import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-500.css'
import './styles/tokens.css'
import './styles/app.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
