import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from "./app.service";
import { ISocketMessage } from "./interfaces/iSocketMessage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  public title: string = 'frontend';
  public helloMessage: string = '';
  public games: Array<any> = [];
  public events: Array<any> = []; //messages received from websockets
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
      .subscribe((data: any) => {
        if (Array.isArray(data)) {
          this.games = data;
        } else if (typeof data === 'object') {
          this.events.push(data);
        }
        console.log('data start')
          console.log('this.games: ', this.games)
          console.log('this.events: ', this.events)
        console.log('data end')
      });
  }

}
