import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { throwError } from "rxjs";
import { async } from "rxjs/internal/scheduler/async";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [HttpService]
})
export class HomeComponent implements OnInit {
  columnDefs = [
    { headerName: "P", field: "position", width: 80 },
    { headerName: "FirstName", field: "Driver.givenName" },
    { headerName: "Surname", field: "Driver.familyName" },
    { headerName: "Pole", field: "grid", width: 100 },
    { headerName: "Laps", field: "laps", width: 100 },
    { headerName: "Time", field: "Time.time" },
    { headerName: "Status", field: "status" },
    {
      headerName: "Fastest",
      children: [
        { headerName: "Lap", field: "FastestLap.lap" },
        { headerName: "Rank", field: "FastestLap.rank" },
        { headerName: "Best Time Lap", field: "FastestLap.Time.time" },
        { headerName: "Kph", field: "FastestLap.AverageSpeed.speed" }
      ]
    }
  ];

  public date = new Date().toISOString();
  public year;
  public round;
  public currentYear = new Date().getFullYear();
  public seasonData: any = [];
  public drivers;
  public latestResults;
  public latestResultsRounds;
  public latestRounds;
  public latestRound;
  public raceName;
  public placeholder = "search";

  public rounds = [1, 2, 3, 4, 5];

  rowData: any;

  public hamilton: boolean;

  constructor(private _http: HttpService) {}

  ngOnInit() {
    this._http.fetchF1Data(this.currentYear).subscribe(
      data => {
        this.seasonData = data[1];
        this.seasonData = new Array(this.seasonData);
        this.seasonData = this.seasonData[0].MRData.RaceTable.Races;
        this.year = this.seasonData[1].season;
        // console.table(this.seasonData);

        this.drivers = data[0];
        this.drivers = new Array(this.drivers);
        this.drivers = this.drivers[0].MRData.DriverTable.Drivers;
        // console.log(this.drivers);

        this.latestResults = data[2];
        this.latestResults = new Array(this.latestResults);
        this.latestResults = this.latestResults[0].MRData.RaceTable.Races[0].Results;
        this.rowData = this.latestResults;
       // console.table(this.rowData);

        this.latestRounds = data[2];
        this.latestRounds = new Array(this.latestRounds);
        this.latestRounds = this.latestRounds[0].MRData.RaceTable.Races;
        this.latestRound = this.latestRounds[0].round;
      },
      error => {
        console.error("Error load data");
        return throwError(error);
      }
    );
  } // End ngOnInIt

  roundNumber(e) {
    this.round = e;
    this._http.fetchResultsRounds(this.currentYear, this.round).subscribe(
      data => {
        this.latestResultsRounds = data;
        this.latestResultsRounds = new Array(this.latestResultsRounds);
        this.raceName = this.latestResultsRounds[0].MRData.RaceTable.Races;
        this.latestResultsRounds = this.latestResultsRounds[0].MRData.RaceTable.Races[0].Results;
      },
      error => {
        console.error("Error load data");
        return throwError(error);
      }
    );
  }
  onCellClicked(e){
    if(e.value === 'Hamilton'){
      this.hamilton = true;
    } else {
      this.hamilton = false;
    }
    

  }
} // End of class
