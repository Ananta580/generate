import { Component, OnInit } from '@angular/core';
import { Preset } from 'src/app/Common/Models/preset';

@Component({
  selector: 'gen-posts-preset',
  templateUrl: './posts-preset.component.html',
  styleUrls: ['./posts-preset.component.css'],
})
export class PostsPresetComponent implements OnInit {
  posts: Preset[] = [
    {
      imgsrc: 'src/assets/images/Front.jpg',
      designer: 'Ananta Poudel',
      date: new Date(),
      title: 'Made for Leo club',
      subtitle:
        'You can use this to congratulate anyone with 2 person at a time',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
