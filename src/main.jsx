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
import Jupiter from './celestial-pages/jupiter'
import Saturn from './celestial-pages/saturn'
import Uranus from './celestial-pages/uranus'
import Neptune from './celestial-pages/neptune'
import Pluto from './celestial-pages/pluto'

import Leviathan from './demonic-pages/leviathan'
import Satan from './demonic-pages/satan'
import Mammon from './demonic-pages/mammon'
import Asmosdeus from './demonic-pages/asmosdeus'
import Lucifer from './demonic-pages/lucifer'
import Adam from './demonic-pages/adam'
import Beelzebub from './demonic-pages/beelzebub'
import Belphegor from './demonic-pages/belphegor'
import Lilith from './demonic-pages/lilith'
import God from './demonic-pages/god'


createRoot(document.getElementById('root')).render(
  <>
    <meta name="viewport" content="width=device-width, initial-scale=0.4"/>
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
        <Route path="/jupiter" element={<Jupiter />} />
        <Route path="/saturn" element={<Saturn />} />
        <Route path="/uranus" element={<Uranus />} />
        <Route path="/neptune" element={<Neptune />} />
        <Route path="/pluto" element={<Pluto />} />

        <Route path="/leviathan" element={<Leviathan />} />
        <Route path="/satan" element={<Satan />} />
        <Route path="/mammon" element={<Mammon />} />
        <Route path="/asmosdeus" element={<Asmosdeus />} />
        <Route path="/lucifer" element={<Lucifer />} />
        <Route path="/adam" element={<Adam />} />
        <Route path="/beelzebub" element={<Beelzebub />} />
        <Route path="/belphegor" element={<Belphegor />} />
        <Route path="/lilith" element={<Lilith />} />
        <Route path="/god" element={<God />} />

        <Route path="/*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
    </StrictMode>
  </>
)