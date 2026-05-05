import { Injectable } from '@angular/core';

export type BackgroundEffect = 'blob' | 'rain' | 'particles';

@Injectable({ providedIn: 'root' })
export class BackgroundService {
  private readonly STORAGE_KEY = 'background-effect';
  private readonly effects: BackgroundEffect[] = ['blob', 'rain', 'particles'];
  readonly selectedEffect: BackgroundEffect;

  constructor() {
    this.selectedEffect = this.getCurrentEffect();
  }

  private getCurrentEffect(): BackgroundEffect {
    if (typeof window === 'undefined') {
      return this.getRandomEffect();
    }

    const saved = localStorage.getItem(this.STORAGE_KEY) as BackgroundEffect | null;
    if (saved && this.effects.includes(saved)) {
      document.documentElement.setAttribute('data-background-effect', saved);
      return saved;
    }

    const effect = this.getRandomEffect();
    localStorage.setItem(this.STORAGE_KEY, effect);
    document.documentElement.setAttribute('data-background-effect', effect);
    return effect;
  }

  private getRandomEffect(): BackgroundEffect {
    return this.effects[Math.floor(Math.random() * this.effects.length)];
  }
}
