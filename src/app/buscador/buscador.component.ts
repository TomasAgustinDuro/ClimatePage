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
  sugerencias: { name: string; country: string }[] = [];

  onClickBoton() {
    this.climaService.ciudadApi = this.ciudad;
    this.sugerencias = [];
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

  seleccionarSugerencia(sugerencia: { name: string; country: string }) {
    this.terminoBusqueda = `${sugerencia.name}, ${sugerencia.country}`;
    // También puedes ocultar la lista de sugerencias aquí si es necesario.
  }

  autocompletarSugerencia(sugerencia: string) {
    this.terminoBusqueda = sugerencia;
    this.sugerencias = []; // Limpiar sugerencias después de autocompletar
  }
}
