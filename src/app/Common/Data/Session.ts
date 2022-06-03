import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionData {
  showMenuBar = true;
  constructor() {
    this.showMenuBar = true;
  }
  setMenuBar(set: any) {
    this.showMenuBar = set;
  }
}
