# fgpanel — Seneca II panel (FlightGear / OpenAttitude)

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: GPL-3.0-or-later.

Vue 3 + Vite **application** that lays out a **Seneca II–style instrument panel** and binds it to **FlightGear** properties over the generic **PropertyListener** WebSocket (`@openattitude/core`). It composes published **`@openattitude/*`** instrument packages from npm (LGPL) with this GPL-3.0 shell app.

This project is a **deployable panel**, not a reusable npm library (`package.json` is `"private": true`).

---

## Contents

- [Stack](#stack)
- [Prerequisites](#prerequisites)
- [Setup and scripts](#setup-and-scripts)
- [Run locally](#run-locally)
- [FlightGear connection](#flightgear-connection)
- [Routes and fullscreen instruments](#routes-and-fullscreen-instruments)
- [Layout, DPI, and styling](#layout-dpi-and-styling)
- [Instrument packages](#instrument-packages)
- [Build and static hosting](#build-and-static-hosting)
- [GitHub Pages](#github-pages)
- [Instrument testbeds](#instrument-testbeds)
- [Related documentation](#related-documentation)

---

## Stack

| Area | Technology |
|------|------------|
| UI | Vue 3, Vue Router, Pinia |
| Toolkit | Bootstrap 5, Bootstrap Icons |
| Map | Leaflet (via `@openattitude/other-gps-generic`) |
| FlightGear | `@openattitude/core` — Pinia store, property subscriptions, `installPanelMath()` |
| Build | Vite 8, TypeScript, vue-tsc, ESLint |

---

## Prerequisites

- **Node.js** compatible with the versions declared for Vite/Vue in `package.json` (Node 20+ is a safe minimum; CI uses Node 24).
- **FlightGear** with the generic **WebSocket PropertyListener** available if you want live data (see [@openattitude/core](https://www.npmjs.com/package/@openattitude/core) — `ws://<host>/PropertyListener`).

---

## Setup and scripts

This directory is the **git repository root** for the Seneca II panel (clone it, or open it as its own project):

```bash
npm install
```

| Script | Purpose |
|--------|---------|
| `npm run dev` | Vite dev server (default URL in terminal). |
| `npm run build` | `vue-tsc` then production build to `dist/`. |
| `npm run preview` | Serve `dist/` locally (after a build). |
| `npm run lint` | ESLint. |
| `npm run lint:fix` | ESLint with `--fix`. |

---

## Run locally

```bash
npm run dev
```

Open the panel (see [Routes](#routes-and-fullscreen-instruments)). Append [query parameters](#flightgear-connection) to point at your FlightGear host.

---

## FlightGear connection

Live instruments use **`useFgPanelPropertyBindings`** (`src/composables/useFgPanelPropertyBindings.ts`), which subscribes to the PropertyListener paths expected for this Seneca II layout (airspeed, attitude, HSI/KCS55, GPS position, engine strip, etc.).

### Query parameters (shared across routes)

| Query | Meaning |
|--------|---------|
| **`fgfs`** | FlightGear PropertyListener host passed to `@openattitude/core` (hostname or `host:port`, **no** `ws://` prefix). Example: `?fgfs=127.0.0.1:8080`. Omit or empty to avoid connecting (instruments stay at default/off values). |
| **`dpi`** | If set to a number **greater than 10**, updates CSS variable **`--mydpi`** for physical sizing of gauge cutouts (default baseline in `App.vue` is `96`). |
| **`gradient`** | When `gradient=true`, enables the decorative **gradient bezel** CSS class on instruments. |

Example:

```text
http://localhost:5173/?fgfs=127.0.0.1:8080&dpi=120&gradient=true
```

Fullscreen and deep links share the same query string when opened from the panel.

For protocol and store usage details, see the **`@openattitude/core`** package on [npm](https://www.npmjs.com/package/@openattitude/core) (and its published README).

### Panel math

`src/main.ts` calls **`installPanelMath()`** from `@openattitude/core` so instruments can use **`Math.interpolate`** / **`Math.clamp`** where implemented.

---

## Routes and fullscreen instruments

| Path | Name | Purpose |
|------|------|---------|
| `/` | `panel` | Main Seneca II dashboard; click a gauge to open it fullscreen. |
| `/instrument/:instrumentId` | `instrument` | Single instrument; `instrumentId` must be one of the IDs in `src/instrumentIds.ts`. |
| `/ClockView` | — | Redirects to `/instrument/clock` (legacy path). |
| `/test` | `test` | Developer index: links to routes and fullscreen list. |
| `/testbeds` | `testbeds` | Testbed hub: links to per-package Vite dev servers (see below). |

### `instrumentId` values

Defined in **`src/instrumentIds.ts`**:  
`clock`, `asi`, `attitude`, `altimeter`, `gps`, `adf`, `turn-coordinator`, `hsi`, `vsi`, `ki209`, `rpm-1`, `rpm-2`, `manifold`, `fuel-flow`, `egt-1`, `egt-2`, `gyro-pressure`, `flap`, `engine-left`, `engine-right`.

Invalid IDs redirect to the main panel.

---

## Layout, DPI, and styling

- **`App.vue`** defines global CSS variables: `--mydpi`, `--myspacing`, and cutout sizes `--cutout_3inch`, `--cutout_2inch`, `--cutout_1inch`, plus utility classes `gauge3` / `gauge2` / `gauge1`, `cutout`, `gauge`, **`gradient-border`** (metallic bezel).
- The panel grid and positioning are implemented in **`Panel.vue`** (absolute cutouts). Fullscreen layout lives in **`InstrumentFullscreenView.vue`** (`WIDE_INSTRUMENT_IDS` gets a wider treatment for the engine strips).

---

## Instrument packages

Dependencies are **npm semver** (`^0.1.0`) on **`@openattitude/core`** and each instrument package. A local clone of the instruments monorepo is **not** required to build this app.

| Package | Role in this app |
|---------|------------------|
| `@openattitude/core` | Pinia property store, panel math, shared Vue helpers |
| `@openattitude/other-gps-generic` | Moving-map GPS |
| `@openattitude/steam-*` | Steam-style gauges (clock, ASI, attitude, HSI, ADF, engine, etc.) |

The moving map uses **OpenStreetMap** tiles by default. An **openAIP** overlay is supported by the GPS component via an optional **`openaip-api-key`** prop; this panel does not wire that prop today—see **`@openattitude/other-gps-generic`** if you extend the host templates.

---

## Build and static hosting

```bash
npm run build
```

Output: **`dist/`** (single bundled JS/CSS suitable for static hosting).

### Subpath deployment (`BASE_URL`)

The **published** site uses the **custom domain** at the zone apex (**`https://senecaii.openattitude.org/`**), so CI builds with **`BASE_URL=/`** (default). You normally do not need to set `BASE_URL` locally unless you mimic that layout.

If you ever host **under a repository path** (e.g. `https://org.github.io/repo-name/`), build with:

```bash
BASE_URL=/repo-name/ npm run build
```

Trailing slash is recommended. **`vite.config.ts`** reads **`process.env.BASE_URL`** (default `/`). **`src/router.ts`** uses **`import.meta.env.BASE_URL`** for `createWebHistory`.

---

## GitHub Pages

**Live site:** https://senecaii.openattitude.org  

The workflow **[`.github/workflows/seneca-ii-github-pages.yml`](.github/workflows/seneca-ii-github-pages.yml)** is at the **repository root** of this project. It runs **`npm ci` / `npm run build`** with **`BASE_URL=/`**, then deploys **`dist/`** via **upload-pages-artifact** and **deploy-pages**.

### Custom domain and DNS

1. In the **org** repository: **Settings → Pages → Custom domain** → **`senecaii.openattitude.org`**. Save and wait for DNS check.
2. At your DNS host for **`openattitude.org`**, add a **CNAME** record:
   - **Name / host:** `senecaii` (or `senecaii.openattitude.org` depending on the provider).
   - **Target / value:** **`<org>.github.io`** where `<org>` is the GitHub account or organization name that owns the repo (exact spelling as in `https://github.com/<org>/...`).
3. **`public/CNAME`** in this app contains the hostname so the static **`dist/`** artifact includes a **`CNAME`** file for Pages (GitHub may also write one when you save the custom domain).
4. Enable **HTTPS** once GitHub shows the certificate as ready (**Enforce HTTPS** on Pages).

### Repository settings

**Settings → Pages → Build and deployment → Source: GitHub Actions.**  
First run: approve the **github-pages** environment if prompted (**Settings → Environments**).

**Triggers:** push to **`main`** or **`master`**, plus **workflow_dispatch**.

---

## Instrument testbeds

Each `@openattitude/*` package can run its own **Vite testbed** from the **OpenAttitude instruments** monorepo (separate repository that publishes those npm packages). The in-app **Testbed hub** (`/testbeds`) lists ports and suggested commands such as:

```bash
npm run dev:testbed --workspace=@openattitude/steam-clock-generic
```

### Environment: `VITE_TESTBED_ORIGIN`

If testbed dev servers run on **another host** than the panel, create **`.env.local`** in this app:

```bash
VITE_TESTBED_ORIGIN=http://192.168.1.10
```

The hub uses that origin when building `http://host:port/` links for each testbed. If unset, it uses the **current page’s hostname** with each package’s fixed port (see `src/testbedManifest.ts`).

---

## Related documentation

| Resource | Content |
|----------|---------|
| [`@openattitude/core`](https://www.npmjs.com/package/@openattitude/core) | PropertyListener WebSocket, Pinia store, SVG helpers, `installPanelMath` |
| OpenAttitude instruments monorepo | Sources for `@openattitude/*` packages (separate git repo; published to npm) |

---

## Lint

```bash
npm run lint
npm run lint:fix
```
