import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements AfterViewInit {

  board: number[];

  turn = false;
  lastWinner: string;
  o: any = {health: 5};
  last10: any = [];

  ngAfterViewInit() {
    document.body.style.backgroundColor = '#ffffff';
  }

  constructor() {
    this.resetBoard();
    this.last10 = JSON.parse(localStorage.getItem('last10Winners'));
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

  select(index) {
    if (this.board[index] === 0) {
      this.board[index] = this.turn ? 2 : 1;
      if (this.checkWin(this.turn ? 2 : 1)) {
        this.setLast10('Player ' + (this.turn ? 2 : 1) + ' Won!');
        this.resetBoard();
        return 'null';
      }
      if (this.checkTie()) {
        this.setLast10('Tie!');
        this.resetBoard();
        return 'null';
      }
      this.turn = !this.turn;
    }
  }

  checkWin(val) {
    if (
      this.allEqual(val, [0, 1, 2]) ||
      this.allEqual(val, [3, 4, 5]) ||
      this.allEqual(val, [6, 7, 8]) ||
      this.allEqual(val, [0, 3, 6]) ||
      this.allEqual(val, [1, 4, 7]) ||
      this.allEqual(val, [2, 5, 8]) ||
      this.allEqual(val, [0, 5, 8]) ||
      this.allEqual(val, [2, 5, 6])
    ) {
      return true;
    }
    return false;
  }

  checkTie() {
    return this.board.filter(val => val === 0).length === 0;
  }

  allEqual(val, ar) {
    return ar.filter(a => this.board[a] === val).length === ar.length;
  }

}
