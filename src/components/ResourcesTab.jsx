import { useState, useMemo } from "react";
import { FARMING_RESOURCES, KISAN_HELPLINES } from "../data/resourcesData";

export function ResourcesTab() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeResource, setActiveResource] = useState(null);

  const categories = [
    "ALL",
    "Soil & Fertilizers",
    "Modern Irrigation",
    "Crop Protection",
    "Government Schemes",
    "Post-Harvest Management",
    "Sustainable Farming",
  ];

  const filteredResources = useMemo(() => {
    return FARMING_RESOURCES.filter((res) => {
      const matchesCategory =
        activeCategory === "ALL" || res.category === activeCategory;

      const matchesSearch =
        search.trim() === "" ||
        res.title.toLowerCase().includes(search.toLowerCase()) ||
        res.summary.toLowerCase().includes(search.toLowerCase()) ||
        res.category.toLowerCase().includes(search.toLowerCase()) ||
        res.keyPoints.some((pt) => pt.toLowerCase().includes(search.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <section className="resources-tab-container">
      {/* Header and Search */}
      <div className="panel">
        <div className="panel-heading">
          <div>
            <h2>Agricultural Resources & Advisory Library</h2>
            <p>Practical farming techniques, crop nutrition guides, government subsidies, and IPM pest advisories.</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="search-input-wrapper mb-4">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guides (e.g. NPK, drip irrigation, PM-KISAN, neem spray)..."
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")} aria-label="Clear search">
              ×
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="category-pills-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "ALL" ? "All Topics" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length > 0 ? (
        <div className="resources-grid-cards">
          {filteredResources.map((res) => (
            <article key={res.id} className="resource-detail-card">
              <div className="resource-card-top">
                <span className="resource-card-icon">{res.icon}</span>
                <div className="resource-card-badges">
                  <span className="badge-tag">{res.category}</span>
                  <span className="badge-read-time">{res.readTime}</span>
                </div>
              </div>

              <h3 className="resource-card-title">{res.title}</h3>
              <p className="resource-card-summary">{res.summary}</p>

              <div className="resource-key-points">
                <strong>Key Takeaways:</strong>
                <ul>
                  {res.keyPoints.slice(0, 3).map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div className="resource-card-footer">
                <button
                  type="button"
                  className="secondary-button-sm"
                  onClick={() => setActiveResource(res)}
                >
                  📖 Read Full Guide
                </button>
                {res.officialLink && (
                  <a
                    href={res.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-link"
                  >
                    Official Portal ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">🧰</span>
          <h3>No resources match your search</h3>
          <p>Try searching for different keywords or select "All Topics".</p>
          <button
            className="secondary-button"
            onClick={() => {
              setSearch("");
              setActiveCategory("ALL");
            }}
          >
            Reset Search
          </button>
        </div>
      )}

      {/* Kisan Support & Government Helplines */}
      <div className="panel helplines-panel">
        <div className="panel-heading">
          <div>
            <h2>📞 Kisan Support & Emergency Agronomist Helplines</h2>
            <p>Direct assistance from central agricultural scientists and crop insurance desks.</p>
          </div>
        </div>

        <div className="helpline-grid">
          {KISAN_HELPLINES.map((item, idx) => (
            <div key={idx} className="helpline-card">
              <div className="helpline-header">
                <span className="helpline-badge">{item.badge}</span>
                <span className="helpline-timings">{item.timings}</span>
              </div>
              <h3 className="helpline-title">{item.name}</h3>
              <a href={`tel:${item.number.replace(/[^0-9]/g, "")}`} className="helpline-number">
                📞 {item.number}
              </a>
              <p className="helpline-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Detail Modal */}
      {activeResource && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveResource(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="badge-tag">{activeResource.category}</span>
                <h3>
                  {activeResource.icon} {activeResource.title}
                </h3>
                <p>Read time: {activeResource.readTime}</p>
              </div>
              <button
                className="modal-close"
                onClick={() => setActiveResource(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="resource-modal-body">
              <div className="resource-takeaways-box">
                <h4>🎯 Summary & Critical Rules</h4>
                <ul>
                  {activeResource.keyPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div className="resource-prose">
                <p style={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>
                  {activeResource.fullGuide.trim()}
                </p>
              </div>

              {activeResource.officialLink && (
                <div className="official-link-box">
                  <span>🏛️ Official Government Portal:</span>
                  <a
                    href={activeResource.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {activeResource.officialLink} ↗
                  </a>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => setActiveResource(null)}
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
