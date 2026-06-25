/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, closeBookingModal, addLead } from '../store';
import { CourseDirection } from '../types';
import { X, Sparkles, Check, PhoneCall, Calendar, User, Compass } from 'lucide-react';

export default function RegistrationModal() {
  const dispatch = useDispatch();
  const { isOpen, preselectedDirection } = useSelector((state: RootState) => state.app.bookingModal);

  // Form local state fields
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number>(7);
  const [direction, setDirection] = useState<CourseDirection | 'all'>('all');
  const [format, setFormat] = useState<'offline' | 'online'>('offline');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync state whenever modal is opened with a preselected subject
  useEffect(() => {
    if (isOpen) {
      setDirection(preselectedDirection);
      setSubmitted(false);
    }
  }, [isOpen, preselectedDirection]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone || !childName) return;

    // Dispatch lead addition to store
    dispatch(addLead({
      parentName,
      phone,
      childName,
      childAge,
      direction: direction === 'all' ? 'math' : direction,
      format
    }));

    // Send to server for email notification
    // If email fails, we still show success to the user (lead is saved locally)
    import('../api/lead')
      .then(({ sendLeadToServer }) =>
        sendLeadToServer({
          parentName,
          phone,
          childName,
          childAge,
          direction: direction === 'all' ? 'math' : direction,
          format
        }).catch(() => undefined)
      )
      .catch(() => undefined);

    setSubmitted(true);

    // Auto close modal slightly after showing checkmark so parents see success
    setTimeout(() => {
      // Clear fields
      setParentName('');
      setPhone('');
      setChildName('');
      setSubmitted(false);
      dispatch(closeBookingModal());
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl border border-brand-beige animate-in zoom-in-95 duration-200"
        id="booking-modal-container"
      >
        
        {/* Decorative Top Bar Banner */}
        <div className="bg-gradient-to-br from-brand-olive to-[#3E3E2E] px-6 py-6 text-white relative">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => dispatch(closeBookingModal())}
              className="rounded-full bg-black/20 p-2 text-white/80 hover:bg-black/30 hover:text-white transition"
              id="close-modal-x"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-brand-terracotta animate-pulse" />
            <h3 className="text-lg font-serif italic font-bold tracking-tight">Запись на бесплатную диагностику</h3>
          </div>
          <p className="text-xs text-brand-sage-light/85 mt-2">
            Первый пробный урок бесплатный во всех направлениях. Мы перезвоним вам в течение 10 минут!
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-10 animate-in zoom-in-100 duration-300">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-sage-light text-brand-olive mb-6 border border-brand-beige">
                <Check className="h-8 w-8 stroke-3" />
              </div>
              <h4 className="text-xl font-serif italic font-extrabold text-brand-charcoal leading-tight">Заявка успешно принята!</h4>
              <p className="text-xs text-brand-muted mt-3 max-w-sm mx-auto">
                Родительский билет сгенерирован под номером <strong className="text-brand-terracotta font-bold font-mono">#{Math.floor(1000 + Math.random() * 9000)}</strong>. 
                Мы перезвоним на номер <span className="font-semibold text-brand-charcoal">{phone}</span> для окончательного подтверждения даты.
              </p>
              <p className="text-[10px] text-brand-muted mt-6 block">Это окно закроется автоматически через несколько секунд...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Form Grid 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">ФИО Родителя *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-brand-muted" />
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Напр. Мария Николаева"
                      className="w-full text-xs pl-10 pr-3 py-3 rounded-xl border border-brand-beige focus:outline-[#5A5A40] focus:border-[#5A5A40]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">Телефон для связи *</label>
                  <div className="relative">
                    <PhoneCall className="absolute left-3 top-3.5 h-4 w-4 text-brand-muted" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full text-xs pl-10 pr-3 py-3 rounded-xl border border-brand-beige focus:outline-[#5A5A40] focus:border-[#5A5A40]"
                    />
                  </div>
                </div>
              </div>

              {/* Form Grid 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">Имя ребенка *</label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Напр. Дима"
                    className="w-full text-xs p-3 rounded-xl border border-brand-beige focus:outline-[#5A5A40] focus:border-[#5A5A40]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">Возраст ребенка *</label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value))}
                    className="w-full text-xs p-3 rounded-xl border border-brand-beige focus:outline-[#5A5A40] focus:border-[#5A5A40] bg-white"
                  >
                    {[5, 6, 7, 8, 9, 10, 11].map(age => (
                      <option key={age} value={age}>{age} {age < 5 ? 'года' : age < 9 ? 'лет' : 'лет'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Subject Selector */}
                <div>
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">Направление</label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as CourseDirection | 'all')}
                    className="w-full text-xs p-3 rounded-xl border border-brand-beige focus:outline-[#5A5A40] focus:border-[#5A5A40] bg-white"
                  >
                    <option value="all">Выбрать общее</option>
                    <option value="math">Математика</option>
                    <option value="english">Английский</option>
                    <option value="pochemuchka">Почемучка</option>
                  </select>
                </div>

                {/* Format Radio blocks */}
                <div>
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">Формат обучения</label>
                  <div className="grid grid-cols-2 gap-2 mt-0.5">
                    <button
                      type="button"
                      onClick={() => setFormat('offline')}
                      className={`py-3.5 text-[11px] font-bold rounded-xl border text-center transition ${
                        format === 'offline'
                          ? 'bg-brand-charcoal text-white border-brand-charcoal'
                          : 'bg-white text-brand-muted border-brand-beige hover:bg-brand-slate-bg'
                      }`}
                    >
                      🏫 Очно
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormat('online')}
                      className={`py-3.5 text-[11px] font-bold rounded-xl border text-center transition ${
                        format === 'online'
                          ? 'bg-brand-charcoal text-white border-brand-charcoal'
                          : 'bg-white text-brand-muted border-brand-beige hover:bg-brand-slate-bg'
                      }`}
                    >
                      💻 Онлайн
                    </button>
                  </div>
                </div>
              </div>

              {/* Special notes */}
              <div>
                <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-1">Особые пожелания (необязательно)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Напр. у ребенка языковой барьер, хочет заниматься в вечерней группе..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-brand-beige focus:outline-[#5A5A40] focus:border-[#5A5A40]"
                />
              </div>

              {/* Privacy statement and trigger */}
              <div className="pt-2">
                <p className="text-[9px] text-brand-muted text-center leading-normal mb-3">
                  Нажимая на кнопку, вы соглашаетесь на обработку персональных данных в соответствии с ФЗ-152 РФ.
                </p>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-terracotta hover:bg-brand-terracotta-dark py-4 text-center text-xs font-bold uppercase tracking-widest text-[#fff] shadow-lg shadow-brand-terracotta/20 transition-all cursor-pointer"
                  id="booking-form-submit-btn"
                >
                  Отправить заявку & Подтвердить
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
