import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedPackagesComponent } from './uploaded-packages.component';

describe('UploadedPackagesComponent', () => {
  let component: UploadedPackagesComponent;
  let fixture: ComponentFixture<UploadedPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedPackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
