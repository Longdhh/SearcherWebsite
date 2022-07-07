import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistedJobComponent } from './registed-job.component';

describe('RegistedJobComponent', () => {
  let component: RegistedJobComponent;
  let fixture: ComponentFixture<RegistedJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistedJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
