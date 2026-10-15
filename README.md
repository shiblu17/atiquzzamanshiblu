# The Stage — Immersive 3D Animated Portfolio Website 🎭

> *"A cinematic, scroll-driven 3D theatre where every project is a scene, and the visitor is the audience."*

**Owner:** Atiquzzaman Shiblu  
**Education:** Department of Drama & Dramatic Theory, Jahangirnagar University (52nd Batch)  
**Leadership:** President, "Songskrriti Nagar" (TSC-Affiliated Newspaper)  
**Target:** Master's in Theatre Studies / Performance (Trinity College Dublin, University of Galway)  

---

## 🌟 Concept & Experience Architecture

This portfolio is structured around a three-act theatrical journey with a persistent 3D WebGL camera and theatrical stagecraft:

- **Prologue (Loading Scene):**
  - Dark stage with a single flickering ghost light (Edison filament in a wire protective cage).
  - Progressively brightens from 0% to 100% with "The house is open" cue and a skip button.
- **Scene 1 — Hero (The Curtain Rises):**
  - Heavy red velvet proscenium curtains part as the visitor enters.
  - Directional spotlight cone sweeps across the stage tracking the cursor.
  - Floating 3D metallic-gold typography for **ATIQUZZAMAN SHIBLU** with typewriter tagline: *"Actor. Dramaturg. Organiser. Builder."*
  - CTAs for exploring works, downloading academic CV, and jumping to contact.
- **Act I — Theatre & Performing Arts:**
  - *Rakta Karabi (Red Oleanders)* by Rabindranath Tagore: 3D Yakshapuri iron-grille gate silhouette with role as "The Professor", script editing, and financial management.
  - *Aar Koto Din* by Zahir Raihan: Projected-light reveal and anti-war dramaturgical adaptation.
  - *Bangladesh Shilpakala Academy:* Hanging stage flats detailing national repertory festival collaborations.
  - **1:12 Miniature Stage Set (Signature Showpiece):** Fully interactive 3D WebGL model of the vintage chemistry laboratory set. Allows 360° orbit, zoom, and an animated **"Exploded View"** decomposing the set components (fume extraction hood, distillation retort flasks, timber rostrum, formula blackboard, and test tube racks).
- **Act II — Leadership, Journalism & Events:**
  - *"Songskrriti Nagar" (সংস্কৃতি নগর):* 3D newspaper page that unfolds and flips to reveal editorial governance, investigative reporting, and 14 archived issues.
  - *JUCSU Run 2026 & Batch Day Festival:* Event cards with verified counts: 2,500+ runners, 12 corporate brand sponsors, and 85 volunteer operations personnel.
  - *Stakeholder Node Graph:* Interactive coordination diagram showing links between leadership, university administration, media writers, sponsors, and logistics teams.
- **Act III — Technology & Automation:**
  - Stage control booth with DMX 512 lighting-console sliders activating project gain channels.
  - *Theatre Rehearsal Management System:* Full-stack React + Supabase web application streamlining call-sheets and availability matrices.
  - *JU Campus Transit GPS Tracker:* Telemetry mapping architecture for university commuter buses.
  - *Automated Workflow Pipelines:* No-code/low-code engines using Make.com, n8n, and Google Apps Script saving 120+ hours per event cycle.
  - **3D Skill Constellation:** Glowing point cloud clustering skills into Theatre (Red), Leadership (Gold), and Tech (Cyan), with an accessible 2D fallback list.
- **Epilogue — Vision & Scholarship Goals:**
  - 3D interactive globe with illuminated flight trajectory arcs from **Dhaka (Jahangirnagar University)** across Eurasia to **Dublin (Trinity College Dublin)** and **Galway (University of Galway)**.
  - Statement of Purpose and research goals linking Bengali dramatic heritage to European spatial scenography.
- **Curtain Call — Contact:**
  - Velvet curtains frame the stage with spotlight on the contact card.
  - Categorized subject dropdown and honeypot spam protection.
  - Perforated theatrical admission tickets linking to direct email, GitHub, and campus residence.
  - Theatrical closing line: *"Thank you for coming. The ghost light stays on."*

---

## 🛠️ Key Controls & Accessibility Features

| Control | Shortcut / Action | Description |
|---|---|---|
| **Language Toggle** | Top Navbar (EN / বাংলা) | Switches all textual content between English and authentic Bengali. |
| **Sound Toggle** | Audio icon | Generates procedural stage ambiance via Web Audio API (room tone, curtain swish, ghost light click). Muted by default. |
| **House Lights** | Sun / Moon icon | Illuminates house lights for a high-contrast ambient view. |
| **Ghost Light** | Press **`G`** or click bulb icon | Toggles the stage ghost light apparatus on and off. |
| **3D / 2D Toggle** | Top Navbar (3D / 2D button) | Instantly enables graceful 2D fallback mode for low-end hardware. |
| **Exploded View** | Button in 1:12 Model Viewer | Smoothly animates stage components outward along isometric axes. |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v24+)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 📦 Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **3D Engine:** Three.js (WebGL, custom procedural lighting, particle shaders, bezier flight curves)
- **Styling:** Tailwind CSS (v4) with custom theatrical tokens (`--stage-black`, `--accent-red`, `--stage-gold`, `--tech-cyan`)
- **Audio:** Web Audio API procedural synthesis
- **Celebration FX:** Canvas Confetti
- **Icons:** Lucide React
