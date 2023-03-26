import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/interfaces/iEvent';

@Component({
  selector: 'app-live-updates',
  templateUrl: './live-updates.component.html',
  styleUrls: ['./live-updates.component.scss']
})
export class LiveUpdatesComponent implements OnInit {

  public events: Array<IEvent> = [];

  constructor() { }

  ngOnInit() {
  }

}
