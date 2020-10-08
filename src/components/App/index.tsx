import React, { useState, useEffect } from "react";

import NumberDisplay from "../NumberDisplay";
import "./App.scss";
import Button from "../Button";
import { generateCells, openCellsRecurse } from "../../utils";
import { Cell, CellState, CellValue, Face } from "../../types";
import { MAX_COLS, MAX_ROWS } from "../../constants";

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCount, setBombCount] = useState<number>(12);
  const [lost, setLost] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [playMsg, setPlayMsg] = useState<string>("Play it already...");
  const [instructions, setInstructions] = useState<string>("Instructions");

  useEffect(() => {
    const handMouseDown = (): void => {
      setFace(Face.damn);
    };
    const handMouseUp = (): void => {
      setFace(Face.smile);
    };
    window.addEventListener("mousedown", handMouseDown);
    window.addEventListener("mouseup", handMouseUp);
    return () => {
      window.removeEventListener("mousedown", handMouseDown);
      window.removeEventListener("mouseup", handMouseUp);
    };
  }, []);
  useEffect(() => {
    if (live && time < 500) {
      const timer = setInterval(() => setTime(time + 1), 1000);
      return () => {
        clearInterval(timer);
      };
    } else if (time >= 500) {
      alert("Frickkity fuck, time over (500 sec) !!");
      setPlayMsg("Fuck..Time over..Restart !!");
      setInstructions("");
      setLive(false);
      setTime(0);
      setCells(generateCells());
      setLost(false);
      setBombCount(12);
      setWon(false);
    }
  }, [live, time]);

  useEffect(() => {
    if (lost) {
      setLive(false);
      setFace(Face.lost);
      setPlayMsg("Frickkity Fuck..lost!!");
      setInstructions("");
      // alert("Frickkity fuck, bombed!!");
    }
  }, [lost]);
  useEffect(() => {
    if (won) {
      setLive(false);
      setFace(Face.won);
      setPlayMsg("Frick Frick Frickitty Fuck, you won!!");
      setInstructions("");
    }
  }, [won]);

  const cellClick = (rowP: number, colP: number) => (): void => {
    // console.log(rowP, colP);
    let newCells = cells.slice();
    if (!live) {
      let shitItsBomb = newCells[rowP][colP].value === CellValue.bomb;
      while (shitItsBomb) {
        newCells = generateCells();
        if (newCells[rowP][colP].value !== CellValue.bomb) {
          shitItsBomb = false;
          break;
        }
      }

      setLive(true);
    }

    const curr = newCells[rowP][colP];

    if ([CellState.flagged, CellState.visible].includes(curr.state)) {
      return;
    }
    // if (curr.state === CellState.flagged || CellState.visible) {
    //   return;
    // }
    if (curr.value === CellValue.bomb) {
      //if bomb clicked
      setLost(true);
      newCells[rowP][colP].blast = true;
      newCells = showBombsOnLose();
      setCells(newCells);
      return;
    } else if (curr.value === CellValue.none) {
      // recurse
      newCells = openCellsRecurse(newCells, rowP, colP);
    } else {
      newCells[rowP][colP].state = CellState.visible;
    }
    // Check for win condition
    let openedCellsSafe = false;
    for (let r = 0; r < MAX_ROWS; ++r) {
      for (let c = 0; c < MAX_COLS; ++c) {
        const curr = newCells[r][c];
        if (curr.value !== CellValue.bomb && curr.state === CellState.open) {
          openedCellsSafe = true;
          break;
        }
      }
    }
    if (!openedCellsSafe) {
      newCells = newCells.map((row) =>
        row.map((cell) => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged,
            };
          }
          return cell;
        })
      );
      setWon(true);
    }
    setCells(newCells);
  };
  const cellContext = (rowP: number, colP: number) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    // console.log(rowP, colP);
    e.preventDefault();
    if (!live) {
      return;
    }
    const currCells = cells.slice();
    const curr = cells[rowP][colP];
    if (curr.state === CellState.visible) {
      return;
    } else if (curr.state === CellState.open) {
      currCells[rowP][colP].state = CellState.flagged;
      setCells(currCells);
      setBombCount(bombCount - 1);
    } else if (curr.state === CellState.flagged) {
      // if (bombCount >= 12) {
      //   return;
      // }
      currCells[rowP][colP].state = CellState.open;
      setCells(currCells);
      setBombCount(bombCount + 1);
    }
  };

  const faceClick = (): void => {
    setLive(false);
    setTime(0);
    setCells(generateCells());
    setLost(false);
    setBombCount(12);
    setWon(false);
    setPlayMsg("Play it already...");
    setInstructions("Instructions");
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rIdx) =>
      row.map((cell, cIdx) => (
        <Button
          key={`${rIdx}-${cIdx}`}
          onClick={cellClick}
          onContext={cellContext}
          blast={cell.blast}
          state={cell.state}
          value={cell.value}
          rIdx={rIdx}
          cIdx={cIdx}
        />
      ))
    );
  };

  const showBombsOnLose = (): Cell[][] => {
    const currCells = cells.slice();
    return currCells.map((row) =>
      row.map((cell) => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.visible,
          };
        }
        return cell;
      })
    );
  };

  return (
    <div className="App">
      <h3 className="headings">
        {playMsg}
        <a
          href="http://minesweeperonline.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {instructions}
        </a>
      </h3>
      <div className="Header">
        <NumberDisplay value={bombCount} />
        <div className="Face" onClick={faceClick}>
          <span role="img" aria-label="face">
            {face}
          </span>
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
