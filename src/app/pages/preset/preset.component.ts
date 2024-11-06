import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRESET_TYPE, Preset } from 'src/app/common/Models/preset';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Params } from '@angular/router';
import { DB_PRESETS } from './preset.data';

@Component({
  selector: 'gen-preset',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './preset.component.html',
})
export class PresetComponent {
  presets: Preset[] = [];

  dbPresets: Preset[] = DB_PRESETS;

  presetType?: PRESET_TYPE;

  constructor(private _route: ActivatedRoute) {
    this._route.params.subscribe({
      next: (params: Params) => {
        const { type } = params;
        this.presetType = type;
        if (type != undefined) {
          this.presets = this.dbPresets.filter(
            (x) => x.type?.toString() === type
          );
        }
      },
    });
  }

  get title() {
    const chars = this.presetType?.replace('-', ' ');
    return 'explore ' + chars + 's';
  }
}
