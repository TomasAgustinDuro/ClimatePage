import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // Importa tu AppRoutingModule aquí
import { AppComponent } from './app.component';
import { ClimaDisplayComponent } from './clima-display/clima-display.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { ClimaServiceService } from './clima-service.service';
import { AutocompletarServiceService } from './autocompletar-service.service';

@NgModule({
  declarations: [AppComponent, ClimaDisplayComponent, BuscadorComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule], // Asegúrate de incluir AppRoutingModule aquí
  providers: [ClimaServiceService, AutocompletarServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
