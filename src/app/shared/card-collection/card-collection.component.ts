import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Preset } from 'src/app/common/models/preset';
import { DatabaseService } from 'src/app/common/services/database.service';
import { ToastService } from 'src/app/common/services/toast-service';
import { EventEmitter } from '@angular/core';

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

  @Output() contentDeleted: EventEmitter<boolean> = new EventEmitter();

  searchValue: string = '';
  private searchSubject: Subject<string> = new Subject();

  isAdminLoggedIn = JSON.parse(
    localStorage.getItem('isAdminLoggedIn') || 'false'
  );

  breakpoints = {
    300: { slidesPerView: 1, spaceBetween: 20 },

    640: { slidesPerView: 2, spaceBetween: 20 },

    980: { slidesPerView: 3, spaceBetween: 20 },

    1100: { slidesPerView: 4, spaceBetween: 20 },

    1300: { slidesPerView: 5, spaceBetween: 20 },
  };

  constructor(
    private db: DatabaseService,
    private toastService: ToastService
  ) {}

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

  deleteContent(contentId: number) {
    this.db.deleteContent(contentId).subscribe(
      (data) => {
        this.toastService.showSuccess('Content deleted successfully');
        this.contentDeleted.emit(true);
      },
      (error) => {
        this.toastService.showError('Content could not be deleted');
      }
    );
  }
}
