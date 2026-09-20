import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Root from './general-pages/root'
import Encrypt from './general-pages/encrypt'
import Earth from './celestial-pages/earth'


import Mercury from './celestial-pages/mercury'
import Venus from './celestial-pages/venus'
import Terra from './celestial-pages/terra'
import Luna from './celestial-pages/luna'
import Mars from './celestial-pages/mars'
import Jupitar from './celestial-pages/jupitar'
import Neptune from './celestial-pages/neptune'

<meta name="viewport" content="width=1280, initial-scale=1.0" />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/encrypt" element={<Encrypt />} />

        <Route path="/earth" element={<Earth />} />

        <Route path="/mercury" element={<Mercury />} />
        <Route path="/venus" element={<Venus />} />
        <Route path="/luna" element={<Luna />} />
        <Route path="/terra" element={<Terra />} />
        <Route path="/mars" element={<Mars />} />
        <Route path="/jupitar" element={<Jupitar />} />
        <Route path="/neptune" element={<Neptune />} />

        <Route path="/*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)