import React, { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
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
  Lock,
  Copy,
  Check,
  ChevronDown,
  CreditCard,
  QrCode,
  HandCoins,
} from "lucide-react";

const ADMIN_PASSWORD = "artup2026admin"; // 🔧 cambia questa password quando vuoi

// 🔧 SOSTITUISCI questi con i dati veri di ArtUp APS
const DONATION_INFO = {
  iban: "IT00 X000 0000 0000 0000 0000 000", // 🔧 IBAN vero dell'associazione
  intestatario: "ArtUp APS",
  paypalLink: "https://paypal.me/ArtUpAPS", // 🔧 link PayPal.me vero
  satispayHandle: "@ArtUpAPS", // 🔧 handle Satispay vero
};

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
    text: "Riprese, cortometraggi, documentari. Raccontiamo la nostra realtà con una telecamera in mano, senza troppi permessi.",
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
  {
    name: "Santino",
    role: "Presidente",
    photo: "/team/santino.jpg",
    bio: "Tiene insieme i pezzi di ArtUp — dalla burocrazia alle serate sul palco. Se c'è una decisione da prendere o una porta da aprire, di solito la apre lui.",
  },
  {
    name: "Domenico",
    role: "Vicepresidente",
    bio: "Copre le spalle al Presidente e manda avanti le cose quando serve una seconda testa. Presente a ogni Art-Up Night, di solito con un microfono in mano prima o poi.",
  },
  {
    name: "Danilo",
    role: "Segretario",
    bio: "Tiene in ordine quello che il resto di noi si dimentica: verbali, carte, scadenze. Senza di lui ArtUp esisterebbe solo nella nostra testa.",
  },
  {
    name: "Andrea Buddike",
    role: "Tesoriere",
    bio: "Fa quadrare i conti di un'associazione che vive di entusiasmo e budget striminziti. Sa sempre quanto c'è in cassa, anche quando preferiremmo non saperlo.",
  },
  {
    name: "Giovanni",
    role: "Responsabile Artistico",
    bio: "Decide chi sale sul palco e come si costruisce una serata. Il gusto artistico di ArtUp passa quasi sempre dalle sue mani.",
  },
  {
    name: "Andrea",
    role: "Responsabile Formazione",
    bio: "Guida i laboratori di scrittura e i percorsi tecnico-artistici. Crede che insegnare un mestiere sia il modo migliore per farlo sopravvivere.",
  },
  {
    name: "Davide",
    role: "Responsabile Comunicazione",
    photo: "/team/davide.jpg",
    bio: "La voce di ArtUp fuori dalle nostre quattro mura — social, comunicazione, e spesso anche il microfono sul palco, quando la voce serve pure dentro.",
  },
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
  const [donationOpen, setDonationOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [troisiOpen, setTroisiOpen] = useState(false);
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
          border: none; text-align: left; width: 100%; cursor: pointer;
          font-family: 'Archivo', sans-serif;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .au-troisi-card:hover { transform: translate(-2px, -2px); box-shadow: 11px 11px 0 var(--arancio); }
        .au-troisi-card:focus-visible { outline: 3px solid var(--giallo); outline-offset: 3px; }
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
        .au-team-card {
          background: var(--nero-2); border: 2px solid rgba(242,238,228,0.15); padding: 1.4rem 1.1rem;
          font-family: 'Archivo', sans-serif; text-align: left; cursor: pointer; width: 100%;
          transition: border-color 0.15s ease, transform 0.15s ease;
        }
        .au-team-card:hover { border-color: var(--spot, var(--giallo)); transform: translateY(-2px); }
        .au-team-card:focus-visible { outline: 2px solid var(--giallo); outline-offset: 2px; }
        .au-team-photo-wrap { position: relative; margin-bottom: 1rem; }
        .au-team-photo {
          width: 100%; aspect-ratio: 1; object-fit: cover;
          filter: grayscale(1) contrast(1.05);
          display: block;
        }
        .au-team-tape {
          position: absolute; top: -8px; left: 50%; transform: translateX(-50%) rotate(-3deg);
          width: 46px; height: 16px; background: rgba(255,212,0,0.85);
        }
        .au-team-placeholder {
          width: 100%; aspect-ratio: 1;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .au-team-placeholder span {
          font-family: 'Bungee', cursive; font-size: 2.2rem; color: rgba(13,13,13,0.35);
        }
        .au-team-name { font-weight: 800; font-size: 0.98rem; margin: 0 0 0.4rem; line-height: 1.25; }
        .au-team-role { font-size: 0.68rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--giallo); font-weight: 700; }

        /* ---------- SOSTIENICI ---------- */
        .au-sostienici { text-align: center; }
        .au-sostienici-text { color: var(--carta); opacity: 0.78; max-width: 34rem; margin: 0 auto 2rem; line-height: 1.65; font-size: 1rem; }
        .au-sostienici-ctas { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        /* ---------- FOOTER ---------- */
        .au-footer { padding: 3rem 1.5rem 2.5rem; text-align: center; border-top: 2px solid rgba(242,238,228,0.12); }
        .au-footer-mark { font-family: 'Bungee', cursive; font-size: 1.5rem; margin-bottom: 1rem; }
        .au-footer-row { display: flex; gap: 1.6rem; justify-content: center; flex-wrap: wrap; font-size: 0.85rem; margin-bottom: 1.2rem; }
        .au-footer-row a { color: var(--carta); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; opacity: 0.75; }
        .au-footer-row a:hover { opacity: 1; color: var(--giallo); }
        .au-footer-fine { font-size: 0.7rem; opacity: 0.4; }
        .au-legal-row { display: flex; align-items: center; justify-content: center; gap: 0.6rem; margin-bottom: 0.8rem; }
        .au-legal-dot { color: var(--carta); opacity: 0.3; font-size: 0.8rem; }
        .au-privacy-link {
          background: none; border: none; color: var(--carta); opacity: 0.55;
          font-size: 0.75rem; text-decoration: underline; cursor: pointer;
          font-family: 'Archivo', sans-serif;
        }
        .au-privacy-link:hover { opacity: 0.9; color: var(--giallo); }

        /* ---------- PRIVACY MODAL ---------- */
        .au-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.75);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem; z-index: 100;
        }
        .au-modal {
          background: var(--carta); color: var(--nero);
          max-width: 40rem; max-height: 85vh; overflow-y: auto;
          padding: 2rem; position: relative; box-shadow: 8px 8px 0 var(--magenta);
        }
        .au-modal h2 { font-family: 'Bungee', cursive; font-size: 1.4rem; margin: 0 0 1.2rem; }
        .au-modal h3 { font-size: 1rem; margin: 1.4rem 0 0.5rem; }
        .au-modal p, .au-modal li { font-size: 0.92rem; line-height: 1.6; opacity: 0.85; margin: 0 0 0.6rem; }
        .au-modal-close {
          position: absolute; top: 1rem; right: 1rem; background: var(--nero); color: var(--carta);
          border: none; width: 2rem; height: 2rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }

        /* ---------- DONATION MODAL ---------- */
        .au-pay-methods { display: flex; flex-direction: column; gap: 1rem; margin: 1.4rem 0; }
        .au-pay-card {
          border: 2px solid var(--nero); padding: 1.1rem 1.2rem;
          display: flex; align-items: flex-start; gap: 0.9rem;
        }
        .au-pay-icon {
          width: 2.4rem; height: 2.4rem; border-radius: 50%; flex-shrink: 0;
          background: var(--nero); color: var(--carta);
          display: flex; align-items: center; justify-content: center;
        }
        .au-pay-title { font-weight: 800; font-size: 0.95rem; margin: 0 0 0.3rem; }
        .au-pay-detail { font-size: 0.88rem; opacity: 0.75; margin: 0 0 0.5rem; line-height: 1.45; }
        .au-pay-value {
          font-family: 'Archivo', monospace; font-weight: 700; font-size: 0.88rem;
          background: rgba(0,0,0,0.06); padding: 0.4rem 0.6rem;
          display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer;
          border: none; color: var(--nero);
        }
        .au-pay-value:hover { background: rgba(0,0,0,0.12); }
        .au-pay-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-weight: 800; font-size: 0.88rem; color: var(--magenta); text-decoration: none;
        }
        .au-pay-link:hover { text-decoration: underline; }

        .au-fiscal-toggle {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          background: var(--giallo); color: var(--nero); border: none;
          padding: 0.9rem 1.1rem; font-weight: 800; font-size: 0.9rem; cursor: pointer;
          margin-top: 0.6rem;
        }
        .au-fiscal-toggle svg { transition: transform 0.2s ease; }
        .au-fiscal-toggle.open svg { transform: rotate(180deg); }
        .au-fiscal-body { padding: 1.2rem 0.2rem 0.2rem; }
        .au-fiscal-body h4 { font-size: 0.9rem; margin: 1rem 0 0.4rem; }
        .au-fiscal-body p, .au-fiscal-body li { font-size: 0.88rem; line-height: 1.55; opacity: 0.85; margin: 0 0 0.5rem; }
        .au-fiscal-note {
          background: rgba(227,28,121,0.08); border-left: 4px solid var(--magenta);
          padding: 0.8rem 1rem; font-size: 0.85rem; margin-top: 1rem;
        }

        /* ---------- TROISI MODAL ---------- */
        .au-troisi-modal-eyebrow { display: block; text-align: center; }
        .au-troisi-modal-text { font-size: 1rem; line-height: 1.7; margin: 0 0 1.1rem; opacity: 0.85; }
        .au-troisi-modal-cta {
          background: var(--arancio); color: var(--nero);
          padding: 1rem 1.1rem; margin-top: 1.4rem;
          font-weight: 700; font-size: 0.95rem; line-height: 1.5;
        }
        .au-troisi-modal-cta a { color: var(--nero); font-weight: 900; text-decoration: underline; }

        .au-troisi-hero-img {
          width: 100%; display: block; margin: 0 0 1.6rem;
          border: 3px solid var(--nero);
          box-shadow: 8px 8px 0 var(--blu);
        }
        .au-troisi-thumb-wrap {
          margin-bottom: 1.4rem; position: relative;
          border: 3px solid var(--nero);
          box-shadow: 6px 6px 0 var(--blu);
        }
        .au-troisi-thumb { width: 100%; display: block; aspect-ratio: 4/3; object-fit: cover; }

        /* ---------- TEAM MEMBER MODAL ---------- */
        .au-member-photo-wrap { position: relative; width: 9rem; margin: 0 auto 1.2rem; }
        .au-member-photo {
          width: 9rem; height: 9rem; object-fit: cover;
          filter: grayscale(1) contrast(1.05); display: block;
        }
        .au-member-tape {
          position: absolute; top: -9px; left: 50%; transform: translateX(-50%) rotate(-3deg);
          width: 54px; height: 18px; background: rgba(255,212,0,0.85);
        }
        .au-member-placeholder {
          width: 9rem; height: 9rem; margin: 0 auto 1.2rem;
          display: flex; align-items: center; justify-content: center;
        }
        .au-member-placeholder span { font-family: 'Bungee', cursive; font-size: 3rem; color: rgba(13,13,13,0.35); }
        .au-member-name { font-family: 'Bungee', cursive; font-size: 1.5rem; text-align: center; margin: 0 0 0.4rem; }
        .au-member-role {
          display: block; text-align: center; font-weight: 900; font-size: 0.75rem;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--magenta); margin-bottom: 1.4rem;
        }
        .au-member-bio { font-size: 0.98rem; line-height: 1.65; text-align: center; opacity: 0.85; }

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
          cinema e memoria di Napoli, raccontati con autenticità da chi la vive ogni giorno.
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
            può esibirsi, imparare, riprendere o custodire un pezzo di cultura napoletana.
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
        <button className="au-troisi-card" onClick={() => setTroisiOpen(true)}>
          <div className="au-troisi-thumb-wrap">
            <img className="au-troisi-thumb" src="/troisi/ritratto.jpg" alt="Illustrazione per il progetto Massimo Troisi" loading="lazy" />
          </div>
          <h2 className="au-troisi-title">Una casa dove tutti possano visitare Massimo Troisi</h2>
          <p className="au-troisi-text">
            Materiali, cimeli e testimonianze originali: ne abbiamo già raccolti
            un sacco, pronti da esporre. Manca solo un posto — cerchiamo uno
            spazio nel centro storico di Napoli per aprire le porte a tutti.
          </p>
          <p className="au-troisi-marker au-marker">— scopri di più →</p>
        </button>
      </section>

      {troisiOpen && <TroisiModal onClose={() => setTroisiOpen(false)} />}

      {/* ---------- BACHECA ---------- */}
      <section className="au-section" ref={bachecaRef}>
        <Bacheca />
      </section>

      {/* ---------- TEAM ---------- */}
      <section className="au-section">
        <span className="au-eyebrow">Chi c'è dietro</span>
        <h2 className="au-head-title au-bungee" style={{ marginBottom: "2rem" }}>Il Consiglio Direttivo</h2>
        <div className="au-team-grid">
          {TEAM.map((m, i) => (
            <button
              className="au-team-card"
              key={m.name}
              onClick={() => setSelectedMember(m)}
              style={{ "--spot": SPOT_COLORS[i % SPOT_COLORS.length] }}
            >
              {m.photo ? (
                <div className="au-team-photo-wrap">
                  <div className="au-team-tape" />
                  <img className="au-team-photo" src={m.photo} alt={m.name} loading="lazy" />
                </div>
              ) : (
                <div className="au-team-placeholder" style={{ background: SPOT_COLORS[i % SPOT_COLORS.length] }}>
                  <span>{m.name.charAt(0)}</span>
                </div>
              )}
              <p className="au-team-name">{m.name}</p>
              <span className="au-team-role">{m.role}</span>
            </button>
          ))}
        </div>
      </section>

      {selectedMember && (
        <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      {/* ---------- SOSTIENICI ---------- */}
      <section className="au-section au-sostienici">
        <span className="au-eyebrow">Sostienici</span>
        <h2 className="au-head-title au-bungee">Dona, sponsorizza, partecipa</h2>
        <p className="au-sostienici-text">
          Sostieni ArtUp con una donazione: bonifico, PayPal o Satispay.
          Per le aziende è possibile anche una sponsorizzazione con visibilità sui progetti.
        </p>
        <div className="au-sostienici-ctas">
          <button className="au-btn au-btn-magenta" onClick={() => setDonationOpen(true)}>
            <HandCoins size={16} /> Dona ora
          </button>
          <a href="mailto:info@artup-aps.it" className="au-btn au-btn-yellow" style={{ textDecoration: "none" }}>
            <Mail size={16} /> Scrivici per sponsorizzazioni
          </a>
        </div>
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
            <MapPin size={14} /> Vico Solitaria, 38, 80132 Napoli (NA)
          </span>
        </div>
        <div className="au-legal-row">
          <a className="au-privacy-link" href="/privacy.html">Privacy &amp; Cookie Policy</a>
          <span className="au-legal-dot">·</span>
          <a className="au-privacy-link" href="/termini.html">Termini e Condizioni</a>
        </div>
        <p className="au-footer-fine">ArtUp APS · Associazione di Promozione Sociale · Sede legale: Vico Solitaria, 38, 80132 Napoli (NA)</p>
      </footer>
      {donationOpen && <DonationModal onClose={() => setDonationOpen(false)} />}
      <Analytics />
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
    const pwd = window.prompt("Password amministratore per eliminare l'annuncio:");
    if (pwd === null) return;
    if (pwd !== ADMIN_PASSWORD) {
      window.alert("Password errata. Annuncio non eliminato.");
      return;
    }
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
              <button className="au-post-delete" onClick={() => handleDelete(post.id)} aria-label="Elimina annuncio (richiede password admin)" title="Elimina annuncio (richiede password admin)"><Lock size={13} /></button>
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

/* =========================================================
   DONA ORA — modale con metodi di pagamento + vantaggi fiscali
   ========================================================= */
function DonationModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const [fiscalOpen, setFiscalOpen] = useState(false);

  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(DONATION_INFO.iban.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard non disponibile, l'utente copia a mano
    }
  };

  return (
    <div className="au-modal-overlay" onClick={onClose}>
      <div className="au-modal" onClick={(e) => e.stopPropagation()}>
        <button className="au-modal-close" onClick={onClose} aria-label="Chiudi">✕</button>
        <h2>Dona ad ArtUp APS</h2>
        <p style={{ fontSize: "0.92rem", opacity: 0.8, marginBottom: "1.2rem" }}>
          Ogni donazione, piccola o grande, ci aiuta a portare avanti spettacoli,
          laboratori e il progetto della mostra permanente su Massimo Troisi.
          Scegli il metodo che preferisci:
        </p>

        <div className="au-pay-methods">
          <div className="au-pay-card">
            <div className="au-pay-icon"><Landmark size={18} /></div>
            <div>
              <p className="au-pay-title">Bonifico bancario</p>
              <p className="au-pay-detail">
                Intestato a {DONATION_INFO.intestatario}. Causale consigliata:
                "Erogazione liberale ad ArtUp APS". Nessuna commissione.
              </p>
              <button className="au-pay-value" onClick={copyIban}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {DONATION_INFO.iban}
              </button>
            </div>
          </div>

          <div className="au-pay-card">
            <div className="au-pay-icon"><CreditCard size={18} /></div>
            <div>
              <p className="au-pay-title">PayPal</p>
              <p className="au-pay-detail">
                Con carta o conto PayPal, in pochi secondi.
              </p>
              <a className="au-pay-link" href={DONATION_INFO.paypalLink} target="_blank" rel="noopener noreferrer">
                {DONATION_INFO.paypalLink} ↗
              </a>
            </div>
          </div>

          <div className="au-pay-card">
            <div className="au-pay-icon"><QrCode size={18} /></div>
            <div>
              <p className="au-pay-title">Satispay</p>
              <p className="au-pay-detail">
                Cercaci nell'app Satispay a questo nome, oppure inquadra il QR
                che trovi ai nostri eventi dal vivo.
              </p>
              <span className="au-pay-value" style={{ cursor: "default" }}>{DONATION_INFO.satispayHandle}</span>
            </div>
          </div>
        </div>

        <button
          className={`au-fiscal-toggle ${fiscalOpen ? "open" : ""}`}
          onClick={() => setFiscalOpen((v) => !v)}
        >
          <span>💶 I vantaggi fiscali della tua donazione</span>
          <ChevronDown size={18} />
        </button>

        {fiscalOpen && (
          <div className="au-fiscal-body">
            <p>
              Le donazioni alle Associazioni di Promozione Sociale (APS) iscritte
              al RUNTS danno diritto a un vantaggio fiscale per chi dona, previsto
              dall'art. 83 del Codice del Terzo Settore (D.Lgs. 117/2017).
            </p>

            <h4>Quanto si risparmia</h4>
            <p>
              Le persone fisiche possono detrarre dall'IRPEF il <strong>30% dell'importo donato</strong>,
              fino a un massimo di 30.000 € annui. Esempio: su una donazione di
              100 €, si recuperano 30 € direttamente in dichiarazione dei redditi.
            </p>
            <p>
              In alternativa, sia le persone fisiche che le imprese possono scegliere
              di <strong>dedurre</strong> l'importo donato dal reddito complessivo,
              fino al 10% del reddito dichiarato.
            </p>

            <h4>Condizioni necessarie</h4>
            <ul>
              <li>La donazione deve essere <strong>tracciabile</strong>: bonifico, carta, PayPal o app come Satispay. Il contante non dà mai diritto a benefici fiscali.</li>
              <li>Il beneficio è valido solo per le donazioni effettuate <strong>dopo il completamento dell'iscrizione di ArtUp al RUNTS</strong>.</li>
              <li>Conserva sempre la <strong>ricevuta di erogazione liberale</strong> che ArtUp ti invierà su richiesta, da presentare in dichiarazione dei redditi.</li>
            </ul>

            <h4>Come ottenere la ricevuta</h4>
            <p>
              Dopo la donazione scrivici a <strong>info@artup-aps.it</strong> indicando
              nome, codice fiscale, importo e data: ti invieremo la ricevuta con
              tutti i dati richiesti dalla normativa.
            </p>

            <div className="au-fiscal-note">
              <strong>Nota:</strong> finché la nostra iscrizione al RUNTS non è
              completata, ogni donazione è comunque benvenuta e preziosa, ma non
              può ancora dare diritto alla detrazione fiscale. Aggiorneremo questa
              pagina non appena l'iscrizione sarà effettiva.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SCHEDA MEMBRO — foto, ruolo, descrizione
   ========================================================= */
function TeamMemberModal({ member, onClose }) {
  return (
    <div className="au-modal-overlay" onClick={onClose}>
      <div className="au-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "26rem" }}>
        <button className="au-modal-close" onClick={onClose} aria-label="Chiudi">✕</button>

        {member.photo ? (
          <div className="au-member-photo-wrap">
            <div className="au-member-tape" />
            <img className="au-member-photo" src={member.photo} alt={member.name} />
          </div>
        ) : (
          <div className="au-member-placeholder" style={{ background: "var(--giallo)" }}>
            <span>{member.name.charAt(0)}</span>
          </div>
        )}

        <p className="au-member-name">{member.name}</p>
        <span className="au-member-role">{member.role}</span>
        <p className="au-member-bio">{member.bio}</p>
      </div>
    </div>
  );
}

/* =========================================================
   PROGETTO TROISI — pannello espanso
   ========================================================= */
function TroisiModal({ onClose }) {
  return (
    <div className="au-modal-overlay" onClick={onClose}>
      <div className="au-modal" onClick={(e) => e.stopPropagation()}>
        <button className="au-modal-close" onClick={onClose} aria-label="Chiudi">✕</button>
        <img className="au-troisi-hero-img" src="/troisi/ritratto.jpg" alt="Illustrazione per il progetto Massimo Troisi" />
        <span className="au-eyebrow au-troisi-modal-eyebrow">Il progetto grande</span>
        <h2>Una casa dove tutti possano visitare Massimo Troisi</h2>

        <p className="au-troisi-modal-text">
          Massimo Troisi ha raccontato Napoli come pochi altri — con la sua
          ironia, la sua malinconia, il suo modo di essere profondamente
          napoletano e universale allo stesso tempo. Vogliamo dargli una casa
          vera, nel cuore della città che ha amato e raccontato.
        </p>

        <p className="au-troisi-modal-text">
          <strong>Non partiamo da zero</strong>: abbiamo già raccolto un sacco
          di materiale — cimeli, fotografie, testimonianze originali di chi lo
          ha conosciuto e lavorato con lui — abbastanza da poter allestire una
          mostra vera, non un cassetto pieno di ricordi.
        </p>

        <p className="au-troisi-modal-text">
          Quello che ci manca è lo spazio. <strong>Cerchiamo un posto nel
          centro storico di Napoli</strong>: non un museo polveroso con le
          teche e i cartellini, ma un luogo vivo, aperto, dove chiunque possa
          entrare, sedersi, guardare, ricordare — o scoprirlo per la prima
          volta.
        </p>

        <div className="au-troisi-modal-cta">
          Conosci un posto libero in centro? Hai materiali da donare o voglia
          di dare una mano a montare? Scrivici a{" "}
          <a href="mailto:info@artup-aps.it">info@artup-aps.it</a>.
        </div>
      </div>
    </div>
  );
}
