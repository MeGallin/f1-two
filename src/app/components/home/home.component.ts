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
  public round;
  public currentYear = new Date().getFullYear();
  public seasonData;
  public drivers;
  public latestResults;
  public latestResultsRounds;
  public latestRounds;
  public latestRound;
  public raceName;

  public placeholder = 'search';

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
        this.latestResults = this.latestResults[0].MRData.RaceTable.Races[0].Results;

        this.latestRounds = data[2];
        this.latestRounds = new Array(this.latestRounds);
        this.latestRounds = this.latestRounds[0].MRData.RaceTable.Races;
        this.latestRound = this.latestRounds[0].round;
      },
      error => {
        console.error('Error load data');
        return throwError(error);
      });


  } // End ngOnInIt

  roundNumber(e) {
    this.round = e;
    this._http.fetchResultsRounds(this.currentYear, this.round).subscribe(data => {
        this.latestResultsRounds = data;
        this.latestResultsRounds = new Array(this.latestResultsRounds);
        this.raceName = this.latestResultsRounds[0].MRData.RaceTable.Races;
        this.latestResultsRounds = this.latestResultsRounds[0].MRData.RaceTable.Races[0].Results;
      },
      error => {
        console.error('Error load data');
        return throwError(error);
      });
  }
} // End of class
