import { useState } from "react";

function getInitialOrderState(editingOrder, availableCrops) {
  if (editingOrder) {
    const qMatch = (editingOrder.quantity || "").match(/^([0-9.]+)\s*(.*)$/);
    const qVal = qMatch ? qMatch[1] : editingOrder.quantity || "";
    const qUnit = qMatch && qMatch[2] ? qMatch[2] : "Quintals";

    return {
      cropName: editingOrder.cropName || "",
      buyerName: editingOrder.buyerName || "",
      buyerPhone: editingOrder.buyerPhone || "",
      quantityValue: qVal,
      quantityUnit: qUnit,
      ratePerUnit: editingOrder.ratePerUnit ? String(editingOrder.ratePerUnit) : "",
      deliveryDate: editingOrder.deliveryDate || "",
      status: editingOrder.status || "Confirmed",
      paymentStatus: editingOrder.paymentStatus || "Pending",
      destination: editingOrder.destination || "",
    };
  }

  return {
    cropName: availableCrops.length > 0 ? availableCrops[0].name : "",
    buyerName: "",
    buyerPhone: "",
    quantityValue: "",
    quantityUnit: "Quintals",
    ratePerUnit: "",
    deliveryDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    status: "Confirmed",
    paymentStatus: "Pending",
    destination: "",
  };
}

export function OrderModal({ isOpen, onClose, onSave, editingOrder, availableCrops = [] }) {
  if (!isOpen) return null;

  return (
    <OrderModalDialog
      key={editingOrder ? editingOrder.id : "new-order"}
      onClose={onClose}
      onSave={onSave}
      editingOrder={editingOrder}
      availableCrops={availableCrops}
    />
  );
}

function OrderModalDialog({ onClose, onSave, editingOrder, availableCrops = [] }) {
  const [formData, setFormData] = useState(() => getInitialOrderState(editingOrder, availableCrops));
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!formData.cropName.trim()) {
      errs.cropName = "Please select or enter the crop to be sold.";
    }
    if (!formData.buyerName.trim()) {
      errs.buyerName = "Buyer or Mandi trader name is required.";
    }
    const q = parseFloat(formData.quantityValue);
    if (!formData.quantityValue || isNaN(q) || q <= 0) {
      errs.quantityValue = "Valid quantity greater than 0 is required.";
    }
    const r = parseFloat(formData.ratePerUnit);
    if (!formData.ratePerUnit || isNaN(r) || r <= 0) {
      errs.ratePerUnit = "Valid rate per unit in ₹ is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const q = parseFloat(formData.quantityValue);
    const r = parseFloat(formData.ratePerUnit);
    const total = Math.round(q * r);

    onSave({
      cropName: formData.cropName.trim(),
      buyerName: formData.buyerName.trim(),
      buyerPhone: formData.buyerPhone.trim() || "+91 98000 00000",
      quantity: `${formData.quantityValue} ${formData.quantityUnit}`,
      ratePerUnit: r,
      totalAmount: total,
      deliveryDate: formData.deliveryDate || new Date().toISOString().split("T")[0],
      orderDate: editingOrder?.orderDate || new Date().toISOString().split("T")[0],
      status: formData.status,
      paymentStatus: formData.paymentStatus,
      destination: formData.destination.trim() || "Local Mandi Depot",
    });
  }

  const computedTotal =
    parseFloat(formData.quantityValue) > 0 && parseFloat(formData.ratePerUnit) > 0
      ? Math.round(parseFloat(formData.quantityValue) * parseFloat(formData.ratePerUnit))
      : 0;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{editingOrder ? "✏️ Edit Harvest Order" : "📦 Create Harvest Sale Order"}</h3>
            <p>{editingOrder ? "Update buyer, status or order pricing" : "Record a crop sale contract or Mandi booking"}</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group flex-2">
              <label htmlFor="order-crop">Crop to Sell *</label>
              {availableCrops.length > 0 ? (
                <select
                  id="order-crop"
                  value={formData.cropName}
                  onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                  className={errors.cropName ? "input-error" : ""}
                >
                  <option value="">-- Select Registered Crop --</option>
                  {availableCrops.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.area} acres - {c.status})
                    </option>
                  ))}
                  <option value="Custom">Other / Custom Crop</option>
                </select>
              ) : (
                <input
                  id="order-crop"
                  value={formData.cropName}
                  onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                  placeholder="e.g. Basmati Rice"
                  className={errors.cropName ? "input-error" : ""}
                />
              )}
              {errors.cropName && <span className="field-error">{errors.cropName}</span>}
            </div>

            <div className="form-group flex-2">
              <label htmlFor="order-buyer">Buyer / Mandi Trader *</label>
              <input
                id="order-buyer"
                value={formData.buyerName}
                onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                placeholder="e.g. Kisan Samriddhi FPO / AgroFresh Millers"
                className={errors.buyerName ? "input-error" : ""}
              />
              {errors.buyerName && <span className="field-error">{errors.buyerName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="order-buyer-phone">Buyer Contact Phone</label>
              <input
                id="order-buyer-phone"
                value={formData.buyerPhone}
                onChange={(e) => setFormData({ ...formData, buyerPhone: e.target.value })}
                placeholder="e.g. +91 98230 45678"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="order-destination">Delivery Mandi / Depot</label>
              <input
                id="order-destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="e.g. Yard #3, APMC Mandi"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="order-qty">Quantity *</label>
              <input
                id="order-qty"
                type="number"
                step="0.5"
                min="0.5"
                value={formData.quantityValue}
                onChange={(e) => setFormData({ ...formData, quantityValue: e.target.value })}
                placeholder="e.g. 25"
                className={errors.quantityValue ? "input-error" : ""}
              />
              {errors.quantityValue && <span className="field-error">{errors.quantityValue}</span>}
            </div>

            <div className="form-group flex-1">
              <label htmlFor="order-unit">Unit</label>
              <select
                id="order-unit"
                value={formData.quantityUnit}
                onChange={(e) => setFormData({ ...formData, quantityUnit: e.target.value })}
              >
                <option value="Quintals">Quintals (100 kg)</option>
                <option value="Tonnes">Metric Tonnes</option>
                <option value="Bags">50kg Bags</option>
                <option value="Kilograms">Kilograms (kg)</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="order-rate">Rate (₹ per Unit) *</label>
              <input
                id="order-rate"
                type="number"
                step="10"
                min="10"
                value={formData.ratePerUnit}
                onChange={(e) => setFormData({ ...formData, ratePerUnit: e.target.value })}
                placeholder="e.g. 4800"
                className={errors.ratePerUnit ? "input-error" : ""}
              />
              {errors.ratePerUnit && <span className="field-error">{errors.ratePerUnit}</span>}
            </div>
          </div>

          {computedTotal > 0 && (
            <div className="order-total-preview">
              <span>Calculated Total Order Value:</span>
              <strong>₹{computedTotal.toLocaleString("en-IN")}</strong>
            </div>
          )}

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="order-delivery-date">Scheduled Delivery Date</label>
              <input
                id="order-delivery-date"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="order-status">Order Status</label>
              <select
                id="order-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Pending">Pending Confirmation</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Dispatched">Dispatched / In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="order-payment">Payment Status</label>
              <select
                id="order-payment"
                value={formData.paymentStatus}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
              >
                <option value="Pending">Payment Pending</option>
                <option value="Partial">Partial Advance (50%)</option>
                <option value="Paid">Fully Paid</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              {editingOrder ? "Update Order" : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function OrderDeleteModal({ isOpen, onClose, onConfirm, order }) {
  if (!isOpen || !order) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">⚠️</div>
        <h3>Delete Order Record?</h3>
        <p>
          Are you sure you want to delete <strong>{order.orderNumber}</strong> ({order.cropName} to{" "}
          {order.buyerName})?
        </p>
        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="danger-button"
            onClick={() => onConfirm(order.id)}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
