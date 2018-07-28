import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {DriversComponent} from '../components/drivers/drivers.component';
import {SeasonComponent} from '../components/season/season.component';
import {DriverStandingsComponent} from '../components/driver-standings/driver-standings.component';

const routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'drivers',
    component: DriversComponent
  },
  {
    path: 'rounds',
    component: SeasonComponent
  },
  {
    path: 'standings',
    component: DriverStandingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
