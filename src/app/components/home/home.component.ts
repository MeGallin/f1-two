import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HttpService]
})
export class HomeComponent implements OnInit {
  public date = new Date().toISOString();
  public year;
  public round = 5;
  public currentYear = new Date().getFullYear();
  public seasonData;
  public drivers;
  public latestResults;
  public latestResultsRound;

  public yearDropDownList = [this.currentYear, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009];
  public rounds = [1, 2, 3, 4, 5];



  constructor(private _http: HttpService) {
  }

  ngOnInit() {
    this._http.fetchF1Data(this.currentYear).subscribe(data => {
        this.seasonData = data[1];
        this.seasonData = new Array(this.seasonData);
        this.seasonData = this.seasonData[0].MRData.RaceTable.Races;
        this.year = this.seasonData[1].season;

        this.drivers = data[0];
        this.drivers = new Array(this.drivers);
        this.drivers = this.drivers[0].MRData.DriverTable.Drivers;

        this.latestResults = data[2];
        this.latestResults = new Array(this.latestResults);
        this.latestResults = this.latestResults[0].MRData.RaceTable.Races;

      },
      error => {
        console.error('Error load data');
        return throwError(error);
      });

    this._http.fetchResultsRounds(this.currentYear, this.round).subscribe(data => {
        this.latestResultsRound = data;
        this.latestResultsRound = new Array(this.latestResultsRound);
        this.latestResultsRound = this.latestResultsRound[0].MRData.RaceTable.Races;
        console.table(this.latestResultsRound);

      },
      error => {
        console.error('Error load data');
        return throwError(error);
      });

  } // End ngOnInIt


} // End of class
