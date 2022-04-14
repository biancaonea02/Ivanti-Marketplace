import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  expandMore1: boolean;
  expandMore2: boolean;

  constructor() { }

  ngOnInit(): void {
    this.expandMore1 = false;
    this.expandMore2 = false;
  }

  expandText1() {
    this.expandMore1 = true;
  }

  expandText2() {
    this.expandMore2 = true;
  }

}
