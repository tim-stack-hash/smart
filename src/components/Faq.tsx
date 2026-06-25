/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQ_DATA } from '../data/courses';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Faq() {
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section className="bg-white py-16 md:py-24" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5A5A40]">Полезно знать</span>
          <h2 className="mt-2 text-2xl font-serif italic tracking-tight text-brand-charcoal sm:text-3xl">
            Популярные вопросы и ответы
          </h2>
          <p className="mt-3 text-xs text-brand-muted max-w-lg mx-auto">
            Собрали самую необходимую организационную и юридическую информацию, чтобы сделать ваше сотрудничество с центром максимально прозрачным.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`transition-all duration-200 border ${
                  isOpen
                    ? 'border-brand-olive bg-brand-sage-light/30 shadow-sm rounded-[24px]'
                    : 'border-brand-beige bg-white hover:border-brand-olive/35 rounded-[24px]'
                }`}
              >
                
                {/* Accordion trigger line */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-brand-charcoal focus:outline-none cursor-pointer"
                  id={`faq-trigger-${faq.id}`}
                >
                  <span className="flex items-center gap-3 pr-4 sm:text-sm">
                    <span className="text-brand-olive font-bold uppercase text-[9px] bg-white border border-brand-beige px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    {faq.question}
                  </span>
                  <div className="shrink-0 p-1.5 rounded-lg bg-brand-sage-light text-brand-olive">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {/* Expanded answer content wrapper */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#3d3d3d] leading-relaxed border-t border-brand-beige/50 animate-in slide-in-from-top-1 duration-150">
                    <p className="sm:text-sm">{faq.answer}</p>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Quick callback referral */}
        <div className="mt-12 text-center text-xs text-brand-muted bg-brand-sage-light/35 rounded-2xl p-6 border border-brand-beige">
          У вас особый вопрос, которого нет в списке?
          <a href="#calculator" className="text-brand-terracotta font-bold ml-1.5 underline decoration-2 hover:text-brand-terracotta-dark">
            Напишите нам в чат или оставьте заявку на консультацию
          </a>
        </div>

      </div>
    </section>
  );
}
