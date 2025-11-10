import React, { useState, useMemo, useEffect } from 'react';
import type { User, LifeArea, DailyGoal, LibraryItem, CommunityPost, ProgressData, DailyContent, Book, Reward, LeaderboardUser, RegisteredUser } from '../types';
import { HomeIcon, ChartBarIcon, BookOpenIcon, SparklesIcon, AccountIcon, ZapIcon, AwardIcon as BadgeIcon, LockIcon } from './icons';
import RadarChart from './RadarChart';
import LineChart from './LineChart';


// MOCK DATA 
const dailyContentData: DailyContent = {
  date: new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  theme: "Produtividade Consciente",
  motivation: "A verdadeira produtividade não é sobre fazer mais, mas sobre fazer o que realmente importa. Hoje, pergunte-se: o que, se feito, tornaria todo o resto mais fácil ou desnecessário?",
  recommendedFor: "Produtividade",
  text: {
    title: "Repensando a Produtividade: Menos Tarefas, Mais Intenção",
    content: "No mundo moderno, confundimos 'estar ocupado' com 'ser produtivo'. Corremos de uma tarefa para outra, com a sensação de que nunca há tempo suficiente. Mas e se a produtividade não for sobre velocidade, mas sobre direção?\n\nA produtividade consciente é a prática de alinhar suas ações diárias com seus valores e objetivos mais profundos. Em vez de perguntar 'Como posso fazer mais?', a pergunta se torna 'O que é verdadeiramente essencial?'.\n\n1. **Clareza é Poder:** Antes de mergulhar na sua lista de tarefas, reserve um momento para se conectar com sua visão de longo prazo. O que você está construindo? Qual impacto você quer causar?\n2. **O Mito da Multitarefa:** Tentar fazer tudo ao mesmo tempo significa não dar a devida atenção a nada. O trabalho profundo, focado e sem distrações é onde a verdadeira magia acontece.\n3. **O Descanso como Ferramenta:** A produtividade não é uma maratona sem fim. O descanso estratégico, as pausas e o tempo offline não são inimigos do progresso; são ingredientes essenciais para a sustentabilidade e a criatividade."
  },
  reflection: {
    prompt: "Hoje, sua atividade é identificar sua 'Uma Coisa'. Qual é a única tarefa ou ação que, se você completar hoje, o deixará mais perto de seus objetivos maiores? Pense em algo que cause um efeito dominó positivo. Descreva essa tarefa e por que ela é tão importante para você neste momento."
  },
  reading: {
    pages: 10,
    bookSuggestion: "'Essencialismo'"
  },
  bookRecommendations: [
    { title: "Essencialismo", author: "Greg McKeown", description: "Aprenda a disciplinada busca por menos, porém melhor.", coverUrl: "" },
    { title: "Trabalho Focado", author: "Cal Newport", description: "Como ter sucesso em um mundo distraído.", coverUrl: "" }
  ],
  challenge: {
    title: "Reflexão sobre Produtividade",
    description: "Reserve um momento para refletir sobre o texto de hoje e como ele se aplica às suas metas atuais."
  }
};

const initialDailyGoals: DailyGoal[] = [
    { id: 1, text: "Meditar por 15 minutos", category: "Mente", completed: false, ep: 15, type: 'meditation', value: 1, reflectionPrompt: "Como você se sentiu após a meditação de hoje?" },
    { id: 2, text: `Ler 10 páginas de '${dailyContentData.bookRecommendations[0].title}'`, category: "Mente", completed: false, ep: 10, type: 'reading', value: 10, reflectionPrompt: "Qual foi o principal insight da sua leitura de hoje?" },
    { id: 3, text: "Fazer a Atividade Interativa do dia", category: "Conexão", completed: false, ep: 20, type: 'general', value: 1, reflectionPrompt: "O que você aprendeu ao definir sua 'Uma Coisa' hoje?" },
    { id: 4, text: "Fazer 20 minutos de caminhada", category: "Corpo", completed: false, ep: 15, type: 'general', value: 1, reflectionPrompt: "Como a caminhada impactou sua energia e clareza mental?" },
];

const mockLibraryItems: LibraryItem[] = [
    {id: 1, type: 'Artigo', title: '5 Dicas para Aumentar sua Produtividade no Trabalho', date: 'Hoje', status: 'Lido', content: dailyContentData.text.content, notes: ''},
    {id: 2, type: 'Livro', title: 'Essencialismo', date: 'Iniciado Hoje', status: 'Em Progresso', content: 'Resumo do livro...', notes: ''},
];

const mockCommunityPosts: CommunityPost[] = [
    {
        id: 1, author: 'KyrosAI', avatar: '', timestamp: 'Agora', 
        content: `Tópico de Hoje: "${dailyContentData.reflection.prompt}"`,
        replies: [
             { id: 2, author: 'Ana Silva', avatar: '', timestamp: 'há 5 min', content: 'Minha "Uma Coisa" de hoje é finalizar a apresentação para o novo cliente. Isso vai destravar as próximas etapas do projeto e me dar um grande alívio.', replies: [] },
             { id: 3, author: 'Carlos Oliveira', avatar: '', timestamp: 'há 2 min', content: 'Para mim, é ter aquela conversa difícil que venho adiando. É importante para meu relacionamento e vai tirar um peso das minhas costas. Ótima reflexão!', replies: [] },
        ]
    }
];

const mockRewards: Reward[] = [
    { id: 1, title: "5% de Desconto no Plano", description: "Use seus pontos para economizar na sua próxima mensalidade.", cost: 1000, icon: <ZapIcon /> },
    { id: 2, title: "Consultoria Premium com IA", description: "Uma sessão de planejamento aprofundada com a IA.", cost: 3000, icon: <SparklesIcon /> },
    { id: 3, title: "1 Mês de Plano Premium", description: "Desbloqueie todos os recursos premium por um mês.", cost: 5000, icon: <BadgeIcon /> },
    { id: 4, title: "E-book: Foco e Disciplina", description: "Um guia exclusivo para aprimorar sua concentração.", cost: 1500, icon: <BookOpenIcon /> },
];

const mockLeaderboard: LeaderboardUser[] = [
    { rank: 1, name: "Ana Silva", ep: 2580, isCurrentUser: false },
    { rank: 2, name: "Carlos Oliveira", ep: 2340, isCurrentUser: false },
    { rank: 3, name: "Você", ep: 1350, isCurrentUser: true },
    { rank: 4, name: "Mariana Costa", ep: 1190, isCurrentUser: false },
    { rank: 5, name: "Pedro Almeida", ep: 980, isCurrentUser: false },
];

const levels = {
    "Iniciante": { min: 0, max: 999, color: "text-gray-300" },
    "Intermediário": { min: 1000, max: 2999, color: "text-sky-400" },
    "Avançado": { min: 3000, max: 5999, color: "text-purple-400" },
    "Mestre do Desenvolvimento": { min: 6000, max: Infinity, color: "text-yellow-400" },
};

const getLevel = (ep: number): string => {
    for (const levelName in levels) {
        if (ep >= levels[levelName].min && ep <= levels[levelName].max) {
            return levelName;
        }
    }
    return "Iniciante";
};

const getRegisteredUsers = (): RegisteredUser[] => {
    try {
        const users = localStorage.getItem('kyros_users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        return [];
    }
};

const weeklyProgressData = [
    { day: "Dom", ep: 1150 },
    { day: "Seg", ep: 1180 },
    { day: "Ter", ep: 1170 },
    { day: "Qua", ep: 1210 },
    { day: "Qui", ep: 1250 },
    { day: "Sex", ep: 1290 },
    { day: "Sáb", ep: 1350 }
];

const aiInsights = [
    "Sua consistência nos últimos 4 dias resultou em um ganho de 140 EP. Excelente!",
    "Notamos que suas metas de 'Mente' são as mais concluídas. Continue nutrindo seu conhecimento.",
    "Você está a apenas 150 EP de alcançar o nível 'Avançado'. Mantenha o foco!"
];


interface DashboardProps {
  user: User | null;
  onLogout: () => void;
  initialLifeAreas: LifeArea[];
  onViewPlans: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, initialLifeAreas, onViewPlans }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'progress' | 'evolution' | 'library' | 'community' | 'account'>('dashboard');
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>(initialDailyGoals);
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>(mockLibraryItems);
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
  const [dailyActivityResponse, setDailyActivityResponse] = useState('');
  const [isActivitySaved, setIsActivitySaved] = useState(false);
  const [userData, setUserData] = useState<User>(user || { name: 'Usuário', email: '', ep: 0, level: 'Iniciante', badges: [], subscriptionPlan: 'Free', subscriptionStatus: 'Inactive' });
  const [fullUserDetails, setFullUserDetails] = useState<RegisteredUser | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  // Welcome message timer
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Update local state if user prop changes
  useEffect(() => {
      if(user) setUserData(user);
  }, [user]);

  // Load user-specific progress data from localStorage on mount
  useEffect(() => {
    if (user?.email) {
      const users = getRegisteredUsers();
      const currentUserData = users.find(u => u.email === user.email);
      if (currentUserData) {
        setFullUserDetails(currentUserData);
        setDailyGoals(currentUserData.dailyGoals ?? initialDailyGoals);
        setLibraryItems(currentUserData.libraryItems ?? mockLibraryItems);
        
        const currentEP = currentUserData.ep ?? 0;
        setUserData(prev => ({
            ...prev,
            name: currentUserData.name,
            ep: currentEP,
            level: currentUserData.level ?? getLevel(currentEP),
            badges: currentUserData.badges ?? [],
            subscriptionPlan: currentUserData.subscriptionPlan,
            subscriptionStatus: currentUserData.subscriptionStatus,
        }))
      }
    }
  }, [user?.email]);

  // Save all progress data to localStorage whenever it changes
  useEffect(() => {
    if (user?.email) {
      const users = getRegisteredUsers();
      const updatedUsers = users.map(u => {
        if (u.email === user.email) {
          return {
            ...u,
            ep: userData.ep,
            level: userData.level,
            badges: userData.badges,
            dailyGoals: dailyGoals,
            libraryItems: libraryItems,
          };
        }
        return u;
      });
      localStorage.setItem('kyros_users', JSON.stringify(updatedUsers));
      
      const sessionUser = { ...userData, email: user.email, isSubscribed: user.subscriptionStatus === 'Active' };
      localStorage.setItem('kyros_session', JSON.stringify(sessionUser));
    }
  }, [userData, dailyGoals, libraryItems, user?.email]);

  // Update user level based on EP
  useEffect(() => {
    const newLevel = getLevel(userData.ep);
    if (newLevel !== userData.level) {
        setUserData(prev => ({ ...prev, level: newLevel }));
    }
  }, [userData.ep, userData.level]);


  const handleGoalVerification = (goal: DailyGoal) => {
    const isCompleting = !goal.completed;

    setDailyGoals(goals =>
      goals.map(g => (g.id === goal.id ? { ...g, completed: isCompleting } : g))
    );

    if (isCompleting) {
      setUserData(prev => ({ ...prev, ep: prev.ep + goal.ep }));
    } else {
      setUserData(prev => ({ ...prev, ep: prev.ep - goal.ep }));
    }
  };

  const handleSaveActivity = () => {
    if (!dailyActivityResponse.trim()) return;

    const newActivity: LibraryItem = {
        id: Date.now(),
        type: 'Atividade',
        title: "Reflexão sobre Produtividade Consciente",
        date: 'Hoje',
        status: 'Concluída',
        content: `Prompt: "${dailyContentData.reflection.prompt}"\n\nMinha Reflexão:\n${dailyActivityResponse}`,
    };

    setLibraryItems(prev => [newActivity, ...prev]);
    setDailyActivityResponse('');
    setIsActivitySaved(true);
    setTimeout(() => setIsActivitySaved(false), 3000); 
  };

  const handleToggleLibraryItem = (id: number) => {
    setExpandedItemId(prevId => prevId === id ? null : id);
  };

  const handleNoteChange = (id: number, newNotes: string) => {
      setLibraryItems(prevItems => 
          prevItems.map(item => item.id === id ? { ...item, notes: newNotes } : item)
      );
  };
  
  const navItems = [
    { id: 'dashboard', label: 'Jornada Diária', icon: <HomeIcon /> },
    { id: 'progress', label: 'Progresso & Metas', icon: <ChartBarIcon /> },
    { id: 'evolution', label: 'Evolução', icon: <ZapIcon /> },
    { id: 'library', label: 'Biblioteca', icon: <BookOpenIcon /> },
    { id: 'community', label: 'Comunidade', icon: <SparklesIcon /> },
    { id: 'account', label: 'Conta', icon: <AccountIcon /> },
  ];
  
  const currentLevelInfo = levels[userData.level];
  const epForNextLevel = currentLevelInfo ? currentLevelInfo.max + 1 - userData.ep : 0;
  const levelProgress = currentLevelInfo ? ((userData.ep - currentLevelInfo.min) / (currentLevelInfo.max - currentLevelInfo.min + 1)) * 100 : 0;

  const hasProAccess = userData.subscriptionPlan === 'Pro' || userData.subscriptionPlan === 'Premium';
  const lockedTabs = ['progress', 'evolution'].filter(() => !hasProAccess);
  const isCurrentTabLocked = lockedTabs.includes(activeTab);

  const renderContent = () => {
    if (isCurrentTabLocked) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in p-10 glass-card rounded-lg">
                <div className="p-3 mb-4 bg-yellow-400/10 rounded-full text-yellow-400"><LockIcon className="w-8 h-8"/></div>
                <h2 className="text-2xl font-bold font-display text-yellow-400 mb-2">Recurso Premium</h2>
                <p className="text-gray-300 max-w-md mx-auto mb-6">Esta funcionalidade está disponível nos planos Pro e Premium. Faça upgrade para acessar relatórios detalhados e ferramentas de evolução.</p>
                <button onClick={onViewPlans} className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-colors">Ver Planos</button>
            </div>
        );
    }
    
    switch(activeTab) {
      case 'progress':
        return (
            <div className="animate-fade-in">
                <h1 className="text-3xl font-bold font-display text-white mb-6">Meu Progresso</h1>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    
                    <div className="glass-card p-6 rounded-lg lg:col-span-2">
                        <h2 className="text-xl font-semibold font-display text-white mb-2">Equilíbrio de Vida</h2>
                        <p className="text-sm text-gray-400 mb-4">Sua visão geral com base no quiz inicial.</p>
                        <div className="h-80">
                            <RadarChart data={initialLifeAreas} />
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                        <div className="glass-card p-6 rounded-lg">
                            <h2 className="text-xl font-semibold font-display text-white mb-4">Evolução de EP na Semana</h2>
                            <div className="h-64">
                                <LineChart data={weeklyProgressData} />
                            </div>
                        </div>
                        <div className="glass-card p-6 rounded-lg">
                            <h2 className="text-xl font-semibold font-display text-white mb-4 flex items-center">
                                <SparklesIcon className="w-6 h-6 text-yellow-400 mr-2"/>
                                Insights da IA
                            </h2>
                            <ul className="space-y-3">
                                {aiInsights.map((insight, index) => (
                                    <li key={index} className="text-gray-300 text-sm flex items-start">
                                        <span className="text-sky-400 mr-3 mt-1">&#9656;</span>
                                        {insight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
      case 'evolution':
        return (
            <div className="animate-fade-in">
                <h1 className="text-3xl font-bold font-display text-white mb-6">Minha Evolução</h1>
                
                <div className="glass-card p-6 rounded-lg mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={`text-2xl font-bold font-display ${currentLevelInfo.color}`}>{userData.level}</h2>
                        <div className="text-right">
                           <p className="text-2xl font-bold text-white">{userData.ep.toLocaleString()} EP</p>
                           <p className="text-sm text-gray-400">Faltam {epForNextLevel.toLocaleString()} EP para o próximo nível</p>
                        </div>
                    </div>
                     <div className="w-full bg-slate-700 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-sky-500 to-purple-500 h-2.5 rounded-full" style={{ width: `${levelProgress}%` }}></div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold font-display text-white mb-4">Loja de Recompensas</h2>
                        <div className="space-y-4">
                            {mockRewards.map(reward => (
                                <div key={reward.id} className="glass-card p-4 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="text-purple-400 mr-4">{reward.icon}</div>
                                        <div>
                                            <p className="font-semibold text-white">{reward.title}</p>
                                            <p className="text-sm text-gray-400">{reward.cost.toLocaleString()} EP</p>
                                        </div>
                                    </div>
                                    <button disabled={userData.ep < reward.cost} className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-purple-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">Trocar</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8">
                         <div>
                            <h2 className="text-2xl font-semibold font-display text-white mb-4">Conquistas</h2>
                            <div className="flex flex-wrap gap-4">
                                {userData.badges.map(badge => (
                                    <div key={badge} className="bg-yellow-500/10 text-yellow-300 flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold">
                                        <BadgeIcon className="w-5 h-5" />
                                        <span>{badge}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold font-display text-white mb-4">Leaderboard Semanal</h2>
                            <div className="space-y-2">
                               {mockLeaderboard.map(lbUser => (
                                 <div key={lbUser.rank} className={`glass-card p-3 rounded-lg flex items-center justify-between text-sm ${lbUser.isCurrentUser ? 'border-2 border-purple-500' : 'border border-transparent'}`}>
                                    <div className="flex items-center">
                                        <span className="font-bold text-gray-400 w-6">{lbUser.rank}</span>
                                        <p className="font-semibold text-white ml-2">{lbUser.name}</p>
                                    </div>
                                    <p className="font-bold text-sky-400">{lbUser.ep.toLocaleString()} EP</p>
                                 </div>
                               ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
      case 'library':
           return (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold font-display text-white mb-6">Minha Biblioteca</h1>
              <div className="space-y-4">
                {libraryItems.map(item => (
                    <div key={item.id} className="glass-card rounded-lg overflow-hidden transition-all duration-300">
                        <div onClick={() => handleToggleLibraryItem(item.id)} className="p-4 flex justify-between items-center cursor-pointer">
                            <div>
                                <span className={`text-xs font-bold ${
                                    item.type === 'Livro' ? 'text-purple-400' 
                                    : item.type.includes('Reflexão') ? 'text-green-400'
                                    : item.type === 'Atividade' ? 'text-yellow-400' 
                                    : 'text-sky-400'}`}>{item.type}</span>
                                <p className="text-white font-semibold">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.date}</p>
                            </div>
                            <div className="flex items-center">
                               {item.status && <span className={`hidden sm:block text-xs font-semibold px-2 py-1 rounded-full mr-4 ${item.status === 'Lido' || item.status === 'Concluída' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{item.status}</span>}
                               <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedItemId === item.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                        {expandedItemId === item.id && (
                            <div className="p-4 border-t border-slate-700 animate-fade-in">
                                {item.content && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-white mb-2">Conteúdo</h4>
                                        <p className="text-gray-300 text-sm whitespace-pre-line bg-slate-900/50 p-3 rounded-md">{item.content}</p>
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Minhas Anotações</h4>
                                    <textarea 
                                        value={item.notes || ''} 
                                        onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm h-24"
                                        placeholder="Escreva suas reflexões e insights aqui..."
                                    />
                                </div>
                            </div>
                        )}
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
                <div className="glass-card rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold font-display text-white mb-4">Informações do Perfil</h3>
                    <div className="space-y-4">
                      <div>
                          <label className="block text-gray-400 mb-1 text-sm">Nome</label>
                          <input type="text" value={userData.name} readOnly className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white" />
                      </div>
                       <div>
                          <label className="block text-gray-400 mb-1 text-sm">Email</label>
                          <input type="email" value={user?.email} readOnly className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white" />
                      </div>
                    </div>
                </div>
                 <div className="glass-card rounded-lg p-6">
                    <h3 className="text-xl font-semibold font-display text-white mb-4">Assinatura</h3>
                    <div className="bg-slate-800/50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-400">Seu plano atual</p>
                            <p className="text-lg font-bold text-purple-400">{userData.subscriptionPlan}</p>
                            <p className="text-sm text-gray-400">
                                {userData.subscriptionStatus === 'Active' && fullUserDetails?.subscriptionEndDate
                                    ? `Expira em: ${new Date(fullUserDetails.subscriptionEndDate).toLocaleDateString('pt-BR')}`
                                    : `Status: ${userData.subscriptionStatus}`
                                }
                            </p>
                        </div>
                        <button onClick={onViewPlans} className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-purple-700 transition-colors">Gerenciar</button>
                    </div>
                </div>
            </div>
         );
      case 'dashboard':
      default:
        return (
            <div className="animate-fade-in">
              {showWelcome && (
                <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg mb-6 text-center animate-fade-in">
                    <p className="text-gray-200">Bem-vindo de volta, <span className="font-bold">{userData.name}</span>. Seu último plano de ação foi carregado com sucesso.</p>
                </div>
              )}
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">Sua Jornada Diária</h1>
                    <p className="text-gray-400">{dailyContentData.date}</p>
                </div>
                 <div className="glass-card p-3 rounded-lg flex items-center">
                    <ZapIcon className="w-6 h-6 text-yellow-400 mr-2" />
                    <span className="text-white font-bold text-lg">{userData.ep.toLocaleString()} EP</span>
                    <div className="w-px h-6 bg-slate-600 mx-3"></div>
                    <span className={`font-bold ${currentLevelInfo.color}`}>{userData.level}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 rounded-lg">
                        <h2 className="text-xl font-semibold font-display text-sky-400 mb-2">Motivação do Dia</h2>
                        <p className="text-gray-300 italic">"{dailyContentData.motivation}"</p>
                    </div>

                    <div className="glass-card p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                           <h2 className="text-xl font-semibold font-display text-purple-400">{dailyContentData.text.title}</h2>
                        </div>
                        <p className="text-gray-300 whitespace-pre-line">{dailyContentData.text.content}</p>
                    </div>
                    <div className="glass-card p-6 rounded-lg">
                        <h2 className="text-xl font-semibold font-display text-yellow-400 mb-2">Atividade Interativa: Sua 'Uma Coisa' do Dia</h2>
                        <p className="text-gray-300 mb-4 italic">"{dailyContentData.reflection.prompt}"</p>
                        <textarea 
                            value={dailyActivityResponse}
                            onChange={(e) => setDailyActivityResponse(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm h-28 mb-4"
                            placeholder="Escreva sua reflexão aqui..."
                        />
                         <div className="flex items-center gap-4">
                            <button onClick={handleSaveActivity} disabled={!dailyActivityResponse.trim()} className="bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-yellow-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
                                Salvar Reflexão
                            </button>
                             {isActivitySaved && <span className="text-green-400 text-sm animate-fade-in">Salvo na sua Biblioteca!</span>}
                         </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-lg">
                        <h2 className="text-xl font-semibold font-display text-white mb-4">Metas de Hoje ({dailyGoals.filter(g => g.completed).length}/{dailyGoals.length})</h2>
                        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                           {dailyGoals.map(goal => (
                               <div key={goal.id} onClick={() => handleGoalVerification(goal)} className={`p-3 rounded-lg flex items-center cursor-pointer transition-all ${goal.completed ? 'bg-green-500/20 opacity-70' : 'bg-slate-700/50 hover:bg-slate-700'}`}>
                                <div className={`w-5 h-5 rounded-md border-2 ${goal.completed ? 'bg-green-500 border-green-400' : 'border-gray-500'} flex items-center justify-center mr-3 flex-shrink-0`}>
                                   {goal.completed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                </div>
                                <span className={`text-sm ${goal.completed ? 'text-gray-400 line-through' : 'text-white'}`}>{goal.text}</span>
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
          {navItems.map(item => {
            const isLocked = lockedTabs.includes(item.id);
            return (
                <button 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id as any)} 
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors mb-2 ${activeTab === item.id ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700/50 hover:text-white'}`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="hidden lg:inline ml-4 font-semibold">{item.label}</span>
                  </div>
                  {isLocked && <LockIcon className="hidden lg:inline text-yellow-400"/>}
                </button>
            )
          })}
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