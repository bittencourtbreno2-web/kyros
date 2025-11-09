import React from 'react';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Plan {
  name: string;
  tier: 'Start' | 'Growth' | 'Master';
  price: string;
  oldPrice?: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  primary: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface User {
  name: string;
}

export interface LifeArea {
  name: string;
  score: number;
}

export interface Goal {
    id: number;
    title: string;
    description?: string;
    area: 'Carreira' | 'Saúde' | 'Relacionamentos' | 'Finanças' | 'Pessoal';
    completed: boolean;
}

export interface Habit {
  id: number;
  title: string;
  completed: boolean;
  streak: number;
}

export interface ContentItem {
  id: number;
  type: 'Meditação' | 'Artigo' | 'Desafio';
  title: string;
  duration?: string; // e.g., "10 min"
  author?: string;
  thumbnail: string;
}


export interface FAQItem {
  pergunta: string;
  resposta: string;
}

// Types for Daily Content Ecosystem
export interface Book {
  title: string;
  author: string;
  description: string;
  coverUrl: string; // Placeholder for image URL
}

export interface Challenge {
  title: string;
  description: string;
}

export interface DailyContent {
  date: string;
  theme: string;
  text: {
    title: string;
    content: string;
  };
  reflection: {
    prompt: string;
  };
  video: {
    title: string;
    url: string; // YouTube embed URL
  };
  reading: {
    pages: number;
    bookSuggestion: string;
  };
  bookRecommendations: Book[];
  challenge: Challenge;
}

// New Types for Quiz, Goals, Library, Community, Progress
export interface QuizQuestion {
  id: string;
  text: string;
  area: LifeArea['name'];
  options: string[];
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
}

export interface DailyGoal {
  id: number;
  text: string;
  category: 'Corpo' | 'Mente' | 'Carreira' | 'Conexão';
  completed: boolean;
  ep: number; // Evolution Points
}

export interface LibraryItem {
  id: number;
  type: 'Texto' | 'Livro' | 'Reflexão';
  title: string;
  date: string;
  content?: string;
  status?: 'Lido' | 'Em Progresso' | 'Não Lido';
}

export interface CommunityPost {
    id: number;
    author: string;
    avatar: string; // url placeholder
    timestamp: string;
    content: string;
    replies: CommunityPost[];
}

export interface ProgressData {
    pagesRead: { current: number; goal: number; };
    meditations: { current: number; goal: number; };
    goalsCompleted: { current: number; goal: number; };
}