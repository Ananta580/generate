import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PRESET_TYPE, Preset } from 'src/app/common/models/preset';
import { DatabaseService } from 'src/app/common/services/database.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'gen-preset',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './preset.component.html',
})
export class PresetComponent {
  presets?: Preset[];

  presetType?: PRESET_TYPE;
  constructor(private _route: ActivatedRoute, private db: DatabaseService) {
    this._route.params.subscribe({
      next: (params: Params) => {
        const { type } = params;
        this.presetType = type;
        this.presets = undefined;
        if (type != undefined) {
          this.loadPresets();
        }
      },
    });
  }

  loadPresets() {
    this.db.getAllContentsByType(this.presetType).subscribe({
      next: (data) => {
        this.presets = data;
      },
    });
  }

  get title() {
    const chars = this.presetType?.replace('-', ' ');
    return chars + 's';
  }

  contentDeleted() {
    this.loadPresets();
  }
}
