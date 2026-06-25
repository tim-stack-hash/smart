/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, deleteLead, setActiveTab } from '../store';
import { FileText, Copy, Check, Sliders, ListFilter, Server, Phone, Users, ShieldCheck, HelpCircle, Code, Settings, Download } from 'lucide-react';

export default function PrdPanel() {
  const dispatch = useDispatch();
  const { leads, favorites, compareList } = useSelector((state: RootState) => state.app);

  // Clipboard copy feedback state
  const [copiedPrd, setCopiedPrd] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Configuration options to customize the PRD in real-time
  const [schoolName, setSchoolName] = useState('Умный Старт');
  const [brandColor, setBrandColor] = useState('Indigo / Amber');
  const [gridColumns, setGridColumns] = useState('3 колонки');
  const [comparisonEnabled, setComparisonEnabled] = useState(true);

  // Generate dynamic markdown prd text
  const generatePrdMarkdown = () => {
    return `# ТЕХНИЧЕСКОЕ ЗАДАНИЕ (PRD) ДЛЯ COPILOT

## 1. ОБЩЕЕ ОПИСАНИЕ ПРОЕКТА
* **Название продукта:** Лендинг образовательного центра развития детей «${schoolName}»
* **Назначение:** Высококонверсионный промо-сайт для демонстрации образовательных программ центров, проведения расчетов стоимости абонементов и сбора контактных лидов родителей на бесплатный пробный урок.
* **Целевая аудитория:** Родители детей в возрасте от 5 до 11 лет, ищущие качественные развивающие курсы.

## 2. КЛЮЧЕВЫЕ НАПРАВЛЕНИЯ ОБУЧЕНИЯ (КУРСЫ)
Сайт должен презентовать 3 ключевых образовательных модуля:
1. **Математика и Логика (напр. Олимпиадная математика, Ментальная Арифметика)**
   * Фокус на анализе, устном счете с абакусом, подготовкой к турнирам.
2. **Английский Язык (напр. English Adventure, Speak Up & Grammar)**
   * Игровые форматы, метод физического реагирования TPR, разговорные клубы с носителями.
3. **Почемучка (Дошкольная развитие «Эрудит», Научный клуб)**
   * Комплексная подготовка ребенка к школе: письмо, классификация явлений, нейрогимнастика и проведение безопасных опытов.

## 3. СТЕК ТЕХНОЛОГИЙ И АРХИТЕКТУРА
* **Библиотека рендеринга:** React v18/19 (с использованием функциональных компонентов и хуков).
* **Сборщик проекта:** Vite (сверхбыстрый развертыватель).
* **Глобальный стейт-менеджер:** Redux Toolkit (@reduxjs/toolkit) + React-Redux.
* **Категории стилизации:** Tailwind CSS (включая адаптацию под мобильные экраны, планшеты и десктопы).
* **Иконочный сет:** Lucide-React.
* **Анимационные переходы:** Motion.

## 4. СТРУКТУРА ЛЕНДИНГА (КОМПОНЕНТЫ)
Сайт должен состоять из следующих функциональных зон (один адаптивный экран):
* **Шапка сайта (Navbar):** Логотип, ссылки к секциям, счетчики избранных программ, кнопка вызова пробного урока.
* **Первый экран (Hero):** Привлекательный оффер, УТП, ключевые метрики в цифрах, кнопка призыва к действию с якорным переходом.
* **Блок преимуществ (Features):** Сетка карточек с ключевыми триггерами доверия (Лицензия, малые группы, отчетность).
* **Блок курсов (Courses):** Карточки с фильтрацией по направлениям, возрасту ребенка (5-7 / 8-11), и интерактивным раскрывающимся силлабусом.
* **Абонементный калькулятор (Calculator):** Слайдеры для выбора количества уроков, чекбоксы выбора дисциплин и расчет пакетной скидки.
* **Блок отзывов (Reviews):** Слайдер родительских впечатлений с возможностью отправить новый отзыв.
* **Организационный блок (Faq):** Аккордеоны с ответами на частые вопросы.
* **Панель сравнения (CompareDrawer):** Сравнение параметров курсов на одном экране (адаптивная сетка).
* **Модальное окно бронирования (BookingModal):** Форма для сбора лидов родителей.

## 5. ПОДРОБНОЕ ОПИСАНИЕ ХРАНИЛИЩА REDUX TOOLKIT
Редукс должен управлять следующими состояниями во избежание запутывания в локальных стейтах:
* **\`favorites\`**: Массив ID курсов, которые пользователь отметил сердечком.
* **\`compareList\`**: Список ID до 3 курсов для сопоставления.
* **\`filters\`**: Текущий фильтр дисциплин (Математика, Английский, Почемучка), возраста и формата.
* **\`leads\`**: Накапливаемый массив заявок (лидов) от родителей (ParentName, Phone, ChildName, ChildAge, Direction, Format, Status), сохраняемый в LocalStorage.
* **\`bookingModal\`**: Управление видимостью формы записи и преселектом предмета фильтра.

## 6. ТРЕБОВАНИЯ К АДАПТИВНОСТИ И ДИЗАЙНУ
* **Цветовая схема:** Теплые оттенки, Indigo-акценты для логики и Amber-акценты для детской Почемучки.
* **Мобильные разрешения:** Скрывать десктопное меню, выводить боковой бургер-выдвижной ящик. На телефонах делать все интерактивные кнопки высотой не менее 44px для пальцевого тапа.
* **Анимации:** Мягкие ховеры на кнопках и карточках с микро-увеличением (\`hover:scale-105\`), плавное раскрытие аккордеона FAQ.`;
  };

  const generateCopilotPrompt = () => {
    return `Напиши готовый файл /src/store/index.ts для React-приложения образовательного центра с Redux Toolkit.
Среди направлений курсов: математика, английский, почемучка. Сделай слайс (slice) "app", который координирует:
1. Массив избранных курсов favorites (строки ID).
2. Массив сравнения compareList (строки ID, лимит 3 штуки).
3. Список оформленных заявок leads родителями (поля: parentName, phone, childName, childAge, direction, format, status). При добавлении нового лида созраняй массив в localStorage.
4. Состояние модального окна регистрации bookingModal (isOpen, preselectedDirection).

Используй стандартный стек: React 18/19, TypeScript и нотацию Redux Toolkit configureStore.`;
  };

  const handleCopyPrd = () => {
    navigator.clipboard.writeText(generatePrdMarkdown());
    setCopiedPrd(true);
    setTimeout(() => setCopiedPrd(false), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generateCopilotPrompt());
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="bg-brand-beige-light text-brand-charcoal min-h-screen py-10" id="prd-panel-root">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-brand-beige pb-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-olive text-white font-bold">
                <FileText className="h-5 w-5" />
              </span>
              <h1 className="text-2xl font-serif italic text-[#2D2D20] font-black tracking-tight sm:text-3xl">Copilot PRD & State Hub</h1>
            </div>
            <p className="text-xs text-brand-muted mt-2 max-w-2xl leading-relaxed">
              Этот раздел разработан специально для экспорта ТЗ. Вы можете настроить параметры ниже, скопировать готовое PRD одним кликом и скормить его GitHub Copilot, Cursor или Gemini для мгновенной сборки аналогичного сайта в любом месте!
            </p>
          </div>

          <button
            onClick={() => {
              dispatch(setActiveTab('landing'));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className="rounded-full bg-brand-olive hover:bg-brand-olive-dark px-6 py-3.5 text-xs font-bold text-white uppercase tracking-widest cursor-pointer transition-all duration-200 shadow-sm"
          >
            ← Вернуться на демо-сайт
          </button>
        </div>

        {/* Configurations Side and Live Markdown Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Configurator Widgets (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* PRD Dynamic Customizer card */}
            <div className="bg-white p-6 rounded-[32px] border border-brand-beige space-y-6 shadow-sm">
              <div className="flex items-center gap-2 text-brand-charcoal border-b border-brand-beige pb-3">
                <Settings className="h-4 w-4 text-brand-terracotta" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Тюнинг ТЗ в реальном времени</h3>
              </div>

              {/* Setting 1: School Name */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block mb-1.5">Название учебного центра:</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-brand-beige-light border border-brand-beige text-brand-charcoal focus:outline-brand-olive"
                />
              </div>

              {/* Setting 2: Brand color theme text */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block mb-1.5">Палитра бренда в PRD:</label>
                <input
                  type="text"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-brand-beige-light border border-brand-beige text-brand-charcoal focus:outline-brand-olive"
                />
              </div>

              {/* Setting 3: Grid configuration */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block mb-1.5">Карточки курсов (шаблон):</label>
                <select
                  value={gridColumns}
                  onChange={(e) => setGridColumns(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-brand-beige-light border border-brand-beige text-brand-charcoal focus:outline-brand-olive bg-white"
                >
                  <option value="3 колонки">3 колонки (сетка на десктопе)</option>
                  <option value="2 колонки">2 колонки (крупные плитки)</option>
                  <option value="Карусель">Карусель / Слайдер программ</option>
                </select>
              </div>

              {/* Metric check labels */}
              <div className="space-y-2 pt-3 border-t border-brand-beige text-xs">
                <div className="flex justify-between text-[11px] text-brand-muted">
                  <span>Статус стейта Favorites:</span>
                  <span className="font-mono text-brand-olive font-bold">{favorites.length > 0 ? `Активен (${favorites.length})` : 'Пусто'}</span>
                </div>
                <div className="flex justify-between text-[11px] text-brand-muted">
                  <span>Статус стейта Compare:</span>
                  <span className="font-mono text-brand-terracotta font-bold">{compareList.length > 0 ? `${compareList.length} курсов` : 'Пусто'}</span>
                </div>
              </div>
            </div>

            {/* QUICK COPILOT PROMPT BOX */}
            <div className="bg-white p-6 rounded-[32px] border border-brand-beige space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-brand-charcoal">
                <Code className="h-4.5 w-4.5 text-brand-olive" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Промпт для Редукс Стора</h3>
              </div>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Быстрый целевой промпт, чтобы Copilot сгенерировал полноценный TypeScript-код для центрального хранилища.
              </p>

              <div className="rounded-xl bg-brand-beige-light p-3.5 font-mono text-[10px] text-[#2d2d2d] max-h-[140px] overflow-y-auto whitespace-pre-wrap border border-brand-beige leading-normal">
                {generateCopilotPrompt()}
              </div>

              <button
                onClick={handleCopyPrompt}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-brand-charcoal hover:bg-brand-charcoal/90 py-3 text-xs font-bold text-white transition-all cursor-pointer"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="h-4 w-4 text-brand-olive" />
                    <span>Скопировано в буфер!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-white/50" />
                    <span>Скопировать промпт</span>
                  </>
                )}
              </button>
            </div>

            {/* ZIP DOWNLOAD CARD */}
            <div className="bg-white p-6 rounded-[32px] border border-brand-beige space-y-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 text-brand-charcoal">
                <Download className="h-4.5 w-4.5 text-brand-terracotta animate-bounce" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Полный архив проекта</h3>
              </div>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Выгрузите весь проект локально в один клик. Архив содержит полный исходный код, все компоненты (React, Tailwind, Redux, Lucide), конфигурационные файлы и Express-сервер.
              </p>

              <a
                href="/api/download-zip"
                download="smart-start-project.zip"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-brand-olive hover:bg-brand-olive-dark py-3.5 text-xs font-bold text-white transition-all cursor-pointer shadow-sm uppercase tracking-wider text-center"
              >
                <Download className="h-4 w-4" />
                <span>Скачать проект (.ZIP)</span>
              </a>
            </div>

          </div>

          {/* Column 2: Live PRD Document view (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* PRD DOCUMENT RENDER BOX */}
            <div className="bg-white rounded-[32px] border border-brand-beige overflow-hidden flex flex-col shadow-sm">
              
              {/* Header bar */}
              <div className="bg-[#f8f7f2] px-6 py-4 flex items-center justify-between border-b border-brand-beige">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-olive animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                    Сгенерированное ТЗ (Markdown)
                  </span>
                </div>
                
                <button
                  onClick={handleCopyPrd}
                  className="flex items-center gap-2 rounded-full bg-brand-terracotta hover:bg-brand-terracotta-dark px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer font-sans uppercase tracking-wider"
                >
                  {copiedPrd ? (
                    <>
                      <Check className="h-3.5 w-3.5 stroke-3" />
                      <span>Скопировано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Скопировать PRD</span>
                    </>
                  )}
                </button>
              </div>

              {/* Scrollable Markdown Document Viewer */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[500px] font-sans text-xs text-brand-charcoal space-y-4 border-b border-brand-beige/50 scrollbar-thin bg-[#fdfdfc]">
                <pre className="whitespace-pre-wrap font-sans text-xs text-brand-charcoal leading-relaxed font-semibold">
                  {generatePrdMarkdown()}
                </pre>
              </div>

              <div className="bg-brand-sage-light/35 p-4 text-[11px] text-brand-olive flex items-center gap-2 font-medium">
                <span className="text-brand-terracotta font-extrabold font-mono">[!]</span>
                <span>Документ полностью соответствует лучшим практикам систем автоматического промптинга для GitHub Copilot.</span>
              </div>

            </div>

            {/* REAL-TIME STATE MONITOR: REGISTERED TRIAL REQUESTS (LEADS) */}
            <div className="bg-white rounded-[32px] border border-brand-beige p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-brand-beige pb-3">
                <div className="flex items-center gap-2.5">
                  <Server className="h-5 w-5 text-brand-olive" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal leading-none">Реалтайм Монитор Лидов (Redux State)</h3>
                    <span className="text-[10px] text-brand-muted mt-1 block">Сюда автоматически падают заявки родителей, когда они жмут "Записаться" на демо-сайте</span>
                  </div>
                </div>
                
                <span className="rounded-full bg-brand-sage-light px-3 py-1 text-[10px] font-bold text-brand-olive border border-brand-beige">
                  Всего лидов: {leads.length}
                </span>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-8 text-brand-muted text-xs italic">
                  Лидов пока нет. Перейдите "На Демо-сайт", откройте форму и отправьте тестовую заявку!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] text-brand-charcoal">
                    <thead>
                      <tr className="border-b border-brand-beige text-brand-muted text-[10px] font-bold uppercase tracking-wider">
                        <th className="py-2.5 pr-2">Имя родителя</th>
                        <th className="py-2.5 pr-2">Телефон</th>
                        <th className="py-2.5 pr-2">Имя (Возраст) ребенка</th>
                        <th className="py-2.5 pr-2">Предмет</th>
                        <th className="py-2.5 pr-2">Формат</th>
                        <th className="py-2.5 text-center">Действие</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-beige/40">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-brand-sage-light/20 transition-colors">
                          <td className="py-3 pr-2 font-bold text-brand-charcoal">{lead.parentName}</td>
                          <td className="py-3 pr-2 text-brand-terracotta font-mono font-bold">{lead.phone}</td>
                          <td className="py-3 pr-2">{lead.childName} ({lead.childAge} лет)</td>
                          <td className="py-3 pr-2 uppercase font-bold text-[10px]">
                            <span className="rounded bg-brand-sage-light text-brand-olive border border-brand-beige/55 px-1.5 py-0.5">
                              {lead.direction === 'math' ? 'Математика' : lead.direction === 'english' ? 'Английский' : 'Почемучка'}
                            </span>
                          </td>
                          <td className="py-3 pr-2">
                            <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold text-white ${lead.format === 'offline' ? 'bg-brand-terracotta' : 'bg-brand-olive'}`}>
                              {lead.format === 'offline' ? 'Очно' : 'Онлайн'}
                            </span>
                          </td>
                          <td className="py-3 text-center">
                            <button
                              onClick={() => dispatch(deleteLead(lead.id))}
                              className="text-[10px] text-red-600 font-bold hover:text-red-700 underline cursor-pointer"
                              title="Удалить заявку из стейта"
                            >
                              Удалить
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
