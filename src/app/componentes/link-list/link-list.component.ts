import { Component, OnInit, Input } from '@angular/core';
import { Links } from '../../interfaces/interfaces';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html'
})
export class LinkListComponent implements OnInit {

  constructor() { }

  @Input() linkList: Links[];
  ngOnInit(): void {
  }

}
