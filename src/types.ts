/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SyllabusItem {
  week: string;
  topic: string;
  details: string;
}

export type CourseDirection = 'math' | 'english' | 'pochemuchka';

export interface Course {
  id: string;
  title: string;
  description: string;
  direction: CourseDirection;
  directionName: string;
  ageGroup: string; // e.g., "5-7 лет", "8-11 лет"
  minAge: number;
  maxAge: number;
  duration: string; // e.g. "9 месяцев"
  pricePerMonth: number;
  lessonsPerWeek: number;
  rating: number;
  reviewsCount: number;
  features: string[];
  syllabus: SyllabusItem[];
  image: string;
  format: 'offline' | 'online' | 'hybrid';
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Review {
  id: string;
  authorName: string;
  authorRole: string; // e.g., "Мама Михаила, 6 лет"
  rating: number;
  text: string;
  courseDirection: CourseDirection;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactLead {
  id: string;
  parentName: string;
  phone: string;
  childName: string;
  childAge: number;
  direction: CourseDirection | 'all';
  format: 'offline' | 'online';
  status: 'new' | 'completed';
  createdAt: string;
}

export interface AppState {
  favorites: string[]; // Course IDs
  compareList: string[]; // Course IDs (for comparison drawer)
  activeTab: 'landing' | 'prd'; // Toggle between actual preview and PRD document
  filters: {
    direction: CourseDirection | 'all';
    ageGroup: string | 'all';
    format: 'all' | 'offline' | 'online' | 'hybrid';
  };
  leads: ContactLead[]; // Saved lead requests
  bookingModal: {
    isOpen: boolean;
    preselectedDirection: CourseDirection | 'all';
  };
  customCalculator: {
    lessonsPerMonth: number;
    lessonsCount: number;
    offlineLessonsPercent: number;
    discountPercent: number;
    directions: CourseDirection[];
  };
}
