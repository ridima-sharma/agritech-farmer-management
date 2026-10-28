import { useState, useEffect } from "react";
import "./App.css";

import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Toast } from "./components/Toast";
import { DashboardTab } from "./components/DashboardTab";
import { CropsTab } from "./components/CropsTab";
import { WeatherTab } from "./components/WeatherTab";
import { ResourcesTab } from "./components/ResourcesTab";
import { OrdersTab } from "./components/OrdersTab";

import { storage } from "./services/storage";
import {
  checkBackendHealth,
  getCrops,
  createCrop,
  updateCrop,
  deleteCrop,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "./services/api";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [crops, setCrops] = useState([]);
  const [orders, setOrders] = useState([]);
  const [farmer, setFarmer] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Show temporary toast notification
  function showToast(message, type = "success") {
    if (typeof message === "object") {
      setToast(message);
    } else {
      setToast({ message, type });
    }
  }

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Initial load
  useEffect(() => {
    async function initData() {
      setLoading(true);
      // Load farmer profile
      const farmerProfile = storage.getFarmerProfile();
      setFarmer(farmerProfile);

      // Check backend health
      const health = await checkBackendHealth();
      setBackendOnline(health.connected);

      // Load crops & orders
      const loadedCrops = await getCrops();
      const loadedOrders = await getOrders();
      setCrops(loadedCrops);
      setOrders(loadedOrders);
      setLoading(false);
    }

    initData();
  }, []);

  // Crop Handlers
  async function handleAddCrop(cropData) {
    try {
      const saved = await createCrop(cropData);
      setCrops((prev) => [saved, ...prev.filter((c) => c.id !== saved.id)]);
      showToast(`Added "${saved.name}" (${saved.area} acres) to your farm records.`);
    } catch {
      showToast("Failed to add crop record.", "error");
    }
  }

  async function handleUpdateCrop(cropId, cropData) {
    try {
      const updated = await updateCrop(cropId, cropData);
      setCrops((prev) => prev.map((c) => (c.id === cropId ? updated : c)));
      showToast(`Updated "${updated.name}" successfully.`);
    } catch {
      showToast("Failed to update crop record.", "error");
    }
  }

  async function handleDeleteCrop(cropId) {
    try {
      const target = crops.find((c) => c.id === cropId);
      await deleteCrop(cropId);
      setCrops((prev) => prev.filter((c) => c.id !== cropId));
      showToast(`Removed "${target?.name || "Crop"}" from records.`);
    } catch {
      showToast("Failed to delete crop record.", "error");
    }
  }

  // Order Handlers
  async function handleAddOrder(orderData) {
    try {
      const saved = await createOrder(orderData);
      setOrders((prev) => [saved, ...prev.filter((o) => o.id !== saved.id)]);
      showToast(`Created Order ${saved.orderNumber} for ₹${Number(saved.totalAmount).toLocaleString("en-IN")}.`);
    } catch {
      showToast("Failed to create order.", "error");
    }
  }

  async function handleUpdateOrder(orderId, orderData) {
    try {
      const updated = await updateOrder(orderId, orderData);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      showToast(`Updated Order ${updated.orderNumber} (Status: ${updated.status}).`);
    } catch {
      showToast("Failed to update order.", "error");
    }
  }

  async function handleDeleteOrder(orderId) {
    try {
      const target = orders.find((o) => o.id === orderId);
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      showToast(`Deleted order ${target?.orderNumber || "record"}.`);
    } catch {
      showToast("Failed to delete order.", "error");
    }
  }

  // Reset Demo Data
  function handleResetDemoData() {
    if (
      window.confirm(
        "Are you sure you want to reset all crops, orders and weather preferences to original demo data?"
      )
    ) {
      const res = storage.resetAllData();
      if (res) {
        setCrops(res.crops);
        setOrders(res.orders);
        setFarmer(res.farmer);
        showToast("Demo data reset to initial showcase records.", "info");
      }
    }
  }

  return (
    <div className="app">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cropsCount={crops.length}
        ordersCount={orders.length}
        farmer={farmer}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="main">
        <Topbar
          activeTab={activeTab}
          backendOnline={backendOnline}
          onResetData={handleResetDemoData}
          onToggleMobileMenu={() => setMobileOpen(!mobileOpen)}
        />

        {loading ? (
          <div className="loading-state">
            <span className="spinner">🌱</span>
            <p>Loading farm records...</p>
          </div>
        ) : (
          <>
            {activeTab === "Dashboard" && (
              <DashboardTab
                crops={crops}
                orders={orders}
                farmer={farmer}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "My Crops" && (
              <CropsTab
                crops={crops}
                onAddCrop={handleAddCrop}
                onUpdateCrop={handleUpdateCrop}
                onDeleteCrop={handleDeleteCrop}
              />
            )}

            {activeTab === "Weather" && (
              <WeatherTab onToast={showToast} />
            )}

            {activeTab === "Resources" && (
              <ResourcesTab />
            )}

            {activeTab === "Orders" && (
              <OrdersTab
                orders={orders}
                crops={crops}
                onAddOrder={handleAddOrder}
                onUpdateOrder={handleUpdateOrder}
                onDeleteOrder={handleDeleteOrder}
              />
            )}
          </>
        )}

        <footer className="footer-bar">
          <div className="footer-content">
            <span>AgriTech · Empowering farmers through digital technology</span>
            <span className="footer-separator">·</span>
            <span>MERN Stack Agricultural Management System</span>
          </div>
        </footer>
      </main>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
