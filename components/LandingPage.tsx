import React from 'react';
import type { SubscriptionPlan } from '../types';
import Footer from './Footer';
import { ChartBarIcon, SparklesIcon, ZapIcon, BookOpenIcon } from './icons';

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
    { name: "Lucas T.", age: 31, text: "Me fez sair da inércia e seguir meu plano de carreira." },
    { name: "Beatriz S.", age: 24, text: "Finalmente parei de só assistir vídeos de produtividade e comecei a agir." },
];

const plans: { name: SubscriptionPlan; price: string; description: string; color: string; kirvanoLink: string; }[] = [
    { name: "Essencial", price: "9,90", description: "Ideal para começar seu progresso pessoal.", color: "slate", kirvanoLink: "https://pay.kirvano.com/627962ae-437c-48a5-a90c-9aea1835d34f" },
    { name: "Avançado", price: "19,90", description: "Inclui metas de carreira e relatórios semanais.", color: "purple", kirvanoLink: "https://pay.kirvano.com/be0d0695-5fbe-49c6-83a2-8c2bd9f2021f" },
    { name: "Premium", price: "37,90", description: "Tudo do Avançado + check-ins de foco e coach por IA.", color: "sky", kirvanoLink: "https://pay.kirvano.com/31300091-fd80-4c32-a483-2de4e0dabe2a" },
];

const LandingPage: React.FC<LandingPageProps> = ({ openModal }) => {

  return (
    <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden animated-gradient-bg">
            <div className="container mx-auto px-6 text-center z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white font-display mb-4 animate-slide-in-up">
                    Projete sua Melhor Versão com <span className="animated-gradient-text">Inteligência Artificial</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-in-up animation-delay-300">
                    KyrosAI é seu parceiro de desenvolvimento pessoal, criando um plano de ação diário para você alcançar seus objetivos de vida e carreira.
                </p>
                <div className="animate-slide-in-up animation-delay-600">
                    <a href="#demo" className="bg-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-purple-700 transition-transform hover:scale-105 transform inline-block">
                        Veja como funciona
                    </a>
                </div>
            </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-20 bg-slate-950">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">Experimente o KyrosAI</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-10">Veja como o KyrosAI organiza o seu dia para aproximar você dos seus objetivos.</p>

                <div className="max-w-md mx-auto glass-card p-6 rounded-lg text-left">
                    <h3 className="font-bold text-white text-lg mb-4 font-display">Plano do Dia: Foco e Clareza</h3>
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
                     <p className="text-gray-300 text-lg mb-6">Assine o KyrosAI e receba planos diários personalizados com base nas suas metas.</p>
                     <a href="#pricing" className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-transform hover:scale-105 transform">
                        Ver Planos
                    </a>
                </div>
            </div>
        </section>

        {/* New Pricing Section */}
        <section id="pricing" className="py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="space-y-6">
                    {plans.map(plan => (
                         <div key={plan.name} className={`glass-card rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-slate-700/50 transition-all hover:border-purple-500 hover:shadow-2xl`}>
                            <div className="flex-grow">
                                <h3 className={`text-2xl font-bold font-display text-purple-400`}>{plan.name}</h3>
                                <p className="text-gray-300 mt-1">{plan.description}</p>
                            </div>
                            <div className="flex items-baseline gap-4 w-full sm:w-auto">
                                <p className="text-3xl font-extrabold text-white">R${plan.price}<span className="text-base font-normal text-gray-400">/mês</span></p>
                                <a href={plan.kirvanoLink} target="_blank" rel="noopener noreferrer" className={`w-full sm:w-auto bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors text-center`}>Ativar Plano</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Social Proof Section */}
        <section id="social-proof" className="py-20 bg-slate-950">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-display leading-tight max-w-3xl mx-auto">Mais de 2.000 pessoas já estão seguindo seus planos diários com a KyrosAI.</h2>
                <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Usuários relatam mais foco, consistência e clareza em menos de 7 dias.</p>
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

        {/* Final CTA */}
        <section className="py-20">
            <div className="container mx-auto px-6 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-6">Comece sua jornada — Ative seu plano agora</h2>
                 <button onClick={() => openModal('signup')} className="bg-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-purple-700 transition-transform hover:scale-105 transform">
                    Criar minha conta
                </button>
            </div>
        </section>

        <Footer />
    </main>
  );
};

export default LandingPage;