import { useMemo } from "react";
import { REGIONAL_WEATHER } from "../data/weatherData";
import { storage } from "../services/storage";

export function DashboardTab({
  crops,
  orders,
  farmer,
  setActiveTab,
}) {
  const currentLocKey = storage.getSavedLocation() || "pune";
  const weather = REGIONAL_WEATHER[currentLocKey] || REGIONAL_WEATHER["pune"];

  const stats = useMemo(() => {
    const totalCrops = crops.length;
    const totalArea = crops
      .reduce((sum, crop) => sum + (parseFloat(crop.area) || 0), 0)
      .toFixed(1);
    const growingCount = crops.filter(
      (c) => (c.status || "").toLowerCase() === "growing"
    ).length;
    const harvestReadyCount = crops.filter(
      (c) =>
        (c.status || "").toLowerCase() === "ready for harvest" ||
        (c.status || "").toLowerCase() === "harvesting"
    ).length;
    const totalSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    return {
      totalCrops,
      totalArea,
      growingCount,
      harvestReadyCount,
      totalSales,
    };
  }, [crops, orders]);

  return (
    <>
      {/* Welcome Banner */}
      <section className="welcome">
        <div>
          <p>YOUR FARM, AT A GLANCE</p>
          <h2>Welcome to {farmer?.farmName || "your farm"}! 🌿</h2>
          <span>
            Managed by <strong>{farmer?.name || "Farmer"}</strong> · {crops.length} crops cultivated across {stats.totalArea} acres.
          </span>
        </div>
        <span className="welcome-icon">🌾</span>
      </section>

      {/* Primary KPI Stats Grid */}
      <section className="stats">
        <article className="stat-card">
          <span>Total Crops</span>
          <h2>{stats.totalCrops}</h2>
          <p>Active crop records</p>
        </article>

        <article className="stat-card">
          <span>Cultivated Area</span>
          <h2>{stats.totalArea} acres</h2>
          <p>Total land under crops</p>
        </article>

        <article className="stat-card">
          <span>Growing Stage</span>
          <h2>{stats.growingCount}</h2>
          <p>Actively vegetative</p>
        </article>

        <article className="stat-card">
          <span>Harvest Ready</span>
          <h2>{stats.harvestReadyCount}</h2>
          <p>Ready or harvesting</p>
        </article>

        <article className="stat-card">
          <span>Total Harvest Orders</span>
          <h2>₹{stats.totalSales.toLocaleString("en-IN")}</h2>
          <p>{orders.length} booked orders</p>
        </article>
      </section>

      {/* Quick Action Shortcuts */}
      <section className="quick-actions-bar">
        <button
          className="quick-action-btn"
          onClick={() => setActiveTab("My Crops")}
        >
          <span className="qa-icon">🌱</span>
          <div>
            <strong>+ Add Crop</strong>
            <p>Register new planting</p>
          </div>
        </button>

        <button
          className="quick-action-btn"
          onClick={() => setActiveTab("Weather")}
        >
          <span className="qa-icon">☀️</span>
          <div>
            <strong>Weather Advisory</strong>
            <p>{weather.current.temp}°C · {weather.current.condition}</p>
          </div>
        </button>

        <button
          className="quick-action-btn"
          onClick={() => setActiveTab("Orders")}
        >
          <span className="qa-icon">📦</span>
          <div>
            <strong>Manage Orders</strong>
            <p>{orders.length} active orders</p>
          </div>
        </button>

        <button
          className="quick-action-btn"
          onClick={() => setActiveTab("Resources")}
        >
          <span className="qa-icon">🧰</span>
          <div>
            <strong>Farming Guides</strong>
            <p>Soil, IPM & Subsidies</p>
          </div>
        </button>
      </section>

      {/* Dashboard Weather Snapshot */}
      <section className="panel weather-snapshot-panel">
        <div className="panel-heading">
          <div>
            <h2>Agro-Weather Alert Snapshot</h2>
            <p>📍 {weather.district} · Automated field micro-climate advisory</p>
          </div>
          <button
            className="secondary-button-sm"
            onClick={() => setActiveTab("Weather")}
          >
            Full 5-Day Forecast →
          </button>
        </div>

        <div className="weather-snapshot-body">
          <div className="ws-temp-badge">
            <span className="ws-icon">{weather.current.icon}</span>
            <div>
              <span className="ws-temp">{weather.current.temp}°C</span>
              <span className="ws-cond">{weather.current.condition}</span>
            </div>
          </div>

          <div className="ws-chips">
            <div className="ws-chip">
              <span>💧 Humidity:</span>
              <strong>{weather.current.humidity}%</strong>
            </div>
            <div className="ws-chip">
              <span>💨 Wind:</span>
              <strong>{weather.current.windSpeed}</strong>
            </div>
            <div className="ws-chip">
              <span>🌧️ Rain Chance:</span>
              <strong>{weather.current.precipitationChance}%</strong>
            </div>
            <div className="ws-chip">
              <span>🌱 Soil Moisture:</span>
              <strong>{weather.current.soilMoisture}</strong>
            </div>
          </div>

          {weather.advisories.length > 0 && (
            <div className="ws-advisory-pill">
              <span className="advisory-pill-icon">💡</span>
              <p>
                <strong>Today's Priority:</strong> {weather.advisories[0].text}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Crops Table Panel */}
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Registered Crop Cultivations</h2>
            <p>Current active field records</p>
          </div>
          <button
            className="primary-button"
            onClick={() => setActiveTab("My Crops")}
          >
            + Manage Crops
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Category</th>
                <th>Area</th>
                <th>Season</th>
                <th>Expected Harvest</th>
                <th>Status</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              {crops.slice(0, 5).map((crop) => (
                <tr key={crop.id}>
                  <td>
                    <strong>{crop.name}</strong>
                  </td>
                  <td>
                    <span className="category-pill">{crop.category || "General"}</span>
                  </td>
                  <td>{crop.area} acres</td>
                  <td>{crop.season || "—"}</td>
                  <td>{crop.expectedHarvest || "—"}</td>
                  <td>
                    <span
                      className={`status status-${(crop.status || "growing")
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {crop.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`health-badge health-${(crop.health || "healthy")
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {crop.health || "Healthy"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Orders Overview */}
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Recent Harvest Sales Orders</h2>
            <p>Wholesale produce bookings and buyer dispatches</p>
          </div>
          <button
            className="secondary-button-sm"
            onClick={() => setActiveTab("Orders")}
          >
            View All Orders →
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Crop</th>
                <th>Buyer</th>
                <th>Quantity</th>
                <th>Total Value</th>
                <th>Delivery Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 3).map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="order-number-badge">{order.orderNumber}</span>
                  </td>
                  <td>
                    <strong>{order.cropName}</strong>
                  </td>
                  <td>{order.buyerName}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <strong>₹{Number(order.totalAmount).toLocaleString("en-IN")}</strong>
                  </td>
                  <td>{order.deliveryDate}</td>
                  <td>
                    <span
                      className={`status status-${(order.status || "pending")
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
