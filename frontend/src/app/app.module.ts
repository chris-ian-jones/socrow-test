import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { LiveUpdatesComponent } from './components/live-updates/live-updates.component';
import { LiveGamesComponent } from './components/live-games/live-games.component';
import { TimeDiffPipe } from './pipes/time-diff.pipe';

@NgModule({
  declarations: [		
    AppComponent,
    LiveUpdatesComponent,
    LiveGamesComponent,
    TimeDiffPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
