import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as firebase from "firebase";
import {DateFormatter} from "@angular/common/src/pipes/deprecated/intl";

@Component({
  selector: 'app-blog-creation',
  templateUrl: './blog-creation-page.component.html',
  styleUrls: ['./blog-creation-page.component.css','../admin.component.css']
})
export class BlogCreationComponent implements OnInit, AfterViewInit {
  database: any;
  title: string;
  content: string;
  images: string[];
  embedded: string[];
  constructor() {
    this.database = firebase.database();
  }
  writeBlogData() {
    this.database.ref('blog/').push({
      title: this.title,
      date: Date(),
      content: this.content
    });
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
    window['$'](document).ready(function(){
      window['$']('.datepicker').datepicker();
    });
  }

}
