import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import * as firebase from "firebase";
// Important Components
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

// Pages of Website
import { HomeComponent } from './home/home.component';
import { GiveawayWheelComponent } from './tsprojects/giveaway-wheel/giveaway-wheel.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { AboutMeComponent } from './about-me/about-me.component';

// Admin Pages
import { AdminSignInComponent } from './admin/admin-sign-in/admin-sign-in.component';
import { AdminCreateBlogPostComponent } from './admin/admin-create-blog-post/admin-create-blog-post.component';

// ts Projects
import { SnakeComponent } from "./tsprojects/snake/snake.component";
import { ClassportfolioComponent } from './classportfolio/classportfolio.component';

//Services
import {AdminService} from "./admin/admin.service";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutMeComponent },
  { path: 'classportfolio', component: ClassportfolioComponent },
  { path: 'admin/create-post', component: AdminCreateBlogPostComponent },
  { path: 'admin/signin', component: AdminSignInComponent },
  { path: 'giveaway-wheel', component: GiveawayWheelComponent },
  { path: 'snake', component: SnakeComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: HomeComponent }
];

const config = {
  apiKey: "AIzaSyChSTdDfRuck6HUU2yDY2-ICRBIh9BWJiI",
  authDomain: "blackkoijonny-420cc.firebaseapp.com",
  databaseURL: "https://blackkoijonny-420cc.firebaseio.com/",
  storageBucket: "gs://blackkoijonny-420cc.appspot.com"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    // Pages of Website Below
    AboutMeComponent,
    AdminCreateBlogPostComponent,
    GiveawayWheelComponent,
    HomeComponent,
    SnakeComponent,
    TicTacToeComponent,
    ClassportfolioComponent,
    AdminSignInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AdminService, Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
