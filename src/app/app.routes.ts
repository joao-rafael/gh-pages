import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  { path: 'portfolio', component: PortfolioComponent, data: { animation: 'portfolio' } },
  { path: '**', redirectTo: '' }
];
