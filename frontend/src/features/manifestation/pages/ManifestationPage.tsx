import React, { useState } from 'react';
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
  children: React.ReactNode;
}

function Collapsible({ title, count, icon, isOpen, onToggle, accentColor, children }: CollapsibleProps) {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(220,180,150,0.1)' }}>
      {/* Header trigger */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors duration-200"
        style={{ background: 'rgba(220,180,150,0.04)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-base">{icon}</span>
          <span className="text-sm font-medium tracking-wide" style={{ color: 'rgba(240,215,195,0.85)' }}>
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
          style={{ color: 'rgba(240,215,195,0.3)' }}
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
  const { mutateAsync: create, isPending } = useCreateManifestation();

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

  // Palette tokens
  const bg = '#160e0a';
  const surface = 'rgba(220,180,150,0.04)';
  const border = 'rgba(220,180,150,0.10)';
  const textPrimary = 'rgba(240,215,195,0.92)';
  const textMuted = 'rgba(220,185,160,0.38)';
  const textLabel = 'rgba(220,185,160,0.45)';
  const accent = '#c2673a';
  const accentLight = '#e08c5a';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: bg, color: textPrimary }}>

      {/* Header */}
      <header className="px-6 py-5" style={{ borderBottom: `1px solid ${border}` }}>
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accentLight})` }}
          >
            ✦
          </div>
          <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: textMuted }}>
            Manifestar
          </span>
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
                      background: `linear-gradient(90deg, ${accentLight}, #e0a878)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      manifestar?
                    </span>
                  </h1>
                  <p className="text-sm font-light" style={{ color: textMuted }}>
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
                      className="w-full rounded-xl px-4 py-3.5 text-sm font-light outline-none transition-all duration-250"
                      style={{
                        background: surface,
                        border: `1px solid ${border}`,
                        color: textPrimary,
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = `${accent}80`}
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
                      className="w-full rounded-xl px-4 py-3.5 text-sm font-light outline-none transition-all duration-250 resize-none"
                      style={{
                        background: surface,
                        border: `1px solid ${border}`,
                        color: textPrimary,
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = `${accent}80`}
                      onBlur={e => e.currentTarget.style.borderColor = border}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending || !title.trim() || !description.trim()}
                    className="w-full rounded-xl py-4 text-sm font-medium tracking-wide transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, ${accentLight})`,
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
                    style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
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
                  >
                    {result.affirmations.map((text, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl px-4 py-3.5 text-sm font-light leading-relaxed"
                        style={{
                          background: 'rgba(220,180,150,0.07)',
                          border: '1px solid rgba(220,180,150,0.10)',
                          color: 'rgba(240,215,195,0.82)',
                        }}
                      >
                        <span className="mt-0.5 text-xs flex-shrink-0" style={{ color: accentLight }}>✦</span>
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
                    accentColor="#d4895a"
                  >
                    {result.suggestedActions.map((text, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl px-4 py-3.5 text-sm font-light leading-relaxed"
                        style={{
                          background: 'rgba(180,120,80,0.09)',
                          border: '1px solid rgba(200,140,100,0.12)',
                          color: 'rgba(240,215,195,0.82)',
                        }}
                      >
                        <span className="mt-0.5 text-xs flex-shrink-0" style={{ color: '#d4895a' }}>◈</span>
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
        <p className="text-center text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(220,185,160,0.18)' }}>
          Manifestar · Ley de Atracción
        </p>
      </footer>
    </div>
  );
}