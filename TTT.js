import { engine } from "./Engine.js";

export class TTT extends engine {
  constructor() {
    super();
    this.initialize(3, 3);
  }
  board_additions() {
    const board = document.querySelector("#board");
    board.style.width = "255px";
    board.style.textAlign = "center";
    board.style.margin = "auto";
    board.style.color = "white";
    board.style.marginTop = "100px";
  }
  cell_additions() {
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.width = "80px";
      cells[i].style.height = "80px";
      cells[i].style.float = "left";
      cells[i].style.backgroundColor = "gray";
      cells[i].style.margin = "2px";
      cells[i].style.fontSize = "55px";
      cells[i].style.fontFamily = "cursive";
    }
  }
  input_take() {
    const input1 = prompt("Enter the input: 1a:3c");
    if(input1.length == 2) {
      let row = input1.charCodeAt(0) - 49;
      let col = input1.charCodeAt(1) - 97;
      let input = { r: -1, c: -1 };
      input.r = row;
      input.c = col;
      return input;
    }
    else {
      return false;
    } 
  }

  drawer(grid, flag = false) {
    if (flag === true) {
      this.create_board(3, 3);
      this.board_additions();
      this.cell_additions();
    }
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      const row = cells[i].dataset.row;
      const col = cells[i].dataset.col;
      cells[i].textContent = grid[row][col];
    }
  }

  input_validation(grid, input, turn) {
    if(input == false) {
      return false;
    }
    let valid;
    let row = input.r;
    let col = input.c;
    if (row > 2 || col > 2 || row < 0 || col < 0) {
      valid = false;
    } else {
      if (grid[row][col] != " ") {
        valid = false;
      } else {
        if (turn === 1) {
          grid[row][col] = "X";
        } else if (turn === 2) {
          grid[row][col] = "O";
        }
        valid = true;
      }
    }
    return valid;
  }

  controller(grid, input, turn) {
    let valid = this.input_validation(grid, input, turn);
    if (valid == true) {
      let output = {g: grid , s: true};
      return output;
    } else {
      alert("Invalid Input");
      let output = {g: grid , s: false};
      return output;
    }
  }
}
