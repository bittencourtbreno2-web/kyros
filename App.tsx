import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import Dashboard from './components/Dashboard';
import Modal from './components/Modal';
import type { User, LifeArea, Feature, QuizAnswer } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'quiz' | 'dashboard'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [quizResults, setQuizResults] = useState<QuizAnswer[]>([]);
  const [initialLifeAreas, setInitialLifeAreas] = useState<LifeArea[]>([]);
  const [modal, setModal] = useState<{ type: 'signup' | 'login' | 'payment' | 'featureInfo'; data?: Feature } | null>(null);

  // State for simulated authentication
  const [registeredUser, setRegisteredUser] = useState<{name: string, email: string, password: string} | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top on view change
    window.scrollTo(0, 0);
  }, [view]);

  const handleLogin = (email: string, password: string) => {
    if (!registeredUser) {
      setLoginError('Nenhum usuário cadastrado. Por favor, crie uma conta primeiro.');
      return;
    }
    
    if (registeredUser.email === email && registeredUser.password === password) {
      setUser({ name: registeredUser.name });
      setView('dashboard');
      setModal(null);
      setLoginError(null);
    } else {
      setLoginError('E-mail ou senha inválidos. Tente novamente.');
    }
  };

  const handleSignup = (name: string, email: string, password: string) => {
    const newUser = { name, email, password };
    setRegisteredUser(newUser);
    setUser({ name });
    setView('quiz');
    setModal(null);
    setLoginError(null);
  };
  
  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const handleQuizComplete = (answers: QuizAnswer[], finalScores: LifeArea[]) => {
    setQuizResults(answers);
    setInitialLifeAreas(finalScores);
    setView('dashboard');
  };

  const renderModalContent = () => {
    if (!modal) return null;

    switch (modal.type) {
      case 'signup':
        return (
          <>
            <h2 className="text-2xl font-bold text-white mb-2 font-display">Crie sua Conta</h2>
            <p className="text-gray-400 mb-6">Comece a construir sua melhor versão hoje.</p>
            <form onSubmit={(e) => { 
                e.preventDefault(); 
                const form = e.currentTarget;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const email = (form.elements.namedItem('email_signup') as HTMLInputElement).value;
                const password = (form.elements.namedItem('password_signup') as HTMLInputElement).value;
                handleSignup(name, email, password);
              }}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">Nome</label>
                <input type="text" id="name" name="name" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email_signup" className="block text-gray-300 mb-2">Email</label>
                <input type="email" id="email_signup" name="email_signup" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
              </div>
               <div className="mb-6">
                <label htmlFor="password_signup" className="block text-gray-300 mb-2">Senha</label>
                <input type="password" id="password_signup" name="password_signup" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
                Criar conta gratuita
              </button>
            </form>
          </>
        );
      case 'login':
         return (
          <>
            <h2 className="text-2xl font-bold text-white mb-2 font-display">Bem-vindo(a) de volta!</h2>
            <p className="text-gray-400 mb-6">Continue sua jornada de progresso.</p>
            <form onSubmit={(e) => { 
                e.preventDefault(); 
                const form = e.currentTarget;
                const email = (form.elements.namedItem('email_login') as HTMLInputElement).value;
                const password = (form.elements.namedItem('password_login') as HTMLInputElement).value;
                handleLogin(email, password);
              }}>
               <div className="mb-4">
                <label htmlFor="email_login" className="block text-gray-300 mb-2">Email</label>
                <input type="email" id="email_login" name="email_login" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
              </div>
               <div className="mb-6">
                <label htmlFor="password_login" className="block text-gray-300 mb-2">Senha</label>
                <input type="password" id="password_login" name="password_login" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
              </div>
              {loginError && <p className="text-red-400 text-sm mb-4 text-center">{loginError}</p>}
              <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
                Entrar
              </button>
            </form>
          </>
        );
      case 'payment':
        return (
          <>
            <h2 className="text-2xl font-bold text-white mb-2 font-display">Assinatura</h2>
            <p className="text-gray-400">Esta é uma simulação de checkout. A funcionalidade de pagamento real será implementada em breve.</p>
            <button onClick={() => setModal(null)} className="mt-6 w-full bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
                Entendido
            </button>
          </>
        );
      case 'featureInfo':
         return (
          <>
            <div className="text-purple-400 mb-4">{modal.data?.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2 font-display">{modal.data?.title}</h2>
            <p className="text-gray-400">{modal.data?.description} Esta é uma descrição estendida sobre a funcionalidade, explicando como ela ajuda o usuário a atingir seus objetivos de forma mais eficaz.</p>
          </>
        );
      default:
        return null;
    }
  };

  const renderView = () => {
    switch(view) {
      case 'quiz':
        return <Quiz onComplete={handleQuizComplete} userName={user?.name || 'Usuário'} />;
      case 'dashboard':
        return <Dashboard user={user} onLogout={handleLogout} initialLifeAreas={initialLifeAreas} />;
      case 'landing':
      default:
        return <LandingPage setModal={setModal} />;
    }
  };

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] font-sans leading-relaxed">
      {modal && <Modal onClose={() => setModal(null)}>{renderModalContent()}</Modal>}
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onOpenLogin={() => { setModal({type: 'login'}); setLoginError(null); }}
        onOpenSignup={() => setModal({type: 'signup'})}
        onGoToDashboard={() => setView('dashboard')}
        onGoHome={() => setView('landing')}
      />
      {renderView()}
    </div>
  );
};

export default App;