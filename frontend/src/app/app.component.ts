import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
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

export class AppComponent implements OnInit{
  public title: string = 'frontend';
  public helloMessage: string = '';
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
  public events: Array<IEvent> = []; //messages received from websockets
  private liveScoreSubscription!: Subscription;

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  constructor(
    private appService: AppService,
    private cfr: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.appService.getHelloMessage().subscribe((payload) => {
      this.helloMessage = payload.message;
    });

    this.liveScoreSubscription = this.appService
      .subscribeToLiveScoreData('scoreRoom')
      .subscribe(data => {
        if (Array.isArray(data)) {
          this.handleGameData(data as IGame[]);
        } else if (typeof data === 'object' && data !== null) {
          this.handleEventData(data as IEvent);
        }
        console.log('*')
        console.log('this.games: ', this.games)
        console.log('this.events: ', this.events)
        console.log('*')
      });
  }

  ngAfterViewInit() {
    this.changeTab(this.activeTabIndex);
    this.cdr.detectChanges();
  }

  private handleGameData(data: IGame[]) {
    this.games = data;
  }
  
  private handleEventData(data: IEvent) {
    this.events.push(data);
  }

  changeTab(tabIndex: number) {
    if (!this.viewContainerRef) {
      return;
    }

    this.activeTabIndex = tabIndex;
    this.viewContainerRef.clear();
    const componentFactory = this.cfr.resolveComponentFactory(this.tabs[tabIndex].component);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.events = this.events;
  }

}
