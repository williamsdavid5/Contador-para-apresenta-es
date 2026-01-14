import './styles/contador.css'
import { useState, useEffect, useRef } from 'react'

export default function Contador({ titulo, tempo, ativo, onFinish }) {

    const [segundosRestantes, setSegundosRestantes] = useState(
        Math.round(tempo * 60)
    );

    const intervalRef = useRef(null);
    const finalizadoRef = useRef(false);

    const [finalizado, setFinalizado] = useState(false);

    useEffect(() => {
        if (!ativo) return;

        finalizadoRef.current = false;
        setSegundosRestantes(Math.round(tempo * 60));

        intervalRef.current = setInterval(() => {
            setSegundosRestantes(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;

                    if (!finalizadoRef.current) {
                        finalizadoRef.current = true;
                        setFinalizado(true);
                        onFinish();
                    }

                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [ativo, tempo, onFinish]);

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
                    <span className='tempo'>
                        {minutos}:{String(segundos).padStart(2, "0")}
                    </span>
                </div>
                {
                    ativo &&
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