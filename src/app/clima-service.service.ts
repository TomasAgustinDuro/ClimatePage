import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClimaServiceService {
  iconoWeatherIcons: any;
  iconClass: any;
  iconClassPronostico: any;
  iconNamePronostico: any;
  horaPedido: any;

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
  icono: string = '';
  pronostico: {
    iconoPronostico: string;
    fecha: string;
    tempMax: number;
    tempMin: number;
  }[] = [];
  @ViewChild('imgClima', { static: false }) imgClima: ElementRef | undefined;
  iconName = '';

  iconMapping: { [key: string]: string } = {
    '01d': 'wi-day-sunny', // Clear sky (day)
    '01n': 'wi-night-clear', // Clear sky (night)
    '02d': 'wi-day-cloudy', // Few clouds (day)
    '02n': 'wi-night-alt-cloudy', // Few clouds (night)
    '03d': 'wi-cloud', // Scattered clouds (day)
    '03n': 'wi-night-alt-cloudy', // Scattered clouds (night)
    '04d': 'wi-cloudy', // Broken clouds (day)
    '04n': 'wi-night-alt-cloudy', // Broken clouds (night)
    '09d': 'wi-showers', // Showers (day)
    '09n': 'wi-night-alt-showers', // Showers (night)
    '10d': 'wi-rain', // Rain (day)
    '10n': 'wi-night-alt-rain', // Rain (night)
    '11d': 'wi-thunderstorm', // Thunderstorm (day)
    '11n': 'wi-night-alt-thunderstorm', // Thunderstorm (night)
    '13d': 'wi-snow', // Snow (day)
    '13n': 'wi-night-alt-snow', // Snow (night)
    '50d': 'wi-fog', // Mist (day)
    '50n': 'wi-fog', // Mist (night)
    // Agrega más asignaciones según los nombres de iconos de la API
  };

  apiUrl = '';
  apiBanderaUrl = '';
  apiPronosticoUrl = '';
  llueve: boolean = false;

  informacionInvisible: boolean = false;

  cambiarFondoClima() {
    if (this.horaPedido >= 6 && this.horaPedido <= 18) {
      if (this.llueve) {
        document.body.style.color = 'white';
        document.body.style.backgroundColor = '#6E7B8B';
        document.body.style.backgroundImage = 'url(../assets/nube2.png)';
      } else {
        document.body.style.color = 'white';
        document.body.style.backgroundColor = '#87CEEB';
        document.body.style.backgroundImage = 'url(../assets/nube2.png)';
      }
    } else {
      if (this.llueve) {
        document.body.style.color = 'white';
        document.body.style.backgroundColor = '#6E7B8B'; // Reemplaza 'color-fondo-noche-lluvia' con el color de fondo deseado
        document.body.style.backgroundImage = 'url(../assets/nubes-noche.png)';
      } else {
        document.body.style.color = 'white';
        document.body.style.backgroundColor = '#4169E1';
        document.body.style.backgroundImage = 'url(../assets/nubes-noche.png)';
      }
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
        '&units=metric&lang=es&appid=6a5db408397d51246d9e900a5735e113')
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la API');
        }

        return response.json();
      })
      .then((data) => {
        this.ciudad = data.name;
        this.temperaturaActual = data.main['temp'].toFixed(1);
        this.temperaturaMinActual = data.main['temp_min'].toFixed(1);
        this.temperaturaMaxActual = data.main['temp_max'].toFixed(1);
        this.sensacionActual = data.main['feels_like'].toFixed(1);
        this.descripcionActual = data.weather[0]['description'];

        if (data.weather[0]['main'] == 'Rain') {
          this.llueve = true;
        }

        this.iconName = data.weather[0]['icon'];
        this.iconoWeatherIcons = this.iconMapping[this.iconName];
        if (this.iconoWeatherIcons) {
          this.iconClass = this.iconoWeatherIcons;
        }
        this.pais = data.sys['country'];
        this.obtenerBanderaPais();
        this.cambiarFondoClima();
        this.obtenerDataPronostico();
        this.informacionInvisible = true;
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
            this.iconNamePronostico = dato.weather[0]['icon'];
            this.iconoWeatherIcons = this.iconMapping[this.iconNamePronostico];
            if (this.iconoWeatherIcons) {
              this.iconClassPronostico = this.iconoWeatherIcons;
            }
            const nuevoPronostico = {
              iconoPronostico: this.iconClassPronostico,
              fecha: nombresDias[diaSemana],
              tempMax: dato.main.temp_max.toFixed(1),
              tempMin: dato.main.temp_min.toFixed(1),
            };
            this.pronostico.push(nuevoPronostico);
          }
        });
      })
      .catch((error) => {
        console.error('Error4: ', error);
      });
  }
}
