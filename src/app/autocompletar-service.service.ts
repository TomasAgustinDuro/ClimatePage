import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Importa 'of' desde 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AutocompletarServiceService {
  constructor() {}

  obtenerSugerencias(termino: string): Observable<string[]> {
    const sugerencias: string[] = [
      'Buenos Aires, ARG',
      'Londres, UK',
      'Madrid, ESP',
    ];

    const sugerenciasFiltradas = sugerencias.filter((s) =>
      s.toLowerCase().includes(termino.toLowerCase())
    );

    return of(sugerenciasFiltradas);
  }
}
