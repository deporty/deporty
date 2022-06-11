import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMatchCardComponent } from './edit-match-card.component';

describe('EditMatchCardComponent', () => {
  let component: EditMatchCardComponent;
  let fixture: ComponentFixture<EditMatchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMatchCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMatchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
