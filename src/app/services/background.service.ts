import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type BackgroundEffect = 'blob' | 'rain' | 'particles';

@Injectable({ providedIn: 'root' })
export class BackgroundService {
  private readonly STORAGE_KEY = 'background-effect';
  private readonly effects: BackgroundEffect[] = ['blob', 'rain', 'particles'];
  private selectedEffectSubject: BehaviorSubject<BackgroundEffect>;
  readonly effect$: Observable<BackgroundEffect>;

  constructor() {
    this.selectedEffectSubject = new BehaviorSubject<BackgroundEffect>(this.getCurrentEffect());
    this.effect$ = this.selectedEffectSubject.asObservable();
  }

  get selectedEffect(): BackgroundEffect {
    return this.selectedEffectSubject.value;
  }

  randomizeEffect(): void {
    const previousEffect = this.selectedEffectSubject.value;
    let effect = this.getRandomEffect();

    if (effect === previousEffect && this.effects.length > 1) {
      effect = this.effects[(this.effects.indexOf(effect) + 1) % this.effects.length];
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, effect);
    }

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-background-effect', effect);
    }

    this.selectedEffectSubject.next(effect);
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
