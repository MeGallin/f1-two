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

  fetchDriverStats() {
    // Driver spesific statistics
    const tempUrl = '../assets/driverStats.json';
    const driverStatsUrl = 'http://ergast.com/api/f1/drivers/alonso/driverStandings.json?callback';
    return this._http.get(tempUrl).pipe(retry(5));
  }


  fetchF1Rss() {
    // F1 RSS Feed
    const rssJsonServiceBaseUrl = 'https://rss2json.com/api.json?rss_url=';
    const rssDataFeed = 'https://www.autosport.com/rss/feed/f1';
    const rssUrl = rssJsonServiceBaseUrl + rssDataFeed;
    return this._http.get(rssUrl).pipe(retry(5));
  }

  fetchMotoGpRss() {
    // MotoGo RSS Reed
    const rssJsonServiceBaseUrl = 'https://rss2json.com/api.json?rss_url=';
    const rssMotoGpFeed = 'https://www.autosport.com/rss/feed/motogp';
    const rssMoto2Feed = 'https://www.autosport.com/rss/feed/all';
    const rssMoto3Feed = 'https://www.autosport.com/rss/feed/moto3';
    const rssMotoGpUrl = rssJsonServiceBaseUrl + rssMotoGpFeed;
    const rssMoto2Url = rssJsonServiceBaseUrl + rssMoto2Feed;
    const rssMoto3Url = rssJsonServiceBaseUrl + rssMoto3Feed;


    return forkJoin(
      this._http.get(rssMotoGpUrl),
      this._http.get(rssMoto2Url),
      this._http.get(rssMoto3Url)
    ).pipe(retry(5));
  }

  fetchWorldRally() {
    // World Rally Championship
    const rssJsonServiceBaseUrl = 'https://rss2json.com/api.json?rss_url=';
    const rssRallyFeed = 'https://www.autosport.com/rss/feed/wrc';

    const rssRally2Url = rssJsonServiceBaseUrl + rssRallyFeed;
    return this._http.get(rssRally2Url).pipe(retry(5));
  }


}
