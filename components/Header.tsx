import React, { useState, useEffect } from 'react';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onGoToDashboard: () => void;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onOpenLogin, onOpenSignup, onGoToDashboard, onGoHome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'A Solução', href: '#solution' },
    { name: 'Como Funciona', href: '#how-it-works' },
    { name: 'Planos', href: '#pricing' },
  ];

  const handleNavClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    action();
    setIsOpen(false);
  };
  
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onGoHome();
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled || isOpen ? 'bg-slate-950/70 backdrop-blur-lg border-b border-slate-800' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <a href="#" onClick={handleLogoClick} className="text-2xl font-bold text-white font-display">
            Kyros<span className="animated-gradient-text">AI</span>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
               <>
                <button onClick={onGoToDashboard} className="text-gray-300 hover:text-white transition-colors">Dashboard</button>
                <button onClick={onLogout} className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition-colors">
                  Sair
                </button>
               </>
            ) : (
              <>
                <button onClick={onOpenLogin} className="text-gray-300 hover:text-white transition-colors">Entrar</button>
                <button onClick={onOpenSignup} className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition-colors">
                  Começar grátis
                </button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg pb-4">
          <nav className="flex flex-col items-center space-y-4 pt-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors text-lg">
                {link.name}
              </a>
            ))}
            <div className="border-t border-slate-700 w-1/2 my-2"></div>
            {user ? (
               <>
                <button onClick={(e) => handleNavClick(e, onGoToDashboard)} className="text-gray-300 hover:text-white transition-colors text-lg">Dashboard</button>
                <button onClick={(e) => handleNavClick(e, onLogout)} className="text-gray-300 hover:text-white transition-colors text-lg">Sair</button>
               </>
            ) : (
              <>
                <button onClick={(e) => handleNavClick(e, onOpenLogin)} className="text-gray-300 hover:text-white transition-colors text-lg">Entrar</button>
                <button onClick={(e) => handleNavClick(e, onOpenSignup)} className="bg-purple-600 w-1/2 text-center text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition-colors">
                  Começar grátis
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;