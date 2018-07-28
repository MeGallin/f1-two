import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() term;
  @Output() changedTerm: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }


  getValue(e: any) {
    this.term = e;
    this.changedTerm.emit(this.term);
  }

}

// https://www.npmjs.com/package/ng2-search-filter
