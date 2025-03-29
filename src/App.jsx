import React, { useState } from "react";
import "./App.css";
import Weather from "./components/Weather";
import Wallpaper from './assets/Wallpaper.webp';


const App = () => {
  
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const fetchWeather = async () => {
    const data = await Weather(city);
    if (data) {
      setWeather(data.weather[0].main);
    } else {
      setWeather(null);
      setMessage("⚠️ Weather data not found!");
    }
  };

  const calculateBoost = (weatherCondition) => {
    if (weatherCondition === "Clear") 
      return 1.5;
    if (weatherCondition === "Rain") 
      return 0.8;
    if (weatherCondition === "Clouds") 
      return 1.2;
    return 1;
  };

  const attack = () => {
    if (gameOver) 
      return;

    const playerBoost = calculateBoost(weather);
    const enemyBoost = calculateBoost("Clouds");
    const playerAttack = Math.floor(20 * playerBoost);
    const enemyAttack = Math.floor((20 + Math.random() * 15) * enemyBoost);

    const newEnemyHealth = Math.max(0, enemyHealth - playerAttack);
    const newPlayerHealth = Math.max(0, playerHealth - enemyAttack);

    setEnemyHealth(newEnemyHealth);
    setPlayerHealth(newPlayerHealth);

    if (newEnemyHealth <= 0) {
      setMessage("🎉 You defeated the Storm Goblin!");
      setGameOver(true);
    } else if (newPlayerHealth <= 0) {
      setMessage("💀 You lost! The Storm Goblin defeated you.");
      setGameOver(true);
    } else {
      setMessage(`🔥 You dealt ${playerAttack} damage! 👹 Enemy hit back with ${enemyAttack} damage.`);
    }
  };

  const restartGame = () => {
    setPlayerHealth(100);
    setEnemyHealth(100);
    setGameOver(false);
    setMessage("");
    setWeather(null); 
    setCity(""); 
  };

  return (
    <div className="game-container">
      <h1>🌦️ Weather Warriors ⚔️</h1>

      <div className="weather-section">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather} disabled={!city}>Get Weather</button>
        <p>Current Weather: {weather || "Not Available"}</p>
      </div>

      <div className="characters">
        <div className="character">
          <h2>🔥 Fire Mage</h2>
          <p>❤️ Health: {playerHealth}</p>
          <p>⚔️ Attack: 20</p>
          <p>🌦️ Weather Boost: {calculateBoost(weather)}</p>
        </div>

        <div className="character enemy">
          <h2>👹 Storm Goblin</h2>
          <p>❤️ Health: {enemyHealth}</p>
          <p>⚔️ Attack: 20-35</p>
          <p>🌦️ Weather Boost: {calculateBoost("Clouds")}</p>
        </div>
      </div>

      {!gameOver ? (
        <button onClick={attack} disabled={gameOver}>⚔️ Attack!</button>
      ) : (
        <button onClick={restartGame}>🔄 Restart</button>
      )}

      <p className="message">{message}</p>
    </div>
  );
};

export default App;
