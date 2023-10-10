import { Component } from '@angular/core';
import { ClimaServiceService } from '../clima-service.service';

@Component({
  selector: 'app-clima-display',
  templateUrl: './clima-display.component.html',
  styleUrls: ['./clima-display.component.scss'],
})
export class ClimaDisplayComponent {
  constructor(public climaService: ClimaServiceService) {}
}
