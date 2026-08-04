import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import EdConselheiro from './components/EdConselheiro'
import { RequireAluno, RequireProfessor, RedirectIfAuth } from './components/RequireAuth'

import Home from './pages/Home'
import Faculdades from './pages/Faculdades'
import MeuPlano from './pages/MeuPlano'
import Perfil from './pages/Perfil'
import Diagnostico from './pages/Diagnostico'
import Escola from './pages/Escola'
import PainelTurma from './pages/PainelTurma'
import Entrar from './pages/Entrar'
import EntrarAluno from './pages/EntrarAluno'
import EntrarProfessor from './pages/EntrarProfessor'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Público - auth gate */}
        <Route path="/" element={<RedirectIfAuth><Entrar /></RedirectIfAuth>} />
        <Route path="/entrar/aluno" element={<RedirectIfAuth><EntrarAluno /></RedirectIfAuth>} />
        <Route path="/entrar/professor" element={<RedirectIfAuth><EntrarProfessor /></RedirectIfAuth>} />

        {/* Aluno */}
        <Route path="/inicio" element={<RequireAluno><Home /></RequireAluno>} />
        <Route path="/diagnostico" element={<RequireAluno><Diagnostico /></RequireAluno>} />
        <Route path="/faculdades" element={<RequireAluno><Faculdades /></RequireAluno>} />
        <Route path="/meu-plano" element={<RequireAluno><MeuPlano /></RequireAluno>} />
        <Route path="/perfil" element={<RequireAluno><Perfil /></RequireAluno>} />

        {/* Professor */}
        <Route path="/escola" element={<RequireProfessor><Escola /></RequireProfessor>} />
        <Route path="/escola/turma/:codigo" element={<RequireProfessor><PainelTurma /></RequireProfessor>} />
      </Routes>
      <EdConselheiro />
    </>
  )
}

export default App
