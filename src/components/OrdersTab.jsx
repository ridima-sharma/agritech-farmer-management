import { useState, useMemo } from "react";
import { OrderModal, OrderDeleteModal } from "./OrderModal";

export function OrdersTab({
  orders,
  crops,
  onAddOrder,
  onUpdateOrder,
  onDeleteOrder,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleteModalOrder, setDeleteModalOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        search.trim() === "" ||
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.cropName.toLowerCase().includes(search.toLowerCase()) ||
        order.buyerName.toLowerCase().includes(search.toLowerCase()) ||
        (order.destination && order.destination.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus =
        statusFilter === "ALL" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
    const deliveredValue = orders
      .filter((o) => o.status === "Delivered")
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const pendingCount = orders.filter(
      (o) => o.status === "Pending" || o.status === "Confirmed" || o.status === "Dispatched"
    ).length;

    return { totalRevenue, deliveredCount, deliveredValue, pendingCount };
  }, [orders]);

  function handleOpenAdd() {
    setEditingOrder(null);
    setModalOpen(true);
  }

  function handleOpenEdit(order) {
    setEditingOrder(order);
    setModalOpen(true);
  }

  function handleSaveOrder(orderData) {
    if (editingOrder) {
      onUpdateOrder(editingOrder.id, orderData);
    } else {
      onAddOrder(orderData);
    }
    setModalOpen(false);
    setEditingOrder(null);
  }

  function handleQuickStatusChange(order, newStatus) {
    onUpdateOrder(order.id, { ...order, status: newStatus });
  }

  function handleConfirmDelete(orderId) {
    onDeleteOrder(orderId);
    setDeleteModalOrder(null);
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("ALL");
  }

  const isFiltered = search !== "" || statusFilter !== "ALL";

  return (
    <section className="orders-tab-container">
      {/* Financial Overview Metrics */}
      <div className="stats order-stats-grid">
        <article className="stat-card">
          <span>Total Sales Value</span>
          <h2>₹{stats.totalRevenue.toLocaleString("en-IN")}</h2>
          <p>Across {orders.length} registered orders</p>
        </article>

        <article className="stat-card">
          <span>Delivered / Realized</span>
          <h2>₹{stats.deliveredValue.toLocaleString("en-IN")}</h2>
          <p>{stats.deliveredCount} orders fulfilled</p>
        </article>

        <article className="stat-card">
          <span>Active / In-Fulfillment</span>
          <h2>{stats.pendingCount}</h2>
          <p>Orders scheduled for delivery</p>
        </article>
      </div>

      <div className="panel">
        <div className="panel-heading">
          <div>
            <h2>Harvest Sales & Mandi Orders</h2>
            <p>Track wholesale crop bookings, Mandi deliveries, trader contracts, and payments.</p>
          </div>
          <button className="primary-button" onClick={handleOpenAdd}>
            + Create New Order
          </button>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, buyer, crop, or destination..."
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
              aria-label="Filter by order status"
            >
              <option value="ALL">All Order Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Dispatched">Dispatched / In-Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending Confirmation</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {isFiltered && (
              <button className="secondary-button-sm" onClick={resetFilters}>
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Orders Table */}
        {filteredOrders.length > 0 ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Crop & Quantity</th>
                  <th>Buyer / Mandi Trader</th>
                  <th>Order Date</th>
                  <th>Delivery Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span className="order-number-badge">{order.orderNumber}</span>
                    </td>
                    <td>
                      <div>
                        <strong>{order.cropName}</strong>
                        <div className="crop-subtext">{order.quantity}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <strong>{order.buyerName}</strong>
                        <div className="crop-subtext">
                          {order.buyerPhone} {order.destination ? `· ${order.destination}` : ""}
                        </div>
                      </div>
                    </td>
                    <td>{order.orderDate}</td>
                    <td>{order.deliveryDate}</td>
                    <td>
                      <strong>₹{Number(order.totalAmount).toLocaleString("en-IN")}</strong>
                      {order.ratePerUnit && (
                        <div className="crop-subtext">₹{order.ratePerUnit}/unit</div>
                      )}
                    </td>
                    <td>
                      <select
                        className={`status-select status-${(order.status || "pending")
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        value={order.status}
                        onChange={(e) => handleQuickStatusChange(order, e.target.value)}
                        title="Click to quickly update status"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <span
                        className={`payment-badge payment-${(order.paymentStatus || "pending")
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {order.paymentStatus || "Pending"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div className="action-buttons-cell">
                        <button
                          className="btn-action btn-edit"
                          onClick={() => handleOpenEdit(order)}
                          title="Edit order"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-action btn-delete"
                          onClick={() => setDeleteModalOrder(order)}
                          title="Delete order"
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
            <span className="empty-icon">📦</span>
            <h3>No orders found</h3>
            <p>
              {isFiltered
                ? "No harvest sales orders match your current search/filter."
                : "No sales orders recorded yet. Record your first produce sale."}
            </p>
            {isFiltered ? (
              <button className="secondary-button" onClick={resetFilters}>
                Clear Search
              </button>
            ) : (
              <button className="primary-button" onClick={handleOpenAdd}>
                + Create First Order
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveOrder}
        editingOrder={editingOrder}
        availableCrops={crops}
      />

      <OrderDeleteModal
        isOpen={Boolean(deleteModalOrder)}
        order={deleteModalOrder}
        onClose={() => setDeleteModalOrder(null)}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}
