import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './components/background/background.component';
import { ThemeService } from './services/theme.service';
import { I18nService, Lang } from './services/i18n.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { BackgroundService } from './services/background.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('routeFade', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('500ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnDestroy {
  title = 'joao-rafael';
  readonly langs: Lang[] = ['en', 'es', 'pt'];
  private readonly routeThemeSync: Subscription;

  constructor(
    public themeService: ThemeService,
    public i18n: I18nService,
    private backgroundService: BackgroundService,
    router: Router
  ) {
    this.routeThemeSync = router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        requestAnimationFrame(() => this.themeService.syncTheme());
      });
  }

  ngOnDestroy(): void {
    this.routeThemeSync.unsubscribe();
  }

  setLang(lang: Lang): void {
    this.i18n.setLang(lang);
  }

  toggleTheme(): void {
    this.themeService.toggleColorMode();
  }

  selectColor(hexColor: string): void {
    this.themeService.setAccentColor(hexColor);
    this.backgroundService.randomizeEffect();
  }

  prepareRoute(outlet: RouterOutlet): string | undefined {
    return outlet?.activatedRouteData?.['animation'];
  }
}
