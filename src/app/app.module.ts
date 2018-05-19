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
import { GiveawayWheelComponent } from './giveaway-wheel/giveaway-wheel.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { SnakeComponent } from './snake/snake.component';
import { BlogCreationComponent } from './blog-creation-page/blog-creation-page.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'blog-creation-page', component: BlogCreationComponent },
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
  storageBucket: "gs://blackkoijonny-420cc.appspot.com",
};

firebase.initializeApp(config);
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    // Pages of Website Below
    GiveawayWheelComponent,
    HomeComponent,
    SnakeComponent,
    TicTacToeComponent,
    BlogCreationComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
