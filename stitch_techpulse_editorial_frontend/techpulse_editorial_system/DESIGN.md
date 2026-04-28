---
name: TechPulse Editorial System
colors:
  surface: '#fff8f4'
  surface-dim: '#e1d8d2'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2eb'
  surface-container: '#f5ece6'
  surface-container-high: '#efe7e0'
  surface-container-highest: '#eae1db'
  on-surface: '#1f1b17'
  on-surface-variant: '#444748'
  inverse-surface: '#34302b'
  inverse-on-surface: '#f8efe9'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#605e59'
  on-secondary: '#ffffff'
  secondary-container: '#e6e2db'
  on-secondary-container: '#66645f'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#410007'
  on-tertiary-container: '#f1414d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e6e2db'
  secondary-fixed-dim: '#c9c6c0'
  on-secondary-fixed: '#1c1c18'
  on-secondary-fixed-variant: '#484742'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#ffb3b1'
  on-tertiary-fixed: '#410007'
  on-tertiary-fixed-variant: '#92001c'
  background: '#fff8f4'
  on-background: '#1f1b17'
  surface-variant: '#eae1db'
typography:
  display-xl:
    fontFamily: Newsreader
    fontSize: 72px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Work Sans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  grid-margin: 4rem
  grid-gutter: 1.5rem
  section-gap: 8rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
---

## Brand & Style

This design system is anchored in the "Modern Editorial" movement, specifically bridging the gap between high-end print journalism and digital AI discourse. The personality is sophisticated and authoritative, prioritizing legibility and intellectual rigor over engagement hacks. 

The emotional response should be one of "calm authority." By utilizing an asymmetric editorial grid and generous whitespace, the UI directs focus toward long-form content and deep analysis. The style rejects the "app-like" feel of modern SaaS in favor of a structural, document-based aesthetic. Key brand identifiers include visible edition numbering (e.g., Nº 047) and a bilingual toggle that respects the typographic nuances of both Portuguese and English.

## Colors

The palette is built on "Sober Editorial Tones." 

- **Primary & Secondary:** The base is a high-contrast relationship between absolute black (#1A1A1A) and an off-white parchment (#F5F1EA). This creates a "ink on paper" feel that reduces eye strain compared to pure white.
- **Accent:** A saturated Coral Red (#E63946) is used sparingly for urgent signals, "Breaking News" indicators, and high-priority Call-to-Actions.
- **Dark Mode:** Rather than using neutral grays, the dark mode utilizes "Warm Dark" tones. The background shifts to a deep charcoal-umber (#151412), maintaining the warmth of the light mode parchment while ensuring professional contrast.

## Typography

The typographic system utilizes a high-character serif for headlines to establish an intellectual tone, paired with a neutral sans-serif for functional clarity.

- **Headlines:** Use **Newsreader** (as a proxy for Editorial New). It should be set with tight tracking and strong hierarchy. Large display sizes are encouraged to break the grid.
- **Body Text:** Use **Work Sans**. It is selected for its refined, neutral quality that doesn't compete with the headlines, ensuring maximum readability for long-form editorial content.
- **Bilingual Treatment:** In the bilingual interface, the secondary language should be styled in a slightly lower opacity or a subtle italic to differentiate without losing the visual rhythm.

## Layout & Spacing

This design system employs an **Asymmetric Fixed Grid**. 

The layout mimics a magazine spread. Instead of centering all content in a standard container, the system uses "Negative Space Anchors"—large, intentional voids that push content into off-center columns. 

- **Desktop:** A 12-column grid where the main article body typically occupies columns 3 through 9, leaving the first two columns for vertical metadata (Edition No., Date, Category) and the last three for related imagery or pull-quotes.
- **Rhythm:** Spacing follows a 4px baseline, but section transitions use large "Editorial Gaps" (8rem+) to signal a change in topic or focus.

## Elevation & Depth

This system avoids the use of shadows and blurs. Depth is communicated exclusively through **Structural Layering** and **Fine Borders**.

- **Fine Borders:** Elements are separated by 0.5pt or 1px solid lines. These lines act as the primary organizational tool, mimicking the "rules" found in newspaper layouts.
- **Tonal Stepping:** In Dark Mode, depth is created by shifting the background color slightly warmer or cooler, rather than using drop shadows.
- **The "Sheet" Metaphor:** Components do not float; they sit flush against the grid. High-priority modals or menus should use a hard-edged "stroke" (1px) rather than an ambient shadow to define their boundaries.

## Shapes

The shape language is strictly **Sharp (0px)**. 

To maintain the architectural and "printed" feel, all buttons, inputs, images, and containers must have 90-degree corners. Any form of roundedness is seen as "too digital" or "app-like" for this editorial direction. This sharpness reinforces the authoritative and minimal tone of the magazine.

## Components

Components are customized versions of a minimalist base, stripped of all "soft" UI trends.

- **Buttons:** Rectangular with 1px borders. Primary buttons use a solid fill (Black in light mode, Parchment in dark mode) with no rounded corners. Hover states involve a 100% color inversion.
- **Categorical Tags:** Never use "pills." Tags are displayed as uppercase labels with a 1px underline. The underline should be offset by 4px from the text.
- **Edition Numbering:** A dedicated component "Nº [ID]" should appear at the top-left of article headers and navigation, set in the label-caps typography style.
- **Input Fields:** Bottom-border only (underlined) to mimic a signature line on a document. Labels should be small-caps and placed above the line.
- **Article Cards:** Images should be "flush" with the card borders. Titles on cards use the Serif headline-md style. No shadows or padding inside the card container; use the grid gutters to create separation.
- **Bilingual Toggle:** A minimalist switch using text ("PT" | "EN") separated by a vertical pipe (|), with the active language highlighted by the accent Coral Red.