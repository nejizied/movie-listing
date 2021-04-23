import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActorModalComponent } from './edit-actor-modal.component';

describe('EditActorModalComponent', () => {
  let component: EditActorModalComponent;
  let fixture: ComponentFixture<EditActorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditActorModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
