/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { GraduationCap, Mail, Phone, MapPin, Award, FileText, Download } from 'lucide-react';

export default function Footer() {
  // dispatch оставлен, чтобы не ломать текущие зависимости проекта
  // (в этом файле больше не используется PRD).
  const dispatch = useDispatch();
  void dispatch;

  return (
    <footer className="bg-[#2D2D20] text-brand-sage-light/80 py-12 md:py-16 border-t border-brand-beige/20" id="footer-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-brand-beige/20">
          {/* Brand block (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-olive text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-serif italic text-[#fbf9f2] font-black tracking-tight">Умный Старт</span>
            </div>
            <p className="text-xs text-[#e1ded5] leading-relaxed max-w-sm">
              Лицензированный детский образовательный центр развития. Раскрываем таланты, учим анализировать информацию, развиваем логику и закладываем устойчивое понимание математики и языков.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-brand-terracotta font-bold tracking-tight bg-[#3E3E2E] border border-brand-beige/20 w-fit px-3 py-1 rounded-full">
              <Award className="h-3.5 w-3.5 text-brand-terracotta" />
              <span>Лицензия Комитета по Финансам и Образованию №78-9842</span>
            </div>
          </div>

          {/* Links block (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-serif italic font-bold uppercase tracking-widest">Программы</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#courses" className="hover:text-brand-terracotta transition">
                  Олимпиадная математика
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-brand-terracotta transition">
                  Ментальная арифметика
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-brand-terracotta transition">
                  Игровой английский
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-brand-terracotta transition">
                  Подготовка к школе
                </a>
              </li>
            </ul>
          </div>

          {/* Contact block (4 cols) */}
          <div className="md:col-span-4 space-y-4 font-sans">
            <h4 className="text-white text-xs font-serif italic font-bold uppercase tracking-widest">Контакты центра</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-brand-terracotta mt-0.5 shrink-0" />
                <div>
                  <span className="block text-white font-extrabold">+998 909469888</span>
                  <span className="text-[10px] text-brand-sage-light/60 font-medium">Ежедневно: с 09:00 до 20:00</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-brand-terracotta mt-0.5 shrink-0" />
                <span className="text-white">Xasan@001gmail.com</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-terracotta mt-0.5 shrink-0" />
                <span className="text-[#e1ded5]">Ориентир: 5 Школа</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright footer and direct tab toggle shortcuts */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-sage-light/60">
          <div>© {new Date().getFullYear()} Детский центр «Умный Старт». Все права сохранены.</div>

          <div className="flex items-center gap-3.5 flex-wrap">
            {/* PRD панель для копилота убрана по требованию */}
            <a
              href="/api/download-zip"
              download="smart-start-project.zip"
              className="flex items-center gap-1.5 hover:text-white transition cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-brand-olive" />
            </a>
            <span className="text-brand-sage-light/30">•</span>
            <span className="font-mono text-[9px] text-[#4E4E3A]">v1.2.0-FullStack</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

