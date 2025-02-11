import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedsComponent } from './edit-meds.component';

describe('EditMedsComponent', () => {
  let component: EditMedsComponent;
  let fixture: ComponentFixture<EditMedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
