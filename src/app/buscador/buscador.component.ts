import { Component } from '@angular/core';
import { ClimaServiceService } from '../clima-service.service';
import { AutocompletarServiceService } from '../autocompletar-service.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent {
  constructor(
    private climaService: ClimaServiceService,
    private autocompletar: AutocompletarServiceService
  ) {}
  ciudad: string = '';
  terminoBusqueda: string = '';
  sugerencias: string[] = [];

  onClickBoton() {
    this.climaService.ciudadApi = this.ciudad;
    this.climaService.obtenerClima();
  }

  buscarSugerencias() {
    if (this.terminoBusqueda.length >= 3) {
      this.autocompletar
        .obtenerSugerencias(this.terminoBusqueda)
        .subscribe((sugerencias) => {
          this.sugerencias = sugerencias;
        });
    } else {
      this.sugerencias = [];
    }
  }

  autocompletarSugerencia(sugerencia: string) {
    this.terminoBusqueda = sugerencia;
    this.climaService.obtenerClima();
    this.sugerencias = []; // Limpiar sugerencias después de autocompletar
  }
}
