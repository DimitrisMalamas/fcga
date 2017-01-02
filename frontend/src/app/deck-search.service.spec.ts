/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeckSearchService } from './deck-search.service';

describe('DeckSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeckSearchService]
    });
  });

  it('should ...', inject([DeckSearchService], (service: DeckSearchService) => {
    expect(service).toBeTruthy();
  }));
});
