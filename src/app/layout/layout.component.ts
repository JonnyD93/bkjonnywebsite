import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    document.body.style.backgroundColor = 'hsl(0, 0%, 00%)';
    window['$']('.dropdown-trigger').dropdown({click: true});
    window['$'](document).ready(function(){
      window['$']('.sidenav').sidenav();
    });
  }

}
