/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { openBookingModal } from '../store';
import { Sparkles, ArrowRight, Play, Star, BookOpen, Brain, Globe2, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const dispatch = useDispatch();

  const tags = [
    { label: 'Математика', desc: 'Логика и счет', color: 'bg-brand-sage-light text-brand-olive border-brand-beige hover:bg-[#e6e2d3]' },
    { label: 'Английский', desc: 'Свободный разговор', color: 'bg-brand-peach-light text-brand-terracotta border-brand-beige hover:bg-[#ebd4cb]' },
    { label: 'Почемучка', desc: 'Успешный старт школьника', color: 'bg-brand-slate-bg text-brand-charcoal border-brand-beige hover:bg-brand-sage-light' }
  ];

  return (
    <section className="relative overflow-hidden bg-brand-slate-bg/30 pb-20 pt-12 md:py-24" id="hero-section">
      
      {/* Visual background details */}
      <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-brand-sage-light/40 blur-3xl" />
      <div className="absolute bottom-10 left-10 -z-10 h-96 w-96 rounded-full bg-brand-peach-light/35 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Column: Headline and Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            
            {/* Glowing Accent Badge */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 self-center lg:self-start rounded-full bg-brand-sage-light px-3.5 py-1.5 text-xs font-semibold text-brand-olive border border-brand-beige/80 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-brand-terracotta animate-pulse" />
              <span>Запись на новый учебный сезон 2026 открыта</span>
            </div>

            {/* Premium Main Heading */}
            <h1 className="text-4xl font-serif leading-tight text-brand-charcoal sm:text-5xl md:text-6xl italic leading-[1.15]">
              Развиваем умы, <br />
              <span className="text-brand-terracotta">
                влюбляем в учебу!
              </span>
            </h1>

            {/* Structured description */}
            <p className="mt-6 text-base text-brand-muted sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Лицензированный детский центр развития детей от <strong className="text-brand-charcoal font-semibold underline decoration-brand-terracotta decoration-wavy">5 до 11 лет</strong>. 
              Авторские методики гарантируют устойчивый прогресс, раскрывают лидерские качества детей и делают учебу любимым хобби.
            </p>

            {/* Three Pillar Cards with quick anchors */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
              {tags.map((tag) => (
                <a
                  href="#courses"
                  key={tag.label}
                  className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer ${tag.color}`}
                >
                  <span className="text-xs font-bold tracking-tight">{tag.label}</span>
                  <span className="text-[10px] opacity-80 mt-0.5">{tag.desc}</span>
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => dispatch(openBookingModal('all'))}
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-olive px-8 py-4 text-sm font-bold text-white shadow-md shadow-brand-olive/20 transition-all hover:bg-brand-olive-dark hover:shadow-lg cursor-pointer"
                id="hero-primary-cta"
              >
                <span>Записаться бесплатно</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#courses"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-brand-beige bg-white px-8 py-4 text-sm font-bold text-brand-charcoal transition-all hover:bg-brand-sage-light hover:text-brand-olive"
                id="hero-secondary-cta"
              >
                <BookOpen className="h-4 w-4 text-brand-olive" />
                <span>Выбрать программу</span>
              </a>
            </div>

            {/* Mini Trust Badges */}
            <div className="mt-10 pt-8 border-t border-brand-beige grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl font-serif italic font-extrabold text-brand-charcoal md:text-3xl">900+</div>
                <div className="text-xs text-brand-muted mt-1">Довольных детей и родителей</div>
              </div>
              <div>
                <div className="text-2xl font-serif italic font-extrabold text-brand-charcoal md:text-3xl">15+</div>
                <div className="text-xs text-brand-muted mt-1">Инновационных методик</div>
              </div>
              <div>
                <div className="text-2xl font-serif italic font-extrabold text-brand-charcoal md:text-3xl">4.96</div>
                <div className="text-xs text-brand-muted mt-1 flex items-center gap-1">
                  Рейтинг центра 
                  <Star className="h-3.5 w-3.5 fill-brand-terracotta text-brand-terracotta" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Block */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            
            {/* Visual stage cards block representing modern educational design */}
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-brand-beige -rotate-3 scale-105" />

              {/* Main Decorative Showcase Illustration Box */}
              <div className="relative rounded-3xl bg-white p-6 shadow-xl shadow-brand-olive/5 border border-brand-beige">
                
                {/* Simulated child-learner visual banner */}
                <div className="relative h-64 overflow-hidden rounded-2xl bg-brand-sage-light/30">
                  <img 
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600" 
                    alt="Ученики Центра"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 via-transparent to-transparent" />
                  
                  {/* Absolute Badge */}
                  <div className="absolute bottom-4 left-4 rounded-xl bg-brand-olive/90 backdrop-blur-sm p-3.5 text-white">
                    <span className="block text-[9px] font-semibold uppercase tracking-wider text-brand-sage-light">Идет отбор учеников</span>
                    <span className="text-xs font-bold leading-none">Группы осень 2026</span>
                  </div>
                </div>

                {/* Micro interactivity panels styled as floating elements */}
                <div className="mt-6 space-y-4">
                  
                  {/* Element 1: Math teaser and logic flow */}
                  <div className="flex items-center gap-3.5 rounded-xl bg-brand-sage-light/40 hover:bg-brand-sage-light/80 border border-brand-beige/50 p-3 transition-all cursor-pointer">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-olive text-white shadow-sm">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider leading-none">Логическое мышление</h4>
                      <p className="text-[11px] text-brand-muted mt-1 truncate">Ментальная арифметика тренирует память за 4 недели.</p>
                    </div>
                    <Star className="h-4 w-4 fill-brand-terracotta text-brand-terracotta" />
                  </div>

                  {/* Element 2: English pronunciation cards */}
                  <div className="flex items-center gap-3.5 rounded-xl bg-brand-peach-light/40 hover:bg-brand-peach-light/80 border border-brand-beige/50 p-3 transition-all cursor-pointer">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-terracotta text-white shadow-sm">
                      <Globe2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider leading-none">Игровой английский</h4>
                      <p className="text-[11px] text-brand-muted mt-1 truncate">TPR-методология вовлечет ребенка с первого слова.</p>
                    </div>
                    <Star className="h-4 w-4 fill-brand-terracotta text-brand-terracotta" />
                  </div>

                </div>
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -top-6 -right-6 animate-float flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-lg border border-brand-beige" style={{ animationDelay: '0.5s' }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-terracotta text-white">
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-brand-charcoal">Почемучка</span>
                  <span className="text-[10px] text-brand-muted font-semibold">100% готовность к школе</span>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -bottom-6 -left-6 animate-float flex items-center gap-2.5 rounded-2xl bg-brand-olive text-white p-3 shadow-xl" style={{ animationDelay: '2s' }}>
                <ShieldCheck className="h-5 w-5 text-brand-sage-light" />
                <span className="text-[11px] font-bold tracking-normal">Гос. аккредитация & Лицензия</span>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
