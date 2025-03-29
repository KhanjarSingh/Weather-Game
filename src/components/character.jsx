import React from "react";

const Character = ({ name, health, attack, weatherBoost }) => {
    return (
      <div className="character-card">
        <h2>{name}</h2>
        <p>❤️ Health: {health}</p>
        <p>⚔️ Attack: {attack}</p>
        <p>🌦️ Weather Boost: {weatherBoost}</p>
      </div>
    );
  };
  
  export default Character;