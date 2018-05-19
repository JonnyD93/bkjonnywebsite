import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  blogdata: { title: string, date: string, content: string, image: string }[] = [{
    title: "Website Update 1",
    date: "5/18/2018",
    content: "Started off by creating the home page, which if you are unable to tell, I plan it to be like a blog. I will post weekly updates here, and allow for easy maneuvering to other updates. As of right now, the entire card is based off of the html. I plan to move this into a firebase database, and have my own system in which I can log in, and change my website easily. All of this is being done in Angular 2, and in Typescript.",
    image: ""
  }, {
    title: "Website Update 1",
    date: "5/18/2018",
    content: "Started off by creating the home page, which if you are unable to tell, I plan it to be like a blog. I will post weekly updates here, and allow for easy maneuvering to other updates. As of right now, the entire card is based off of the html. I plan to move this into a firebase database, and have my own system in which I can log in, and change my website easily. All of this is being done in Angular 2, and in Typescript.",
    image: "../../assets/images/logo/altYinYangYong.png"
  }
  ];

  constructor() {
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    window['$'](document).ready(function () {
      window['$']('.parallax').parallax();
    });

  }

}
