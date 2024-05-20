import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutocompletarServiceService {
  constructor() {}

  sugerenciasUrl = 'https://nominatim.openstreetmap.org/search?format=json&';

  obtenerSugerencias(
    termino: string
  ): Observable<{ name: string; country: string }[]> {
    return new Observable((observer) => {
      const sugerencias: { name: string; country: string }[] = [];

      (async () => {
        try {
          const response = await fetch(
            `${this.sugerenciasUrl}q=${termino}&limit=50`
          );

          if (!response.ok) {
            throw new Error('Error en la solicitud a Nominatim');
          }

          const data = await response.json();


          for (let i = 0; i < data.length; i++) {
            const country = data[i].address ? data[i].address.country_code : '';
            const placeWithCountry = {
              name: data[i].display_name,
              country: country || ''
            };
            sugerencias.push(placeWithCountry);
          }


          const sugerenciasFiltradas = sugerencias.filter((s) =>
            s.name.toLowerCase().includes(termino.toLowerCase())
          );

          observer.next(sugerenciasFiltradas);
          observer.complete();
        } catch (error) {
          console.error('Error en la solicitud a Nominatim:', error);
          observer.error(error);
        }
      })();
    });
  }
}
