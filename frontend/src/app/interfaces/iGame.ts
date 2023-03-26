export interface IGame {
  id: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  endNotified: boolean;
  homeTeamScore: number;
  awayTeamScore: number;
  endTime: string;
}
