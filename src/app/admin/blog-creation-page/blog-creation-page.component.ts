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
  storageImages: any;
  title: string = '';
  content: string = '';
  file: any;
  images: {file: any };
  embedded: string[] = [];
  constructor() {
    this.database = firebase.database();
    this.storageImages = firebase.storage().ref("images/");
  }
  writeBlogData() {
    console.log(this.embedded)
    this.database.ref('blog/').push({
      title: this.title,
      date: Date(),
      content: this.content,
      embedded: this.embedded
    });
    //this.storageImages.child('images/mountains.jpg').put(this.file);
    this.title = '';
    this.content = '';
    this.embedded = [];
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
  }

}
