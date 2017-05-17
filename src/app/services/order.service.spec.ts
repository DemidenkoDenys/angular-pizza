/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderServiceService } from './order-service.service';

describe('OrderServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderServiceService]
    });
  });

  it('should ...', inject([OrderServiceService], (service: OrderServiceService) => {
    expect(service).toBeTruthy();
  }));
});
