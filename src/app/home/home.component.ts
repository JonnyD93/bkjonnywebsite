import {AfterViewInit, Component, OnInit} from '@angular/core';
import {createElement} from "@angular/core/src/view/element";
import {appendChild} from "@angular/core/src/render3/node_manipulation";
import * as firebase from "firebase";
import {until} from "selenium-webdriver";
import titleContains = until.titleContains;
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  count: any = 0;
  hasScrolled : boolean;
  waitPeriod : boolean;
  projects: any = [
    {img: "/assets/images/backgrounds/Yang_Bg3.png", desc: "One of the few places I post updates about what current projects, and progress on these projects is underway.", projectName: "Blog",router: 'blog'},
    {img: "src", desc: "A project in which i built form the ground up", projectName: "Unity Skill Sheets",router: 'projects/unitySS'},
    {img: "src", desc: "", projectName: "Cameron Photography", router: ''},
    {img: "src", desc: "", projectName: "Vampire Village", router: ''},
    {img: "src", desc: "", projectName: "Ansleigh Photography", router: ''},
    {img: "src", desc: "", projectName: "Todo List", router: ''},
    {img: "src", desc: "", projectName: "Giveaway wheel", router: ''}];

  constructor(private router: Router) {
    this.hasScrolled = false;
    window['$'](document).ready(()=>{
      window['$']('.parallax').parallax();
      let xPos, yPos;
      window['$'](document).mousemove((e) => {
        xPos = ((4 * e.pageX) / 600) + 80;
        yPos = ((4 * e.pageY) / 600) + 60;
        window['$'](".title").css({"background-position": xPos + "%" + yPos + "%"});
      });
    });

  }

  ngOnInit() {
    window['$'] (document).ready(() => {
      window['$']('.parallax').parallax();
    });

  }

  ngAfterViewInit() {
    let interval = setInterval(()=> {
      if(this.count <= 1000) {
        this.count++;
        if (this.count > 1000) {
          this.waitPeriod = true;
        }
      }
      if(!this.hasScrolled) {
        window.onscroll = (e) => {
          this.hasScrolled = true;
          for (let i = 0; i < document.getElementsByTagName("li").length; i++) {
            document.getElementsByTagName("li").item(i).style.marginBottom = Math.floor(Math.random() * (12 - 10 + 1) + 10) + 'px';
          }
        }
      } else {
        clearInterval(interval);
      }
    },10);
  }
  openModal(project){

    this.router.navigate([`${project.router}`]);
  }
}
