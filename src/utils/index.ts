import { MAX_COLS, MAX_ROWS, NO_OF_BOMBS } from "../constants";
import { Cell, CellValue, CellState } from "../types";

const grabAdjacentCells = (
  cells: Cell[][],
  rIdx: number,
  cIdx: number
): {
  topLeftBomb: Cell | null;
  topBomb: Cell | null;
  topRightBomb: Cell | null;
  leftBomb: Cell | null;
  rightBomb: Cell | null;
  bottomLeftBomb: Cell | null;
  bottomBomb: Cell | null;
  bottomRightBomb: Cell | null;
} => {
  const topLeftBomb = rIdx > 0 && cIdx > 0 ? cells[rIdx - 1][cIdx - 1] : null;
  const topBomb = rIdx > 0 ? cells[rIdx - 1][cIdx] : null;
  const topRightBomb =
    rIdx > 0 && cIdx < MAX_COLS - 1 ? cells[rIdx - 1][cIdx + 1] : null;
  const leftBomb = cIdx > 0 ? cells[rIdx][cIdx - 1] : null;
  const rightBomb = cIdx < MAX_COLS - 1 ? cells[rIdx][cIdx + 1] : null;
  const bottomLeftBomb =
    rIdx < MAX_ROWS - 1 && cIdx > 0 ? cells[rIdx + 1][cIdx - 1] : null;
  const bottomBomb = rIdx < MAX_ROWS - 1 ? cells[rIdx + 1][cIdx] : null;
  const bottomRightBomb =
    rIdx < MAX_ROWS - 1 && cIdx < MAX_COLS - 1
      ? cells[rIdx + 1][cIdx + 1]
      : null;

  return {
    topLeftBomb,
    topBomb,
    topRightBomb,
    leftBomb,
    rightBomb,
    bottomLeftBomb,
    bottomBomb,
    bottomRightBomb,
  };
};
export const generateCells = (): Cell[][] => {
  let cells: Cell[][] = [];

  // gen all cells
  for (let r = 0; r < MAX_ROWS; ++r) {
    cells.push([]);
    for (let c = 0; c < MAX_COLS; ++c) {
      cells[r].push({
        // value:-1,0
        value: CellValue.none,
        state: CellState.open,
        // state: CellState.visible,checkf for styling
      });
    }
  }

  // putting some bombs
  let bombsPlaced = 0;
  while (bombsPlaced < NO_OF_BOMBS) {
    const r = Math.floor(Math.random() * MAX_ROWS);
    const c = Math.floor(Math.random() * MAX_COLS);
    const currentCell = cells[r][c];
    if (currentCell.value === CellValue.bomb) {
      continue;
    } else {
      cells = cells.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          if (r === rIdx && c === cIdx) {
            return {
              ...cell,
              value: CellValue.bomb,
            };
          }
          return cell;
        })
      );
      bombsPlaced++;
    }
  }

  // check nighbourcells
  for (let rIdx = 0; rIdx < MAX_ROWS; ++rIdx) {
    for (let cIdx = 0; cIdx < MAX_COLS; ++cIdx) {
      const curr = cells[rIdx][cIdx];
      if (curr.value === CellValue.bomb) {
        continue;
      }
      let bombs = 0;
      // const topLeftBomb =
      //   rIdx > 0 && cIdx > 0 ? cells[rIdx - 1][cIdx - 1] : null;
      // const topBomb = rIdx > 0 ? cells[rIdx - 1][cIdx] : null;
      // const topRightBomb =
      //   rIdx > 0 && cIdx < MAX_COLS - 1 ? cells[rIdx - 1][cIdx + 1] : null;
      // const leftBomb = cIdx > 0 ? cells[rIdx][cIdx - 1] : null;
      // const rightBomb = cIdx < MAX_COLS - 1 ? cells[rIdx][cIdx + 1] : null;
      // const bottomLeftBomb =
      //   rIdx < MAX_ROWS - 1 && cIdx > 0 ? cells[rIdx + 1][cIdx - 1] : null;
      // const bottomBomb = rIdx < MAX_ROWS - 1 ? cells[rIdx + 1][cIdx] : null;
      // const bottomRightBomb =
      //   rIdx < MAX_ROWS - 1 && cIdx < MAX_COLS - 1
      //     ? cells[rIdx + 1][cIdx + 1]
      //     : null;
      const {
        topLeftBomb,
        topBomb,
        topRightBomb,
        leftBomb,
        rightBomb,
        bottomLeftBomb,
        bottomBomb,
        bottomRightBomb,
      } = grabAdjacentCells(cells, rIdx, cIdx);

      if (topLeftBomb?.value === CellValue.bomb) {
        ++bombs;
      }
      if (topBomb?.value === CellValue.bomb) {
        ++bombs;
      }
      if (topRightBomb?.value === CellValue.bomb) {
        ++bombs;
      }
      if (leftBomb?.value === CellValue.bomb) {
        ++bombs;
      }
      if (rightBomb?.value === CellValue.bomb) {
        ++bombs;
      }
      if (bottomLeftBomb?.value === CellValue.bomb) {
        ++bombs;
      }
      if (bottomBomb?.value === CellValue.bomb) {
        ++bombs;
      }
      if (bottomRightBomb?.value === CellValue.bomb) {
        ++bombs;
      }
      if (bombs > 0) {
        cells[rIdx][cIdx] = {
          ...curr,
          value: bombs,
        };
      }
    }
  }

  return cells;
};

export const openCellsRecurse = (
  cells: Cell[][],
  rowP: number,
  colP: number
): Cell[][] => {
  const curr = cells[rowP][colP];
  if (curr.state === CellState.visible || curr.state === CellState.flagged) {
    return cells;
  }
  let newCells = cells.slice();
  newCells[rowP][colP].state = CellState.visible;
  const {
    topLeftBomb,
    topBomb,
    topRightBomb,
    leftBomb,
    rightBomb,
    bottomLeftBomb,
    bottomBomb,
    bottomRightBomb,
  } = grabAdjacentCells(cells, rowP, colP);

  if (
    topLeftBomb?.state === CellState.open &&
    topLeftBomb.value !== CellValue.bomb
  ) {
    if (topLeftBomb.value === CellValue.none) {
      newCells = openCellsRecurse(newCells, rowP - 1, colP - 1);
    } else {
      newCells[rowP - 1][colP - 1].state = CellState.visible;
    }
  }
  if (topBomb?.state === CellState.open && topBomb.value !== CellValue.bomb) {
    if (topBomb.value === CellValue.none) {
      newCells = openCellsRecurse(newCells, rowP - 1, colP);
    } else {
      newCells[rowP - 1][colP].state = CellState.visible;
    }
  }
  if (
    topRightBomb?.state === CellState.open &&
    topRightBomb.value !== CellValue.bomb
  ) {
    if (topRightBomb.value === CellValue.none) {
      newCells = openCellsRecurse(newCells, rowP - 1, colP + 1);
    } else {
      newCells[rowP - 1][colP + 1].state = CellState.visible;
    }
  }
  if (leftBomb?.state === CellState.open && leftBomb.value !== CellValue.bomb) {
    if (leftBomb.value === CellValue.none) {
      newCells = openCellsRecurse(newCells, rowP, colP - 1);
    } else {
      newCells[rowP][colP - 1].state = CellState.visible;
    }
  }
  if (
    rightBomb?.state === CellState.open &&
    rightBomb.value !== CellValue.bomb
  ) {
    if (rightBomb.value === CellValue.none) {
      newCells = openCellsRecurse(newCells, rowP, colP + 1);
    } else {
      newCells[rowP][colP + 1].state = CellState.visible;
    }
  }
  if (
    bottomLeftBomb?.state === CellState.open &&
    bottomLeftBomb.value !== CellValue.bomb
  ) {
    if (bottomLeftBomb.value === CellValue.none) {
      newCells = openCellsRecurse(newCells, rowP + 1, colP - 1);
    } else {
      newCells[rowP + 1][colP - 1].state = CellState.visible;
    }
  }
  if (
    bottomBomb?.state === CellState.open &&
    bottomBomb.value !== CellValue.bomb
  ) {
    if (bottomBomb.value === CellValue.none) {
      newCells = openCellsRecurse(newCells, rowP + 1, colP);
    } else {
      newCells[rowP + 1][colP].state = CellState.visible;
    }
  }
  if (
    bottomRightBomb?.state === CellState.open &&
    bottomRightBomb.value !== CellValue.bomb
  ) {
    if (bottomRightBomb.value === CellValue.none) {
      newCells = openCellsRecurse(newCells, rowP + 1, colP + 1);
    } else {
      newCells[rowP + 1][colP + 1].state = CellState.visible;
    }
  }
  return newCells;
};
