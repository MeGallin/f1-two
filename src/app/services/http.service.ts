import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
  }

  fetchF1Data(year: number) {
    // Season details
    const seasonUrl = 'http://ergast.com/api/f1/' + year + '.json?callback';
    // Drivers
    const driversUrl = 'http://ergast.com/api/f1/' + year + '/drivers.json?callback';
    // latest results
    const latestResults = 'http://ergast.com/api/f1/current/last/results.json?callback';


    return forkJoin(
      this._http.get(driversUrl),
      this._http.get(seasonUrl),
      this._http.get(latestResults)
    );
  }

  fetchResultsRounds(year, round) {
    // Latest Results per round
    const latestResultsRounds = 'http://ergast.com/api/f1/' + year + '/' + round + '/results.json?callback';
    return this._http.get(latestResultsRounds);
  }

}
