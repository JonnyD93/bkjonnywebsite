import {AfterViewInit, Component, OnInit} from '@angular/core';
import {createElement} from "@angular/core/src/view/element";
import {appendChild} from "@angular/core/src/render3/node_manipulation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  activePosts: { title: string, date: string, content: string, images: string[], embedded: string[]} [] = []; //Active Posts on Page
  pageIndex: number; //The Page we are On
  amtPostsShown: number = 5; //The Amount of Posts Shown on Each Page
  NumOfPages: number[] = []; // The Amount of Pages to choose from
  Posts: { title: string, date: string, content: string, images: string[], embedded: string[] }[] = [/*{ //Temp until synchronized with Firebase
    title: "Website Update 6",
    date: "5/18/2018",
    content: "Started off by creating the home page, which if you are unable to tell, I plan it to be like a blog. I will post weekly updates here, and allow for easy maneuvering to other updates. As of right now, the entire card is based off of the html. I plan to move this into a firebase database, and have my own system in which I can log in, and change my website easily. All of this is being done in Angular 2, and in Typescript.",
    images: [],
    embedded: []//["<iframe width='560' height='315' src=\"https://www.youtube.com/embed/H6HsalSk-ZM\" frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>"]
  },{
    title: "Website Update 5",
    date: "5/18/2018",
    content: "Started off by creating the home page, which if you are unable to tell, I plan it to be like a blog. I will post weekly updates here, and allow for easy maneuvering to other updates. As of right now, the entire card is based off of the html. I plan to move this into a firebase database, and have my own system in which I can log in, and change my website easily. All of this is being done in Angular 2, and in Typescript.",
    images: ["../../assets/images/logo/altYinYangYong.png"],
    embedded: []
  },{
    title: "Website Update 4",
    date: "5/18/2018",
    content: "Started off by creating the home page, which if you are unable to tell, I plan it to be like a blog. I will post weekly updates here, and allow for easy maneuvering to other updates. As of right now, the entire card is based off of the html. I plan to move this into a firebase database, and have my own system in which I can log in, and change my website easily. All of this is being done in Angular 2, and in Typescript.",
    images: [],
    embedded: []
  },{
    title: "Website Update 3",
    date: "5/18/2018",
    content: "Started off by creating the home page, which if you are unable to tell, I plan it to be like a blog. I will post weekly updates here, and allow for easy maneuvering to other updates. As of right now, the entire card is based off of the html. I plan to move this into a firebase database, and have my own system in which I can log in, and change my website easily. All of this is being done in Angular 2, and in Typescript.",
    images: [],
    embedded: []
  },*/{
    title: "Website Update 2",
    date: "5/21/2018",
    content: "Yet another very successful day, went from a barebones blogging website, to a multipage, embeddable, and photoshowing website. I've updated the website's side navigation, flushed it out some more. Also I have been debating on how I want this blog website to work. I am not sure if I should make a settings bar, for amount of posts shown, and also a search option. It is hard to tell as of now. The progress, in my opinion has been phenomenal! I'll post some photos below to show the progress, keep it on file. ",
    images: ["../../assets/images/website-progress/website-update-1.PNG","../../assets/images/website-progress/website-update-1-2.PNG","../../assets/images/website-progress/website-update-1-3.PNG"],
    embedded: ["<iframe width='560' height='315' src=\"https://www.youtube.com/embed/H6HsalSk-ZM\" frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>"]
  }, {
    title: "Website Update 1",
    date: "5/18/2018",
    content: "Started off by creating the home page, which if you are unable to tell, I plan it to be like a blog. I will post weekly updates here, and allow for easy maneuvering to other updates. As of right now, the entire card is based off of the html. I plan to move this into a firebase database, and have my own system in which I can log in, and change my website easily. All of this is being done in Angular 2, and in Typescript.",
    images: [],
    embedded: ["<iframe width='100%' height='300' scrolling='no' frameborder='no' allow='autoplay' src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/339318387&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true\"></iframe>"]
  }
  ];

  constructor() {
    this.pageIndex = 0; // The page index is the page we are on.
    this.updatePage();
  }

  checkNumOfPages(){
    this.NumOfPages = [];
    for(let i = 0; i < this.Posts.length/this.amtPostsShown ; i++ )
      this.NumOfPages.push(i);
  }

  changePage(Right:boolean){
    if(Right)
      this.pageIndex++;
    else {
      if(this.pageIndex-1 < 0){
        this.pageIndex = 0;
      }
      else
        this.pageIndex--;
    }
      this.updatePage();
  }

  updatePage(){
    this.activePosts = [];
    for(let i = (this.pageIndex*this.amtPostsShown); i < this.Posts.length && i < (this.amtPostsShown + (this.pageIndex*this.amtPostsShown)) ; i++ ) {
     this.activePosts.push(this.Posts[i]);
    }
    this.checkNumOfPages();
  }
  updateEmbedded(url:string, id:number, id2:number){
    document.getElementById('embedded'+id+''+id2).innerHTML = url;
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
