import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  activePosts: { title: string, date: string, content: string, images: string[], embedded: string[] } [] = []; //Active Posts on Page
  pageIndex: number; //The Page we are On
  amtPostsShown: number = 5; //The Amount of Posts Shown on Each Page
  NumOfPages: number[] = []; // The Amount of Pages to choose from
  database: any;
  Posts: { title: string, date: string, content: string, images: string[], embedded: string[] }[] = []; //All Posts on the Database

  constructor() {
    this.database = firebase.database();
    this.database.ref('blog').once('value').then((snapshot) => {
      for (var key in snapshot.val()) {
        this.Posts.splice(0, 0, {
          title: snapshot.val()[key].title,
          date: this.formatDate(snapshot.val()[key].date),
          content: snapshot.val()[key].content,
          images: snapshot.val()[key].images,
          embedded: snapshot.val()[key].embedded
        });
        console.log(this.Posts);
      }
      this.updatePage();
    });
    this.pageIndex = 0; // The page index is the page we are on.
    this.updatePage();
  }

  ngOnInit() {
    window['$']('.parallax').parallax();
  }
  updatePage() {
    this.activePosts = [];
    for (let i = (this.pageIndex * this.amtPostsShown);
         i < this.Posts.length && i < (this.amtPostsShown + (this.pageIndex * this.amtPostsShown)); i++) {
      this.activePosts.push(this.Posts[i]);
    }
    this.checkNumOfPages();
  }

  checkNumOfPages() {
    this.NumOfPages = [];
    for (let i = 0; i < this.Posts.length / this.amtPostsShown; i++) {
      this.NumOfPages.push(i);
    }
  }
  checkActivePage(index) {
    return (this.pageIndex === index) ? '#7bc9ff' : 'white';
  }
  changePage(Right: boolean) {
    (Right) ? this.pageIndex++ : (this.pageIndex - 1 < 0) ? this.pageIndex = 0 : this.pageIndex--;
    this.updatePage();
  }
  changeLastPage(Right: boolean) {
    (Right) ? this.pageIndex = this.NumOfPages[this.NumOfPages.length - 1] : this.pageIndex = 0;
    this.updatePage();
  }
  formatDate(string) {
    const date: Date = new Date(string);
    return (`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
  }

  updateEmbedded(url: string, id: number, id2: number) {
    document.getElementById('embedded' + id + '' + id2).innerHTML = url;
  }
}
