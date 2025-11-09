import React, { useState } from 'react';
import Footer from './Footer';
import { 
  CheckCircleIcon,
  ChevronDownIcon
} from './icons';
import type { Feature, Plan, Testimonial, FAQItem } from '../types';

interface LandingPageProps {
  setModal: (modal: { type: 'signup' | 'login' | 'payment' | 'featureInfo'; data?: Feature }) => void;
}

const landingPageContent = {
  "hero": {
    "titulo": "Sua jornada de transformação começa agora",
    "subtitulo": "Sou a KyrosAI, sua guia pessoal para uma vida com mais propósito. Responda ao quiz inicial e receba um plano personalizado com metas, conteúdo diário e gráficos de progresso.",
    "cta": "Comece seus 7 dias grátis"
  },
  "beneficios": [
    {"titulo": "Quiz de Personalização", "descricao": "Comece com um quiz inteligente que cria um plano de desenvolvimento sob medida para você."},
    {"titulo": "Metas Diárias Guiadas", "descricao": "Receba 10 metas diárias para construir hábitos poderosos e manter a consistência."},
    {"titulo": "Gráficos de Progresso", "descricao": "Visualize sua evolução em saúde, leitura e produtividade com gráficos claros e motivadores."},
    {"titulo": "Biblioteca Pessoal", "descricao": "Armazene e revise todos os textos, livros e reflexões da sua jornada em um só lugar."},
    {"titulo": "Comunidade Interativa", "descricao": "Compartilhe insights, comente nas reflexões diárias e cresça junto com outros membros."}
  ],
  "planos": [
    {
      "nome": "Start", "preco": "R$9,90/mês",
      "detalhes": ["Quiz de personalização", "10 metas diárias", "Gráficos de progresso básicos", "Biblioteca Pessoal"],
      "cta": "Assinar Start"
    },
    {
      "nome": "Growth", "preco": "R$29,90/mês",
      "detalhes": ["Tudo do Start", "Metas e gráficos avançados", "Acesso à Comunidade", "Recomendações de conteúdo IA"],
      "cta": "Assinar Growth"
    },
    {
      "nome": "Master", "preco": "R$47,90/mês", "oldPrice": "R$59,90",
      "detalhes": ["Tudo do Growth", "Sessões de mentoria em grupo", "Análise preditiva da IA", "Suporte prioritário"],
      "cta": "Assinar Master"
    }
  ],
  "prova_social": [
    {"nome": "Ana Silva", "profissao": "Empreendedora", "depoimento": "O quiz inicial foi um divisor de águas. Finalmente entendi minhas prioridades e as metas diárias tornaram o progresso fácil e consistente."},
    {"nome": "Carlos Oliveira", "profissao": "Profissional de TI", "depoimento": "Ver meu progresso nos gráficos de leitura e meditação é incrivelmente motivador. A comunidade também é um ótimo espaço de troca."},
    {"nome": "Mariana Costa", "profissao": "Estudante", "depoimento": "A biblioteca pessoal é genial. Guardo todas as reflexões e textos importantes para reler quando preciso de um impulso."}
  ],
  "faq": [
    {"pergunta": "Como o quiz inicial funciona?", "resposta": "É um questionário rápido sobre suas metas e desafios em áreas-chave da vida. Suas respostas nos ajudam a criar um plano de metas, conteúdos e desafios totalmente personalizado para você."},
    {"pergunta": "As 10 metas diárias são fixas?", "resposta": "Elas são sugeridas pela IA com base no seu perfil, mas você terá flexibilidade para ajustá-las. O objetivo é criar consistência e um sentimento de conquista diária."},
    {"pergunta": "Como os gráficos de progresso são gerados?", "resposta": "Eles são atualizados automaticamente conforme você completa suas metas diárias, leituras e meditações, oferecendo um feedback visual imediato da sua evolução."},
    {"pergunta": "O que posso fazer na comunidade?", "resposta": "Você pode comentar nas postagens diárias, compartilhar suas reflexões, interagir com outros membros e, nos planos mais avançados, participar de discussões e mentorias."},
    {"pergunta": "Meus dados do quiz e progresso são privados?", "resposta": "Sim, sua privacidade é nossa prioridade. Todos os dados são criptografados, usados apenas para personalizar sua experiência e jamais compartilhados."}
  ],
  "lead_magnet": {
    "titulo": "Receba gratuitamente nosso checklist de hábitos transformadores",
    "descricao": "Cadastre-se com seu e-mail e obtenha um guia prático com 5 hábitos que mudam sua produtividade e equilíbrio.",
    "cta": "Quero meu checklist grátis"
  },
  "cta_final": {
    "titulo": "Sua transformação é inevitável",
    "descricao": "Não espere mais para evoluir. Com as ferramentas certas e o guia certo, seu potencial é ilimitado. Comece hoje.",
    "botao": "Iniciar Minha Jornada"
  }
};


const LandingPage: React.FC<LandingPageProps> = ({ setModal }) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const testimonials: Testimonial[] = landingPageContent.prova_social.map(t => ({
      quote: t.depoimento, name: t.nome, role: t.profissao,
    }));

    const plans: Plan[] = landingPageContent.planos.map(p => ({
        name: p.nome,
        tier: p.nome as 'Start' | 'Growth' | 'Master',
        price: p.preco.split('/')[0],
        oldPrice: (p as { oldPrice?: string }).oldPrice,
        period: '/' + p.preco.split('/')[1],
        description: '', // No longer in the new content spec
        features: p.detalhes,
        cta: p.cta,
        primary: p.nome === 'Growth',
    }));

    const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const handleFaqToggle = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

  return (
    <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden pt-20 animated-gradient-bg">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 font-display animate-slide-in-up">
              {landingPageContent.hero.titulo}
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              {landingPageContent.hero.subtitulo}
            </p>
            <div className="flex justify-center animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              <button onClick={() => setModal({type: 'signup'})} className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105">
                {landingPageContent.hero.cta}
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-[var(--color-bg)]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 font-display">Um ecossistema completo para sua evolução</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              {landingPageContent.beneficios.map((benefit, i) => (
                <div key={i} className="glass-card p-6 rounded-xl hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 text-left">
                  <CheckCircleIcon className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white font-display">{benefit.titulo}</h3>
                  <p className="text-gray-400">{benefit.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 overflow-x-hidden bg-slate-800/40">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 font-display">Histórias de transformação real</h2>
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
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Escolha o plano certo para sua jornada</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
              Invista em você. Comece com 7 dias grátis em qualquer plano e sinta a transformação.
            </p>
            <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
              {plans.map((plan, index) => (
                <div key={index} className={`glass-card rounded-xl p-8 border ${plan.primary ? 'border-purple-500 scale-105' : 'border-slate-700'} transition-transform transform`}>
                  {plan.primary && <div className="text-sm font-bold text-purple-400 mb-2 tracking-widest">Mais Popular</div>}
                  <h3 className="text-2xl font-bold mb-4 font-display">{plan.name}</h3>
                  <div className="mb-6 flex items-baseline justify-center">
                    {plan.oldPrice && (
                        <span className="text-2xl font-bold text-gray-500 line-through mr-2">{plan.oldPrice}</span>
                    )}
                    <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
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
        
        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-slate-800/40">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-display">Perguntas Frequentes</h2>
                <div className="space-y-4">
                    {landingPageContent.faq.map((item, index) => (
                        <div key={index} className="glass-card rounded-lg overflow-hidden border border-slate-800">
                            <button onClick={() => handleFaqToggle(index)} className="w-full flex justify-between items-center text-left p-6">
                                <span className="font-semibold text-lg text-white">{item.pergunta}</span>
                                <ChevronDownIcon className={`w-6 h-6 text-purple-400 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 pt-0 text-gray-400">
                                    {item.resposta}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Lead Magnet Section */}
        <section className="py-20">
            <div className="container mx-auto px-6">
                <div className="glass-card rounded-xl p-8 md:p-12 max-w-4xl mx-auto text-center border border-purple-500/50">
                    <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">{landingPageContent.lead_magnet.titulo}</h2>
                    <p className="text-gray-400 mb-6">{landingPageContent.lead_magnet.descricao}</p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Seu melhor e-mail" className="flex-grow bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                        <button type="submit" className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-purple-700 transition-colors">
                            {landingPageContent.lead_magnet.cta}
                        </button>
                    </form>
                </div>
            </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-display">
              <span className="animated-gradient-text">{landingPageContent.cta_final.titulo}</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              {landingPageContent.cta_final.descricao}
            </p>
            <button onClick={() => setModal({type: 'signup'})} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-lg text-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105">
              {landingPageContent.cta_final.botao}
            </button>
          </div>
        </section>
        <Footer />
    </main>
  );
};

export default LandingPage;