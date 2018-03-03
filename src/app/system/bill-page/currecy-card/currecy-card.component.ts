import { Component, Input } from '@angular/core';

@Component({
  selector: 'myr-currecy-card',
  templateUrl: './currecy-card.component.html',
  styleUrls: ['./currecy-card.component.scss']
})
export class CurrecyCardComponent {
  @Input() currency: any;
  currencies: string[] = ['USD', 'EUR'];
}
