import { useEffect, useState } from 'react'
import Contador from './components/Contador'
import './App.css'

function App() {
  const [indiceAtual, setIndiceAtual] = useState(-1);
  const contadores = [
    { titulo: "Introdução", tempo: 3 },
    { titulo: "Objetivos", tempo: 2 },
    { titulo: "Fundamentação", tempo: 3 },
    { titulo: "Hardware", tempo: 5 },
    { titulo: "Software", tempo: 3 },
    { titulo: "Encapsulamento", tempo: 2 },
    { titulo: "Resultados", tempo: 5 },
    { titulo: "Trabalhos futuros", tempo: 1.5 },
    { titulo: "Conclusão", tempo: 1.5 },
  ];
  const tempoTotal = contadores.reduce((acc, item) => acc + item.tempo, 0);

  function iniciar() {
    setIndiceAtual(0);
  }

  function proximo() {
    setIndiceAtual(prev =>
      prev + 1 < contadores.length ? prev + 1 : -1
    );
  }

  return (
    <>
      <div className='divTitulo'>
        <h2>Boa sorte!
        </h2>
        <button onClick={iniciar} className='botaoIniciar'>Iniciar</button>
      </div>
      {/* <p>Tempo total: {tempoTotal}</p> */}
      {contadores.map((c, index) => {
        return <Contador
          key={index}
          titulo={c.titulo}
          tempo={c.tempo}
          ativo={index === indiceAtual}
          onFinish={proximo}
        />
      })}

    </>
  )
}

export default App
