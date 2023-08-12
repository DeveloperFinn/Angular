import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "../user-auth/admin-guard";
import { AuthGuard } from "../user-auth/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GameCreateComponent } from "./game-create/game-create.component";
import { GameListComponent } from "./game-list/game-list.component";
import { GameComponent } from "./game/game.component";
import { UsernameComponent } from "./username/username.component";

const gamesRoutes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
        children: [
            { path: 'games', component: GameListComponent },
            { path: 'game/create', pathMatch: "full", component: GameCreateComponent, canActivate: [AdminGuard]},
            { path: 'game/:id', component: GameComponent },
            { path: 'username', component: UsernameComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(gamesRoutes)],
    exports: [RouterModule]
})
export class GamesRoutingModule { }