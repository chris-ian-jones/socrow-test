export interface IEvent {
  gameState: {
    awayTeam: string;
    awayTeamScore: number;
    endNotified: boolean;
    endTime: string;
    homeTeam: string;
    homeTeamScore: number;
    id: string;
    startTime: string;
  }
  timestamp: string;
  type: string;
}
