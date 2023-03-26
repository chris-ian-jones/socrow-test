import { Game } from "./Game";

export interface IGameUpdate
{
    timestamp: Date,
    gameMinute: number,
    type: 'gameStart' | 'score' | 'extraTime' | 'gameEnd',
    gameState: Game
}