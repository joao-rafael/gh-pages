import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = '';
  @Input() url: string = '';
  @Input() imageUrl: string = '';

  constructor(public i18n: I18nService) {}

  get isExternalUrl(): boolean {
    return /^https?:\/\//.test(this.url);
  }

  get ariaLabel(): string {
    return this.isExternalUrl ? `${this.title} - ${this.i18n.t().controls.openNewTab}` : this.title;
  }
}
