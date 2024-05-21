import { Component, OnInit } from '@angular/core';
import { PRESET_TYPE } from '../../Models/preset';

@Component({
  selector: 'gen-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent implements OnInit {
  menuItems = [
    {
      name: 'Visiting Cards',
      link: `/presets/${PRESET_TYPE.VISTING_CARD}`,
    },
    {
      name: 'Banners',
      link: `/presets/${PRESET_TYPE.BANNER}`,
    },
    {
      name: 'Logos',
      link: `/presets/${PRESET_TYPE.LOGO}`,
    },
    {
      name: 'Flyers',
      link: `/presets/${PRESET_TYPE.FLYER}`,
    },
    {
      name: 'Posts',
      link: `/presets/${PRESET_TYPE.POST}`,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
