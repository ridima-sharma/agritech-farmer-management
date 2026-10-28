import { storage } from "./storage";

let backendAvailable = false;

export async function checkBackendHealth() {
  try {
    const res = await fetch("/api/health", { method: "GET", headers: { "Accept": "application/json" } });
    if (res.ok) {
      const data = await res.json();
      backendAvailable = true;
      return { connected: true, details: data };
    }
  } catch {
    // Backend offline / not running
  }
  backendAvailable = false;
  return { connected: false, details: null };
}

export function isBackendOnline() {
  return backendAvailable;
}

// ==================== CROPS API ====================
export async function getCrops() {
  if (backendAvailable) {
    try {
      const res = await fetch("/api/crops");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          storage.saveCrops(data);
          return data;
        }
      }
    } catch (err) {
      console.warn("Backend fetch failed, falling back to local storage:", err);
    }
  }
  return storage.getCrops();
}

export async function createCrop(cropData) {
  if (backendAvailable) {
    try {
      const res = await fetch("/api/crops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cropData),
      });
      if (res.ok) {
        const saved = await res.json();
        const current = storage.getCrops();
        const updated = [saved, ...current.filter((c) => c.id !== saved.id)];
        storage.saveCrops(updated);
        return saved;
      }
    } catch (err) {
      console.warn("Backend crop create failed, falling back to local storage:", err);
    }
  }

  // Local fallback
  const current = storage.getCrops();
  const newCrop = {
    ...cropData,
    id: cropData.id || Date.now(),
  };
  const updated = [newCrop, ...current];
  storage.saveCrops(updated);
  return newCrop;
}

export async function updateCrop(cropId, cropData) {
  if (backendAvailable) {
    try {
      const res = await fetch(`/api/crops/${cropId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cropData),
      });
      if (res.ok) {
        const saved = await res.json();
        const current = storage.getCrops();
        const updated = current.map((c) => (c.id === cropId ? saved : c));
        storage.saveCrops(updated);
        return saved;
      }
    } catch (err) {
      console.warn("Backend crop update failed, falling back to local storage:", err);
    }
  }

  // Local fallback
  const current = storage.getCrops();
  const updated = current.map((c) => (c.id === cropId ? { ...c, ...cropData } : c));
  storage.saveCrops(updated);
  return { ...cropData, id: cropId };
}

export async function deleteCrop(cropId) {
  if (backendAvailable) {
    try {
      const res = await fetch(`/api/crops/${cropId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const current = storage.getCrops();
        const updated = current.filter((c) => c.id !== cropId);
        storage.saveCrops(updated);
        return true;
      }
    } catch (err) {
      console.warn("Backend crop delete failed, falling back to local storage:", err);
    }
  }

  // Local fallback
  const current = storage.getCrops();
  const updated = current.filter((c) => c.id !== cropId);
  storage.saveCrops(updated);
  return true;
}

// ==================== ORDERS API ====================
export async function getOrders() {
  if (backendAvailable) {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          storage.saveOrders(data);
          return data;
        }
      }
    } catch (err) {
      console.warn("Backend orders fetch failed, falling back to local storage:", err);
    }
  }
  return storage.getOrders();
}

export async function createOrder(orderData) {
  if (backendAvailable) {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (res.ok) {
        const saved = await res.json();
        const current = storage.getOrders();
        const updated = [saved, ...current.filter((o) => o.id !== saved.id)];
        storage.saveOrders(updated);
        return saved;
      }
    } catch (err) {
      console.warn("Backend order create failed, falling back to local storage:", err);
    }
  }

  // Local fallback
  const current = storage.getOrders();
  const newOrder = {
    ...orderData,
    id: orderData.id || Date.now(),
    orderNumber: orderData.orderNumber || `ORD-2026-${String(current.length + 1).padStart(3, "0")}`,
  };
  const updated = [newOrder, ...current];
  storage.saveOrders(updated);
  return newOrder;
}

export async function updateOrder(orderId, orderData) {
  if (backendAvailable) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (res.ok) {
        const saved = await res.json();
        const current = storage.getOrders();
        const updated = current.map((o) => (o.id === orderId ? saved : o));
        storage.saveOrders(updated);
        return saved;
      }
    } catch (err) {
      console.warn("Backend order update failed, falling back to local storage:", err);
    }
  }

  // Local fallback
  const current = storage.getOrders();
  const updated = current.map((o) => (o.id === orderId ? { ...o, ...orderData } : o));
  storage.saveOrders(updated);
  return { ...orderData, id: orderId };
}

export async function deleteOrder(orderId) {
  if (backendAvailable) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const current = storage.getOrders();
        const updated = current.filter((o) => o.id !== orderId);
        storage.saveOrders(updated);
        return true;
      }
    } catch (err) {
      console.warn("Backend order delete failed, falling back to local storage:", err);
    }
  }

  // Local fallback
  const current = storage.getOrders();
  const updated = current.filter((o) => o.id !== orderId);
  storage.saveOrders(updated);
  return true;
}
