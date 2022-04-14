import { Component, Input, OnInit } from '@angular/core';
import { Package } from 'src/app/model/package';

@Component({
  selector: 'app-uploaded-packages-card',
  templateUrl: './uploaded-packages-card.component.html',
  styleUrls: ['./uploaded-packages-card.component.css']
})
export class UploadedPackagesCardComponent implements OnInit {

  @Input() public title: String;
  @Input() public id: number;
  @Input() public intro: String;
  package: Package;

  constructor() { }

  ngOnInit(): void {
  }
}
