import { Component, Input } from '@angular/core';
import { Preset } from 'src/app/common/Models/preset';

@Component({
  selector: 'gen-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css'],
})
export class CardCollectionComponent {
  @Input() itemList: Preset[] | undefined;

  @Input() title?: string = 'Explore Designs';
  activeSlideIndex: number = 0;

  onSlideChange(event: any): void {
    this.activeSlideIndex = event.activeIndex;
  }
}
