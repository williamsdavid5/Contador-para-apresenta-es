import './styles/contador.css'
import { useState, useEffect, useRef } from 'react'

export default function Contador({ titulo, tempo, ativo, onFinish }) {

    const [segundosRestantes, setSegundosRestantes] = useState(
        Math.round(tempo * 60)
    );

    const intervalRef = useRef(null);
    const finalizadoRef = useRef(false);

    const [finalizado, setFinalizado] = useState(false);
    const [rodando, setRodando] = useState(false);


    function iniciarIndividual() {
        if (rodando || finalizado) return;

        setRodando(true);

        intervalRef.current = setInterval(() => {
            setSegundosRestantes(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;

                    if (!finalizadoRef.current) {
                        finalizadoRef.current = true;
                        setFinalizado(true);
                        setRodando(false);
                        onFinish?.();
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }

    function pausar() {
        if (!rodando) return;

        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setRodando(false);
    }

    useEffect(() => {
        if (!ativo || rodando || finalizado) return;
        iniciarIndividual();
    }, [ativo]);


    // useEffect(() => {
    //     if (!ativo) return;

    //     finalizadoRef.current = false;
    //     setSegundosRestantes(Math.round(tempo * 60));

    //     intervalRef.current = setInterval(() => {
    //         setSegundosRestantes(prev => {
    //             if (prev <= 1) {
    //                 clearInterval(intervalRef.current);
    //                 intervalRef.current = null;

    //                 if (!finalizadoRef.current) {
    //                     finalizadoRef.current = true;
    //                     setFinalizado(true);
    //                     onFinish();
    //                 }

    //                 return 0;
    //             }
    //             return prev - 1;
    //         });
    //     }, 1000);

    //     return () => clearInterval(intervalRef.current);
    // }, [ativo, tempo, onFinish]);

    const minutos = Math.floor(segundosRestantes / 60);
    const segundos = segundosRestantes % 60;

    const tempoTotal = Math.round(tempo * 60);
    const percentual =
        ((tempoTotal - segundosRestantes) / tempoTotal) * 100;

    return (
        <>
            <div className={`ContadorContainer ${ativo ? 'ativo' : ''} ${finalizado ? 'finalizado' : ''}`}>
                <div className='superior'>
                    <h3>{titulo} {finalizado && 'finalizado'}</h3>
                    <div>
                        <span className='tempo'>
                            {minutos}:{String(segundos).padStart(2, "0")}
                        </span>
                        {rodando ?
                            <button onClick={pausar} disabled={!rodando} className='botaoIniciar'>
                                Pausar
                            </button> :
                            <button onClick={iniciarIndividual} disabled={rodando || finalizado} className='botaoIniciar'>
                                Iniciar
                            </button>
                        }
                    </div>

                </div>
                {rodando &&
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${percentual}%` }}
                        />
                    </div>
                }

            </div>

        </>
    )
}