import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedPackageDetailsComponent } from './uploaded-package-details.component';

describe('UploadedPackageDetailsComponent', () => {
  let component: UploadedPackageDetailsComponent;
  let fixture: ComponentFixture<UploadedPackageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedPackageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedPackageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
