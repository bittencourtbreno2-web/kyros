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
    area: 'Carreira' | 'Saúde' | 'Relacionamentos' | 'Finanças';
    completed: boolean;
}