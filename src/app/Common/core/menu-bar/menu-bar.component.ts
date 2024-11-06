import { Component, HostListener, OnInit } from '@angular/core';
import { PRESET_TYPE } from '../../Models/preset';

@Component({
  selector: 'gen-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent {
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

  isMenuHidden = true;
  isLargeScreen = false;

  toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLargeScreen = event.target.innerWidth >= 640;
  }

  ngOnInit() {
    this.isLargeScreen = window.innerWidth >= 640;
  }
}
