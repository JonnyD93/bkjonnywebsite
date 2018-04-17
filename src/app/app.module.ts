import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
// Important Components
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

// Pages of Website
import { HomeComponent } from './home/home.component';
import { GiveawayWheelComponent } from './giveaway-wheel/giveaway-wheel.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { SnakeComponent } from './snake/snake.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'giveaway-wheel', component: GiveawayWheelComponent },
  { path: 'snake', component: SnakeComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    // Pages of Website Below
    GiveawayWheelComponent,
    HomeComponent,
    SnakeComponent,
    TicTacToeComponent

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
