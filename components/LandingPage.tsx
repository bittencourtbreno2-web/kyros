import React, { useState } from 'react';
import Footer from './Footer';
import { 
  BrainCircuitIcon, 
  TargetIcon, 
  ActionPlanIcon, 
  AITrackingIcon, 
  FeedbackIcon, 
  TrophyIcon, 
  CheckCircleIcon
} from './icons';
import type { Feature, Plan, Testimonial } from '../types';

interface LandingPageProps {
  setModal: (modal: { type: 'signup' | 'login' | 'payment' | 'featureInfo'; data?: Feature }) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setModal }) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const features: Feature[] = [
        { icon: <BrainCircuitIcon />, title: 'Diagnóstico de Clareza', description: 'Descubra seus alicerces e seu potencial com um diagnóstico que vai além do superficial.' },
        { icon: <TargetIcon />, title: 'Metas com Propósito', description: 'Defina metas SMART que ressoam com sua verdadeira essência e visão de vida.' },
        { icon: <ActionPlanIcon />, title: 'Planos de Ação Inteligentes', description: 'Receba um roteiro claro que conecta seus sonhos com ações diárias e realistas.' },
        { icon: <AITrackingIcon />, title: 'Acompanhamento Preditivo', description: 'Nossa IA analisa seu progresso, prevê obstáculos e sugere os melhores caminhos.' },
        { icon: <FeedbackIcon />, title: 'Insights para Evolução', description: 'Receba insights que transformam dados em sabedoria para sua jornada.' },
        { icon: <TrophyIcon />, title: 'Gamificação Motivadora', description: 'Mantenha-se engajado com um sistema de recompensas que celebra cada passo do seu progresso.' },
    ];
    
    const plans: Plan[] = [
        { 
            name: 'Start', 
            tier: 'Start', 
            price: 'R$9,90', 
            period: '/mês', 
            description: 'Para quem quer começar sua jornada de autodesenvolvimento.', 
            features: [
                'Criação de plano de vida básico com IA', 
                'Sugestões automáticas de hábitos e rotinas', 
                'Check-ins semanais e insights de progresso', 
                'Comunidade aberta para trocar experiências'
            ], 
            cta: 'Começar agora', 
            primary: false 
        },
        { 
            name: 'Growth', 
            tier: 'Growth', 
            price: 'R$27,90', 
            period: '/mês', 
            description: 'Para quem quer crescer com acompanhamento constante.', 
            features: [
                'Tudo do plano Start', 
                'Acompanhamento inteligente diário (check-ins da IA)', 
                'Relatórios de progresso mensais', 
                'Planejador de metas interativo', 
                'Acesso a workshops e materiais exclusivos'
            ], 
            cta: 'Começar agora', 
            primary: true 
        },
        { 
            name: 'Master', 
            tier: 'Master', 
            price: 'R$47,90',
            oldPrice: 'R$59,90', 
            period: '/mês', 
            description: 'Para quem busca transformação completa e quer atingir propósito e performance.', 
            features: [
                'Tudo do plano Growth', 
                'Planos de vida avançados (propósito, carreira, saúde)', 
                'Sessões coletivas com mentores e IA avançada', 
                'Suporte prioritário e acesso antecipado a novos recursos'
            ], 
            cta: 'Começar agora', 
            primary: false 
        },
    ];

    const testimonials: Testimonial[] = [
        { quote: 'Nunca tive tanta clareza sobre meus objetivos. O KyrosAI transformou a forma como eu vejo meu futuro.', name: 'Juliana S.', role: 'Gerente de Marketing' },
        { quote: 'É como ter um mentor pessoal 24h por dia. A IA me ajuda a manter o foco e a não desistir, mesmo nos dias difíceis.', name: 'Lucas M.', role: 'Desenvolvedor Sênior' },
        { quote: 'Finalmente encontrei o equilíbrio entre minha carreira e vida pessoal. Uma ferramenta indispensável.', name: 'Carla F.', role: 'Empreendedora' },
    ];

    const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden pt-20 animated-gradient-bg">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 font-display animate-slide-in-up">
              Projete a vida que você sempre quis —{' '}
              <span className="animated-gradient-text">
                com a minha ajuda.
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              Sou sua arquiteta pessoal para clareza, propósito e progresso real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              <button onClick={() => setModal({type: 'signup'})} className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105">
                Começar agora
              </button>
              <a href="#how-it-works" className="bg-slate-300/10 text-white font-bold py-3 px-8 rounded-full backdrop-blur-sm border border-slate-300/20 hover:bg-slate-300/20 transition-transform transform hover:scale-105">
                Ver como funciona
              </a>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-20 bg-[var(--color-bg)]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Você sente que está sempre ocupado, mas sem direção?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
              A vida moderna nos joga em um turbilhão de tarefas. É fácil perder o rumo e a conexão com o que realmente importa.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {['Sem Direção e Equilíbrio', 'Com Metas que não Duram', 'Perdido em Informações'].map((problem, i) => (
                <div key={i} className="glass-card p-8 rounded-xl hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2">
                  <h3 className="text-2xl font-semibold mb-3 text-purple-400 font-display">{problem}</h3>
                  <p className="text-gray-400">
                    {i === 0 && 'Sentindo que está correndo em círculos, tentando equilibrar carreira, saúde e vida pessoal sem um mapa claro.'}
                    {i === 1 && 'Definindo resoluções que perdem a força, por serem vagas e desconectadas do seu real propósito.'}
                    {i === 2 && 'Consumindo inúmeros livros e vídeos, mas com dificuldade de aplicar o conhecimento de forma prática.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section id="solution" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">A tecnologia pode te guiar — mas o caminho é seu.</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
             Eu sou a KyrosAI, sua guia pessoal para uma vida com mais propósito. Minha missão é transformar a complexidade da vida moderna em um plano claro e alcançável para você. Usando inteligência artificial, eu te ajudo a definir metas, criar hábitos e evoluir de forma equilibrada, fornecendo o acompanhamento e os insights que você precisa para transformar intenção em realidade.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} onClick={() => setModal({type: 'featureInfo', data: feature})} className="glass-card p-6 rounded-lg text-left flex flex-col items-start space-y-4 cursor-pointer hover:bg-white/10 transition-colors duration-300">
                  <div className="text-purple-400">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-display">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Sua jornada começa com clareza</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-700"></div>
                {[
                  { num: '1', title: 'Descubra quem você é', desc: 'Responda a perguntas inteligentes para mapear sua situação atual e suas aspirações.' },
                  { num: '2', title: 'Crie sua visão de vida', desc: 'Eu te ajudo a construir uma visão clara e inspiradora para o seu futuro.' },
                  { num: '3', title: 'Receba seu plano de ação', desc: 'Um roteiro detalhado e personalizado para seus objetivos de curto, médio e longo prazo.' },
                  { num: '4', title: 'Evolua comigo', desc: 'Monitore seu progresso com insights e ajustes automáticos para manter você no caminho certo.' },
                ].map((step, index) => (
                  <div key={index} className="text-center relative">
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold text-white border-4 border-slate-900 z-10">{step.num}</div>
                    <div className="glass-card p-6 pt-12 rounded-lg h-full">
                      <h3 className="text-xl font-semibold mb-2 font-display">{step.title}</h3>
                      <p className="text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-slate-800/40">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Equilibre ambição e serenidade, com clareza.</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start"><CheckCircleIcon /> <span className="ml-3"><strong>Clareza total sobre o que importa.</strong> Filtre o ruído e foque sua energia.</span></li>
                <li className="flex items-start"><CheckCircleIcon /> <span className="ml-3"><strong>Mais equilíbrio e propósito.</strong> Integre carreira e bem-estar de forma harmoniosa.</span></li>
                <li className="flex items-start"><CheckCircleIcon /> <span className="ml-3"><strong>Acompanhamento que evolui com você.</strong> Seu plano se adapta às suas mudanças.</span></li>
                <li className="flex items-start"><CheckCircleIcon /> <span className="ml-3"><strong>Resultados mensuráveis e sustentáveis.</strong> Troque "ocupado" por "produtivo".</span></li>
              </ul>
            </div>
             <div className="order-1 md:order-2">
              <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop" alt="Pessoa focada em seus objetivos" className="rounded-xl shadow-2xl" />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 overflow-x-hidden">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 font-display">O que nossos usuários dizem</h2>
                <div className="relative max-w-3xl mx-auto">
                    <div className="overflow-hidden">
                        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-4">
                                    <div className="glass-card p-8 rounded-lg">
                                        <p className="text-gray-300 mb-6 italic text-lg">"{testimonial.quote}"</p>
                                        <div className="font-bold text-white">{testimonial.name}</div>
                                        <div className="text-sm text-purple-400">{testimonial.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={prevTestimonial} className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-12 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={nextTestimonial} className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-12 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </section>


        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-slate-800/40">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Escolha o plano certo para você</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
              Comece sua jornada com um plano acessível e evolua no seu ritmo. O investimento é em você.
            </p>
            <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
              {plans.map((plan, index) => (
                <div key={index} className={`glass-card rounded-xl p-8 border ${plan.primary ? 'border-purple-500 scale-105' : 'border-slate-700'} transition-transform transform`}>
                  {plan.primary && <div className="text-sm font-bold text-purple-400 mb-2 tracking-widest">Mais Popular</div>}
                  <h3 className="text-2xl font-bold mb-2 font-display">{plan.name}</h3>
                  <p className="text-gray-400 mb-6 min-h-[4.5rem]">{plan.description}</p>
                  <div className="mb-6 min-h-[5rem] flex flex-col justify-center items-center">
                    {plan.oldPrice && (
                        <span className="text-2xl font-bold text-gray-500 line-through">
                            {plan.oldPrice}
                        </span>
                    )}
                    <div>
                        <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                        <span className="text-gray-400">{plan.period}</span>
                    </div>
                  </div>
                  <button onClick={() => plan.tier === 'Start' ? setModal({type: 'signup'}) : setModal({type: 'payment'})} className={`w-full block text-center py-3 px-6 rounded-lg font-bold ${plan.primary ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-slate-700 text-white hover:bg-slate-600'} transition-colors`}>
                    {plan.cta}
                  </button>
                  <ul className="text-left mt-8 space-y-3 text-gray-300">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-display">
              O futuro é construído todos os dias — <span className="animated-gradient-text">comece o seu agora.</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Pare de adiar a vida que você merece. Dê o primeiro passo com meu diagnóstico gratuito e descubra o que posso fazer pelo seu propósito.
            </p>
            <button onClick={() => setModal({type: 'signup'})} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-lg text-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105">
              Comece grátis
            </button>
          </div>
        </section>
        <Footer />
    </main>
  );
};

export default LandingPage;