/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, toggleFavorite, toggleCompare, openBookingModal } from '../store';
import { COURSES_DATA } from '../data/courses';
import { Course, CourseDirection } from '../types';
import { Star, Clock, UserCheck, Calendar, Check, Heart, Plus, BarChart2, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export default function Courses() {
  const dispatch = useDispatch();
  const { favorites, compareList, filters } = useSelector((state: RootState) => state.app);
  
  // Local active filters state
  const [activeDirection, setActiveDirection] = useState<CourseDirection | 'all'>(filters.direction);
  const [activeAgeGroup, setActiveAgeGroup] = useState<string | 'all'>('all');
  const [activeFormat, setActiveFormat] = useState<string | 'all'>('all');

  // Expanded syllabus local state mapping
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  const directionTabs: { id: CourseDirection | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'Все курсы', count: COURSES_DATA.length },
    { id: 'math', label: '🔢 Математика', count: COURSES_DATA.filter(c => c.direction === 'math').length },
    { id: 'english', label: '🇬🇧 Английский', count: COURSES_DATA.filter(c => c.direction === 'english').length },
    { id: 'pochemuchka', label: '🧸 Почемучка', count: COURSES_DATA.filter(c => c.direction === 'pochemuchka').length },
  ];

  const ageFilterOptions = [
    { value: 'all', label: 'Все возрасты' },
    { value: '5-7 лет', label: 'Малыши 5-7 лет' },
    { value: '8-11 лет', label: 'Школьники 8-11 лет' }
  ];

  const formatFilterOptions = [
    { value: 'all', label: 'Все форматы' },
    { value: 'offline', label: 'Очно в центре' },
    { value: 'online', label: 'Онлайн (В зуме)' },
    { value: 'hybrid', label: 'Гибридный формат' }
  ];

  // Filter criteria execution
  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchDirection = activeDirection === 'all' || course.direction === activeDirection;
    const matchAge = activeAgeGroup === 'all' || course.ageGroup === activeAgeGroup;
    let matchFormat = true;
    if (activeFormat !== 'all') {
      matchFormat = course.format === activeFormat;
    }
    return matchDirection && matchAge && matchFormat;
  });

  const toggleSyllabus = (id: string) => {
    if (expandedSyllabusId === id) {
      setExpandedSyllabusId(null);
    } else {
      setExpandedSyllabusId(id);
    }
  };

  const getFormatLabel = (fmt: string) => {
    switch (fmt) {
      case 'offline': return 'Очно';
      case 'online': return 'Онлайн';
      case 'hybrid': return 'Гибрид';
      default: return fmt;
    }
  };

  const handleCompareClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!compareList.includes(id) && compareList.length >= 3) {
      alert('Вы можете сравнить до 3 курсов одновременно. Удалите ненужные из панели внизу.');
      return;
    }
    dispatch(toggleCompare(id));
  };

  return (
    <section className="bg-brand-slate-bg py-16 md:py-24 border-t border-brand-beige" id="courses">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 pb-12 border-b border-brand-beige">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5A5A40]">Каталог Программ</span>
            <h2 className="mt-2 text-3xl font-serif italic text-brand-charcoal sm:text-4xl leading-tight">
              Направления обучения
            </h2>
            <p className="mt-3 text-sm text-brand-muted max-w-xl">
              Авторские курсы, помогающие заложить надежный фундамент интеллектуального, логического и творческого развития детей.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="rounded-full bg-brand-sage-light px-5 py-2.5 text-xs font-bold text-brand-olive border border-brand-beige">
            Найдено курсов: {filteredCourses.length} из {COURSES_DATA.length}
          </div>
        </div>

        {/* Filter Controls Box */}
        <div className="mt-8 bg-white rounded-[32px] p-8 border border-brand-beige shadow-sm space-y-5">
          
          {/* 1. Main Directon Tabs */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted block mb-2.5">Направление:</span>
            <div className="flex flex-wrap gap-2">
              {directionTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDirection(tab.id)}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                    activeDirection === tab.id
                      ? 'bg-brand-olive text-white shadow-md shadow-brand-olive/15'
                      : 'bg-brand-slate-bg text-brand-muted hover:bg-brand-sage-light hover:text-brand-charcoal border border-transparent'
                  }`}
                  id={`filter-dir-${tab.id}`}
                >
                  {tab.label}
                  <span className={`ml-2 text-[10px] rounded-full px-2 py-0.5 ${activeDirection === tab.id ? 'bg-brand-olive-dark text-white' : 'bg-brand-sage-light text-brand-muted'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-brand-beige">
            
            {/* 2. Age group Selector */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted block mb-2">Возрастная категория:</span>
              <div className="flex gap-2">
                {ageFilterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setActiveAgeGroup(opt.value)}
                    className={`flex-1 rounded-full py-2 text-center text-xs font-medium border transition-all ${
                      activeAgeGroup === opt.value
                        ? 'bg-brand-charcoal text-white border-brand-charcoal'
                        : 'bg-white text-brand-muted border-brand-beige hover:bg-brand-slate-bg'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Format Selector */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted block mb-2">Формат занятий:</span>
              <div className="flex gap-2">
                {formatFilterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setActiveFormat(opt.value)}
                    className={`flex-1 rounded-full py-2 text-center text-xs font-medium border transition-all ${
                      activeFormat === opt.value
                        ? 'bg-brand-charcoal text-white border-brand-charcoal'
                        : 'bg-white text-brand-muted border-brand-beige hover:bg-brand-slate-bg'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Empty Search State */}
        {filteredCourses.length === 0 && (
          <div className="mt-12 text-center py-16 bg-white rounded-[32px] border border-brand-beige shadow-sm max-w-lg mx-auto">
            <BookOpen className="h-10 w-10 text-brand-muted mx-auto stroke-1" />
            <h3 className="mt-4 text-sm font-bold text-brand-charcoal">Нет подходящих курсов</h3>
            <p className="mt-2 text-xs text-brand-muted px-4">
              Попробуйте сбросить некоторые фильтры возраста или формата, чтобы найти программы обучения по выбранной дисциплине.
            </p>
            <button
              onClick={() => {
                setActiveDirection('all');
                setActiveAgeGroup('all');
                setActiveFormat('all');
              }}
              className="mt-6 rounded-full bg-brand-sage-light px-5 py-2.5 text-xs font-bold text-brand-olive border border-[#e6e2d3] hover:bg-[#e6e2d3] transition-colors"
            >
              Сбросить все фильтры
            </button>
          </div>
        )}

        {/* Courses Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course: Course) => {
            const isFav = favorites.includes(course.id);
            const isCompared = compareList.includes(course.id);
            const isSyllabusExpanded = expandedSyllabusId === course.id;

            return (
              <div
                key={course.id}
                className="group flex flex-col overflow-hidden rounded-[32px] bg-white border border-brand-beige shadow-sm hover:shadow-xl hover:shadow-brand-olive/5 transition-all duration-300"
                id={`course-card-${course.id}`}
              >
                
                {/* Course Header/Cover */}
                <div className="relative h-48 overflow-hidden bg-brand-slate-bg shrink-0">
                  <img
                    key={course.id}
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Layer gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Absolute control buttons */}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    
                    {/* Add to Favorites Toggle */}
                    <button
                      onClick={() => dispatch(toggleFavorite(course.id))}
                      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-white hover:scale-105 transition-all text-brand-charcoal shadow-sm`}
                      title={isFav ? 'Убрать из избранного' : 'Добавить в избранное'}
                      id={`fav-btn-${course.id}`}
                    >
                      <Heart className={`h-4 w-4 ${isFav ? 'fill-brand-terracotta text-brand-terracotta' : 'text-brand-charcoal'}`} />
                    </button>

                    {/* Add to Comparison Toggle */}
                    <button
                      onClick={(e) => handleCompareClick(course.id, e)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-white hover:scale-105 transition-all text-brand-charcoal shadow-sm`}
                      title={isCompared ? 'Убрать из сравнения' : 'Добавить к сравнению'}
                    >
                      <BarChart2 className={`h-4 w-4 ${isCompared ? 'text-brand-olive font-bold fill-brand-sage-light/40' : 'text-brand-charcoal'}`} />
                    </button>

                  </div>

                  {/* Absolute badging: Age + Direction (Math, English, etc.) */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-brand-olive px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                      {course.directionName}
                    </span>
                    <span className="rounded-full bg-brand-terracotta px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                      👶 {course.ageGroup}
                    </span>
                  </div>

                </div>

                {/* Course Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    {/* Rating row */}
                    <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                      <div className="flex items-center text-brand-terracotta">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="ml-1 font-bold text-brand-charcoal">{course.rating}</span>
                      </div>
                      <span>•</span>
                      <span>({course.reviewsCount} отзывов)</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded bg-brand-sage-light text-[10px] font-bold uppercase text-brand-olive">
                        {getFormatLabel(course.format)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 text-lg font-serif italic font-bold text-brand-charcoal leading-tight group-hover:text-brand-olive transition-colors">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs text-brand-muted leading-relaxed truncate-2-lines">
                      {course.description}
                    </p>

                    {/* Features list */}
                    <ul className="mt-4 space-y-1.5 border-t border-brand-beige pt-4">
                      {course.features.map((feat, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-brand-muted">
                          <Check className="h-3.5 w-3.5 text-brand-olive shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                  <div>
                    {/* Syllabus expansion button */}
                    <button
                      onClick={() => toggleSyllabus(course.id)}
                      className="mt-4 w-full flex items-center justify-between rounded-xl bg-brand-slate-bg hover:bg-brand-sage-light px-4 py-2.5 text-left text-xs font-bold text-brand-charcoal transition"
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-brand-terracotta" />
                        Программа курса (силлабус)
                      </span>
                      {isSyllabusExpanded ? <ChevronUp className="h-4 w-4 text-brand-muted" /> : <ChevronDown className="h-4 w-4 text-brand-muted" />}
                    </button>

                    {/* Syllabus Detail Content */}
                    {isSyllabusExpanded && (
                      <div className="mt-2.5 rounded-xl border border-brand-beige bg-brand-slate-bg/30 p-3 space-y-2.5 text-[11px] animate-in slide-in-from-top-1 duration-200">
                        {course.syllabus.map((s, idx) => (
                          <div key={idx} className="border-b border-brand-beige/50 pb-2 last:border-0 last:pb-0">
                            <span className="font-extrabold text-brand-terracotta block">{s.week}</span>
                            <span className="font-bold text-brand-charcoal block mt-0.5">{s.topic}</span>
                            <p className="text-brand-muted mt-0.5 leading-tight">{s.details}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pricing & Call-to-Action panel */}
                    <div className="mt-6 pt-5 border-t border-brand-beige flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-muted block tracking-normal">Стоимость:</span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-xl font-serif font-black text-brand-charcoal">{course.pricePerMonth.toLocaleString()} сум</span>
                          <span className="text-[10px] text-brand-muted font-semibold">/ мес</span>
                        </div>
                        <span className="text-[9px] text-brand-muted block mt-0.5">Занятий: {course.lessonsPerWeek}/нед</span>
                      </div>

                      <button
                        onClick={() => dispatch(openBookingModal(course.direction))}
                        className="rounded-full bg-brand-terracotta hover:bg-brand-terracotta-dark px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-brand-terracotta/10 transition-colors"
                      >
                        Записаться
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
