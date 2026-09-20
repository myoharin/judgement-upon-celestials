import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Root from './general-pages/root'
import Encrypt from './general-pages/encrypt'
import Earth from './celestial-pages/earth'
import Moon from './celestial-pages/moon'

import Mercury from './celestial-pages/mercury'
import Venus from './celestial-pages/venus'
import Terra from './celestial-pages/terra'
import Luna from './celestial-pages/luna'
import Mars from './celestial-pages/mars'
import Jupitar from './celestial-pages/jupitar'
import Uranus from './celestial-pages/uranus'
import Neptune from './celestial-pages/neptune'
import Pluto from './celestial-pages/pluto'

<meta name="viewport" content="width=1280, initial-scale=1.0" />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/encrypt" element={<Encrypt />} />

        <Route path="/earth" element={<Earth />} />
        <Route path="/moon" element={<Moon />} />

        <Route path="/mercury" element={<Mercury />} />
        <Route path="/venus" element={<Venus />} />
        <Route path="/luna" element={<Luna />} />
        <Route path="/terra" element={<Terra />} />
        <Route path="/mars" element={<Mars />} />
        <Route path="/jupitar" element={<Jupitar />} />
        <Route path="/uranus" element={<Uranus />} />
        <Route path="/neptune" element={<Neptune />} />
        <Route path="/pluto" element={<Pluto />} />

        <Route path="/*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)