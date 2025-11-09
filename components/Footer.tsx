import React from 'react';
import { TwitterIcon, LinkedInIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Placeholder action
  };

  return (
    <footer className="border-t border-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-white mb-2 font-display">Kyros<span className="animated-gradient-text">AI</span></h3>
            <p className="text-gray-400">Projetando vidas com propósito e tecnologia.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-3">Produto</h4>
              <ul className="space-y-2">
                <li><a href="#" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors">Depoimentos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-semibold text-white mb-3">Siga-nos</h4>
            <div className="flex space-x-4">
              <a href="#" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors"><TwitterIcon /></a>
              <a href="#" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors"><LinkedInIcon /></a>
              <a href="#" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors"><InstagramIcon /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} KyrosAI — Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;