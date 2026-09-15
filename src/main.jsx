import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Root from './general-pages/root'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)