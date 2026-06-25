/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, openBookingModal } from '../store';
import { CourseDirection } from '../types';
import { Calculator as CalcIcon, Percent, ShieldCheck, Sparkles, HelpCircle, GraduationCap, Check } from 'lucide-react';

export default function Calculator() {
  const dispatch = useDispatch();
  
  // Local reactive controller states for calculation
  const [selectedDirs, setSelectedDirs] = useState<CourseDirection[]>(['math']);
  const [lessonsFrequency, setLessonsFrequency] = useState<number>(8); // lessons per month
  const [isOnline, setIsOnline] = useState<boolean>(false);

  // Prices per single lesson based on subject
  const BASE_PRICE_PER_LESSON: Record<CourseDirection, number> = {
    math: 700,      // e.g. 5600 for 8 lessons
    english: 680,   // e.g. 5440 for 8 lessons
    pochemuchka: 720 // e.g. 5760 for 8 lessons
  };

  const handleDirectionToggle = (dir: CourseDirection) => {
    if (selectedDirs.includes(dir)) {
      if (selectedDirs.length > 1) {
        setSelectedDirs(selectedDirs.filter(d => d !== dir));
      }
    } else {
      setSelectedDirs([...selectedDirs, dir]);
    }
  };

  // Compute values
  const getSubtotal = () => {
    let sum = 0;
    selectedDirs.forEach(dir => {
      sum += BASE_PRICE_PER_LESSON[dir] * lessonsFrequency;
    });
    return sum;
  };

  const getDiscountPercent = () => {
    if (selectedDirs.length === 2) return 10;
    if (selectedDirs.length >= 3) return 15;
    return 0;
  };

  const getFormatMultiplier = () => {
    return isOnline ? 0.9 : 1.0; // 10% off for online
  };

  const subtotal = getSubtotal();
  const discountPercent = getDiscountPercent();
  const formatMultiplier = getFormatMultiplier();
  
  // Calculate final
  const baseCostWithFormat = Math.round(subtotal * formatMultiplier);
  const discountAmount = Math.round(baseCostWithFormat * (discountPercent / 100));
  const finalPrice = baseCostWithFormat - discountAmount;
  const savedTotal = Math.round(subtotal - finalPrice);

  const getDirLabel = (dir: CourseDirection) => {
    switch (dir) {
      case 'math': return '🔢 Математика и Логика';
      case 'english': return '🇬🇧 Английский язык';
      case 'pochemuchka': return '🧸 Почемучка (Подготовка)';
    }
  };

  return (
    <section className="bg-brand-beige-light py-16 md:py-24" id="calculator">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5A5A40]">Онлайн расчет</span>
          <h2 className="mt-3 text-3xl font-serif italic text-brand-charcoal sm:text-4xl leading-tight">
            Калькулятор стоимости занятий
          </h2>
          <p className="mt-4 text-base text-brand-muted">
            Спланируйте комфортный график занятий для ребенка и рассчитайте точную стоимость абонемента со всеми скидками в реальном времени.
          </p>
        </div>

        {/* Dashboard Split Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Controls: Left Panel (7 cols) */}
          <div className="lg:col-span-7 bg-[#f8f7f2] p-6 md:p-8 rounded-[32px] border border-brand-beige shadow-sm space-y-8">
            
            {/* Step 1: Select Subjects */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-olive text-[11px] font-bold text-white">1</span>
                <h3 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Выберите направления обучения:</h3>
              </div>
              <p className="text-xs text-brand-muted mb-4">Вы можете объединить программы в мульти-абонемент со скидкой до 15%</p>
              
              <div className="space-y-3">
                {(['math', 'english', 'pochemuchka'] as CourseDirection[]).map(dir => {
                  const isChecked = selectedDirs.includes(dir);
                  return (
                    <button
                      key={dir}
                      onClick={() => handleDirectionToggle(dir)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'border-brand-olive bg-brand-sage-light/60 text-brand-charcoal'
                          : 'border-brand-beige bg-white text-brand-muted hover:border-brand-olive/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${isChecked ? 'bg-brand-olive border-brand-olive text-white' : 'border-brand-beige bg-white'}`}>
                          {isChecked && <Check className="h-3.5 w-3.5 stroke-3" />}
                        </div>
                        <span className="text-xs font-bold">{getDirLabel(dir)}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-brand-muted">~{BASE_PRICE_PER_LESSON[dir]} сум/урок</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Lessons drag frequency */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-olive text-[11px] font-bold text-white">2</span>
                <h3 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Количество занятий в месяц:</h3>
              </div>
              <p className="text-xs text-brand-muted mb-4">Укажите суммарное число уроков по выбранным направлениям</p>

              {/* Slider Controls */}
              <div className="mt-4">
                <input
                  type="range"
                  min="4"
                  max="16"
                  step="2"
                  value={lessonsFrequency}
                  onChange={(e) => setLessonsFrequency(Number(e.target.value))}
                  className="w-full h-2 bg-brand-beige rounded-lg appearance-none cursor-pointer accent-[#5A5A40]"
                />
                <div className="flex justify-between text-[11px] text-brand-muted font-bold mt-2">
                  <span>4 урока (1/нед)</span>
                  <span>8 уроков (2/нед)</span>
                  <span>12 уроков (3/нед)</span>
                  <span>16 уроков (4+/нед)</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="mt-4 flex gap-2">
                {[4, 8, 12, 16].map(freq => (
                  <button
                    key={freq}
                    onClick={() => setLessonsFrequency(freq)}
                    className={`flex-1 rounded-full py-2.5 text-xs font-bold border transition-all cursor-pointer ${
                      lessonsFrequency === freq
                        ? 'bg-brand-charcoal text-white border-brand-charcoal'
                        : 'bg-white text-brand-muted border-brand-beige hover:bg-brand-slate-bg hover:border-brand-olive/30'
                    }`}
                  >
                    {freq} уроков
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Format switcher */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-olive text-[11px] font-bold text-white">3</span>
                <h3 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Формат проведения:</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  onClick={() => setIsOnline(false)}
                  className={`rounded-2xl p-4 border text-center transition-all cursor-pointer ${
                    !isOnline
                      ? 'border-brand-olive bg-brand-sage-light/50 text-brand-olive'
                      : 'border-brand-beige bg-white text-brand-muted hover:border-brand-olive/30'
                  }`}
                >
                  <span className="block text-xs font-bold">🏫 Очно в центре</span>
                  <span className="block text-[10px] text-brand-muted mt-1">Доступные аудитории</span>
                </button>
                <button
                  onClick={() => setIsOnline(true)}
                  className={`rounded-2xl p-4 border text-center transition-all relative cursor-pointer ${
                    isOnline
                      ? 'border-brand-olive bg-brand-sage-light/50 text-brand-olive'
                      : 'border-brand-beige bg-white text-brand-muted hover:border-brand-olive/30'
                  }`}
                >
                  <div className="absolute -top-2 -right-2 bg-brand-terracotta text-white rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider animate-bounce">
                    Скидка 10%
                  </div>
                  <span className="block text-xs font-bold">💻 Онлайн в Zoom</span>
                  <span className="block text-[10px] text-brand-muted mt-1">Интерактивная доска</span>
                </button>
              </div>
            </div>

          </div>

          {/* Results Receipt: Right Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#3E3E2E] text-white rounded-[32px] p-6 md:p-8 shadow-xl shadow-brand-olive/5 flex flex-col justify-between border border-brand-beige/50">
            
            <div>
              <div className="flex items-center gap-2.5 pb-6 border-b border-white/10">
                <CalcIcon className="h-5 w-5 text-brand-terracotta" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-sage-light">Расчет обучения</h3>
              </div>

              {/* Receipt details line items */}
              <div className="mt-6 space-y-4 text-xs">
                
                <div className="flex justify-between text-brand-sage-light/80">
                  <span>Выбранные дисциплины:</span>
                  <span className="font-bold text-white text-right">{selectedDirs.length} направления</span>
                </div>

                <div className="flex justify-between text-brand-sage-light/80">
                  <span>Всего занятий в месяц:</span>
                  <span className="font-bold text-white">{lessonsFrequency} уроков</span>
                </div>

                <div className="flex justify-between text-brand-sage-light/80">
                  <span>Формат:</span>
                  <span className="font-bold text-white">{isOnline ? 'Онлайн-обучение' : 'Аудиторное очно'}</span>
                </div>

                {isOnline && (
                  <div className="flex justify-between text-brand-terracotta">
                    <span>Онлайн-скидка:</span>
                    <span className="font-bold">-10%</span>
                  </div>
                )}

                <div className="flex justify-between text-brand-sage-light/80 pt-3 border-t border-white/10">
                  <span>Прозрачный зачет:</span>
                    <span className="font-bold text-white">{subtotal.toLocaleString()} сум</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-brand-terracotta">
                    <span>Пакетная скидка ({selectedDirs.length} курса):</span>
                    <span className="font-bold">-{discountPercent}%</span>
                  </div>
                )}

              </div>
            </div>

            {/* Total Block */}
            <div className="mt-8 pt-6 border-t border-white/10">
              
              {savedTotal > 0 && (
                <div className="flex items-center justify-between mb-3 text-brand-terracotta text-xs">
                  <div className="flex items-center gap-1 font-bold">
                    <Percent className="h-4 w-4" />
                    Ваша экономия составит:
                  </div>
                  <span className="font-bold">-{savedTotal.toLocaleString()} сум</span>
                </div>
              )}

              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase font-extrabold text-brand-sage-light/60">Итого к оплате:</span>
                <div className="text-right">
                  <span className="text-3xl font-serif italic font-extrabold text-[#C27D60]">{finalPrice.toLocaleString()} сум</span>
                  <span className="text-[10px] text-brand-sage-light/60 block mt-0.5">/ в месяц за абонемент</span>
                </div>
              </div>

              {/* Form trigger action */}
              <button
                onClick={() => dispatch(openBookingModal(selectedDirs[0] || 'all'))}
                className="mt-6 w-full rounded-full bg-[#C27D60] hover:bg-[#b06c50] py-4 text-center text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-[#00000020] transition duration-200 cursor-pointer"
              >
                Оформить этот тариф
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-brand-sage-light/60">
                <ShieldCheck className="h-4 w-4 text-brand-terracotta" />
                <span>Фиксация цены на весь год обучения</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
