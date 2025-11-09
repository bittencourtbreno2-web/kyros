import React, { useState, useMemo } from 'react';
import type { User, LifeArea, DailyGoal, LibraryItem, CommunityPost, ProgressData, DailyContent, Book } from '../types';
import { HomeIcon, ChartBarIcon, BookOpenIcon, SparklesIcon, AccountIcon, VideoIcon, BookIcon as BookRecomIcon, AwardIcon } from './icons';
import RadarChart from './RadarChart';


// MOCK DATA 
const dailyContentData: DailyContent = {
  date: new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  theme: "Autodisciplina",
  text: {
    title: "O Superpoder da Autodisciplina",
    content: "A autodisciplina não é sobre rigidez, mas sobre liberdade. É a capacidade de escolher o que você mais quer no futuro em vez do que você quer agora. Cada pequena decisão disciplinada é um tijolo na construção da vida que você deseja. Hoje, concentre-se em uma única escolha que honre seus objetivos de longo prazo."
  },
  reflection: {
    prompt: "Como você pode aplicar o conceito de 'autodisciplina' hoje em uma pequena ação para se aproximar de uma de suas grandes metas?"
  },
  video: {
    title: "Como construir a autodisciplina - um guia",
    url: "https://www.youtube.com/embed/gD_jwL4_te4"
  },
  reading: {
    pages: 10,
    bookSuggestion: "'O Poder do Hábito'"
  },
  bookRecommendations: [
    { title: "O Poder do Hábito", author: "Charles Duhigg", description: "Entenda a ciência por trás da formação de hábitos e como transformá-los.", coverUrl: "" },
    { title: "A Sutil Arte de Ligar o F*da-se", author: "Mark Manson", description: "Uma abordagem contraintuitiva para viver uma vida boa, focando no que realmente importa.", coverUrl: "" }
  ],
  challenge: {
    title: "Reflexão Diária Guiada",
    description: "Reserve um momento para refletir sobre o texto de hoje, suas metas atuais e seu progresso."
  }
};

const initialDailyGoals: DailyGoal[] = [
    { id: 1, text: "Meditar por 15 minutos", category: "Mente", completed: false, ep: 15 },
    { id: 2, text: `Ler 10 páginas de '${dailyContentData.bookRecommendations[0].title}'`, category: "Mente", completed: false, ep: 10 },
    { id: 3, text: "Compartilhar reflexão na comunidade", category: "Conexão", completed: false, ep: 20 },
    { id: 4, text: "Definir 1 objetivo profissional para o dia", category: "Carreira", completed: false, ep: 10 },
    { id: 5, text: "Fazer 20 minutos de caminhada", category: "Corpo", completed: false, ep: 15 },
    { id: 6, text: "Praticar gratidão por 5 minutos", category: "Mente", completed: false, ep: 10 },
    { id: 7, text: "Enviar uma mensagem positiva para um amigo", category: "Conexão", completed: false, ep: 10 },
    { id: 8, text: "Revisar seu orçamento diário", category: "Carreira", completed: false, ep: 5 },
    { id: 9, text: "Beber 2 litros de água", category: "Corpo", completed: false, ep: 5 },
    { id: 10, text: "Planejar o dia de amanhã", category: "Carreira", completed: false, ep: 10 },
];

const mockLibraryItems: LibraryItem[] = [
    {id: 1, type: 'Texto', title: 'O Superpoder da Autodisciplina', date: 'Hoje', status: 'Lido'},
    {id: 2, type: 'Livro', title: 'O Poder do Hábito', date: 'Iniciado Hoje', status: 'Em Progresso'},
    // FIX: Added the missing 'status' property to satisfy the 'LibraryItem' type definition.
    {id: 3, type: 'Reflexão', title: 'Reflexão sobre Autodisciplina', date: 'Hoje', status: 'Concluída', content: 'Minha maior dificuldade é...'},
    {id: 4, type: 'Texto', title: 'A Importância do Foco', date: 'Ontem', status: 'Lido'},
];

const mockCommunityPosts: CommunityPost[] = [
    {
        id: 1, author: 'KyrosAI', avatar: '', timestamp: 'Agora', 
        content: `Tópico de Hoje: "${dailyContentData.reflection.prompt}"`,
        replies: [
             { id: 2, author: 'Ana Silva', avatar: '', timestamp: 'há 5 min', content: 'Ótima reflexão! Para mim, a autodisciplina hoje foi dizer não a uma distração e focar no meu projeto principal. Pequenos passos!', replies: [] },
             { id: 3, author: 'Carlos Oliveira', avatar: '', timestamp: 'há 2 min', content: 'Concordo, Ana. A minha foi fazer a caminhada mesmo estando cansado. A sensação depois é ótima!', replies: [] },
        ]
    }
];

const mockProgressData: ProgressData = {
    pagesRead: { current: 120, goal: 300 },
    meditations: { current: 15, goal: 30 },
    goalsCompleted: { current: 85, goal: 100 },
};

interface BarChartProps {
    title: string;
    data: { current: number; goal: number };
    color: string;
}

const BarChart: React.FC<BarChartProps> = ({ title, data, color }) => {
    const percentage = data.goal > 0 ? (data.current / data.goal) * 100 : 0;
    return (
        <div className="glass-card p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-white text-sm">{title}</h3>
                <span className="text-xs text-gray-400">{data.current} / {data.goal}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};


interface DashboardProps {
  user: User | null;
  onLogout: () => void;
  initialLifeAreas: LifeArea[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, initialLifeAreas }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'progress' | 'library' | 'community' | 'account'>('dashboard');
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>(initialDailyGoals);
  
  const handleGoalToggle = (id: number) => {
      setDailyGoals(goals => goals.map(goal => goal.id === id ? {...goal, completed: !goal.completed} : goal));
  }

  const evolutionPoints = useMemo(() => {
    return dailyGoals.reduce((total, goal) => goal.completed ? total + goal.ep : total, 0);
  }, [dailyGoals]);
  
  const navItems = [
    { id: 'dashboard', label: 'Jornada Diária', icon: <HomeIcon /> },
    { id: 'progress', label: 'Progresso & Metas', icon: <ChartBarIcon /> },
    { id: 'library', label: 'Biblioteca', icon: <BookOpenIcon /> },
    { id: 'community', label: 'Comunidade', icon: <SparklesIcon /> },
    { id: 'account', label: 'Conta', icon: <AccountIcon /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'progress':
        return (
            <div className="animate-fade-in">
                <h1 className="text-3xl font-bold font-display text-white mb-6">Meu Progresso</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="glass-card p-6 rounded-lg lg:col-span-2">
                         <h2 className="text-xl font-semibold font-display text-white mb-2">Visão Geral</h2>
                         <p className="text-sm text-gray-400 mb-4">Seu equilíbrio de vida com base no quiz inicial.</p>
                         <div className="h-80">
                            <RadarChart data={initialLifeAreas} />
                         </div>
                    </div>
                    <BarChart title="Páginas Lidas este Mês" data={mockProgressData.pagesRead} color="bg-purple-500" />
                    <BarChart title="Meditações Concluídas" data={mockProgressData.meditations} color="bg-sky-500" />
                    <BarChart title="Metas Diárias Cumpridas" data={mockProgressData.goalsCompleted} color="bg-green-500" />
                </div>
            </div>
        );
      case 'library':
           return (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold font-display text-white mb-6">Minha Biblioteca</h1>
              <div className="space-y-4">
                {mockLibraryItems.map(item => (
                    <div key={item.id} className="glass-card p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <span className={`text-xs font-bold ${item.type === 'Livro' ? 'text-purple-400' : 'text-sky-400'}`}>{item.type}</span>
                            <p className="text-white font-semibold">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                        {item.status && <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.status === 'Lido' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{item.status}</span>}
                    </div>
                ))}
              </div>
            </div>
          );
      case 'community':
           return (
            <div className="animate-fade-in max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold font-display text-white mb-6 text-center">Comunidade</h1>
               {mockCommunityPosts.map(post => (
                    <div key={post.id} className="glass-card p-6 rounded-lg">
                        <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white mr-4">K</div>
                            <div>
                                <p className="font-bold text-white">{post.author} <span className="text-sm font-normal text-gray-400">· {post.timestamp}</span></p>
                                <p className="text-gray-300 whitespace-pre-line">{post.content}</p>
                            </div>
                        </div>
                        <div className="border-t border-slate-700 my-4"></div>
                        <div className="space-y-4 ml-8">
                            {post.replies.map(reply => (
                                 <div key={reply.id} className="flex items-start">
                                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center font-bold text-sm text-white mr-3">A</div>
                                    <div>
                                        <p className="font-bold text-white text-sm">{reply.author} <span className="text-xs font-normal text-gray-400">· {reply.timestamp}</span></p>
                                        <p className="text-gray-300 text-sm">{reply.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                         <div className="mt-4 ml-8">
                             <input type="text" placeholder="Escreva um comentário..." className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"/>
                         </div>
                    </div>
               ))}
            </div>
          );
      case 'account':
         return (
            <div className="animate-fade-in max-w-lg">
                <h2 className="text-3xl font-bold font-display text-white mb-6">Minha Conta</h2>
                <div className="glass-card rounded-lg p-6">
                    <div className="space-y-4 mb-8">
                      <div>
                          <label className="block text-gray-400 mb-1 text-sm">Nome</label>
                          <input type="text" value={user?.name || ''} readOnly className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white" />
                      </div>
                       <div>
                          <label className="block text-gray-400 mb-1 text-sm">Email</label>
                          <input type="email" value="user@example.com" readOnly className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white" />
                      </div>
                    </div>
                    <div className="border-t border-slate-700 pt-6">
                      <h3 className="font-semibold text-white mb-4">Integrações</h3>
                      <p className="text-sm text-gray-400 mb-4">Conecte seus aplicativos para uma experiência mais completa (em breve).</p>
                      <div className="flex space-x-4">
                        <button className="bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg opacity-50 cursor-not-allowed">Apple Health</button>
                        <button className="bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg opacity-50 cursor-not-allowed">Google Fit</button>
                      </div>
                    </div>
                </div>
            </div>
         );
      case 'dashboard':
      default:
        return (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">Sua Jornada Diária</h1>
                    <p className="text-gray-400">{dailyContentData.date}</p>
                </div>
                <div className="glass-card p-3 rounded-lg flex items-center">
                    <AwardIcon className="w-6 h-6 text-yellow-400 mr-2" />
                    <span className="text-white font-bold text-lg">{evolutionPoints} EP</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 rounded-lg">
                        <h2 className="text-xl font-semibold font-display text-purple-400 mb-2">Texto do Dia: {dailyContentData.text.title}</h2>
                        <p className="text-gray-300">{dailyContentData.text.content}</p>
                    </div>
                    <div className="glass-card p-6 rounded-lg">
                        <h2 className="text-xl font-semibold font-display text-purple-400 mb-2">Reflexão Diária</h2>
                        <p className="text-gray-300 mb-4 italic">"{dailyContentData.reflection.prompt}"</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                           <button className="flex-1 bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors">Meditar por 15 min</button>
                           <button className="flex-1 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">Compartilhar na Comunidade</button>
                        </div>
                    </div>
                     <div className="glass-card p-6 rounded-lg">
                        <h2 className="text-xl font-semibold font-display text-purple-400 mb-4 flex items-center"><VideoIcon className="w-5 h-5 mr-2" /> Vídeo do Dia</h2>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe src={dailyContentData.video.url} title={dailyContentData.video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full rounded-lg"></iframe>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-lg">
                        <h2 className="text-xl font-semibold font-display text-white mb-4">Metas de Hoje ({dailyGoals.filter(g => g.completed).length}/{dailyGoals.length})</h2>
                        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                           {dailyGoals.map(goal => (
                               <div key={goal.id} onClick={() => handleGoalToggle(goal.id)} className={`p-3 rounded-lg flex items-center cursor-pointer transition-colors ${goal.completed ? 'bg-green-500/10' : 'bg-slate-700/50 hover:bg-slate-700'}`}>
                                <input type="checkbox" readOnly checked={goal.completed} className="h-5 w-5 rounded-md border-gray-500 text-green-500 focus:ring-green-500 bg-transparent mr-3 flex-shrink-0" />
                                <span className={`text-sm ${goal.completed ? 'text-gray-400 line-through' : 'text-white'}`}>{goal.text}</span>
                               </div>
                           ))}
                        </div>
                    </div>
                    <div className="glass-card p-6 rounded-lg">
                        <h2 className="text-xl font-semibold font-display text-white mb-4 flex items-center"><BookRecomIcon className="w-5 h-5 mr-2" /> Livros Recomendados</h2>
                        <div className="space-y-4">
                            {dailyContentData.bookRecommendations.map(book => (
                                <div key={book.title} className="bg-slate-700/50 p-3 rounded-lg">
                                    <p className="font-bold text-white">{book.title}</p>
                                    <p className="text-sm text-gray-400 mb-1">por {book.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
            </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex animated-gradient-bg">
      <aside className="w-20 lg:w-64 bg-slate-950/40 backdrop-blur-xl p-4 flex flex-col">
        <div className="text-2xl font-bold text-white font-display mb-8 text-center mt-5">
           <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }} className="hidden lg:inline">Kyros<span className="animated-gradient-text">AI</span></a>
           <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }} className="lg:hidden animated-gradient-text">K</a>
        </div>
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
      
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="pt-5">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;