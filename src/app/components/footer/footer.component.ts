import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public title = 'Gary Allin';
  public hosting = 'Trilogy Web Solutions';
  public disclaimer = 'Ergast Developer API';

  constructor() {
  }

  ngOnInit() {
  }

}
