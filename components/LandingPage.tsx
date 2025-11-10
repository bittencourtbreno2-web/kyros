import React, { useState, useEffect } from 'react';
import type { SubscriptionPlan } from '../types';
import Footer from './Footer';
import CountdownTimer from './CountdownTimer';
// FIX: Import CheckCircleIcon to fix 'Cannot find name' error.
import { ChartBarIcon, SparklesIcon, ZapIcon, BookOpenIcon, ShieldCheckIcon, UsersIcon, CheckCircleIcon } from './icons';

interface LandingPageProps {
  openModal: (type: 'signup' | 'login') => void;
}

const demoPlanTasks = [
    { icon: <ZapIcon className="w-5 h-5 text-yellow-400" />, text: "Definir a principal meta do dia", category: "Foco" },
    { icon: <BookOpenIcon className="w-5 h-5 text-sky-400" />, text: "Ler 10 páginas de um livro inspirador", category: "Mente" },
    { icon: <ChartBarIcon className="w-5 h-5 text-purple-400" />, text: "Revisar seu progresso de carreira por 5 min", category: "Carreira" },
    { icon: <SparklesIcon className="w-5 h-5 text-green-400" />, text: "Praticar 2 minutos de respiração consciente", category: "Bem-estar" },
];

const testimonials = [
    { name: "Mariana R.", age: 27, text: "A KyrosAI virou meu coach pessoal — não começo o dia sem ela." },
    { name: "Lucas T.", age: 31, text: "A KyrosAI me ajudou a criar rotina e manter o foco todos os dias." },
    { name: "Beatriz S.", age: 24, text: "Finalmente parei de só assistir vídeos de produtividade e comecei a agir." },
];

const plans: { name: SubscriptionPlan; price: string; features: string[]; kirvanoLink: string; buttonClass: string; recommended?: boolean }[] = [
    { name: "Essencial", price: "9,90", features: ['Plano de ação diário com IA', 'Rastreamento de hábitos', 'Comunidade de membros', 'Biblioteca de conteúdo'], kirvanoLink: "https://pay.kirvano.com/627962ae-437c-48a5-a90c-9aea1835d34f", buttonClass: "bg-slate-700 hover:bg-slate-600" },
    { name: "Avançado", price: "19,90", features: ['Tudo do Essencial', 'Metas de carreira e finanças', 'Relatórios de progresso', 'Análises e insights da IA'], kirvanoLink: "https://pay.kirvano.com/be0d0695-5fbe-49c6-83a2-8c2bd9f2021f", buttonClass: "bg-purple-600 hover:bg-purple-700", recommended: true },
    { name: "Premium", price: "37,90", features: ['Tudo do Avançado', 'Sessões de "coach" por IA', 'Conteúdo e cursos avançados', 'Suporte prioritário'], kirvanoLink: "https://pay.kirvano.com/31300091-fd80-4c32-a483-2de4e0dabe2a", buttonClass: "bg-sky-500 hover:bg-sky-600" },
];

const LandingPage: React.FC<LandingPageProps> = ({ openModal }) => {
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setShowTimer(true);
    };

    window.addEventListener('scroll', handleInteraction, { once: true });
    document.body.addEventListener('click', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      document.body.removeEventListener('click', handleInteraction);
    };
  }, []);

  return (
    <main>
        {showTimer && <CountdownTimer />}

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden animated-gradient-bg">
            <div className="container mx-auto px-6 text-center z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white font-display mb-4 animate-slide-in-up">
                    Seu plano diário personalizado, criado pela IA para você evoluir <span className="animated-gradient-text">todos os dias</span>.
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-in-up animation-delay-300">
                    Não é só mais um app de hábitos — é IA + plano diário + acompanhamento real.
                </p>
                <div className="animate-slide-in-up animation-delay-600">
                    <a href="#pricing" className="bg-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-purple-700 transition-transform hover:scale-105 transform inline-block">
                        Comece agora com a KyrosAI
                    </a>
                </div>
            </div>
        </section>

        {/* Social Proof Section */}
        <section id="social-proof" className="py-20 bg-slate-950">
            <div className="container mx-auto px-6 text-center">
                 <div className="max-w-3xl mx-auto glass-card p-6 rounded-lg flex flex-col sm:flex-row items-center gap-4 border border-slate-700/50">
                    <div className="text-purple-400"><UsersIcon className="w-10 h-10" /></div>
                    <h2 className="text-xl md:text-2xl font-bold text-white font-display leading-tight text-center sm:text-left">
                        🚀 Mais de 2.000 pessoas já estão evoluindo com seus planos diários criados pela KyrosAI.
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
                   {testimonials.map((testimonial, index) => (
                        <div key={index} className="glass-card p-6 rounded-lg">
                            <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex-shrink-0 mr-3"></div>
                                <div>
                                    <p className="font-semibold text-white">{testimonial.name}</p>
                                    <p className="text-sm text-gray-400">{testimonial.age} anos</p>
                                </div>
                            </div>
                        </div>
                   ))}
                </div>
            </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">Experimente a Clareza Diária</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-10">Veja como a KyrosAI organiza seu dia para aproximar você dos seus objetivos.</p>

                <div className="max-w-md mx-auto glass-card p-6 rounded-lg text-left">
                    <h3 className="font-bold text-white text-lg mb-4 font-display">Seu Plano de Ação para Hoje</h3>
                    <div className="space-y-3">
                        {demoPlanTasks.map((task, index) => (
                            <div key={index} className="flex items-center bg-slate-800/50 p-3 rounded-md">
                                <div className="mr-3">{task.icon}</div>
                                <span className="text-gray-300 flex-grow">{task.text}</span>
                                <span className="text-xs font-semibold bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{task.category}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12">
                     <h3 className="text-2xl md:text-3xl font-bold font-display animated-gradient-text mb-2">Quer um plano 100% feito para você?</h3>
                     <p className="text-gray-300 text-lg mb-6">Receba planos diários personalizados com base nas suas metas e evolua de verdade.</p>
                     <a href="#pricing" className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-transform hover:scale-105 transform">
                        Comece hoje
                    </a>
                </div>
            </div>
        </section>

        {/* New Pricing Section */}
        <section id="pricing" className="py-20 bg-slate-950">
            <div className="container mx-auto px-6 max-w-6xl">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-display">Escolha o plano ideal para você</h2>
                 </div>
                <div className="grid md:grid-cols-3 gap-8 w-full">
                    {plans.map((plan, index) => (
                         <div key={plan.name} className={`glass-card rounded-lg p-6 flex flex-col transition-all hover:scale-105 ${plan.recommended ? 'border-2 border-purple-500' : 'border border-slate-700'}`}>
                            {plan.recommended && <span className="self-center -mt-9 mb-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMENDADO</span>}
                            <h3 className={`text-2xl font-bold font-display text-center ${plan.recommended ? 'text-purple-400' : 'text-white'}`}>{plan.name}</h3>
                            <p className="text-5xl font-extrabold text-white text-center my-4">
                                R${plan.price}<span className="text-lg font-normal text-gray-400">/mês</span>
                            </p>
                            <ul className="space-y-3 text-gray-300 mb-6 flex-grow">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-start">
                                        <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                             </ul>
                            <a href={plan.kirvanoLink} target="_blank" rel="noopener noreferrer" className={`w-full ${plan.buttonClass} text-white font-bold py-3 rounded-lg transition-colors text-center`}>Assinar Agora</a>
                            <p className="text-xs text-gray-500 text-center mt-3"><ShieldCheckIcon />Cancele quando quiser. Pagamento 100% seguro.</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
            <div className="container mx-auto px-6 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-6">Projete sua melhor versão com a KyrosAI</h2>
                 <button onClick={() => openModal('signup')} className="bg-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-purple-700 transition-transform hover:scale-105 transform">
                    Comece sua jornada
                </button>
            </div>
        </section>

        <Footer />
    </main>
  );
};

export default LandingPage;