import React, { useState } from 'react';
import type { LifeArea } from '../types';

interface DiagnosisProps {
  onComplete: (results: LifeArea[]) => void;
  userName: string;
}

const initialAreas: LifeArea[] = [
  { name: 'Saúde & Bem-estar', score: 5 },
  { name: 'Carreira & Finanças', score: 5 },
  { name: 'Relacionamentos', score: 5 },
  { name: 'Desenvolvimento Pessoal', score: 5 },
  { name: 'Propósito & Contribuição', score: 5 },
];

const Diagnosis: React.FC<DiagnosisProps> = ({ onComplete, userName }) => {
  const [step, setStep] = useState(0);
  const [lifeAreas, setLifeAreas] = useState<LifeArea[]>(initialAreas);

  const handleSliderChange = (index: number, value: number) => {
    const newAreas = [...lifeAreas];
    newAreas[index].score = value;
    setLifeAreas(newAreas);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold font-display text-white mb-4">Bem-vindo(a), {userName}!</h1>
            <p className="text-xl text-gray-300 mb-8">Vamos começar sua jornada com um diagnóstico rápido para entendermos seu momento atual.</p>
            <button onClick={() => setStep(1)} className="bg-purple-600 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
              Iniciar Diagnóstico
            </button>
          </div>
        );
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold font-display text-white mb-2 text-center">Diagnóstico de Vida</h2>
            <p className="text-gray-400 mb-8 text-center">Em uma escala de 1 a 10, qual seu nível de satisfação em cada área?</p>
            <div className="space-y-6">
              {lifeAreas.map((area, index) => (
                <div key={index}>
                  <label htmlFor={`area-${index}`} className="block text-gray-300 mb-2 flex justify-between">
                    <span>{area.name}</span>
                    <span className="font-bold text-purple-400">{area.score}</span>
                  </label>
                  <input
                    id={`area-${index}`}
                    type="range"
                    min="1"
                    max="10"
                    value={area.score}
                    onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
                <button onClick={() => onComplete(lifeAreas)} className="bg-purple-600 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
                Ver Meus Resultados
                </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient-bg pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto glass-card p-8 md:p-12 rounded-xl">
            {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
