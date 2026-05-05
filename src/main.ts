import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const applyInitialTheme = (): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if ((window as Window & { __themeAccentApplied?: boolean }).__themeAccentApplied) return;

  const colors = ['#2D54DF', '#F2A245', '#D02121', '#188F24'];
  const effects = ['blob', 'rain', 'particles'];
  const modeKey = 'theme-mode';
  const accentKey = 'theme-accent';
  const effectKey = 'background-effect';
  const savedMode = localStorage.getItem(modeKey);
  const previousAccent = localStorage.getItem(accentKey);
  const previousEffect = localStorage.getItem(effectKey);
  const mode = savedMode === 'dark' || savedMode === 'light' ? savedMode : 'light';
  let accent = colors[Math.floor(Math.random() * colors.length)];
  let effect = effects[Math.floor(Math.random() * effects.length)];

  if (accent === previousAccent && colors.length > 1) {
    accent = colors[(colors.indexOf(accent) + 1) % colors.length];
  }
  if (effect === previousEffect && effects.length > 1) {
    effect = effects[(effects.indexOf(effect) + 1) % effects.length];
  }

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 45, g: 84, b: 223 };
  };

  const mixColors = (
    foreground: { r: number; g: number; b: number },
    background: { r: number; g: number; b: number },
    amount: number
  ): string => {
    const mixed = {
      r: Math.round((foreground.r * amount) + (background.r * (1 - amount))),
      g: Math.round((foreground.g * amount) + (background.g * (1 - amount))),
      b: Math.round((foreground.b * amount) + (background.b * (1 - amount)))
    };
    const toHex = (value: number) => value.toString(16).padStart(2, '0');
    return `#${toHex(mixed.r)}${toHex(mixed.g)}${toHex(mixed.b)}`;
  };

  const root = document.documentElement;
  const rgb = hexToRgb(accent);
  const isDark = mode === 'dark';
  const pageBg = isDark ? '#0f0f0f' : '#ffffff';
  const surfaceBg = isDark ? '#1a1a1a' : '#f5f5f5';
  const surfaceRgb = hexToRgb(surfaceBg);

  localStorage.setItem(accentKey, accent);
  localStorage.setItem(effectKey, effect);
  root.setAttribute('data-color-mode', mode);
  root.setAttribute('data-background-effect', effect);
  root.style.setProperty('--color-primary', accent);
  root.style.setProperty('--gradient-main', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`);
  root.style.setProperty('--gradient-secondary', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`);
  root.style.setProperty('--gradient-tertiary', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`);
  root.style.setProperty('--bg-primary', pageBg);
  root.style.setProperty('--bg-secondary', surfaceBg);
  root.style.setProperty('--text-primary', isDark ? '#e8e8e8' : '#1a1a1a');
  root.style.setProperty('--text-secondary', isDark ? '#a8a8a8' : '#666666');
  root.style.setProperty('--border-color', isDark ? '#444444' : '#cccccc');
  root.style.setProperty('--shadow-color', isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)');
  root.style.setProperty('--card-bg', mixColors(rgb, surfaceRgb, isDark ? 0.28 : 0.16));
  root.style.setProperty('--card-bg-hover', mixColors(rgb, surfaceRgb, isDark ? 0.38 : 0.24));
  root.style.setProperty('--card-image-overlay-opacity', isDark ? '0.36' : '0.18');
  root.style.setProperty('--card-image-overlay-hover-opacity', isDark ? '0.52' : '0.3');
};

applyInitialTheme();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
