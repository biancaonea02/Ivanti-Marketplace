import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePackageCreatorComponent } from './update-package-creator.component';

describe('UpdatePackageCreatorComponent', () => {
  let component: UpdatePackageCreatorComponent;
  let fixture: ComponentFixture<UpdatePackageCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePackageCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePackageCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
