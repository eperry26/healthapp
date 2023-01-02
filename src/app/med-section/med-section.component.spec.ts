import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedSectionComponent } from './med-section.component';

describe('MedSectionComponent', () => {
  let component: MedSectionComponent;
  let fixture: ComponentFixture<MedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
