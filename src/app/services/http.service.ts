import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';
import {map, retry} from 'rxjs/internal/operators';

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

  fetchDriverStandings(year) {
    const driverStandingsUrl = 'http://ergast.com/api/f1/' + year + '/driverStandings.json?callback';
    return this._http.get(driverStandingsUrl);
  }

  fetchRss() {
    // RSS Feed
    const rssJsonServiceBaseUrl = 'https://rss2json.com/api.json?rss_url=';
    const f1RssDataFeed = 'https://www.autosport.com/rss/feed/f1';
    const rssUrl = rssJsonServiceBaseUrl + f1RssDataFeed;
    return this._http.get(rssUrl).pipe(retry(5));
  }

}
