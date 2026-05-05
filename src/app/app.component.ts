import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { BackgroundComponent } from './components/background/background.component';
import { ThemeService } from './services/theme.service';
import { I18nService, Lang } from './services/i18n.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent, BackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'joao-rafael';
  readonly langs: Lang[] = ['en', 'es', 'pt'];

  constructor(
    public themeService: ThemeService,
    public i18n: I18nService
  ) {}

  ngOnInit(): void {}

  setLang(lang: Lang): void {
    this.i18n.setLang(lang);
  }

  toggleTheme(): void {
    this.themeService.toggleColorMode();
  }
}
