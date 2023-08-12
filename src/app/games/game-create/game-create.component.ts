import { Game } from 'src/app/models/game';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent implements OnInit {  
  gameCreateForm: FormGroup;
  invalidCreate: boolean;
  constructor(private bs: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.gameCreateForm = new FormGroup({
      Name: new FormControl(null, Validators.required),
      ReleaseDate: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      Price: new FormControl(null, Validators.required),
    });
  }



  onSubmit(){
    if(!this.gameCreateForm.valid){
      this.invalidCreate = true;
    }else{
      const name = this.gameCreateForm.value.Name;
      const releaseDate = this.gameCreateForm.value.ReleaseDate;
      const description = this.gameCreateForm.value.Description;
      const price = this.gameCreateForm.value.Price;
      const game = new Game(name,releaseDate,description,price);
      this.bs.create(game);
      this.router.navigate(["/dashboard/games"]);
      this.invalidCreate = false;
    }
  }
}
