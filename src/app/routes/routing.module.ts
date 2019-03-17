import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {DriversComponent} from '../components/drivers/drivers.component';
import {SeasonComponent} from '../components/season/season.component';
import {DriverStandingsComponent} from '../components/driver-standings/driver-standings.component';
import {MotoGpComponent} from '../components/moto-gp/moto-gp.component';
import {WorldRallyComponent} from '../components/world-rally/world-rally.component';
import {DriverStatsComponent} from '../components/driver-stats/driver-stats.component';
import { GraphStatsComponent } from '../components/graph-stats/graph-stats.component';

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
  },
  {
    path: 'motogp',
    component: MotoGpComponent
  },
  {
    path: 'rally',
    component: WorldRallyComponent
  },
  {
    path: 'driver-stats',
    component: DriverStatsComponent
  },
  {
    path: 'graph-stats',
    component: GraphStatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
