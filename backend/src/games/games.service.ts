import { Injectable } from '@nestjs/common';
import { Game } from "./Game";
import { IGameUpdate } from "./iGameUpdate";

@Injectable()
export class GamesService {
  private gameIds: Array<string> = [
    "04d19724-3d0e-4699-a28e-8dab87110fa1",
    "2b9266e8-c6e5-49d7-9b54-6c9ed0832e1e",
    "6f662ea6-38b6-4dbd-a34d-0b38e9b1f30d",
    "18b3e029-4ca4-4d50-a61e-ef48090ca1a9",
    "f5ed5d77-5f5c-4325-91da-12a399d1f080",
    "87b9e5eb-44fc-4ec5-a5da-7e69491d5d5b",
    "bb9c9f9d-253d-4e47-9743-f62f4fb2f1e4",
    "3a0aaf15-c150-4601-b0a7-0de04e01e8fb",
    "a21d0dd9-4329-4258-b239-72a78f1d2ea1",
    "749fbfbe-0f97-497d-9e3e-3426dbbcfc2f",
    "af872319-8a88-4b04-8bfc-25f56ec8a9c9",
    "c1e94722-2df8-4816-82ea-7a97a2ca2bfb",
    "491b55d7-e240-4b36-8e34-80e30ee7d648",
    "f93c2e1b-85f2-4d39-93c8-6ed6807db3d9",
    "64a3a00e-0713-4de3-891a-4f4d4e4b9e99",
    "ed07b49e-5c06-4ba2-91c5-5c5c5f5abccf",
    "d5fae94f-f1c8-480e-b109-449940b6e23e",
    "ac1dc2f6-dc46-46a7-a8c6-63e742eef48d",
    "7c8a9a05-7db3-41e2-b6c8-80f02f6e8727",
    "ec04cf38-9b68-4637-aef6-0a1d6398a56d",
    "da4696b5-6cfc-4489-9a7c-89a062e93715",
    "d2edf52e-5b5f-4e8f-a5ba-26a15683b662",
    "f8d3f534-6013-4d4a-95a8-9a112cead4c5",
    "a42b7a81-1f31-4245-a5b5-5c746ba9d5ab",
    "f41b0058-7ba3-4c3b-9774-c4a8b4e9d24d",
    "f523a1c8-f13e-4870-968a-14206af90a8c",
  ];

  public games: Game[] = [];

  constructor() {
    for (let gameId of this.gameIds) {
      this.games.push(new Game(
        gameId, 
        Game.getRandomTeamAbbr(), 
        Game.getRandomTeamAbbr(), 
        Game.getRandomStartTime()
      ));
    }
  }

  /**
   * removes from games array
   * @param game
   */
  public removeGame(game: Game): void {
    this.games = this.games.filter(item => item !== game);
  }

  /**
   * generates a random event type from the eventTypes array
   * @private
   */
  private getRandomUpdateType(): string {
    const  eventTypes = ['gameEnd', 'extraTime', 'score'];
    return eventTypes[Math.floor(Math.random() * eventTypes.length)];
  }

  public generateRandomGameUpdate(game: Game): IGameUpdate | void {
    const shouldUpdate = Math.random() < 0.01;
    if (shouldUpdate) {
      switch(this.getRandomUpdateType()) {
        case 'gameEnd':
          if (new Date() > game.addGameTime(90)) {
            game.setEndNotified(true);
            game.endTime = new Date();
            return <IGameUpdate>{type: 'gameEnd', timestamp: new Date(), gameState: game};
          }
          break;
        case 'extraTime':
          if (new Date() > game.addGameTime(90)) {
            const extraTime = Math.floor(Math.random() * 30);
            game.setEndNotified(false);
            game.endTime = game.addGameTime(90 + extraTime);
            return <IGameUpdate>{type: 'extraTime', timestamp: new Date(), gameState: game};
          }
        case 'score':
          if ((new Date() > game.addGameTime(90)) && !game.endNotified) {
            game.markGoal( Math.random() < 0.5);
            return <IGameUpdate>{type: 'score', timestamp: new Date(), gameState: game};
          }
        default:
      }
    }
  }
}
