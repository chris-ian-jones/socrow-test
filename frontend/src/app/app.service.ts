import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IHelloMessage } from "./interfaces/iHelloMessage";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { io } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl: string = 'http://localhost:3007/';
  private wsUrl: string = 'ws://localhost:3008';
  // private subject: AnonymousSubject<MessageEvent>;
  // public messages: Subject<ISocketMessage>;
  private socket: any;
  public currentDate = new Date();

  constructor(
    private httpClient: HttpClient
  ) {
    this.socket = io(this.wsUrl, {'transports': ['websocket']});
  }

  public getHelloMessage(): Observable<IHelloMessage> {
    return <Observable<IHelloMessage>> this.httpClient.get(this.apiUrl)
  }

  public subscribeToLiveScoreData(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data)
      })
    });
  }
}
