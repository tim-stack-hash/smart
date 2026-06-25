/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, removeFromCompare, clearCompareList, openBookingModal } from '../store';
import { COURSES_DATA } from '../data/courses';
import { X, BarChart3, ArrowRight, Trash2, CheckCircle2 } from 'lucide-react';

export default function CompareDrawer() {
  const dispatch = useDispatch();
  const { compareList } = useSelector((state: RootState) => state.app);
  const [isOpen, setIsOpen] = useState(true);

  // Read full course entities from comparison IDs
  const comparedCourses = COURSES_DATA.filter(course => compareList.includes(course.id));

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-beige shadow-2xl animate-in slide-in-from-bottom duration-300">
      
      {/* Header bar */}
      <div className="bg-[#3E3E2E] text-white px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4.5 w-4.5 text-brand-terracotta" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Сравнение курсов ({comparedCourses.length} из 3)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs text-brand-sage-light hover:text-white underline font-semibold cursor-pointer"
          >
            {isOpen ? 'Свернуть панель' : 'Развернуть сравнение'}
          </button>
          <span className="text-brand-sage-light/55">|</span>
          <button
            onClick={() => dispatch(clearCompareList())}
            className="text-xs text-brand-sage-light hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Очистить список
          </button>
        </div>
      </div>

      {/* Comparison Grid Table */}
      {isOpen && (
        <div className="p-4 sm:p-6 max-h-[380px] overflow-y-auto max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            
            {/* Guide labels column (Only shown on medium screens+) */}
            <div className="hidden md:flex flex-col justify-between py-2 text-xs font-bold text-brand-muted border-r border-brand-beige pr-4">
              <div className="font-bold uppercase text-[10px] tracking-wider text-brand-muted pb-2 border-b border-brand-beige">Метрики сравнения</div>
              <div>👶 Возрастной диапазон</div>
              <div>🏫 Расписание уроков</div>
              <div>📍 Формат обучения</div>
              <div>📅 Длительность программы</div>
              <div>💰 Стоимость обучения</div>
              <div className="h-10" /> {/* CTA spacing */}
            </div>

            {/* Compared Course profiles */}
            {comparedCourses.map((course) => (
              <div
                key={course.id}
                className="relative border border-brand-beige hover:border-brand-olive/40 rounded-3xl p-5 bg-brand-slate-bg/50 flex flex-col justify-between transition-all"
              >
                {/* Delete button */}
                <button
                  onClick={() => dispatch(removeFromCompare(course.id))}
                  className="absolute top-2.5 right-2.5 p-1 text-brand-muted hover:text-brand-charcoal rounded bg-white border border-brand-beige"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                <div className="space-y-4">
                   {/* Title and Direction */}
                  <div>
                    <span className="text-[9px] font-bold uppercase bg-brand-sage-light text-brand-olive px-2.5 py-0.5 rounded-full inline-block">
                      {course.directionName}
                    </span>
                    <h4 className="text-xs font-serif italic text-brand-charcoal font-bold mt-1 leading-snug line-clamp-1">{course.title}</h4>
                  </div>

                  {/* Comparisons for Mobile layout (visible, or stacked) */}
                  <div className="space-y-2.5 text-xs text-[#3d3d3d]">
                    <div className="flex md:block justify-between border-b md:border-0 border-brand-beige pb-1.5 md:pb-0">
                      <span className="md:hidden text-[10px] font-bold text-brand-muted">Возраст:</span>
                      <span className="font-bold text-brand-charcoal">👧 {course.ageGroup}</span>
                    </div>

                    <div className="flex md:block justify-between border-b md:border-0 border-brand-beige pb-1.5 md:pb-0">
                      <span className="md:hidden text-[10px] font-bold text-brand-muted">В неделю:</span>
                      <span className="font-semibold">{course.lessonsPerWeek} урока в неделю</span>
                    </div>

                    <div className="flex md:block justify-between border-b md:border-0 border-brand-beige pb-1.5 md:pb-0">
                      <span className="md:hidden text-[10px] font-bold text-brand-muted">Формат:</span>
                      <span className="font-bold uppercase text-[9px] bg-brand-sage-light px-2 py-0.5 rounded text-brand-olive border border-brand-beige/55">
                        {course.format === 'online' ? 'Онлайн' : 'Офлайн'}
                      </span>
                    </div>

                    <div className="flex md:block justify-between border-b md:border-0 border-brand-beige pb-1.5 md:pb-0">
                      <span className="md:hidden text-[10px] font-bold text-brand-muted">Длительность:</span>
                      <span className="font-semibold text-brand-muted">⏱️ {course.duration}</span>
                    </div>

                    <div className="flex md:block justify-between border-b md:border-0 border-brand-beige pb-1.5 md:pb-0">
                      <span className="md:hidden text-[10px] font-bold text-brand-muted">Цена:</span>
                      <span className="font-serif italic font-extrabold text-brand-terracotta text-sm">{course.pricePerMonth.toLocaleString()} ₽/мес</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(openBookingModal(course.direction))}
                  className="mt-4 w-full rounded-full bg-brand-olive hover:bg-brand-olive-dark text-white text-[11px] font-bold py-2.5 tracking-wider uppercase transition text-center"
                >
                  Выбрать
                </button>
              </div>
            ))}

            {/* Filler Slots */}
            {comparedCourses.length < 3 && (
              <div className="hidden md:flex flex-col items-center justify-center border-2 border-dashed border-brand-beige rounded-3xl p-6 text-center text-brand-muted bg-brand-slate-bg/30">
                <BarChart3 className="h-8 w-8 text-brand-beige animate-pulse mb-2 stroke-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Слот сравнения свободен</span>
                <p className="text-[10px] text-brand-muted mt-1">Добавьте ещё один курс для сопоставления.</p>
              </div>
            )}

            {comparedCourses.length < 2 && (
              <div className="hidden md:flex flex-col items-center justify-center border-2 border-dashed border-brand-beige rounded-3xl p-6 text-center text-brand-muted bg-brand-slate-bg/30">
                <BarChart3 className="h-8 w-8 text-brand-beige animate-pulse mb-2 stroke-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Слот сравнения свободен</span>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
