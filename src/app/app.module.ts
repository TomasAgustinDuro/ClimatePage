import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // Importa tu AppRoutingModule aquí

import { AppComponent } from './app.component';
import { ClimaDisplayComponent } from './clima-display/clima-display.component';

@NgModule({
  declarations: [AppComponent, ClimaDisplayComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule], // Asegúrate de incluir AppRoutingModule aquí
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
