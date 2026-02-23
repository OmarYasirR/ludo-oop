import "../style/PlayerZone.css";
import { GiChessPawn } from "react-icons/gi";

const PlayerZone = ({ player, rollDice, diceValue, tokenClick, isWaiting  }) => {
  const clr = player.color
  
  const colorClasses = {
  red: player.isActive ? `bg-red-500 pointer-events-auto cursor-pointer` : `bg-red-300 pointer-events-none`,
  blue: player.isActive ? `bg-blue-500 pointer-events-auto cursor-pointer` : `bg-blue-300 pointer-events-none`,
  green: player.isActive ? `bg-green-500 pointer-events-auto cursor-pointer` : `bg-green-300 pointer-events-none`,
  yellow: player.isActive ? `bg-yellow-500 pointer-events-auto cursor-pointer` : `bg-yellow-300 pointer-events-none`
}
  
  const diseClassHandler = () => {
    let clr = player.color
    const diseActivator = colorClasses[clr]
    switch (clr) {
      case "red":
        return `top-[-50px] left-0 ${ 
          diseActivator
        } `;
      case "green":
        return `top-[-50px] right-0 ${
          diseActivator
        }`;
      case "blue":
        return `bottom-[-50px] left-0 ${
          diseActivator
        } `;
      default:
        return `bottom-[-50px] right-0 ${
          diseActivator
        } `;
    }
  };

  const borderRudioHandler = () => {
    switch (player.color) {
      case "red":
        return "rounded-tl-md";
      case "green":
        return "rounded-tr-md";
      case "blue":
        return "rounded-bl-md";
      default:
        return "rounded-br-md";
    }
  };
  const TokenColorizer = {
    red: "text-red-700",
    green: "text-green-700",
    blue: "text-blue-700",
    yellow: "text-yellow-700"
  }
  
  return (
    <div
      className={`grid grid-cols-2 p-2 items-center justify-center basis-[40%] border border-black bg-${clr}-500 relative ${borderRudioHandler()}`}
    >
      <button
        onClick={rollDice}
        disabled={isWaiting}
        className={`flex justify-center items-center text-white size-11 rounded-md border absolute ${diseClassHandler()}`}
      >
        {player.isActive ? diceValue : ""}
      </button>
      {player.tokens.map((token, i) => (
        <div
          className={`pwanParent ${clr} rounded-full bg-white size-9 sm:size-16 flex items-center justify-center m-auto ${clr}`}
          key={i}
        >
          <span
            onClick={() => tokenClick(i)}
            className={`pwan ${clr} flex justify-center items-center text-2xl shadow-xl ease-in-out duration-75 pointer-events-none rounded-full z-10 p-[1px] m-[-8px] ${
              token.canMove ? "canMove" : ""
            }`}
            position="home"
            id={`${clr}-${i}`}
          >
            <GiChessPawn
              className={`text-2xl ${TokenColorizer[clr]}`}
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default PlayerZone;
