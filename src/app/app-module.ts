import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule,  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AsesoriasListComponent } from './asesorias-list/asesorias-list';
import { GymAboutComponent } from './gym-about/gym.about';
import { InputNumberComponent } from './input-number/input-number'; 
@NgModule({
  declarations: [App, AsesoriasListComponent, GymAboutComponent, InputNumberComponent],
  imports: [BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
