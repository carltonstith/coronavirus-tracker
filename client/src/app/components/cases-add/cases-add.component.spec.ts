import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesAddComponent } from './cases-add.component';

describe('CasesAddComponent', () => {
  let component: CasesAddComponent;
  let fixture: ComponentFixture<CasesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
