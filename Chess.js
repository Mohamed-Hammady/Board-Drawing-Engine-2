import { engine } from "./Engine.js";

export class Chess extends engine {
  constructor() {
    super();
    this.initialize(10, 10);
  }
  board_additions() {
    const board = document.querySelector("#board");
    board.style.width = "620px";
    board.style.textAlign = "center";
    board.style.margin = "auto";
    board.style.marginTop = "100px";
  }
  cell_additions(grid) {
    var rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    var colLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const cells = document.querySelectorAll(".cell");
    let index = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        cells[index].style.width = "62px";
        cells[index].style.height = "62px";
        cells[index].style.float = "left";
        cells[index].style.fontSize = "50px";
        if (i == 0 || i == 9) {
          if (j > 0) {
            cells[index].textContent = colLetters[j - 1];
            grid[i][j] = colLetters[j - 1];
          }
          cells[index].style.backgroundColor = "brown";
          cells[index].style.border = "0px";
        } else {
          if (j == 0 || j == 9) {
            if (i > 0) {
              cells[index].textContent = rowNumbers[i - 1];
              grid[i][j] = rowNumbers[i - 1];
            }
            cells[index].style.backgroundColor = "brown";
            cells[index].style.border = "0px";
          } else {
            //black
            if (i == 2) {
              //pawn
              cells[index].textContent = String.fromCharCode(9823);
              grid[i][j] = 9823;
            }
            if (i == 1) {
              if (j == 1 || j == 8) {
                //Rooks
                cells[index].textContent = String.fromCharCode(9820);
                grid[i][j] = 9820;
              }
              if (j == 2 || j == 7) {
                //Knights
                cells[index].textContent = String.fromCharCode(9822);
                grid[i][j] = 9822;
              }
              if (j == 3 || j == 6) {
                //Bishops
                cells[index].textContent = String.fromCharCode(9821);
                grid[i][j] = 9821;
              }
              if (j == 4) {
                //Queen
                cells[index].textContent = String.fromCharCode(9819);
                grid[i][j] = 9819;
              }
              if (j == 5) {
                //King
                cells[index].textContent = String.fromCharCode(9818);
                grid[i][j] = 9818;
              }
            }
            //white
            if (i == 7) {
              cells[index].textContent = String.fromCharCode(9817);
              grid[i][j] = 9817;
            }
            if (i == 8) {
              if (j == 1 || j == 8) {
                //Rooks
                cells[index].textContent = String.fromCharCode(9814);
                grid[i][j] = 9814;
              }
              if (j == 2 || j == 7) {
                //Knights
                cells[index].textContent = String.fromCharCode(9816);
                grid[i][j] = 9816;
              }
              if (j == 3 || j == 6) {
                //Bishops
                cells[index].textContent = String.fromCharCode(9815);
                grid[i][j] = 9815;
              }
              if (j == 4) {
                //Queen
                cells[index].textContent = String.fromCharCode(9813);
                grid[i][j] = 9813;
              }
              if (j == 5) {
                //King
                cells[index].textContent = String.fromCharCode(9812);
                grid[i][j] = 9812;
              }
            }
            if ((i + j) % 2 == 1) {
              cells[index].style.backgroundColor = "grey";
            } else {
              cells[index].style.backgroundColor = "white";
            }
          }
        }
        index += 1;
      }
    }
  }
  input_take() {
    let input1 = prompt("Enter the initail position: 7a");
    let row_i = input1.charCodeAt(0) - 48;
    let col_i = input1.charCodeAt(1) - 96;
    let input2 = prompt("Enter the final position: 6a");
    if(input1.length == 2 && input2.length == 2) {
      let row_f = input2.charCodeAt(0) - 48;
      let col_f = input2.charCodeAt(1) - 96;
      let input = { r_i: -1, c_i: -1, r_f: -1, c_f: -1 };
      input.r_i = row_i;
      input.c_i = col_i;
      input.r_f = row_f;
      input.c_f = col_f;
      return input;
    }
    else {
      return false;
    }
  }
  drawer(grid, flag = false) {
    if (flag === true) {
      this.create_board(10,10);
      this.board_additions();
      this.cell_additions(grid);
    }
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      const row = parseInt(cells[i].dataset.row);
      const col = parseInt(cells[i].dataset.col);
      if (grid[row][col] == " ") {
        cells[i].textContent = grid[row][col];
      } else if (grid[row][col] > 900) {
        cells[i].textContent = String.fromCharCode(grid[row][col]);
      } else {
        cells[i].textContent = grid[row][col];
      }
    }
  }
  validateMove(grid, row_i, col_i, row_f, col_f) {
    let clearPath = true;
    //move horiznotal
    if (row_f - row_i === 0) {
      if (col_f > col_i) {
        for (let j = col_i + 1; j < col_f; j++) {
          if (grid[row_f][j] !== " ") {
            clearPath = false;
            break;
          }
        }
      } else {
        for (let j = col_f + 1; j < col_i; j++) {
          if (grid[row_f][j] !== " ") {
            clearPath = false;
            break;
          }
        }
      }
    }
    // move vertical
    else if (col_f - col_i === 0) {
      //move down
      if (row_f > row_i) {
        for (let i = row_i + 1; i < row_f; i++) {
          if (grid[i][col_f] !== " ") {
            clearPath = false;
            break;
          }
        }
      }
      //move up
      else {
        for (let i = row_f + 1; i < row_i; i++) {
          if (grid[i][col_f] !== " ") {
            clearPath = false;
            break;
          }
        }
      }
    }
    return clearPath;
  }
  validateMoveDiagonally(grid, row_i, col_i, row_f, col_f) {
    let boo = true;
    //move down right
    if (row_f > row_i && col_f > col_i) {
      for (let i = row_i + 1, j = col_i + 1; i < row_f; i++, j++) {
        if (grid[i][j] !== " ") {
          boo = false;
          break;
        }
      }
    }
    //move down left
    else if (row_f > row_i && col_f < col_i) {
      for (let i = row_i + 1, j = col_i - 1; i < row_f; i++, j--) {
        if (grid[i][j] !== " ") {
          boo = false;
          break;
        }
      }
    }
    //move up right
    else if (row_f < row_i && col_f > col_i) {
      for (let i = row_i - 1, j = col_i + 1; j < col_f; i--, j++) {
        if (grid[i][j] !== " ") {
          boo = false;
          break;
        }
      }
    }
    //move up left
    else {
      for (let i = row_f + 1, j = col_f + 1; j < col_i; i++, j++) {
        if (grid[i][j] !== " ") {
          boo = false;
          break;
        }
      }
    }
    return boo;
  }
  input_validation(grid, input, turn) {
    if(input == false) {
      return false;
    }
    let row_i = input.r_i;
    let col_i = input.c_i;
    let row_f = input.r_f;
    let col_f = input.c_f;
    let valid;
    let clearPath = false,
      piece = 0;
    if(row_i < 1 || row_i > 8 || col_i < 1 || col_i > 8 || row_f < 1 || row_f > 8 || col_f < 1 || col_f > 8) {
      valid = false;
      return valid;
    }
    else if (grid[row_i][col_i] == " ") {
      valid = false;
    } else {
      if (turn == 1) {
        //white turn
        if (
          grid[row_f][col_f] == 9813 ||
          grid[row_f][col_f] == 9814 ||
          grid[row_f][col_f] == 9815 ||
          grid[row_f][col_f] == 9816 ||
          grid[row_f][col_f] == 9817 ||
          grid[row_f][col_f] == 9812
        ) {
          valid = false;
          return valid;
        }
        if (
          grid[row_i][col_i] < 9812 ||
          grid[row_i][col_i] > 9817
        ) {
          valid = false;
          return valid;
        } else {
          switch (grid[row_i][col_i]) {
            case 9817: //pawn
              if (row_f == row_i - 1) {
                if (col_i == col_f) {
                  if (grid[row_f][col_f] == " ") {
                    clearPath = true;
                  }
                } else if (col_i - col_f == 1 && grid[row_f][col_f] != " ") {
                  clearPath = true;
                } else if (col_f - col_i == 1 && grid[row_f][col_f] != " ") {
                  clearPath = true;
                }
              } else if (row_f == row_i - 2 && col_i == col_f) {
                if (
                  grid[row_f][col_f] == " " &&
                  grid[row_i - 1][col_i] == " "
                ) {
                  if (row_i == 7) {
                    clearPath = true;
                  }
                }
              }
              if (clearPath) {
                piece = 9817;
              }
              break;
            case 9812: //King
              if (
                Math.abs(row_f - row_i) > 1 ||
                Math.abs(col_f - col_i) > 1 ||
                (row_f - row_i == 0 && col_f - col_i == 0)
              ) {
                valid = false;
                return valid;
              } else {
                clearPath = true;
                piece = 9812;
              }
              break;
            case 9813: //Queen
              if (row_f - row_i == 0 || col_f - col_i == 0) {
                clearPath = this.validateMove(grid ,row_i, col_i, row_f, col_f);
              } else if (Math.abs(row_f - row_i) === Math.abs(col_f - col_i)) {
                clearPath = this.validateMoveDiagonally(
                  grid,
                  row_i,
                  col_i,
                  row_f,
                  col_f
                );
              }
              piece = 9813;
              break;
            case 9814: //ٌRooks
              if (
                Math.abs(row_f - row_i) == 0 ||
                Math.abs(col_f - col_i) == 0
              ) {
                clearPath = this.validateMove(grid ,row_i, col_i, row_f, col_f);
              }
              piece = 9814;
              break;
            case 9815: //bishops
              if (Math.abs(row_f - row_i) === Math.abs(col_f - col_i)) {
                clearPath = this.validateMoveDiagonally(
                  grid,
                  row_i,
                  col_i,
                  row_f,
                  col_f
                );
              }
              piece = 9815;
              break;
            case 9816: //Knights
              if (
                (Math.abs(col_f - col_i) == 1 &&
                  Math.abs(row_f - row_i) == 2) ||
                (Math.abs(row_f - row_i) == 1 && Math.abs(col_f - col_i) == 2)
              ) {
                clearPath = true;
              }
              piece = 9816;
              break;
          }
          if (clearPath) {
            grid[row_f][col_f] = piece;
            grid[row_i][col_i] = " ";
          } else {
            valid = false;
            return valid;
          }
        }
        valid = true;
      } else {
        //black turn
        if (
          grid[row_f][col_f] == 9818 ||
          grid[row_f][col_f] == 9819 ||
          grid[row_f][col_f] == 9820 ||
          grid[row_f][col_f] == 9821 ||
          grid[row_f][col_f] == 9822 ||
          grid[row_f][col_f] == 9823
        ) {
          valid = false;
          return valid;
        }
        if (
          grid[row_i][col_i] < 9818 ||
          grid[row_i][col_i] > 9823 
        ) {
          valid = false;
          return valid;
        } else {
          switch (grid[row_i][col_i]) {
            case 9823: //pawn
              if (row_f == row_i + 1) {
                if (col_i == col_f) {
                  if (grid[row_f][col_f] == " ") {
                    clearPath = true;
                  }
                } else if (col_i - col_f == 1 && grid[row_f][col_f] != " ") {
                  clearPath = true;
                } else if (col_f - col_i == 1 && grid[row_f][col_f] != " ") {
                  clearPath = true;
                }
              } else if (row_f == row_i + 2 && col_i == col_f) {
                if (
                  grid[row_f][col_f] == " " &&
                  grid[row_i + 1][col_i] == " "
                ) {
                  if (row_i == 2) {
                    clearPath = true;
                  }
                }
              }
              if (clearPath) {
                piece = 9823;
              }
              break;
            case 9818: //King
              if (
                Math.abs(row_f - row_i) > 1 ||
                Math.abs(col_f - col_i) > 1 ||
                (row_f - row_i == 0 && col_f - col_i == 0)
              ) {
                valid = false;
                return valid;
              } else {
                clearPath = true;
                piece = 9818;
              }
              break;
            case 9819: //Queen
              if (row_f - row_i == 0 || col_f - col_i == 0) {
                clearPath = this.validateMove(grid ,row_i, col_i, row_f, col_f);
              } else if (Math.abs(row_f - row_i) === Math.abs(col_f - col_i)) {
                clearPath = this.validateMoveDiagonally(
                  grid,
                  row_i,
                  col_i,
                  row_f,
                  col_f
                );
              }
              piece = 9819;
              break;
            case 9820: //ٌRooks
              clearPath = this.validateMove(grid ,row_i, col_i, row_f, col_f);
              piece = 9820;
              break;
            case 9821: //bishops
              if (Math.abs(row_f - row_i) === Math.abs(col_f - col_i)) {
                clearPath = this.validateMoveDiagonally(
                  grid,
                  row_i,
                  col_i,
                  row_f,
                  col_f
                );
              }
              piece = 9821;
              break;
            case 9822: //Knights
              if (
                (Math.abs(col_f - col_i) == 1 &&
                  Math.abs(row_f - row_i) == 2) ||
                (Math.abs(row_f - row_i) == 1 && Math.abs(col_f - col_i) == 2)
              ) {
                clearPath = true;
              }
              piece = 9822;
              break;
          }
          if (clearPath) {
            grid[row_f][col_f] = piece;
            grid[row_i][col_i] = " ";
          } else {
            valid = false;
            return valid;
          }
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
