import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreIntroComponent } from './store-intro.component';

describe('StoreIntroComponent', () => {
  let component: StoreIntroComponent;
  let fixture: ComponentFixture<StoreIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
