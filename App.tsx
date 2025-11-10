import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import Dashboard from './components/Dashboard';
import Subscription from './components/Subscription';
import Modal from './components/Modal';
import type { User, LifeArea, Feature, QuizAnswer, RegisteredUser, SubscriptionPlan } from './types';
import { EyeIcon, EyeSlashIcon, AppleIcon } from './components/icons';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'quiz' | 'dashboard' | 'subscription'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [quizResults, setQuizResults] = useState<QuizAnswer[]>([]);
  const [initialLifeAreas, setInitialLifeAreas] = useState<LifeArea[]>([]);
  const [modal, setModal] = useState<{ type: 'signup' | 'login' | 'payment' | 'featureInfo' | 'forgotPassword' | 'resetConfirmation'; data?: Feature | { plan: SubscriptionPlan }; email?: string } | null>(null);

  // States for auth forms
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });
  const [showPassword, setShowPassword] = useState(false);

  const getRegisteredUsers = (): RegisteredUser[] => {
    try {
        const users = localStorage.getItem('kyros_users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        return [];
    }
  };

  const updateUserInStorage = (updatedUser: Partial<RegisteredUser> & { email: string }): RegisteredUser | undefined => {
      const users = getRegisteredUsers();
      const updatedUsers = users.map(u => 
          u.email === updatedUser.email ? { ...u, ...updatedUser } : u
      );
      localStorage.setItem('kyros_users', JSON.stringify(updatedUsers));
      return updatedUsers.find(u => u.email === updatedUser.email);
  };

  // --- Persistent Auth Logic ---
  useEffect(() => {
    try {
        const session = localStorage.getItem('kyros_session');
        if (session) {
            const sessionUser: { email: string } = JSON.parse(session);
            const users = getRegisteredUsers();
            const fullUser = users.find(u => u.email === sessionUser.email);
            
            if (fullUser) {
                setInitialLifeAreas(fullUser.lifeAreas || []);
                const freshUser = createInitialUser(fullUser);
                setUser(freshUser);

                const isSubscribedAndActive = fullUser.subscriptionStatus === 'Active' && fullUser.subscriptionEndDate && new Date(fullUser.subscriptionEndDate) > new Date();

                if (isSubscribedAndActive) {
                    setView('dashboard');
                } else {
                    if (fullUser.subscriptionStatus === 'Active') { // It just expired
                         updateUserInStorage({ email: fullUser.email, subscriptionStatus: 'Expired' });
                    }
                    setView('subscription');
                }
            } else {
                handleLogout();
            }
        }
    } catch (error) {
        console.error("Failed to parse session from localStorage", error);
        localStorage.removeItem('kyros_session');
    }
  }, []);
  
  const createInitialUser = (registeredUser: RegisteredUser): User => ({
      name: registeredUser.name,
      email: registeredUser.email,
      ep: registeredUser.ep ?? 0,
      level: registeredUser.level ?? 'Iniciante',
      badges: registeredUser.badges ?? [],
      subscriptionPlan: registeredUser.subscriptionPlan,
      subscriptionStatus: registeredUser.subscriptionStatus,
  });
  
  const checkPasswordStrength = (pass: string) => {
      let score = 0;
      let feedback = [];
      if (pass.length < 8) {
          feedback.push("Pelo menos 8 caracteres.");
      } else {
          score++;
      }
      if (/[A-Z]/.test(pass)) score++; else feedback.push("Use uma letra maiúscula.");
      if (/[a-z]/.test(pass)) score++; else feedback.push("Use uma letra minúscula.");
      if (/[0-9]/.test(pass)) score++; else feedback.push("Use um número.");
      if (/[^A-Za-z0-9]/.test(pass)) score++; else feedback.push("Use um caractere especial.");
      
      setPasswordStrength({ score, feedback: feedback.join(' ') });
  };

  const handleLogin = (email: string, pass: string) => {
    clearAuthMessages();
    const users = getRegisteredUsers();
    const foundUser = users.find(u => u.email === email);

    if (!foundUser || foundUser.password !== pass) {
      setAuthError('E-mail ou senha inválidos. Tente novamente.');
      return;
    }

    const updatedUser = updateUserInStorage({ email: foundUser.email, lastLogin: new Date().toISOString() });
    if (!updatedUser) return;

    setInitialLifeAreas(updatedUser.lifeAreas || []);
    const loggedInUser = createInitialUser(updatedUser);
    setUser(loggedInUser);
    localStorage.setItem('kyros_session', JSON.stringify({ email: loggedInUser.email }));
    
    const isSubscribedAndActive = loggedInUser.subscriptionStatus === 'Active' && updatedUser.subscriptionEndDate && new Date(updatedUser.subscriptionEndDate) > new Date();

    if (isSubscribedAndActive) {
        setView('dashboard');
    } else {
        setView('subscription');
    }
    setModal(null);
  };
  
  const handleGoogleLogin = () => {
    clearAuthMessages();
    const googleEmail = 'usuario.google@kyros.ai';
    const googleName = 'Usuário Google';
    const now = new Date().toISOString();

    const users = getRegisteredUsers();
    let foundUser = users.find(u => u.email === googleEmail);

    if (!foundUser) {
        const newGoogleUser: RegisteredUser = {
            id: `google-${Date.now()}`,
            name: googleName,
            email: googleEmail,
            createdAt: now,
            lastLogin: now,
            subscriptionPlan: 'Free',
            subscriptionStatus: 'Inactive',
            lifeAreas: [],
        };
        users.push(newGoogleUser);
        localStorage.setItem('kyros_users', JSON.stringify(users));
        foundUser = newGoogleUser;
    } else {
        foundUser.lastLogin = now;
        updateUserInStorage({email: foundUser.email, lastLogin: now});
    }

    setInitialLifeAreas(foundUser.lifeAreas || []);
    const loggedInUser = createInitialUser(foundUser);
    setUser(loggedInUser);
    localStorage.setItem('kyros_session', JSON.stringify({ email: loggedInUser.email }));
    
    const isSubscribedAndActive = loggedInUser.subscriptionStatus === 'Active' && foundUser.subscriptionEndDate && new Date(foundUser.subscriptionEndDate) > new Date();

    if (isSubscribedAndActive) {
        setView('dashboard');
    } else {
        setView('subscription');
    }
    setModal(null);
  }

  const handleSignup = (name: string, email: string, pass: string) => {
    clearAuthMessages();
    if (passwordStrength.score < 5) {
        setAuthError(`Senha fraca. ${passwordStrength.feedback}`);
        return;
    }
    
    const users = getRegisteredUsers();
    if (users.some(u => u.email === email)) {
      setAuthError('Este e-mail já está registrado. Tente fazer login.');
      return;
    }

    const now = new Date().toISOString();
    const newUser: RegisteredUser = { 
        id: `user-${Date.now()}`,
        name,
        email,
        password: pass,
        createdAt: now,
        lastLogin: now,
        subscriptionPlan: 'Free',
        subscriptionStatus: 'Inactive',
        lifeAreas: [],
    };
    users.push(newUser);
    localStorage.setItem('kyros_users', JSON.stringify(users));
    setInitialLifeAreas([]);
    
    const loggedInUser = createInitialUser(newUser);
    setUser(loggedInUser);
    localStorage.setItem('kyros_session', JSON.stringify({ email: loggedInUser.email }));
    setView('subscription');
    setModal(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('kyros_session');
    setView('landing');
  };
  
  const handleForgotPassword = (email: string) => {
      clearAuthMessages();
      const users = getRegisteredUsers();
      if(users.some(u => u.email === email)) {
          setAuthSuccess(`Um link para redefinir sua senha foi enviado para ${email}.`);
      } else {
          setAuthError("Nenhuma conta encontrada com este e-mail.");
      }
  }

  const handleQuizComplete = (answers: QuizAnswer[], finalScores: LifeArea[]) => {
    setQuizResults(answers);
    setInitialLifeAreas(finalScores);
    
    if (user) {
        updateUserInStorage({ email: user.email, lifeAreas: finalScores });
    }

    setView('dashboard');
  };
  
  const handleSubscription = (plan: SubscriptionPlan) => {
      if (!user || plan === 'Free') return;

      const now = new Date();
      const endDate = new Date(new Date().setDate(now.getDate() + 30));

      const fullUpdatedUser = updateUserInStorage({
          email: user.email,
          subscriptionPlan: plan,
          subscriptionStatus: 'Active',
          subscriptionStartDate: now.toISOString(),
          subscriptionEndDate: endDate.toISOString(),
      });
      if(!fullUpdatedUser) return;

      const updatedUserObject = createInitialUser(fullUpdatedUser);
      setUser(updatedUserObject);
      localStorage.setItem('kyros_session', JSON.stringify({ email: updatedUserObject.email }));

      if ((initialLifeAreas || fullUpdatedUser.lifeAreas || []).length === 0) {
          setView('quiz');
      } else {
          setView('dashboard');
      }
      setModal(null);
  };

  const clearAuthMessages = () => {
      setAuthError(null);
      setAuthSuccess(null);
  }
  
  const openModal = (type: 'login' | 'signup') => {
      clearAuthMessages();
      setPassword('');
      setPasswordStrength({score: 0, feedback: ''});
      setShowPassword(false);
      setModal({type: type});
  }

  const renderModalContent = () => {
    if (!modal) return null;

    switch (modal.type) {
      case 'signup':
        const strengthColors = ['bg-red-500', 'bg-red-500', 'bg-yellow-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-500'];
        return (
          <>
            <h2 className="text-2xl font-bold text-white mb-2 font-display">Crie sua Conta</h2>
            <p className="text-gray-400 mb-6">Comece a construir sua melhor versão hoje.</p>
            <form onSubmit={(e) => { e.preventDefault(); handleSignup(e.currentTarget.name_signup.value, e.currentTarget.email_signup.value, password); }}>
              <input type="text" name="name_signup" placeholder="Nome" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
              <input type="email" name="email_signup" placeholder="Email" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
               <div className="relative mb-1">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => {setPassword(e.target.value); checkPasswordStrength(e.target.value);}} placeholder="Senha" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white">
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                  <div className={`w-1/5 h-1 rounded-full ${password.length > 0 ? strengthColors[1] : 'bg-slate-600'}`}></div>
                  <div className={`w-1/5 h-1 rounded-full ${passwordStrength.score >= 2 ? strengthColors[2] : 'bg-slate-600'}`}></div>
                  <div className={`w-1/5 h-1 rounded-full ${passwordStrength.score >= 3 ? strengthColors[3] : 'bg-slate-600'}`}></div>
                  <div className={`w-1/5 h-1 rounded-full ${passwordStrength.score >= 4 ? strengthColors[4] : 'bg-slate-600'}`}></div>
                  <div className={`w-1/5 h-1 rounded-full ${passwordStrength.score >= 5 ? strengthColors[5] : 'bg-slate-600'}`}></div>
              </div>
              {password.length > 0 && passwordStrength.score < 5 && <p className="text-yellow-400 text-xs mb-4">{passwordStrength.feedback}</p>}
              {authError && <p className="text-red-400 text-sm mb-4 text-center">{authError}</p>}
              <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-colors disabled:opacity-50">Criar Conta</button>
            </form>
             <div className="text-center text-gray-400 my-4 text-sm">ou</div>
             <div className="flex gap-4">
                <button onClick={handleGoogleLogin} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-full transition-colors flex items-center justify-center gap-2">Google</button>
                <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-full transition-colors flex items-center justify-center gap-2"><AppleIcon /> Apple</button>
            </div>
          </>
        );
      case 'login':
         return (
          <>
            <h2 className="text-2xl font-bold text-white mb-2 font-display">Bem-vindo(a) de volta!</h2>
            <p className="text-gray-400 mb-6">Continue sua jornada de progresso.</p>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(e.currentTarget.email_login.value, e.currentTarget.password_login.value);}}>
               <input type="email" name="email_login" placeholder="Email" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
               <div className="relative mb-2">
                 <input type={showPassword ? "text" : "password"} name="password_login" placeholder="Senha" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white">
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
               </div>
               <div className="text-right mb-4">
                    <a href="#" onClick={(e) => {e.preventDefault(); setModal({type: 'forgotPassword'})}} className="text-sm text-purple-400 hover:underline">Esqueceu a senha?</a>
               </div>
              {authError && <p className="text-red-400 text-sm mb-4 text-center">{authError}</p>}
              {authSuccess && <p className="text-green-400 text-sm mb-4 text-center">{authSuccess}</p>}
              <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-colors">Entrar</button>
            </form>
             <div className="text-center text-gray-400 my-4 text-sm">ou</div>
             <div className="flex gap-4">
                <button onClick={handleGoogleLogin} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-full transition-colors flex items-center justify-center gap-2">Google</button>
                <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-full transition-colors flex items-center justify-center gap-2"><AppleIcon/> Apple</button>
            </div>
          </>
        );
      case 'forgotPassword':
          return (
             <>
                <h2 className="text-2xl font-bold text-white mb-2 font-display">Recuperar Senha</h2>
                <p className="text-gray-400 mb-6">Digite seu e-mail para receber um link de recuperação.</p>
                <form onSubmit={(e) => { e.preventDefault(); handleForgotPassword(e.currentTarget.email_recovery.value);}}>
                    <input type="email" name="email_recovery" placeholder="Email" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                    {authError && <p className="text-red-400 text-sm mb-4 text-center">{authError}</p>}
                    {authSuccess && <p className="text-green-400 text-sm mb-4 text-center">{authSuccess}</p>}
                    <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-colors">Enviar Link</button>
                </form>
             </>
          );
      case 'payment':
        const planData = modal.data as { plan: SubscriptionPlan };
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2 font-display">Confirmar Assinatura</h2>
            <p className="text-gray-400 mb-4">Você está assinando o plano <span className={`font-bold text-purple-400`}>{planData.plan}</span>.</p>
            <p className="text-gray-400">Esta é uma simulação. Nenhum valor será cobrado.</p>
            <button onClick={() => handleSubscription(planData.plan)} className="mt-6 w-full bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
                Confirmar e Iniciar
            </button>
          </div>
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
      case 'subscription':
        return <Subscription user={user} onSubscribe={() => handleSubscription('Pro')} onLogout={handleLogout} />;
      case 'quiz':
        return <Quiz onComplete={handleQuizComplete} userName={user?.name || 'Usuário'} />;
      case 'dashboard':
        return <Dashboard user={user} onLogout={handleLogout} initialLifeAreas={initialLifeAreas} />;
      case 'landing':
      default:
        return <LandingPage setModal={setModal} openModal={openModal} />;
    }
  };

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] font-sans leading-relaxed">
      {modal && <Modal onClose={() => setModal(null)}>{renderModalContent()}</Modal>}
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onOpenLogin={() => openModal('login')}
        onOpenSignup={() => openModal('signup')}
        onGoToDashboard={() => setView('dashboard')}
        onGoHome={() => setView('landing')}
      />
      {renderView()}
    </div>
  );
};

export default App;