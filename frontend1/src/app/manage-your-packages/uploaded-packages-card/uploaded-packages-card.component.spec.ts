import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedPackagesCardComponent } from './uploaded-packages-card.component';

describe('UploadedPackagesCardComponent', () => {
  let component: UploadedPackagesCardComponent;
  let fixture: ComponentFixture<UploadedPackagesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedPackagesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedPackagesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
