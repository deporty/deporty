import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TeamComponent } from './team.component';
import { UsecasesModule as PlayersUsecasesModule } from '../../../../players/usecases/usecases.module';
import { UsecasesModule } from '../../../usecases/usecases.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

fdescribe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PlayersUsecasesModule,
        UsecasesModule,
        MatAutocompleteModule,
      ],

      declarations: [TeamComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
