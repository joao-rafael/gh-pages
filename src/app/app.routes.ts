import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'João Rafael Silva | Front-End Software Engineer', data: { animation: 'home' } },
  { path: 'portfolio', component: PortfolioComponent, title: 'Portfolio | João Rafael Silva', data: { animation: 'portfolio' } },
  { path: '**', redirectTo: '' }
];
