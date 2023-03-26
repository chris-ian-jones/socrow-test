import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/interfaces/iEvent';
import { IGame } from 'src/app/interfaces/iGame';

@Component({
  selector: 'app-live-updates',
  templateUrl: './live-updates.component.html',
  styleUrls: ['./live-updates.component.scss']
})
export class LiveUpdatesComponent implements OnInit {

  public events: Array<IEvent> = [];
  public games: Array<IGame> = [];

  constructor() { }

  ngOnInit() {
  }

}
