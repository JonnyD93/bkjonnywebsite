import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements AfterViewInit {

  board: number[];
  players: {player1: string, player2: string};
  turn = false;
  last10: any = [];
  last10boards: any = [];
  namesModel: boolean = true;

  ngAfterViewInit() {
    document.body.style.backgroundColor = '#ffffff';
    setTimeout(() => window['$']('ul.tabs').tabs(), 100);
  }

  constructor() {
    this.players.player1 = "";
    this.players.player2 = "";
    /*
    if (JSON.parse(localStorage.getItem('last10Winners')) == null) {
      this.last10 = [];
    } else {
      this.last10 = JSON.parse(localStorage.getItem('last10Winners'));
    }
    if (JSON.parse(localStorage.getItem('last10Boards')) == null) {
      this.last10boards = [];
    } else {
      this.last10boards = JSON.parse(localStorage.getItem('last10Boards'));
    }*/
  }

  setNames(){
    if(this.players.player1 == '') {
    this.players.player1 = "Player 1";
    }
    if(this.players.player2 == ''){
    this.players.player2 = "Player 2";
    }
  }
  toggleNamesModel(){
    this.namesModel = !this.namesModel;
  }
  startGame(){
    this.setNames();
    this.toggleNamesModel();
    this.resetBoard();
  }
  resetBoard() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.turn = false;
  }

  /*setLastWinner(str) {
    this.lastWinner = str;
    localStorage.setItem('lastWinner', this.lastWinner);
  }*/
  setLast10(str) {
    this.last10.unshift(str);
    if (this.last10.length > 10) {
      this.last10.splice(10, 1);
    }
    localStorage.setItem('last10Winners', JSON.stringify(this.last10));
  }

  setLast10Boards() {
  this.last10boards.unshift(this.board);
    if (this.last10boards.length > 10) {
      this.last10boards.splice(10, 1);
    }
    localStorage.setItem('last10Boards', JSON.stringify(this.last10boards));
  }

  select(index) {
    if (this.board[index] === 0) {
      this.board[index] = this.turn ? 2 : 1;
      if (this.checkWin(this.turn ? 2 : 1)) {
        this.setLast10(this.players[this.turn ? 0 : 1] + (this.turn ? 2 : 1) + ' Won!');
        this.setLast10Boards();
        this.resetBoard();
        console.log(this.last10boards);
        return 'null';
      }
      if (this.checkTie()) {
        this.setLast10('Tie!');
        this.setLast10Boards();
        this.resetBoard();
        return 'null';
      }
      this.turn = !this.turn;
    }
  }

  checkWin(val) {
    return(
      this.allEqual(val, [0, 1, 2]) ||
      this.allEqual(val, [3, 4, 5]) ||
      this.allEqual(val, [6, 7, 8]) ||
      this.allEqual(val, [0, 3, 6]) ||
      this.allEqual(val, [1, 4, 7]) ||
      this.allEqual(val, [2, 5, 8]) ||
      this.allEqual(val, [0, 4, 8]) ||
      this.allEqual(val, [2, 4, 6])
    );
  }


  checkTie() {
    return this.board.filter(val => val === 0).length === 0;
  }

  allEqual(val, ar) {
    return ar.filter(a=>this.board[a]===val).length === ar.length;
  }
}
