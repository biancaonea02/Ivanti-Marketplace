import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageYourPackagesComponent } from './manage-your-packages.component';

describe('ManageYourPackagesComponent', () => {
  let component: ManageYourPackagesComponent;
  let fixture: ComponentFixture<ManageYourPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageYourPackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageYourPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
