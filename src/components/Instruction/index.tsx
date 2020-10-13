import React from "react";

import "./Instruction.scss";

interface Props {}

const Instruction: React.FC<Props> = () => {
  return (
    <div className="myCard">
      <h4 className="centerIt" style={{ paddingLeft: "1.7rem" }}>
        Instructions
      </h4>
      <ul style={{ justifyContent: "center" }}>
        <li className="centerIt">12 bombs in this version.</li>
        <li className="centerIt">Left click to open a cell.</li>
        <li className="centerIt">Right click to flag the cell for a bomb.</li>
        <li className="centerIt">
          If bomb found, just restart by pressing{" "}
          <span role="img" aria-label="face">
            🤐
          </span>
        </li>
        <li className="centerIt">The face emoji is for start / reset.</li>
        <li className="centerIt">
          <a
            href="http://minesweeperonline.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Similar game for refernce
          </a>
        </li>
        <li className="centerIt">
          <a href="/">Back to the game..</a>
        </li>
      </ul>
    </div>
  );
};

export default Instruction;
