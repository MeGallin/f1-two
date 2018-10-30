import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {interval, throwError, timer, Subscriber} from 'rxjs';
import {mapTo, switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-moto-gp',
  templateUrl: './moto-gp.component.html',
  styleUrls: ['./moto-gp.component.css'],
  providers: [HttpService]
})
export class MotoGpComponent implements OnInit, OnDestroy {
  public rssMotoGpFeeds;
  public rssMoto2Feeds;
  public rssMoto3Feeds
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
      .pipe(switchMap(() => this._http.fetchMotoGpRss()))
      .subscribe(data => {
          this.rssMotoGpFeeds = data[0];
          this.rssMotoGpFeeds = new Array(this.rssMotoGpFeeds);
          this.rssMotoGpFeeds = this.rssMotoGpFeeds[0].items;

          this.rssMoto2Feeds = data[1];
          this.rssMoto2Feeds = new Array(this.rssMoto2Feeds);
          this.rssMoto2Feeds = this.rssMoto2Feeds[0].items;

          this.rssMoto3Feeds = data[2];
          this.rssMoto3Feeds = new Array(this.rssMoto3Feeds);
          this.rssMoto3Feeds = this.rssMoto3Feeds[0].items;
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
