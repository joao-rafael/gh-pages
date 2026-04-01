import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface ThemeConfig {
  primary: string;
  gradients: {
    main: string;
    secondary: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly COLORS = [
    { hex: '#2D54DF', name: 'blue' },
    { hex: '#F2A245', name: 'orange' },
    { hex: '#D02121', name: 'red' },
    { hex: '#188F24', name: 'green' }
  ];

  private currentTheme$ = new BehaviorSubject<ThemeConfig>(this.getRandomTheme());

  constructor() {
    this.applyTheme(this.currentTheme$.value);
  }

  getTheme(): Observable<ThemeConfig> {
    return this.currentTheme$.asObservable();
  }

  getCurrentTheme(): ThemeConfig {
    return this.currentTheme$.value;
  }

  private getRandomTheme(): ThemeConfig {
    const randomColor = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
    return this.buildThemeConfig(randomColor.hex);
  }

  private buildThemeConfig(hexColor: string): ThemeConfig {
    const rgb = this.hexToRgb(hexColor);
    
    return {
      primary: hexColor,
      gradients: {
        main: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`,
        secondary: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`
      }
    };
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 45, g: 84, b: 223 };
  }

  private applyTheme(theme: ThemeConfig): void {
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--gradient-main', theme.gradients.main);
    document.documentElement.style.setProperty('--gradient-secondary', theme.gradients.secondary);
  }
}