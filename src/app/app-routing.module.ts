import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SkillAndManipulationComponent} from "./views/skill-and-manipulation/skill-and-manipulation.component"
import {AboutComponent} from "./views/about/about.component"
import { SummaryComponent } from './views/summary/summary.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  { path: 'skill-manipulation', component: SkillAndManipulationComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'tech-summary', component: SummaryComponent },
  {path: '**', redirectTo: 'auth', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
