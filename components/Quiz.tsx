import React, { useState } from 'react';
import type { LifeArea, QuizQuestion, QuizAnswer } from '../types';

interface QuizProps {
  onComplete: (answers: QuizAnswer[], finalScores: LifeArea[]) => void;
  userName: string;
}

const quizQuestions: QuizQuestion[] = [
    { id: 'q1', text: 'Como você classificaria sua saúde mental e bem-estar atualmente?', area: 'Saúde & Bem-estar', options: ['Excelente', 'Bom', 'Razoável', 'Precisa Melhorar'] },
    { id: 'q2', text: 'Quais são suas principais metas profissionais para o próximo ano?', area: 'Carreira & Finanças', options: ['Crescer na empresa', 'Mudar de carreira', 'Abrir meu negócio', 'Não tenho metas claras'] },
    { id: 'q3', text: 'Você tem algum hábito financeiro que gostaria de melhorar?', area: 'Carreira & Finanças', options: ['Gastar menos', 'Investir mais', 'Organizar o orçamento', 'Não, estou satisfeito(a)'] },
    { id: 'q4', text: 'Quais são os maiores desafios em seus relacionamentos pessoais?', area: 'Relacionamentos', options: ['Comunicação', 'Falta de tempo', 'Conflitos', 'Nenhum desafio grande'] },
    { id: 'q5', text: 'Qual área da sua vida você considera mais importante para seu crescimento pessoal agora?', area: 'Desenvolvimento Pessoal', options: ['Aprender algo novo', 'Ler mais', 'Desenvolver disciplina', 'Encontrar um propósito'] },
];

const Quiz: React.FC<QuizProps> = ({ onComplete, userName }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => [...prev.filter(a => a.questionId !== questionId), { questionId, answer }]);
    if (step <= quizQuestions.length) {
        setStep(step + 1);
    }
  };

  const calculateFinalScores = () => {
      // This is a simplified logic. A real app would have a more complex mapping.
      const scores: { [key: string]: number[] } = {};
      quizQuestions.forEach(q => {
          if (!scores[q.area]) scores[q.area] = [];
          const answer = answers.find(a => a.questionId === q.id);
          if (answer) {
              const optionIndex = q.options.indexOf(answer.answer);
              const score = (q.options.length - 1 - optionIndex) / (q.options.length - 1) * 9 + 1; // Maps 0-3 index to 10-1 score
              scores[q.area].push(score);
          }
      });

      const finalLifeAreas: LifeArea[] = Object.keys(scores).map(area => {
          const areaScores = scores[area];
          const averageScore = areaScores.reduce((sum, s) => sum + s, 0) / areaScores.length;
          return { name: area, score: Math.round(averageScore) };
      });
      
      // Ensure all defined areas are present
      const allAreaNames = [...new Set(quizQuestions.map(q => q.area))];
      allAreaNames.forEach(name => {
          if(!finalLifeAreas.some(area => area.name === name)) {
              finalLifeAreas.push({name: name, score: 5}); // Default score
          }
      });
      
      onComplete(answers, finalLifeAreas);
  };
  
  const currentQuestion = quizQuestions[step - 1];

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold font-display text-white mb-4">Bem-vindo(a), {userName}!</h1>
            <p className="text-xl text-gray-300 mb-8">Para personalizar sua jornada, vamos começar com algumas perguntas rápidas.</p>
            <button onClick={() => setStep(1)} className="bg-purple-600 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
              Iniciar Quiz
            </button>
          </div>
        );
      case quizQuestions.length + 1:
          return (
             <div className="text-center animate-fade-in">
                <h1 className="text-4xl font-bold font-display text-white mb-4">Obrigado!</h1>
                <p className="text-xl text-gray-300 mb-8">Estou preparando seu plano personalizado com base em suas respostas.</p>
                <button onClick={calculateFinalScores} className="bg-purple-600 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
                  Ver meu Dashboard
                </button>
             </div>
          );
      default:
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
                <p className="text-purple-400 font-semibold">Pergunta {step} de {quizQuestions.length}</p>
                <h2 className="text-2xl font-bold font-display text-white mt-2">{currentQuestion.text}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => (
                <button 
                    key={option} 
                    onClick={() => handleAnswer(currentQuestion.id, option)}
                    className="w-full text-left p-4 bg-slate-700/50 rounded-lg border border-slate-700 hover:bg-purple-600/50 hover:border-purple-500 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mt-8">
                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${(step / quizQuestions.length) * 100}%` }}></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient-bg pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-xl">
            {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Quiz;