import { Game } from 'src/app/models/game';
import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, DocumentData, docData, CollectionReference, addDoc, deleteDoc,updateDoc, doc, getDocs, getDoc } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  //Declarations
  usernameEmitter = new Subject<string>();
  private gameCollection: CollectionReference<DocumentData>;
  gamesObs: Observable<any>;

  constructor(private db: Firestore) {
    this.gameCollection = collection(this.db, 'games').withConverter(this.gameConverter);
  }
  
  //username subject event
  throwUsernameEvent(username: string){
    this.usernameEmitter.next(username);
  }

  create(game: Game){
    console.log("Created game");
    return addDoc(this.gameCollection, game);
  }
  update(id: string, game: Game){
    const docRef = doc(this.db, 'games', id);
    const updatedGame = {
      name: game.name,
      releaseDate: game.releaseDate,
      description: game.description,
      price: game.price
    }
    updateDoc(docRef, updatedGame).then(()=>{
      console.log('Game updated');
    }).catch((e)=>{
      console.log('Game updating failed!');
    });
  }
  delete(id: string){
    console.log("Deleting game");
    const docRef = doc(this.db, 'games', id);
    return deleteDoc(docRef);
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
