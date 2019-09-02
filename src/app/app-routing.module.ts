import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SkillAndManipulationComponent} from "./views/skill-and-manipulation/skill-and-manipulation.component"
import {AboutComponent} from "./views/about/about.component"

const routes: Routes = [
  { path: '', redirectTo: '/skill-manipulation', pathMatch: 'full' },
  { path: 'skill-manipulation', component: SkillAndManipulationComponent },
  { path: 'about-us', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
