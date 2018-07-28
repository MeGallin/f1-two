import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {throwError} from 'rxjs';


@Component({
  selector: 'app-driver-standings',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['./driver-standings.component.css'],
  providers: [HttpService]
})
export class DriverStandingsComponent implements OnInit {
  public driverStandings;
  public currentYear = new Date().getFullYear();

  public year;

  constructor(private _http: HttpService) {
  }

  ngOnInit() {
    this._http.fetchDriverStandings(this.currentYear).subscribe(data => {
        this.driverStandings = data;
        this.driverStandings = new Array(this.driverStandings);
        this.driverStandings = this.driverStandings[0].MRData.StandingsTable.StandingsLists[0].DriverStandings;

      },
      error => {
        console.error('Error load data');
        return throwError(error);
      });
  }

  getDate(e) {
    this.year = e;
    this._http.fetchDriverStandings(this.year).subscribe(data => {
        this.driverStandings = data;
        this.driverStandings = new Array(this.driverStandings);
        this.driverStandings = this.driverStandings[0].MRData.StandingsTable.StandingsLists[0].DriverStandings;

      },
      error => {
        console.error('Error load data');
        return throwError(error);
      });
  }

}
