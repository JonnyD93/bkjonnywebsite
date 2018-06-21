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
import { BlogCreationComponent } from './admin/blog-creation-page/blog-creation-page.component';
import { AboutMeComponent } from './about-me/about-me.component';

// Vampire Village
import { VampireVillageComponent } from './tsprojects/vampire-village/vampire-village.component';
import { AbilitiesService } from "./tsprojects/vampire-village/services/abilities.service";
import { FakeDataService } from "./tsprojects/vampire-village/services/fakeData.service";
import { VampireVillageHomeComponent } from './tsprojects/vampire-village/vampire-village-home/vampire-village-home.component';
import { VampireVillageLoginComponent } from './tsprojects/vampire-village/vampire-village-login/vampire-village-login.component';
import { VampireVillageSignUpComponent } from './tsprojects/vampire-village/vampire-village-sign-up/vampire-village-sign-up.component';
import { VampireVillageInventoryComponent } from './tsprojects/vampire-village/vampire-village-inventory/vampire-village-inventory.component';
import {SnakeComponent} from "./tsprojects/snake/snake.component";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutMeComponent },
  { path: 'blog-creation-page', component: BlogCreationComponent },
  { path: 'giveaway-wheel', component: GiveawayWheelComponent },
  { path: 'snake', component: SnakeComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: 'vampire-village', component: VampireVillageComponent },
  { path: 'vampire-village/home', component: VampireVillageHomeComponent },
  { path: 'vampire-village/signup', component: VampireVillageSignUpComponent },
  { path: 'vampire-village/login', component: VampireVillageLoginComponent },
  { path: 'vampire-village/inventory', component: VampireVillageInventoryComponent },
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
    BlogCreationComponent,
    GiveawayWheelComponent,
    HomeComponent,
    SnakeComponent,
    TicTacToeComponent,
    VampireVillageComponent,
    VampireVillageHomeComponent,
    VampireVillageLoginComponent,
    VampireVillageSignUpComponent,
    VampireVillageInventoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AbilitiesService, FakeDataService, Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
