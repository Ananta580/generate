import { Component } from '@angular/core';
import 'jquery-ui-dist/jquery-ui';
import { SessionData } from './common/data/Session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  title = 'Generatee';
  constructor(public session: SessionData) {}
}
