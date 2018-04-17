import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x = 0;
  grid = 16;
  snake = {
    x: 0,
    y: 0,
    dx: this.grid,
    dy: 0,
    cells: [],
    maxCells: 4
  };
  apple = {
    x: 320,
    y: 320
  };
  constructor() { }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('snake');
    this.ctx = this.canvas.getContext('2d');
    this.loop();
  }
  loop(){
    this.ctx.clearRect(0,0, this.canvas.width,this.canvas.height);

    this.snake.x += this.snake.dx;
    this.snake.y += this.snake.dy;

    this.snake.cells.unshift({x: this.snake.x, y: this.snake.y});

    if (this.snake.cells.length > this.snake.maxCells) {
      this.snake.cells.pop();
    }

    if (this.snake.x < 0) {
      this.snake.x = this.canvas.width - this.grid;
    }
    else if (this.snake.x >= this.canvas.width) {
      this.snake.x = 0;
    }
    if (this.snake.y < 0) {
      this.snake.y = this.canvas.height - this.grid;
    }
    else if (this.snake.y >= this.canvas.height) {
      this.snake.y = 0;
    }
    // draw apple
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.apple.x, this.apple.y, this.grid-1, this.grid-1);

    this.ctx.fillStyle = 'green';
    this.snake.cells.forEach((cell, index) =>{
      this.ctx.fillRect(cell.x, cell.y, this.grid - 1, this.grid - 1);
      if (cell.x === this.apple.x && cell.y === this.apple.y) {
        this.snake.maxCells++;
        this.apple.x = this.getRandomInt(0, 25) * this.grid;
        this.apple.y = this.getRandomInt(0, 25) * this.grid;
      }
  });
    requestAnimationFrame(()=>this.loop());
  }

  fillCirlce(context,centerX,centerY,radius){
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
  }
}
