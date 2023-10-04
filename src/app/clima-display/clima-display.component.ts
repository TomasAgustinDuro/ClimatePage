import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clima-display',
  templateUrl: './clima-display.component.html',
  styleUrls: ['./clima-display.component.scss'],
})
export class ClimaDisplayComponent {
  constructor() {
    this.fetchDataClima();
    this.fetchDataBandera();
  }

  temperatura: number = 0;
  temperaturaMax: number = 0;
  temperaturaMin: number = 0;
  descripcion: string = '';
  sensacion: number = 0;
  ciudad: string = 'Buenos Aires';
  ciudadApi: string = '';
  bandera: string = '';
  pais: string = 'ARG';
  iconoUrl: string = '';

  apiUrl = '';
  apiBanderaUrl = '';

  fetchDataClima() {
    fetch(
      (this.apiUrl =
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        this.ciudadApi +
        '&units=metric&appid=6a5db408397d51246d9e900a5735e113')
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la API');
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.weather[0]['icon']);

        // this.ciudad = data.name;
        this.temperatura = data.main['temp'];
        this.temperaturaMin = data.main['temp_min'];
        this.temperaturaMax = data.main['temp_max'];
        this.sensacion = data.main['feels_like'];
        this.descripcion = data.weather[0]['description'];
        this.iconoUrl =
          'https://openweathermap.org/img/wn/' +
          data.weather[0]['icon'] +
          '@2x.png';
        // this.pais = data.sys['country'];
        this.fetchDataBandera();
        console.log(this.pais);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }

  fetchDataBandera() {
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
}
