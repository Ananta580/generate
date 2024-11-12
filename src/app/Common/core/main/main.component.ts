import { Component, OnInit } from '@angular/core';
import { Preset } from '../../Models/preset';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'gen-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  presets?: Preset[];

  renameValues = ['BAD', 'GOOD'];
  leadOptions = ['Any', 'LD1', 'LD2'];

  renameOtherValue = {
    label: 'Others',
    key: 'Others',
  };

  renameWithOtherValues = [...this.renameValues, 'Others'];

  blocks = [
    {
      id: 1,
      newName: 'New',
      name: 'Something else',
      leadOptions: ['Any'],
    },
  ];

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadAllContents();
    }, 500);
  }

  loadAllContents() {
    this.db.getAllForHome().subscribe({
      next: (data) => {
        this.presets = data;
      },
    });
  }

  changed(block: any, event: any) {
    if (event === 'Others') {
      block.newName = '';
      return;
    }
    block.newName = event;
    console.log('changed', event);
  }
}
