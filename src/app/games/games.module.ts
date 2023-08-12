import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesRoutingModule } from './games-routing.module';
import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game/game.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { UsernameComponent } from './username/username.component';



@NgModule({
  declarations: [
    DashboardComponent,
    GameListComponent,
    GameComponent,
    GameCreateComponent,
    UsernameComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GamesRoutingModule
  ],
})
export class GamesModule { }
