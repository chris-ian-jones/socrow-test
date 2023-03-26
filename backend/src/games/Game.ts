export class Game {
    public events: Array<any>;
    public awayTeamScore: number;
    public homeTeamScore: number;
    public endTime: Date
    public endNotified: boolean = false;

    constructor(
        public id: string,
        public homeTeam: string,
        public awayTeam: string,
        public startTime: Date
    ) {
        if (new Date() > startTime) {
          this.homeTeamScore = Math.floor(Math.random() * 3);
          this.awayTeamScore = Math.floor(Math.random() * 3);
        } else {
          this.homeTeamScore = 0;
          this.awayTeamScore = 0;
        }
        this.endTime = this.addGameTime(90)
    }

    /**
     *
     */
    public ended(): boolean {
        return new Date() > this.endTime;
    }

    /**
     *
     * @param minutes
     */
    public addGameTime(minutes: number): Date {
        return new Date(this.startTime.getTime() + minutes * 60000);
    }

    /**
     *
     * @param newValue
     */
    public setEndNotified(newValue: boolean): void {
        this.endNotified = newValue;
    }

    /**
     *
     */
    public getEndNotified(): boolean {
        return this.endNotified;
    }

    /**
     * increments goal count by 1 for either homeTeam or away team
     * @param homeTeam - if this is true it increments score for homeTeam
     */
    public markGoal(homeTeam: boolean): void {
        if (this.ended()) return

        if (homeTeam === true) {
            this.homeTeamScore += 1;
        } else {
            this.awayTeamScore += 1;
        }
    }

    /**
     * gets the human-friendly version of the score
     */
    public getGameScore(): string {
        return this.homeTeamScore + ' - ' + this.awayTeamScore;
    }

    /**
     * generates a random 3 letter abbreviation that resembles a football team name
     */
    public static getRandomTeamAbbr(): string {
        const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
        let abbr: string = '';
        for(let i = 0; i < 3; i++) {
            abbr += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        return abbr.toUpperCase();
    }

    /**
     * generates a random start time for a game within given bounds
     */
    public static getRandomStartTime(): Date {
        const laterOrEarlier = Math.random() < 0.5;
        const randMinutes =  Math.random() * (200);
        if(laterOrEarlier){
           return new Date(Date.now() - randMinutes * 60000);
        }
        return new Date(Date.now() + randMinutes * 60000);
    }
}