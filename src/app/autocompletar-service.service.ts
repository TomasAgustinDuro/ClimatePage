import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutocompletarServiceService {
  constructor() {}

  sugerenciasUrl = 'http://api.geonames.org/searchJSON?';

  obtenerSugerencias(
    termino: string
  ): Observable<{ name: string; country: string }[]> {
    return new Observable((observer) => {
      const sugerencias: { name: string; country: string }[] = [];

      (async () => {
        try {
          const response = await fetch(
            `${this.sugerenciasUrl}name_startsWith=${termino}&maxRows=50&username=tomasduro`
          );

          if (!response.ok) {
            throw new Error('Error en la solicitud a Geonames');
          }

          const data = await response.json();

          for (let i = 0; i < data.geonames.length; i++) {
            const cityWithCountry = {
              name: data.geonames[i].name,
              country: data.geonames[i].countryCode,
            };
            sugerencias.push(cityWithCountry);
          }

          const sugerenciasFiltradas = sugerencias.filter((s) =>
            s.name.toLowerCase().includes(termino.toLowerCase())
          );

          observer.next(sugerenciasFiltradas);
          observer.complete();
        } catch (error) {
          console.error('Error en la solicitud a Geonames:', error);
          observer.error(error);
        }
      })();
    });
  }
}
