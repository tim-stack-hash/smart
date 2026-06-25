/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Users, Award, Smile, TrendingUp, HelpCircle } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-brand-olive" />,
      title: 'Государственная лицензия',
      description: 'Официальные программы и аттестация. Вы можете оплатить обучение материнским капиталом и получить налоговый вычет 13%.',
      bg: 'bg-brand-sage-light/80'
    },
    {
      icon: <Users className="h-6 w-6 text-brand-olive" />,
      title: 'Малые группы (4-8 детей)',
      description: 'Индивидуальное внимание каждому ребенку. Педагог видит прогресс, вовремя помогает исправить ошибки и держит интерес.',
      bg: 'bg-brand-sage-light/80'
    },
    {
      icon: <Award className="h-6 w-6 text-brand-terracotta" />,
      title: 'Дипломированные кураторы',
      description: 'Все учителя имеют высщее педагогическое или психологическое образование с опытом работы практического преподавания более 3 лет.',
      bg: 'bg-brand-peach-light/80'
    },
    {
      icon: <Smile className="h-6 w-6 text-brand-terracotta" />,
      title: 'Мягкая адаптация в игре',
      description: 'Никакой токсичной зубрежки. Новые темы раскрываются через сюжетные интерактивные квесты и яркий физический реквизит.',
      bg: 'bg-brand-peach-light/80'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-brand-olive" />,
      title: 'Еженедельный отчет родителям',
      description: 'Отправляем видеоматериалы уроков и персональный фидбек-лист от преподавателя по успеваемости вашего ребенка.',
      bg: 'bg-brand-sage-light/80'
    },
    {
      icon: <HelpCircle className="h-6 w-6 text-brand-olive" />,
      title: 'Психологический комфорт',
      description: 'Учим ошибаться без страха. Формируем здоровую самооценку у ребенка, развиваем лидерство и навыки командной работы.',
      bg: 'bg-brand-sage-light/80'
    }
  ];

  return (
    <section className="bg-brand-beige-light py-16 md:py-24" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-olive">Наш Подход</span>
          <h2 className="mt-3 text-3xl font-serif italic text-brand-charcoal sm:text-4xl leading-tight">
            Почему родители выбирают «Умный Старт»
          </h2>
          <p className="mt-4 text-base text-brand-muted">
            Мы объединили классические методики обучения с передовыми психологическими игровыми практиками, создав идеальную среду для всестороннего развития детей.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, index) => (
            <div
              key={feat.title}
              className={`group relative rounded-[32px] p-8 transition-all border border-brand-beige hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-olive/5 bg-white`}
              id={`feature-card-${index}`}
            >
              {/* Colored background icon frame */}
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl p-2.5 ${feat.bg} mb-5 group-hover:scale-110 transition-transform`}>
                {feat.icon}
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-serif italic text-brand-charcoal mb-2 leading-tight">
                {feat.title}
              </h3>
              <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Fun banner citation */}
        <div className="mt-16 rounded-[32px] bg-gradient-to-br from-brand-olive to-[#3c3c2a] border border-brand-beige p-8 text-white relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-white/5 blur-xl" />
          <div className="absolute -top-12 -left-12 h-44 w-44 rounded-full bg-black/10 blur-xl" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-serif italic">Остались сомнения, подойдет ли курс вашему ребенку?</h4>
              <p className="text-sm text-brand-sage-light/80 mt-2 max-w-2xl">
                Запишитесь на первичный диагностический аудит. Наш педагог-психолог выявит сильные стороны малыша и подберет индивидуальный план занятий.
              </p>
            </div>
            <a 
              href="#courses" 
              className="rounded-full bg-brand-terracotta px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#fff] transition-colors hover:bg-brand-terracotta-dark shrink-0 text-center shadow-lg shadow-[#00000010]"
            >
              Выбрать Направление
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
