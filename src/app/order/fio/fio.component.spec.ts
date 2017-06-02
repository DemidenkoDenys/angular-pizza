/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FioComponent } from './fio.component';

describe('FioComponent', () => {
  let component: FioComponent;
  let fixture: ComponentFixture<FioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
