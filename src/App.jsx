import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import EdConselheiro from './components/EdConselheiro'
import Home from './pages/Home'
import Faculdades from './pages/Faculdades'
import MeuPlano from './pages/MeuPlano'
import Perfil from './pages/Perfil'
import Diagnostico from './pages/Diagnostico'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faculdades" element={<Faculdades />} />
        <Route path="/meu-plano" element={<MeuPlano />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/diagnostico" element={<Diagnostico />} />
      </Routes>
      <EdConselheiro />
    </>
  )
}

export default App
