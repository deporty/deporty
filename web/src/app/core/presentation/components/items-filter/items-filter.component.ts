import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface ItemsFilter {
  display: string;
  property: string;
  icon?: string;
  kind?: string;
}

@Component({
  selector: 'app-items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss'],
})
export class ItemsFilterComponent implements OnInit {
  @Input() filters!: ItemsFilter[];
  @Input() items!: any[];
  @Output('on-filter') onFilter: EventEmitter<any[]>;

  formGroup!: FormGroup;
  filteredItems: any[];

  constructor() {
    this.filteredItems = [];
    this.filters = [];

    this.onFilter = new EventEmitter<any[]>();
  }

  ngOnInit(): void {
    this.configure();
  }
  configure() {
    this.filteredItems = [...this.items];
    this.generateForm();
  }

  generateForm() {
    const form: any = {};
    for (const filter of this.filters) {
      form[filter.property] = new FormControl('');
    }
    this.formGroup = new FormGroup(form);
  }

  onChangeForm() {
    const value = this.formGroup.value;
    this.filteredItems = [...this.items];
    const keys = Object.keys(value);
    for (const key of keys) {
      if (!!value[key]) {
        this.filteredItems = this.filteredItems.filter((item: any) => {
          return !!item[key]
            ? item[key].toUpperCase().includes(value[key].toUpperCase())
            : false;
        });
      }
    }
    this.onFilter.emit(this.filteredItems);
  }
}
