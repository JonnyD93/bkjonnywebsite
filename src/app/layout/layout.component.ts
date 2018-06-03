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
    document.body.style.backgroundColor = '#eaf6ff';
    window['$']('.dropdown-trigger').dropdown({hover: true});
    window['$'](document).ready(function(){
      window['$']('.sidenav').sidenav();
    });
  }

}
