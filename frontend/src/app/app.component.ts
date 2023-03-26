import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from "./app.service";
import { IGame } from './interfaces/iGame';
import { IEvent } from './interfaces/iEvent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  public title: string = 'frontend';
  public helloMessage: string = '';
  public games: Array<IGame> = [];
  public events: Array<IEvent> = []; //messages received from websockets
  private liveScoreSubscription!: Subscription;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.getHelloMessage().subscribe((payload) => {
      this.helloMessage = payload.message;
    });

    this.liveScoreSubscription = this.appService
      .subscribeToLiveScoreData('scoreRoom')
      .subscribe(data => {
        if (Array.isArray(data)) {
          this.handleGameData(data as IGame[]);
        } else if (typeof data === 'object' && data !== null) {
          this.handleEventData(data as IEvent);
        }
      });
  }

  private handleGameData(data: IGame[]) {
    this.games = data;
  }
  
  private handleEventData(data: IEvent) {
    this.events.push(data);
  }
}
