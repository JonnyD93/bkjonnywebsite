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
import { AdminCreateBlogPostComponent } from './admin/admin-create-blog-post/admin-create-blog-post.component';
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
import {ItemsService} from "./tsprojects/vampire-village/services/items.service";
import { ClassportfolioComponent } from './classportfolio/classportfolio.component';
import {EffectsService} from "./tsprojects/vampire-village/services/effects.service";
import {AccountService} from "./tsprojects/vampire-village/services/account.service";
import { VampireVillageCreateCharacterComponent } from './tsprojects/vampire-village/vampire-village-create-character/vampire-village-create-character.component';
import { AdminSignInComponent } from './admin/admin-sign-in/admin-sign-in.component';
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
  { path: 'vampire-village', component: VampireVillageComponent },
  { path: 'vampire-village/home', component: VampireVillageHomeComponent },
  { path: 'vampire-village/signup', component: VampireVillageSignUpComponent },
  { path: 'vampire-village/login', component: VampireVillageLoginComponent },
  { path: 'vampire-village/inventory', component: VampireVillageInventoryComponent },
  { path: 'vampire-village/create-character', component: VampireVillageCreateCharacterComponent },
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
    VampireVillageComponent,
    VampireVillageHomeComponent,
    VampireVillageLoginComponent,
    VampireVillageSignUpComponent,
    VampireVillageInventoryComponent,
    ClassportfolioComponent,
    VampireVillageCreateCharacterComponent,
    AdminSignInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AbilitiesService, AccountService, AdminService, FakeDataService, ItemsService, EffectsService, Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
