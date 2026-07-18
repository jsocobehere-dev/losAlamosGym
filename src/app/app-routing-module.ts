import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesoriasListComponent } from './asesorias-list/asesorias-list';
import { GymAboutComponent } from './gym-about/gym.about'; 
const routes: Routes = [
  { path: '', redirectTo: 'asesorias', pathMatch: 'full' },
  { path: 'asesorias', component: AsesoriasListComponent },
  { path: 'about', component: GymAboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
