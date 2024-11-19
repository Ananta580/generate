import { Component, OnInit } from '@angular/core';
import { Preset } from '../../models/preset';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'gen-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  presets?: Preset[];

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.loadAllContents();
  }

  loadAllContents() {
    this.db.getAllForHome().subscribe({
      next: (data) => {
        this.presets = data;
      },
    });
  }

  contentDeleted() {
    this.loadAllContents();
  }
}
