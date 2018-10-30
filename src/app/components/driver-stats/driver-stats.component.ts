import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {throwError, timer} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-driver-stats',
  templateUrl: './driver-stats.component.html',
  styleUrls: ['./driver-stats.component.css'],
  providers: [HttpService]
})
export class DriverStatsComponent implements OnInit, OnDestroy {
  private destroyTimer;
  public driversStats: any;
  public driverStatsDetails;

  columnDefs = [
    {headerName: 'Season', field: 'season', width: 100},
    {headerName: 'Round', field: 'round', width: 100},
    {
      headerName: 'Driver', children: [
        {headerName: '#', field: 'DriverStandings'},
        {headerName: 'First name', field: 'Driver.givenName'},
        {headerName: 'Family name', field: 'Driver.familyName'}
      ]
    },
    {headerName: 'Points', field: 'DriverStandings'},
    {headerName: 'Grid', field: 'grid'},
    {headerName: 'Laps', field: 'laps'},
    {headerName: 'Status', field: 'status'},
    {headerName: 'Avg [kPH]', field: 'FastestLap.AverageSpeed.speed', suppressSizeToFit: true}
  ];

  constructor(private _http: HttpService) {
  }

  ngOnInit() {

    // ag GRID example to be used later
    // this._http.fetchF1Data(this.currentYear).subscribe(d => {
    //   this.rowData = d[2];
    //   this.rowData = new Array(this.rowData);
    //   this.rowData = this.rowData[0].MRData.RaceTable.Races[0].Results;
    //   console.log(this.rowData);
    // });
    //// ag GRID example to be used later

    this.destroyTimer = timer(1000, 60000 * 30)
      .pipe(switchMap(() => this._http.fetchDriverStats()))
      .subscribe(data => {
          this.driversStats = data;
          this.driversStats = new Array(this.driversStats);
          this.driversStats = this.driversStats[0].MRData.StandingsTable.StandingsLists;
          console.table(this.driversStats);
        },
        error => {
          console.error('Error load data');
          return throwError(error);
        });

  }

  ngOnDestroy() {
    this.destroyTimer.unsubscribe();
  }

}
