import { useState, useEffect, useRef, useCallback } from "react";

// ══════════════════════════════════════════════════════════════
//  BRAND LOGOS — SVG inline, no external deps
// ══════════════════════════════════════════════════════════════
const LOGOS = {
  spotify: {
    bg: "#1DB954",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  youtube: {
    bg: "#FF0000",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  netflix: {
    bg: "#E50914",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
      </svg>
    ),
  },
  amazon: {
    bg: "#FF9900",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.047-.872-1.234-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.756 4.109-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.549.582l-3.061-.333c-.259-.056-.548-.266-.472-.66C5.63 2.088 8.395 1.2 10.887 1.2c1.296 0 2.991.344 4.015 1.326C16.158 3.614 16 5.296 16 6.968v5.906c0 1.776.74 2.559 1.435 3.521.245.343.299.752-.015 1.006l-2.277 1.394zm4.54 1.925c-.317.234-1.487.752-2.059 1.025-.567.267-1.229.447-1.836.545-.397.064-.826.108-1.244.122-.432.014-.831-.022-1.224-.086-.786-.13-1.522-.386-2.14-.733-.312-.175-.604-.376-.854-.608C9.851 19.517 9.48 19 9.48 19c-.044-.066-.131-.072-.186-.014-.054.058-.055.143-.013.206.051.077.105.152.159.225.479.65 1.066 1.237 1.771 1.668.713.437 1.529.736 2.405.878.442.072.9.108 1.372.094.458-.013.929-.069 1.391-.184.92-.232 1.826-.65 2.694-1.209.169-.11.335-.225.502-.347.086-.063.178-.135.274-.213.258-.209.508-.438.646-.668.083-.138.08-.324-.04-.403-.12-.08-.305-.033-.434.059l-.078.055-.099.073z"/>
      </svg>
    ),
  },
  chatgpt: {
    bg: "#10A37F",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.856 19.95a4.5 4.5 0 0 1-6.257-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.05 14.35A4.501 4.501 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387 2.019-1.168a.076.076 0 0 1 .071 0l4.773 2.754a4.5 4.5 0 0 1-.689 8.115v-5.678a.79.79 0 0 0-.341-.636zm2.019-3.055l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.229V6.897a.066.066 0 0 1 .028-.061l4.767-2.753a4.5 4.5 0 0 1 6.725 4.632zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
      </svg>
    ),
  },
  apple: {
    bg: "#555",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701"/>
      </svg>
    ),
  },
  disney: {
    bg: "#113CCF",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.991 0C5.372 0 0 5.372 0 11.991 0 18.61 5.372 24 11.991 24 18.61 24 24 18.61 24 11.991 24 5.372 18.61 0 11.991 0zm4.21 16.896c-.777.43-1.637.621-2.46.621-2.376 0-4.312-1.705-4.312-4.28 0-2.78 2.11-4.667 4.64-4.667.968 0 1.852.268 2.527.75l-.777 1.137c-.484-.364-1.073-.566-1.75-.566-1.611 0-2.84 1.186-2.84 3.346 0 1.955 1.15 3.02 2.84 3.02.604 0 1.21-.161 1.75-.484l.382 1.123zm-8.87-8.203h1.75v8.64H7.33v-8.64zm12.71 8.64h-1.75v-8.64h1.75v8.64z"/>
      </svg>
    ),
  },
  notion: {
    bg: "#fff",
    svg: (
      <svg viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
      </svg>
    ),
  },
  instagram: {
    bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  linkedin: {
    bg: "#0A66C2",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  github: {
    bg: "#24292E",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  zoom: {
    bg: "#2D8CFF",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.372 0 12 0 18.628 5.373 24 12 24 18.628 24 24 18.628 24 12 24 5.372 18.628 0 12 0zm5.952 15.168l-3.36-2.304v1.344c0 .84-.672 1.512-1.512 1.512H6.528A1.506 1.506 0 0 1 5.016 14.208V9.792c0-.84.672-1.512 1.512-1.512h6.552c.84 0 1.512.672 1.512 1.512v1.344l3.36-2.304v6.336z"/>
      </svg>
    ),
  },
};

// Bubble layout — 12 bubbles matching Figma Section 1 positions
// (section offset x=-33, y=167 added to raw coords)
const BUBBLE_DATA = [
  { x: 296, y: 460, s: 50, logo: "spotify"   },
  { x:  20, y: 397, s: 50, logo: "youtube"   },
  { x: 163, y: 510, s: 45, logo: "amazon"    },
  { x: 208, y: 436, s: 35, logo: "chatgpt"   },
  { x: 296, y: 352, s: 45, logo: "netflix"   },
  { x: 105, y: 436, s: 45, logo: "instagram" },
  { x:  55, y: 310, s: 30, logo: "apple"     },
  { x: 236, y: 257, s: 30, logo: "notion"    },
  { x:  55, y: 219, s: 50, logo: "github"    },
  { x: 160, y: 201, s: 40, logo: "linkedin"  },
  { x: 271, y: 176, s: 50, logo: "disney"    },
  { x: 321, y: 269, s: 50, logo: "zoom"      },
];

// ══════════════════════════════════════════════════════════════
//  APP CONSTANTS
// ══════════════════════════════════════════════════════════════
const RATES_TO_INR     = { INR:1, USD:83, EUR:90, GBP:105 };
const CURRENCY_SYMBOLS = { INR:"₹", USD:"$", EUR:"€", GBP:"£" };
const BILLING_TO_MONTHLY = { weekly:4.33, monthly:1, yearly:1/12 };
const BILLING_TO_YEARLY  = { weekly:52,   monthly:12, yearly:1   };
const WARNING_INR = 2000;

const CATEGORIES = [
  { id:"entertainment", label:"Entertainment",   icon:"🎬" },
  { id:"productivity",  label:"Productivity",    icon:"🧠" },
  { id:"cloud",         label:"Cloud / Storage", icon:"☁️" },
  { id:"shopping",      label:"Shopping",        icon:"🛍️" },
  { id:"fitness",       label:"Fitness",         icon:"💪" },
  { id:"custom",        label:"Custom",          icon:"✨" },
];
const CAT_COLORS = {
  entertainment:"#E50914", productivity:"#6ba3f5",
  cloud:"#e8a94b",         shopping:"#a78bfa",
  fitness:"#f97316",       custom:"#999",
};
const PIE_PALETTE = ["#E50914","#6ba3f5","#e8a94b","#a78bfa","#f97316","#3ecf8e"];

const SEED_SUBS = [
  { id:"s1", name:"Netflix",      price:649,  currency:"INR", billing:"monthly", category:"entertainment" },
  { id:"s2", name:"Spotify",      price:119,  currency:"INR", billing:"monthly", category:"entertainment" },
  { id:"s3", name:"iCloud+",      price:75,   currency:"INR", billing:"monthly", category:"cloud"         },
  { id:"s4", name:"ChatGPT Plus", price:20,   currency:"USD", billing:"monthly", category:"productivity"  },
  { id:"s5", name:"Amazon Prime", price:1499, currency:"INR", billing:"yearly",  category:"shopping"      },
];

// ══════════════════════════════════════════════════════════════
//  UTILS + HOOKS
// ══════════════════════════════════════════════════════════════
const toINR    = (p,c) => p * RATES_TO_INR[c];
const fromINR  = (p,c) => p / RATES_TO_INR[c];
const monthlyI = s => toINR(s.price,s.currency) * BILLING_TO_MONTHLY[s.billing];
const yearlyI  = s => toINR(s.price,s.currency) * BILLING_TO_YEARLY[s.billing];
const uid      = () => Math.random().toString(36).slice(2,9);
const fmt = (inr,cur,dec=0) => {
  const v = fromINR(inr,cur);
  return CURRENCY_SYMBOLS[cur]+(dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-IN"));
};
const initials = name => name ? name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2) : "U";

function useLS(key, init) {
  const [v,set] = useState(()=>{
    try { const s=localStorage.getItem(key); return s!==null?JSON.parse(s):init; }
    catch { return init; }
  });
  useEffect(()=>{ try { localStorage.setItem(key,JSON.stringify(v)); } catch{} },[key,v]);
  return [v,set];
}

function useAnimNum(target, dur=680) {
  const [d,setD] = useState(target);
  const fr = useRef(target);
  useEffect(()=>{
    const s=fr.current, e=target, t0=performance.now();
    const tick=now=>{
      const p=Math.min((now-t0)/dur,1), ease=1-Math.pow(1-p,3);
      setD(s+(e-s)*ease);
      if(p<1) requestAnimationFrame(tick); else fr.current=e;
    };
    requestAnimationFrame(tick);
  },[target]);
  return d;
}

// ══════════════════════════════════════════════════════════════
//  GLOBAL CSS  — Netflix red (#E50914) as primary accent
// ══════════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inria+Serif:wght@700&family=Inria+Sans:ital,wght@0,300;0,400;1,300&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  /* Netflix-inspired palette */
  --nf:#E50914;          /* Netflix signature red */
  --nf2:#B20710;         /* darker red for hovers */
  --nf-glow:rgba(229,9,20,.28);
  --nf-dim:rgba(229,9,20,.12);

  --bg:#141414;          /* Netflix background */
  --s1:#1a1a1a;
  --s2:#222;
  --s3:#2a2a2a;
  --b1:#2a2a2a;
  --b2:#3a3a3a;
  --b3:#4a4a4a;
  --t1:#e5e5e5;          /* Netflix text */
  --t2:#999;
  --t3:#555;
  --amber:#e8a94b;
  --blue:#6ba3f5;
  --r:12px; --rsm:8px; --rxl:20px;
  --fd:'DM Serif Display',Georgia,serif;
  --fb:'DM Sans',system-ui,sans-serif;
  --fi:'Inria Serif',Georgia,serif;
  --fis:'Inria Sans',system-ui,sans-serif;
}
html,body{height:100%;background:var(--bg);}
body{color:var(--t1);font-family:var(--fb);overflow-x:hidden;}
::-webkit-scrollbar{width:3px;height:3px;}
::-webkit-scrollbar-thumb{background:var(--b2);border-radius:2px;}
button{cursor:pointer;font-family:var(--fb);}
input,select{font-family:var(--fb);}

/* Shell */
.shell{max-width:430px;margin:0 auto;min-height:100vh;position:relative;padding-bottom:90px;}
.screen{animation:sIn .28s cubic-bezier(.22,1,.36,1);}
@keyframes sIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

/* ────────────────────────────────────────
   BOTTOM NAV
──────────────────────────────────────── */
.nav{
  position:fixed;bottom:0;left:50%;transform:translateX(-50%);
  width:100%;max-width:430px;z-index:100;
  background:rgba(20,20,20,.97);backdrop-filter:blur(24px);
  border-top:1px solid var(--b1);display:flex;padding:10px 0 28px;
}
.nb{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 0;
  border:none;background:transparent;color:var(--t3);transition:color .16s;}
.nb svg{width:20px;height:20px;stroke:currentColor;fill:none;
  stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;}
.nb span{font-size:9px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;}
.nb.on{color:var(--nf);}

/* FAB */
.fab{
  position:fixed;bottom:88px;right:max(18px,calc(50% - 215px + 18px));
  width:50px;height:50px;border-radius:50%;background:var(--nf);
  border:none;color:#fff;font-size:22px;display:flex;align-items:center;justify-content:center;
  z-index:99;box-shadow:0 4px 20px var(--nf-glow);
  transition:transform .18s,box-shadow .18s;
}
.fab:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(229,9,20,.45);}
.fab:active{transform:scale(.93);}

/* Toast */
.toast{position:fixed;top:18px;left:50%;transform:translateX(-50%) translateY(-70px);
  background:var(--s3);border:1px solid var(--b2);border-radius:24px;
  padding:9px 22px;font-size:13px;z-index:200;white-space:nowrap;
  box-shadow:0 4px 20px rgba(0,0,0,.6);
  transition:transform .28s cubic-bezier(.34,1.56,.64,1);}
.toast.on{transform:translateX(-50%) translateY(0);}

/* ────────────────────────────────────────
   AUTH SCREENS
──────────────────────────────────────── */
.auth-wrap{
  min-height:100svh;background:var(--bg);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:32px 28px;
}
.auth-logo{font-family:var(--fi);font-weight:700;font-size:36px;color:var(--nf);
  letter-spacing:-.5px;margin-bottom:6px;text-align:center;}
.auth-tag{font-size:13px;color:var(--t2);text-align:center;margin-bottom:36px;
  font-family:var(--fis);font-weight:300;}
.auth-card{width:100%;background:var(--s1);border:1px solid var(--b1);
  border-radius:var(--rxl);padding:28px 24px;}
.auth-title{font-family:var(--fi);font-size:22px;margin-bottom:4px;}
.auth-sub{font-size:13px;color:var(--t2);margin-bottom:24px;line-height:1.5;}
.auth-tabs{display:flex;gap:0;background:var(--s2);border-radius:var(--rsm);
  padding:4px;margin-bottom:22px;}
.auth-tab{flex:1;padding:9px;font-size:13px;font-weight:600;
  border:none;background:transparent;color:var(--t2);border-radius:6px;
  transition:all .18s;}
.auth-tab.on{background:var(--nf);color:#fff;}

/* Input fields */
.inp-row{display:flex;gap:8px;align-items:stretch;}
.inp{width:100%;background:var(--s2);border:1px solid var(--b1);border-radius:var(--rsm);
  padding:14px 16px;color:var(--t1);font-size:15px;outline:none;
  transition:border-color .18s;caret-color:var(--nf);}
.inp:focus{border-color:var(--nf);}
.inp::placeholder{color:var(--t3);}
.inp-prefix{background:var(--s2);border:1px solid var(--b1);border-right:none;
  border-radius:var(--rsm) 0 0 var(--rsm);padding:0 14px;
  display:flex;align-items:center;font-size:14px;color:var(--t2);white-space:nowrap;}
.inp.attached{border-radius:0 var(--rsm) var(--rsm) 0;}
.inp-label{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:var(--t3);
  font-weight:600;margin-bottom:7px;display:block;}
.inp-group{margin-bottom:16px;}
.otp-row{display:flex;gap:10px;justify-content:center;margin:8px 0 4px;}
.otp-box{width:46px;height:56px;background:var(--s2);border:2px solid var(--b2);
  border-radius:var(--rsm);text-align:center;font-size:22px;font-weight:700;
  color:var(--t1);outline:none;caret-color:var(--nf);transition:border-color .18s;}
.otp-box:focus{border-color:var(--nf);}
.btn-nf{width:100%;background:var(--nf);border:none;border-radius:var(--rsm);
  padding:15px;font-size:15px;font-weight:700;color:#fff;
  margin-top:8px;letter-spacing:.2px;transition:background .18s,transform .18s;}
.btn-nf:hover{background:var(--nf2);}
.btn-nf:active{transform:scale(.97);}
.btn-nf:disabled{opacity:.4;cursor:not-allowed;}
.auth-switch{text-align:center;margin-top:18px;font-size:13px;color:var(--t2);}
.auth-switch button{background:none;border:none;color:var(--nf);font-weight:600;
  font-size:13px;padding:0;text-decoration:underline;cursor:pointer;}
.otp-hint{font-size:11px;color:var(--t3);text-align:center;margin-top:6px;}
.otp-resend{background:none;border:none;color:var(--nf);font-size:12px;
  font-weight:600;padding:0;display:block;margin:8px auto 0;}
.avatar-preview{
  width:72px;height:72px;border-radius:50%;margin:0 auto 20px;
  background:var(--nf);display:flex;align-items:center;justify-content:center;
  font-size:24px;font-weight:700;color:#fff;font-family:var(--fi);
  position:relative;overflow:hidden;border:2px solid var(--b2);}
.avatar-preview img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
.avatar-upload-label{display:flex;align-items:center;gap:6px;justify-content:center;
  font-size:12px;color:var(--t2);cursor:pointer;margin-bottom:16px;}
.avatar-upload-label svg{width:14px;height:14px;stroke:currentColor;fill:none;
  stroke-width:1.8;stroke-linecap:round;}
.avatar-upload-label input{display:none;}
.name-field{margin-bottom:16px;}

/* ────────────────────────────────────────
   ONBOARDING — Figma-matched
──────────────────────────────────────── */
.ob{
  width:100%;min-height:100svh;background:#1a1a1a;
  display:flex;flex-direction:column;align-items:center;justify-content:flex-end;
  padding-bottom:68px;position:relative;overflow:hidden;
}
/* Deep Netflix vignette backdrop */
.ob::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 50% at 50% 42%,#2a0a0a 0%,#141414 55%,#0a0a0a 100%);
  pointer-events:none;z-index:0;}

.ob-canvas{position:absolute;inset:0;width:393px;left:50%;transform:translateX(-50%);pointer-events:none;z-index:1;}

/* Rings */
.ob-ring{position:absolute;border-radius:50%;opacity:0;animation:rIn .65s cubic-bezier(.22,1,.36,1) forwards;}
.ob-r1{left:29px;top:186px;width:335px;height:335px;
  background:rgba(229,9,20,.04);box-shadow:0 0 0 1px rgba(229,9,20,.1);animation-delay:.05s;}
.ob-r2{left:73px;top:230px;width:248px;height:248px;
  background:rgba(229,9,20,.06);box-shadow:0 0 0 1px rgba(229,9,20,.14);animation-delay:.14s;}
.ob-r3{left:116px;top:273px;width:161px;height:161px;
  background:rgba(229,9,20,.09);box-shadow:0 0 0 1px rgba(229,9,20,.18);animation-delay:.23s;}
@keyframes rIn{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}

/* User avatar center — replaces Figma's Ellipse 4 */
.ob-av{
  position:absolute;left:137px;top:294px;width:120px;height:120px;
  border-radius:50%;overflow:hidden;
  border:3px solid var(--nf);
  box-shadow:0 0 0 6px rgba(229,9,20,.15),0 8px 40px rgba(0,0,0,.7);
  opacity:0;animation:avIn .5s .32s cubic-bezier(.34,1.4,.64,1) forwards;
  background:var(--nf);display:flex;align-items:center;justify-content:center;
  font-family:var(--fi);font-size:38px;font-weight:700;color:#fff;
}
.ob-av img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
@keyframes avIn{from{opacity:0;transform:scale(.45)}to{opacity:1;transform:scale(1)}}

/* Brand logo bubbles */
.ob-bubs{position:absolute;left:0;top:0;width:393px;height:100%;pointer-events:none;}
.ob-b{
  position:absolute;border-radius:50%;
  display:flex;align-items:center;justify-content:center;overflow:hidden;
  border:1px solid rgba(255,255,255,.12);
  box-shadow:0 4px 16px rgba(0,0,0,.5);
  opacity:0;
  animation:bIn .42s var(--bd) cubic-bezier(.34,1.4,.64,1) forwards,
             bFloat var(--bf) var(--bfd) ease-in-out infinite;
}
.ob-b svg{width:55%;height:55%;}
@keyframes bIn{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}
@keyframes bFloat{0%,100%{margin-top:0}50%{margin-top:-7px}}

/* Copy + CTA */
.ob-copy{z-index:10;text-align:center;margin-bottom:24px;
  opacity:0;animation:obUp .46s .5s cubic-bezier(.22,1,.36,1) forwards;}
.ob-title{font-family:var(--fi);font-weight:700;font-size:30px;color:#fff;
  margin-bottom:8px;letter-spacing:-.3px;}
.ob-sub{font-family:var(--fis);font-weight:300;font-size:14px;
  color:rgba(255,255,255,.5);line-height:1.55;}

.ob-cta{z-index:10;
  background:var(--nf);border:none;border-radius:6px;
  padding:16px 56px;font-family:var(--fi);font-weight:700;font-size:17px;color:#fff;
  cursor:pointer;letter-spacing:.2px;
  box-shadow:0 4px 24px var(--nf-glow);
  position:relative;overflow:hidden;
  opacity:0;animation:obUp .46s .65s cubic-bezier(.22,1,.36,1) forwards;
  transition:background .18s,transform .18s,box-shadow .18s;}
.ob-cta::after{content:'';position:absolute;top:0;left:-110%;width:75%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);transition:left .5s;}
.ob-cta:hover::after{left:140%;}
.ob-cta:hover{background:var(--nf2);box-shadow:0 6px 32px rgba(229,9,20,.5);}
.ob-cta:active{transform:scale(.96);}
@keyframes obUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}

/* ────────────────────────────────────────
   DASHBOARD
──────────────────────────────────────── */
.dash{padding:20px 18px 0;}
.dash-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;}
.logo{font-family:var(--fd);font-size:22px;letter-spacing:-.5px;}
.logo em{color:var(--nf);font-style:normal;}
.logo sup{font-size:9px;color:var(--t3);vertical-align:super;font-weight:500;letter-spacing:.5px;}

/* User avatar chip in header */
.user-chip{display:flex;align-items:center;gap:8px;cursor:pointer;
  background:var(--s1);border:1px solid var(--b1);border-radius:24px;
  padding:4px 12px 4px 4px;transition:border-color .18s;}
.user-chip:hover{border-color:var(--nf);}
.user-av{width:28px;height:28px;border-radius:50%;background:var(--nf);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--fi);font-size:11px;font-weight:700;color:#fff;overflow:hidden;flex-shrink:0;}
.user-av img{width:100%;height:100%;object-fit:cover;}
.user-name{font-size:11px;font-weight:600;max-width:80px;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--t1);}

/* Hero card */
.hero{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rxl);
  padding:24px 20px 20px;position:relative;overflow:hidden;margin-bottom:6px;}
.hero::before{content:'';position:absolute;top:-70px;right:-70px;width:200px;height:200px;
  background:radial-gradient(circle,rgba(229,9,20,.07),transparent 65%);pointer-events:none;}
.hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(229,9,20,.2),transparent);}
.hero.warn{border-color:rgba(229,9,20,.35);}
.hero.warn::before{background:radial-gradient(circle,rgba(229,9,20,.1),transparent 65%);}

.brutal{font-family:var(--fd);font-style:italic;font-size:14px;
  color:var(--t2);line-height:1.6;margin-bottom:22px;}
.brutal strong{color:var(--nf);font-style:normal;transition:color .3s;}
.hero.warn .brutal strong{color:#ff4444;}

.kpis{display:grid;grid-template-columns:1fr 1px 1fr 1px 1fr;}
.kd{background:var(--b1);width:1px;margin:4px 0;}
.kpi{padding:0 14px;display:flex;flex-direction:column;gap:5px;}
.kpi:first-child{padding-left:0;}
.kpi:last-child{padding-right:0;}
.kl{font-size:9px;text-transform:uppercase;letter-spacing:1.2px;color:var(--t3);font-weight:600;}
.kv{font-family:var(--fd);font-size:20px;line-height:1;letter-spacing:-.3px;}
.kv.r{color:var(--nf);}
.kv.rw{color:#ff4444;}
.kv.m{font-size:16px;color:var(--t2);}
.kn{font-size:9px;color:var(--t3);}
.sub-chip{display:inline-flex;align-items:center;gap:6px;margin-top:16px;
  background:var(--nf-dim);border:1px solid rgba(229,9,20,.22);
  border-radius:16px;padding:5px 12px;font-size:11px;font-weight:600;color:var(--nf);}
.sub-chip.w{background:rgba(255,68,68,.1);border-color:rgba(255,68,68,.25);color:#ff4444;}

/* ────────────────────────────────────────
   CATEGORY ROWS
──────────────────────────────────────── */
.cats{margin-top:22px;}
.cat-sec{margin-bottom:28px;}
.cat-hd{display:flex;justify-content:space-between;align-items:center;
  padding:0 18px;margin-bottom:11px;}
.cat-name{font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;}
.cat-pip{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.cat-badge{background:var(--s2);border:1px solid var(--b1);border-radius:10px;
  padding:2px 9px;font-size:10px;color:var(--t2);}
.cat-row{display:flex;gap:10px;overflow-x:auto;padding:3px 18px;
  scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;}
.cat-row::-webkit-scrollbar{display:none;}

/* Sub card */
.sc{flex-shrink:0;width:138px;scroll-snap-align:start;
  background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);
  padding:14px;cursor:pointer;position:relative;overflow:hidden;
  transition:transform .18s cubic-bezier(.34,1.4,.64,1),border-color .18s,box-shadow .18s;}
.sc:hover{transform:scale(1.04) translateY(-2px);border-color:var(--b3);
  box-shadow:0 10px 32px rgba(0,0,0,.5);}
.sc:active{transform:scale(.93);}
.sc-bar{position:absolute;bottom:0;left:0;right:0;height:2.5px;
  transform:scaleX(0);transform-origin:left;transition:transform .2s;}
.sc:hover .sc-bar{transform:scaleX(1);}
.sc-name{font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;
  text-overflow:ellipsis;margin-bottom:8px;}
.sc-price{font-family:var(--fd);font-size:21px;letter-spacing:-.3px;line-height:1;}
.sc-cycle{font-size:9px;color:var(--t3);margin-top:2px;text-transform:capitalize;letter-spacing:.3px;}
.sc-equiv{font-size:9px;color:var(--t2);margin-top:9px;padding-top:9px;border-top:1px solid var(--b1);}

/* Empty */
.empty{text-align:center;padding:50px 24px;}
.empty-i{font-size:40px;margin-bottom:14px;opacity:.4;}
.empty-h{font-family:var(--fd);font-style:italic;font-size:16px;color:var(--t2);
  margin-bottom:7px;line-height:1.45;}
.empty-s{font-size:12px;color:var(--t3);}

/* ────────────────────────────────────────
   FORM
──────────────────────────────────────── */
.fw{padding:22px 18px;}
.form-top{display:flex;align-items:center;gap:13px;margin-bottom:28px;}
.back{background:var(--s2);border:1px solid var(--b1);border-radius:var(--rsm);
  width:38px;height:38px;display:flex;align-items:center;justify-content:center;transition:border-color .18s;}
.back:hover{border-color:var(--nf);}
.back svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.ft{font-family:var(--fd);font-size:26px;}
.fg{margin-bottom:18px;}
.fg label{display:block;font-size:10px;text-transform:uppercase;letter-spacing:1.1px;
  color:var(--t3);font-weight:600;margin-bottom:7px;}
.fi{width:100%;background:var(--s2);border:1px solid var(--b1);border-radius:var(--rsm);
  padding:13px 15px;color:var(--t1);font-size:15px;outline:none;transition:border-color .18s;caret-color:var(--nf);}
.fi:focus{border-color:var(--nf);}
.fi::placeholder{color:var(--t3);}
.fi-row{display:grid;grid-template-columns:1fr auto;gap:9px;}
.fi-sel{background:var(--s2);border:1px solid var(--b1);border-radius:var(--rsm);
  padding:13px 10px;color:var(--t1);font-size:14px;outline:none;transition:border-color .18s;}
.fi-sel:focus{border-color:var(--nf);}
.chips{display:flex;gap:8px;flex-wrap:wrap;}
.chip{background:var(--s2);border:1px solid var(--b1);border-radius:var(--rsm);
  padding:9px 16px;font-size:13px;color:var(--t2);transition:all .15s;}
.chip.on{background:var(--nf-dim);border-color:var(--nf);color:var(--nf);}
.cg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.cb{background:var(--s2);border:1px solid var(--b1);border-radius:var(--rsm);
  padding:13px 6px;font-size:10px;color:var(--t2);text-align:center;transition:all .15s;
  display:flex;flex-direction:column;align-items:center;gap:5px;}
.cb.on{background:var(--nf-dim);border-color:var(--nf);color:var(--t1);}
.cb span:first-child{font-size:20px;}
.btn-s{width:100%;background:var(--nf);border:none;border-radius:var(--r);
  padding:15px;font-size:15px;font-weight:700;color:#fff;
  margin-top:10px;letter-spacing:.2px;transition:background .18s,transform .18s;}
.btn-s:hover{background:var(--nf2);}
.btn-s:active{transform:scale(.97);}
.btn-s:disabled{opacity:.35;cursor:not-allowed;}
.btn-d{width:100%;background:transparent;border:1px solid rgba(229,9,20,.3);
  border-radius:var(--r);padding:13px;font-size:14px;font-weight:500;
  color:var(--nf);margin-top:9px;transition:background .18s,border-color .18s;}
.btn-d:hover{background:var(--nf-dim);border-color:var(--nf);}

/* ────────────────────────────────────────
   CHARTS
──────────────────────────────────────── */
.cw{padding:22px 18px;}
.ct{font-family:var(--fd);font-size:26px;margin-bottom:3px;}
.cs{font-size:13px;color:var(--t2);margin-bottom:26px;}
.donut{position:relative;width:190px;height:190px;margin:0 auto 26px;}
.donut svg{overflow:visible;}
.dc{position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;}
.dt{font-family:var(--fd);font-size:20px;line-height:1;}
.dl{font-size:10px;color:var(--t3);margin-top:3px;}
.leg{display:flex;flex-direction:column;gap:9px;}
.li{display:flex;justify-content:space-between;align-items:center;
  background:var(--s1);border:1px solid var(--b1);border-radius:var(--rsm);padding:12px 15px;}
.ll{display:flex;align-items:center;gap:10px;}
.ld{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
.ln{font-size:13px;font-weight:500;}
.lp{font-size:10px;color:var(--t3);margin-top:1px;}
.la{font-family:var(--fd);font-size:17px;color:var(--nf);}
.lmo{font-size:10px;color:var(--t3);}

/* ────────────────────────────────────────
   PROFILE / SETTINGS
──────────────────────────────────────── */
.sw{padding:22px 18px;}
.stit{font-family:var(--fd);font-size:28px;margin-bottom:4px;}
.ssub{font-size:13px;color:var(--t2);margin-bottom:28px;}
.slbl{font-size:10px;text-transform:uppercase;letter-spacing:1.3px;color:var(--t3);font-weight:600;margin-bottom:10px;}

/* Profile card */
.profile-card{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rxl);
  padding:24px 20px;display:flex;flex-direction:column;align-items:center;
  text-align:center;margin-bottom:24px;position:relative;overflow:hidden;}
.profile-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--nf),#ff6b6b,var(--nf));}
.profile-big-av{width:80px;height:80px;border-radius:50%;background:var(--nf);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--fi);font-size:28px;font-weight:700;color:#fff;
  overflow:hidden;margin-bottom:14px;border:3px solid var(--b2);}
.profile-big-av img{width:100%;height:100%;object-fit:cover;}
.profile-name{font-family:var(--fd);font-size:20px;margin-bottom:4px;}
.profile-email{font-size:12px;color:var(--t2);}
.profile-edit{background:none;border:1px solid var(--b2);border-radius:20px;
  padding:6px 16px;font-size:12px;color:var(--t2);margin-top:12px;transition:border-color .18s,color .18s;}
.profile-edit:hover{border-color:var(--nf);color:var(--nf);}

.cgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:26px;}
.cb2{background:var(--s2);border:1px solid var(--b1);border-radius:var(--rsm);
  padding:15px 4px;text-align:center;transition:all .15s;}
.cb2.on{background:var(--nf-dim);border-color:var(--nf);}
.csym{font-family:var(--fd);font-size:22px;display:block;margin-bottom:3px;}
.ccode{font-size:10px;color:var(--t2);font-weight:600;letter-spacing:.5px;}
.srow{display:flex;justify-content:space-between;align-items:center;
  background:var(--s1);border:1px solid var(--b1);border-radius:var(--rsm);
  padding:14px 16px;margin-bottom:8px;}
.srl{font-size:13px;color:var(--t2);}
.srv{font-family:var(--fd);font-size:18px;}
.dng{width:100%;background:transparent;border:1px solid var(--b1);border-radius:var(--r);
  padding:13px;font-size:13px;color:var(--t2);transition:border-color .18s,color .18s;}
.dng:hover{border-color:var(--nf);color:var(--nf);}
.obp{width:100%;background:transparent;border:1px solid var(--b1);border-radius:var(--r);
  padding:13px;font-size:13px;color:var(--t2);margin-top:8px;transition:border-color .18s,color .18s;}
.obp:hover{border-color:var(--nf);color:var(--nf);}
.logout-btn{width:100%;background:transparent;border:1px solid rgba(229,9,20,.3);border-radius:var(--r);
  padding:13px;font-size:13px;color:var(--nf);margin-top:8px;transition:background .18s;}
.logout-btn:hover{background:var(--nf-dim);}
.sft{margin-top:40px;text-align:center;font-size:11px;color:var(--t3);line-height:1.9;}
.sft strong{color:var(--nf);font-weight:600;}
`;

// ══════════════════════════════════════════════════════════════
//  ROOT APP
// ══════════════════════════════════════════════════════════════
export default function SubTax() {
  const [user,       setUser]       = useLS("st_user",   null);   // { name, email, phone, avatarUrl }
  const [subs,       setSubs]       = useLS("st_subs",   SEED_SUBS);
  const [currency,   setCurrency]   = useLS("st_cur",    "INR");
  const [onboarded,  setOnboarded]  = useLS("st_ob",     false);
  const [authMode,   setAuthMode]   = useState("login"); // login | signup
  const [screen,     setScreen]     = useState("home");
  const [editSub,    setEditSub]    = useState(null);
  const [msg,        setMsg]        = useState("");
  const [msgOn,      setMsgOn]      = useState(false);

  const toast = useCallback(t => {
    setMsg(t); setMsgOn(true);
    setTimeout(() => setMsgOn(false), 2200);
  }, []);

  const totalMo   = subs.reduce((a,s)=>a+monthlyI(s),0);
  const totalYr   = subs.reduce((a,s)=>a+yearlyI(s), 0);
  const dailyCost = totalMo / 30.4;
  const isWarn    = totalMo > WARNING_INR;

  const handleLogin  = u => { setUser(u); };
  const handleLogout = () => { setUser(null); setOnboarded(false); setScreen("home"); };

  const addSub  = ()  => { setEditSub(null); setScreen("form"); };
  const editIt  = s   => { setEditSub(s);    setScreen("form"); };
  const saveSub = sub => {
    if (editSub) { setSubs(s=>s.map(x=>x.id===sub.id?sub:x)); toast("✓ Saved"); }
    else         { setSubs(s=>[...s,{...sub,id:uid()}]);       toast("✓ Added"); }
    setScreen("home");
  };
  const delSub = id => { setSubs(s=>s.filter(x=>x.id!==id)); toast("Removed"); setScreen("home"); };

  // Auth gate
  if (!user) return (
    <><style>{CSS}</style>
    <AuthScreen mode={authMode} setMode={setAuthMode} onLogin={handleLogin} /></>
  );

  // Onboarding splash
  if (!onboarded) return (
    <><style>{CSS}</style>
    <OnboardScreen user={user} onEnter={()=>setOnboarded(true)} /></>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className={`toast ${msgOn?"on":""}`}>{msg}</div>
      <div className="shell">
        {screen==="home"     && <HomeScreen subs={subs} currency={currency} setCurrency={setCurrency}
                                  totalMo={totalMo} totalYr={totalYr} dailyCost={dailyCost}
                                  isWarn={isWarn} onEdit={editIt} user={user} />}
        {screen==="form"     && <FormScreen sub={editSub} currency={currency}
                                  onSave={saveSub} onDelete={delSub} onBack={()=>setScreen("home")} />}
        {screen==="charts"   && <ChartScreen subs={subs} currency={currency} />}
        {screen==="settings" && <SettingsScreen currency={currency} setCurrency={setCurrency}
                                  subs={subs} setSubs={setSubs} totalMo={totalMo} totalYr={totalYr}
                                  user={user} setUser={setUser}
                                  onPreview={()=>setOnboarded(false)} onLogout={handleLogout} />}

        {screen==="home" && <button className="fab" onClick={addSub} aria-label="Add">＋</button>}

        <nav className="nav">
          {[
            { id:"home",     lbl:"Home",
              ico:<><rect x="2.5" y="2.5" width="6" height="6" rx="1.2"/><rect x="11.5" y="2.5" width="6" height="6" rx="1.2"/><rect x="2.5" y="11.5" width="6" height="6" rx="1.2"/><rect x="11.5" y="11.5" width="6" height="6" rx="1.2"/></> },
            { id:"charts",   lbl:"Charts",
              ico:<><path d="M3 17L7 11L11 14L15 7L19 3"/><path d="M19 3H14M19 3V8"/></> },
            { id:"settings", lbl:"Profile",
              ico:<><circle cx="10" cy="7" r="4"/><path d="M2 21c0-4.418 3.582-8 8-8s8 3.582 8 8"/></> },
          ].map(n=>(
            <button key={n.id} className={`nb ${screen===n.id?"on":""}`} onClick={()=>setScreen(n.id)}>
              <svg viewBox="0 0 20 20">{n.ico}</svg>
              <span>{n.lbl}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════
//  AUTH SCREEN  — email+OTP or phone+OTP
// ══════════════════════════════════════════════════════════════
function AuthScreen({ mode, setMode, onLogin }) {
  const [tab,      setTab]      = useState("email"); // email | phone
  const [step,     setStep]     = useState("input"); // input | otp | profile
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [otp,      setOtp]      = useState(["","","","","",""]);
  const [name,     setName]     = useState("");
  const [avatarUrl,setAvatarUrl]= useState("");
  const [avatarDat,setAvatarDat]= useState(null);
  const [sending,  setSending]  = useState(false);
  const [countdown,setCountdown]= useState(0);
  const otpRefs = useRef([]);

  const DEMO_OTP = "123456";

  const sendOTP = () => {
    setSending(true);
    setTimeout(()=>{ setSending(false); setStep("otp"); setCountdown(30);
      const t=setInterval(()=>setCountdown(c=>{ if(c<=1){clearInterval(t);return 0;} return c-1; }),1000);
    }, 900);
  };

  const verifyOTP = () => {
    if (otp.join("") === DEMO_OTP) {
      if (mode==="signup") setStep("profile");
      else onLogin({ name:"User", email: tab==="email"?email:phone, phone:"", avatarUrl:"" });
    }
  };

  const handleOtpKey = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const n=[...otp]; n[i]=val; setOtp(n);
    if (val && i<5) otpRefs.current[i+1]?.focus();
  };
  const handleOtpPaste = e => {
    const p=e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6);
    if (p.length===6) { setOtp(p.split("")); otpRefs.current[5]?.focus(); }
    e.preventDefault();
  };

  const handleAvatarFile = e => {
    const file=e.target.files[0]; if(!file) return;
    const r=new FileReader();
    r.onload=ev=>{ setAvatarDat(ev.target.result); setAvatarUrl(""); };
    r.readAsDataURL(file);
  };

  const completeSignup = () => {
    onLogin({ name:name.trim()||"User", email:tab==="email"?email:phone,
      phone:tab==="phone"?phone:"", avatarUrl:avatarDat||avatarUrl });
  };

  const contact = tab==="email"?email:phone;
  const contactValid = tab==="email"
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    : /^\d{10}$/.test(phone.replace(/\s/g,""));

  return (
    <div className="auth-wrap">
      <div className="auth-logo">SubTax</div>
      <div className="auth-tag">Track the hidden tax on your life.</div>
      <div className="auth-card">

        {step==="input" && <>
          <div className="auth-title">{mode==="login"?"Welcome back":"Create account"}</div>
          <div className="auth-sub">{mode==="login"?"Sign in to your SubTax account":"Start tracking your subscriptions"}</div>

          <div className="auth-tabs">
            <button className={`auth-tab ${tab==="email"?"on":""}`} onClick={()=>setTab("email")}>Email</button>
            <button className={`auth-tab ${tab==="phone"?"on":""}`} onClick={()=>setTab("phone")}>Phone</button>
          </div>

          {tab==="email" ? (
            <div className="inp-group">
              <label className="inp-label">Email address</label>
              <input className="inp" type="email" placeholder="you@example.com"
                value={email} onChange={e=>setEmail(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&contactValid&&sendOTP()} />
            </div>
          ):(
            <div className="inp-group">
              <label className="inp-label">Phone number</label>
              <div className="inp-row">
                <div className="inp-prefix">🇮🇳 +91</div>
                <input className="inp attached" type="tel" placeholder="98765 43210" maxLength={12}
                  value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))}
                  onKeyDown={e=>e.key==="Enter"&&contactValid&&sendOTP()} />
              </div>
            </div>
          )}

          <button className="btn-nf" onClick={sendOTP} disabled={!contactValid||sending}>
            {sending ? "Sending OTP…" : "Send OTP →"}
          </button>
          <div className="auth-switch">
            {mode==="login" ? <>Don't have an account?{" "}<button onClick={()=>setMode("signup")}>Sign up</button></>
              : <>Already have an account?{" "}<button onClick={()=>setMode("login")}>Log in</button></>}
          </div>
        </>}

        {step==="otp" && <>
          <div className="auth-title">Enter OTP</div>
          <div className="auth-sub">We sent a 6-digit code to <strong style={{color:"var(--nf)"}}>{contact}</strong></div>
          <div className="otp-row">
            {otp.map((v,i)=>(
              <input key={i} className="otp-box" type="tel" maxLength={1}
                value={v} ref={el=>otpRefs.current[i]=el}
                onChange={e=>handleOtpKey(i,e.target.value)}
                onPaste={i===0?handleOtpPaste:undefined}
                onKeyDown={e=>{ if(e.key==="Backspace"&&!v&&i>0) otpRefs.current[i-1]?.focus(); }}/>
            ))}
          </div>
          <div className="otp-hint">Demo: use <strong>123456</strong></div>
          <button className="btn-nf" style={{marginTop:16}} onClick={verifyOTP} disabled={otp.join("").length<6}>
            Verify & Continue →
          </button>
          {countdown>0
            ? <div className="otp-hint" style={{marginTop:10}}>Resend in {countdown}s</div>
            : <button className="otp-resend" onClick={sendOTP}>Resend OTP</button>}
          <button className="otp-resend" style={{color:"var(--t2)"}} onClick={()=>setStep("input")}>← Change {tab}</button>
        </>}

        {step==="profile" && <>
          <div className="auth-title">Your profile</div>
          <div className="auth-sub">Add your name and a photo (optional)</div>
          <div className="avatar-preview">
            {avatarDat ? <img src={avatarDat} alt="" /> : initials(name||"U")}
          </div>
          <label className="avatar-upload-label">
            <svg viewBox="0 0 16 16"><path d="M8 1v10M3 6l5-5 5 5"/><path d="M1 13h14v2H1z"/></svg>
            Upload photo
            <input type="file" accept="image/*" onChange={handleAvatarFile} />
          </label>
          <div className="name-field inp-group">
            <label className="inp-label">Your name</label>
            <input className="inp" type="text" placeholder="Enter your name"
              value={name} onChange={e=>setName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&completeSignup()} />
          </div>
          <button className="btn-nf" onClick={completeSignup}>
            Let's go →
          </button>
        </>}

      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  ONBOARD SCREEN — Figma-matched, Netflix red rings, brand logos, user avatar
// ══════════════════════════════════════════════════════════════
function OnboardScreen({ user, onEnter }) {
  return (
    <div className="ob">
      <div className="ob-canvas">
        {/* Concentric rings — Figma pixel coords, now red-tinted */}
        <div className="ob-ring ob-r1" />
        <div className="ob-ring ob-r2" />
        <div className="ob-ring ob-r3" />

        {/* Center avatar — user's own photo */}
        <div className="ob-av">
          {user?.avatarUrl
            ? <img src={user.avatarUrl} alt={user.name} />
            : initials(user?.name || "U")}
        </div>

        {/* Brand logo bubbles — real SVG logos, Figma Section 1 positions */}
        <div className="ob-bubs">
          {BUBBLE_DATA.map((b,i)=>{
            const logo = LOGOS[b.logo];
            return (
              <div key={i} className="ob-b" style={{
                left:b.x, top:b.y, width:b.s, height:b.s,
                background: logo?.bg || "#333",
                "--bd":`${0.55+i*0.05}s`,
                "--bf":`${2.8+(i%4)*0.5}s`,
                "--bfd":`${1.0+i*0.05}s`,
              }}>
                {logo?.svg}
              </div>
            );
          })}
        </div>
      </div>

      <div className="ob-copy">
        <div className="ob-title">Take Control</div>
        <div className="ob-sub">Over your monthly &amp; yearly subscriptions</div>
      </div>
      <button className="ob-cta" onClick={onEnter}>
        Get Started →
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  HOME SCREEN
// ══════════════════════════════════════════════════════════════
function HomeScreen({ subs, currency, setCurrency, totalMo, totalYr, dailyCost, isWarn, onEdit, user }) {
  const aMo    = useAnimNum(totalMo);
  const aYr    = useAnimNum(totalYr);
  const aDay   = useAnimNum(dailyCost);
  const CURS   = Object.keys(CURRENCY_SYMBOLS);
  const cycleCur = () => setCurrency(c=>CURS[(CURS.indexOf(c)+1)%CURS.length]);

  const grouped = CATEGORIES
    .map(cat=>({...cat, items:subs.filter(s=>s.category===cat.id)}))
    .filter(g=>g.items.length>0);

  return (
    <div className="screen">
      <div className="dash">
        <div className="dash-hd">
          <div className="logo">Sub<em>Tax</em><sup>beta</sup></div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button className="cur-pill" onClick={cycleCur} style={{
              display:"flex",alignItems:"center",gap:7,
              background:"var(--s1)",border:"1px solid var(--b1)",borderRadius:22,
              padding:"7px 14px",fontSize:12,fontWeight:600,color:"var(--t1)",transition:"border-color .18s"
            }}>
              <span>{CURRENCY_SYMBOLS[currency]} {currency}</span>
            </button>
            <div className="user-chip">
              <div className="user-av">
                {user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials(user?.name||"U")}
              </div>
              <span className="user-name">{user?.name||"User"}</span>
            </div>
          </div>
        </div>

        <div className={`hero ${isWarn?"warn":""}`}>
          <p className="brutal">
            You're spending{" "}
            <strong>{fmt(aDay,currency,1)}/day</strong>
            {isWarn?" — this is getting serious.":" — just to exist online."}
          </p>
          <div className="kpis">
            <div className="kpi">
              <div className="kl">Monthly</div>
              <div className={`kv ${isWarn?"rw":"r"}`}>{fmt(aMo,currency)}</div>
              <div className="kn">total burn</div>
            </div>
            <div className="kd"/>
            <div className="kpi">
              <div className="kl">Yearly</div>
              <div className="kv m">{fmt(aYr,currency)}</div>
              <div className="kn">projection</div>
            </div>
            <div className="kd"/>
            <div className="kpi">
              <div className="kl">Daily</div>
              <div className="kv m">{fmt(aDay,currency,1)}</div>
              <div className="kn">avg cost</div>
            </div>
          </div>
          <div className={`sub-chip ${isWarn?"w":""}`}>
            <span>{isWarn?"⚠":"●"}</span>
            {subs.length} active{isWarn?" · over budget":""}
          </div>
        </div>
      </div>

      <div className="cats">
        {grouped.length===0 ? (
          <div className="empty">
            <div className="empty-i">💸</div>
            <div className="empty-h">"No subscriptions yet.<br/>Add one and face reality."</div>
            <div className="empty-s">Tap ＋ to get started</div>
          </div>
        ):grouped.map(cat=>(
          <div className="cat-sec" key={cat.id}>
            <div className="cat-hd">
              <div className="cat-name">
                <span className="cat-pip" style={{background:CAT_COLORS[cat.id]}}/>
                {cat.icon} {cat.label}
              </div>
              <span className="cat-badge">{cat.items.length}</span>
            </div>
            <div className="cat-row">
              {cat.items.map(sub=>(
                <SubCard key={sub.id} sub={sub} currency={currency}
                  color={CAT_COLORS[sub.category]} onEdit={onEdit}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  SUB CARD
// ══════════════════════════════════════════════════════════════
function SubCard({ sub, currency, color, onEdit }) {
  const moI = monthlyI(sub);
  const raw = fromINR(toINR(sub.price,sub.currency),currency);
  const disp = Number.isInteger(raw)?raw.toLocaleString("en-IN"):raw.toFixed(2);
  return (
    <div className="sc" onClick={()=>onEdit(sub)}>
      <div className="sc-bar" style={{background:color}}/>
      <div className="sc-name">{sub.name}</div>
      <div className="sc-price" style={{color}}>{CURRENCY_SYMBOLS[currency]}{disp}</div>
      <div className="sc-cycle">/{sub.billing}</div>
      {sub.billing!=="monthly" && <div className="sc-equiv">{fmt(moI,currency)}/mo equiv.</div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  FORM SCREEN
// ══════════════════════════════════════════════════════════════
function FormScreen({ sub, currency, onSave, onDelete, onBack }) {
  const [name,    setName]    = useState(sub?.name     || "");
  const [price,   setPrice]   = useState(sub?.price    || "");
  const [pCur,    setPCur]    = useState(sub?.currency || currency);
  const [billing, setBilling] = useState(sub?.billing  || "monthly");
  const [cat,     setCat]     = useState(sub?.category || "entertainment");
  const valid = name.trim() && parseFloat(price)>0;

  return (
    <div className="screen fw">
      <div className="form-top">
        <button className="back" onClick={onBack}>
          <svg viewBox="0 0 16 16"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <div className="ft">{sub?"Edit Sub":"New Sub"}</div>
      </div>
      <div className="fg">
        <label>Service name</label>
        <input className="fi" type="text" placeholder="Netflix, Notion, Spotify…"
          value={name} onChange={e=>setName(e.target.value)}/>
      </div>
      <div className="fg">
        <label>Price</label>
        <div className="fi-row">
          <input className="fi" type="number" placeholder="0.00" min="0" step="0.01"
            value={price} onChange={e=>setPrice(e.target.value)}/>
          <select className="fi fi-sel" value={pCur} onChange={e=>setPCur(e.target.value)}>
            {Object.entries(CURRENCY_SYMBOLS).map(([c,s])=>(
              <option key={c} value={c}>{s} {c}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="fg">
        <label>Billing cycle</label>
        <div className="chips">
          {["weekly","monthly","yearly"].map(b=>(
            <button key={b} className={`chip ${billing===b?"on":""}`} onClick={()=>setBilling(b)}>
              {b[0].toUpperCase()+b.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="fg">
        <label>Category</label>
        <div className="cg">
          {CATEGORIES.map(c=>(
            <button key={c.id} className={`cb ${cat===c.id?"on":""}`} onClick={()=>setCat(c.id)}>
              <span>{c.icon}</span><span>{c.label.split("/")[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>
      <button className="btn-s" disabled={!valid}
        onClick={()=>valid&&onSave({id:sub?.id,name:name.trim(),price:parseFloat(price),currency:pCur,billing,category:cat})}>
        {sub?"Save Changes":"Add Subscription"}
      </button>
      {sub&&<button className="btn-d" onClick={()=>onDelete(sub.id)}>Remove Subscription</button>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  CHART SCREEN
// ══════════════════════════════════════════════════════════════
function ChartScreen({ subs, currency }) {
  const catData = CATEGORIES.map((cat,i)=>{
    const items=subs.filter(s=>s.category===cat.id);
    const total=items.reduce((a,s)=>a+monthlyI(s),0);
    return {...cat,total,color:PIE_PALETTE[i]};
  }).filter(c=>c.total>0).sort((a,b)=>b.total-a.total);
  const grand=catData.reduce((a,c)=>a+c.total,0);
  const R=80,CX=95,CY=95,sw=26,circ=2*Math.PI*R;
  let acc=0;
  const segs=catData.map(c=>{
    const len=grand>0?(c.total/grand)*circ:0;
    const s={...c,len,off:acc}; acc+=len; return s;
  });
  return (
    <div className="screen cw">
      <div className="ct">Breakdown</div>
      <div className="cs">Where your money actually goes</div>
      {subs.length===0?(
        <div className="empty"><div className="empty-i">◑</div>
          <div className="empty-h">Nothing to chart yet.</div>
          <div className="empty-s">Add subscriptions first</div></div>
      ):(
        <>
          <div className="donut">
            <svg viewBox="0 0 190 190" width="190" height="190" style={{transform:"rotate(-90deg)"}}>
              {grand===0
                ?<circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--b1)" strokeWidth={sw}/>
                :segs.map((s,i)=>(
                  <circle key={i} cx={CX} cy={CY} r={R} fill="none"
                    stroke={s.color} strokeWidth={sw}
                    strokeDasharray={`${s.len} ${circ-s.len}`}
                    strokeDashoffset={-s.off}
                    style={{transition:"stroke-dasharray .7s ease"}}/>
                ))}
            </svg>
            <div className="dc">
              <div className="dt">{fmt(grand,currency)}</div>
              <div className="dl">/ month</div>
            </div>
          </div>
          <div className="leg">
            {segs.map(c=>(
              <div className="li" key={c.id}>
                <div className="ll">
                  <div className="ld" style={{background:c.color}}/>
                  <div><div className="ln">{c.icon} {c.label}</div>
                    <div className="lp">{grand>0?(c.total/grand*100).toFixed(1):0}% of total</div></div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div className="la">{fmt(c.total,currency)}</div>
                  <div className="lmo">/mo</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  SETTINGS / PROFILE SCREEN
// ══════════════════════════════════════════════════════════════
function SettingsScreen({ currency, setCurrency, subs, setSubs, totalMo, totalYr, user, setUser, onPreview, onLogout }) {
  const [confirm, setConfirm] = useState(false);
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(user?.name||"");
  const reset = () => { if(!confirm){setConfirm(true);return;} setSubs([]); setConfirm(false); };
  const saveName = () => { setUser(u=>({...u,name:newName.trim()||u.name})); setEditName(false); };

  const handleNewAvatar = e => {
    const file=e.target.files[0]; if(!file) return;
    const r=new FileReader();
    r.onload=ev=>setUser(u=>({...u,avatarUrl:ev.target.result}));
    r.readAsDataURL(file);
  };

  return (
    <div className="screen sw">
      <div className="stit">Profile</div>
      <div className="ssub">Your account & preferences</div>

      {/* Profile card */}
      <div className="profile-card">
        <label style={{cursor:"pointer"}}>
          <div className="profile-big-av">
            {user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials(user?.name||"U")}
          </div>
          <input type="file" accept="image/*" style={{display:"none"}} onChange={handleNewAvatar}/>
        </label>
        {editName ? (
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
            <input className="fi" style={{width:"auto",padding:"8px 12px",fontSize:14}}
              value={newName} onChange={e=>setNewName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&saveName()}/>
            <button className="btn-s" style={{width:"auto",padding:"8px 14px",margin:0,fontSize:13}} onClick={saveName}>Save</button>
          </div>
        ):(
          <div className="profile-name">{user?.name||"User"}</div>
        )}
        <div className="profile-email">{user?.email||""}</div>
        <button className="profile-edit" onClick={()=>setEditName(!editName)}>
          {editName?"Cancel":"Edit name"}
        </button>
      </div>

      <div className="slbl">Display Currency</div>
      <div className="cgrid">
        {Object.entries(CURRENCY_SYMBOLS).map(([code,sym])=>(
          <button key={code} className={`cb2 ${currency===code?"on":""}`} onClick={()=>setCurrency(code)}>
            <span className="csym">{sym}</span>
            <span className="ccode">{code}</span>
          </button>
        ))}
      </div>

      <div className="slbl">Summary</div>
      <div className="srow"><span className="srl">Active subscriptions</span><span className="srv">{subs.length}</span></div>
      <div className="srow"><span className="srl">Monthly burn</span><span className="srv">{fmt(totalMo,currency)}</span></div>
      <div className="srow" style={{marginBottom:24}}><span className="srl">Yearly projection</span><span className="srv">{fmt(totalYr,currency)}</span></div>

      <div className="slbl" style={{color:"var(--t3)"}}>Danger Zone</div>
      <button className="dng" onClick={reset}>{confirm?"⚠️ Tap again to confirm":"Reset All Data"}</button>
      <button className="obp" onClick={onPreview}>Replay Splash Screen</button>
      <button className="logout-btn" onClick={onLogout}>Sign Out</button>

      <div className="sft"><strong>SubTax</strong> · Data stored locally on device<br/>No cloud. No tracking. No excuses.</div>
    </div>
  );
}
