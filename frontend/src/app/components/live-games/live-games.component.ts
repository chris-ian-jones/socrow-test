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

  public sortGames(games: IGame[]): IGame[] {
    const inGame: IGame[] = [],
      ended: IGame[] = [],
      aboutToStart: IGame[] = [];
    
      games.forEach(game => {
        switch(this.getGameState(game)) {
          case 'ended':  // if (x === 'value1')
            ended.push(game);
            break;
          case 'about-to-start':  // if (x === 'value2')
            aboutToStart.push(game);
            break;
          default:
            inGame.push(game);
            break;
        }
      });

    inGame.sort((a, b) => {
      return this.getGameMinute(b.startTime) - this.getGameMinute(a.startTime);
    });
  
    ended.sort((a, b) => {
      return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
    });
  
    aboutToStart.sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
  
    return [...inGame, ...ended, ...aboutToStart];
  }

  getGameMinute(gameStartTime: string): number {
    const start = new Date(gameStartTime),
      now = new Date(),
      diff = Math.floor((now.getTime() - start.getTime()) / 1000);
    return Math.floor(diff / 60);
  }

}
