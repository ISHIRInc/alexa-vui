import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SkillAndManipulationComponent } from './views/skill-and-manipulation/skill-and-manipulation.component';
import { AboutComponent } from './views/about/about.component';
import {MatButtonModule} from '@angular/material/button';
import { SummaryComponent } from './views/summary/summary.component';
import { AuthComponent } from './auth/auth.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SkillAndManipulationComponent,
    AboutComponent,
    SummaryComponent,
    AuthComponent
  ],
  imports: [
    // MatButtonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    GoogleChartsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

