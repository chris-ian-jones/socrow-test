import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from "rxjs";
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy {
  private wsUrl: string = 'ws://localhost:3008';
  public socket: Socket;
  public currentDate = new Date();

  constructor() {
    this.socket = io(this.wsUrl, {'transports': ['websocket']});
  }

  public subscribeToLiveScoreData(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data)
      })
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
