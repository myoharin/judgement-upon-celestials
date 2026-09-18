import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Root from './general-pages/root'
import Encrypt from './general-pages/encrypt'
import Jupitar from './celestial-pages/jupitar'
import Luna from './celestial-pages/luna'

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/encrypt" element={<Encrypt />} />
        <Route path="/luna" element={<Luna />} />
        <Route path="/jupitar" element={<Jupitar />} />
        <Route path="/*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)