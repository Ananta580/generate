import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Preset } from 'src/app/common/Models/preset';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'gen-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css'],
})
export class CardCollectionComponent implements OnInit, OnChanges {
  @Input() itemList?: Preset[];
  backupList: Preset[] = [];

  @Input() title?: string = 'Designs';
  activeSlideIndex: number = 0;

  searchValue: string = '';
  private searchSubject: Subject<string> = new Subject();

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(200)).subscribe(() => {
      this.onSearch();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemList'] && changes['itemList'].currentValue) {
      this.backupList = [...(changes['itemList'].currentValue ?? [])];
    }
  }

  onSlideChange(event: any): void {
    this.activeSlideIndex = event.activeIndex;
  }

  onSearchInputChange(): void {
    this.searchSubject.next(this.searchValue);
  }

  private onSearch(): void {
    const initial = [...this.backupList];
    this.itemList = initial?.filter((item) => {
      return (
        item.title.toUpperCase().includes(this.searchValue.toUpperCase()) ||
        item.subtitle.toUpperCase().includes(this.searchValue.toUpperCase()) ||
        item.designer.toUpperCase().includes(this.searchValue.toUpperCase()) ||
        item.type
          ?.toString()
          .toUpperCase()
          .includes(this.searchValue.toUpperCase())
      );
    });
  }
}
