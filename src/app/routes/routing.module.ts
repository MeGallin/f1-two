import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {DriversComponent} from '../components/drivers/drivers.component';
import {SeasonComponent} from '../components/season/season.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
