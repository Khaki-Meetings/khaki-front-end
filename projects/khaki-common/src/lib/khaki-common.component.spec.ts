import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhakiCommonComponent } from './khaki-common.component';

describe('KhakiCommonComponent', () => {
  let component: KhakiCommonComponent;
  let fixture: ComponentFixture<KhakiCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhakiCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhakiCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
