import { writeFileSync, mkdirSync, existsSync } from 'fs';
import * as path from 'path';
import React from 'react';

export interface SlideScript {
  cover: { title: string; subtitle: string };
  slides: { headline: string; bullets: string[] }[];
}

const RED = '#E63946';
const BG = '#151412';
const WHITE = '#F5F0EB';
const MUTED = '#6B6560';

// Busca fonte Inter do CDN (sem nova dependência)
let fontRegularCache: ArrayBuffer | null = null;
let fontBoldCache: ArrayBuffer | null = null;

async function loadFonts(): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
  if (!fontRegularCache || !fontBoldCache) {
    const [r, b] = await Promise.all([
      fetch('https://fonts.bunny.net/inter/files/inter-latin-400-normal.woff').then(res => res.arrayBuffer()),
      fetch('https://fonts.bunny.net/inter/files/inter-latin-700-normal.woff').then(res => res.arrayBuffer()),
    ]);
    fontRegularCache = r;
    fontBoldCache = b;
  }
  return { regular: fontRegularCache!, bold: fontBoldCache! };
}

// Helpers para construir elementos sem JSX
function el(type: string, style: Record<string, any>, ...children: any[]): any {
  return React.createElement(type, { style }, ...children);
}

function dots(current: number, total: number): any {
  return el('div', { display: 'flex', gap: '6px', alignItems: 'center' },
    ...Array.from({ length: total }, (_, i) =>
      React.createElement('div', {
        key: i,
        style: {
          width: i + 1 === current ? '22px' : '6px',
          height: '6px',
          borderRadius: '3px',
          background: i + 1 === current ? RED : 'rgba(255,255,255,0.25)',
        },
      })
    )
  );
}

function footer(label: string, current: number, total: number, labelColor = MUTED): any {
  return el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    el('div', { fontSize: '16px', color: labelColor, fontFamily: 'Inter', fontWeight: 400 }, label),
    dots(current, total),
  );
}

function coverSlide(title: string, subtitle: string, n: number, total: number): any {
  const fontSize = title.length > 55 ? '54px' : title.length > 35 ? '64px' : '72px';
  return el('div', { width: '1080px', height: '1080px', background: BG, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '80px', fontFamily: 'Inter' },
    el('div', { display: 'flex', flexDirection: 'column', gap: '12px' },
      el('div', { width: '48px', height: '4px', background: RED }),
      el('div', { fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', color: RED, fontWeight: 700 }, 'TechPulse Editorial'),
    ),
    el('div', { display: 'flex', flexDirection: 'column', gap: '28px' },
      el('div', { fontSize, fontWeight: 700, color: WHITE, lineHeight: 1.1, letterSpacing: '-0.02em' }, title),
      el('div', { fontSize: '26px', color: MUTED, lineHeight: 1.5, fontWeight: 400 }, subtitle),
    ),
    footer('techpulse.ai', n, total),
  );
}

function contentSlide(headline: string, bullets: string[], n: number, total: number): any {
  return el('div', { width: '1080px', height: '1080px', background: BG, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '80px', fontFamily: 'Inter' },
    el('div', { display: 'flex', flexDirection: 'column', gap: '14px' },
      el('div', { width: '36px', height: '3px', background: RED }),
      el('div', { fontSize: '38px', fontWeight: 700, color: WHITE, lineHeight: 1.2, letterSpacing: '-0.01em' }, headline),
    ),
    el('div', { display: 'flex', flexDirection: 'column', gap: '32px', flex: 1, justifyContent: 'center' },
      ...bullets.slice(0, 4).map((b, i) =>
        React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'flex-start', gap: '22px' } },
          el('div', { width: '8px', height: '8px', borderRadius: '50%', background: RED, marginTop: '13px', flexShrink: 0 }),
          el('div', { fontSize: '28px', color: WHITE, lineHeight: 1.5, fontWeight: 400, flex: 1 }, b),
        )
      ),
    ),
    footer('techpulse.ai', n, total),
  );
}

function ctaSlide(title: string, n: number, total: number): any {
  return el('div', { width: '1080px', height: '1080px', background: RED, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '80px', fontFamily: 'Inter' },
    el('div', { width: '48px', height: '4px', background: 'rgba(255,255,255,0.35)' }),
    el('div', { display: 'flex', flexDirection: 'column', gap: '32px' },
      el('div', { fontSize: '76px', fontWeight: 700, color: 'white', lineHeight: 1.0, letterSpacing: '-0.03em' }, 'Leia o\nartigo\ncompleto'),
      el('div', { fontSize: '22px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, fontWeight: 400 }, title),
    ),
    footer('→ techpulse.ai', n, total, 'white'),
  );
}

export async function generateSlideImages(
  script: SlideScript,
  outputDir: string,
  filePrefix: string,
): Promise<string[]> {
  // Importação dinâmica para não quebrar se os pacotes não estiverem instalados
  const [{ default: satori }, { Resvg }] = await Promise.all([
    import('satori'),
    import('@resvg/resvg-js'),
  ]);

  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

  const { regular, bold } = await loadFonts();
  const fonts = [
    { name: 'Inter', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: bold,    weight: 700 as const, style: 'normal' as const },
  ];

  const total = 1 + script.slides.length + 1;
  const elements = [
    coverSlide(script.cover.title, script.cover.subtitle, 1, total),
    ...script.slides.map((s, i) => contentSlide(s.headline, s.bullets, i + 2, total)),
    ctaSlide(script.cover.title, total, total),
  ];

  const saved: string[] = [];
  for (let i = 0; i < elements.length; i++) {
    const svg = await satori(elements[i], { width: 1080, height: 1080, fonts });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } }).render().asPng();
    const filePath = path.join(outputDir, `${filePrefix}-slide-${i + 1}.png`);
    writeFileSync(filePath, png);
    saved.push(`/slides/${filePrefix}-slide-${i + 1}.png`);
  }

  return saved;
}
