import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routes/routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DateTimeComponent } from './components/shared/date-time/date-time.component';
import { SeasonComponent } from './components/season/season.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DriversComponent,
    HeaderComponent,
    FooterComponent,
    DateTimeComponent,
    SeasonComponent,
    SideMenuComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
