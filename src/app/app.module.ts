import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClimaDisplayComponent } from './clima-display/clima-display.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ClimaDisplayComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
