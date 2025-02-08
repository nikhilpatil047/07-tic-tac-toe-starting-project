import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./WinningComb.js";
import GameOver from "./components/GameOver.jsx";

const initialBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];
const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function derivedGameBoard(gameTurns) {
  let gameBoard = [...initialBoard.map( innerArr => [...innerArr])];
    
    for(const turn of gameTurns) {
       
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
       
    }
  return gameBoard;
}

function derivedWinner(gameBoard, players) {
  let winner = null;
    for(const combination of WINNING_COMBINATIONS) {
      const firstSqrSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSqrSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSqrSymbol = gameBoard[combination[2].row][combination[2].column];

      if(firstSqrSymbol && firstSqrSymbol === secondSqrSymbol && secondSqrSymbol === thirdSqrSymbol) {
        winner = players[firstSqrSymbol];
      }

    }

  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerSelection(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
    
  }

  function handleNameChange(symbol, newName) {
    setPlayers( previousNames => {
      return {
      ...previousNames,
      [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} setPlayerName={handleNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} setPlayerName={handleNameChange} />
        </ol>
        { (winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <GameBoard 
        onSelectSquare={handlePlayerSelection} 
        board={gameBoard}  />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
