import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHouseFormComponent } from './new-house-form.component';

describe('NewHouseFormComponent', () => {
  let component: NewHouseFormComponent;
  let fixture: ComponentFixture<NewHouseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHouseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
