import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordProfileComponent } from './reset-password-profile.component';

describe('ResetPasswordProfileComponent', () => {
  let component: ResetPasswordProfileComponent;
  let fixture: ComponentFixture<ResetPasswordProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
