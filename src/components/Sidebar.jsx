export function Sidebar({
  activeTab,
  setActiveTab,
  cropsCount,
  ordersCount,
  farmer,
  mobileOpen,
  setMobileOpen,
}) {
  const menu = [
    { name: "Dashboard", icon: "▦", badge: null },
    { name: "My Crops", icon: "🌾", badge: cropsCount },
    { name: "Weather", icon: "☀️", badge: null },
    { name: "Resources", icon: "🧰", badge: null },
    { name: "Orders", icon: "📦", badge: ordersCount },
  ];

  function handleSelect(item) {
    setActiveTab(item);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  }

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <h2>🌱 AgriTech</h2>
            <p className="tagline">Smart farming, better future</p>
          </div>
          {mobileOpen && (
            <button
              className="sidebar-close-btn"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          )}
        </div>

        <nav>
          {menu.map((item) => (
            <button
              key={item.name}
              className={activeTab === item.name ? "nav-item active" : "nav-item"}
              onClick={() => handleSelect(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.name}</span>
              {item.badge !== null && item.badge > 0 && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span className="sidebar-avatar">👨‍🌾</span>
          <div className="farmer-info">
            <strong>{farmer?.name || "Rajesh Patel"}</strong>
            <p>{farmer?.farmName || "Green Valley Agro Farm"}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
