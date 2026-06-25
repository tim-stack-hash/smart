/**
//  * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Courses from './components/Courses';
import Calculator from './components/Calculator';
import Reviews from './components/Reviews';
import Faq from './components/Faq';
import Footer from './components/Footer';
import CompareDrawer from './components/CompareDrawer';
import RegistrationModal from './components/RegistrationModal';
import PrdPanel from './components/PrdPanel';

function MainAppContent() {
  const activeTab = useSelector((state: RootState) => state.app.activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Dynamic Navigation Header */}
      <Navbar />
      
      {/* Route Switcher depending on User Selection */}
      {activeTab === 'landing' ? (
        <main className="flex-1">
          <Hero />
          <Features />
          <Courses />
          <Calculator />
          <Reviews />
          <Faq />
        </main>
      ) : (
        <main className="flex-1">
          <PrdPanel />
        </main>
      )}

      {/* Persistent Floor Components */}
      <Footer />
      <CompareDrawer />
      <RegistrationModal />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainAppContent />
    </Provider>
  );
}
