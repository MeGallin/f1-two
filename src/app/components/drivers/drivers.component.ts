import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { throwError } from "rxjs";

@Component({
  selector: "app-drivers",
  templateUrl: "./drivers.component.html",
  styleUrls: ["./drivers.component.css"],
  providers: [HttpService]
})
export class DriversComponent implements OnInit {
  public drivers;
  public year;
  public currentYear = new Date().getFullYear();
  public term;
  public placeholder = "search driver";
  private pastYears;
  public yearDropDownList = [];

  constructor(private _http: HttpService) {}

  ngOnInit() {
    // Reverse array
    var foo = new Array(this.currentYear);
    for (let i = foo.length - 1; i > 1970; i--) {
      this.pastYears = [i + 1];
      this.yearDropDownList.push(this.pastYears);
    }

    this._http.fetchF1Data(this.currentYear).subscribe(
      data => {
        this.drivers = data[0];
        this.drivers = new Array(this.drivers);
        this.drivers = this.drivers[0].MRData.DriverTable.Drivers;
      },
      error => {
        console.error("Error load data");
        return throwError(error);
      }
    );
  }

  yearDropDown(e) {
    this.year = e;
    if (this.year !== "null") {
      this._http.fetchF1Data(this.year).subscribe(
        data => {
          this.drivers = data[0];
          this.drivers = new Array(this.drivers);
          this.drivers = this.drivers[0].MRData.DriverTable.Drivers;
        },
        error => {
          console.error("Error load data");
          return throwError(error);
        }
      );
    }
  }
}
