import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-games',
  templateUrl: './live-games.component.html',
  styleUrls: ['./live-games.component.scss']
})
export class LiveGamesComponent implements OnInit {

  public events = [];

  constructor() { }

  ngOnInit() {
  }

}
