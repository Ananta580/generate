import { Component, Input, OnInit } from '@angular/core';
import { Preset } from 'src/app/Common/Models/Preset';

@Component({
  selector: 'gen-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css'],
})
export class CardCollectionComponent implements OnInit {
  @Input() itemList: Preset[] | undefined;
  constructor() {}

  ngOnInit(): void {}
}
