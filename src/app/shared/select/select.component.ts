import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T> implements ControlValueAccessor {
  @Input() items: T[] = [];
  @Input() bindLabel: string = '';
  @Input() bindValue: string = '';
  @Input() placeholder: string = 'Select an item';
  @Input() className: string = '';
  @Input() clearable: boolean = false;
  @Input() required: boolean = true;
  @Input() loading: boolean = false;
  @Input() multiple: boolean = false;
  @Input() searchable: boolean = false;
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;

  @Input() typeahead: any = false;

  @Output() open = new EventEmitter<any>();
  @Output() searchChange = new EventEmitter<string>();

  selectedItem: any = null;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.selectedItem = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(value: any) {
    this.selectedItem = value;
    this.onChange(value);
    this.onTouched();
  }

  onSearchChange(term: string) {
    this.searchChange.emit(term);
  }
}
