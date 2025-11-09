import React from 'react';
import type { Feature } from '../types';
import Footer from './Footer';
import { CheckCircleIcon, ChartBarIcon, SparklesIcon, ZapIcon } from './icons';

interface LandingPageProps {
  setModal: (modal: { type: 'signup' | 'login' | 'payment' | 'featureInfo'; data?: Feature } | null) => void;
}

const features: Feature[] = [
    {
      icon: <ChartBarIcon />,
      title: 'Diagnóstico Completo',
      description: 'Entenda seus pontos fortes e áreas de melhoria com nosso quiz inteligente.',
    },
    {
      icon: <ZapIcon />,
      title: 'Plano de Ação Diário',
      description: 'Receba metas e conteúdos personalizados para impulsionar seu crescimento.',
    },
    {
      icon: <SparklesIcon />,
      title: 'Comunidade de Apoio',
      description: 'Conecte-se com pessoas na mesma jornada e compartilhe suas experiências.',
    },
  ];

const LandingPage: React.FC<LandingPageProps> = ({ setModal }) => {
  const comparisonFeatures = [
    { name: 'Conteúdo diário', basic: '1 por dia', premium: 'Completo', vip: 'Completo' },
    { name: 'Metas personalizadas', basic: '1 semanal', premium: 'Ilimitadas', vip: 'Ilimitadas' },
    { name: 'Gráficos de progresso', basic: false, premium: true, vip: true },
    { name: 'Acompanhamento de leitura', basic: '5 págs/dia', premium: '10 págs/dia', vip: '10 págs/dia' },
    { name: 'Acesso à comunidade', basic: 'Limitado', premium: 'Ilimitado', vip: 'Ilimitado' },
    { name: 'Áudios e meditações', basic: false, premium: true, vip: true },
    { name: 'Consultoria via IA', basic: false, premium: false, vip: true },
    { name: 'Desafios de 30 dias', basic: false, premium: false, vip: true },
    { name: 'Certificados de conclusão', basic: false, premium: false, vip: true },
    { name: 'Acesso antecipado & exclusivo', basic: false, premium: false, vip: true },
  ];
  
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
                    <button onClick={() => setModal({type: 'signup'})} className="bg-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-purple-700 transition-transform hover:scale-105 transform">
                        Começar minha jornada (Grátis)
                    </button>
                    <p className="text-gray-400 mt-3 text-sm">Não é necessário cartão de crédito.</p>
                </div>
            </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-display">Por que Kyros<span className="animated-gradient-text">AI</span>?</h2>
                    <p className="text-gray-400 mt-2 max-w-2xl mx-auto">Nossa plataforma integra tecnologia e autoconhecimento para um desenvolvimento pessoal eficaz e sustentável.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="glass-card p-8 rounded-lg text-center">
                            <div className="text-purple-400 inline-block mb-4">
                                {React.isValidElement(feature.icon) && React.cloneElement(feature.icon, { className: "w-10 h-10"})}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold text-white font-display">Planos Flexíveis para sua Jornada</h2>
                    <p className="text-gray-400 mt-2 max-w-2xl mx-auto">Escolha o plano ideal e comece a transformar sua vida hoje com 7 dias de teste gratuito.</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-8 mb-16 items-stretch">
                    {/* Basic Plan */}
                    <div className="glass-card border border-slate-700 rounded-lg p-8 w-full flex flex-col">
                        <h3 className="text-2xl font-bold text-white">Básico</h3>
                        <p className="text-gray-400 mt-2 mb-6">Para quem está começando a jornada.</p>
                        <p className="text-4xl font-extrabold text-white mb-6">R$7,99 <span className="text-lg font-normal text-gray-400">/mês</span></p>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-1" /> 1 Conteúdo diário (texto ou vídeo)</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-1" /> 1 Meta semanal simples</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-1" /> Acompanhamento básico de progresso</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-1" /> Acesso limitado à comunidade</li>
                             <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-1" /> 5 páginas de leitura diária</li>
                        </ul>
                        <button onClick={() => setModal({type: 'payment'})} className="w-full bg-slate-700 text-white font-bold py-3 rounded-lg hover:bg-slate-600 transition-colors mt-auto">Comece Agora - 7 Dias Grátis</button>
                    </div>
                    {/* Premium Plan */}
                    <div className="glass-card border-2 border-purple-500 rounded-lg p-8 w-full relative flex flex-col">
                        <span className="absolute top-0 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">MAIS POPULAR</span>
                        <h3 className="text-2xl font-bold text-white">Premium</h3>
                        <p className="text-gray-400 mt-2 mb-6">Para quem busca crescimento acelerado.</p>
                        <p className="text-4xl font-extrabold text-white mb-6">R$19,90 <span className="text-lg font-normal text-gray-400">/mês</span></p>
                         <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-1" /> Acesso completo ao conteúdo diário</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-1" /> Metas personalizadas (baseado no quiz)</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-1" /> Gráficos de progresso</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-1" /> 10 páginas de leitura com acompanhamento</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-1" /> Acesso ilimitado à comunidade</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-1" /> Áudios e meditações diárias</li>
                        </ul>
                        <button onClick={() => setModal({type: 'payment'})} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors mt-auto">Experimente Agora - 7 Dias Grátis</button>
                    </div>
                     {/* VIP Plan */}
                    <div className="glass-card border border-slate-700 rounded-lg p-8 w-full flex flex-col">
                        <h3 className="text-2xl font-bold text-white">Premium + VIP</h3>
                        <p className="text-gray-400 mt-2 mb-6">Acompanhamento completo e exclusivo.</p>
                        <p className="text-4xl font-extrabold text-white mb-6">R$37,90 <span className="text-lg font-normal text-gray-400">/mês</span></p>
                         <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-sky-400 mr-2 flex-shrink-0 mt-1" /> <strong>Tudo do plano Premium</strong></li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-sky-400 mr-2 flex-shrink-0 mt-1" /> Consultoria personalizada via IA</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-sky-400 mr-2 flex-shrink-0 mt-1" /> Desafios imersivos de 30 dias</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-sky-400 mr-2 flex-shrink-0 mt-1" /> Certificados de conclusão</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-sky-400 mr-2 flex-shrink-0 mt-1" /> Acesso antecipado a novos conteúdos</li>
                            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-sky-400 mr-2 flex-shrink-0 mt-1" /> Vídeos e áudios exclusivos</li>
                        </ul>
                        <button onClick={() => setModal({type: 'payment'})} className="w-full bg-sky-500 text-white font-bold py-3 rounded-lg hover:bg-sky-600 transition-colors mt-auto">Acesse Agora - 7 Dias Grátis</button>
                    </div>
                </div>
                
                 {/* Comparison Table */}
                <div className="text-center mb-12 mt-20">
                    <h3 className="text-3xl font-bold text-white font-display">Compare os Planos</h3>
                </div>
                <div className="glass-card rounded-lg p-2 sm:p-6 overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="p-4 text-white font-semibold">Funcionalidade</th>
                                <th className="p-4 text-white font-semibold text-center">Básico</th>
                                <th className="p-4 text-purple-400 font-semibold text-center">Premium</th>
                                <th className="p-4 text-sky-400 font-semibold text-center">Premium + VIP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonFeatures.map(feature => (
                                <tr key={feature.name} className="border-b border-slate-800 last:border-0">
                                    <td className="p-4 text-gray-300">{feature.name}</td>
                                    <td className="p-4 text-gray-400 text-center">{typeof feature.basic === 'boolean' ? (feature.basic ? <CheckCircleIcon className="w-6 h-6 text-green-400 mx-auto" /> : '—') : feature.basic}</td>
                                    <td className="p-4 text-gray-400 text-center">{typeof feature.premium === 'boolean' ? (feature.premium ? <CheckCircleIcon className="w-6 h-6 text-green-400 mx-auto" /> : '—') : feature.premium}</td>
                                    <td className="p-4 text-gray-400 text-center">{typeof feature.vip === 'boolean' ? (feature.vip ? <CheckCircleIcon className="w-6 h-6 text-green-400 mx-auto" /> : '—') : feature.vip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-slate-950">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-display">Perguntas Frequentes</h2>
                </div>
                <div className="space-y-4">
                    {/* FAQ Item 1 */}
                    <details className="glass-card p-6 rounded-lg group">
                        <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                            Como a IA personaliza meu plano?
                            <span className="transform group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="text-gray-400 mt-4">Nossa IA analisa suas respostas no quiz inicial, seus objetivos e seu progresso diário para adaptar continuamente seu plano de ação, recomendando conteúdos e metas que são mais relevantes para você naquele momento.</p>
                    </details>
                    {/* FAQ Item 2 */}
                    <details className="glass-card p-6 rounded-lg group">
                        <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                            Posso cancelar minha assinatura a qualquer momento?
                            <span className="transform group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="text-gray-400 mt-4">Sim, você pode cancelar a assinatura de qualquer plano pago a qualquer momento através do painel da sua conta. Você continuará com acesso aos recursos do plano até o final do período de faturamento.</p>
                    </details>
                </div>
            </div>
        </section>
        
        <Footer />
    </main>
  );
};

export default LandingPage;
