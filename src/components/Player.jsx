import { useState } from "react";

export default function Player({initialName, symbol, isActive, setPlayerName}) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ name, setName] = useState(initialName)

    function changeEditing() {
        setIsEditing(isEditing => !isEditing);
        setPlayerName(symbol, name);
    }

    function handleChange(event) {
        setName(event.target.value);
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
              { isEditing ?  <input type="text" required value={name} onChange={handleChange} /> : <span className="player-name">{name}</span> }
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={changeEditing}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}