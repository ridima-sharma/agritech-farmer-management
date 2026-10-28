export function Topbar({
  activeTab,
  backendOnline,
  onResetData,
  onToggleMobileMenu,
}) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-toggle"
          onClick={onToggleMobileMenu}
          aria-label="Open menu"
        >
          ☰
        </button>
        <div>
          <p className="eyebrow">AGRICULTURE MANAGEMENT</p>
          <h1>{activeTab}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <div
          className={`status-pill ${backendOnline ? "online" : "demo"}`}
          title={
            backendOnline
              ? "Connected to Express API"
              : "Using persistent browser LocalStorage (Demo Mode)"
          }
        >
          <span className="status-dot"></span>
          <span>{backendOnline ? "MERN Backend Live" : "Local Storage Demo"}</span>
        </div>

        <button
          type="button"
          className="secondary-button-sm"
          onClick={onResetData}
          title="Reset crops and orders to original sample data"
        >
          🔄 Reset Demo
        </button>

        <span className="profile" title="Farmer Profile">
          👨‍🌾
        </span>
      </div>
    </header>
  );
}
