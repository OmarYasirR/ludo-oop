import { useEffect } from "react";
import { useLudo } from "../Context/LudoContext";
import { MovmentHandler } from "../lib/MovmentHandler";
import "../style/dise.css";
import { useMove } from "../Hooks/useMove";

export const Dise = ({ color, order }) => {
  const {
    active,
    diceValue,
    tokens,
    path,
    isRolled,
    tknsInHome,
    tknsInCell,
    dispatch,
    AlltknsParents
  } = useLudo();
  
  
  
  return (
    <div
      className={`bg-${color}-500 ${color} dise ${order === active && "active"} ${
        isRolled && active === order && "isClicked"
      }`}
    >
      {order === active ? diceValue : ""}
    </div>
  );
};
