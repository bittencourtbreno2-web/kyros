import React from 'react';
import type { User, SubscriptionPlan } from '../types';
import { CheckCircleIcon } from './icons';

interface PricingPageProps {
    user: User | null;
}

const plansData = [
    {
        name: 'Essencial' as SubscriptionPlan,
        price: '9,90',
        description: 'Para começar a organizar sua vida e criar hábitos.',
        features: [
            'Plano de ação diário com IA',
            'Biblioteca de conteúdo básico',
            'Rastreamento de hábitos simples',
            'Comunidade de membros',
        ],
        color: 'slate',
        recommended: false,
        kirvanoLink: "https://kirvano.com/checkout/LINK_DO_PLANO_ESSENCIAL"
    },
    {
        name: 'Avançado' as SubscriptionPlan,
        price: '19,90',
        description: 'Para quem busca crescimento acelerado e insights profundos.',
        features: [
            'Tudo do Essencial',
            'Metas de carreira e finanças',
            'Relatórios de progresso semanais',
            'Análises e insights da IA',
            'Comunidade exclusiva Avançado',
        ],
        color: 'purple',
        recommended: true,
        kirvanoLink: "https://kirvano.com/checkout/LINK_DO_PLANO_AVANCADO"
    },
    {
        name: 'Premium' as SubscriptionPlan,
        price: '37,90',
        description: 'A experiência completa com acompanhamento personalizado.',
        features: [
            'Tudo do Avançado',
            'Check-ins de foco com a IA',
            'Sessões de "coach" por IA',
            'Conteúdo e cursos avançados',
            'Suporte prioritário',
        ],
        color: 'sky',
        recommended: false,
        kirvanoLink: "https://kirvano.com/checkout/LINK_DO_PLANO_PREMIUM"
    },
];


const PricingPage: React.FC<PricingPageProps> = ({ user }) => {
    const currentUserPlan = user?.subscriptionPlan;
    
    return (
        <main className="min-h-screen flex flex-col items-center justify-center animated-gradient-bg pt-24 p-4">
            <div className="text-center mb-12 animate-slide-in-up">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display mb-3">
                    Escolha o plano ideal para você
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    {currentUserPlan && currentUserPlan !== 'Free' ? 'Faça upgrade ou downgrade do seu plano a qualquer momento.' : 'Desbloqueie seu potencial com as ferramentas certas.'}
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
                {plansData.map((plan, index) => {
                    const isCurrentPlan = plan.name === currentUserPlan;
                    const buttonText = isCurrentPlan ? 'Plano Atual' : 'Selecionar Plano';
                    
                    return (
                        <div key={plan.name} className={`glass-card rounded-lg p-8 w-full flex flex-col animate-slide-in-up transition-all hover:scale-105 ${plan.recommended ? 'border-2 border-purple-500' : 'border border-slate-700'} ${isCurrentPlan ? 'ring-2 ring-sky-400' : ''}`} style={{animationDelay: `${index * 150}ms`}}>
                            <div className="relative h-6 mb-2">
                                {plan.recommended && !isCurrentPlan && (
                                    <span className="absolute top-0 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full mx-auto left-0 right-0 w-fit">RECOMENDADO</span>
                                )}
                                {isCurrentPlan && (
                                    <span className="absolute top-0 -translate-y-1/2 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full mx-auto left-0 right-0 w-fit">SEU PLANO ATUAL</span>
                                )}
                            </div>
                             <h3 className={`text-2xl font-bold font-display ${plan.recommended ? 'text-purple-400' : 'text-white'}`}>{plan.name}</h3>
                             <p className="text-gray-400 mt-2 mb-6 min-h-[48px]">{plan.description}</p>
                             <p className="text-5xl font-extrabold text-white mb-6">
                                R${plan.price}<span className="text-lg font-normal text-gray-400">/mês</span>
                             </p>
                             <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-start">
                                        <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                             </ul>
                             <a 
                                href={isCurrentPlan ? undefined : plan.kirvanoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full text-center font-bold py-3 rounded-lg transition-colors mt-auto ${
                                    isCurrentPlan 
                                    ? 'bg-slate-600 text-gray-400 cursor-not-allowed'
                                    : plan.recommended 
                                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                                        : 'bg-slate-700 text-white hover:bg-slate-600'
                                }`}>
                                {buttonText}
                            </a>
                        </div>
                    )
                })}
            </div>
        </main>
    );
};

export default PricingPage;