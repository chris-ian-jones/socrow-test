import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, 
  OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from "./app.service";
import { IGame } from './interfaces/iGame';
import { IEvent } from './interfaces/iEvent';
import { LiveUpdatesComponent } from './components/live-updates/live-updates.component';
import { LiveGamesComponent } from './components/live-games/live-games.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public title: string = 'frontend';
  public tabs = [
    {
      label: 'Live Updates',
      component: LiveUpdatesComponent
    },
    {
      label: 'Live Games',
      component: LiveGamesComponent
    }
  ];
  public activeTabIndex: number = 0;
  public games: Array<IGame> = [];
  public events: Array<IEvent> = [];

  private liveScoreSubscription!: Subscription;

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  constructor(
    private appService: AppService,
    private cfr: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.liveScoreSubscription = this.appService
      .subscribeToLiveScoreData('scoreRoom')
      .subscribe(data => {
        if (Array.isArray(data)) {
          this.handleGameData(data as IGame[]);
        } else if (typeof data === 'object' && data !== null) {
          this.handleEventData(data as IEvent);
        }
      });
  }

  ngAfterViewInit() {
    this.changeTab(this.activeTabIndex);
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.liveScoreSubscription) {
      this.liveScoreSubscription.unsubscribe();
    }
    if (this.appService.socket) {
      this.appService.socket.disconnect();
    }
  }

  private handleGameData(data: IGame[]) {
    this.games = data;
  }
  
  private handleEventData(data: IEvent) {
    this.events.push(data);

    const game = this.games.find(game => game.id === data.gameState.id);
    if (!game) {
      return;
    }

    switch (data.type) {
      case 'score':
        game.awayTeamScore = data.gameState.awayTeamScore;
        game.homeTeamScore = data.gameState.homeTeamScore;
        break;
      
      case 'gameEnd':
        game.endTime = data.gameState.endTime;
        game.endNotified = data.gameState.endNotified;
        break;

      default:
        break;
    }
  }

  changeTab(tabIndex: number) {
    if (!this.viewContainerRef) {
      return;
    }

    this.activeTabIndex = tabIndex;
    this.events.length = 0;
    this.viewContainerRef.clear();
    const componentFactory = this.cfr.resolveComponentFactory(this.tabs[tabIndex].component);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.events = this.events;
    componentRef.instance.games = this.games;
  }

}
