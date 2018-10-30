import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {interval, throwError, timer} from 'rxjs';
import {mapTo, switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-world-rally',
  templateUrl: './world-rally.component.html',
  styleUrls: ['./world-rally.component.css'],
  providers: [HttpService]
})
export class WorldRallyComponent implements OnInit, OnDestroy {
  public rssRallyFeeds;
  private message;
  private destroyTimer;
  public newMessages;

  constructor(private _http: HttpService) {
  }

  ngOnInit() {
    this.destroyTimer = interval(1000).pipe(mapTo('Fetching latest news ')).subscribe(data => {
      this.message = data;
      this.newMessages = Array(1).fill(this.message);
      this.newMessages = new Array({'message': this.newMessages});
      // console.log(this.newMessages);
    });
    setTimeout(() => {
      this.destroyTimer.unsubscribe();
    }, 2000);

    this.destroyTimer = timer(1000, 60000 * 30)
      .pipe(switchMap(() => this._http.fetchWorldRally()))
      .subscribe(data => {
          this.rssRallyFeeds = data;
          this.rssRallyFeeds = new Array(this.rssRallyFeeds);
          this.rssRallyFeeds = this.rssRallyFeeds[0].items;
          // console.table(this.rssRallyFeeds);
        },
        error => {
          console.error('Error load data');
          return throwError(error);
        });
  }

  ngOnDestroy() {
    this.destroyTimer.unsubscribe();
  }

}
