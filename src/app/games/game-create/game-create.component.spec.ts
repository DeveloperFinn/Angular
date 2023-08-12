import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreateComponent } from './game-create.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('GameCreateComponent', () => {
  let component: GameCreateComponent;
  let fixture: ComponentFixture<GameCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroup, FormControl],
      declarations: [ GameCreateComponent ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
