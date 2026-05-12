import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(public i18n: I18nService) {}
}
