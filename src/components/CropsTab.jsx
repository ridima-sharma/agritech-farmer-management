import { useState, useMemo } from "react";
import { CropModal, CropDeleteModal, CropDetailModal } from "./CropModal";

export function CropsTab({ crops, onAddCrop, onUpdateCrop, onDeleteCrop }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [seasonFilter, setSeasonFilter] = useState("ALL");

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [deleteModalCrop, setDeleteModalCrop] = useState(null);
  const [detailModalCrop, setDetailModalCrop] = useState(null);

  const filteredCrops = useMemo(() => {
    return crops.filter((crop) => {
      const matchesSearch =
        search.trim() === "" ||
        crop.name.toLowerCase().includes(search.toLowerCase()) ||
        (crop.category && crop.category.toLowerCase().includes(search.toLowerCase())) ||
        (crop.notes && crop.notes.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus =
        statusFilter === "ALL" ||
        crop.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesSeason =
        seasonFilter === "ALL" ||
        (crop.season && crop.season.toLowerCase() === seasonFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesSeason;
    });
  }, [crops, search, statusFilter, seasonFilter]);

  const totalFilteredAcres = useMemo(() => {
    return filteredCrops
      .reduce((sum, c) => sum + (parseFloat(c.area) || 0), 0)
      .toFixed(1);
  }, [filteredCrops]);

  function handleOpenAdd() {
    setEditingCrop(null);
    setModalOpen(true);
  }

  function handleOpenEdit(crop) {
    setEditingCrop(crop);
    setModalOpen(true);
  }

  function handleSaveCrop(cropData) {
    if (editingCrop) {
      onUpdateCrop(editingCrop.id, cropData);
    } else {
      onAddCrop(cropData);
    }
    setModalOpen(false);
    setEditingCrop(null);
  }

  function handleConfirmDelete(cropId) {
    onDeleteCrop(cropId);
    setDeleteModalCrop(null);
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setSeasonFilter("ALL");
  }

  const isFiltered = search !== "" || statusFilter !== "ALL" || seasonFilter !== "ALL";

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>Manage Your Crops</h2>
          <p>Register, monitor, search and update all field cultivation records.</p>
        </div>
        <button className="primary-button" onClick={handleOpenAdd}>
          + Add New Crop
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop name, variety, category..."
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")} aria-label="Clear search">
              ×
            </button>
          )}
        </div>

        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
            aria-label="Filter by Status"
          >
            <option value="ALL">All Statuses</option>
            <option value="Planted">Planted</option>
            <option value="Growing">Growing</option>
            <option value="Ready for Harvest">Ready for Harvest</option>
            <option value="Harvesting">Harvesting</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={seasonFilter}
            onChange={(e) => setSeasonFilter(e.target.value)}
            className="filter-select"
            aria-label="Filter by Season"
          >
            <option value="ALL">All Seasons</option>
            <option value="Kharif">Kharif (Monsoon)</option>
            <option value="Rabi">Rabi (Winter)</option>
            <option value="Zaid">Zaid (Summer)</option>
          </select>

          {isFiltered && (
            <button className="secondary-button-sm" onClick={resetFilters}>
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Metadata */}
      <div className="results-meta">
        <span>
          Showing <strong>{filteredCrops.length}</strong> of <strong>{crops.length}</strong> crop records
        </span>
        <span>
          Total Cultivated Area: <strong>{totalFilteredAcres} acres</strong>
        </span>
      </div>

      {/* Crops Table */}
      {filteredCrops.length > 0 ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Crop & Variety</th>
                <th>Category</th>
                <th>Area</th>
                <th>Season</th>
                <th>Sowing Date</th>
                <th>Growth Status</th>
                <th>Health Condition</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.map((crop) => (
                <tr key={crop.id}>
                  <td>
                    <div className="crop-cell-title">
                      <strong>{crop.name}</strong>
                      {crop.estimatedYield && (
                        <span className="crop-subtext">Est: {crop.estimatedYield}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="category-pill">{crop.category || "General"}</span>
                  </td>
                  <td>
                    <strong>{crop.area}</strong> acres
                  </td>
                  <td>{crop.season || "—"}</td>
                  <td>{crop.plantingDate || "—"}</td>
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
                  <td style={{ textAlign: "right" }}>
                    <div className="action-buttons-cell">
                      <button
                        className="btn-action btn-view"
                        onClick={() => setDetailModalCrop(crop)}
                        title="View details"
                      >
                        👁️
                      </button>
                      <button
                        className="btn-action btn-edit"
                        onClick={() => handleOpenEdit(crop)}
                        title="Edit crop"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => setDeleteModalCrop(crop)}
                        title="Delete crop"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">🌾</span>
          <h3>No crops found</h3>
          <p>
            {isFiltered
              ? "No crops matched your current search and filter criteria."
              : "No crop records registered yet. Start by adding your first cultivated crop."}
          </p>
          {isFiltered ? (
            <button className="secondary-button" onClick={resetFilters}>
              Clear Filters
            </button>
          ) : (
            <button className="primary-button" onClick={handleOpenAdd}>
              + Add First Crop
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      <CropModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveCrop}
        editingCrop={editingCrop}
      />

      <CropDeleteModal
        isOpen={Boolean(deleteModalCrop)}
        crop={deleteModalCrop}
        onClose={() => setDeleteModalCrop(null)}
        onConfirm={handleConfirmDelete}
      />

      <CropDetailModal
        isOpen={Boolean(detailModalCrop)}
        crop={detailModalCrop}
        onClose={() => setDetailModalCrop(null)}
      />
    </section>
  );
}
