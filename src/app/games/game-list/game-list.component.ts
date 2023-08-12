import { Firestore, collection, collectionData, doc } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { BackendService } from 'src/app/services/backend.service';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  gamesObs: Observable<any>;

  constructor(private router: Router, private bs: BackendService, private db: Firestore) { }

  ngOnInit(): void {
    this.readGames();
  }


  
  readGames(){
    const gamesCollection = collection(this.db, 'games');
    this.gamesObs = collectionData(gamesCollection, { idField: 'id'}).pipe();
  }

  toGame(id: string) :void{
    this.router.navigate(['/dashboard/game/'+id]);
  }






    // Firestore data converter
    gameConverter = {
      toFirestore: (game) => {
          return {
              name: game.name,
              releaseDate: game.releaseDate,
              description: game.description,
              price: game.price
              };
      },
      fromFirestore: (snapshot, options) => {
          const data = snapshot.data(options);
          return new Game(data.name, data.releaseDate, data.description, data.price);
      }
};
}
