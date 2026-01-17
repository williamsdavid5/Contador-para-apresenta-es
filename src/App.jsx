import { useEffect, useState } from 'react'
import Contador from './components/Contador'
import './App.css'

function App() {
  const [indiceAtual, setIndiceAtual] = useState(-1);
  let wakeLock = null;

  async function ativarWakeLock() {
    try {
      wakeLock = await navigator.wakeLock.request("screen");
      console.log("Tela mantida ligada");
    } catch (err) {
      console.error("Wake Lock falhou:", err);
    }
  }

  function liberarWakeLock() {
    if (wakeLock) {
      wakeLock.release();
      wakeLock = null;
      console.log("Wake Lock liberado");
    }
  }

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
    ativarWakeLock();
    setIndiceAtual(0);
  }

  function proximo() {
    setIndiceAtual(prev =>
      prev + 1 < contadores.length ? prev + 1 : -1
    );

    if (indiceAtual == -1) {
      liberarWakeLock();
    }
  }

  return (
    <>
      <div className='divTitulo'>
        <div className='contadorGeral'>

        </div>
        {indiceAtual == -1 ?
          <button onClick={iniciar} className='botaoIniciar'>Iniciar</button> :
          <button onClick={() => setIndiceAtual(-1)}>Pausar</button>
        }

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
