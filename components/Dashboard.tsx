import React, { useState } from 'react';
import type { User, LifeArea, Goal } from '../types';
import { DashboardIcon, GoalsIcon, InsightsIcon, AccountIcon } from './icons';
import RadarChart from './RadarChart';

interface DashboardProps {
  user: User | null;
  onLogout: () => void;
  diagnosisResults: LifeArea[];
}

const initialGoals: Goal[] = [
    { id: 1, title: 'Concluir curso de React Avançado', area: 'Carreira', completed: false },
    { id: 2, title: 'Meditar 10 minutos por dia', area: 'Saúde', completed: true },
    { id: 3, title: 'Jantar semanal com minha parceira(o)', area: 'Relacionamentos', completed: false },
    { id: 4, title: 'Automatizar 50% das minhas economias', area: 'Finanças', completed: false },
];

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, diagnosisResults }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'goals' | 'insights' | 'account'>('dashboard');
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, completed: !goal.completed } : goal));
  };
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'goals', label: 'Metas', icon: <GoalsIcon /> },
    { id: 'insights', label: 'Insights', icon: <InsightsIcon /> },
    { id: 'account', label: 'Conta', icon: <AccountIcon /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'goals':
        return (
            <div className="animate-fade-in">
                <h2 className="text-3xl font-bold font-display text-white mb-6">Minhas Metas</h2>
                <div className="space-y-4">
                    {goals.map(goal => (
                        <div key={goal.id} onClick={() => toggleGoal(goal.id)} className={`glass-card p-4 rounded-lg flex items-center justify-between cursor-pointer transition-all ${goal.completed ? 'opacity-50' : 'hover:bg-white/10'}`}>
                           <div className="flex items-center">
                             <input type="checkbox" readOnly checked={goal.completed} className="h-6 w-6 rounded-full border-gray-500 text-purple-600 focus:ring-purple-500 bg-transparent mr-4" />
                             <span className={`${goal.completed ? 'line-through text-gray-400' : 'text-white'}`}>{goal.title}</span>
                           </div>
                           <span className="text-xs font-semibold text-purple-400 bg-purple-900/50 px-2 py-1 rounded-full">{goal.area}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
      case 'insights':
          return (
            <div className="animate-fade-in text-center py-20">
              <h2 className="text-3xl font-bold font-display text-white mb-4">Insights em Breve</h2>
              <p className="text-gray-400 max-w-md mx-auto">Nossa IA está analisando seu progresso. Volte em breve para descobrir insights personalizados para acelerar sua evolução.</p>
            </div>
          );
      case 'account':
         return (
            <div className="animate-fade-in max-w-md">
                <h2 className="text-3xl font-bold font-display text-white mb-6">Minha Conta</h2>
                <div className="space-y-4">
                  <div>
                      <label className="block text-gray-400 mb-1">Nome</label>
                      <input type="text" value={user?.name} readOnly className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white" />
                  </div>
                   <div>
                      <label className="block text-gray-400 mb-1">Email</label>
                      <input type="email" value="user@example.com" readOnly className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white" />
                  </div>
                  <button onClick={onLogout} className="bg-red-600/50 text-red-300 font-semibold py-2 px-4 rounded-full hover:bg-red-600/70 transition-colors">Sair da Conta</button>
                </div>
            </div>
         );
      case 'dashboard':
      default:
        const progress = (goals.filter(g => g.completed).length / goals.length) * 100;
        return (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold font-display text-white mb-6">Olá, {user?.name}!</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-6 rounded-lg">
                    <h2 className="text-xl font-semibold font-display text-white mb-4">Equilíbrio de Vida</h2>
                    <RadarChart data={diagnosisResults} />
                </div>
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-lg">
                        <h2 className="text-xl font-semibold font-display text-white mb-2">Progresso Semanal</h2>
                        <div className="w-full bg-slate-700 rounded-full h-2.5">
                            <div className="bg-purple-600 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
                        </div>
                        <p className="text-right text-sm text-gray-400 mt-2">{Math.round(progress)}% das metas concluídas</p>
                    </div>
                    <div className="glass-card p-6 rounded-lg">
                        <h2 className="text-xl font-semibold font-display text-white mb-2">AI Coach</h2>
                        <p className="text-gray-300">"Seu foco em <span className="text-purple-400 font-semibold">Carreira</span> está trazendo ótimos resultados! Para manter o equilíbrio, que tal dedicar um tempo para sua <span className="text-purple-400 font-semibold">Saúde</span> esta semana? Um pequeno passo pode fazer uma grande diferença."</p>
                    </div>
                </div>
              </div>
            </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex animated-gradient-bg">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-slate-950/40 backdrop-blur-xl p-4 flex flex-col">
        <div className="flex-grow">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full flex items-center p-3 rounded-lg text-left transition-colors mb-2 ${activeTab === item.id ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700/50 hover:text-white'}`}>
              {item.icon}
              <span className="hidden lg:inline ml-4 font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
        <div>
           <button onClick={onLogout} className="w-full flex items-center p-3 rounded-lg text-left text-gray-400 hover:bg-slate-700/50 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span className="hidden lg:inline ml-4 font-semibold">Sair</span>
           </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="mt-20"> {/* Offset for header */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;