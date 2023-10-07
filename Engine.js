export class engine {
  // Inherited methods
  async initialize(rows, cols) {
    // Initalizing the grid.
    let grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
      for (let j = 0; j < rows; j++) {
        grid[i][j] = " ";
      }
    }
    let turn = 1;
    let flag = true;
    let output = {g: grid , s: false};
    this.drawer(grid, flag);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const loop = async () => {
      if (output.s == true) {
        if (turn === 1) {
          turn = 2;
        } else if (turn === 2) {
          turn = 1;
        }
      }
      output = this.controller(grid, this.input_take(), turn);
      this.drawer(output.g);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      loop(); // Call the function again to repeat the loop
    };
    loop(); // Call the function to start the loop
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
  }
  // // Abstract methods which are going to be Overriden
  drawer(grid, flag = false) {
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
