import PlayerZone from "./PlayerZone";
import "../style/LudoBoard.css";
import Cells from "./Cells";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import pathsClasess from "../Utility/pathsClasess.json";
import { Game } from "../Models/Game";

const LudoBoard = () => {
  const ludoRef = useRef(null);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [game, ] = useState(new Game(forceUpdate))
  // const gameRef = useRef(new Game(forceUpdate));
  
  const handleRollDice = useCallback(() => {
    game.rollDice()
  }, []);

  const gameElementsExtractor = (gameCont) => {
    const allCells = Array.from(gameCont.querySelectorAll(".path-cell"));
    const tokensElements = Array.from(gameCont.querySelectorAll(`.pwan`));
    const pwanParentElements = Array.from(
      gameCont.querySelectorAll(`.pwanParent`)
    );
    const HomesElements = Array.from(gameCont.querySelectorAll(".triangle"));

    const gameData = pathsClasess.map((P) => {
      const path = P.path
        .map((clas) => allCells.find((cell) => cell.classList.contains(clas)))
        .filter(Boolean);
      const tokens = tokensElements.filter((t) => t.classList[1] === P.color);
      const tokensParents = pwanParentElements.filter(
        (t) => t.classList[1] === P.color
      );
      const tokensHome = HomesElements.find((t) => t.classList[1] === P.color)
        .children[0];

      return {
        path,
        tokens,
        tokensParents,
        tokensHome,
      };
    });
    return gameData;
  }

  //Extract game elements from DOM
  useEffect(() => {
    if (!ludoRef.current) return;
    const gameElements = gameElementsExtractor(ludoRef.current);
    game.addElements(gameElements);
    forceUpdate()
  }, []);

  return (
    <div className="flex flex-col flex-1 p-2" ref={ludoRef}>
      <div className="flex w-full">
        <PlayerZone
          player={game.players[0]}
          rollDice={handleRollDice}
          diceValue={game.dice.value}
          tokenClick={game.tokenClick.bind(game)}
          isWaiting={game.gameState !== 'waiting'}
        />
        <Cells position={"top"} color={"green"} />
        <PlayerZone
          player={game.players[1]}
          rollDice={handleRollDice}
          diceValue={game.dice.value}
          tokenClick={game.tokenClick.bind(game)}
          isWaiting={game.gameState !== 'waiting'}
        />
      </div>
      <div className="flex w-full">
        <Cells position={"left"} color={"red"} />
        <div className="basis-[20%] relative border-gray-950 border">
          <div class="triangle red bg-red-500">
            <div className=" h-full w-full flex flex-col self-center items-start justify-center"></div>
          </div>
          <div class="triangle blue bg-blue-500">
            <div className=" h-full w-full flex self-center items-end justify-center"></div>
          </div>
          <div class="triangle green bg-green-500">
            <div className=" h-full w-full flex self-center items-start justify-center"></div>
          </div>
          <div class="triangle yellow bg-yellow-500">
            <div className=" h-full w-full flex flex-col self-center items-end justify-center"></div>
          </div>
        </div>
        <Cells position={"right"} color={"yellow"} />
      </div>
      <div className="flex w-full">
        <PlayerZone
          player={game.players[2]}
          rollDice={handleRollDice}
          diceValue={game.dice.value}
          tokenClick={game.tokenClick.bind(game)}
          isWaiting={game.gameState !== 'waiting'}
        />
        <Cells position={"bottom"} color={"blue"} />
        <PlayerZone
          player={game.players[3]}
          rollDice={handleRollDice}
          diceValue={game.dice.value}
          tokenClick={game.tokenClick.bind(game)}
          isWaiting={game.gameState !== 'waiting'}
        />
      </div>
    </div>
  );
};

export default LudoBoard;
