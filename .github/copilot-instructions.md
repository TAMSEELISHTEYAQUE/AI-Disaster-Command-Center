# AI Disaster Command Center - GitHub Copilot Instructions

## Project Overview

This project is an AI-powered Disaster Command Center designed for hackathons like Smart India Hackathon (SIH). It simulates a real-time emergency operations center by integrating disaster monitoring, weather intelligence, earthquake data, AI recommendations, mapping, reporting, and mission management.

The goal is to create a professional, scalable, modular web application that looks and behaves like software used by national disaster management agencies.

---

# Architecture

This project follows a modular JavaScript architecture.

Current modules include:

- app.js
- api.js
- weather.js
- earthquake.js
- liveData.js
- map.js
- layers.js
- charts.js
- alerts.js
- ai.js
- mission.js
- report.js
- utils.js
- data.js

Each module has a single responsibility.

Never merge unrelated modules.

---

# General Rules

Before writing code:

1. Read the repository.
2. Understand the existing architecture.
3. Preserve compatibility.
4. Never rewrite the entire project.
5. Only modify files required for the requested feature.

---

# UI Rules

Maintain the existing dark command-center theme.

Never redesign the dashboard unless explicitly requested.

Reuse existing components whenever possible.

Avoid duplicate HTML.

Keep animations lightweight.

Maintain responsive behaviour.

---

# JavaScript Rules

Use vanilla JavaScript.

Avoid unnecessary libraries.

Do not introduce frameworks.

Do not rename existing public functions unless explicitly instructed.

Keep functions small and modular.

Avoid duplicated logic.

Prefer reusable helper functions.

---

# CSS Rules

Reuse existing classes.

Avoid duplicate styles.

Group related styles together.

Preserve current design language.

---

# Performance Rules

Avoid unnecessary DOM queries.

Cache frequently used elements.

Avoid repeated API requests.

Do not block page rendering.

Keep memory usage low.

---

# Code Quality

Write readable code.

Use meaningful variable names.

Add comments only where helpful.

Never leave unused variables.

Never leave dead code.

---

# AI Features

Whenever AI functionality is added:

- Explain reasoning.
- Keep outputs deterministic unless randomness is intentional.
- Integrate with existing dashboard components.
- Avoid fake AI claims.

---

# Mapping

Preserve compatibility with the existing map.

Do not remove layers.

New layers should be optional.

---

# Reports

Report generation must continue working.

Never break export functionality.

---

# Mission System

Mission management should remain compatible with alerts and incidents.

Avoid hardcoded values when dynamic data is available.

---

# Charts

Reuse existing chart initialization.

Update data instead of recreating charts.

---

# Safety

Never remove existing features unless explicitly instructed.

Never delete files without approval.

Never rename folders.

Never change file structure unless requested.

---

# Preferred Workflow

For every task:

1. Analyse the repository.
2. Explain which files will change.
3. Make only necessary modifications.
4. Explain what changed.
5. Preserve compatibility with all existing modules.

Always optimise for maintainability and hackathon readiness.