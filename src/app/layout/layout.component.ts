import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  isBtnActive: boolean;
  links: any;
  linksDd: any;
  skills: string[] = ["TypeScript", "HTML5", "JavaScript", "C#", "Angular 2", "NodeJs", "Java", "CSS", "Unity3d", "Photoshop"];
  constructor(private router: Router) {
    this.linksDd = [{route: 'tic-tac-toe', name: 'Tic Tac Toe', i: 'grid_on'}, {
      route: 'giveaway-wheel', name: 'Give Away Wheel', i: 'slow_motion_video'},{route: 'snake', name: 'Snake', i: 'show_chart'}];
    this.links = [{route: 'home', name: 'Home', i: 'home'}, {route: 'about', name: 'About Me', i: 'account_circle'},
      {route: 'blog', name: 'Blog', i: 'create'}, {route: 'resume', name: 'Resume', i: 'ondemand_video'},];
    this.isBtnActive = true;
    if(!!this.links.find((link) => link.route === window.location.hash.substring(2))) {
      Object.assign(this.links.find((link) => link.route === window.location.hash.substring(2)), {active: true});
    }
    if(!!this.linksDd.find((link) => link.route === window.location.hash.substring(2))) {
      Object.assign(this.linksDd.find((link) => link.route === window.location.hash.substring(2)), {active: true});
    }
  }
  resetLinks = (links) => links.map(link => Object.assign(link, {active: false}));
  navigation = (links,route, elementId?) => {
    this.resetLinks(this.links);
    this.resetLinks(this.linksDd);
    this.router.navigate([`${route}`])
      .then(() => Object.assign(links.find((link) => link.route === window.location.hash.substring(2)), {active: true}));
  };

  ngOnInit() {
  }
  ngAfterViewInit() {
    document.body.style.backgroundColor = '#eaf6ff';
    window['$'](document).ready(() => {
      window['$']('.sidenav').sidenav();
    });
  }

}
