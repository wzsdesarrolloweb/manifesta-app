import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreateManifestation } from '../hooks/useManifestations';
import type { Manifestation } from '../types/manifestation.types';

// ── Collapsible section ───────────────────────────────────────────────────────
interface CollapsibleProps {
  title: string;
  count: number;
  icon: string;
  isOpen: boolean;
  onToggle: () => void;
  accentColor: string;
  theme: 'dark' | 'light';
  children: React.ReactNode;
}

function Collapsible({ title, count, icon, isOpen, onToggle, accentColor, theme, children }: CollapsibleProps) {
  const isDark = theme === 'dark';
  const colBorder  = isDark ? 'rgba(155,93,229,0.22)' : 'rgba(90,130,30,0.22)';
  const colHeaderBg = isDark ? 'rgba(155,93,229,0.08)' : 'rgba(90,130,30,0.07)';
  const colTitle   = isDark ? 'rgba(248,245,240,0.97)' : 'rgba(18,38,8,0.95)';
  const colArrow   = isDark ? 'rgba(215,210,205,0.65)' : 'rgba(50,80,20,0.55)';
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: colBorder }}>
      {/* Header trigger */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors duration-200"
        style={{ background: colHeaderBg }}
      >
        <div className="flex items-center gap-3">
          <span className="text-base">{icon}</span>
          <span className="text-sm font-medium tracking-wide" style={{ color: colTitle }}>
            {title}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${accentColor}22`, color: accentColor }}
          >
            {count}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{ color: colArrow }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </button>

      {/* Animated content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4 pt-1 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ManifestationPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<Manifestation | null>(null);
  const [openAffirmations, setOpenAffirmations] = useState(true);
  const [openActions, setOpenActions] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  );
  const { mutateAsync: create, isPending } = useCreateManifestation();

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.style.backgroundColor = theme === 'dark' ? '#0a0f1e' : '#f5f9e8';
    document.body.style.backgroundColor = theme === 'dark' ? '#0a0f1e' : '#f5f9e8';
  }, [theme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    try {
      const manifestation = await create({ title, description });
      setResult(manifestation);
      setOpenAffirmations(true);
      setOpenActions(false);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating manifestation:', error);
    }
  };

  // Palette tokens — dual theme
  const isDark = theme === 'dark';
  // ── DARK: noche azul + textos blanco tiza ──
  // ── LIGHT: verde salvia claro + textos bosque ──
  const bg          = isDark ? '#0a0f1e' : '#f5f9e8';
  const surface     = isDark ? 'rgba(155,93,229,0.07)' : 'rgba(90,130,30,0.07)';
  const border      = isDark ? 'rgba(155,93,229,0.20)' : 'rgba(90,130,30,0.18)';
  const textPrimary = isDark ? 'rgba(248,245,240,0.97)' : 'rgba(18,38,8,0.95)';
  const textMuted   = isDark ? 'rgba(215,210,205,0.82)' : 'rgba(50,80,20,0.84)';
  const textLabel   = isDark ? 'rgba(205,200,195,0.76)' : 'rgba(50,80,20,0.76)';
  const accent      = isDark ? '#9b5de5' : '#5a8a1e';
  const accentLight = isDark ? '#c77dff' : '#7ab82a';
  const chakraGradient = 'linear-gradient(90deg, #e63946, #f4872b, #ffd166, #06d6a0, #118ab2, #4361ee, #9b5de5)';
  const chakraColors   = ['#e63946', '#f4872b', '#ffd166', '#06d6a0', '#118ab2', '#4361ee', '#9b5de5'];
  // Card tokens
  const cardText      = isDark ? 'rgba(248,245,240,0.98)' : 'rgba(18,38,8,0.96)';
  const affirmCardBg  = isDark ? 'rgba(155,93,229,0.09)' : 'rgba(90,130,30,0.09)';
  const affirmCardBdr = isDark ? '1px solid rgba(155,93,229,0.20)' : '1px solid rgba(90,130,30,0.22)';
  const actionCardBg  = isDark ? 'rgba(6,214,160,0.08)'  : 'rgba(170,200,20,0.11)';
  const actionCardBdr = isDark ? '1px solid rgba(6,214,160,0.20)' : '1px solid rgba(170,200,20,0.28)';
  const textFooter    = isDark ? 'rgba(215,210,205,0.48)' : 'rgba(50,80,20,0.48)';

  const inputClass = `w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 ${isDark ? 'font-light' : ''}`;

  return (
    <>
    <style>{`
      .mf-field::placeholder { color: ${isDark ? 'rgba(215,210,205,0.42)' : 'rgba(50,80,20,0.42)'}; }
    `}</style>
    <div className="min-h-screen flex flex-col" style={{ background: bg, color: textPrimary }}>

      {/* Header */}
      <header className="px-6 py-5" style={{ borderBottom: `1px solid ${border}` }}>
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
            style={{ background: chakraGradient }}
          >
            ✦
          </div>
          <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: textMuted }}>
            Manifestar
          </span>
          <button
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            className="ml-auto rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
            style={{ background: surface, border: `1px solid ${border}`, color: textMuted }}
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDark ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">

            {/* ── FORM ── */}
            {!result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="mb-10">
                  <h1 className="text-[2.2rem] font-light leading-snug tracking-tight mb-2">
                    ¿Qué deseas<br />
                    <span style={{
                      background: chakraGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      manifestar?
                    </span>
                  </h1>
                  <p className={`text-sm ${isDark ? 'font-light' : ''}`} style={{ color: textMuted }}>
                    Escribe tu intención con claridad. El universo escucha.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: textLabel }}>
                      Intención
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ej: Abundancia y prosperidad"
                      className={`${inputClass} mf-field`}
                      style={{
                        background: surface,
                        border: `1px solid ${border}`,
                        color: textPrimary,
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = `${accent}90`}
                      onBlur={e => e.currentTarget.style.borderColor = border}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: textLabel }}>
                      Descripción
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe tu deseo con detalle y emoción..."
                      rows={5}
                      className={`${inputClass} resize-none mf-field`}
                      style={{
                        background: surface,
                        border: `1px solid ${border}`,
                        color: textPrimary,
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = `${accent}90`}
                      onBlur={e => e.currentTarget.style.borderColor = border}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending || !title.trim() || !description.trim()}
                    className="w-full rounded-xl py-4 text-sm font-medium tracking-wide transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: chakraGradient,
                      color: '#fff',
                    }}
                  >
                    {isPending ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Generando...
                      </>
                    ) : (
                      'Generar manifestación'
                    )}
                  </button>
                </form>
              </motion.div>

            ) : (

              /* ── RESULT ── */
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {/* Badge + title */}
                <div className="mb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4"
                    style={{ background: `${accent}20`, border: `1px solid ${accent}50` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentLight }} />
                    <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: accentLight }}>
                      Lista
                    </span>
                  </motion.div>
                  <h2 className="text-2xl font-light leading-snug tracking-tight">
                    {result.title}
                  </h2>
                </div>

                {/* Collapsibles */}
                <div className="space-y-3 mb-8">

                  {/* Affirmations */}
                  <Collapsible
                    title="Afirmaciones de poder"
                    count={result.affirmations.length}
                    icon="✦"
                    isOpen={openAffirmations}
                    onToggle={() => setOpenAffirmations(v => !v)}
                    accentColor={accentLight}
                    theme={theme}
                  >
                    {result.affirmations.map((text, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl px-4 py-3.5 text-sm leading-relaxed"
                        style={{
                          background: affirmCardBg,
                          border: affirmCardBdr,
                          color: cardText,
                        }}
                      >
                        <span className="mt-0.5 text-xs flex-shrink-0" style={{ color: chakraColors[i % 7] }}>✦</span>
                        {text}
                      </div>
                    ))}
                  </Collapsible>

                  {/* Actions */}
                  <Collapsible
                    title="Acciones sugeridas"
                    count={result.suggestedActions.length}
                    icon="◈"
                    isOpen={openActions}
                    onToggle={() => setOpenActions(v => !v)}
                    accentColor="#06d6a0"
                    theme={theme}
                  >
                    {result.suggestedActions.map((text, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl px-4 py-3.5 text-sm leading-relaxed"
                        style={{
                          background: actionCardBg,
                          border: actionCardBdr,
                          color: cardText,
                        }}
                      >
                        <span className="mt-0.5 text-xs flex-shrink-0" style={{ color: chakraColors[(i + 3) % 7] }}>◈</span>
                        {text}
                      </div>
                    ))}
                  </Collapsible>
                </div>

                {/* Back button */}
                <button
                  onClick={() => setResult(null)}
                  className="w-full py-3.5 rounded-xl text-sm font-light tracking-wide transition-all duration-200"
                  style={{
                    border: `1px solid ${border}`,
                    color: textMuted,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${accent}50`;
                    e.currentTarget.style.color = textPrimary;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = border;
                    e.currentTarget.style.color = textMuted;
                  }}
                >
                  Nueva manifestación
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4" style={{ borderTop: `1px solid ${border}` }}>
        <p className="text-center text-[10px] tracking-[0.25em] uppercase" style={{ color: textFooter }}>
          Manifestar · Ley de Atracción
        </p>
      </footer>
    </div>
  </>
  );
}