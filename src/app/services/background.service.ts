import { Injectable } from '@angular/core';

export type BackgroundEffect = 'blob' | 'rain' | 'particles';

@Injectable({ providedIn: 'root' })
export class BackgroundService {
  private readonly effects: BackgroundEffect[] = ['blob', 'rain', 'particles'];
  readonly selectedEffect: BackgroundEffect;

  constructor() {
    this.selectedEffect = this.effects[Math.floor(Math.random() * this.effects.length)];
  }
}
