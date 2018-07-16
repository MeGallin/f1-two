import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css'],
  providers: [HttpService]
})
export class SeasonComponent implements OnInit {
  public date = new Date().toISOString();
  public seasonData;
  public year;
  public currentYear = new Date().getFullYear();

  constructor(private _http: HttpService) {

  }

  ngOnInit() {
    this._http.fetchF1Data(this.currentYear).subscribe(data => {
      this.seasonData = data[1];
      this.seasonData = new Array(this.seasonData);
      this.seasonData = this.seasonData[0].MRData.RaceTable.Races;
      this.year = this.seasonData[1].season;
    });
  }

}
