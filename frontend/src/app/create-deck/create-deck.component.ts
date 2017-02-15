import { Component, OnInit ,Input} from '@angular/core';
import { Deck } from '../deck';
import { DeckDetailComponent } from '../deck-detail/deck-detail.component';
import { DeckService } from '../deck.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})
export class CreateDeckComponent implements OnInit {


  decks : Deck[];

  category : string;

  constructor(private router: Router,
              private deckService: DeckService,
              private authService: AuthService) { }

  categories = ['Other', 'Biology'];
  selectedCategory : string;
  ngOnInit() {
    this.category = this.categories[0];
  }
  onSelect(category: string): void {
    this.selectedCategory = category;
    this.category = category;
  }

  add(title: string, description: string): void {
    title = title.trim();

    description = description.trim();
    if (!title) { return; }
        this.deckService.create(title, this.category, description)
      .then(deck => {

        this.router.navigate(['/decks']);
      });
  }
}
