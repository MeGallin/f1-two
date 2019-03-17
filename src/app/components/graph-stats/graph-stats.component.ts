// https://www.dyclassroom.com/chartjs/how-to-create-a-bar-graph-using-chartjs
import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { HttpService } from "src/app/services/http.service";
import { throwError } from "rxjs";

@Component({
  selector: "app-graph-stats",
  templateUrl: "./graph-stats.component.html",
  styleUrls: ["./graph-stats.component.css"]
})
export class GraphStatsComponent implements OnInit {
  public driverStandings;
  public currentYear = new Date().getFullYear();
  chart = [];
  drivers = [];
  wins = [];
  driverWins = [];
  points = [];

  constructor(private _http: HttpService) {}

  ngOnInit() {
    this._http.fetchDriverStandings(this.currentYear).subscribe(
      data => {
        this.driverStandings = data;
        this.driverStandings = new Array(this.driverStandings);
        this.driverStandings = this.driverStandings[0].MRData.StandingsTable.StandingsLists[0].DriverStandings;

        console.log(this.driverStandings);

        for (let i = 0; i < this.driverStandings.length; i++) {
          this.wins.push(this.driverStandings[i].wins);
          this.drivers.push(this.driverStandings[i].Driver.code);
          this.points.push(this.driverStandings[i].points);
        }

        // Remove all drivers that never had any wins.
        this.driverWins = this.wins.filter(num => {
          return num > 1;
        });
        // Remove all drivers that never had any wins.

        this.chart = new Chart("canvas", {
          type: "doughnut",
          data: {
            labels: this.drivers,
            datasets: [
              {
                label: "Wins",
                data: this.driverWins,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              position: "top",
              text: "Wins"
            },
            legend: {
              display: true,
              position: "bottom"
            },
            scales: {
              xAxes: [
                {
                  display: false
                }
              ],
              yAxes: [
                {
                  display: false
                }
              ]
            }
          }
        });

        this.chart = new Chart("canvas-two", {
          type: "bar",
          data: {
            labels: this.drivers,
            datasets: [
              {
                label: "Season Points",
                data: this.points,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [
                {
                  xAxisID: "HERE",
                  display: true
                }
              ],
              yAxes: [
                {
                  display: true
                }
              ]
            }
          }
        });
      },
      error => {
        console.error("Error load data");
        return throwError(error);
      }
    );
  }
}
