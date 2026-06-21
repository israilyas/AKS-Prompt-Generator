# AGENTS.md — Aks (by ImagePromptLab)

This file gives any AI coding agent (Claude Code, Cursor, Copilot, etc.) everything needed to
build, finish, or modify this project without asking the owner follow-up questions.

## 1. What this project is

**Aks** ("اکس" — Urdu/Hindi for "reflection" or "image") is a **free, static, client-side web
tool** that generates ready-to-use AI image prompts (for Google Gemini and ChatGPT image
generation) for South Asian / Muslim cultural photography themes: sarees, Hajj/Umrah portraits,
Eid family photos, football jersey portraits (FIFA 2026 / IPL), and cinematic cultural portraits.

It is built and open-sourced by **ImagePromptLab** (https://imagepromptlab.com) as a **linkable
asset** — a free utility released publicly to earn backlinks and referral traffic from GitHub,
GitHub Pages, and any site that discovers and links to it. Aks is the product name; ImagePromptLab
is the parent brand. Every credit line should read "Aks by ImagePromptLab," never just
"ImagePromptLab" alone, and never an unrelated standalone name.

**Naming check already done — do not rename.** "Promptly," "PromptBox," and "PromptLab" were
considered and rejected because all three are already in heavy use by unrelated existing
apps/extensions/sites. "Aks" was checked and has no meaningful collision in this niche. Do not
substitute a different name without re-running this same collision check.

**This is not an AI-powered app.** It does not call any LLM API. It is a deterministic
template-assembly tool: the user picks options from dropdowns and/or types free text, and
JavaScript assembles a structured prompt string from a fixed prompt framework (see Section 3).
This is a deliberate choice — no API key, no backend, no hosting cost, no rate limits, nothing
that can break.

## 2. Non-negotiable technical constraints

- **No API calls of any kind.** No `fetch()` to any LLM provider, no API keys, no `.env` files.
- **No backend, no server, no database.** Pure static `index.html` + `style.css` + `script.js`
  (or a single self-contained `index.html` if simpler).
- **No build step required.** It must run by double-clicking `index.html` or via GitHub Pages
  with zero configuration. Frameworks (React, Vue, etc.) are not necessary — plain HTML/CSS/JS
  is preferred for zero-maintenance reasons. If a framework is used anyway, it must still
  produce a static export with no server runtime.
- **No external dependencies that require accounts, billing, or API keys.** Google Fonts via
  `<link>` tag is fine. Icon fonts loaded from a public CDN are fine.
- **Must work fully offline after first load** (no live network calls needed to function).
- **Must be mobile-responsive.** Most of the target audience will land here from a phone.
- **Accessibility:** visible keyboard focus states, sufficient color contrast, working labels on
  all form controls, modal/popup must trap focus and be closable with Escape.

## 3. The prompt framework (use exactly this structure)

Every generated prompt must be assembled from these 10 sections, in this order. This is
ImagePromptLab's standard reusable framework — do not invent a different structure.

1. **Identity lock** — who the subject is (age range, gender, ethnicity context, consistent
   description if reusing a persona)
2. **Scene** — what is happening / the setting's core action
3. **Outfit** — clothing detail (saree, ihram, jersey, sherwani, etc.)
4. **Pose** — body position, expression
5. **Camera angle** — e.g. low angle, eye-level, three-quarter
6. **Lighting** — golden hour, studio softbox, cinematic low-key, etc.
7. **Lens specs** — e.g. 85mm shallow depth of field, DSLR, bokeh
8. **Background** — location detail (haveli courtyard, Karachi seafront, Kaaba-adjacent
   reverent framing — see Section 8 for sensitivity notes, studio backdrop)
9. **Mood** — emotional tone (warm/nostalgic, bold/triumphant, calm/reverent)
10. **Negative controls** — what to avoid (extra fingers, blurry face, distorted text, warped
    proportions)

## 4. Customization model — dropdowns AND free text (required)

This is the most important functional requirement and the main thing that was missing from the
first draft of this tool. **Do not ship a dropdown-only version.** The owner explicitly compared
this to imagepromptlab.com's own prompt builder, which lets the user type their own details
rather than being limited to a fixed list — Aks must match that flexibility, not fall short of it.

Every one of the 10 framework sections gets **two coupled inputs**, not one:

1. A **dropdown** of 4–6 curated example options per theme (more variety than the first draft,
   which only had 2–3 options per field — expand every option list to at least 4 entries).
2. A **free text field** next to or below it, placeholder text like "or type your own", which
   **overrides** the dropdown when non-empty. If the text field is empty, the dropdown value is
   used. This mirrors how imagepromptlab.com's own generator works — selectable presets for
   speed, but never a hard ceiling on what the user can ask for.

Implementation detail: each field is a small component pairing `<select>` + `<input
type="text">`. On generate, the logic is: `value = textInput.value.trim() || select.value`.
Don't silently concatenate both if both are filled — text input wins outright.

At minimum, give free text override on these fields, since they're the ones most likely to need
something not in the list: **identity, outfit, location/background, and a final open "extra
details" field** that gets appended to the assembled prompt as an additional sentence if filled.
The remaining fields (pose, camera angle, lighting, lens, mood) can be dropdown-only if the
"extra details" field exists as a catch-all, but giving all ten the same dropdown+text pattern is
preferred for consistency and is not much extra work since the component is reused.

### Variety / randomize

Add a **"Surprise me"** button (or icon button) near the theme picker, consistent with the
existing Free Prompt Builder on imagepromptlab.com which already has this feature. It should
randomly pick one option from each dropdown (free text fields stay as the user left them) and
immediately populate the form, so the user gets instant inspiration without manual selection.

## 5. Required UI elements

- Theme selector (4 themes — see Section 6, expandable later)
- For every framework section: paired dropdown + free text override (Section 4)
- An "extra details" open text field as a catch-all (Section 4)
- A **"Surprise me"** randomize button
- An explicit **"Generate prompt"** button. Do not auto-generate on every keystroke/change —
  the user must press generate. This was explicitly requested: the previous draft auto-updated
  the output on every dropdown change with no clear action to press, which read as incomplete.
- Clicking generate opens the **result in a popup/modal** (see Section 7) — it must not just
  quietly update an inline text block the way the first draft did.
- A short, plain-language explainer of what the tool does (1–2 sentences max) above the form
- Footer with the backlink block (see Section 9 — do not skip this)
- A "More prompts like this" / "Need more control" link pointing to ImagePromptLab (Section 9)

## 6. Required themes (initial launch scope)

Build these four prompt themes first. Each needs its own preset data for all 10 framework
sections, with at least 4 dropdown options per field (see Section 4 — this is an increase from
the original 2–3, specifically to address the "no variety" feedback).

1. **Saree portrait** — jhumkas, phulkari/traditional embroidery references, draping styles
2. **Football jersey portrait** — FIFA 2026 players (Ronaldo, Messi, Mbappé, Neymar), boy/girl/
   couple variants
3. **Hajj / Umrah portrait** — ihram, modest reverent framing — see Section 8, mandatory
   sensitivity rules
4. **Eid family portrait** — coordinated traditional outfits, multi-person framing

Leave the code structured (a `themes.js` config object) so more themes can be added later
without touching the core generator logic or the UI components.

## 7. Result popup / modal (required — matches imagepromptlab.com behavior)

The owner's existing site shows the generated prompt in a popup after the user takes action,
not inline on the page. Aks must do the same. Specification:

- Triggered only by pressing **"Generate prompt"** — never opens automatically on page load or
  on dropdown change.
- Modal overlay covers the page (semi-transparent scrim), content card centered, normal
  document flow inside the card (no `position: fixed` on inner elements — see the frontend
  design constraints already in this repo's style guidance if present).
- Modal contents, top to bottom:
  1. Small heading, e.g. "Your prompt is ready"
  2. The full assembled prompt as selectable plain text in a bordered/shaded box
  3. **Copy to clipboard** button as the primary action, with a brief inline confirmation
     ("Copied") after click, no separate alert/toast system needed
  4. Secondary row: **"Generate another"** (re-rolls using current field values, stays in
     modal) and **"Edit details"** (closes modal, returns focus to the form) buttons
  5. The ImagePromptLab CTA link from Section 9.2, present inside the modal as well as the page
     footer, since the modal is the moment of highest engagement
- Closeable via an explicit close control, clicking the scrim, and the Escape key.
- Focus moves into the modal on open and returns to the "Generate prompt" button on close
  (basic accessibility requirement, not optional).
- No page reload or navigation — everything happens client-side in the same document.

## 8. Cultural and religious sensitivity rules (mandatory)

This tool serves a South Asian / Muslim audience and must not produce content that is
disrespectful or inappropriate.

- **Hajj/Umrah theme**: keep all framing modest and reverent. No close-up generation requests
  involving the Kaaba itself as a "background prop" — frame locations as "near the Haram,"
  "Mecca-adjacent," or similar respectful, non-presumptuous phrasing. Do not generate prompts
  that depict acts of worship inaccurately or irreverently. Free text overrides on this theme
  should still pass through the same negative-controls sentence; do not give this theme an
  "extra details" field with no guardrail copy nearby — add a one-line hint under the field such
  as "Keep descriptions modest and respectful" so free-form input stays on-brand.
- **All themes**: default wording should assume modest dress consistent with the cultural
  context (no prompt defaults that push toward revealing clothing).
- **No real public figures' likeness instructions** beyond names already used in
  ImagePromptLab's existing published content (e.g. referencing "a Ronaldo-style jersey" is
  fine as an outfit description; do not add instructions aimed at generating a deepfake-style
  likeness of a specific real person's face).

## 9. Backlink placement — required, do not omit

The entire point of releasing this tool publicly is to earn durable backlinks to
**https://imagepromptlab.com**. Every required placement below must use this exact root domain
unless a specific deep link is given. Do not use rel="nofollow" or rel="ugc" on these links —
the goal is a standard followable credit link.

### 9.1 On the live page (`index.html`)

- **Header**, small wordmark area: "Aks" as the product name, with "by ImagePromptLab" as a
  smaller subline or adjacent link to `https://imagepromptlab.com`.
- **Footer**, every page load, visible (not hidden behind a click): a line such as
  `Aks is built by ImagePromptLab — free AI prompt tools for Gemini & ChatGPT` where
  "ImagePromptLab" links to `https://imagepromptlab.com`.
- **Inside the result modal** (Section 7, item 5): a callout linking to
  `https://imagepromptlab.com/gemini-ai-prompt-generator/` with text like "Want more control?
  Try the full Prompt Generator on ImagePromptLab."
- `<meta name="author" content="ImagePromptLab">` and
  `<meta name="generator" content="Aks by ImagePromptLab">` in the `<head>`.
- Open Graph `og:site_name` should read "Aks by ImagePromptLab"; a visible on-page link should
  still reference imagepromptlab.com directly (not just buried in meta tags).

### 9.2 In `README.md` (GitHub repo root)

Required, near the top, not buried at the bottom:
- Title: `# Aks — free AI image prompt generator for Gemini & ChatGPT`
- A line directly under the title: `Aks is built by [ImagePromptLab](https://imagepromptlab.com)
  — AI image prompt tools for Gemini and ChatGPT, focused on South Asian and Muslim cultural
  photography.`
- A "Live demo" link to the GitHub Pages URL.
- A "More tools" section near the end linking to:
  - `https://imagepromptlab.com` (homepage)
  - `https://imagepromptlab.com/gemini-ai-prompt-generator/` (main product)

### 9.3 In `package.json` (if one exists)

```json
{
  "name": "aks",
  "author": "ImagePromptLab <https://imagepromptlab.com>",
  "homepage": "https://imagepromptlab.com"
}
```

### 9.4 GitHub repository metadata

When the repo is created on GitHub, set:
- **Repo name**: `aks` or `aks-prompt-generator`
- **Description field**: mention both "Aks" and imagepromptlab.com by name
- **Website field** (repo settings): `https://imagepromptlab.com`
- **Topics/tags**: include `imagepromptlab` as one topic alongside relevant ones (see Section 10)

## 10. SEO-friendly content for this project

Use this copy as-is or adapt lightly — it has been written to be keyword-relevant and to match
ImagePromptLab's existing content voice (conversational, short sentences, second-person "you").

### Repo name (GitHub)
`aks-prompt-generator` (fallback: `aks-ai-prompts` if taken)

### Repo description (GitHub, max ~160 characters)
`Aks — free tool to generate AI image prompts for Gemini & ChatGPT. Sarees, Hajj/Umrah, Eid, football jersey portraits. By imagepromptlab.com`

### Repo topics/tags (GitHub allows multiple)
`ai-prompts` `gemini-ai` `chatgpt-prompts` `image-generation` `prompt-engineering`
`south-asian` `free-tool` `imagepromptlab` `ai-image-prompts` `prompt-generator`

### Page `<title>` (index.html)
`Aks — free AI image prompt generator for Gemini & ChatGPT | South Asian portraits`

### Meta description (under 160 characters)
`Generate ready-to-use AI image prompts for sarees, Hajj/Umrah, Eid, and football jersey portraits. Free, no signup, works instantly with Gemini and ChatGPT.`

### H1 on the page
`Aks — free AI prompt generator for Gemini and ChatGPT`

### Short intro paragraph (above the tool, in the page)
`Pick a theme, customize every detail, and get a ready-to-use prompt for Gemini or ChatGPT image generation. No signup, no API key, completely free. Aks is built by ImagePromptLab.`

### README.md structure (SEO-friendly heading order)

```markdown
# Aks — free AI image prompt generator for Gemini & ChatGPT

Aks is built by [ImagePromptLab](https://imagepromptlab.com) — AI image prompt tools for Gemini
and ChatGPT, focused on South Asian and Muslim cultural photography.

[Live demo →](GITHUB_PAGES_URL_HERE)

## What this tool does

A free, no-signup tool that generates ready-to-use AI image prompts for Gemini and ChatGPT.
Pick a theme, saree portraits, Hajj/Umrah photos, Eid family portraits, or football jersey
shots, customize every detail with dropdowns or your own free text, and copy a complete prompt
in seconds.

## Why this exists

Most prompt guides online are generic and skip cultural detail entirely. This tool focuses on
South Asian and Muslim photography themes specifically: sarees, jhumkas, Hajj and Umrah
portraits, Eid family photos, and football fan portraits for the 2026 World Cup season.

## How to use it

1. Choose a theme
2. Adjust the dropdowns, or type your own details in any field
3. Press generate
4. Copy the prompt from the popup
5. Paste it into Gemini or ChatGPT

## Themes included

- Saree portraits
- Football jersey portraits (FIFA 2026 players)
- Hajj / Umrah portraits
- Eid family portraits

## Tech

Pure HTML, CSS, and JavaScript. No API key, no backend, no signup, no tracking.

## More tools

- [ImagePromptLab](https://imagepromptlab.com) — more free AI prompt tools and guides
- [Gemini AI Prompt Generator](https://imagepromptlab.com/gemini-ai-prompt-generator/) — the
  full version with more controls

## License

MIT
```

### Suggested blog post on imagepromptlab.com announcing the tool

Title: `We open-sourced Aks, our free prompt tool — try it on GitHub`
Meta description: `ImagePromptLab released Aks, a free open-source AI prompt generator for Gemini and ChatGPT, on GitHub. No signup needed, try it now.`

Follow the existing site article template (intro with keyword in first paragraph, numbered
how-to, three tips, five FAQs, CTA to the Custom Prompt Generator, JSON-LD schema) and link out
to the GitHub repo and GitHub Pages live demo using descriptive anchor text (not "click here").

## 11. File structure to produce

```
/
├── AGENTS.md          (this file)
├── README.md          (Section 10 structure above)
├── LICENSE             (MIT)
├── index.html
├── style.css
├── script.js
└── themes.js           (theme/preset data, separate from generator logic)
```

## 12. Definition of done

- [ ] Opens correctly via `file://` with no console errors
- [ ] No network calls fire on load or on generate (check Network tab — should be empty besides
      fonts/icons)
- [ ] All 4 themes generate a complete 10-section prompt
- [ ] Every field has a working dropdown AND a free text override that takes priority when filled
- [ ] "Extra details" catch-all field appends correctly to the final prompt
- [ ] "Surprise me" randomizes dropdowns sensibly
- [ ] "Generate prompt" is a deliberate button press, not an auto-update on every change
- [ ] Generated result opens in a popup/modal, not inline (see Section 7 for full spec)
- [ ] Modal: copy to clipboard works with visible confirmation
- [ ] Modal: closes via close button, scrim click, and Escape key
- [ ] Modal: focus trapped while open, returns to trigger button on close
- [ ] Copy-to-clipboard works
- [ ] Mobile responsive (test at 375px width)
- [ ] Header shows "Aks" with "by ImagePromptLab" credit/link
- [ ] Footer backlink to imagepromptlab.com present and visible without scrolling on desktop
- [ ] Modal contains its own CTA link to imagepromptlab.com/gemini-ai-prompt-generator/
- [ ] README.md follows Section 10 structure with all required links
- [ ] No em dashes anywhere in user-facing copy (matches ImagePromptLab's site-wide style rule)
- [ ] Sentence case headings throughout, not Title Case
