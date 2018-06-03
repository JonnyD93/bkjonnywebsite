import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as firebase from "firebase";
import {DateFormatter} from "@angular/common/src/pipes/deprecated/intl";

@Component({
  selector: 'app-blog-creation',
  templateUrl: './blog-creation-page.component.html',
  styleUrls: ['./blog-creation-page.component.css', '../admin.component.css']
})
export class BlogCreationComponent implements OnInit, AfterViewInit {
  //Database
  database: any;

  //Variables for Submitting
  title: string = '';
  content: string = '';
  images: string[] = [];
  embedded: string[] = [];

  //Variables for Testing
  date: Date;
  test: boolean = false;
  postExample: { title: string, date: string, content: string, images: string[], embedded: string[] } [] = []

  constructor() {
    this.database = firebase.database();
    this.date = new Date();
  }

  updateStrings() {
    for (let i = 0; i < this.images.length; i++)
      this.images[i] = (<HTMLInputElement>document.getElementById(i + 'image')).value
    for (let i = 0; i < this.embedded.length; i++) {
      let x = (<HTMLInputElement>document.getElementById(i + 'embedded')).value;
      this.embedded[i] = x;
    }
  }

  writeBlogData() {
    this.updateStrings();
    this.database.ref('blog/').push({
      title: this.title,
      date: Date(),
      content: this.content,
      embedded: this.embedded,
      images: this.images
    });
    this.resetAll();
  }

  //Reset the all the Data on the page
  resetAll() {
    this.test = false;
    this.postExample = [];
    this.title = '';
    this.content = '';
    this.embedded = [];
    this.images = [];
  }

  createTest() {
    this.test = true;
    this.updateStrings();
    this.postExample.push({
      title: this.title,
      date: (this.date.getMonth() + 1) + "/" + this.date.getDate() + "/" + this.date.getFullYear(),
      content: this.content,
      images: this.images,
      embedded: this.embedded
    })
    console.log(this.postExample);
  }
  updateEmbedded(url: string, id: number, id2: number) {
    document.getElementById('embedded' + id + '' + id2).innerHTML = url;
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
