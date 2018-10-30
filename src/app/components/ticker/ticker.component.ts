import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {interval, throwError, timer} from 'rxjs';
import {mapTo, switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
  providers: [HttpService]
})
export class TickerComponent implements OnInit {
  public rssFeeds;
  private message;
  private killTimer;
  public newMessages;

  constructor(private _http: HttpService) {
  }

  ngOnInit() {
    // this._http.fetchRss().subscribe(data => {
    //     this.rssFeeds = data;
    //     this.rssFeeds = new Array(this.rssFeeds);
    //     this.rssFeeds = this.rssFeeds[0].items;
    //     // console.table(this.rssFeeds);
    //   },
    //   error => {
    //     console.error('Error load data');
    //     return throwError(error);
    //   });
    //
    // setInterval(() => {
    //   this._http.fetchRss().subscribe(data => {
    //       this.rssFeeds = data;
    //       this.rssFeeds = new Array(this.rssFeeds);
    //       this.rssFeeds = this.rssFeeds[0].items;
    //       // console.table(this.rssFeeds);
    //     },
    //     error => {
    //       console.error('Error load data');
    //       return throwError(error);
    //     });
    // }, 60000 * 30);

    this.killTimer = interval(1000).pipe(mapTo('Fetching latest news ')).subscribe(data => {
      this.message = data;
      this.newMessages = Array(10).fill(this.message);
      this.newMessages = new Array({'message': this.newMessages});
      // console.log(this.newMessages);
    });

    setTimeout(() => {
      this.killTimer.unsubscribe();
    }, 2000);


    timer(1000, 60000 * 30)
      .pipe(switchMap(() => this._http.fetchF1Rss()))
      .subscribe(data => {
          this.rssFeeds = data;
          this.rssFeeds = new Array(this.rssFeeds);
          this.rssFeeds = this.rssFeeds[0].items;
          // console.table(this.rssFeeds);
        },
        error => {
          console.error('Error load data');
          return throwError(error);
        });
  }


}
