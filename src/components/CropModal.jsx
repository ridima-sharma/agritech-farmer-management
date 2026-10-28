import { useState } from "react";

function getInitialCropState(editingCrop) {
  if (editingCrop) {
    return {
      name: editingCrop.name || "",
      category: editingCrop.category || "Cereals",
      area: editingCrop.area ? String(editingCrop.area).replace(/[^0-9.]/g, "") : "",
      season: editingCrop.season || "Rabi",
      plantingDate: editingCrop.plantingDate || "",
      expectedHarvest: editingCrop.expectedHarvest || "",
      status: editingCrop.status || "Growing",
      health: editingCrop.health || "Healthy",
      estimatedYield: editingCrop.estimatedYield || "",
      notes: editingCrop.notes || "",
    };
  }
  return {
    name: "",
    category: "Cereals",
    area: "",
    season: "Rabi",
    plantingDate: new Date().toISOString().split("T")[0],
    expectedHarvest: "",
    status: "Growing",
    health: "Healthy",
    estimatedYield: "",
    notes: "",
  };
}

export function CropModal({ isOpen, onClose, onSave, editingCrop }) {
  if (!isOpen) return null;

  return (
    <CropModalDialog
      key={editingCrop ? editingCrop.id : "new-crop"}
      onClose={onClose}
      onSave={onSave}
      editingCrop={editingCrop}
    />
  );
}

function CropModalDialog({ onClose, onSave, editingCrop }) {
  const [formData, setFormData] = useState(() => getInitialCropState(editingCrop));
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Crop name is required (e.g. Wheat or Basmati Rice)";
    }
    const numArea = parseFloat(formData.area);
    if (!formData.area || isNaN(numArea) || numArea <= 0) {
      errs.area = "Valid cultivated area in acres is required (greater than 0)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      name: formData.name.trim(),
      area: parseFloat(formData.area).toFixed(1),
      estimatedYield: formData.estimatedYield.trim() || `${Math.round(parseFloat(formData.area) * 10)} Quintals (Est.)`,
    });
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{editingCrop ? "✏️ Edit Crop Record" : "🌱 Add New Crop Record"}</h3>
            <p>{editingCrop ? "Update crop parameters and status" : "Enter crop cultivation details"}</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group flex-2">
              <label htmlFor="crop-name">Crop Name *</label>
              <input
                id="crop-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Basmati Rice (Pusa 1121)"
                className={errors.name ? "input-error" : ""}
                autoFocus
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-group flex-1">
              <label htmlFor="crop-category">Category</label>
              <select
                id="crop-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Cereals">Cereals</option>
                <option value="Oilseeds">Oilseeds</option>
                <option value="Pulses">Pulses</option>
                <option value="Commercial">Commercial / Cash</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Horticulture">Horticulture</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="crop-area">Cultivated Area (Acres) *</label>
              <input
                id="crop-area"
                type="number"
                step="0.1"
                min="0.1"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="e.g. 2.5"
                className={errors.area ? "input-error" : ""}
              />
              {errors.area && <span className="field-error">{errors.area}</span>}
            </div>

            <div className="form-group flex-1">
              <label htmlFor="crop-season">Season</label>
              <select
                id="crop-season"
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
              >
                <option value="Rabi">Rabi (Winter)</option>
                <option value="Kharif">Kharif (Monsoon)</option>
                <option value="Zaid">Zaid (Summer)</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="crop-status">Current Status</label>
              <select
                id="crop-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Planted">Planted</option>
                <option value="Growing">Growing</option>
                <option value="Ready for Harvest">Ready for Harvest</option>
                <option value="Harvesting">Harvesting</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="crop-planting-date">Sowing / Planting Date</label>
              <input
                id="crop-planting-date"
                type="date"
                value={formData.plantingDate}
                onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="crop-harvest-date">Expected Harvest Date</label>
              <input
                id="crop-harvest-date"
                type="date"
                value={formData.expectedHarvest}
                onChange={(e) => setFormData({ ...formData, expectedHarvest: e.target.value })}
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="crop-health">Crop Health</label>
              <select
                id="crop-health"
                value={formData.health}
                onChange={(e) => setFormData({ ...formData, health: e.target.value })}
              >
                <option value="Healthy">Healthy (Optimal)</option>
                <option value="Optimal">Optimal Growth</option>
                <option value="Needs Water">Needs Water</option>
                <option value="Needs Attention">Needs Attention</option>
                <option value="Pest Risk">Pest Risk Alert</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="crop-yield">Estimated Expected Yield</label>
              <input
                id="crop-yield"
                value={formData.estimatedYield}
                onChange={(e) => setFormData({ ...formData, estimatedYield: e.target.value })}
                placeholder="e.g. 35 Quintals"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="crop-notes">Field Notes & Fertilizer Schedule</label>
            <textarea
              id="crop-notes"
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Drip line connected. Basal dose of DAP and Potash applied at sowing."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              {editingCrop ? "Update Crop" : "Add Crop"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CropDeleteModal({ isOpen, onClose, onConfirm, crop }) {
  if (!isOpen || !crop) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">⚠️</div>
        <h3>Delete Crop Record?</h3>
        <p>
          Are you sure you want to remove <strong>{crop.name}</strong> ({crop.area} acres)? This
          action will update your farm stats.
        </p>
        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="danger-button"
            onClick={() => onConfirm(crop.id)}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function CropDetailModal({ isOpen, onClose, crop }) {
  if (!isOpen || !crop) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>🌾 {crop.name}</h3>
            <p>Category: {crop.category || "Cereals"} · Season: {crop.season || "Rabi"}</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="crop-detail-grid">
          <div className="detail-item">
            <span className="detail-label">Cultivated Area</span>
            <span className="detail-value">{crop.area} Acres</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Growth Status</span>
            <span className={`status status-${(crop.status || "growing").toLowerCase().replace(/\s+/g, "-")}`}>
              {crop.status}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Health Condition</span>
            <span className={`health-badge health-${(crop.health || "healthy").toLowerCase().replace(/\s+/g, "-")}`}>
              {crop.health || "Healthy"}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Estimated Yield</span>
            <span className="detail-value">{crop.estimatedYield || "Not specified"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Sowing Date</span>
            <span className="detail-value">{crop.plantingDate || "Not recorded"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Expected Harvest</span>
            <span className="detail-value">{crop.expectedHarvest || "Not recorded"}</span>
          </div>
        </div>

        {crop.notes && (
          <div className="detail-notes">
            <h4>Field Management Notes</h4>
            <p>{crop.notes}</p>
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="primary-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
