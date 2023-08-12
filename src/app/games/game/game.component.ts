import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DocumentReference, Firestore, doc, getDoc, collection, DocumentData, deleteDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { BackendService } from 'src/app/services/backend.service';
import { AuthService } from 'src/app/user-auth/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  isEdit: boolean = false;
  gameId: string;
  game: Game;
  displayedGame: Game;
  gameUpdateForm: FormGroup;
  variable: string;
  invalidEdit: boolean;

  constructor(private router: Router, private _authService: AuthService, private route: ActivatedRoute, private bs: BackendService, private db: Firestore) { }

  ngOnInit(): void {
    //Get the id as a GET parameter out of the URL
    this.route.queryParams
      .subscribe(params => {
        this.gameId = this.route.snapshot.paramMap.get('id');
        console.log(this.gameId);
      }
    );
    this.getGame();
    this.gameUpdateForm = new FormGroup({
      Name: new FormControl(null, Validators.required),
      ReleaseDate: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      Price: new FormControl(null, Validators.required),
    });
  }



  async getGame(){
    const docRef = doc(this.db, "games", this.gameId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const name = docSnap.get("name");
      const releaseDate = docSnap.get("releaseDate");
      const description = docSnap.get("description");
      const price = docSnap.get("price");
      this.displayedGame = new Game(name, releaseDate, description, price);
    }else{
      console.log("Error retrieveing game!");
    }

  }

  editGame(){
    if(!this._authService.isAdmin) {
      return;
    }
    if(!this.gameUpdateForm.valid){
      this.invalidEdit = true;
    }else{
      const name = this.gameUpdateForm.value.Name;
      const releaseDate = this.gameUpdateForm.value.ReleaseDate;
      const description = this.gameUpdateForm.value.Description;
      const price = this.gameUpdateForm.value.Price;
      this.game = new Game(name,releaseDate,description,price);
      this.bs.update(this.gameId, this.game);
      this.router.navigate(['/dashboard/games']);
      this.invalidEdit = false;
    }
  }
  deleteGame(){
    if(!this._authService.isAdmin) {
      return;
    }
    this.bs.delete(this.gameId);
    this.router.navigate(['/dashboard/games']);
  }

  toggleEdit(){
    this.isEdit = !this.isEdit;
  }
  isUserAdmin(){
    return this._authService.isAdmin();
  }
}
