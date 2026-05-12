import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ColorMode = 'light' | 'dark';

interface ThemeConfig {
  primary: string;
  gradients: {
    main: string;
    secondary: string;
    tertiary: string;
  };
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly colors = [
    { hex: '#2D54DF', name: 'blue' },
    { hex: '#F2A245', name: 'orange' },
    { hex: '#D02121', name: 'red' },
    { hex: '#188F24', name: 'green' }
  ];

  private readonly MODE_STORAGE_KEY = 'theme-mode';
  private readonly ACCENT_STORAGE_KEY = 'theme-accent';
  private currentTheme$ = new BehaviorSubject<ThemeConfig>(this.getSavedTheme());
  private colorMode = signal<ColorMode>(this.getSavedColorMode());

  constructor() {
    this.applyTheme(this.currentTheme$.value);
    this.updateColorMode(this.colorMode());
  }

  getTheme(): Observable<ThemeConfig> {
    return this.currentTheme$.asObservable();
  }

  getCurrentTheme(): ThemeConfig {
    return this.currentTheme$.value;
  }

  getColorMode(): ColorMode {
    return this.colorMode();
  }

  toggleColorMode(): void {
    const newMode: ColorMode = this.colorMode() === 'light' ? 'dark' : 'light';
    this.colorMode.set(newMode);
    this.saveColorMode(newMode);
    this.updateColorMode(newMode);
  }

  setAccentColor(hexColor: string): void {
    if (!this.colors.some(color => color.hex === hexColor)) return;
    const theme = this.buildThemeConfig(hexColor);
    this.currentTheme$.next(theme);

    if (typeof window !== 'undefined') {
      localStorage.setItem(this.ACCENT_STORAGE_KEY, hexColor);
    }

    this.applyTheme(theme);
  }

  private getSavedColorMode(): ColorMode {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem(this.MODE_STORAGE_KEY) as ColorMode | null;
    if (saved && (saved === 'light' || saved === 'dark')) return saved;
    return 'light';
  }

  private saveColorMode(mode: ColorMode): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.MODE_STORAGE_KEY, mode);
    }
  }

  private updateColorMode(mode: ColorMode): void {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-color-mode', mode);
      this.applyTheme(this.currentTheme$.value);
    }
  }

  private getRandomTheme(): ThemeConfig {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.ACCENT_STORAGE_KEY, randomColor.hex);
    }
    return this.buildThemeConfig(randomColor.hex);
  }

  private getSavedTheme(): ThemeConfig {
    if (typeof window === 'undefined') return this.getRandomTheme();
    const saved = localStorage.getItem(this.ACCENT_STORAGE_KEY);
    const savedColor = this.colors.find(color => color.hex === saved);
    return savedColor ? this.buildThemeConfig(savedColor.hex) : this.getRandomTheme();
  }

  private buildThemeConfig(hexColor: string): ThemeConfig {
    const rgb = this.hexToRgb(hexColor);
    
    return {
      primary: hexColor,
      gradients: {
        main: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`,
        secondary: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`,
        tertiary: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`
      }
    };
  }

  private hexToRgb(hex: string): RgbColor {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 45, g: 84, b: 223 };
  }

  private mixColors(foreground: RgbColor, background: RgbColor, amount: number): string {
    const mixChannel = (fg: number, bg: number) => Math.round((fg * amount) + (bg * (1 - amount)));
    const toHex = (value: number) => value.toString(16).padStart(2, '0');
    const mixed = {
      r: mixChannel(foreground.r, background.r),
      g: mixChannel(foreground.g, background.g),
      b: mixChannel(foreground.b, background.b)
    };

    return `#${toHex(mixed.r)}${toHex(mixed.g)}${toHex(mixed.b)}`;
  }

  private applyTheme(theme: ThemeConfig): void {
    const isDark = this.colorMode() === 'dark';
    const primaryRgb = this.hexToRgb(theme.primary);
    const pageBg = isDark ? '#0f0f0f' : '#ffffff';
    const surfaceBg = isDark ? '#1a1a1a' : '#f5f5f5';
    const surfaceRgb = this.hexToRgb(surfaceBg);

    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--gradient-main', theme.gradients.main);
    document.documentElement.style.setProperty('--gradient-secondary', theme.gradients.secondary);
    document.documentElement.style.setProperty('--gradient-tertiary', theme.gradients.tertiary);
    document.documentElement.style.setProperty('--bg-primary', pageBg);
    document.documentElement.style.setProperty('--bg-secondary', surfaceBg);
    document.documentElement.style.setProperty('--text-primary', isDark ? '#e8e8e8' : '#1a1a1a');
    document.documentElement.style.setProperty('--text-secondary', isDark ? '#a8a8a8' : '#666666');
    document.documentElement.style.setProperty('--border-color', isDark ? '#444444' : '#cccccc');
    document.documentElement.style.setProperty('--shadow-color', isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)');
    document.documentElement.style.setProperty('--card-bg', this.mixColors(primaryRgb, surfaceRgb, isDark ? 0.28 : 0.16));
    document.documentElement.style.setProperty('--card-bg-hover', this.mixColors(primaryRgb, surfaceRgb, isDark ? 0.38 : 0.24));
    document.documentElement.style.setProperty('--card-image-overlay-opacity', isDark ? '0.36' : '0.18');
    document.documentElement.style.setProperty('--card-image-overlay-hover-opacity', isDark ? '0.52' : '0.3');
  }
}
