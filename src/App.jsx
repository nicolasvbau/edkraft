import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import EdConselheiro from './components/EdConselheiro'
import Home from './pages/Home'
import Faculdades from './pages/Faculdades'
import MeuPlano from './pages/MeuPlano'
import Perfil from './pages/Perfil'
import Diagnostico from './pages/Diagnostico'
import Escola from './pages/Escola'
import PainelTurma from './pages/PainelTurma'

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
        <Route path="/escola" element={<Escola />} />
        <Route path="/escola/turma/:codigo" element={<PainelTurma />} />
      </Routes>
      <EdConselheiro />
    </>
  )
}

export default App
