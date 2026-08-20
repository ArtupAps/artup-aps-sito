import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  GraduationCap,
  Clapperboard,
  Landmark,
  Megaphone,
  Mail,
  MapPin,
  X,
  Plus,
  Calendar,
  Mic2,
  Instagram,
  Loader2,
  PenTool,
} from "lucide-react";

// 🔧 INCOLLA QUI I TUOI DATI SUPABASE (Project Settings → API)
// L'anon key è pensata per stare nel codice pubblico: non è un segreto,
// è protetta dalle policy di Row Level Security create con lo script SQL.
const SUPABASE_URL = "https://zeqwjgzoyhelepiboimi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplcXdqZ3pveWhlbGVwaWJvaW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNjk4MDAsImV4cCI6MjEwMjc0NTgwMH0.7Je8xYdEvkAErn5p4AUAGLZY9mi-Yqe22Wmp0u4yWgA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PILLARS = [
  {
    icon: Mic2,
    tag: "OGNI MESE",
    title: "Art-Up Night",
    text: "Come la stand-up, ma sale chiunque: comici, musicisti, poeti, chi vuole provarci. Palco libero, spazio aperto a tutt*.",
    rot: -1.4,
  },
  {
    icon: PenTool,
    tag: "LABORATORIO",
    title: "Scrittura & formazione",
    text: "Laboratori di scrittura creativa e percorsi tecnico-artistici. Scrivere significa ascoltarsi — e ascoltarsi in gruppo.",
    rot: 1.1,
  },
  {
    icon: Clapperboard,
    tag: "DIETRO LA CAMERA",
    title: "Cinema",
    text: "Riprese, cortometraggi, documentari. Raccontiamo quello che ci circonda con una telecamera in mano, senza troppi permessi.",
    rot: -0.8,
  },
  {
    icon: Landmark,
    tag: "PATRIMONIO",
    title: "Cultura & memoria",
    text: "Fotografia, podcast, archivi — e un progetto grande: una casa permanente per la memoria di Massimo Troisi.",
    rot: 1.5,
  },
];

const TEAM = [
  { name: "Santino" },
  { name: "Domenico" },
  { name: "Danilo" },
  { name: "Andrea" },
  { name: "Giovanni" },
  { name: "AndreaLorusso" },
  { name: "Davide", },
];

const SPOT_COLORS = ["var(--magenta)", "var(--blu)", "var(--arancio)"];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);
  return reduced;
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

export default function ArtUpSite() {
  const reducedMotion = usePrefersReducedMotion();
  const [stamped, setStamped] = useState(false);
  const bachecaRef = useRef(null);
  const troisiRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) {
      setStamped(true);
      return;
    }
    const t = setTimeout(() => setStamped(true), 250);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });

  return (
    <div className="au-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Permanent+Marker&family=Archivo:ital,wght@0,400;0,500;0,700;0,800;0,900;1,700&display=swap');

        .au-root {
          --nero: #0D0D0D;
          --nero-2: #171717;
          --carta: #F2EEE4;
          --magenta: #E31C79;
          --blu: #1E4FDE;
          --arancio: #FF5A1F;
          --giallo: #FFD400;
          font-family: 'Archivo', sans-serif;
          background: var(--nero);
          color: var(--carta);
          width: 100%;
          overflow-x: hidden;
        }
        .au-root * { box-sizing: border-box; }
        .au-bungee { font-family: 'Bungee', cursive; }
        .au-marker { font-family: 'Permanent Marker', cursive; }

        .au-section { padding: 5rem 1.25rem; max-width: 76rem; margin: 0 auto; }
        @media (min-width: 768px) { .au-section { padding: 6.5rem 2.5rem; } }

        .au-noise {
          background-image: radial-gradient(rgba(242,238,228,0.05) 1px, transparent 1px);
          background-size: 14px 14px;
        }

        .au-eyebrow {
          font-family: 'Archivo', sans-serif;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 0.72rem;
          padding: 0.25rem 0.6rem;
          display: inline-block;
          margin-bottom: 1.2rem;
          background: var(--giallo);
          color: var(--nero);
          transform: rotate(-1.5deg);
        }

        /* ---------- HERO ---------- */
        .au-hero {
          position: relative;
          min-height: 100vh; min-height: 100dvh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: 3rem 1.25rem;
          overflow: hidden;
        }
        .au-hero-tape {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%) rotate(-2deg);
          width: 140px; height: 34px; background: rgba(255,212,0,0.85);
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .au-badge {
          width: clamp(160px, 32vw, 240px);
          height: clamp(160px, 32vw, 240px);
          border-radius: 50%;
          background: var(--carta);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 2rem;
          transform: rotate(-8deg) scale(0.7);
          opacity: 0;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          position: relative;
        }
        .au-badge--in { transform: rotate(-6deg) scale(1); opacity: 1; }
        .au-badge-text .au-badge-okk {
          font-family: 'Archivo', sans-serif;
          font-weight: 900;
          font-size: 0.62rem !important;
          letter-spacing: 0.28em !important;
          color: var(--nero);
          opacity: 0.7;
          margin-bottom: 0.15rem;
        }
        .au-badge-text {
          font-family: 'Bungee', cursive;
          color: var(--nero);
          line-height: 0.85;
          text-align: center;
        }
        .au-badge-text span { display: block; font-size: clamp(1.6rem, 5vw, 2.5rem); letter-spacing: -0.01em; }

        .au-hero-title {
          font-size: clamp(2.6rem, 9vw, 5.5rem);
          line-height: 0.98;
          margin: 0 0 1.2rem;
          max-width: 20ch;
        }
        .au-hero-title .au-hl { color: var(--magenta); }
        .au-hero-tagline {
          font-size: clamp(1.02rem, 2.1vw, 1.3rem);
          color: var(--carta);
          opacity: 0.82;
          max-width: 34rem;
          margin: 0 auto 2.4rem;
          line-height: 1.55;
        }
        .au-hero-ctas { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        .au-btn {
          font-family: 'Archivo', sans-serif;
          font-weight: 800;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          padding: 0.9rem 1.6rem;
          border: 3px solid var(--nero);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          display: inline-flex; align-items: center; gap: 0.5rem;
          box-shadow: 4px 4px 0 var(--nero);
        }
        .au-btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--nero); }
        .au-btn:active { transform: translate(1px, 1px); box-shadow: 2px 2px 0 var(--nero); }
        .au-btn:focus-visible { outline: 3px solid var(--giallo); outline-offset: 3px; }
        .au-btn-magenta { background: var(--magenta); color: var(--carta); border-color: var(--carta); }
        .au-btn-yellow { background: var(--giallo); color: var(--nero); }
        .au-btn-outline { background: transparent; color: var(--carta); border-color: var(--carta); box-shadow: 4px 4px 0 rgba(242,238,228,0.4); }
        .au-btn-outline:hover { box-shadow: 6px 6px 0 rgba(242,238,228,0.4); }

        /* ---------- FLYER CARDS (pillars) ---------- */
        .au-head-block { max-width: 42rem; margin: 0 auto 3rem; text-align: center; }
        .au-head-title { font-size: clamp(1.9rem, 4.2vw, 2.7rem); margin: 0 0 0.9rem; line-height: 1.05; }
        .au-head-sub { color: var(--carta); opacity: 0.75; font-size: 1rem; line-height: 1.6; }

        .au-flyers { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        @media (min-width: 700px) { .au-flyers { grid-template-columns: 1fr 1fr; gap: 2.2rem 2rem; } }

        .au-flyer {
          background: var(--carta);
          color: var(--nero);
          padding: 1.8rem 1.6rem;
          position: relative;
          box-shadow: 7px 7px 0 rgba(0,0,0,0.5);
        }
        .au-flyer-tape {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%) rotate(-3deg);
          width: 70px; height: 24px; background: rgba(255,212,0,0.8);
        }
        .au-flyer-icon {
          width: 2.6rem; height: 2.6rem; border-radius: 50%;
          background: var(--nero); color: var(--carta);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .au-flyer-tag { font-weight: 900; font-size: 0.68rem; letter-spacing: 0.12em; color: var(--magenta); display: block; margin-bottom: 0.4rem; }
        .au-flyer-title { font-family: 'Bungee', cursive; font-size: 1.3rem; margin: 0 0 0.6rem; line-height: 1.15; }
        .au-flyer-text { font-size: 0.95rem; line-height: 1.55; margin: 0; opacity: 0.85; }

        /* ---------- REGOLAMENTO ---------- */
        .au-rules { max-width: 42rem; margin: 0 auto; display: flex; flex-direction: column; gap: 0.9rem; }
        .au-rule {
          display: flex; gap: 1rem; align-items: baseline;
          background: var(--nero-2); border-left: 5px solid var(--giallo);
          padding: 1rem 1.2rem;
        }
        .au-rule-num { font-family: 'Bungee', cursive; font-size: 1.3rem; color: var(--giallo); flex-shrink: 0; }
        .au-rule-text { font-size: 1rem; line-height: 1.5; margin: 0; }
        .au-rule-text strong { color: var(--magenta); }
        .au-rules-more { text-align: center; margin-top: 1.4rem; opacity: 0.6; font-size: 0.9rem; }

        /* ---------- TROISI ---------- */
        .au-troisi { position: relative; }
        .au-troisi-card {
          background: var(--carta); color: var(--nero);
          padding: 2.4rem 1.8rem;
          position: relative;
          box-shadow: 9px 9px 0 var(--arancio);
        }
        @media (min-width: 768px) { .au-troisi-card { padding: 3.2rem; } }
        .au-troisi-title { font-family: 'Bungee', cursive; font-size: clamp(1.7rem, 4vw, 2.5rem); line-height: 1.08; margin: 0 0 1.2rem; }
        .au-troisi-text { font-size: 1.02rem; line-height: 1.65; margin: 0 0 1.6rem; opacity: 0.85; }
        .au-troisi-marker { font-size: 1.15rem; color: var(--magenta); margin: 0; }

        /* ---------- BACHECA ---------- */
        .au-bacheca-head { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: space-between; align-items: flex-end; margin-bottom: 2.2rem; }
        .au-bacheca-sub { color: var(--carta); opacity: 0.7; font-size: 0.96rem; max-width: 30rem; line-height: 1.55; margin-top: 0.6rem; }

        .au-post-form {
          background: var(--carta); color: var(--nero);
          padding: 1.6rem; margin-bottom: 2.2rem;
          box-shadow: 6px 6px 0 var(--blu);
        }
        .au-field-row { display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 1rem; }
        @media (min-width: 640px) { .au-field-row--split { grid-template-columns: 1fr 1fr; } }
        .au-label { font-weight: 800; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.6; display: block; margin-bottom: 0.4rem; }
        .au-input, .au-textarea, .au-select {
          width: 100%; font-family: 'Archivo', sans-serif; font-size: 0.95rem;
          padding: 0.7rem 0.8rem; border: 2px solid var(--nero); background: #fff; color: var(--nero);
        }
        .au-input:focus, .au-textarea:focus, .au-select:focus { outline: 3px solid var(--blu); outline-offset: 1px; }
        .au-textarea { resize: vertical; min-height: 5rem; }

        .au-posts { display: flex; flex-direction: column; gap: 1.3rem; }
        .au-post {
          background: var(--carta); color: var(--nero);
          padding: 1.4rem 1.6rem;
          position: relative;
          box-shadow: 6px 6px 0 var(--post-color, var(--magenta));
        }
        .au-post-tag {
          font-weight: 900; font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase;
          background: var(--post-color, var(--magenta)); color: var(--carta);
          padding: 0.2rem 0.5rem; display: inline-block;
        }
        .au-post-title { font-family: 'Bungee', cursive; font-size: 1.15rem; margin: 0.6rem 0 0.5rem; line-height: 1.2; }
        .au-post-text { line-height: 1.55; font-size: 0.94rem; margin: 0 0 0.7rem; opacity: 0.85; white-space: pre-wrap; }
        .au-post-meta { font-weight: 700; font-size: 0.72rem; opacity: 0.55; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
        .au-post-delete { position: absolute; top: 0.8rem; right: 0.8rem; background: none; border: none; color: var(--nero); opacity: 0.35; cursor: pointer; padding: 0.3rem; }
        .au-post-delete:hover { opacity: 1; }
        .au-empty { text-align: center; padding: 3rem 1.5rem; border: 2px dashed rgba(242,238,228,0.3); color: var(--carta); opacity: 0.6; }

        /* ---------- TEAM ---------- */
        .au-team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        @media (min-width: 700px) { .au-team-grid { grid-template-columns: repeat(4, 1fr); } }
        .au-team-card { background: var(--nero-2); border: 2px solid rgba(242,238,228,0.15); padding: 1.4rem 1.1rem; }
        .au-team-name { font-weight: 800; font-size: 0.98rem; margin: 0 0 0.4rem; line-height: 1.25; }
        .au-team-role { font-size: 0.68rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--giallo); font-weight: 700; }

        /* ---------- SOSTIENICI ---------- */
        .au-sostienici { text-align: center; }
        .au-sostienici-text { color: var(--carta); opacity: 0.78; max-width: 34rem; margin: 0 auto 2rem; line-height: 1.65; font-size: 1rem; }

        /* ---------- FOOTER ---------- */
        .au-footer { padding: 3rem 1.5rem 2.5rem; text-align: center; border-top: 2px solid rgba(242,238,228,0.12); }
        .au-footer-mark { font-family: 'Bungee', cursive; font-size: 1.5rem; margin-bottom: 1rem; }
        .au-footer-row { display: flex; gap: 1.6rem; justify-content: center; flex-wrap: wrap; font-size: 0.85rem; margin-bottom: 1.2rem; }
        .au-footer-row a { color: var(--carta); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; opacity: 0.75; }
        .au-footer-row a:hover { opacity: 1; color: var(--giallo); }
        .au-footer-fine { font-size: 0.7rem; opacity: 0.4; }

        .au-spin { animation: au-spin-kf 0.8s linear infinite; }
        @keyframes au-spin-kf { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) {
          .au-badge, .au-btn { transition: none !important; }
          .au-spin { animation: none !important; }
        }
      `}</style>

      {/* ---------- HERO ---------- */}
      <section className="au-hero au-noise">
        <div className="au-hero-tape" />
        <div className={`au-badge ${stamped ? "au-badge--in" : ""}`}>
          <div className="au-badge-text">
            <span className="au-badge-okk">OKKUPATA</span>
            <span>ART</span>
            <span>UP</span>
          </div>
        </div>
        <h1 className="au-hero-title au-bungee">
          Non è stand-up.<br />È <span className="au-hl">Art-Up</span>.
        </h1>
        <p className="au-hero-tagline">
          Il palco è libero e può salirci qualsiasi artista. Spettacolo, scrittura,
          cinema e memoria di Napoli — fatti da chi Napoli la vive, non da chi la racconta da fuori.
        </p>
        <div className="au-hero-ctas">
          <button className="au-btn au-btn-magenta" onClick={() => scrollTo(troisiRef)}>Il progetto Troisi</button>
          <button className="au-btn au-btn-outline" onClick={() => scrollTo(bachecaRef)}>Bacheca &amp; call artisti</button>
        </div>
      </section>

      {/* ---------- COSA FACCIAMO ---------- */}
      <section className="au-section">
        <div className="au-head-block">
          <span className="au-eyebrow">Cosa facciamo</span>
          <h2 className="au-head-title au-bungee">Quattro cose, una sola bacheca</h2>
          <p className="au-head-sub">
            ArtUp APS nasce da un'idea semplice: uno spazio libero dove chiunque
            può esibirsi, imparare e riprendere o custodire un pezzo di cultura napoletana.
          </p>
        </div>
        <div className="au-flyers">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div className="au-flyer" key={p.title} style={{ transform: `rotate(${p.rot}deg)` }}>
                <div className="au-flyer-tape" />
                <div className="au-flyer-icon"><Icon size={18} strokeWidth={2} /></div>
                <span className="au-flyer-tag">{p.tag}</span>
                <h3 className="au-flyer-title">{p.title}</h3>
                <p className="au-flyer-text">{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- REGOLAMENTO ---------- */}
      <section className="au-section">
        <div className="au-head-block">
          <span className="au-eyebrow">Regolamento</span>
          <h2 className="au-head-title au-bungee">Le regole dell'Art-Up</h2>
        </div>
        <div className="au-rules">
          <div className="au-rule">
            <span className="au-rule-num au-bungee">1.</span>
            <p className="au-rule-text">Non si spiega mai cosa stai facendo sul palco. Non dire <strong>"sto iniziando"</strong>: lo fai e basta.</p>
          </div>
          <div className="au-rule">
            <span className="au-rule-num au-bungee">2.</span>
            <p className="au-rule-text">Non si spiega <strong>mai</strong> la battuta. Mai.</p>
          </div>
        </div>
        <p className="au-rules-more">Altre 6 regole. Le scopri solo salendo sul palco.</p>
      </section>

      {/* ---------- TROISI ---------- */}
      <section className="au-section au-troisi" ref={troisiRef}>
        <span className="au-eyebrow">Il progetto grande</span>
        <div className="au-troisi-card">
          <h2 className="au-troisi-title">Una casa vera per Massimo Troisi</h2>
          <p className="au-troisi-text">
            Stiamo raccogliendo materiali, cimeli e testimonianze originali donati
            da chi lo ha conosciuto, per aprire una mostra permanente nel centro
            storico di Napoli. Non un museo polveroso: un posto vivo, come tutto
            il resto di quello che facciamo. Abbiamo anche un donatore di Lusso
          </p>
          <p className="au-troisi-marker au-marker">— si accettano idee, materiali, una mano a montare.</p>
        </div>
      </section>

      {/* ---------- BACHECA ---------- */}
      <section className="au-section" ref={bachecaRef}>
        <Bacheca />
      </section>

      {/* ---------- TEAM ---------- */}
      <section className="au-section">
        <span className="au-eyebrow">Chi c'è dietro</span>
        <h2 className="au-head-title au-bungee" style={{ marginBottom: "2rem" }}>Il Consiglio Direttivo</h2>
        <div className="au-team-grid">
          {TEAM.map((m) => (
            <div className="au-team-card" key={m.name}>
              <p className="au-team-name">{m.name}</p>
              <span className="au-team-role">{m.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- SOSTIENICI ---------- */}
      <section className="au-section au-sostienici">
        <span className="au-eyebrow">Sostienici</span>
        <h2 className="au-head-title au-bungee">Dona, sponsorizza, partecipa</h2>
        <p className="au-sostienici-text">
          Come APS in fase di iscrizione al RUNTS, le donazioni danno diritto ad
          agevolazioni fiscali; per le aziende è possibile anche una sponsorizzazione.
          Scrivici, ne parliamo.
        </p>
        <a href="mailto:info@artup-aps.it" className="au-btn au-btn-yellow" style={{ textDecoration: "none" }}>
          <Mail size={16} /> Scrivici
        </a>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="au-footer">
        <p className="au-footer-mark au-bungee">ArtUp</p>
        <div className="au-footer-row">
          <a href="mailto:info@artup-aps.it"><Mail size={14} /> info@artup-aps.it</a>
          <a href="https://www.instagram.com/artup.art.up" target="_blank" rel="noopener noreferrer">
            <Instagram size={14} /> @artup.art.up
          </a>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", opacity: 0.75 }}>
            <MapPin size={14} /> Napoli
          </span>
        </div>
        <p className="au-footer-fine">ArtUp APS · Associazione di Promozione Sociale · Napoli, Italia</p>
      </footer>
    </div>
  );
}

/* =========================================================
   BACHECA — annunci e call per artisti, storage condiviso
   ========================================================= */
function Bacheca() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState({ type: "annuncio", title: "", author: "", text: "", deadline: "" });

  useEffect(() => {
    (async () => {
      const { data, error: fetchError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (fetchError) {
        setError(true);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async () => {
    if (!draft.title.trim() || !draft.text.trim()) return;
    setSaving(true);
    const { data, error: insertError } = await supabase
      .from("posts")
      .insert([{
        type: draft.type,
        title: draft.title.trim(),
        author: draft.author.trim() || "ArtUp",
        content: draft.text.trim(),
        deadline: draft.deadline || null,
      }])
      .select();
    if (insertError) {
      setError(true);
    } else if (data && data[0]) {
      setPosts([data[0], ...posts]);
      setDraft({ type: "annuncio", title: "", author: "", text: "", deadline: "" });
      setFormOpen(false);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    const { error: deleteError } = await supabase.from("posts").delete().eq("id", id);
    if (deleteError) {
      setError(true);
    } else {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <div className="au-bacheca-head">
        <div>
          <span className="au-eyebrow">Bacheca</span>
          <h2 className="au-head-title au-bungee">Annunci &amp; call per artisti</h2>
          <p className="au-bacheca-sub">
            Roba pubblicata da chiunque nell'associazione — visibile a chi ha
            questo link. Niente login: gestitela con buon senso.
          </p>
        </div>
        <button className="au-btn au-btn-magenta" onClick={() => setFormOpen((v) => !v)}>
          <Plus size={16} /> {formOpen ? "Annulla" : "Attacca un annuncio"}
        </button>
      </div>

      {formOpen && (
        <div className="au-post-form">
          <div className="au-field-row au-field-row--split">
            <div>
              <label className="au-label" htmlFor="au-type">Tipo</label>
              <select id="au-type" className="au-select" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })}>
                <option value="annuncio">Annuncio</option>
                <option value="call">Call per artisti</option>
              </select>
            </div>
            <div>
              <label className="au-label" htmlFor="au-author">Firmato da (opzionale)</label>
              <input id="au-author" className="au-input" type="text" placeholder="es. Giovanni" value={draft.author} onChange={(e) => setDraft({ ...draft, author: e.target.value })} />
            </div>
          </div>
          <div className="au-field-row">
            <div>
              <label className="au-label" htmlFor="au-title">Titolo</label>
              <input id="au-title" className="au-input" type="text" placeholder="es. Cerchiamo chi sale sul palco venerdì" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            </div>
          </div>
          <div className="au-field-row">
            <div>
              <label className="au-label" htmlFor="au-text">Testo</label>
              <textarea id="au-text" className="au-textarea" placeholder="Racconta i dettagli..." value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} />
            </div>
          </div>
          {draft.type === "call" && (
            <div className="au-field-row">
              <div>
                <label className="au-label" htmlFor="au-deadline">Scadenza (opzionale)</label>
                <input id="au-deadline" className="au-input" type="date" value={draft.deadline} onChange={(e) => setDraft({ ...draft, deadline: e.target.value })} />
              </div>
            </div>
          )}
          <button className="au-btn au-btn-yellow" onClick={handleSubmit} disabled={saving || !draft.title.trim() || !draft.text.trim()} style={{ opacity: saving || !draft.title.trim() || !draft.text.trim() ? 0.6 : 1 }}>
            {saving ? <Loader2 size={16} className="au-spin" /> : <Megaphone size={16} />}
            {saving ? "Attacco..." : "Pubblica"}
          </button>
        </div>
      )}

      {loading ? (
        <div className="au-empty">Carico la bacheca…</div>
      ) : posts.length === 0 ? (
        <div className="au-empty">Bacheca vuota. Attacca il primo annuncio.</div>
      ) : (
        <div className="au-posts">
          {posts.map((post, i) => (
            <article className="au-post" key={post.id} style={{ "--post-color": SPOT_COLORS[i % SPOT_COLORS.length] }}>
              <button className="au-post-delete" onClick={() => handleDelete(post.id)} aria-label="Elimina annuncio" title="Elimina annuncio"><X size={15} /></button>
              <span className="au-post-tag">{post.type === "call" ? "Call per artisti" : "Annuncio"}</span>
              <h3 className="au-post-title">{post.title}</h3>
              <p className="au-post-text">{post.content}</p>
              <div className="au-post-meta">
                <span>{post.author}</span>
                <span>· {formatDate(post.created_at)}</span>
                {post.deadline && <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}><Calendar size={12} /> Scad. {formatDate(post.deadline)}</span>}
              </div>
            </article>
          ))}
        </div>
      )}
      {error && <p style={{ color: "var(--magenta)", fontSize: "0.85rem", marginTop: "1rem" }}>Problema nel salvataggio. Riprova.</p>}
    </div>
  );
}
