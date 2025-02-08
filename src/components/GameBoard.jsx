
export default function GameBoard({onSelectSquare, board}) {
    return <ol id="game-board">
            { board.map((row, rIndex) => {
                return <li key={rIndex}>
                    <ol>
                        {row.map((col, cIndex) => {
                           return <li key={cIndex}>
                                <button onClick={() => onSelectSquare(rIndex, cIndex)} disabled={col}>
                                    {col}
                                </button>
                            </li>
                        })}
                    </ol>
                </li>;
            })}
        </ol>;
}