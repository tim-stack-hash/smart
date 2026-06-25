/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setActiveTab, openBookingModal } from '../store';
import { GraduationCap, Heart, BarChart2, Menu, X, Globe } from 'lucide-react';

export default function Navbar() {
  const dispatch = useDispatch();
  const { activeTab, favorites, compareList } = useSelector((state: RootState) => state.app);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Курсы', href: '#courses' },
    { label: 'Преимущества', href: '#features' },
    { label: 'Калькулятор', href: '#calculator' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleTabChange = (tab: 'landing' | 'prd') => {
    dispatch(setActiveTab(tab));
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-beige bg-brand-beige-light/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <a 
          href="#root" 
          onClick={() => handleTabChange('landing')}
          className="flex items-center gap-3 group"
          id="navbar-logo"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-olive text-white transition-all duration-300 group-hover:bg-brand-olive-dark group-hover:scale-105 shadow-md shadow-brand-olive/10">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-black tracking-tight text-brand-charcoal italic leading-tight">Умный Старт</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C27D60]">Центр развития</span>
          </div>
        </a>

        {/* Desktop Navigation Links (Only shown when on landing page) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-muted transition-colors hover:text-brand-olive"
              id={`nav-link-${item.href.replace('#', '')}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side controls: Mode Toggle & Badges */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Dual Toggle Tab switcher (PRD / Live site) */}
          <div className="flex items-center gap-1 rounded-full bg-brand-slate-bg p-1 border border-brand-beige">
            <button
              onClick={() => handleTabChange('landing')}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'landing'
                  ? 'bg-brand-olive text-white shadow-sm'
                  : 'text-brand-muted hover:text-brand-charcoal'
              }`}
              id="toggle-mode-landing"
            >
              <Globe className="h-3.5 w-3.5 text-[#fff]" />
              Главное Меню
            </button>

          </div>

          {/* Favorites Counter Badges */}
          {favorites.length > 0 && (
            <button 
              onClick={() => handleTabChange('landing')}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-brand-beige bg-brand-peach-light text-brand-terracotta hover:bg-brand-peach-light/80 hover:text-brand-terracotta-dark transition-all"
              title="Избранные курсы"
              id="favorites-navbar-btn"
            >
              <Heart className={`h-5 w-5 ${favorites.length > 0 ? 'fill-brand-terracotta text-brand-terracotta animate-pulse' : ''}`} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-terracotta text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            </button>
          )}

          {/* Comparison Drawer Badges */}
          {compareList.length > 0 && (
            <button
              onClick={() => handleTabChange('landing')}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-brand-beige bg-brand-sage-light text-brand-olive hover:bg-[#e6e2d3] transition-all"
              title="Сравнение курсов"
              id="compare-navbar-btn"
            >
              <BarChart2 className="h-5 w-5 text-brand-olive" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-olive text-[10px] font-bold text-white">
                {compareList.length}
              </span>
            </button>
          )}

          <button
            onClick={() => dispatch(openBookingModal('all'))}
            className="rounded-full bg-brand-olive px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-olive-dark transition-colors border border-transparent shadow-md shadow-[#5a5a4033] cursor-pointer"
            id="book-free-lesson-header-btn"
          >
            Бесплатный урок
          </button>
        </div>

        {/* Medium and small screens right side controls (only toggles & menus) */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick mode switches */}


          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-brand-muted hover:bg-brand-sage-light hover:text-brand-charcoal transition-colors"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Collapse Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-beige bg-brand-beige-light px-4 py-6 shadow-inner animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            
            {/* Tab Swappers in Mobile */}
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-brand-slate-bg p-1.5 border border-brand-beige">
              <button
                onClick={() => handleTabChange('landing')}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
                  activeTab === 'landing'
                    ? 'bg-brand-olive text-white shadow-sm'
                    : 'text-brand-muted'
                }`}
                id="mobile-tab-landing"
              >
                <Globe className="h-4 w-4" />
                Демо-Сайт
              </button>

            </div>

            {/* Mobile Nav Links */}
            {activeTab === 'landing' && (
              <div className="flex flex-col gap-1 py-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted px-3 pb-2">Навигация по сайту</span>
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-semibold text-[#3d3d3d] hover:bg-brand-sage-light hover:text-brand-olive transition-all"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}

            {/* Micro badges display on mobile navigation if there are elements */}
            <div className="flex flex-wrap gap-2.5 py-1">
              {favorites.length > 0 && (
                <div className="flex items-center gap-2 rounded-full bg-brand-peach-light px-3.5 py-1.5 text-xs font-bold text-brand-terracotta">
                  <Heart className="h-4 w-4 fill-brand-terracotta text-brand-terracotta" />
                  Избранное: {favorites.length}
                </div>
              )}
              {compareList.length > 0 && (
                <div className="flex items-center gap-2 rounded-full bg-brand-sage-light px-3.5 py-1.5 text-xs font-bold text-brand-olive">
                  <BarChart2 className="h-4 w-4" />
                  Сравнение: {compareList.length} / 3
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                dispatch(openBookingModal('all'));
              }}
              className="w-full rounded-full bg-brand-olive py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-[#5a5a401a] hover:bg-brand-olive-dark transition-colors cursor-pointer"
            >
              Записаться на бесплатный урок
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
