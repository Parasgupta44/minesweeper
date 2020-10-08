import React from "react";
import { CellState, CellValue } from "../../types";
import "./Button.scss";

interface ButtonProps {
  rIdx: number;
  cIdx: number;
  state: CellState;
  value: CellValue;
  blast?: boolean;
  onClick(rowP: number, colP: number): (...args: any[]) => void;
  onContext(rowP: number, colP: number): (...args: any[]) => void;
  // onClick(rowP: number, colP: number): (e: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  rIdx,
  cIdx,
  state,
  value,
  blast,
  onClick,
  onContext,
}) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      } else if (value === CellValue.none) {
        return null;
      }
      return value;
    } else if (state === CellState.flagged) {
      //siaplay
      return (
        <span role="img" aria-label="bomb">
          🏁
        </span>
      );
    }
    return null;
  };
  return (
    <div
      className={`Button ${
        state === CellState.visible ? "visible" : ""
      } value-${value} ${blast ? "blast" : ""}`}
      onClick={onClick(rIdx, cIdx)}
      onContextMenu={onContext(rIdx, cIdx)}
    >
      {renderContent()}
    </div>
  );
};

export default Button;
