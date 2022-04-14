import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileInfoComponent } from './update-profile-info.component';

describe('UpdateProfileInfoComponent', () => {
  let component: UpdateProfileInfoComponent;
  let fixture: ComponentFixture<UpdateProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
