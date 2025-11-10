import React from 'react';
import type { User, SubscriptionPlan } from '../types';
import { AwardIcon, ChartBarIcon, BookOpenIcon, SparklesIcon, VideoIcon } from './icons';

interface SubscriptionProps {
    user: User | null;
    onLogout: () => void;
}

const Subscription: React.FC<SubscriptionProps> = ({ user, onLogout }) => {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center animated-gradient-bg pt-20 p-4">
            <div className="w-full max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display mb-3 animate-slide-in-up">
                    Olá, {user?.name}!
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-in-up animation-delay-300">
                    {user?.subscriptionStatus === 'Expired' 
                        ? "Sua assinatura expirou. Renove para continuar recebendo planos diários."
                        : "Falta apenas um passo para desbloquear sua jornada de desenvolvimento."
                    }
                </p>
            </div>
            
            <div className="w-full max-w-md animate-slide-in-up animation-delay-600">
                <div className="glass-card border-2 border-purple-500 rounded-lg p-8 w-full relative flex flex-col">
                    <span className="absolute top-0 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full mx-auto left-0 right-0 w-fit">PLANO RECOMENDADO</span>
                    <h3 className="text-2xl font-bold text-white font-display text-center">Plano Avançado</h3>
                    <p className="text-gray-400 mt-2 mb-6 text-center">A experiência completa para uma transformação real.</p>
                    <p className="text-5xl font-extrabold text-white mb-6 text-center">R$19,90<span className="text-lg font-normal text-gray-400">/mês</span></p>
                    <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
                        <li className="flex items-start"><BookOpenIcon className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" /> Acesso completo ao conteúdo diário</li>
                        <li className="flex items-start"><AwardIcon className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" /> Metas personalizadas (baseado no quiz)</li>
                        <li className="flex items-start"><ChartBarIcon className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" /> Gráficos de progresso</li>
                        <li className="flex items-start"><SparklesIcon className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" /> Acesso ilimitado à comunidade</li>
                        <li className="flex items-start"><VideoIcon className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" /> Áudios e meditações diárias</li>
                    </ul>
                    <a href="https://kirvano.com/checkout/LINK_DO_PLANO_AVANCADO" target="_blank" rel="noopener noreferrer" className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors mt-auto transform hover:scale-105 text-center">
                        Assinar e Desbloquear Acesso
                    </a>
                </div>
            </div>

            <div className="mt-8 text-center animate-fade-in">
                <button onClick={onLogout} className="text-gray-400 hover:text-white transition-colors underline">
                    Sair da conta
                </button>
            </div>
        </main>
    );
};

export default Subscription;