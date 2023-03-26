import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveGamesComponent } from './components/live-games/live-games.component';
import { LiveUpdatesComponent } from './components/live-updates/live-updates.component';

const routes: Routes = [
  { path: 'live-updates', component: LiveUpdatesComponent },
  { path: 'live-games', component: LiveGamesComponent },
  { path: '', redirectTo: '/live-updates', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
