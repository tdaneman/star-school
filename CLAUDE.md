# STAR SCHOOL — Claude Code Project Brief

This file is the single source of truth for building the Star School app.
Read it fully before writing any code. Every design, content, and architecture
decision should trace back to something in here.

---

## What This App Is

Star School is a mobile-first web app that teaches archetypal astrology —
signs and planets as mythological/psychological patterns, not horoscope
predictions. The pedagogical goal is pattern recognition, not memorization.
The app's whole arc ends with the user being able to read their own natal chart.

**Working name:** Star School (placeholder, easy to change)
**Tagline:** "Read your own damn chart."
**Voice reference:** "Ed-tech, but make it witchy."

**v1 scope:** Signs + Planets only, taught in three parts:
1. Signs alone (archetypal qualities) — 12 entries, content complete
2. Planets alone (mythic function) — 10 entries, content complete
3. Planet-in-Sign combinations — 120 entries, not yet written (future)

Houses, Aspects, and Chart Reading are future phases. Do not build for them yet.

---

## Tech Stack

- **Framework:** React (Vite)
- **Deployment:** Vercel
- **Styling:** CSS modules or plain CSS — no Tailwind
- **Routing:** React Router
- **No backend required for v1** — all content is static JSON

---

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build locally

---

## Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Space Black | `#0a0a1a` | Primary background |
| Deep Navy | `#0d0d2b` | Card backgrounds |
| Cosmic Purple | `#7b5ea7` | Accent, active states |
| Lavender | `#c8b8e8` | Primary text on dark, nav icons |
| Stardust White | `#e8e4f0` | Body text |
| Celestial Gold | `#d4b86a` | Planet/sign names (headings) |
| Nebula Pink | `#e05c8a` | Highlights, gradients |
| Teal Glow | `#3ec6c6` | Secondary accent |
| Soft Green | `#4a9e7a` | Correct answer, completion dot |
| Muted Red | `#b45050` | Wrong answer |

Gradients: deep navy → cosmic purple (primary), nebula pink → teal (accent).

### Typography

| Role | Font | Notes |
|------|------|-------|
| Display / Wordmark / Planet Names | Cinzel (Google Fonts) | Spaced caps, serif, used with restraint |
| Body / Descriptions | Inter (Google Fonts) | Weight 300–500 |

**Import:** `https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@300;400;500&display=swap`

### Type Scale

- Wordmark: Cinzel 13px, letter-spacing 0.25em
- Planet name (lesson card): Cinzel 28px, weight 600, letter-spacing 0.15em
- Planet name (quiz): Cinzel 20px
- Section labels: Cinzel 10–11px, letter-spacing 0.25–0.3em, uppercase
- Body text: Inter 13px, line-height 1.7, weight 300
- Shadow text: Inter 12px, italic, weight 300
- Card meta: Inter 10px, weight 300

### Spacing & Radius

- Page padding: 20px horizontal
- Card radius: 12px
- Box radius: 10px
- Bottom nav height: ~60px (always visible)
- Min touch target: 44px height on all interactive elements

### Logo

The cosmic eye — a stylized eye with astrological chart lines radiating from it,
set against a nebula background. Use as app icon / splash. Do not recreate in
code — treat as a static image asset (`/assets/logo.png`).

---

## App Architecture

### Screens

1. **Home** — scrollable list of unit cards (Signs row, Planets row). Each card
   shows symbol, name, element/cycle info, and a status dot (done / active / locked).
2. **Lesson** — full lesson card for a sign or planet. Symbol, name, tagline,
   word pills, archetype paragraph, shadow note, "Test Your Understanding" button.
3. **Quiz** — word-cloud multiple choice. Question, 4 options, feedback on answer,
   "Next Lesson" button navigating to the next item.
4. **Profile** (stub) — placeholder for future progress tracking.

### Navigation

Bottom nav bar, always visible, 4 items: Learn (planet icon) · Chart (eye icon) ·
Saved (bookmark icon) · Profile (user icon). Chart and Saved are stubs in v1.

### Routing

```
/                  → Home
/learn/signs/:id   → Sign lesson (e.g. /learn/signs/aries)
/learn/planets/:id → Planet lesson (e.g. /learn/planets/venus)
/quiz/:type/:id    → Quiz (e.g. /quiz/planets/venus)
```

### Data Structure

All content lives in `/src/data/`. Two files:

**signs.json** — array of 12 sign objects:
```json
{
  "id": "aries",
  "name": "Aries",
  "symbol": "♈",
  "modality": "Cardinal",
  "element": "Fire",
  "ruler": "Mars",
  "tagline": "The first move.",
  "archetype": "Aries is the archetype of initiation...",
  "shadow": "The same instinct that moves first can move without looking...",
  "wordPills": ["I … initiate", "begin", "assert", "dare", "lead"],
  "quizChoices": [
    { "text": "Initiate. Assert. Begin. Dare.", "correct": true },
    { "text": "Romance. Luxury. Art. Elegance.", "correct": false },
    { "text": "Structure. Discipline. Time. Consequence.", "correct": false },
    { "text": "Dissolve. Dream. Merge. Imagine.", "correct": false }
  ],
  "quizFeedback": {
    "correct": "Right. Aries is pure initiation — the impulse that moves before deliberation.",
    "wrong": "Not quite. Aries is the archetype of initiation — Initiate, Assert, Begin, Dare."
  },
  "next": "taurus",
  "status": "active"
}
```

**planets.json** — same shape, with these fields instead of modality/element/ruler:
```json
{
  "id": "venus",
  "name": "Venus",
  "symbol": "♀",
  "cycle": "7-month cycle",
  "rules": "Taurus, Libra",
  ...
}
```

---

## Content: All 12 Signs

Populate signs.json with these entries exactly.

### Aries
- Symbol: ♈ · Cardinal Fire · Ruled by Mars
- Tagline: The first move.
- Archetype: Aries is the archetype of initiation — the moment before deliberation, when impulse becomes action. Mythically, this is Ares: not strategy, but the raw will to engage, to meet the world head-on rather than wait for permission. Cardinal and fire together mean Aries doesn't build momentum, it IS momentum — the spark that starts something, not the structure that sustains it.
- Shadow: The same instinct that moves first can move without looking — mistaking speed for direction.
- Word pills: I … initiate / begin / assert / dare / lead

### Taurus
- Symbol: ♉ · Fixed Earth · Ruled by Venus
- Tagline: What's worth keeping.
- Archetype: Taurus is the archetype of value made tangible — the instinct to slow down long enough to actually taste, touch, and hold onto what matters. Where Venus elsewhere can be about attraction in motion, here she settles: this is desire that wants to stay, not just arrive. Fixed and earth together mean Taurus isn't slow by accident — stability is the point, not a failure to move faster.
- Shadow: The same instinct that holds onto what's good can refuse to release what's no longer good — mistaking stillness for safety.
- Word pills: I … hold / savour / build / value / stay

### Gemini
- Symbol: ♊ · Mutable Air · Ruled by Mercury
- Tagline: The space between two things.
- Archetype: Gemini is the archetype of connection through exchange — the instinct to gather information, compare it, and carry it somewhere else. Mythically tied to Mercury, the messenger who moves between worlds without belonging fully to either. Mutable and air together mean Gemini's intelligence isn't depth, it's range — the gift of holding two ideas at once without needing to resolve them into one.
- Shadow: The same instinct that holds multiple truths can avoid choosing any one of them — mistaking options for commitment.
- Word pills: I … connect / exchange / compare / question / move

### Cancer
- Symbol: ♋ · Cardinal Water · Ruled by the Moon
- Tagline: Where the inside is kept.
- Archetype: Cancer is the archetype of belonging — the instinct to build an inside that's separate from the outside, a place where feeling doesn't have to perform. Mythically the crab: soft within, armored without, moving sideways rather than head-on. Cardinal and water together mean Cancer doesn't wait for safety to arrive — it actively builds the container that makes safety possible.
- Shadow: The same instinct that builds a safe inside can wall it off entirely — mistaking distance from the world for protection from it.
- Word pills: I … protect / nurture / remember / hold / belong

### Leo
- Symbol: ♌ · Fixed Fire · Ruled by the Sun
- Tagline: Being seen as yourself.
- Archetype: Leo is the archetype of self-expression as offering — the instinct to take up space not to dominate it, but to be genuinely witnessed in it. Mythically solar: a single, central source that doesn't compete for light, it simply radiates. Fixed and fire together mean this isn't a passing performance — Leo's expression is steady, consistent, an identity held rather than a mood indulged.
- Shadow: The same instinct that wants to be seen can come to need being seen — mistaking attention for confirmation that one exists at all.
- Word pills: I … radiate / create / perform / lead / shine

### Virgo
- Symbol: ♍ · Mutable Earth · Ruled by Mercury
- Tagline: Making it work, in practice.
- Archetype: Virgo is the archetype of refinement — the instinct to take a raw thing and improve it through attention, repetition, and care for detail. Mercury here is grounded rather than airy: not ideas in motion, but ideas applied. Mutable and earth together mean Virgo adapts constantly, but always in service of function — the goal isn't change for its own sake, it's getting closer to correct.
- Shadow: The same instinct that improves can never declare anything finished — mistaking refinement for the absence of flaw.
- Word pills: I … refine / analyse / serve / improve / discern

### Libra
- Symbol: ♎ · Cardinal Air · Ruled by Venus
- Tagline: What balance costs.
- Archetype: Libra is the archetype of relationship as a mirror — the instinct to understand oneself through what's reflected back by another. Venus here is relational rather than sensory: not "what do I want," but "what does this exchange require to stay fair." Cardinal and air together mean Libra actively initiates the search for balance — it doesn't drift into fairness, it works for it.
- Shadow: The same instinct that weighs both sides can stall in the weighing — mistaking indecision for impartiality.
- Word pills: I … balance / relate / harmonise / weigh / bridge

### Scorpio
- Symbol: ♏ · Fixed Water · Ruled by Pluto
- Tagline: What's underneath.
- Archetype: Scorpio is the archetype of depth — the instinct to go past the surface explanation to whatever's actually driving it, including the parts that aren't comfortable to look at. Pluto here isn't destruction for its own sake; it's the force that strips away what's no longer true so something more real can exist. Fixed and water together mean this intensity doesn't dissipate — Scorpio holds on until the transformation is complete.
- Shadow: The same instinct that seeks what's real can suspect everything of hiding something — mistaking vigilance for clarity.
- Word pills: I … transform / penetrate / endure / investigate / regenerate

### Sagittarius
- Symbol: ♐ · Mutable Fire · Ruled by Jupiter
- Tagline: The bigger picture.
- Archetype: Sagittarius is the archetype of meaning-seeking — the instinct to look past the immediate situation toward the larger pattern, belief, or horizon it belongs to. Jupiter here is expansive: more interested in the philosophy behind the fact than the fact itself. Mutable and fire together mean Sagittarius moves toward whatever expands its understanding next — restless not from instability, but from genuine appetite.
- Shadow: The same instinct that reaches for the bigger picture can skip past the inconvenient details inside it — mistaking scope for accuracy.
- Word pills: I … explore / expand / philosophise / seek / roam

### Capricorn
- Symbol: ♑ · Cardinal Earth · Ruled by Saturn
- Tagline: What gets built to last.
- Archetype: Capricorn is the archetype of structure — the instinct to take a long view and do the often-unglamorous work that a long view requires. Saturn here is not punishment, it's accountability: the discipline of building something that will still be standing later. Cardinal and earth together mean Capricorn doesn't wait for conditions to be ideal — it starts the work and lets the structure accumulate over time.
- Shadow: The same instinct that builds for the long term can defer the present indefinitely — mistaking later for the only time that counts.
- Word pills: I … build / endure / achieve / structure / master

### Aquarius
- Symbol: ♒ · Fixed Air · Ruled by Uranus
- Tagline: The exception that reveals the rule.
- Archetype: Aquarius is the archetype of disruption in service of progress — the instinct to notice where a system or convention has stopped serving people, and to break from it on principle. Uranus here is sudden, not gradual: insight that arrives as a jolt rather than a slow build. Fixed and air together mean Aquarius holds its convictions with real stubbornness — this isn't contrarianism for its own sake, it's loyalty to an idea over loyalty to the group.
- Shadow: The same instinct that breaks from convention can break from connection too — mistaking detachment for objectivity.
- Word pills: I … innovate / disrupt / envision / rebel / awaken

### Pisces
- Symbol: ♓ · Mutable Water · Ruled by Neptune
- Tagline: Where the boundaries dissolve.
- Archetype: Pisces is the archetype of dissolution — the instinct to merge with whatever is being felt, witnessed, or imagined, rather than stay separate from it. Neptune here is the dissolving of edges: between self and other, real and imagined, here and elsewhere. Mutable and water together mean Pisces doesn't hold a fixed shape — it takes on the shape of whatever it's currently absorbing.
- Shadow: The same instinct that merges with what it feels can lose track of where it ends and the feeling begins — mistaking absorption for connection.
- Word pills: I … dissolve / imagine / merge / transcend / dream

---

## Content: All 10 Planets

Populate planets.json with these entries exactly.

### Sun
- Symbol: ☉ · 1-year cycle · Rules Leo
- Tagline: The center that doesn't compete for light.
- Archetype: The Sun is the archetype of identity itself — not a trait among traits, but the thing the other traits organize around. Mythically solar: a single source that radiates rather than reaches, that simply IS rather than asks permission to be. Where other planets describe a function, the Sun describes a presence — the core self that stays recognizable across every role it plays.
- Shadow: The same instinct that holds a stable center can mistake being witnessed for being real — needing an audience to confirm an identity that should be able to stand on its own.
- Word pills: I … am / radiate / express / lead / create

### Moon
- Symbol: ☽ · 1-month cycle · Rules Cancer
- Tagline: What needs tending before anything else can happen.
- Archetype: The Moon is the archetype of feeling, memory, and instinct — the layer of experience that responds before thought arrives. It's the fastest-moving body in the sky, mirroring how quickly mood and need can shift underneath a steadier surface. Where the Sun is who you are, the Moon is what you require to feel safe enough to be that.
- Shadow: The same instinct that registers what's needed can mistake every passing feeling for an emergency — reacting to the weather instead of checking the climate.
- Word pills: I … feel / remember / protect / nourish / respond

### Mercury
- Symbol: ☿ · 88-day cycle · Rules Gemini, Virgo
- Tagline: The translator between experience and language.
- Archetype: Mercury is the archetype of mind in motion — perceiving, naming, comparing, explaining. Mythically the messenger god, moving between worlds without fully belonging to any of them. Mercury doesn't generate meaning on its own; it carries meaning from one place to another, which is why its gift is articulation rather than depth.
- Shadow: The same instinct that moves fluently between ideas can mistake talking about something for having actually sat with it.
- Word pills: I … communicate / translate / connect / name / carry

### Venus
- Symbol: ♀ · 7-month cycle · Rules Taurus, Libra
- Tagline: What's worth wanting.
- Archetype: Venus is the archetype of value and attraction — the instinct that decides what's beautiful, what's worth keeping, what's worth connecting to. Mythically this is desire as discernment, not indulgence: Venus doesn't want everything, she wants well. This is also the planet of relationship as mirror — what we find attractive often reveals what we believe we're allowed to have.
- Shadow: The same instinct that knows what's beautiful can start basing its own worth on whether it's found beautiful by someone else.
- Word pills: I … love / attract / desire / play / beautify

### Mars
- Symbol: ♂ · 2-year cycle · Rules Aries
- Tagline: The will before the plan.
- Archetype: Mars is the archetype of drive — the raw energy that moves toward a goal before strategy has fully formed. Mythically Ares: not calculation, but appetite for the fight itself, for the test of strength. Where the Sun asks "who am I," Mars asks "what do I want, and what am I willing to do to get it" — desire converted directly into action.
- Shadow: The same instinct that moves decisively can mistake aggression for the only form action comes in — reaching for force when patience would actually work better.
- Word pills: I … drive / pursue / compete / assert / fight

### Jupiter
- Symbol: ♃ · 12-year cycle · Rules Sagittarius
- Tagline: The horizon that keeps moving back.
- Archetype: Jupiter is the archetype of expansion — the instinct to grow past a current boundary, whether that boundary is geographic, intellectual, or philosophical. Mythically the king of the gods, but more functionally: the impulse toward "more" — more meaning, more experience, more belief in what's possible. Jupiter's gift is genuine optimism, the kind that's earned by actually testing how far things can stretch.
- Shadow: The same instinct that reaches for more can treat "enough" as a failure of ambition — never landing long enough to actually metabolize a gain.
- Word pills: I … expand / explore / believe / grow / optimise

### Saturn
- Symbol: ♄ · 29-year cycle · Rules Capricorn
- Tagline: What holds weight.
- Archetype: Saturn is the archetype of structure and consequence — the instinct that builds slowly, tests itself against reality, and earns trust through time rather than declaration. Mythically the old god, time itself: not punishment, but the simple fact that some things can only be built by enduring the process required to build them. Saturn's gift is durability — what survives contact with difficulty.
- Shadow: The same instinct that takes things seriously can mistake difficulty for proof of worth — believing nothing counts unless it was hard-won.
- Word pills: I … structure / endure / build / discipline / master

### Uranus
- Symbol: ⛢ · 84-year cycle · Rules Aquarius
- Tagline: The break that has to happen.
- Archetype: Uranus is the archetype of disruption — sudden insight or change that arrives faster than gradual growth could have produced it. Mythically tied to sky and sudden upheaval: this is the planet of the moment a pattern becomes visible precisely because it just broke. Uranus doesn't negotiate with what's outdated — it interrupts it.
- Shadow: The same instinct that breaks what's outdated can break what was actually still working — mistaking disruption itself for progress.
- Word pills: I … disrupt / innovate / liberate / awaken / break

### Neptune
- Symbol: ♆ · 165-year cycle · Rules Pisces
- Tagline: Where the edges stop being solid.
- Archetype: Neptune is the archetype of dissolution — the dissolving of the line between self and other, real and imagined, literal and symbolic. Mythically oceanic: not a single wave but the whole undifferentiated water beneath it. Neptune's gift is genuine transcendence — access to meaning that doesn't reduce neatly to fact.
- Shadow: The same instinct that dissolves rigid boundaries can dissolve useful ones too — mistaking confusion about what's real for spiritual depth.
- Word pills: I … dissolve / dream / merge / transcend / imagine

### Pluto
- Symbol: ♇ · 248-year cycle · Rules Scorpio
- Tagline: What has to end before something else can begin.
- Archetype: Pluto is the archetype of transformation through removal — the force that strips away whatever's no longer true so something more real has room to exist. Mythically the underworld: not death as an ending, but death as the condition for any real renewal. Pluto doesn't negotiate with what's already finished, even when letting go is the hardest part.
- Shadow: The same instinct that clears away what's false can stay suspicious of everything indefinitely — mistaking constant vigilance for actual transformation.
- Word pills: I … transform / strip / renew / regenerate / compel

---

## Content Rules (from the content bible)

**Tone:** Confident, a little wry, never mystical-vague. Direct address ("you").
Dry humor welcome. Preciousness is not.

**Avoid in all UI copy:** "vibes", "energy" (without qualification), "manifest",
"the universe is telling you", "your sign says", "love planet", crystals-and-sage
language, love-and-light language.

**Use:** archetype, pattern, mythic, symbolic, psyche, modality, polarity.

**What the app is NOT:** horoscope app, compatibility matcher, fatalistic,
jargon-dense, generic spiritual lifestyle branding.

---

## Conventions

- Mobile-first. Design for 390px viewport. Desktop is a nice-to-have.
- React functional components with hooks only — no class components.
- No TypeScript required for v1, but keep prop shapes consistent.
- File naming: PascalCase for components (`LessonCard.jsx`), camelCase for utils.
- Keep components small and single-purpose.
- All content comes from JSON files in `/src/data/` — no hardcoded strings in components.
- Commit message format: imperative mood, plain English ("Add Venus lesson card")

---

## What to Build First

Start here, in this order:

1. `npm create vite@latest star-school -- --template react` then install deps
2. Set up folder structure: `/src/components`, `/src/data`, `/src/pages`, `/src/styles`
3. Add Google Fonts import and CSS custom properties for the design system
4. Build the bottom nav component
5. Build the Home screen with placeholder cards
6. Build the LessonCard component (signs and planets share the same shape)
7. Build the Quiz component
8. Wire up routing with React Router
9. Populate `/src/data/signs.json` and `/src/data/planets.json` with the content above
10. Connect content to components

Do not move to step 6 until step 5 looks right. Show me each step before proceeding.
