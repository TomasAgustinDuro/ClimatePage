import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClimaServiceService {
  constructor() {}

  temperaturaActual: number = 0;
  temperaturaMaxActual: number = 0;
  temperaturaMinActual: number = 0;
  descripcionActual: string = '';
  sensacionActual: number = 0;
  ciudad: string = '';
  ciudadApi: string = '';
  paisApi: string = '';
  bandera: string = '';
  pais: string = '';
  iconoUrl: string = '';
  pronostico: {
    fecha: string;
    tempMax: number;
    tempMin: number;
  }[] = [];

  apiUrl = '';
  apiBanderaUrl = '';
  apiPronosticoUrl = '';

  informacionInvisible: boolean = false;

  cambiarFondoClima() {
    if (this.temperaturaActual >= 25) {
      document.body.style.backgroundColor = '#FF4500';
    } else if (this.temperaturaActual >= 15 || this.temperaturaActual <= 24) {
      document.body.style.backgroundColor = '#87CEEB';
    } else if (this.temperaturaActual >= 5 || this.temperaturaActual <= 14) {
      document.body.style.backgroundColor = '#32CD32';
    }
  }

  obtenerClima() {
    this.pronostico = [];
    fetch(
      (this.apiUrl =
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        this.ciudadApi +
        ',' +
        this.paisApi +
        '&units=metric&appid=6a5db408397d51246d9e900a5735e113')
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la API');
        }

        return response.json();
      })
      .then((data) => {
        // console.log(data);
        // console.log(data.weather[0]['icon']);

        this.ciudad = data.name;
        this.temperaturaActual = data.main['temp'];
        this.temperaturaMinActual = data.main['temp_min'];
        this.temperaturaMaxActual = data.main['temp_max'];
        this.sensacionActual = data.main['feels_like'];
        this.descripcionActual = data.weather[0]['description'];
        this.iconoUrl =
          'https://openweathermap.org/img/wn/' +
          data.weather[0]['icon'] +
          '@2x.png';
        this.pais = data.sys['country'];
        this.obtenerBanderaPais();
        this.cambiarFondoClima();
        this.obtenerDataPronostico();
        this.informacionInvisible = true;
        // console.log(this.pais);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }

  obtenerBanderaPais() {
    fetch(
      (this.apiBanderaUrl = 'https://restcountries.com/v3.1/alpha/' + this.pais)
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la API Bandera');
        }

        return response.json();
      })
      .then((data) => {
        this.bandera = data[0].flags['png'];
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }

  obtenerDataPronostico() {
    fetch(
      // URL para obtener el pronóstico diario para los próximos 3 días por nombre de ciudad
      (this.apiUrl =
        'https://api.openweathermap.org/data/2.5/forecast?q=' +
        this.ciudadApi +
        ',' +
        this.paisApi +
        '&units=metric&cnt=40&appid=6a5db408397d51246d9e900a5735e113')
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la API Forecast');
        }

        return response.json();
      })
      .then((data) => {
        data.list.forEach((dato: any) => {
          const hora = dato.dt_txt.split(' ')[1];

          if (hora === '12:00:00') {
            const fechaHora = new Date(dato.dt_txt);
            let diaSemana = fechaHora.getDay();
            const nombresDias = [
              'Domingo',
              'Lunes',
              'Martes',
              'Miércoles',
              'Jueves',
              'Viernes',
              'Sábado',
            ];

            const nuevoPronostico = {
              fecha: nombresDias[diaSemana],
              tempMax: dato.main.temp_max,
              tempMin: dato.main.temp_min,
            };
            this.pronostico.push(nuevoPronostico);
          }
        });

        console.log(this.pronostico);
      })
      .catch((error) => {
        console.error('Error4: ', error);
      });
  }
}
