import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const slides = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

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
    <div className="min-h-screen bg-[#F7F5F0] text-[#1a1a1a] flex flex-col select-none overflow-hidden">
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#C60C30]" />
        <div className="flex-1 bg-[#1a1a1a]/15" />
        <div className="flex-1 bg-[#003478]" />
      </div>

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

      <nav className="flex items-center justify-between px-10 py-5 border-t border-black/10">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 text-black/40 hover:text-black disabled:opacity-20 transition-all duration-200 font-sans text-sm tracking-widest uppercase"
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
                  : "w-2 h-2 bg-black/20 hover:bg-black/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 text-black/40 hover:text-black disabled:opacity-20 transition-all duration-200 font-sans text-sm tracking-widest uppercase"
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
        <div className="absolute top-8 right-12 w-64 h-64 rounded-full border border-black/5" />
        <div className="absolute top-16 right-20 w-40 h-40 rounded-full border border-black/5" />
        <div className="absolute bottom-16 left-8 w-48 h-48 rounded-full border border-[#C60C30]/10" />
        <div className="absolute -bottom-8 left-24 text-[200px] font-display text-black/[0.04] leading-none select-none">
          한국
        </div>
      </div>

      <div className="relative z-10 animate-fade-in">
        <p className="font-sans text-sm tracking-[0.3em] uppercase text-[#C60C30] mb-6">
          Выпускная квалификационная работа
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#1a1a1a] max-w-4xl mb-8">
          Реализация публичной дипломатии Республики Корея в странах Центральной Азии
        </h1>
        <div className="w-24 h-px bg-[#C60C30] mx-auto mb-8 animate-line-grow" />
        <p className="font-display text-xl italic text-[#1a1a1a]/55 mb-10">
          в рамках Базового плана публичной дипломатии 2022–2027
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-1 text-[#1a1a1a]/45 font-sans text-sm animate-fade-in">
        <span>Студент: [Имя Фамилия]</span>
        <span>Научный руководитель: [ФИО]</span>
        <span className="mt-2 text-[#1a1a1a]/30">[Университет] · [Год]</span>
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
          <p className="mt-3 text-[#1a1a1a]/65 font-sans text-base leading-relaxed">
            Классические подходы к публичной дипломатии. Средние державы используют «мягкую силу» как компенсацию ограниченных ресурсов «жёсткой силы».
          </p>
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <BlockLabel accent>Цель</BlockLabel>
          <p className="mt-3 text-[#1a1a1a]/65 font-sans text-base leading-relaxed">
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

/* ── СЛАЙД 5: Спасибо ── */
function Slide5() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-16 py-12 text-center relative overflow-hidden">
      {/* Фоновый орнамент */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-black/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-black/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[#C60C30]/10" />
        <div className="absolute bottom-4 right-12 text-[180px] font-display text-black/[0.03] leading-none select-none">
          감사
        </div>
      </div>

      <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0s" }}>
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#1a1a1a]/35 mb-10">
          Выпускная квалификационная работа · 2025
        </p>

        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold text-[#1a1a1a] leading-none mb-6">
          Спасибо
        </h1>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#1a1a1a] leading-none mb-10">
          за внимание
        </h2>

        <div className="w-16 h-px bg-[#C60C30] mx-auto mb-10 animate-line-grow" />

        <p className="font-display text-xl italic text-[#1a1a1a]/45 mb-14">
          Готова ответить на ваши вопросы
        </p>
      </div>

      <div
        className="relative z-10 grid grid-cols-3 gap-8 w-full max-w-2xl animate-slide-up"
        style={{ animationDelay: "0.4s", opacity: 0 }}
      >
        <div className="text-center">
          <p className="font-sans text-xs tracking-widest uppercase text-[#1a1a1a]/30 mb-1">Тема</p>
          <p className="font-sans text-sm text-[#1a1a1a]/60 leading-snug">Публичная дипломатия Кореи в ЦА</p>
        </div>
        <div className="text-center border-x border-black/10">
          <p className="font-sans text-xs tracking-widest uppercase text-[#1a1a1a]/30 mb-1">Период</p>
          <p className="font-sans text-sm text-[#1a1a1a]/60 leading-snug">Базовый план 2022–2027</p>
        </div>
        <div className="text-center">
          <p className="font-sans text-xs tracking-widest uppercase text-[#1a1a1a]/30 mb-1">Студент</p>
          <p className="font-sans text-sm text-[#1a1a1a]/60 leading-snug">[Имя Фамилия]</p>
        </div>
      </div>
    </div>
  );
}

/* ── Переиспользуемые компоненты ── */

function SlideHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-start gap-6 pb-4 border-b border-black/10 animate-fade-in">
      <span className="font-display text-6xl font-semibold text-black/[0.06] leading-none mt-1 shrink-0">
        {number}
      </span>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1a1a1a] leading-tight pt-1">
        {title}
      </h2>
    </div>
  );
}

function BlockLabel({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`w-3 h-3 rounded-sm shrink-0 ${accent ? "bg-[#C60C30]" : "bg-[#003478]"}`} />
      <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/45">
        {children}
      </span>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C60C30] shrink-0" />
      <span className="font-sans text-base md:text-lg text-[#1a1a1a]/80 leading-snug">{children}</span>
    </li>
  );
}

function LiSmall({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 w-1 h-1 rounded-full bg-black/30 shrink-0" />
      <span className="font-sans text-sm md:text-base text-[#1a1a1a]/60 leading-snug">{children}</span>
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
          ? "border-[#C60C30]/40 bg-[#C60C30]/5"
          : "border-black/10 bg-black/[0.02]"
      }`}
      style={{ animationDelay: delay, opacity: 0 }}
    >
      <p className="font-sans text-xs tracking-widest uppercase text-[#1a1a1a]/35 mb-1">{period}</p>
      <h3 className="font-display text-xl font-semibold text-[#1a1a1a] mb-4 leading-tight">{title}</h3>
      <ul className="flex-1 space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${highlight ? "bg-[#C60C30]" : "bg-black/25"}`} />
            <span className="font-sans text-sm text-[#1a1a1a]/65 leading-snug">{item}</span>
          </li>
        ))}
      </ul>
      {note && (
        <p className="mt-4 pt-3 border-t border-[#C60C30]/30 font-sans text-xs text-[#C60C30]">
          ⚑ {note}
        </p>
      )}
    </div>
  );
}