# Ludo Game - React with OOP Architecture

A modern, fully functional Ludo board game built with React and TailwindCSS, leveraging Object-Oriented Programming (OOP) principles for clean, maintainable game logic. This project demonstrates how to model complex game rules using classes, encapsulation, and state management without relying on heavy external libraries.

## Features

-   Classic 4‑player Ludo (Red, Green, Blue, Yellow)
    
-   Realistic dice rolling with automatic turn management
    
-   Token movement with animation (step‑by‑step)
    
-   Safe squares and capture mechanics
    
-   Automatic token exit on rolling a 6 (if all tokens are at home)
    
-   Turn‑based gameplay with visual feedback
    
-   Responsive design – works on desktop and mobile
    
-   Pure OOP game engine – easily testable and extendable
    

## Technologies

-   React 18 – UI components and hooks
    
-   Vite – fast build tool and development server
    
-   TailwindCSS – utility‑first styling
    
-   JavaScript (ES6+) – core language
    
-   OOP – `Game`, `Player`, `Token`, `Dice` classes encapsulate all game logic
    

## Project Structure

text

src/
├── components/          # React components
│   ├── LudoBoard.jsx    # Main board layout, initialises Game
│   ├── PlayerZone.jsx   # Player area (tokens, dice button)
│   ├── Cells.jsx        # Renders path cells for each side
│   └── Dise.jsx         # (Legacy – not used in current implementation)
├── models/              # OOP game classes
│   ├── Game.js          # Orchestrates players, dice, turns, capture logic
│   ├── Player.js        # Player state (tokens, activity, win condition)
│   ├── Token.js         # Token position, movement, reset animation
│   └── Dice.js          # Dice rolling with value and six detection
├── styles/              # Component‑specific CSS (minimal, Tailwind preferred)
│   ├── LudoBoard.css
│   ├── PlayerZone.css
│   └── dise.css
├── utility/             # Static data
│   └── pathsClasess.json # Predefined cell order for each colour's path
├── App.js               # Root component
├── main.jsx             # Entry point
└── index.css            # Tailwind imports

## Object‑Oriented Design

The game logic is completely separated from the UI using four main classes:

### 1. `Game` (Orchestrator)

-   Manages the array of `Player` objects, current turn, dice instance, and game state (`waiting`, `rolling`, `moving`, `finished`).
    
-   Provides methods:
    
    -   `rollDice()` – triggers dice roll and automatically updates token movability.
        
    -   `tokenClick(id)` – handles player clicking a token (either to exit home or move).
        
    -   `moveToken(tokenId, steps)` – animates token movement step‑by‑step.
        
    -   `checkForCaptures()` – determines if a moved token lands on an opponent’s token.
        
    -   `nextTurn()` – passes control to the next player after a non‑six roll.
        
-   Uses a callback `onUpdate` (provided by the React component) to trigger UI re‑renders after state changes.
    

### 2. `Player`

-   Holds player‑specific data: `id`, `name`, `color`, `tokens[]`, `isActive`, `tokensInHome`, `tokensFinished`.
    
-   Methods:
    
    -   `canMove()` – checks if any token is movable.
        
    -   `getAvailableTokens()` – returns tokens with `canMove === true`.
        
    -   `resetTurn()` – clears temporary flags like `hasRolledSix`.
        
    -   `checkWin()` – returns `true` when all four tokens are finished.
        

### 3. `Token`

-   Represents a single playing piece.
    
-   Properties: `position` (index on the path, -1 = home), `isInHome`, `isFinished`, `canMove`, `element` (DOM node), etc.
    
-   Methods:
    
    -   `move(steps, path)` – animates token forward step‑by‑step using `setInterval`. Returns a promise that resolves when movement completes.
        
    -   `updateTokenState(path)` – moves token one cell forward and updates DOM.
        
    -   `reset(path)` – animates token back home when captured.
        

### 4. `Dice`

-   Simple class with `roll()`, `getValue()`, and `isSix()`.
    
-   Currently rolls a random number between 1–6; can be extended with animation.
    

### Why OOP?

-   Encapsulation – each class manages its own data and behaviour.
    
-   Reusability – the same game engine could be used with a different UI (e.g., command‑line, mobile).
    
-   Testability – classes can be unit‑tested independently.
    
-   Clarity – the code closely mirrors the real‑world game entities.
    

## Getting Started

### Prerequisites

-   Node.js (v16 or later)
    
-   npm or yarn
    

### Installation

1.  Clone the repository:
    
    bash
    
    git clone https://github.com/omarYasirR/ludo-oop.git
    cd ludo-oop
    
2.  Install dependencies:
    
    bash
    
    npm install
    
3.  Start the development server:
    
    bash
    
    npm run dev
    
4.  Open [http://localhost:3000](http://localhost:3000/) to play.
    

### Build for Production

bash

npm run build

The output will be in the `dist/` folder.

## How to Play

-   The game starts with Red as the active player.
    
-   Click the dice button in your coloured zone to roll.
    
-   If you roll a 6, you get another turn.
    
-   Tokens that can move will pulse – click them to move.
    
-   To bring a token out of home, you must roll a 6 and then click the token (it will automatically move to the start cell).
    
-   Land on an opponent’s token to send it back home.
    
-   The first player to get all four tokens to the centre wins.
    

## Future Improvements

-   Add dice rolling animation.
    
-   Sound effects and victory celebration.
    
-   Multi‑player over network (WebSockets).
    
-   AI opponents.
    
-   Persistent game state using localStorage.
    


* * *

_Built with ❤️ using React and OOP principles._