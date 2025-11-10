import React from 'react';

export type SubscriptionPlan = 'Free' | 'Essencial' | 'Avançado' | 'Premium';
export type SubscriptionStatus = 'Active' | 'Cancelled' | 'Expired' | 'Inactive';

export interface User {
  name: string;
  email: string;
  ep: number;
  level: string;
  badges: string[];
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
}

export interface RegisteredUser {
  id: string; // Unique user ID
  name: string;
  email: string;
  password?: string; // In a real app, this would be a hash. Optional for social logins.
  photoUrl?: string;
  createdAt: string;
  lastLogin: string;
  
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;

  lifeAreas?: LifeArea[];
  ep?: number;
  level?: string;
  badges?: string[];
  dailyGoals?: DailyGoal[];
  libraryItems?: LibraryItem[];
  referrals?: number;
}

export interface LifeArea {
  name: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  area: string;
  options: string[];
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Book {
    title: string;
    author: string;
    description: string;
    coverUrl: string;
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
  reading: {
    pages: number;
    bookSuggestion: string;
  };
  bookRecommendations: Book[];
  challenge: {
    title: string;
    description: string;
  };
  motivation: string;
  recommendedFor?: string;
}

export interface DailyGoal {
    id: number;
    text: string;
    category: string;
    completed: boolean;
    ep: number;
    type: 'reading' | 'meditation' | 'general';
    value: number;
    reflectionPrompt: string;
}

export interface LibraryItem {
    id: number;
    type: string;
    title: string;
    date: string;
    status: string;
    content?: string;
    notes?: string;
}

export interface CommunityPost {
    id: number;
    author: string;
    avatar: string;
    timestamp: string;
    content: string;
    replies: CommunityPost[];
}

export interface ProgressData {
    pagesRead: { current: number; goal: number };
    meditations: { current: number; goal: number };
    goalsCompleted: { current: number; goal: number };
}

export interface Reward {
    id: number;
    title: string;
    description: string;
    cost: number;
    icon: React.ReactNode;
}

export interface LeaderboardUser {
    rank: number;
    name: string;
    ep: number;
    isCurrentUser: boolean;
}