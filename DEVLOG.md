## Day 1 — 2026-05-20

**Hours worked:** 3

**What I did:**
- Created GitHub repository ai-spend-audit
- Set up React + Vite project structure
- Created all required markdown files
- Deployed skeleton app to Vercel
- Started reaching out to potential users for interviews
- Created Supabase project and set up database

**What I learned:**
- Understood the full project requirements from the PDF
- Planned the audit engine logic and data flow
- Researched pricing pages for all required AI tools

**Blockers / what I'm stuck on:**
- Need to confirm Anthropic API free credits
- Need to schedule user interviews

**Plan for tomorrow:**
- Build the spend input form with all AI tools
- Add all plan options for each tool
- Implement localStorage persistence
- Collect all pricing data with official URLs


## Day 2 — 2026-05-21

**Hours worked:** 4

**What I did:**

* Improved the landing page UI and overall layout
* Built the hero section with CTA and gradient background
* Added the “How It Works” section with modern UI components
* Styled the page using Tailwind CSS for a clean SaaS look
* Added icons, arrows, and responsive spacing improvements

**What I learned:**

* How to build modern SaaS-style landing pages using Tailwind CSS
* Better understanding of layout spacing, gradients, and UI hierarchy
* How SVG icons and reusable components improve UI consistency

**Blockers / what I'm stuck on:**

* Need to start building the spend input form and audit flow
* Still deciding the best structure for pricing and tool data

**Plan for tomorrow:**

* Build the AI spend input form
* Add tool selection and pricing inputs
* Start implementing localStorage persistence


## Day 3 — 2026-05-22

**Hours worked:** 5

**What I did:**
* Built the AI spend audit input form UI
* Added fields for team size and primary use case
* Implemented validation for required form inputs
* Improved the landing page UI and overall visual consistency
* Refined spacing, typography, responsiveness, and reusable UI components
* Explored Supabase setup and backend integration flow
* Created and configured environment variables using a `.env` file for Supabase keys and project setup
* Made multiple small UI and structure improvements across the project

**What I learned:**
* How to structure and manage larger React forms effectively
* Better understanding of form validation and controlled inputs
* Importance of secure environment variable handling
* Basics of integrating Supabase with a frontend application

**Blockers / what I'm stuck on:**
* Need to connect form inputs with audit calculation logic
* Need to finalize recommendation rules and pricing structure

**Plan for tomorrow:**
* Build the audit engine logic
* Calculate monthly and yearly savings
* Generate recommendation cards based on user inputs
* Start connecting form data to the results page

## Day 4 — 2026-05-22

**Hours worked:** 6

**What I did:**
- Built complete audit engine with logic for all 6 tools
- Added overlap detection for redundant tools
- Built results page with per-tool breakdown
- Added hero savings section and Credex CTA
- Connected form → results flow via React Router
- Wrote 5 unit tests for audit engine

**What I learned:**
- How to write defensible audit logic with real reasoning
- Importance of handling edge cases (free plans, single users)

**Blockers / what I'm stuck on:**
- Need Anthropic API key to add AI summary tomorrow

**Plan for tomorrow:**
- Add AI-generated personalized summary via Anthropic API
- Add lead capture email form
- Generate unique shareable URL per audit