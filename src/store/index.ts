/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, ContactLead, CourseDirection } from '../types';

const getInitialState = (): AppState => {
  // Safe parsing of localStorage
  let savedFavorites: string[] = [];
  let savedLeads: ContactLead[] = [
    {
      id: 'mock-lead-1',
      parentName: 'Мария Иванова',
      phone: '+7 (911) 234-56-78',
      childName: 'Даниил',
      childAge: 6,
      direction: 'pochemuchka',
      format: 'offline',
      status: 'completed',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'mock-lead-2',
      parentName: 'Александр Петров',
      phone: '+7 (905) 987-65-43',
      childName: 'Елизавета',
      childAge: 9,
      direction: 'math',
      format: 'online',
      status: 'new',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    }
  ];

  try {
    const favs = localStorage.getItem('smart_start_favorites');
    if (favs) savedFavorites = JSON.parse(favs);
    
    const leads = localStorage.getItem('smart_start_leads');
    if (leads) savedLeads = JSON.parse(leads);
  } catch (e) {
    console.error('LocalStorage error:', e);
  }

  return {
    favorites: savedFavorites,
    compareList: [],
    activeTab: 'landing',
    filters: {
      direction: 'all',
      ageGroup: 'all',
      format: 'all'
    },
    leads: savedLeads,
    bookingModal: {
      isOpen: false,
      preselectedDirection: 'all'
    },
    customCalculator: {
      lessonsPerMonth: 8,
      lessonsCount: 8,
      offlineLessonsPercent: 100,
      discountPercent: 0,
      directions: ['math']
    }
  };
};

const appSlice = createSlice({
  name: 'app',
  initialState: getInitialState(),
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
      try {
        localStorage.setItem('smart_start_favorites', JSON.stringify(state.favorites));
      } catch (e) {
        console.error(e);
      }
    },
    toggleCompare: (state, action: PayloadAction<string>) => {
      const index = state.compareList.indexOf(action.payload);
      if (index >= 0) {
        state.compareList.splice(index, 1);
      } else {
        // Prevent comparing more than 3 courses just for practical visual size
        if (state.compareList.length < 3) {
          state.compareList.push(action.payload);
        }
      }
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.compareList = state.compareList.filter(id => id !== action.payload);
    },
    clearCompareList: (state) => {
      state.compareList = [];
    },
    setActiveTab: (state, action: PayloadAction<'landing' | 'prd'>) => {
      state.activeTab = action.payload;
    },
    setDirectionFilter: (state, action: PayloadAction<CourseDirection | 'all'>) => {
      state.filters.direction = action.payload;
    },
    setAgeGroupFilter: (state, action: PayloadAction<string | 'all'>) => {
      state.filters.ageGroup = action.payload;
    },
    setFormatFilter: (state, action: PayloadAction<'all' | 'offline' | 'online' | 'hybrid'>) => {
      state.filters.format = action.payload;
    },
    addLead: (state, action: PayloadAction<Omit<ContactLead, 'id' | 'createdAt' | 'status'>>) => {
      const newLead: ContactLead = {
        ...action.payload,
        id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      state.leads.unshift(newLead);
      try {
        localStorage.setItem('smart_start_leads', JSON.stringify(state.leads));
      } catch (e) {
        console.error(e);
      }
    },
    deleteLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter(lead => lead.id !== action.payload);
      try {
        localStorage.setItem('smart_start_leads', JSON.stringify(state.leads));
      } catch (e) {
        console.error(e);
      }
    },
    openBookingModal: (state, action: PayloadAction<CourseDirection | 'all'>) => {
      state.bookingModal.isOpen = true;
      state.bookingModal.preselectedDirection = action.payload;
    },
    closeBookingModal: (state) => {
      state.bookingModal.isOpen = false;
      state.bookingModal.preselectedDirection = 'all';
    },
    updateCalculatorDirections: (state, action: PayloadAction<CourseDirection[]>) => {
      state.customCalculator.directions = action.payload;
      
      // Automatic multi-course discount calculation
      const courseCount = action.payload.length;
      if (courseCount === 2) {
        state.customCalculator.discountPercent = 10;
      } else if (courseCount >= 3) {
        state.customCalculator.discountPercent = 15;
      } else {
        state.customCalculator.discountPercent = 0;
      }
    },
    updateCalculatorLessonsPerMonth: (state, action: PayloadAction<number>) => {
      state.customCalculator.lessonsPerMonth = action.payload;
    }
  }
});

export const {
  toggleFavorite,
  toggleCompare,
  removeFromCompare,
  clearCompareList,
  setActiveTab,
  setDirectionFilter,
  setAgeGroupFilter,
  setFormatFilter,
  addLead,
  deleteLead,
  openBookingModal,
  closeBookingModal,
  updateCalculatorDirections,
  updateCalculatorLessonsPerMonth
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
