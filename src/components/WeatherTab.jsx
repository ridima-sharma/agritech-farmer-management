import { useState } from "react";
import { REGIONAL_WEATHER } from "../data/weatherData";
import { storage } from "../services/storage";

export function WeatherTab({ onToast }) {
  const [selectedRegion, setSelectedRegion] = useState(() => storage.getSavedLocation());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(() => new Date().toLocaleTimeString());

  const weather = REGIONAL_WEATHER[selectedRegion] || REGIONAL_WEATHER["pune"];

  function handleRegionChange(e) {
    const newLoc = e.target.value;
    setSelectedRegion(newLoc);
    storage.saveLocation(newLoc);
    if (onToast) {
      onToast({
        type: "info",
        message: `Weather station switched to ${REGIONAL_WEATHER[newLoc]?.district}`,
      });
    }
  }

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString());
      if (onToast) {
        onToast({
          type: "success",
          message: "Simulated weather and soil telemetry refreshed successfully.",
        });
      }
    }, 600);
  }

  return (
    <section className="weather-tab-container">
      {/* Honest Demo Mode Banner */}
      <div className="demo-banner">
        <div className="demo-banner-content">
          <span className="demo-badge">SIMULATED DEMO DATA</span>
          <p>
            Agro-meteorological telemetry and forecast data shown below are simulated for demonstration.
            The system architecture supports live integration with OpenWeatherMap or IMD Agromet APIs.
          </p>
        </div>
        <div className="demo-banner-actions">
          <span className="last-sync-text">Last Synced: {lastUpdated}</span>
          <button
            className="secondary-button-sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? "⏳ Refreshing..." : "🔄 Refresh Telemetry"}
          </button>
        </div>
      </div>

      {/* Weather Station Selector Header */}
      <div className="panel weather-header-panel">
        <div className="weather-header-info">
          <div>
            <h2>Agro-Meteorological Station</h2>
            <p>Select your farm district to view localized soil micro-climate and field advisories.</p>
          </div>
          <div className="location-select-box">
            <label htmlFor="station-select">Weather Station / District:</label>
            <select
              id="station-select"
              value={selectedRegion}
              onChange={handleRegionChange}
              className="location-select"
            >
              <option value="pune">Pune, Maharashtra (Western Ghats Agro-Zone)</option>
              <option value="karnal">Karnal, Haryana (Trans-Gangetic Plains)</option>
              <option value="indore">Indore, Madhya Pradesh (Malwa Plateau)</option>
              <option value="ludhiana">Ludhiana, Punjab (Upper Gangetic Plains)</option>
              <option value="coimbatore">Coimbatore, Tamil Nadu (Southern Semi-Arid)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary Current Weather Display */}
      <div className="current-weather-card">
        <div className="current-weather-main">
          <div className="weather-temp-block">
            <span className="weather-big-icon">{weather.current.icon}</span>
            <div>
              <div className="temp-degree">{weather.current.temp}°C</div>
              <div className="temp-condition">{weather.current.condition}</div>
            </div>
          </div>
          <div className="weather-location-summary">
            <h3>📍 {weather.district}</h3>
            <p className="soil-meta">Native Soil: <strong>{weather.soilType}</strong></p>
            <p className="temp-range">
              High: <strong>{weather.current.high}°C</strong> · Low: <strong>{weather.current.low}°C</strong> · Feels like {weather.current.feelsLike}°C
            </p>
          </div>
        </div>

        {/* Agricultural Micro-Climate Indicators */}
        <div className="agri-metrics-grid">
          <div className="metric-box">
            <span className="metric-icon">💧</span>
            <div>
              <span className="metric-label">Relative Humidity</span>
              <strong className="metric-value">{weather.current.humidity}%</strong>
              <span className="metric-sub">{weather.current.humidity > 70 ? "High Disease Risk" : "Normal Range"}</span>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-icon">💨</span>
            <div>
              <span className="metric-label">Wind Velocity</span>
              <strong className="metric-value">{weather.current.windSpeed}</strong>
              <span className="metric-sub">Ideal for spraying</span>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-icon">🌧️</span>
            <div>
              <span className="metric-label">Precipitation Chance</span>
              <strong className="metric-value">{weather.current.precipitationChance}%</strong>
              <span className="metric-sub">Next 24 Hours</span>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-icon">🌱</span>
            <div>
              <span className="metric-label">Root Zone Moisture</span>
              <strong className="metric-value">{weather.current.soilMoisture}</strong>
              <span className="metric-sub">0-30 cm Sensor Depth</span>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-icon">☀️</span>
            <div>
              <span className="metric-label">UV Radiation Index</span>
              <strong className="metric-value">{weather.current.uvIndex}</strong>
              <span className="metric-sub">Midday Peak</span>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-icon">🌾</span>
            <div>
              <span className="metric-label">Evapotranspiration</span>
              <strong className="metric-value">{weather.current.evapotranspiration}</strong>
              <span className="metric-sub">Daily Water Loss (ET₀)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Agricultural Forecast */}
      <div className="panel">
        <div className="panel-heading">
          <div>
            <h2>5-Day Farm Forecast</h2>
            <p>Anticipate rain events and temperature shifts for timely field operations.</p>
          </div>
        </div>

        <div className="forecast-grid">
          {weather.forecast.map((day, idx) => (
            <div key={idx} className={`forecast-card ${idx === 0 ? "forecast-today" : ""}`}>
              <div className="forecast-day">{day.day}</div>
              <div className="forecast-date">{day.date}</div>
              <div className="forecast-icon">{day.icon}</div>
              <div className="forecast-temp">
                <span className="high-temp">{day.high}°</span>
                <span className="low-temp">{day.low}°</span>
              </div>
              <div className="forecast-cond">{day.condition}</div>
              <div className="forecast-rain">
                <span>🌧️ {day.rainProb}% rain</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agricultural Advisory Bulletins */}
      <div className="panel">
        <div className="panel-heading">
          <div>
            <h2>Agricultural Advisory Bulletin</h2>
            <p>Expert actionable recommendations tailored to current local atmospheric conditions.</p>
          </div>
        </div>

        <div className="advisories-list">
          {weather.advisories.map((adv, idx) => (
            <article key={idx} className={`advisory-card advisory-${adv.severity}`}>
              <div className="advisory-icon">
                {adv.type === "spraying" && "🚜"}
                {adv.type === "irrigation" && "💧"}
                {adv.type === "disease" && "⚠️"}
              </div>
              <div className="advisory-content">
                <div className="advisory-header">
                  <h3>{adv.title}</h3>
                  <span className={`advisory-tag tag-${adv.severity}`}>
                    {adv.severity === "safe" ? "Recommended Window" : adv.severity === "warning" ? "Caution Alert" : "Field Guidance"}
                  </span>
                </div>
                <p>{adv.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
