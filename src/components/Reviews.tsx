/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { REVIEWS_DATA } from '../data/courses';
import { Review, CourseDirection } from '../types';
import { Star, Quote, Plus, Heart, MessageSquare, Sparkles, Check } from 'lucide-react';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS_DATA);
  const [activeTab, setActiveTab] = useState<CourseDirection | 'all'>('all');
  
  // Submit feedback form state
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [direction, setDirection] = useState<CourseDirection>('math');
  const [reviewText, setReviewText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter reviews
  const filteredReviews = reviewsList.filter(
    (rev) => activeTab === 'all' || rev.courseDirection === activeTab
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !reviewText) return;

    const newReview: Review = {
      id: `review-${Date.now()}`,
      authorName: name,
      authorRole: role || 'Родитель',
      rating,
      text: reviewText,
      courseDirection: direction,
      date: new Date().toLocaleDateString('ru-RU')
    };

    setReviewsList([newReview, ...reviewsList]);
    setIsSubmitted(true);

    // Reset after delay
    setTimeout(() => {
      setShowForm(false);
      setIsSubmitted(false);
      setName('');
      setRole('');
      setReviewText('');
    }, 2500);
  };

  const getDirLabel = (dir: CourseDirection) => {
    switch (dir) {
      case 'math': return 'Математика';
      case 'english': return 'Английский';
      case 'pochemuchka': return 'Почемучка';
    }
  };

  return (
    <section className="bg-brand-beige-light py-16 md:py-24" id="reviews">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 pb-12 border-b border-brand-beige mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5A5A40]">Честные отзывы</span>
            <h2 className="mt-2 text-3xl font-serif italic text-brand-charcoal sm:text-4xl leading-tight">
              Что говорят родители
            </h2>
            <p className="mt-3 text-sm text-brand-muted max-w-xl">
              Истории успеха наших маленьких выпускников и реальные впечатления их родителей о нашей образовательной системе.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-full bg-brand-olive hover:bg-brand-olive-dark px-6 py-3.5 text-xs font-bold uppercase text-white tracking-widest transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Оставить отзыв
          </button>
        </div>

        {/* Dynamic Submission Drawer/Form */}
        {showForm && (
          <div className="mt-8 bg-white rounded-[32px] p-6 md:p-8 border border-brand-beige shadow-sm max-w-2xl mx-auto animate-in fade-in duration-200">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-sage-light text-brand-olive mb-4 border border-brand-beige">
                  <Check className="h-6 w-6 stroke-3" />
                </div>
                <h3 className="text-lg font-serif italic font-bold text-brand-charcoal">Спасибо за ваш отзыв!</h3>
                <p className="text-xs text-brand-muted mt-2">
                  Он будет опубликован в каталоге сразу после мгновенной автоматической модерации.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-brand-charcoal flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4 text-[#C27D60]" />
                    Напишите ваше мнение
                  </h3>
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)} 
                    className="text-xs text-brand-muted hover:text-brand-charcoal font-bold cursor-pointer"
                  >
                    Закрыть
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">Ваше имя (родитель)</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Напр. Мария Николаева"
                      className="w-full text-xs p-3 rounded-lg border border-brand-beige focus:outline-brand-olive focus:border-brand-olive bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">Статус ребенка / Возраст</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Напр. Мама Артёма (8 лет)"
                      className="w-full text-xs p-3 rounded-lg border border-brand-beige focus:outline-brand-olive focus:border-brand-olive bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">Какое направление проходили?</label>
                    <select
                      value={direction}
                      onChange={(e) => setDirection(e.target.value as CourseDirection)}
                      className="w-full text-xs p-3 rounded-lg border border-brand-beige focus:outline-brand-olive focus:border-brand-olive bg-white"
                    >
                      <option value="math">Математика</option>
                      <option value="english">Английский</option>
                      <option value="pochemuchka">Почемучка</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">Рейтинг (Оценка):</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full text-xs p-3 rounded-lg border border-brand-beige focus:outline-brand-olive focus:border-brand-olive bg-white font-bold"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5 звезд</option>
                      <option value="4">⭐⭐⭐⭐ 4 звезды</option>
                      <option value="3">⭐⭐⭐ 3 звезды</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">Текст отзыва:</label>
                  <textarea
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Расскажите о ваших результатах, что понравилось ребенку..."
                    rows={3}
                    className="w-full text-xs p-3 rounded-lg border border-brand-beige focus:outline-brand-olive focus:border-brand-olive bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-terracotta hover:bg-brand-terracotta-dark py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-sm cursor-pointer transition"
                >
                  Опубликовать отзыв
                </button>
              </form>
            )}
          </div>
        )}

        {/* Direction filter tabs */}
        <div className="mt-8 flex justify-center gap-1 rounded-full bg-brand-beige/40 p-1 max-w-md mx-auto">
          {(['all', 'math', 'english', 'pochemuchka'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-full py-2 text-center text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-brand-olive text-white shadow-sm'
                  : 'text-[#3E3E2E] hover:text-[#5A5A40]'
              }`}
            >
              {tab === 'all' ? 'Все' : getDirLabel(tab)}
            </button>
          ))}
        </div>

        {/* Reviews Horizontal Render Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-[32px] p-6 md:p-8 border border-brand-beige shadow-sm relative flex flex-col justify-between group hover:border-[#5A5A40]/30 transition-all duration-200"
            >
              <div>
                {/* Visual Quote Icon Accent */}
                <div className="absolute top-6 right-6 text-brand-beige/30 group-hover:text-brand-sage-light/40 transition-colors">
                  <Quote className="h-10 w-10 fill-current" />
                </div>

                {/* Rating score stars */}
                <div className="flex gap-0.5 text-brand-terracotta mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rev.rating ? 'fill-current' : 'text-brand-beige/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Body Text */}
                <p className="text-xs text-[#525252] leading-relaxed italic font-serif relative z-10 pr-4">
                  "{rev.text}"
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-6 pt-4 border-t border-brand-beige flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-brand-charcoal">{rev.authorName}</span>
                  <span className="block text-[10px] text-brand-muted mt-0.5">{rev.authorRole}</span>
                </div>
                
                {/* Micro capsule tag */}
                <span className="rounded-full bg-brand-sage-light px-3 py-1 text-[9px] font-bold uppercase text-brand-olive border border-brand-beige/50">
                  {getDirLabel(rev.courseDirection)}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
