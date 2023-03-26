import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/interfaces/iEvent';
import { IGame } from 'src/app/interfaces/iGame';

@Component({
  selector: 'app-live-games',
  templateUrl: './live-games.component.html',
  styleUrls: ['./live-games.component.scss']
})
export class LiveGamesComponent implements OnInit {

  public events: Array<IEvent> = [];
  public games: Array<IGame> = [];
  public currentDate!: Date;

  constructor() {
    this.currentDate = new Date();
  }

  ngOnInit() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 60 * 1000);
  }

  public getGameState(game: IGame): string {
    const now = new Date(),
      start = new Date(game.startTime);
  
    if (game.endNotified) {
      return 'ended';
    } else if (start > now) {
      return 'about-to-start';
    } else if (start <= now) {
      return 'in-game';
    }
  
    return '';
  }

}
