import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Flower2, Heart, Mail, Music2, Pause, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { letterContent as content } from "@/data/letterContent";

const AmbientPetals = lazy(() => import("./AmbientPetals"));

type Burst = { id: number; x: number; y: number; glyph: string; drift: number };

function useAmbientMusic() {
  const contextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const stop = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    void contextRef.current?.close();
    contextRef.current = null;
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    if (contextRef.current) return;
    const AudioContextClass = window.AudioContext;
    const audioContext = new AudioContextClass();
    contextRef.current = audioContext;
    const master = audioContext.createGain();
    master.gain.setValueAtTime(0.0001, audioContext.currentTime);
    master.gain.exponentialRampToValueAtTime(0.055, audioContext.currentTime + 1.2);
    master.connect(audioContext.destination);
    const notes = [261.63, 329.63, 392, 493.88, 392, 329.63, 293.66, 349.23];
    let step = 0;
    const playNote = () => {
      if (!contextRef.current) return;
      const now = contextRef.current.currentTime;
      const oscillator = contextRef.current.createOscillator();
      const gain = contextRef.current.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(notes[step % notes.length] ?? 329.63, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
      oscillator.connect(gain).connect(master);
      oscillator.start(now);
      oscillator.stop(now + 2.5);
      step += 1;
    };
    playNote();
    timerRef.current = window.setInterval(playNote, 1450);
    setPlaying(true);
  }, []);

  useEffect(() => stop, [stop]);
  return { playing, toggle: playing ? stop : start };
}

function SectionHeading({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-16">
      <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-primary">{kicker}</p>
      <h2 className="font-serif text-4xl leading-[1.08] text-foreground sm:text-5xl md:text-6xl">{children}</h2>
    </div>
  );
}

function MusicControl({ playing, toggle }: { playing: boolean; toggle: () => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 sm:bottom-6 sm:right-6">
      <motion.div initial={false} animate={{ opacity: playing ? 1 : 0, x: playing ? 0 : 8 }} className="hidden rounded-full border border-border bg-paper/90 px-4 py-2 text-xs text-muted-foreground shadow-lg backdrop-blur-sm sm:block">
        {content.music.title}
      </motion.div>
      <Button aria-label={playing ? "Pausar música ambiental" : "Reproducir música ambiental"} title={playing ? "Pausar música" : "Reproducir música"} onClick={toggle} size="icon" className="h-12 w-12 rounded-full border border-primary/20 bg-primary text-primary-foreground shadow-xl hover:bg-primary/90">
        {playing ? <Pause /> : <Music2 />}
      </Button>
    </div>
  );
}

function Cover({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.section exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.8 }} className="relative z-10 flex min-h-svh flex-col items-center justify-between overflow-hidden px-5 py-8 text-center sm:px-8">
      <div className="flex w-full max-w-6xl items-center justify-between text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        <span>Septiembre · 2026</span><span>Para D. A.</span>
      </div>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} className="relative mx-auto max-w-4xl py-12">
        <div className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full border border-primary/25 bg-paper/80 text-primary shadow-lg backdrop-blur-sm"><Mail className="h-6 w-6" /></div>
        <p className="mb-5 font-hand text-2xl text-primary sm:text-3xl">{content.cover.eyebrow}</p>
        <h1 className="font-serif text-[clamp(3.25rem,9vw,7.8rem)] leading-[0.94] text-foreground">{content.cover.title}</h1>
        <p className="mx-auto mt-7 max-w-xl text-base font-light leading-7 text-muted-foreground sm:text-lg">{content.cover.subtitle}</p>
        <Button onClick={onEnter} className="mt-10 h-14 rounded-full border border-primary/20 bg-primary px-9 text-sm uppercase tracking-[0.18em] text-primary-foreground shadow-xl transition-transform hover:scale-[1.03] hover:bg-primary/90">
          {content.cover.cta} <Mail aria-hidden="true" />
        </Button>
      </motion.div>
      <p className="font-hand text-xl text-muted-foreground">hecho despacio, para ti</p>
    </motion.section>
  );
}

function OpeningLetter() {
  return (
    <section className="relative z-10 px-4 pb-28 pt-16 sm:px-7 md:pb-40 md:pt-24">
      <motion.div initial={{ opacity: 0, y: 70, rotateX: -8 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }} className="paper-texture relative mx-auto max-w-4xl border border-border/80 bg-paper px-6 py-16 shadow-[0_28px_80px_-30px_color-mix(in_oklab,var(--foreground)_22%,transparent)] sm:px-12 md:px-24 md:py-24">
        <div className="absolute -top-5 left-8 h-10 w-36 rotate-[-3deg] bg-rose-soft/55 shadow-sm sm:left-16" aria-hidden="true" />
        <div className="absolute right-5 top-5 grid h-20 w-16 rotate-3 place-items-center border border-primary/30 text-center text-[0.55rem] uppercase tracking-[0.18em] text-primary sm:right-9 sm:top-8"><Flower2 className="mb-1 h-5 w-5" />correo<br />especial</div>
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-primary">{content.opening.label}</p>
        <h2 className="max-w-3xl font-serif text-4xl leading-[1.08] sm:text-5xl md:text-7xl">{content.opening.title}</h2>
        <div className="gold-rule my-10 h-px w-full" />
        <p className="max-w-2xl text-base font-light leading-8 text-ink-soft sm:text-lg">{content.opening.body}</p>
        <p className="mt-12 text-right font-hand text-2xl text-primary">B.</p>
      </motion.div>
    </section>
  );
}

function MemoryTimeline() {
  return (
    <section className="relative z-10 px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="mx-auto mb-20 max-w-3xl text-center font-serif text-3xl italic leading-snug sm:text-4xl md:text-5xl">“{content.memoriesIntro}”</p>
        <div className="relative grid gap-5 md:grid-cols-3 md:gap-8">
          <div className="gold-rule absolute left-0 right-0 top-7 hidden h-px md:block" />
          {content.memories.map((memory, index) => (
            <motion.article key={memory.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.12, duration: 0.7 }} className="relative border-t border-border bg-background/75 px-5 pb-6 pt-12 backdrop-blur-sm md:border-t-0 md:px-7 md:pt-20">
              <span className="absolute left-5 top-0 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-gold/60 bg-paper font-serif text-xl text-primary md:left-7 md:top-0">{memory.symbol}</span>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">{memory.date}</p>
              <h3 className="mt-3 font-serif text-2xl">{memory.title}</h3>
              <p className="mt-4 text-sm font-light leading-7 text-muted-foreground">{memory.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Album() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    update();
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);

  return (
    <section className="relative z-10 overflow-hidden bg-foreground px-4 py-24 text-background sm:px-8 md:py-36">
      <SectionHeading kicker={content.album.kicker}>{content.album.title}</SectionHeading>
      <p className="mx-auto -mt-8 mb-10 max-w-xl text-center text-xs leading-5 text-background/55">{content.album.description}</p>
      <Carousel setApi={setApi} opts={{ loop: true, align: "center" }} className="mx-auto max-w-6xl">
        <CarouselContent className="-ml-3 py-10 md:-ml-6">
          {content.album.photos.map((photo, index) => (
            <CarouselItem key={photo.caption} className="basis-[88%] pl-3 sm:basis-[64%] md:basis-[43%] md:pl-6">
              <motion.figure animate={{ rotate: index === active ? 0 : index % 2 ? 2.5 : -2.5, y: index === active ? -8 : 10, scale: index === active ? 1 : 0.92 }} transition={{ type: "spring", stiffness: 180, damping: 22 }} className="paper-texture bg-paper p-3 pb-7 text-foreground shadow-2xl sm:p-4 sm:pb-9">
                <div className="aspect-[4/5] overflow-hidden bg-muted"><img src={photo.src} alt={photo.alt} loading="lazy" width={1200} height={1504} className="h-full w-full object-cover" /></div>
                <figcaption className="px-2 pt-5 text-center"><p className="font-hand text-2xl text-primary sm:text-3xl">{photo.caption}</p><p className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">{photo.note}</p></figcaption>
              </motion.figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-5 flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" onClick={() => api?.scrollPrev()} className="rounded-full border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground" aria-label="Foto anterior"><ArrowLeft /></Button>
          <div className="flex gap-2" aria-label={`Foto ${active + 1} de ${content.album.photos.length}`}>{content.album.photos.map((photo, index) => <button key={photo.caption} onClick={() => api?.scrollTo(index)} className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-background" : "w-1.5 bg-background/35"}`} aria-label={`Ver foto ${index + 1}`} />)}</div>
          <Button variant="outline" size="icon" onClick={() => api?.scrollNext()} className="rounded-full border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground" aria-label="Foto siguiente"><ArrowRight /></Button>
        </div>
      </Carousel>
    </section>
  );
}

function FunMoments() {
  return (
    <section className="relative z-10 px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <div><p className="font-hand text-2xl text-primary">entre tú y yo…</p><h2 className="mt-3 font-serif text-5xl leading-tight sm:text-6xl">{content.funMoments.title}</h2><div className="mt-8 flex gap-3 text-primary"><Sparkles /><Heart className="fill-rose-soft" /><Flower2 /></div></div>
        <div className="grid gap-3 sm:grid-cols-2">{content.funMoments.items.map((item, index) => <motion.div key={item} whileHover={{ rotate: index % 2 ? 1.5 : -1.5, y: -4 }} whileTap={{ scale: 0.98 }} className={`paper-texture min-h-40 border border-border bg-paper p-6 shadow-lg ${index % 2 ? "sm:translate-y-6" : ""}`}><span className="font-hand text-4xl text-gold">{index + 1}.</span><p className="mt-4 font-serif text-xl leading-snug">{item}</p></motion.div>)}</div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="relative z-10 bg-rose-soft/35 px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-6xl"><SectionHeading kicker={content.values.kicker}>{content.values.title}</SectionHeading><div className="grid border-y border-primary/15 sm:grid-cols-2 lg:grid-cols-4">{content.values.items.map((item) => <article key={item.title} className="border-b border-primary/15 px-5 py-9 last:border-b-0 sm:odd:border-r sm:nth-last-[-n+2]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"><span className="font-serif text-sm text-primary">{item.symbol}</span><h3 className="mt-8 font-serif text-2xl">{item.title}</h3><p className="mt-4 text-sm font-light leading-7 text-muted-foreground">{item.text}</p></article>)}</div></div>
    </section>
  );
}

function September() {
  return (
    <section className="relative z-10 overflow-hidden px-5 py-28 sm:px-8 md:py-44"><div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-center"><div className="font-serif text-[10rem] leading-none text-rose-soft sm:text-[14rem] md:text-[18rem]">{content.september.month}</div><div className="md:-ml-8"><p className="font-hand text-3xl text-primary">un recordatorio suave</p><h2 className="mt-2 font-serif text-6xl sm:text-7xl">{content.september.title}</h2><p className="mt-7 max-w-xl text-xl font-light leading-9 text-ink-soft">{content.september.text}</p></div></div></section>
  );
}

function PersonalLetter() {
  return (
    <section className="relative z-10 bg-foreground px-4 py-24 text-background sm:px-8 md:py-40"><motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} className="paper-texture relative mx-auto max-w-3xl bg-paper px-6 py-14 text-foreground shadow-2xl sm:px-14 md:px-24 md:py-24"><div className="absolute left-1/2 top-0 h-10 w-40 -translate-x-1/2 -translate-y-1/2 rotate-2 bg-rose-soft/65" /><p className="font-hand text-4xl text-primary">{content.letter.salutation}</p><div className="mt-10 space-y-7">{content.letter.paragraphs.map((paragraph) => <p key={paragraph} className="text-base font-light leading-8 text-ink-soft sm:text-lg sm:leading-9">{paragraph}</p>)}</div><p className="mt-12 text-right font-hand text-3xl text-primary">{content.signature}</p></motion.article></section>
  );
}

function Wishes() {
  return <section className="relative z-10 px-5 py-24 sm:px-8 md:py-36"><SectionHeading kicker="Para todo lo que viene">Mis deseos para ti</SectionHeading><div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 sm:gap-4">{content.wishes.map((wish, index) => <motion.div key={wish} whileHover={{ y: -6, rotate: index % 2 ? 1 : -1 }} className="rounded-full border border-primary/20 bg-paper px-5 py-3 text-center text-sm text-ink-soft shadow-sm sm:px-7 sm:py-4">{wish} <span className="ml-2 text-primary">✦</span></motion.div>)}</div></section>;
}

function Closing({ onSurprise, revealed }: { onSurprise: () => void; revealed: boolean }) {
  return <section className="relative z-10 flex min-h-svh items-center px-5 py-24 text-center sm:px-8"><div className="mx-auto max-w-4xl"><Flower2 className="mx-auto h-8 w-8 text-primary" /><p className="mx-auto mt-8 max-w-2xl text-base font-light leading-8 text-muted-foreground">{content.closing.preface}</p><h2 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-7xl md:text-8xl">{content.closing.title}</h2><p className="mt-10 font-hand text-4xl text-primary sm:text-5xl">{content.signature}</p><Button onClick={onSurprise} className="mt-12 h-13 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"><Sparkles />{content.closing.button}</Button><motion.p initial={false} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 }} className="mt-6 font-hand text-2xl text-primary" aria-live="polite">{content.closing.response}</motion.p></div></section>;
}

export default function LetterExperience() {
  const [entered, setEntered] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [revealed, setRevealed] = useState(false);
  const burstId = useRef(0);
  const reducedMotion = useReducedMotion();
  const { playing, toggle } = useAmbientMusic();
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const createBurst = useCallback((x: number, y: number, count = 1) => {
    const fresh = Array.from({ length: count }, (_, index) => ({ id: ++burstId.current, x: x + (index - count / 2) * 14, y, glyph: index % 3 === 0 ? "✦" : index % 2 ? "♡" : "❀", drift: (index % 2 ? 1 : -1) * (18 + index * 3) }));
    setBursts((current) => [...current.slice(-24), ...fresh]);
    window.setTimeout(() => setBursts((current) => current.filter((burst) => !fresh.some((item) => item.id === burst.id))), 1300);
  }, []);

  const handlePageTap = (event: React.PointerEvent<HTMLElement>) => {
    if (!entered || reducedMotion || (event.target as HTMLElement).closest("button")) return;
    createBurst(event.clientX, event.clientY);
  };

  const enter = () => { setEntered(true); window.setTimeout(() => document.getElementById("letter-start")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }), 120); };
  const surprise = () => { setRevealed(true); for (let row = 0; row < 5; row += 1) window.setTimeout(() => createBurst(window.innerWidth * (0.15 + row * 0.17), window.innerHeight * 0.85, 7), row * 110); };

  return (
    <main onPointerDown={handlePageTap} className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {!reducedMotion && <Suspense fallback={null}><AmbientPetals /></Suspense>}
      {bursts.map((burst) => <span key={burst.id} className="pointer-events-none fixed z-[70] text-xl text-primary" style={{ left: burst.x, top: burst.y, animation: "float-up 1.2s ease-out forwards", "--drift": `${burst.drift}px` } as React.CSSProperties}>{burst.glyph}</span>)}
      {!entered ? <Cover onEnter={enter} /> : <motion.div id="letter-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}><motion.div style={{ width: progressWidth }} className="fixed left-0 top-0 z-[60] h-0.5 bg-primary" /><OpeningLetter /><MemoryTimeline /><Album /><FunMoments /><Values /><September /><PersonalLetter /><Wishes /><Closing onSurprise={surprise} revealed={revealed} /></motion.div>}
      <MusicControl playing={playing} toggle={toggle} />
    </main>
  );
}
