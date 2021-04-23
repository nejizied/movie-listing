import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGenreModalComponent } from './edit-genre-modal.component';

describe('EditGenreModalComponent', () => {
  let component: EditGenreModalComponent;
  let fixture: ComponentFixture<EditGenreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGenreModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGenreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
