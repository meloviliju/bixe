import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { LangsContextProvider } from '@/hooks/useLangs.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangsContextProvider>
      <App />
    </LangsContextProvider>
  </StrictMode>,
)
