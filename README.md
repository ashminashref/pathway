# Aeline Pathway – Event Management Platform

A premium corporate, minimalist event scheduling and management platform built as a high-fidelity recruitment assessment. Inspired directly by professional Webflow corporate workspace aesthetics, this platform features an intelligent, contextual architecture designed to scale seamlessly.

**Live Application:** [https://pathway-1-8cok.onrender.com](https://pathway-1-8cok.onrender.com)

---

## 🚀 Key Architectural Features

* **Dual-Paradigm Aesthetic Design Mode:** Includes a fully reactive navigation toggle switching dynamically between:
  * **Premium High-Contrast Dark Theme:** Featuring carbon palettes, structural lines, and crisp neon-lime components (`#96f940`).
  * **Minimalist Corporate Light Theme:** Emulating clean agency styling with staggered layouts, flat warm-grey card finishes (`#f4f4f4`), and precise grayscale element mapping.
* **Production Deployment Rigor:** Frontend assets optimized for static server distribution, configured with continuous delivery directly via Render.
* **Resilient API Pipeline:** Integrated with an explicit trailing-slash pipeline architecture to prevent common network redirect preflight drop-offs (`/api/events/`, `/api/login/`, `/api/my-registrations/`).
* **Complete Enrollment Security Lifecycle:** Full dynamic security indicators tracking pass availability limits, custom password security entropy meters, and authenticated user registration hooks.

---

## 🛠️ Technology Stack

* **Frontend Framework:** React (Vite-optimized production build context)
* **Routing Architecture:** `react-router-dom` (SPA Client-Side Route Preservation Mapping)
* **Styling Engine:** Tailwind CSS
* **Network Middleware:** Axios (Centralized API interceptor structure)
* **Cloud Infrastructure Hosting:** Render

---

## 📂 System Core Layout Summary

* **`App.jsx`:** Serves as the global context framework, managing core state indicators (authentication state & active design theme parameters) and providing consistent wrapper structures.
* **`EventListing.jsx`:** The centralized directory pipeline processing search parameters, item categorization structures, and multi-tier layout layouts.
* **`EventDetails.jsx`:** Dynamic breakdown structure for separate entities featuring live capacity indicators and system attendance handling.
* **`MyRegistrations.jsx`:** Authenticated client-ledger parsing specific enrollment states.
* **`Login.jsx` & `Register.jsx`:** Modular infrastructure security doors with built-in dynamic verification constraints.

---

## 💻 Local Workspace Inspection Setup

To verify runtime behavior, inspect the configuration parameters, or test the environment locally, initialize the workspace with the following procedure:

### 1. Clone the Source Repository
```bash
git clone <your-github-repository-url>
cd aeline-pathway-frontend
