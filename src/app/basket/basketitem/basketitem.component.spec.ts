/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BasketitemComponent } from './basketitem.component';

describe('BasketitemComponent', () => {
  let component: BasketitemComponent;
  let fixture: ComponentFixture<BasketitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
