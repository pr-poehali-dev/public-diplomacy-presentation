import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const slides = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [key, setKey] = useState(0);

  const goTo = (index: number) => {
    if (index === current || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setKey((k) => k + 1);
      setAnimating(false);
    }, 300);
  };

  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(slides.length - 1, current + 1));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, animating]);

  return (
    <div className="min-h-screen bg-[#0f1419] text-white flex flex-col select-none overflow-hidden">
      {/* Декоративная полоса — цвета флага Кореи */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#C60C30]" />
        <div className="flex-1 bg-white/20" />
        <div className="flex-1 bg-[#003478]" />
      </div>

      {/* Основная область */}
      <div className="flex-1 flex flex-col relative">
        <div
          key={key}
          className={`flex-1 flex flex-col transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
        >
          {current === 0 && <Slide1 />}
          {current === 1 && <Slide2 />}
          {current === 2 && <Slide3 />}
          {current === 3 && <Slide4 />}
          {current === 4 && <Slide5 />}
        </div>
      </div>

      {/* Нижняя навигация */}
      <nav className="flex items-center justify-between px-10 py-5 border-t border-white/10">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 text-white/50 hover:text-white disabled:opacity-20 transition-all duration-200 font-sans text-sm tracking-widest uppercase"
        >
          <Icon name="ChevronLeft" size={18} />
          Назад
        </button>

        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-[#C60C30]"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 text-white/50 hover:text-white disabled:opacity-20 transition-all duration-200 font-sans text-sm tracking-widest uppercase"
        >
          Далее
          <Icon name="ChevronRight" size={18} />
        </button>
      </nav>
    </div>
  );
}

/* ── СЛАЙД 1: Титульный ── */
function Slide1() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-16 py-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 right-12 w-64 h-64 rounded-full border border-white/5" />
        <div className="absolute top-16 right-20 w-40 h-40 rounded-full border border-white/5" />
        <div className="absolute bottom-16 left-8 w-48 h-48 rounded-full border border-[#C60C30]/10" />
        <div className="absolute -bottom-8 left-24 text-[200px] font-display text-white/[0.03] leading-none select-none">
          한국
        </div>
      </div>

      <div className="relative z-10 animate-fade-in">
        <p className="font-sans text-sm tracking-[0.3em] uppercase text-[#C60C30] mb-6">
          Выпускная квалификационная работа
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white max-w-4xl mb-8">
          Реализация публичной дипломатии Республики Корея в странах Центральной Азии
        </h1>
        <div className="w-24 h-px bg-[#C60C30] mx-auto mb-8 animate-line-grow" />
        <p className="font-display text-xl italic text-white/60 mb-10">
          в рамках Базового плана публичной дипломатии 2022–2027
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-1 text-white/40 font-sans text-sm animate-fade-in">
        <span>Студент: [Имя Фамилия]</span>
        <span>Научный руководитель: [ФИО]</span>
        <span className="mt-2 text-white/25">[Университет] · [Год]</span>
      </div>
    </div>
  );
}

/* ── СЛАЙД 2: Актуальность и новизна ── */
function Slide2() {
  return (
    <div className="flex-1 flex flex-col px-16 py-10">
      <SlideHeader number="01" title="Актуальность и научная новизна" />
      <div className="flex-1 grid grid-cols-2 gap-8 mt-8">
        <div className="animate-slide-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <BlockLabel>Актуальность</BlockLabel>
          <ul className="mt-4 space-y-4">
            <Li>Возрастающая роль публичной дипломатии в формировании международного имиджа государств</Li>
            <Li>Республика Корея — институционально оформленная система ПД с законодательной базой</Li>
            <Li>Усиление внимания Кореи к Центральной Азии как стратегическому направлению</Li>
          </ul>
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.25s", opacity: 0 }}>
          <BlockLabel accent>Научная новизна</BlockLabel>
          <ul className="mt-4 space-y-4">
            <Li>Анализ оригинальных корейских документов: I, II и III Базовые планы переведены автором</Li>
            <Li>Тема реализации ПД Кореи в ЦА недостаточно разработана в российской литературе</Li>
            <Li>Учёт позиции корейских исследователей: Ким Ыйгон, Ли Сук Чон, Ким Минсон</Li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── СЛАЙД 3: Теория, цель и задачи ── */
function Slide3() {
  return (
    <div className="flex-1 flex flex-col px-16 py-10">
      <SlideHeader number="02" title="Теоретическая база · Цель · Задачи" />
      <div className="flex-1 grid grid-cols-3 gap-6 mt-8">
        <div className="animate-slide-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <BlockLabel>Теория</BlockLabel>
          <p className="mt-3 text-white/70 font-sans text-base leading-relaxed">
            Классические подходы к публичной дипломатии. Средние державы используют «мягкую силу» как компенсацию ограниченных ресурсов «жёсткой силы».
          </p>
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <BlockLabel accent>Цель</BlockLabel>
          <p className="mt-3 text-white/70 font-sans text-base leading-relaxed">
            Анализ нормативно-институциональных основ ПД Кореи на базе II Базового плана с учётом его досрочного завершения и сравнением с I планом.
          </p>
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <BlockLabel>Задачи</BlockLabel>
          <ul className="mt-3 space-y-3">
            <LiSmall>Изучить теоретические подходы</LiSmall>
            <LiSmall>Охарактеризовать I план как предшествующий этап</LiSmall>
            <LiSmall>Проанализировать структуру и приоритеты II плана</LiSmall>
            <LiSmall>Рассмотреть переход к III плану (нояб. 2025)</LiSmall>
            <LiSmall>Охарактеризовать реализацию в странах ЦА</LiSmall>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── СЛАЙД 4: Анализ базовых планов ── */
function Slide4() {
  return (
    <div className="flex-1 flex flex-col px-16 py-10">
      <SlideHeader number="03" title="Анализ базовых планов публичной дипломатии" />
      <div className="flex-1 grid grid-cols-3 gap-5 mt-8">
        <PlanCard
          delay="0.1s"
          period="I план · до 2021"
          title="Институциональный фундамент"
          items={[
            "Создан Комитет по публичной дипломатии",
            "Определены ключевые организации: Корейский фонд и KOICA",
            "Заложена нормативно-правовая база",
          ]}
        />
        <PlanCard
          delay="0.2s"
          period="II план · 2023–2027"
          title="Три стратегических направления"
          highlight
          items={[
            "Стратегическая публичная дипломатия",
            "Научно-технологическое и культурное лидерство",
            "Цифровая и инновационная экосистема",
          ]}
          note="Досрочно завершён в ноябре 2025 г."
        />
        <PlanCard
          delay="0.3s"
          period="III план · 2026–2030"
          title="Новый этап"
          items={[
            "Утверждён в ноябре 2025 года",
            "Развивает достижения II плана",
            "Усиление цифрового и культурного компонентов",
          ]}
        />
      </div>
    </div>
  );
}

/* ── СЛАЙД 5: Выводы ── */
function Slide5() {
  return (
    <div className="flex-1 flex flex-col px-16 py-10">
      <SlideHeader number="04" title="Выводы и практическая значимость" />
      <div className="flex-1 grid grid-cols-2 gap-10 mt-8">
        <div>
          <div className="animate-slide-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            <BlockLabel>Основные выводы</BlockLabel>
            <ul className="mt-3 space-y-4">
              <Li>Корея сформировала последовательную систему ПД: законодательство → пятилетние планы → чёткое распределение ролей МИД / Корейский фонд / KOICA</Li>
              <Li>Центральная Азия — перспективное направление долгосрочного сотрудничества</Li>
              <Li>Саммит «Корея – ЦА» запланирован на сентябрь 2026 года</Li>
            </ul>
          </div>
        </div>

        <div className="space-y-5">
          <div className="animate-slide-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <BlockLabel accent>Реализация в ЦА</BlockLabel>
            <ul className="mt-3 space-y-3">
              <LiSmall>Форум «Корея – Центральная Азия» — политический диалог</LiSmall>
              <LiSmall>Институты Седжонга + рост студентов из региона</LiSmall>
              <LiSmall>Технологические инициативы KOICA</LiSmall>
              <LiSmall>Культурные и гуманитарные мероприятия</LiSmall>
            </ul>
          </div>

          <div
            className="mt-4 p-5 border border-[#C60C30]/40 rounded-sm animate-slide-up"
            style={{ animationDelay: "0.35s", opacity: 0 }}
          >
            <p className="font-sans text-xs text-white/40 uppercase tracking-widest mb-2">Практическая значимость</p>
            <p className="font-sans text-base text-white/80 leading-relaxed">
              Корейский опыт организации ПД может быть изучен и адаптирован российскими специалистами — с учётом значимости ЦА для обеих стран.
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-6 pt-5 border-t border-white/10 text-center animate-fade-in"
        style={{ animationDelay: "0.5s", opacity: 0 }}
      >
        <p className="font-display text-2xl italic text-white/35">
          Доклад окончен. Спасибо за внимание.
        </p>
      </div>
    </div>
  );
}

/* ── Переиспользуемые компоненты ── */

function SlideHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-start gap-6 pb-4 border-b border-white/10 animate-fade-in">
      <span className="font-display text-6xl font-semibold text-white/[0.07] leading-none mt-1 shrink-0">
        {number}
      </span>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight pt-1">
        {title}
      </h2>
    </div>
  );
}

function BlockLabel({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`w-3 h-3 rounded-sm shrink-0 ${accent ? "bg-[#C60C30]" : "bg-[#003478]"}`} />
      <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/50">
        {children}
      </span>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C60C30] shrink-0" />
      <span className="font-sans text-base md:text-lg text-white/80 leading-snug">{children}</span>
    </li>
  );
}

function LiSmall({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 w-1 h-1 rounded-full bg-white/30 shrink-0" />
      <span className="font-sans text-sm md:text-base text-white/65 leading-snug">{children}</span>
    </li>
  );
}

function PlanCard({
  period, title, items, note, highlight, delay,
}: {
  period: string;
  title: string;
  items: string[];
  note?: string;
  highlight?: boolean;
  delay?: string;
}) {
  return (
    <div
      className={`flex flex-col p-5 rounded-sm border animate-slide-up ${
        highlight
          ? "border-[#C60C30]/50 bg-[#C60C30]/5"
          : "border-white/10 bg-white/[0.03]"
      }`}
      style={{ animationDelay: delay, opacity: 0 }}
    >
      <p className="font-sans text-xs tracking-widest uppercase text-white/35 mb-1">{period}</p>
      <h3 className="font-display text-xl font-semibold text-white mb-4 leading-tight">{title}</h3>
      <ul className="flex-1 space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${highlight ? "bg-[#C60C30]" : "bg-white/25"}`} />
            <span className="font-sans text-sm text-white/70 leading-snug">{item}</span>
          </li>
        ))}
      </ul>
      {note && (
        <p className="mt-4 pt-3 border-t border-[#C60C30]/30 font-sans text-xs text-[#C60C30]/80">
          ⚑ {note}
        </p>
      )}
    </div>
  );
}
