
import { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [crops, setCrops] = useState([
    { id: 1, name: "Wheat", area: "2 acres", status: "Growing" },
    { id: 2, name: "Soybean", area: "3 acres", status: "Growing" },
    { id: 3, name: "Cotton", area: "1 acre", status: "Harvesting" },
  ]);

  const [cropName, setCropName] = useState("");
  const [cropArea, setCropArea] = useState("");

  function addCrop(e) {
    e.preventDefault();

    if (!cropName.trim() || !cropArea.trim()) return;

    setCrops([
      ...crops,
      {
        id: Date.now(),
        name: cropName.trim(),
        area: cropArea.trim() + " acres",
        status: "Growing",
      },
    ]);

    setCropName("");
    setCropArea("");
  }

  const menu = [
    "Dashboard",
    "My Crops",
    "Weather",
    "Resources",
    "Orders",
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🌱 AgriTech</h2>
        <p className="tagline">Smart farming, better future</p>

        <nav>
          {menu.map((item) => (
            <button
              key={item}
              className={activeTab === item ? "nav-item active" : "nav-item"}
              onClick={() => setActiveTab(item)}
            >
              {item === "Dashboard" && "▦ "}
              {item === "My Crops" && "🌾 "}
              {item === "Weather" && "☀️ "}
              {item === "Resources" && "🧰 "}
              {item === "Orders" && "📦 "}
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span>👨‍🌾</span>
          <div>
            <strong>Farmer</strong>
            <p>Farm manager</p>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">AGRICULTURE MANAGEMENT</p>
            <h1>{activeTab}</h1>
          </div>
          <span className="profile">👨‍🌾</span>
        </header>

        {activeTab === "Dashboard" && (
          <>
            <section className="welcome">
              <div>
                <p>YOUR FARM, AT A GLANCE</p>
                <h2>Welcome to your farm! 🌿</h2>
                <span>Manage your crops and keep track of your farm.</span>
              </div>
                <span className="welcome-icon">🌾</span>
            </section>

            <section className="stats">
              <article className="stat-card">
                <span>Total Crops</span>
                <h2>{crops.length}</h2>
                <p>Registered crops</p>
              </article>
              <article className="stat-card">
                <span>Farm Area</span>
                <h2>{crops.reduce((sum, crop) => sum + (parseFloat(crop.area) || 0), 0)} acres</h2>
                <p>Combined crop area</p>
              </article>
              <article className="stat-card">
                <span>Growing</span>
                <h2>{crops.filter((crop) => crop.status === "Growing").length}</h2>
                <p>Active crop records</p>
              </article>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h2>My Crops</h2>
                  <p>Your current crop records</p>
                </div>
                <button
                  className="primary-button"
                  onClick={() => setActiveTab("My Crops")}
                >
                  + Manage Crops
                </button>
              </div>

              <CropTable crops={crops} />
            </section>
          </>
        )}

        {activeTab === "My Crops" && (
          <section className="panel">
            <h2>Manage your crops</h2>
            <p>Add a crop and its cultivated area.</p>

            <form className="crop-form" onSubmit={addCrop}>
              <input
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="Crop name (e.g. Wheat)"
                required
              />
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={cropArea}
                onChange={(e) => setCropArea(e.target.value)}
                placeholder="Area in acres"
                required
              />
              <button className="primary-button" type="submit">
                Add Crop
              </button>
            </form>

            <CropTable crops={crops} />
          </section>
        )}

        {activeTab === "Weather" && (
          <section className="panel">
            <h2>Weather information</h2>
            <p>
              Weather forecasts will be connected to a live weather service
              in a later step.
            </p>
            <div className="weather-placeholder">
              <span>🌤️</span>
              <h3>Weather forecast</h3>
              <p>Live temperature and rainfall data are not connected yet.</p>
            </div>
          </section>
        )}

        {activeTab === "Resources" && (
          <section className="panel">
            <h2>Farming resources</h2>
            <p>Explore useful categories for managing your farm.</p>
            <div className="resource-grid">
              <article>🌱 <h3>Seeds</h3><p>Crop planting supplies</p></article>
              <article>🧪 <h3>Fertilizers</h3><p>Soil nutrition supplies</p></article>
              <article>🚜 <h3>Equipment</h3><p>Farm machinery</p></article>
            </div>
          </section>
        )}

        {activeTab === "Orders" && (
          <section className="panel">
            <h2>My Orders</h2>
            <div className="weather-placeholder">
              <span>📦</span>
              <h3>No orders yet</h3>
              <p>Order tracking will be implemented in a later step.</p>
            </div>
          </section>
        )}

        <footer>AgriTech · Empowering farmers through digital technology</footer>
      </main>
    </div>
  );
}

function CropTable({ crops }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Crop name</th>
            <th>Area</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop) => (
            <tr key={crop.id}>
              <td><strong>{crop.name}</strong></td>
              <td>{crop.area}</td>
              <td>
                <span className="status">{crop.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
