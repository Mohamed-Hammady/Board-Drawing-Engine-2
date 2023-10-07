export class engine {
    // helping methods for the implementaion of the Engine itself.
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    initialize_grid(rows, cols) {
      const grid = new Array(rows);
      for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        for (let j = 0; j < rows; j++) {
          grid[i][j] = " ";
        }
      }
      return grid;
    }
    create_board(rows, cols) {
      const board = document.createElement("div");
      board.id = "board";
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.dataset.row = i;
          cell.dataset.col = j;
          board.appendChild(cell);
        }
      }
      document.body.appendChild(board);
      return board;
    }
    swap_turn(turn) {
      if (turn === 1) {
        turn = 2;
      } else if (turn === 2) {
        turn = 1;
      }
      return turn;
    }
    //////////////////////////////////////////////////////////////
    // Inherited methods
    async initialize(rows, cols) {
      let grid = this.initialize_grid(rows, cols);
      this.create_board(rows, cols);
      let turn = 1;
      let swap = false;
      let flag = true;
      this.drawer(grid, flag);
      await this.sleep(1000);
      const loop = async () => {
        if (swap == true) {
          turn = this.swap_turn(turn);
        }
        swap = this.controller(grid, this.input_take(), turn);
        await this.sleep(1000);
        loop(); // Call the function again to repeat the loop
      };
      loop(); // Call the function to start the loop
    }
    // // Abstract methods which is going to be Overriden
    drawer(grid) {
      throw new Error("Engine call");
    }
    controller(grid, input, turn) {
      throw new Error("Engine call");
    }
    cell_additions() {
      throw new Error("Engine call");
    }
    board_additions() {
      throw new Error("Engine call");
    }
    input_take() {
      throw new Error("Engine call");
    }
    input_validation(grid, input, turn) {
      throw new Error("Engine call");
    }
    /////////////////////////////////////////////////////////////////
  }
  